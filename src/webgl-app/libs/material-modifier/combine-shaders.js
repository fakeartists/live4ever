import deepExtend from 'deep-extend';

// Combine multiple shaders together
export default shaders => {
  const finalShader = {
    uniforms: {},
    vertexShader: {
      uniforms: '',
      functions: '',
      preTransform: '',
      postTransform: ''
    },
    fragmentShader: {
      uniforms: '',
      functions: '',
      preFragColor: '',
      postFragColor: ''
    }
  };

  const merge = (shader, type, key) => {
    return `\n
      // ${shader.id} ${key} start
      ${shader[type][key]}
      // ${shader.id} ${key} end
    `;
  };

  const vertexShader = 'vertexShader';
  const fragmentShader = 'fragmentShader';

  shaders.forEach(shader => {
    finalShader.uniforms = deepExtend(finalShader.uniforms, shader.uniforms);

    finalShader.vertexShader.uniforms += merge(shader, vertexShader, 'uniforms');
    finalShader.vertexShader.functions += merge(shader, vertexShader, 'functions');
    finalShader.vertexShader.preTransform += merge(shader, vertexShader, 'preTransform');
    finalShader.vertexShader.postTransform += merge(shader, vertexShader, 'postTransform');

    finalShader.fragmentShader.uniforms += merge(shader, fragmentShader, 'uniforms');
    finalShader.fragmentShader.functions += merge(shader, fragmentShader, 'functions');
    finalShader.fragmentShader.preFragColor += merge(shader, fragmentShader, 'preFragColor');
    finalShader.fragmentShader.postFragColor += merge(shader, fragmentShader, 'postFragColor');
  });

  // console.log(finalShader);

  return finalShader;
};
