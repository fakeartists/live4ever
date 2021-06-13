import EventEmitter from 'event-emitter';
import ImageLoader from './image-loader';
import JsonLoader from './json-loader';
import ThreeTextureLoader from './three-texture-loader';
import ThreeMeshLoader from './three-mesh-loader';
import VideoLoader from './video-loader';
import detect from '../../../util/detect';
import Loader from './loader';

const LOADERS = {
  [Loader.texture]: ImageLoader,
  [Loader.image]: ImageLoader,
  [Loader.json]: JsonLoader,
  [Loader.threeTexture]: ThreeTextureLoader,
  [Loader.threeCubeTexture]: ThreeTextureLoader,
  [Loader.threeMesh]: ThreeMeshLoader,
  [Loader.video]: VideoLoader
};

/**
 *
 *
 * @export
 * @class GroupLoader
 * @extends {EventEmitter}
 */
export default class GroupLoader extends EventEmitter {
  constructor(id) {
    super();
    this.id = id;
  }

  /**
   *
   *
   * @param {Asset[]} manifest
   * @memberof GroupLoader
   */
  load = manifest => {
    this.loaders = [];
    manifest.forEach(asset => {
      if (LOADERS[asset.type] !== undefined) {
        this.loaders.push(new LOADERS[asset.type](asset));
      }
    });

    this.loaded = 0;
    this.queue = 0;
    this.currentParallel = 0;
    this.parallelLoads = detect.isDesktop ? 10 : 5;
    this.total = this.loaders.length;

    if (this.total === 0) {
      this.emit('loaded', []);
    } else {
      this.loadNextInQueue();
    }
  };

  /**
   *
   *
   * @memberof GroupLoader
   */
  loadNextInQueue = () => {
    if (this.queue < this.total) {
      if (this.currentParallel < this.parallelLoads) {
        const loader = this.loaders[this.queue];
        this.queue += 1;
        this.currentParallel += 1;
        loader.once('loaded', this.onLoaded);
        loader.once('error', this.onError);
        loader.load();
        this.loadNextInQueue();
      }
    }
  };

  /**
   *
   *
   * @memberof GroupLoader
   */
  onLoaded = () => {
    this.loaded += 1;
    // console.log(`${this.id} loaded`, this.loaded, '/', this.total);
    this.emit('progress', this.loaded / this.total);
    if (this.loaded === this.total) {
      const assets = [];
      this.loaders.forEach(loader => {
        assets.push(loader.asset);
      });
      this.emit('loaded', assets);
    } else {
      this.currentParallel -= 1;
      this.loadNextInQueue();
    }
  };

  /**
   *
   *
   * @param {string} error
   * @memberof GroupLoader
   */
  onError = error => {
    this.emit('error', error);
  };
}
