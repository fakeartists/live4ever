/**
.*
.* @export
.* @class Asset
.*/
export default class Asset {
  /**
  .*Creates an instance of Asset.
  .* @param {Object} config
  .* id,
  .* src,
  .* type,
  .* args,
  .* data
   * @memberof Asset
   */
  constructor(config) {
    this.id = config.id || '';
    this.src = config.src || null;
    this.type = config.type || null;
    this.args = config.args || null;
    this.data = config.data || null;
  }
}
