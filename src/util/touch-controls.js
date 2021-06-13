import EventEmitter from 'event-emitter';
import detect from '@jam3/detect';

/**
 *
 *
 * @export
 * @class TouchControls
 * @extends {EventEmitter}
 */
export default class TouchControls extends EventEmitter {
  element = null;
  pointers = [];
  isDown = false;

  constructor(element) {
    super();

    this.element = element;
    this.pointers = [];
    this.isDown = false;

    if (detect.isDesktop) {
      this.element.addEventListener('mouseup', this.onTouchEnd);
      this.element.addEventListener('mousemove', this.onTouchMove);
      this.element.addEventListener('mouseout', this.onMouseOut);
      this.element.addEventListener('mousedown', this.onTouchStart);
    } else {
      this.element.addEventListener('touchend', this.onTouchEnd);
      this.element.addEventListener('touchmove', this.onTouchMove);
      this.element.addEventListener('touchstart', this.onTouchStart);
    }
  }

  setPointers = event => {
    this.pointers = [];
    let normalX, normalY;

    if (event.touches) {
      // Touchstart / touchend
      Object.keys(event.touches).forEach(key => {
        const pointer = event.touches[key];
        normalX = pointer.pageX / window.innerWidth;
        normalY = pointer.pageY / window.innerHeight;
        this.pointers.push({
          x: pointer.pageX,
          y: pointer.pageY,
          normalX: normalX,
          normalY: normalY,
          centeredX: (normalX - 0.5) * 2,
          centeredY: (normalY - 0.5) * 2
        });
      });
    } else {
      // Mouse
      normalX = event.pageX / window.innerWidth;
      normalY = event.pageY / window.innerHeight;
      this.pointers.push({
        x: event.pageX,
        y: event.pageY,
        normalX: normalX,
        normalY: normalY,
        centeredX: (normalX - 0.5) * 2,
        centeredY: (normalY - 0.5) * 2
      });
    }
  };

  onTouchStart = event => {
    // event.preventDefault();
    this.isDown = true;
    this.setPointers(event);
    this.emit('start', this.pointers);
  };

  onTouchMove = event => {
    // event.preventDefault();
    this.onMouseMove(event);
    if (!this.isDown) return;
    this.setPointers(event);
    this.emit('move', this.pointers);
  };

  onTouchEnd = event => {
    // event.preventDefault();
    this.isDown = false;
    this.emit('end', this.pointers);
  };

  onMouseMove = event => {
    //event.preventDefault();
    this.setPointers(event);
    this.emit('mousemove', this.pointers);
  };

  onMouseOut = event => {
    //event.preventDefault();
    this.setPointers(event);
    this.emit('mouseout', this.pointers);
  };
}
