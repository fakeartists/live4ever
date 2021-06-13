import { Mesh, PlaneBufferGeometry, Object3D } from 'three';
import { log } from '../../../util/console';
import animate, { Elastic } from '../../../util/gsap-animate';
import customMaterial from './material';

/**
.*
.* @class 3d component
.* @memberof WEBGLAPP
.* @author Fabio Toste
*/
export default class Background extends Object3D {
  constructor() {
    super();
    log('WEBGLAPP:: 3D created');
    this.timer = 0;
    this.createMesh();
  }

  createMesh() {
    const geometry = new PlaneBufferGeometry(5, 5, 1, 1);
    this.plane = new Mesh(geometry, customMaterial());
    this.plane.scale.set(1.0, 1.0, 1.0);
    this.add(this.plane);
  }

  transition(index, time, delay, spring, tension) {
    return animate.to(this.plane.scale, time, {
      x: 1,
      y: 1,
      delay: delay,
      ease: Elastic.easeOut.config(spring, tension)
    });
  }

  updateState(state, prevState) {}

  update(delta, motion) {
    this.timer += delta;
  }
}
