import { Vector2 } from 'three';

/**
.*
.* @class MotionVector2
.*
*/
export default class MotionVector2 extends Vector2 {
  constructor() {
    super();

    this.target = new Vector2();
    this.easing = 0.05;
    this.min = null;
    this.max = null;
  }

  setTarget = (x, y, easing = true, update = false) => {
    this.target.x = x;
    if (this.min != null) this.target.x = this.target.x < this.min.x ? this.min.x : this.target.x;
    if (this.max != null) this.target.x = this.target.x > this.max.x ? this.max.x : this.target.x;

    this.target.y = y;
    if (this.min != null) this.target.y = this.target.y < this.min.y ? this.min.y : this.target.y;
    if (this.max != null) this.target.y = this.target.y > this.max.y ? this.max.y : this.target.y;

    if (!easing) {
      this.x = this.target.x;
      this.y = this.target.y;
    }

    if (update) {
      this.update();
    }
  };

  setMinLimit = (x, y) => {
    this.min = { x: x, y: y };
  };

  setMaxLimit = (x, y) => {
    this.max = { x: x, y: y };
  };

  update = () => {
    this.x += (this.target.x - this.x) * this.easing;
    this.y += (this.target.y - this.y) * this.easing;
  };
}
