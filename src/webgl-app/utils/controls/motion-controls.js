import '@hughsk/fulltilt/dist/fulltilt';
import EventEmitter from 'event-emitter';
import math from '../math';
import touchControls from './touch-controls';
import detect from '@jam3/detect';

/**
 *
 *
 * @class MotionControls
 * @extends {EventEmitter}
 */
class MotionControls extends EventEmitter {
  constructor() {
    super();
    this.enabled = false;

    if (detect.isDesktop) {
      this.fallbackController();
    } else {
      const promise = new window.FULLTILT.getDeviceOrientation({
        type: 'world'
      });
      promise
        .then(controller => {
          this.deviceMotion = controller;
        })
        .catch(() => {
          this.fallbackController();
        });
    }
  }

  onTouchMove = event => {
    if (!this.enabled) return;
    this.emit('update', event);
  };

  onTouchEnd = event => {
    if (!this.enabled) return;
    event[0] = {
      x: 0,
      y: 0,
      normalX: 0,
      normalY: 0,
      centeredX: 0,
      centeredY: 0
    };
    this.emit('end', event);
  };

  toggle = enable => {
    this.enabled = enable;
  };

  update = () => {
    if (!this.enabled) return;

    if (this.deviceMotion) {
      const euler = this.deviceMotion.getScreenAdjustedEuler();

      let yMin = 35;
      let yMax = 84;
      let y = euler.beta;
      y = y > yMax ? yMax : y;
      y = y < yMin ? yMin : y;

      let xMin = -40;
      let xMax = 40;
      let x = euler.beta > yMax ? 0 : euler.gamma;
      x = x > xMax ? xMax : x;
      x = x < xMin ? xMin : x;

      const normalX = math.mapLinear(x, xMin, xMax, 0, 1);
      const normalY = math.mapLinear(y, yMin, yMax, 0, 1);

      this.emit('update', [
        {
          x: 0,
          y: 0,
          normalX,
          normalY,
          centeredX: (normalX - 0.5) * 2,
          centeredY: (normalY - 0.5) * 2
        }
      ]);
    }
  };

  fallbackController = () => {
    const moveEvent = detect.isDesktop ? 'mousemove' : 'move';
    touchControls.on(moveEvent, this.onTouchMove);
    touchControls.on('end', this.onTouchEnd);
  };
}

export default new MotionControls();
