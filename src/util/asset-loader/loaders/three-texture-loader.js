import { TextureLoader, CubeTextureLoader } from 'three';
import Loader from './loader';

/**
 *
 *
 * @export
 * @class ThreeTextureLoader
 * @extends {Loader}
 */
export default class ThreeTextureLoader extends Loader {
  constructor(asset) {
    super();
    this.asset = asset;
    this.isCube = asset.type === Loader.threeCubeTexture ? true : false;
  }

  load = () => {
    const loader = this.isCube ? new CubeTextureLoader() : new TextureLoader();

    const onLoaded = texture => {
      this.asset.data = texture;
      this.emit('loaded', this.asset);
    };

    /**
     *
     *
     * @returns
     */
    function onProgress() {
      return;
    }

    const onError = () => {
      this.emit('error', `Failed to load ${this.asset.src}`);
    };

    if (this.isCube) {
      loader.setPath(this.asset.args.path);
      loader.load(this.asset.src, onLoaded, onProgress, onError);
    } else {
      loader.load(this.asset.src, onLoaded, onProgress, onError);
    }
  };
}
