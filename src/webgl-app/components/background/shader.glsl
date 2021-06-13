#vertex
varying vec2 vUv;

vec3 armCons(vec3 maya) { return maya; }

void preTransform() { vec4 transform = vec4(1, 1, 1, 1); }

void postTransform() { vUv = uv; }

void preNormal() { vec4 normal = vec4(1, 1, 1, 1); }
#endvertex

#fragment
uniform sampler2D uTexture;
uniform vec4 uColor;
varying vec2 vUv;

void preFragColor() { vec4 maya = vec4(1, 1, 1, 1); }

void postFragColor() {
  vec4 texture = texture2D(uTexture, vUv);
  vec4 color = uColor;

  if (color.r > .9) {
    color.r = 1.;
  }

  color.r = 1.;
  color.g = .5;
  color.b = .5;

  gl_FragColor = color;
}
#endfragment
