import { PerspectiveCamera, Vector3 } from 'three';

const fov = 65;
const ratio = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 100000;

function zoom(camera, value = 1) {
  camera.position.set(1 * value, 0.75 * value, 1 * value);
  camera.lookAt(new Vector3());
}

export const dev = new PerspectiveCamera(fov, ratio, near, far);
export const main = new PerspectiveCamera(fov, ratio, near, far);
export default {
  dev,
  main
};

zoom(dev, 20);
zoom(main, 20);
