import EventEmitter from 'event-emitter';

/**
 *
 *
 * @class Loader
 * @extends {EventEmitter}
 */
class Loader extends EventEmitter {
  static json = 'json';
  static image = 'image';
  static threeTexture = 'three-texture';
  static threeCubeTexture = 'three-cube-texture';
  static threeMesh = 'three-mesh';
  static video = 'video';

  static getLoaderType(string, is3d) {
    if (/\.(gif|jpg|jpeg|tiff|png)$/i.test(string) && is3d) {
      return Loader.threeTexture;
    } else if (/\.(fbx|gltf|glb)$/i.test(string)) {
      return Loader.threeMesh;
    } else if (/\.(gif|jpg|jpeg|tiff|png)$/i.test(string) && !is3d) {
      return Loader.image;
    } else if (/\.(json|js)$/i.test(string)) {
      return Loader.json;
    } else {
      return null;
    }
  }
}

export default Loader;
