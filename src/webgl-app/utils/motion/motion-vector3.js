import { Vector3 } from 'three';

/**
.*
.* @class MotionVector3
.*
*/
export default class MotionVector3 extends Vector3 {
  constructor() {
    super();

    this.target = new Vector3();
    this.easing = 0.05;
    this.min = null;
    this.max = null;
  }

  setTarget = (x, y, z, easing = true, update = false) => {
    this.target.x = x;
    if (this.min != null) this.target.x = this.target.x < this.min.x ? this.min.x : this.target.x;
    if (this.max != null) this.target.x = this.target.x > this.max.x ? this.max.x : this.target.x;

    this.target.y = y;
    if (this.min != null) this.target.y = this.target.y < this.min.y ? this.min.y : this.target.y;
    if (this.max != null) this.target.y = this.target.y > this.max.y ? this.max.y : this.target.y;

    this.target.z = z;
    if (this.min != null) this.target.z = this.target.z < this.min.z ? this.min.z : this.target.z;
    if (this.max != null) this.target.z = this.target.z > this.max.z ? this.max.z : this.target.z;

    if (!easing) {
      this.x = this.target.x;
      this.y = this.target.y;
      this.z = this.target.z;
    }

    if (update) {
      this.update();
    }
  };

  setMinLimit = (x, y, z) => {
    this.min = { x: x, y: y, z: z };
  };

  setMaxLimit = (x, y, z) => {
    this.max = { x: x, y: y, z: z };
  };

  update = () => {
    this.x += (this.target.x - this.x) * this.easing;
    this.y += (this.target.y - this.y) * this.easing;
    this.z += (this.target.z - this.z) * this.easing;
  };
}
