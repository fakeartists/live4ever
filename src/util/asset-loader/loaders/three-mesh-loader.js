import FBXLoader from 'three-fbxloader-offical';
import Loader from './loader';

/**
 *
 *
 * @export
 * @class ThreeMeshLoader
 * @extends {Loader}
 */
export default class ThreeMeshLoader extends Loader {
  constructor(asset) {
    super();
    this.asset = asset;
  }

  load = () => {
    const loader = new FBXLoader();

    const onLoaded = mesh => {
      this.asset.data = mesh;
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

    loader.load(this.asset.src, onLoaded, onProgress, onError);
  };
}
