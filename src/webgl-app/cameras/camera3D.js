import { PerspectiveCamera } from 'three';
import animate, { Elastic } from '../../util/gsap-animate';
import MotionVector2 from '../utils/motion/motion-vector2';
import detect from '@jam3/detect';

/**
.*
.* @class
.* @memberof WEBGLAPP
.* @author Fabio Toste
*/
export default class Camera3D {
  constructor(renderer) {
    if (renderer == null) {
      console.warn('WR::The camera needs a renderer:');
      return;
    }

    this.value = 0;
    this.camera = new PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000); //old 25
    this.camera.position.z = 50; //old 20
    this.xyPosition = new MotionVector2();
    this.xyPosition.easing = detect.isDesktop ? 0.01 : 0.1;
  }

  transition(index, time, delay, spring, tension) {
    let finalZoom = detect.isDesktop ? 20 : 25; //old 8/9
    return animate.to(this.camera.position, time, {
      z: finalZoom,
      delay: delay,
      ease: Elastic.easeOut.config(spring, tension)
    });
  }

  update(delta, motion) {
    this.xyPosition.setTarget(-motion.x * 1.1, motion.y * 1.2, true, true);
    this.camera.position.y = this.xyPosition.x;
    this.camera.position.x = this.xyPosition.y;
    this.camera.lookAt(0, 0, -0.3);
  }
}
