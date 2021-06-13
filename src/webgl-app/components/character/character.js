import { Object3D } from 'three'; //SkinnedMesh
import lerp from 'lerp';
import { guiBlendShapes } from '../../util/gui';
import { log } from '../../util/console';
import {
  faceTracksDictionary,
  blendShapeDefaults,
  characterDefaults,
  orderDefaults,
  blendShapesPhoto
} from './character-defaults';
import touchControls from '../controls/touch-controls.js';
import MotionVector2 from '../motion/motion-vector2';
import MotionVector3 from '../motion/motion-vector3';
import detect from '../../util/detect';
import CharacterProp from './character-prop';
import customize from '../../data/customize';
import { guiCharacter } from '../../util/gui';
import settings from '../../data/settings';

/**
.*
.* @class
.* @memberof WRAR
.* @author Fabio Toste
*/
export default class Character extends Object3D {
  constructor() {
    super();
    log('WebglAPP::Character created...');

    this.currentFaceMesh = null;
    this.currentFaceHairMesh = null;
    this.currentEyeMesh = null;
    this.currentHairIndex = 0;
    this.currentAccessoryIndex = 0;
    this.canBlink = true;

    this.eyePosition = new MotionVector2();
    this.eyePosition.easing = detect.isDesktop ? 0.05 : 0.05;
    this.eyePosition.setMaxLimit(0.1, 0.1);
    this.eyePosition.setMinLimit(-0.1, -0.1);
    this.headRotation = new MotionVector3();
    this.headRotation.easing = detect.isDesktop ? 0.05 : 0.05;
    this.movementMultiplier = detect.isDesktop ? 0.1 : 0.2;
    this.trackAttenuation = 0.7;
    this.center = false;
    this.lastMousePosition = { x: 0, y: 0 };
    this.isAnimating = false;
    this.photoBlend = Object.assign({}, blendShapeDefaults);

    touchControls.on('end', this.onTouchEnd);
    touchControls.on('mouseout', this.onTouchEnd);

    this.face = new Object3D();
    this.body = new Object3D();
    this.torso = null;

    this.add(this.body);
    this.add(this.face);

    this.props = {};
    this.createBody();
    this.createProps();
    this.createBlendShapeObjects();
  }

  createBody() {
    if (customize.hasOwnProperty('bodies')) {
      let body = new CharacterProp(this.body, 'bodies', customize.bodies.types);
      this.torso = body;
      this.torso.changeItem(0, 0, 0);
    }
  }

  createProps() {
    if (customize.hasOwnProperty('props')) {
      orderDefaults.forEach(p => {
        let parent = p == 'clothes' ? this.body : this.face;
        let prop = new CharacterProp(parent, p, customize.props[p].types);
        this.props[p] = prop;

        this.rBlink = 0;

        let guiProp = guiCharacter.addFolder(p);
        guiProp
          .add(prop, 'time', 0, 1)
          .step(0.001)
          .onChange(value => {
            prop.updateMaterialsShader(prop.currentItem, 'all', 'uTime', value);
          });
        guiProp.add(prop, 'nextProp');

        let colors = { color: 0xffffff, eyeColor: 0xffffff };
        guiProp.addColor(colors, 'color').onChange(value => {
          prop.changeColor('', value, 0.2, 0, false);
        });
      });
    }
  }

  createBlendShapeObjects() {
    this.blends = {};
    this.blendShapeTargets = {};
    for (var k in blendShapeDefaults) {
      this.blends[k] = blendShapeDefaults[k];
      this.blendShapeTargets[k] = blendShapeDefaults[k];
      this.onChangeMorphTarget(k, this.blends[k]);
      guiBlendShapes
        .add(this.blends, k, 0, 1)
        .step(0.01)
        .onChange(this.onChangeMorphTarget.bind(this, k));
    }
  }

  togglePosePhoto(b) {
    this.photoMode = b;
    if (b) {
      this.photoPoses = blendShapesPhoto.slice();
    }
  }

  setPoseForPhoto() {
    if (this.facetrack != null && this.facetrack.faceTracker.isTracking) return;
    const r = Math.floor(Math.random() * this.photoPoses.length);
    this.photoBlend = this.photoPoses[r];
    this.photoPoses.splice(r, 1);
  }

  start(state, hasCamera) {
    let reduxStoreProps;
    if (state) {
      reduxStoreProps = state.customize.props;
    } else {
      this.currentTemplate = Math.floor(Math.random() * characterDefaults.length);
      reduxStoreProps = characterDefaults[this.currentTemplate];
    }
    this.updateProps(reduxStoreProps, 0, 0, hasCamera);
    this.randomBlink();
  }

  updateProps(stateProps, time = 0, delay = 0, hasCamera = true) {
    orderDefaults.forEach(p => {
      if (stateProps.hasOwnProperty(p)) {
        this.changeProp(p, stateProps[p].type, time, delay);
        let color = customize.props[p].colors[stateProps[p].color];
        if (!hasCamera && p === 'skins' && !detect.isDesktop) color = '#c3c9ce';
        this.changePropColor(p, '', color, time, delay, false, true);
        if (p === 'skins') {
          color = customize.props['eyes'].colors[stateProps['eyes'].color];
          this.changePropColor(p, 'eyes', color, time, delay, false, true);
        }
      }
    });
  }

  updateTemplate() {
    if (!this.isAnimating) {
      this.isAnimating = true;
      this.currentTemplate++;
      this.currentTemplate = this.currentTemplate >= characterDefaults.length ? 0 : this.currentTemplate;
      this.updateProps(characterDefaults[this.currentTemplate], 1, 0);
      setTimeout(() => {
        this.isAnimating = false;
      }, 1500);
    }
  }

  setFaceTrack(facetrack) {
    this.facetrack = facetrack;
  }

  onTouchEnd = event => {
    event[0] = {
      x: 0,
      y: 0,
      normalX: 0,
      normalY: 0,
      centeredX: 0,
      centeredY: 0
    };
  };

  changeProp(propName, itemIndex, time, delay) {
    if (this.props.hasOwnProperty(propName)) {
      this.props[propName].changeItem(itemIndex, time, delay, this.currentHairIndex);
      if (propName === 'skins') {
        this.currentFaceMesh = this.props[propName].items[itemIndex].mesh;
      }
      if (propName === 'facialHairs') {
        this.currentFaceHairMesh = this.props[propName].items[itemIndex].mesh;
      }
      if (propName === 'eyes') {
        this.currentEyeMesh = this.props[propName].items[itemIndex].mesh;
      }
      if (propName == 'hairs') {
        this.currentHairIndex = itemIndex;
        this.props['accessories'].updateItemHairPosition(
          this.currentAccessoryIndex,
          time,
          delay,
          this.currentHairIndex,
          null,
          true
        );
      }
      if (propName == 'accessories') {
        this.currentAccessoryIndex = itemIndex;
      }
    }
  }

  changePropColor(propName, id = '', color, time, delay = 0, isSecundary = false, force = false) {
    if (this.props.hasOwnProperty(propName)) {
      this.props[propName].changeColor(id, color, time, delay, isSecundary, force);
      if (propName === 'skins') {
        this.torso.changeColor(id, color, time, delay, isSecundary, force);
      }
    }
  }

  randomBlink() {
    if (this.canBlink) {
      this.rBlink = 1;
    }

    clearTimeout(this.rdTimeout);
    this.rdTimeout = setTimeout(() => {
      this.rBlink = 0;
      setTimeout(() => {
        this.randomBlink();
      }, 800 + Math.random() * 3500);
    }, 150 + Math.random() * 50);
  }

  update(delta, motion, isMoveAllowed) {
    if (this.currentFaceMesh === null) return;
    let isFaceTracking = this.facetrack != null && this.facetrack.faceTracker.isFaceTracking;
    let isHeadTracking = this.facetrack != null && this.facetrack.faceTracker.isHeadTracking;

    if (detect.isDesktop && settings.changeOnMoveMouse) {
      if (Math.hypot(motion.x, motion.y) < 0.02) {
        if (!this.center) {
          this.center = true;
          this.updateTemplate();
        }
      } else {
        if ((this.lastMousePosition.x <= 0 && motion.x > 0) || (this.lastMousePosition.x > 0 && motion.x < 0)) {
          this.lastMousePosition.x = motion.x;
          this.updateTemplate();
        }
        if ((this.lastMousePosition.y <= 0 && motion.y > 0) || (this.lastMousePosition.y > 0 && motion.y < 0)) {
          this.lastMousePosition.y = motion.y;
          this.updateTemplate();
        }
        this.center = false;
      }
    }

    this.eyePosition.setTarget(0, 0);
    this.headRotation.setTarget(0, 0, 0);

    if (!isFaceTracking && !isMoveAllowed && touchControls.pointers.length > 0) {
      this.headRotation.easing = detect.isDesktop ? 0.01 : 0.05;

      this.headRotation.setTarget(
        0.03 + touchControls.pointers[0].centeredY * this.movementMultiplier,
        touchControls.pointers[0].centeredX * this.movementMultiplier,
        0
      );

      this.eyePosition.setTarget(
        -touchControls.pointers[0].centeredX * 0.08,
        touchControls.pointers[0].centeredY * 0.08
      );
    }

    let k;
    if (settings.autoUpdateBlendShapes && !this.photoMode) {
      for (k in this.blendShapeTargets) {
        if (k != 'BS_RighBlink' && k != 'BS_LeftBlink') {
          this.blendShapeTargets[k] = blendShapeDefaults[k];
        } else {
          this.blendShapeTargets[k] = Math.max(this.rBlink, blendShapeDefaults[k]);
        }
      }
    } else if (this.photoMode && !isFaceTracking) {
      for (let k in this.photoBlend) {
        this.blendShapeTargets[faceTracksDictionary[k]] = lerp(
          this.blendShapeTargets[faceTracksDictionary[k]],
          this.photoBlend[k],
          0.6
        );
      }
    }

    if (isFaceTracking) {
      if (settings.autoUpdateBlendShapes) {
        for (k in this.facetrack.faceTracker.faceTracks) {
          if (faceTracksDictionary[k] != 'BS_RighBlink' && faceTracksDictionary[k] != 'BS_LeftBlink') {
            this.blendShapeTargets[faceTracksDictionary[k]] = this.facetrack.faceTracker.faceTracks[k];
          } else {
            this.blendShapeTargets[faceTracksDictionary[k]] = Math.max(
              this.rBlink,
              this.facetrack.faceTracker.faceTracks[k]
            );
          }
        }
      }
    }

    if (isHeadTracking) {
      this.headRotation.easing = 0.1;
      this.headRotation.setTarget(
        -this.facetrack.faceTracker.rotation.y * 0.8,
        this.facetrack.faceTracker.rotation.x * 0.9,
        this.facetrack.faceTracker.rotation.z * 0.8
      );

      this.eyePosition.setTarget(
        -this.facetrack.faceTracker.facePosition.x * 0.1,
        this.facetrack.faceTracker.facePosition.y * 0.1
      );
    }

    this.eyePosition.update();
    if (this.props['skins']) {
      this.props['skins'].updateOffset('eyes', this.eyePosition);
    }

    this.headRotation.update();
    this.face.rotation.x = this.headRotation.x;
    this.face.rotation.y = this.headRotation.y;
    this.face.rotation.z = this.headRotation.z;

    for (k in this.blendShapeTargets) {
      let index = this.currentFaceMesh.morphTargetDictionary[k];
      this.currentFaceMesh.morphTargetInfluences[index] +=
        (this.blendShapeTargets[k] - this.currentFaceMesh.morphTargetInfluences[index]) * this.trackAttenuation;

      if (
        this.currentFaceHairMesh &&
        this.currentFaceHairMesh.morphTargetDictionary &&
        this.currentFaceHairMesh.morphTargetDictionary.hasOwnProperty(k)
      ) {
        index = this.currentFaceHairMesh.morphTargetDictionary[k];
        this.currentFaceHairMesh.morphTargetInfluences[index] +=
          (this.blendShapeTargets[k] - this.currentFaceHairMesh.morphTargetInfluences[index]) * this.trackAttenuation;
      }

      if (
        this.currentEyeMesh &&
        this.currentEyeMesh.morphTargetDictionary &&
        this.currentEyeMesh.morphTargetDictionary.hasOwnProperty(k)
      ) {
        index = this.currentEyeMesh.morphTargetDictionary[k];
        this.currentEyeMesh.morphTargetInfluences[index] +=
          (this.blendShapeTargets[k] - this.currentEyeMesh.morphTargetInfluences[index]) * this.trackAttenuation;
      }
    }
  }

  //this is for testing only
  onChangeMorphTarget(blendShapeName, value) {
    this.blendShapeTargets[blendShapeName] = value;
  }

  nextProp(prop) {
    this.props[prop].nextItem += 1;
    this.props[prop].nextItem =
      this.props[prop].nextItem >= this.props[prop].items.length ? 0 : this.props[prop].nextItem;
    this.changeProp(prop, this.props[prop].nextItem, 1.4, 0, 0);
  }

  updateState(state, prevState) {
    Object.keys(state.diff).forEach(prop => {
      if (state.diff[prop].hasOwnProperty('type')) {
        this.changeProp(prop, state.diff[prop].type, 1, 0);
      }
      if (state.diff[prop].hasOwnProperty('color')) {
        let propTexture = prop === 'eyes' ? prop : '';
        let cprop = prop === 'eyes' ? 'skins' : prop;
        this.changePropColor(cprop, propTexture, state.diff[prop].color, 1, 0);
      }
    });
  }
}
