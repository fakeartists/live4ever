import { Scene, AmbientLight, DirectionalLight } from 'three';
import Camera3D from '../cameras/camera3D';
import Background from '../components/background/background';
//import Character from '../components/character/character';
import motionControls from '../utils/controls/motion-controls.js';
import MotionStats from '../utils/motion-stats';

import { log } from '../../util/console';
import settings from '../../data/settings';
import detect from '@jam3/detect';

/**
.*
.* @class
.* @memberof WEBGLAPP
.* @author Fabio Toste
*/
export default class MainScene {
  constructor(renderer) {
    log('WEBGLAPP:: Main scene created...');

    this.mainCamera = new Camera3D(renderer);
    this.camera = this.mainCamera.camera;
    this.background = null;
    this.character = null;

    this.motion = { x: 0, y: 0 };
    this.isMoveAllowed = false;

    this.scene = new Scene();
    this.ambientLight = new AmbientLight(0xdedada, 0.8);
    this.scene.add(this.ambientLight);

    this.directionalLight = new DirectionalLight(0xe2e2e2, 0.9, 100);
    this.directionalLight.target.position.set(0, 0, 0);
    this.directionalLight.position.set(0.5, 2, 3);

    if (settings.useShadows) {
      this.directionalLight.shadow.mapSize.width = 1024;
      this.directionalLight.shadow.mapSize.height = 1024;
      this.directionalLight.shadow.camera.near = 0.01;
      this.directionalLight.shadow.camera.far = 500;
      this.directionalLight.castShadow = settings.useShadows;
    }

    this.scene.add(this.directionalLight);

    // Stats
    if (settings.renderStats) {
      this.motionStats = new MotionStats();
      if (document.body != null) document.body.appendChild(this.motionStats.domElement);
    }
  }

  setup = () => {
    return new Promise((resolve, reject) => {
      try {
        log('WEBGLAPP:: Main scene setup...');

        this.background = new Background();
        this.background.position.z = -2;
        this.scene.add(this.background);

        //this.character = new Character();
        //this.scene.add(this.character);

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  reset() {}

  start(state, hasCamera = false) {
    this.setActive(true);
    if (this.mainCamera) this.mainCamera.transition(0, 1, 0.5, 0.3, 0.3);
    if (this.background) this.background.transition(0, 1, 0.5, 0.3, 0.3);
    if (this.character) this.character.start(state, hasCamera);
  }

  setActive = active => {
    if (active) {
      motionControls.on('update', this.onMotionUpdate);
      motionControls.on('end', this.onMotionEnd);
      motionControls.toggle(true);
    } else {
      motionControls.toggle(false);
      motionControls.off('update', this.onMotionUpdate);
      motionControls.off('end', this.onMotionEnd);
    }
  };

  onMotionEnd = event => {
    this.motion.x = 0;
    this.motion.y = 0;
  };

  onMotionUpdate = event => {
    this.motion.x = detect.isDesktop ? -event[0].centeredY * 0.3 : -event[0].centeredY;
    this.motion.y = detect.isDesktop ? -event[0].centeredX * 0.3 : -event[0].centeredX;
  };

  resize(width, height) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  updateState = (state, prevState) => {
    if (this.character) this.character.updateState(state, prevState);
    if (this.background) this.background.updateState(state, prevState);
  };

  update(delta) {
    if (this.motionStats) this.motionStats.update(motionControls.deviceMotion);
    if (motionControls) motionControls.update();
    if (this.mainCamera) this.mainCamera.update(delta, this.motion);
    if (this.background) this.background.update(delta, this.motion);
    if (this.character) this.character.update(delta, this.motion, this.isMoveAllowed);
  }
}
