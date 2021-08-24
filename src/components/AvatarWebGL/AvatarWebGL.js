import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import checkProps from '@jam3/react-check-extra-props';
import { connect } from 'react-redux';
// import { warn } from '../../util/console';
import { selectWindowWidth, selectWindowHeight, selectPath } from '../App/App-selectors';

//import webgl app
//import WebGLAPP from '../../xxx/xxx';

import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { SkeletonUtils } from 'three/examples/jsm/utils/SkeletonUtils.js';

import './AvatarWebGL.scss';

class AvatarWebGL extends React.PureComponent {
  static defaultProps = {
    audio: new Audio('/assets/sounds/jean.mp3')
  };

  //get webgl instance
  // static getWebglApp() {
  //   return this.webglApp;
  // }

  async componentDidMount() {
    console.log('componentDidMount', this.node.clientWidth, this.node.clientHeight);

    //init the webgl app
    // const { path, history } = this.props;
    // if (this.node) {
    //   this.webglApp = new WebGLAPP();
    // }
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.data);

    // Update the webgl app

    //const { width, height, path } = this.props;
    // if (this.webglApp) {
    //   if (width !== prevProps.width || height !== prevProps.height) {
    //     this.webglApp.resize(width, height);
    //   }
    //   this.webglApp.updateState({ path }, prevProps);
    // }

    let isPortrait = window.innerHeight > window.innerWidth;

    // Initialise three.js scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // Camera
    let camera = new THREE.PerspectiveCamera(45, this.node.clientWidth / this.node.clientHeight, 1, 2000);
    camera.position.set(0, 1, 32);

    // Lights
    let ambientLight = new THREE.AmbientLight(0xcccccc, 1.0);
    scene.add(ambientLight);

    let pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 20, 0);
    scene.add(pointLight);

    // Renderer
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(this.node.clientWidth, this.node.clientHeight);

    // TODO Fix this
    this.mount.innerHTML = '';
    this.mount.appendChild(renderer.domElement);

    // Head
    let head = this.props.data.audio.split('.')[0]; // TODO Fix this
    console.log(head);

    // Background image
    let bgImage = '/assets/images/assets/';
    bgImage += this.props.data.background;

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(bgImage, () => {
      let backgroundMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(200, 200),
        new THREE.MeshBasicMaterial({
          map: texture
        })
      );

      backgroundMesh.position.set(0, 0, -70);

      scene.add(backgroundMesh);
    });

    // 3D models
    const loader = new OBJLoader();
    let headModel;
    let objectModel1;
    let objectModel2;

    // 3D Head
    let headPath = this.props.data.head_model;
    const mtlLoader = new MTLLoader();
    mtlLoader.load('/assets/models/' + headPath + '.mtl', function(materials) {
      materials.preload();
      loader.setMaterials(materials);
      loader.load(
        '/assets/models/' + headPath,
        function(object) {
          if (isPortrait) {
            // Mobile
            object.position.set(0, 10, 0);
            object.scale.set(0.03, 0.03, 0.03);
          } else {
            // Desktop
            object.scale.set(0.05, 0.05, 0.05);
          }

          scene.add(object);
          headModel = object;
        },
        function(xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        function(error) {
          console.log('An error happened');
        }
      );
    });

    if (head === 'nathan') {
    } else if (head === 'jean') {
      // Object
      const texture = new THREE.CubeTextureLoader().load([
        '/assets/models/jean/cube_pink.jpg',
        '/assets/models/jean/cube_pink.jpg',
        '/assets/models/jean/cube_pink.jpg',
        '/assets/models/jean/cube_pink.jpg',
        '/assets/models/jean/cube_pink.jpg',
        '/assets/models/jean/cube_pink.jpg'
      ]);
      texture.mapping = THREE.CubeReflectionMapping;

      var dog_material = new THREE.MeshBasicMaterial({ color: 0xffffff, envMap: texture, reflectivity: 1 });

      loader.load('/assets/models/jean/object_matt.obj', function(object) {
        // Set material
        object.traverse(function(child) {
          if (child instanceof THREE.Mesh) {
            child.material = dog_material;
          }
        });

        object.scale.set(0.05, 0.05, 0.05);
        if (isPortrait) {
          object.position.set(3, 0, 0);
        } else {
          object.position.set(10, 0, 0);
        }
        object.rotation.x = -90 * (Math.PI / 180);
        object.rotation.y = 0 * (Math.PI / 180);
        object.rotation.z = 130 * (Math.PI / 180);
        scene.add(object);
        objectModel1 = object;

        let copy = SkeletonUtils.clone(object);
        if (isPortrait) {
          object.position.set(-3, 0, 0);
        } else {
          object.position.set(-10, 0, 0);
        }
        copy.rotation.z = -130 * (Math.PI / 180);
        scene.add(copy);
        objectModel2 = copy;
      });
    }

    var animate = function() {
      requestAnimationFrame(animate);

      if (headModel) {
        if (isPortrait) {
          headModel.position.set(0, 10, 0);
          headModel.scale.set(0.03, 0.03, 0.03);
        } else {
          headModel.position.set(0, 0, 0);
          headModel.scale.set(0.05, 0.05, 0.05);
        }

        headModel.rotation.set(mouseY / windowHalfY, mouseX / windowHalfX, 0);
        headModel.position.y = Math.sin(new Date().getTime() * 0.001) * 0.2 + (isPortrait ? 2 : 0);
      }

      if (objectModel1) {
        if (isPortrait) {
          objectModel1.position.set(-6, 0, 0);
        } else {
          objectModel1.position.set(-10, 0, 0);
        }
        objectModel1.position.y = Math.sin(new Date().getTime() * 0.001) + (isPortrait ? -8 : 0);
        objectModel1.rotation.y = Math.sin(new Date().getTime() * (isPortrait ? 0.00001 : 0.0001));
      }

      if (objectModel2) {
        if (isPortrait) {
          objectModel2.position.set(6, 0, 0);
        } else {
          objectModel2.position.set(10, 0, 0);
        }
        objectModel2.position.y = objectModel1.position.y;
        objectModel2.rotation.y = -objectModel1.rotation.y;
      }

      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };

    animate();

    // Event listeners
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    let mouseX;
    let mouseY;

    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onDocumentMouseMove);

    let webGLContainer = this.node;
    function onWindowResize() {
      isPortrait = window.innerHeight > window.innerWidth;

      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;

      camera.aspect = webGLContainer.clientWidth / webGLContainer.clientHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(webGLContainer.clientWidth, webGLContainer.clientHeight);
    }

    function onDocumentMouseMove(event) {
      mouseX = (event.clientX - windowHalfX) / 2;
      mouseY = (event.clientY - windowHalfY) / 2;
    }
  }

  render() {
    return (
      <section
        className={classnames(`AvatarWebGL`)}
        ref={node => {
          this.node = node;
        }}
      >
        <div ref={ref => (this.mount = ref)} />
      </section>
    );
  }
}

AvatarWebGL.propTypes = checkProps({
  data: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  path: PropTypes.string
});

AvatarWebGL.defaultProps = {
  data: null,
  width: window.innerWidth,
  height: window.innerHeight,
  path: ''
};

const mapStateToProps = state => ({
  width: selectWindowWidth(state),
  height: selectWindowHeight(state),
  path: selectPath(state)
});

//Dispatch props here
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AvatarWebGL);
