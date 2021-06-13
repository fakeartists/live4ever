import { MeshStandardMaterial, RepeatWrapping, NearestFilter, Vector2, Vector4 } from 'three';

import MaterialModifier from '../../lib/three/materials/material-modifier';
import assetManager from '../../util/asset-loader/asset-manager';
import Shader from './shader';

export default (config = null) => {
  let pattern = assetManager.get('texture-pattern');
  if (pattern) {
    pattern.wrapS = RepeatWrapping;
    pattern.wrapT = RepeatWrapping;
  }

  let noise = assetManager.get('texture-noise');
  if (noise) {
    noise.wrapS = RepeatWrapping;
    noise.wrapT = RepeatWrapping;
    noise.magFilter = NearestFilter;
  }

  let defaultTexture = assetManager.get('texture-dummy');

  const ExtendedBasicMaterial = MaterialModifier.extend(MeshStandardMaterial, {
    uniforms: {
      uDiscardAlpha: { type: 'f', value: 0.0 },
      uPatternFade: { type: 'f', value: 0.0 },
      uTime: { type: 'f', value: 0.0 },
      uvScale: { type: 'v', value: new Vector2(1, 1) },
      uvOffset: { type: 'v', value: new Vector2(0, 0) },
      uMaskType: { type: 'f', value: 0.0 },
      uFresnelBlend: { type: 'f', value: 0.0 },
      uMaskUvScale: { type: 'f', value: 1.0 },
      uColorOffset: { type: 'v', value: new Vector4(0, 0, 0, 0) },
      uColor: { type: 'v', value: new Vector4(1, 1, 1, 1) },
      uSecundaryColor: { type: 'v', value: new Vector4(1, 1, 1, 1) },
      uNoise: { type: 't', value: noise },
      uPattern: { type: 't', value: pattern },
      uTexture: { type: 't', value: defaultTexture }
    },
    vertexShader: Shader.vertexShader,
    fragmentShader: Shader.fragmentShader
  });

  config = config || {
    transparent: false,
    depthWrite: false
  };

  return new ExtendedBasicMaterial(config);
};
