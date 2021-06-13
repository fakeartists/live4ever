import { MeshBasicMaterial, Vector4 } from 'three';
import MaterialModifier from '../../libs/material-modifier/material-modifier';
//import Shader from './shader';

const glsl = require('glslify');
var shader = glsl.file('./shader.glsl');
//import assetManager from '../../../util/asset-loader/asset-manager';

export default () => {
  const ExtendedBasicMaterial = MaterialModifier.extend(MeshBasicMaterial, {
    uniforms: {
      uTexture: { type: 't', value: null },
      uColor: { type: 'v', value: new Vector4(1, 0, 0, 1) }
    },
    glslShader: shader
  });
  return new ExtendedBasicMaterial({
    transparent: false,
    depthWrite: false
  });
};
