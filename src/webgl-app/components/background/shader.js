export default {
  vertexShader: {
    uniforms: `
      varying vec2 vUv;
    `,
    functions: `
    `,
    preTransform: `
    `,
    postTransform: `
      vUv = uv;
    `
  },
  fragmentShader: {
    uniforms: `
      uniform sampler2D uTexture;
      uniform vec4 uColor;
      varying vec2 vUv;
    `,
    functions: ``,
    preFragColor: ``,
    postFragColor: `
      vec4 texture = texture2D(uTexture, vUv);
      vec4 color = uColor;
      gl_FragColor = color;
    `
  }
};
