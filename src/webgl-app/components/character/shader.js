export default {
  vertexShader: {
    uniforms: `
      varying vec2 mUv;
      varying vec3 mPosition;
      varying vec2 mPetternUV;
      varying float vFresnelFactor;
      uniform float uTime;
    `,
    functions: `
    `,
    preTransform: `
    `,
    postTransform: `
      mUv = uv;
      vec4 wPosition = modelMatrix * vec4(position, 1.0);
      mPosition = wPosition.xyz;

      vec3 worldNormal = normalize(mat3(modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal);
      vec3 I = wPosition.xyz - cameraPosition;
      vFresnelFactor = 0.2 + 1.0 * pow(1.0 + dot( normalize(I), worldNormal), 1.5);

      mPetternUV = gl_Position.xy * vec2(1.4, 3.0);
    `
  },
  fragmentShader: {
    uniforms: `
      uniform sampler2D uNoise;
      uniform sampler2D uPattern;
      uniform sampler2D uTexture;
      uniform float aoMapIntensity;
      uniform vec2 uvScale;
      uniform float uPatternFade;
      uniform float uTime;
      uniform float uFresnelBlend;
      uniform float uMaskUvScale;
      uniform float uMaskType;
      uniform float uDiscardAlpha;
      uniform vec2 uvOffset;
      uniform vec4 uColorOffset;
      uniform vec4 uSecundaryColor;
      uniform vec4 uColor;
      vec2 uvCenter = vec2(0.5, 0.5);

      varying vec2 mUv;
      varying vec3 mPosition;
      varying vec2 mPetternUV;
      varying float vFresnelFactor;
    `,
    functions: `
    `,
    preFragColor: `
    `,
    postFragColor: `
      vec4 texture = texture2D(uTexture, (mUv + uvOffset) * uvScale);
      float tint = texture.b;
      float textureMask = texture.g;

      float iFresnel = 1.0 - vFresnelFactor;
      float alphaFresnel = clamp(iFresnel - 0.7, 0.0, 1.0);
      float colorFresnel = clamp(iFresnel + 0.5, 0.0, 1.0);
      vec3 colorFresnelOffset = (1.0 - colorFresnel) * vec3(0.15, 0.02, 0.0);

      float dist = (mPosition.y + 0.95) / 0.06;
      dist = clamp(dist, 0.0, 1.0);

      texture = texture2D(uTexture, mUv);
      float ao = mix(1.0, texture.r, aoMapIntensity);
      textureMask = uMaskUvScale == 1.0 ? textureMask : texture.g;

      float mask = uMaskType == 1.0 || uMaskType == 4.0 ? textureMask : 1.0;
      float alphaMask = uMaskType == 2.0 ? textureMask : 1.0;
      vec3 colorOffset = uMaskType == 3.0 || uMaskType == 4.0 ? textureMask * uColorOffset.rgb : vec3(0.0, 0.0, 0.0);

      vec3 finalColor = mix(outgoingLight * tint, outgoingLight * tint * uColor.rgb, mask);
      finalColor *= ao;
      finalColor += colorOffset;
      finalColor += uFresnelBlend == 1.0 ? colorFresnelOffset : vec3(0.0, 0.0, 0.0);
      finalColor = clamp(finalColor, 0.0, 1.0);

      vec3 paternColor = vec3(0.64, 0.78, 0.98);
      float noise = texture2D(uNoise, mPetternUV + (uTime * 2.0)).g;
      float patternMask = texture2D(uPattern, mPetternUV + (noise * 0.07)).r;
      vec3 pattern = paternColor * iFresnel * patternMask;

      float fadeBlend = smoothstep(0.0, 0.6, uTime);
      fadeBlend = abs(sin(3.1415 * 1.5 * fadeBlend));
      float fade = mix(iFresnel * patternMask, 1.0, fadeBlend);

      vec3 color = mix(vec3(1.0, 1.0, 1.0), paternColor, iFresnel);
      float paternColorBlend = step(0.6,uTime);
      color = mix(color, finalColor, paternColorBlend);

      float whiteBlend = step(0.2,uTime)-step(0.4,uTime)+step(0.6,uTime)*(1.0-smoothstep(0.0,1.0,(uTime-0.6)/0.4));
      color += vec3(whiteBlend);

      float alpha = smoothstep(0.0, 0.1, uTime) * opacity * alphaMask * dist * fade + whiteBlend * dist;
      gl_FragColor = vec4(color, clamp(alpha, 0.0, 1.0));

      if (textureMask < uDiscardAlpha) discard;
    `
  }
};
