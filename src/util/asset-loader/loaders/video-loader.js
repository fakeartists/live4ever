import Loader from './loader';

/**
 *
 *
 * @export
 * @class VideoLoader
 * @extends {Loader}
 */
export default class VideoLoader extends Loader {
  constructor(asset) {
    super();
    this.asset = asset;
  }

  load = () => {
    const req = new XMLHttpRequest();
    req.open('GET', this.asset.src, true);
    req.responseType = 'blob';

    req.onload = response => {
      if (req.status === 200) {
        this.asset.data = URL.createObjectURL(req.response);
        this.emit('loaded', this.asset);
      }
    };

    req.onerror = () => {
      this.emit('error', `Failed to load ${this.asset.src}`);
    };

    req.send();
  };
}
