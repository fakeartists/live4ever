import { log, warn } from '../console';
/**
 *
 *
 * @class AssetManager
 * @extends {EventEmitter}
 */
class AssetManager {
  constructor() {
    this.assets = [];
    this.isAllAssetsLoaded = false;
  }

  add(assets, isAllAssets = false) {
    this.assets = this.assets.concat(assets);
    this.isAllAssetsLoaded = isAllAssets;
    log(`AssetManager::set`, this.assets);
  }

  /**
   * Get an asset by id
   * @param  {String} id
   * @return {Mixed}
   */
  get(id, all = false, warnLog = true) {
    const asset = this.find(this.assets, id);
    if (asset /*&& asset instanceof Asset // what's the 'Asset'? */) {
      return all ? asset : asset.data;
    }
    if (warnLog) {
      warn(`AssetManager::get no assets found for ${id}`);
    }
    return false;
  }

  find(assets, id) {
    return assets.find(asset => asset.id === id) || false;
  }
}

export default new AssetManager();
