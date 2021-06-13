import { Clock } from 'three';
import RenderStats from './utils/renderer-stats';
import renderer from './renderers/renderer';
import MainScene from './scenes/main-scene';

import settings from '../data/settings';
import routes from '../routes/keys';
//import assetManager from '../util/asset-loader/asset-manager';
import { log } from '../util/console';
import animate, { Sine } from '../util/gsap-animate';

export default class WebGLApp {
  constructor(history) {
    this.rafId = null;
    this.webglStarted = false;
    this.history = history;
    this.state = null;
    this.hasCamera = false;
    this.launchFaceTrack = false;
    this.userMessageTO = -1;

    // Stats
    if (settings.renderStats) {
      this.renderStats = new RenderStats();
      if (document.body != null) document.body.appendChild(this.renderStats.domElement);
    }

    this.clock = new Clock(true);
  }

  setup = (parent, autoUpdate = true) => {
    return new Promise((resolve, reject) => {
      this.webglCanvas = parent.appendChild(renderer.domElement);
      this.parent = parent;
      this.autoUpdate = autoUpdate;
      this.mainScene = new MainScene(renderer);
      this.startWebGl();
      resolve();
    });
  };

  startWebGl = () => {
    //if (assetManager.isAllAssetsLoaded) {
    if (!this.webglStarted) {
      this.mainScene.setup().then(() => {
        this.webglStarted = true;
        animate.to(this.webglCanvas, 0, { opacity: 0 });
        animate.to(this.webglCanvas, 1, {
          opacity: 1,
          delay: 0.5,
          ease: Sine.easeInOut
        });
        this.render(true);
        this.mainScene.start(this.state, this.hasCamera);
      });
    } else {
      animate.to(this.webglCanvas, 0, { opacity: 0 });
      animate.to(this.webglCanvas, 1, {
        opacity: 1,
        delay: 0.5,
        ease: Sine.easeInOut
      });
      this.render(true);
      this.mainScene.start(this.state, this.hasCamera);
    }
    log('WEBGLAPP:: Start WEBGL');
    //} else {
    //setTimeout(this.startWebGl, 1000);
    //}
  };

  stopWebGl = () => {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.webglCanvas.style.display = 'none';
      log('WEBGLAPP:: Stop WEBGL');
    }
  };

  resize = (width, height) => {
    if (this.mainScene) this.mainScene.resize(width, height);
    renderer.setSize(width, height);
  };

  updateState = (state, prevState) => {
    this.state = state;
    if (this.mainScene) {
      this.mainScene.updateState(state, prevState);
    }
    if (state.path !== prevState.path) {
      switch (state.path) {
        case routes.About: {
          break;
        }
        default: {
          break;
        }
      }
    }
  };

  captureFrame = async isForeground => {
    return new Promise((resolve, reject) => {
      if (!renderer.domElement) reject('WEBGLAPP:: No webgl canvas set');
      try {
        let image = renderer.domElement.toDataURL(isForeground ? 'image/jpeg' : 'image/png');
        resolve(image);
      } catch (err) {
        reject(err);
      }
    });
  };

  renderScene = (camera, left, bottom, width, height, useComposer = false) => {
    left *= window.innerWidth;
    bottom *= window.innerHeight;
    width *= window.innerWidth;
    height *= window.innerHeight;

    renderer.setViewport(left, bottom, width, height);
    renderer.setScissor(left, bottom, width, height);
    renderer.setClearColor(0x000000, 1);

    renderer.render(this.mainScene.scene, this.mainScene.camera);
  };

  render = render => {
    if (render) {
      this.update();
    } else {
      cancelAnimationFrame(this.rafId);
    }
  };

  update = () => {
    if (this.autoUpdate) {
      this.rafId = requestAnimationFrame(this.update);
    } else {
      cancelAnimationFrame(this.rafId);
    }

    if (this.mainScene) this.mainScene.update(this.clock.getDelta());
    this.renderScene(this.mainScene.camera, 0, 0, 1, 1);

    if (settings.renderStats) {
      this.renderStats.update(renderer);
    }
  };

  dispose() {
    cancelAnimationFrame(this.rafId);
  }
}
