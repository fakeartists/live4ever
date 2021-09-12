import * as THREE from 'three';

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
//import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { SkeletonUtils } from 'three/examples/jsm/utils/SkeletonUtils.js';

export default class AvatarApp {
  data = null;

  constructor(history) {
    console.log('AvatarApp:init');
    this.isPlaying = false;
  }

  init = (nodeRef, audioRef) => {
    this.nodeRef = nodeRef;
    this.audioRef = audioRef;

    // Init event listeners
    this.isPortrait = window.innerHeight > window.innerWidth;
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    this.mouseX = 0;
    this.mouseY = 0;

    window.addEventListener('resize', this.onWindowResize);
    document.addEventListener('mousemove', this.onMouseMove);
    this.nodeRef.addEventListener('click', this.canvasClick);

    // Init audio
    if (this.data.audio) {
      this.audioRef.src = '/assets/sounds/' + this.data.audio;
    }

    //
    this.mixers = [];
    this.clock = new THREE.Clock(true);

    // Initialise three.js scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, this.nodeRef.clientWidth / this.nodeRef.clientHeight, 1, 2000);
    this.camera.position.set(0, 1, 32);

    // Lights
    let ambientLight = new THREE.AmbientLight(0xcccccc, 1.0);
    this.scene.add(ambientLight);

    let pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 20, 0);
    this.scene.add(pointLight);

    // Renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.nodeRef.clientWidth, this.nodeRef.clientHeight);

    // Clear the canvas
    this.nodeRef.innerHTML = '';
    this.nodeRef.appendChild(this.renderer.domElement);

    // Head
    this.head = this.data.head_id;
    console.log(this.head);

    // Background image
    let bgImage = '/assets/images/assets/' + this.data.background;

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(bgImage, () => {
      let backgroundMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(200, 200),
        new THREE.MeshBasicMaterial({
          map: texture
        })
      );

      backgroundMesh.position.set(0, 0, -70);

      this.scene.add(backgroundMesh);
    });

    // 3D models
    this.objLoader = new OBJLoader();
    this.fbxLoader = new FBXLoader();

    var that = this; // Hack?

    // 3D Head
    this.headPath = this.data.head_model;
    this.mtlLoader = new MTLLoader();
    this.mtlLoader.load('/assets/models/' + this.headPath + '.mtl', function(materials) {
      materials.preload();
      that.objLoader.setMaterials(materials);
      that.objLoader.load(
        '/assets/models/' + that.headPath,
        function(object) {
          if (that.isPortrait) {
            // Mobile
            object.position.set(0, 10, 0);
            object.scale.set(0.03, 0.03, 0.03);
          } else {
            // Desktop
            object.scale.set(0.05, 0.05, 0.05);
          }

          that.scene.add(object);
          that.headModel = object;

          that.setHeadModel(object);
        },
        function(xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        function(error) {
          console.log('An error happened');
        }
      );
    });

    // Load 3D objects
    if (this.head === 'nathan') {
      this.fbxLoader.load('/assets/models/nathan/object_nathan.fbx', object => {
        object.scale.set(0.03, 0.03, 0.03);

        this.scene.add(object);
        this.objectModel1 = object;

        let copy = SkeletonUtils.clone(object);
        this.scene.add(copy);
        this.objectModel2 = copy;
      });
    } else if (this.head === 'lila') {
      this.fbxLoader.load('/assets/models/lila/object_lila.fbx', object => {
        // Animation
        this.mixers.push(new THREE.AnimationMixer(object));
        this.mixers[0].clipAction(object.animations[0]).play();

        // Transform
        object.scale.set(0.04, 0.04, 0.04);
        object.rotation.x = 45 * (Math.PI / 180);
        object.rotation.z = -25 * (Math.PI / 180);
        this.scene.add(object);
        this.objectModel1 = object;

        let copy = SkeletonUtils.clone(object);
        //copy.rotation.x = 45 * (Math.PI / 180);
        copy.rotation.y = 180 * (Math.PI / 180);
        this.scene.add(copy);
        this.objectModel2 = copy;

        // Animation
        this.mixers.push(new THREE.AnimationMixer(this.objectModel2));
        this.mixers[1].clipAction(object.animations[0]).play();
      });
    } else if (this.head === 'kevin') {
      /*var gltfLoader = new GLTFLoader();
      gltfLoader.load('/assets/models/kevin/scene.gltf', function (gltf) {
        gltf.scene.scale.set(3, 3, 3);

        that.scene.add(gltf.scene);
        that.objectModel1 = gltf.scene;

        let copy = SkeletonUtils.clone(gltf.scene);
        that.scene.add(copy);
        that.objectModel2 = copy;        
      });*/
    } else if (this.head === 'jean') {
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

      this.objLoader.load('/assets/models/jean/object_matt.obj', function(object) {
        // Set material
        object.traverse(function(child) {
          if (child instanceof THREE.Mesh) {
            child.material = dog_material;
          }
        });

        object.scale.set(0.05, 0.05, 0.05);
        if (that.isPortrait) {
          //object.position.set(3, 0, 0);
        } else {
          //object.position.set(10, 0, 0);
        }
        object.rotation.x = -90 * (Math.PI / 180);
        object.rotation.y = 0 * (Math.PI / 180);
        object.rotation.z = 130 * (Math.PI / 180);
        that.scene.add(object);
        that.objectModel1 = object;

        let copy = SkeletonUtils.clone(object);
        if (that.isPortrait) {
          //object.position.set(-3, 0, 0);
        } else {
          //object.position.set(-10, 0, 0);
        }
        copy.rotation.z = -130 * (Math.PI / 180);
        that.scene.add(copy);
        that.objectModel2 = copy;
      });
    }

    this.setObjectTransforms();
  };

  onWindowResize = () => {
    this.isPortrait = window.innerHeight > window.innerWidth;
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    if (this.camera) {
      this.camera.aspect = this.nodeRef.clientWidth / this.nodeRef.clientHeight;
      this.camera.updateProjectionMatrix();
    }

    if (this.renderer) {
      this.renderer.setSize(this.nodeRef.clientWidth, this.nodeRef.clientHeight);
    }
  };

  onMouseMove = event => {
    this.mouseX = (event.clientX - this.windowHalfX) / 2;
    this.mouseY = (event.clientY - this.windowHalfY) / 2;
  };

  setHeadModel = headModel => {
    this.headModel = headModel;
  };

  start = (nodeRef, audioRef) => {
    this.isPlaying = true;

    // Start audio
    if (this.data.audio) {
      this.audioRef.currentTime = 0;
      this.audioRef.play();
    }

    // Start animation
    this.animate();
  };

  animate = () => {
    if (this.isPlaying) {
      requestAnimationFrame(this.animate);
    }

    // Reposition head
    if (this.headModel) {
      if (this.isPortrait) {
        this.headModel.position.set(0, 10, 0);
        this.headModel.scale.set(0.03, 0.03, 0.03);
      } else {
        this.headModel.position.set(0, 0, 0);
        this.headModel.scale.set(0.05, 0.05, 0.05);
      }

      this.headModel.rotation.set(this.mouseY / this.windowHalfY, this.mouseX / this.windowHalfX, 0);
      this.headModel.position.y = Math.sin(new Date().getTime() * 0.001) * 0.2 + (this.isPortrait ? 2 : 0);
    }

    // Reposition objects
    this.setObjectTransforms();

    var bobAmount = 0.001;
    var bobYOffset = -8;

    var rotationAmount = 1;
    var rotationSpeed = 1;

    if (this.head === 'nathan' || this.head === 'jean') {
      if (this.head === 'nathan') {
        rotationAmount = 1;
        rotationSpeed = 0.0008;
      } else if (this.head === 'jean') {
        rotationAmount = 0.5;
        rotationSpeed = 0.001;
      }

      // Rotate around Y axis
      if (this.objectModel1) {
        this.objectModel1.rotation.y =
          Math.sin(new Date().getTime() * (this.isPortrait ? rotationSpeed : rotationSpeed)) * rotationAmount;
      }

      if (this.objectModel2) {
        this.objectModel2.rotation.y = -this.objectModel1.rotation.y;
      }
    } else if (this.head === 'lila') {
      bobAmount = 0.0005;
      bobYOffset = -6;

      // 3D object baked animation
      if (this.mixers.length === 2) {
        var mixerUpdateDelta = this.clock.getDelta();

        if (this.objectModel1) {
          this.mixers[0].update(mixerUpdateDelta);
        }

        if (this.objectModel2) {
          this.mixers[1].update(mixerUpdateDelta);
        }
      }
    }

    // Bob up and down
    if (this.objectModel1) {
      this.objectModel1.position.y = Math.sin(new Date().getTime() * bobAmount) + (this.isPortrait ? bobYOffset : 0);
    }

    if (this.objectModel2) {
      this.objectModel2.position.y = this.objectModel1.position.y;
    }

    // Update
    this.camera.lookAt(this.scene.position);
    this.renderer.render(this.scene, this.camera);
  };

  setObjectTransforms = () => {
    if (this.head === 'nathan') {
      if (this.isPortrait) {
        if (this.objectModel1) {
          this.objectModel1.position.set(-4, -8, 0);
        }

        if (this.objectModel2) {
          this.objectModel2.position.set(4, -8, 0);
        }
      } else {
        if (this.objectModel1) {
          this.objectModel1.position.set(-10, 0, 0);
        }

        if (this.objectModel2) {
          this.objectModel2.position.set(10, 0, 0);
        }
      }
    } else if (this.head === 'lila') {
      if (this.isPortrait) {
        if (this.objectModel1) {
          this.objectModel1.position.set(3, -6, 0);
        }

        if (this.objectModel2) {
          this.objectModel2.position.set(-3, -6, 0);
        }
      } else {
        if (this.objectModel1) {
          this.objectModel1.position.set(10, 0, 0);
        }

        if (this.objectModel2) {
          this.objectModel2.position.set(-10, 0, 0);
        }
      }
      /*} else if (this.head === 'kevin') {
      if (this.isPortrait) {
        if (this.objectModel1) {
          this.objectModel1.position.set(3.5, -6, 0);
        }

        if (this.objectModel2) {
          this.objectModel2.position.set(-3.5, -6, 0);
        }
      } else {
        if (this.objectModel1) {
          this.objectModel1.position.set(10, 0, 0);
        }

        if (this.objectModel2) {
          this.objectModel2.position.set(-10, 0, 0);
        }
      }*/
    } else if (this.head === 'jean') {
      if (this.isPortrait) {
        if (this.objectModel1) {
          this.objectModel1.position.set(-3.5, -8, 0);
        }

        if (this.objectModel2) {
          this.objectModel2.position.set(3.5, -8, 0);
        }
      } else {
        if (this.objectModel1) {
          this.objectModel1.position.set(-10, 0, 0);
        }

        if (this.objectModel2) {
          this.objectModel2.position.set(10, 0, 0);
        }
      }
    }
  };

  canvasClick = () => {
    if (this.audioRef && this.data.audio) {
      this.audioRef.currentTime = 0;
      this.audioRef.play();
    }
  };

  stop = audioRef => {
    this.isPlaying = false;

    this.audioRef = audioRef;

    // Stop audio
    this.audioRef.pause();
  };
}
