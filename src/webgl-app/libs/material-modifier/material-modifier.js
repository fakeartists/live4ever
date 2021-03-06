import {
  MeshBasicMaterial,
  MeshDepthMaterial,
  MeshLambertMaterial,
  MeshPhongMaterial,
  MeshStandardMaterial,
  ShaderLib
} from 'three';

import defaultHooks from './default-hooks';

const getShaderbjectFromShaderString = (type, shaderString, hookDefs) => {
  let match;
  let shaderBlock = '';
  let returnObject = {};
  for (let key in hookDefs) {
    returnObject[key] = '';
  }

  // get the vertex block
  let regex = new RegExp('#' + type + '((?:.|\n)*)#end' + type);
  match = regex.exec(shaderString);
  if (match && match[1]) {
    shaderBlock = match[1];
  }

  // get the uniforms
  match = /^((?:.|\n)*?)\s?\n?(\n.*\(.*\)\s?\n?{|$)/.exec(shaderBlock);
  if (match && match[1]) {
    returnObject.uniforms = match[1];
  }

  // get the functions
  match = shaderBlock.match(/.*\s?\n?\(.*\)\s?\n?\{(?:.|\n)*?[^()]+\}/gim);
  if (match && match.length > 0) {
    let functions = '';
    match.forEach(element => {
      let shaderFunction = /.* (.*)\s?\n?\(.*\)\s?\n?\{((?:.|\n)*?[^()]+)\}/.exec(element);
      if (shaderFunction && shaderFunction[1]) {
        if (returnObject.hasOwnProperty(shaderFunction[1]) && shaderFunction[2]) {
          returnObject[shaderFunction[1]] = shaderFunction[2];
        } else {
          functions += element;
        }
      }
    });
    returnObject.functions = functions;
  }
  console.log(returnObject);
  return returnObject;
};

const modifySource = (source, hookDefs, hooks) => {
  let match;
  for (let key in hookDefs) {
    if (hooks[key]) {
      match = /insert(before):(.*)|insert(after):(.*)/.exec(hookDefs[key]);

      if (match) {
        if (match[1]) {
          // before
          source = source.replace(match[2], hooks[key] + '\n' + match[2]);
        } else if (match[3]) {
          // after
          source = source.replace(match[4], match[4] + '\n' + hooks[key]);
        }
      }
    }
  }

  return source;
};

const cloneUniforms = uniforms => {
  let clone = {};
  for (let key in uniforms) {
    // non-promitive uniform values will be referenced
    clone[key] = Object.assign({}, uniforms[key]);
  }
  return clone;
};

let shaderMap = null;
const getShaderDef = classOrString => {
  if (!shaderMap) {
    let classes = {
      standard: MeshStandardMaterial,
      basic: MeshBasicMaterial,
      lambert: MeshLambertMaterial,
      phong: MeshPhongMaterial,
      depth: MeshDepthMaterial
    };

    shaderMap = {};

    for (let key in classes) {
      shaderMap[key] = {
        ShaderClass: classes[key],
        ShaderLib: ShaderLib[key],
        Key: key,
        Count: 0,
        ModifiedName: function() {
          return `ModifiedMesh${this.Key[0].toUpperCase() + this.Key.slice(1)}Material_${++this.Count}`;
        },
        TypeCheck: `isMesh${key[0].toUpperCase() + key.slice(1)}Material`
      };
    }
  }

  let shaderDef;
  if (typeof classOrString === 'function') {
    for (let key in shaderMap) {
      if (shaderMap[key].ShaderClass === classOrString) {
        shaderDef = shaderMap[key];
        break;
      }
    }
  } else {
    shaderDef = shaderMap[classOrString];
  }

  if (!shaderDef) {
    throw new Error('No Shader found to modify...');
  }

  return shaderDef;
};

/**
 * The main Material Modofier
 */
class MaterialModifier {
  constructor(vertexHookDefs, fragmentHookDefs) {
    this._vertexHooks = {};
    this._fragmentHooks = {};

    if (vertexHookDefs) {
      this.defineVertexHooks(vertexHookDefs);
    }

    if (fragmentHookDefs) {
      this.defineFragmentHooks(fragmentHookDefs);
    }
  }

  modify(shader, opts) {
    let def = getShaderDef(shader);

    if (opts.glslShader) {
      opts.vertexShader = getShaderbjectFromShaderString('vertex', opts.glslShader, this._vertexHooks);
      opts.fragmentShader = getShaderbjectFromShaderString('fragment', opts.glslShader, this._fragmentHooks);
    }

    let vertexShader = modifySource(def.ShaderLib.vertexShader, this._vertexHooks, opts.vertexShader || {});
    let fragmentShader = modifySource(def.ShaderLib.fragmentShader, this._fragmentHooks, opts.fragmentShader || {});
    let uniforms = Object.assign({}, def.ShaderLib.uniforms, opts.uniforms || {});

    return { vertexShader, fragmentShader, uniforms };
  }

  extend(shader, opts) {
    let def = getShaderDef(shader); // ADJUST THIS SHADER DEF - ONLY DEFINE ONCE -
    // AND STORE A USE COUNT ON EXTENDED VERSIONS.

    if (opts.glslShader) {
      opts.vertexShader = getShaderbjectFromShaderString('vertex', opts.glslShader, this._vertexHooks);
      opts.fragmentShader = getShaderbjectFromShaderString('fragment', opts.glslShader, this._fragmentHooks);
    }

    let vertexShader = modifySource(def.ShaderLib.vertexShader, this._vertexHooks, opts.vertexShader || {});
    let fragmentShader = modifySource(def.ShaderLib.fragmentShader, this._fragmentHooks, opts.fragmentShader || {});
    let uniforms = Object.assign({}, def.ShaderLib.uniforms, opts.uniforms || {});

    let ClassName = opts.className || def.ModifiedName();

    // eslint-disable-next-line
    let extendMaterial = new Function(
      'BaseClass',
      'uniforms',
      'vertexShader',
      'fragmentShader',
      'cloneUniforms',
      `
              var cls = function ${ClassName}( params ){
                  BaseClass.call( this, params );
                  this.uniforms = cloneUniforms( uniforms );
                  this.vertexShader = vertexShader;
                  this.fragmentShader = fragmentShader;
                  this.type = '${ClassName}';
                  this.setValues( params );
              }
              cls.prototype = Object.create( BaseClass.prototype );
              cls.prototype.constructor = cls;
              cls.prototype.${def.TypeCheck} = true;
              cls.prototype.copy = function( source ){
                  BaseClass.prototype.copy.call( this, source );
                  this.uniforms = Object.assign( {}, source.uniforms );
                  this.vertexShader = vertexShader;
                  this.fragmentShader = fragmentShader;
                  this.type = '${ClassName}';
                  return this;
              }
              return cls;
          `
    );

    if (opts.postModifyVertexShader) {
      vertexShader = opts.postModifyVertexShader(vertexShader);
    }
    if (opts.postModifyFragmentShader) {
      fragmentShader = opts.postModifyFragmentShader(fragmentShader);
    }

    return extendMaterial(def.ShaderClass, uniforms, vertexShader, fragmentShader, cloneUniforms);
  }

  defineVertexHooks(defs) {
    for (let key in defs) {
      this._vertexHooks[key] = defs[key];
    }
  }

  defineFragmentHooks(defs) {
    for (let key in defs) {
      this._fragmentHooks[key] = defs[key];
    }
  }
}

export { MaterialModifier };
export default new MaterialModifier(defaultHooks.vertexHooks, defaultHooks.fragmentHooks);
