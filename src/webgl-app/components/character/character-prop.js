import { SkinnedMesh, Mesh, Color, Vector4, Vector3, Vector2, RepeatWrapping } from 'three';
import customMaterial from './material';
import assetManager from '../../util/asset-loader/asset-manager';
import animate, { Power1 } from '../../util/gsap-animate';
import { log } from '../../util/console';
import customize from '../../data/customize';
import settings from '../../data/settings';

/**
.*
.* @class
.* @memberof WRAR
.* @author Fabio Toste
*/
export default class CharacterProp {
  constructor(parent, id, items = []) {
    this.parent = parent;
    this.id = id;
    this.items = items;

    this.currentColors = { main: -1 };
    this.currentItem = -1;
    this.nextItem = 0;

    this.currentMesh = null;
    this.prevMesh = null;

    this.isAnimating = false;
    this.isAnimatingAccessory = false;
    this.time = 0;
    this.patternFade = 0;
    this.alpha = { main: 0 };

    this.setItemData();
  }

  setItemData() {
    let totalItens = this.items.length;
    let transform = {
      scale: { x: 1, y: 1, z: 1 },
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 }
    };
    for (let i = 0; i < totalItens; i++) {
      if (this.items[i].mesh) {
        let mesh = assetManager.get(this.id + '-' + i + '-mesh');
        if (mesh && typeof mesh == 'object') {
          mesh.traverse(child => {
            if (child instanceof SkinnedMesh || child instanceof Mesh) {
              this.items[i].mesh = child;

              let materials = [];
              if (this.items[i].hasOwnProperty('materials')) materials = this.items[i].materials;
              this.items[i].mesh.material = this.createMaterials(i, materials);

              transform.scale.x = customize.global.transform.scale.x;
              transform.scale.y = customize.global.transform.scale.y;
              transform.scale.z = customize.global.transform.scale.z;

              transform.position.x = customize.global.transform.position.x;
              transform.position.y = customize.global.transform.position.y;
              transform.position.z = customize.global.transform.position.z;

              transform.rotation.x = customize.global.transform.rotation.x;
              transform.rotation.y = customize.global.transform.rotation.y;
              transform.rotation.z = customize.global.transform.rotation.z;

              if (this.items[i].hasOwnProperty('transform')) {
                if (this.items[i].transform.hasOwnProperty('scale')) {
                  transform.scale = this.items[i].transform.scale;
                }
                if (this.items[i].transform.hasOwnProperty('position')) {
                  transform.position = this.items[i].transform.position;
                }
                if (this.items[i].transform.hasOwnProperty('rotation')) {
                  transform.rotation = this.items[i].transform.rotation;
                }
              }
              this.items[i]['transform'] = {
                scale: {
                  x: transform.scale.x,
                  y: transform.scale.y,
                  z: transform.scale.z
                },
                position: {
                  x: transform.position.x,
                  y: transform.position.y,
                  z: transform.position.z
                },
                rotation: {
                  x: transform.rotation.x,
                  y: transform.rotation.y,
                  z: transform.rotation.z
                }
              };

              this.items[i].mesh.scale.set(transform.scale.x, transform.scale.y, transform.scale.z);
              this.items[i].mesh.position.set(transform.position.x, transform.position.y, transform.position.z);
              this.items[i].mesh.rotation.x = transform.rotation.x;
              this.items[i].mesh.rotation.y = transform.rotation.y;
              this.items[i].mesh.rotation.z = transform.rotation.z;

              this.items[i].mesh.castShadow = settings.useShadows;
              this.items[i].mesh.receiveShadow = settings.useShadows;
            }
          });
        }
      }
    }
  }

  createMaterials(index, materials) {
    let materialArray = [];
    let uvScale = new Vector2(1, 1);
    if (materials.length == 0) {
      materialArray = [
        customMaterial({
          name: this.id + 'prop',
          color: 0xffffff,
          metalness: 0,
          roughness: 1,
          transparent: true
        })
      ];
    } else {
      for (let i = 0; i < materials.length; i++) {
        let baseMaterial = materials[i];
        let maskType = 0.0;

        if (baseMaterial.envMap) {
          baseMaterial.envMap = assetManager.get('texture-cubemap');
        }
        if (baseMaterial.hasOwnProperty('normalScale')) {
          baseMaterial.normalScale = new Vector2(baseMaterial.normalScale.x, baseMaterial.normalScale.y);
        }
        if (baseMaterial.hasOwnProperty('roughnessMap')) {
          baseMaterial['roughnessMap'] = assetManager.get(this.id + '-' + index + '-texture-' + i);
        }
        if (baseMaterial.hasOwnProperty('metalnessMap')) {
          baseMaterial['metalnessMap'] = assetManager.get(this.id + '-' + index + '-texture-' + i);
        }

        if (baseMaterial.hasOwnProperty('maskType')) {
          let val = baseMaterial.maskType;
          switch (val) {
            case 'mask':
              maskType = 1.0;
              break;
            case 'alpha':
              maskType = 2.0;
              break;
            case 'offset':
              maskType = 3.0;
              break;
            case 'offsetmask':
              maskType = 4.0;
              break;
            default:
              maskType = 0.0;
              break;
          }
        }

        if (baseMaterial.hasOwnProperty('uvScale')) {
          uvScale.x = baseMaterial.uvScale.x;
          uvScale.y = baseMaterial.uvScale.y;
        }

        let config = {
          name: this.id + 'prop',
          color: 0xffffff,
          metalness: 0,
          roughness: 1,
          transparent: true
        };
        if (baseMaterial.hasOwnProperty('normal')) {
          let normalTex = assetManager.get(this.id + '-' + index + '-normal-' + i);
          normalTex.wrapS = RepeatWrapping;
          normalTex.wrapT = RepeatWrapping;
          normalTex.repeat.set(uvScale.x, uvScale.y);
          config.normalMap = normalTex;
        }
        for (const p in baseMaterial) {
          if (
            p !== 'texture' &&
            p !== 'normal' &&
            p !== 'mask' &&
            p !== 'update' &&
            p !== 'isNull' &&
            p != 'maskType' &&
            p != 'uvScale' &&
            p != 'repeat' &&
            p != 'offsetColor' &&
            p != 'maskUvScale' &&
            p != 'fresnelBlend' &&
            p != 'discardAlpha'
          ) {
            config[p] = baseMaterial[p];
          }
        }

        let material = baseMaterial.hasOwnProperty('isNull') && baseMaterial.isNull ? null : customMaterial(config);
        if (material) {
          if (baseMaterial.hasOwnProperty('fresnelBlend')) {
            material.uniforms.uFresnelBlend.value = baseMaterial.fresnelBlend;
          }

          if (baseMaterial.hasOwnProperty('texture')) {
            let texture = assetManager.get(this.id + '-' + index + '-texture-' + i);
            if (
              !baseMaterial.hasOwnProperty('repeat') ||
              (baseMaterial.hasOwnProperty('repeat') && baseMaterial.repeat)
            ) {
              texture.wrapS = RepeatWrapping;
              texture.wrapT = RepeatWrapping;
            }
            material.uniforms.uTexture.value = texture;
          }
          material.uniforms.uvScale.value = uvScale;
          material.uniforms.uMaskType.value = maskType;

          if (baseMaterial.hasOwnProperty('discardAlpha')) {
            material.uniforms.uDiscardAlpha.value = baseMaterial.discardAlpha;
          }

          if (baseMaterial.hasOwnProperty('color')) {
            let color = new Color(color);
            color = new Vector4(color.r, color.g, color.b, 1.0);
            material.uniforms.uColor.value = color;
          }

          if (baseMaterial.hasOwnProperty('aoMapIntensity')) {
            material.uniforms.aoMapIntensity.value = baseMaterial.aoMapIntensity;
          }
          if (baseMaterial.hasOwnProperty('offsetColor')) {
            let color = baseMaterial.offsetColor;
            material.uniforms.uColorOffset.value = new Vector4(color.x, color.y, color.z, 1.0);
          }
          if (baseMaterial.hasOwnProperty('maskUvScale')) {
            material.uniforms.uMaskUvScale.value = baseMaterial.maskUvScale;
          }

          let update = true;
          if (baseMaterial.hasOwnProperty('update')) {
            update = baseMaterial.update;
          }
          material['update'] = update;
        }
        materialArray.push(material);
      }
    }

    return materialArray.length === 1 ? materialArray[0] : materialArray;
  }

  changeColor(id = '', color = 0xffffff, time = 0.3, delay = 0, isSecundary = false, force = false) {
    let colorID = 'main';
    if (id === '') {
      if (!force && color === this.currentColors.main) return;
      this.currentColors.main = color;
    } else {
      colorID = id;
      if (!force && color === this.currentColors[id]) return;
      this.currentColors[id] = color;
    }

    let mesh = this.items[this.currentItem].mesh;
    if (mesh) {
      color = new Color(color);
      color = new Vector4(color.r, color.g, color.b, 1.0);
      let materials = mesh.material.length ? mesh.material : [mesh.material];
      let arrayLength = materials.length;
      this.alpha[colorID] = 0;
      animate.to(this.alpha, time, {
        [colorID]: 1,
        ease: Power1.easeOut,
        delay: delay,
        onUpdate: () => {
          for (let i = 0; i < arrayLength; i++) {
            let material = materials[i];
            if ((id === '' && material.update) || material.name === id) {
              if (isSecundary && material.uniforms.uSecundaryColor) {
                material.uniforms.uSecundaryColor.value.lerp(color, this.alpha[colorID]);
              } else {
                material.uniforms.uColor.value.lerp(color, this.alpha[colorID]);
              }
            }
          }
        }
      });
    }
  }

  updateItemHairPosition(index, time, delay, hairIndex, mesh = null, glitch = false) {
    if (this.isAnimatingAccessory) return;
    mesh = mesh || this.currentMesh;
    if (mesh && this.items[index].hasOwnProperty('offsetHair')) {
      let transform = {
        scale: new Vector3(
          this.items[index].transform.scale.x,
          this.items[index].transform.scale.y,
          this.items[index].transform.scale.z
        ),
        position: new Vector3(
          this.items[index].transform.position.x,
          this.items[index].transform.position.y,
          this.items[index].transform.position.z
        ),
        rotation: new Vector3(
          this.items[index].transform.rotation.x,
          this.items[index].transform.rotation.y,
          this.items[index].transform.rotation.z
        )
      };

      let iniRotation = new Vector3(
        this.items[index].transform.rotation.x,
        this.items[index].transform.rotation.y,
        this.items[index].transform.rotation.z
      );

      if (hairIndex < this.items[index].offsetHair.length) {
        if (this.items[index].offsetHair[hairIndex].hasOwnProperty('position')) {
          transform.position.x += this.items[index].offsetHair[hairIndex].position.x;
          transform.position.y += this.items[index].offsetHair[hairIndex].position.y;
          transform.position.z += this.items[index].offsetHair[hairIndex].position.z;
        }
        if (this.items[index].offsetHair[hairIndex].hasOwnProperty('rotation')) {
          transform.rotation.x += this.items[index].offsetHair[hairIndex].rotation.x;
          transform.rotation.y += this.items[index].offsetHair[hairIndex].rotation.y;
          transform.rotation.z += this.items[index].offsetHair[hairIndex].rotation.z;
        }
        if (this.items[index].offsetHair[hairIndex].hasOwnProperty('scale')) {
          transform.scale.x += this.items[index].offsetHair[hairIndex].scale.x;
          transform.scale.y += this.items[index].offsetHair[hairIndex].scale.y;
          transform.scale.z += this.items[index].offsetHair[hairIndex].scale.z;
        }
      }

      this.isAnimatingAccessory = true;

      if (glitch == false) {
        this.propTime = 0;
        animate
          .to(this, time, {
            propTime: 1,
            ease: Power1.easeInOut,
            delay: delay,
            onUpdate: () => {
              mesh.scale.lerp(transform.scale, this.propTime);
              mesh.position.lerp(transform.position, this.propTime);
              iniRotation.lerp(transform.rotation, this.propTime);
              mesh.rotation.x = iniRotation.x;
              mesh.rotation.y = iniRotation.y;
              mesh.rotation.z = iniRotation.z;
            }
          })
          .then(() => {
            this.isAnimatingAccessory = false;
          });
      } else {
        let inTime = time;

        this.aoutTime = 1;

        mesh.scale.set(transform.scale.x, transform.scale.y, transform.scale.z);
        mesh.position.set(transform.position.x, transform.position.y, transform.position.z);
        mesh.rotation.x = transform.rotation.x;
        mesh.rotation.y = transform.rotation.y;
        mesh.rotation.z = transform.rotation.z;

        let inDelay = delay;
        this.atime = 0;
        animate
          .to(this, inTime, {
            atime: 1,
            ease: Power1.easeOut,
            delay: inDelay,
            onUpdate: () => {
              this.updateMaterialsShader(index, 'all', 'uTime', this.atime);
              this.currentMesh = mesh;
            }
          })
          .then(() => {
            this.isAnimatingAccessory = false;
          });
      }
    }
  }

  changeItem(index, time = 0, delay = 0, hairIndex = 0) {
    if (this.isAnimating || index === this.currentItem || index >= this.items.length || index < 0) return;
    log('WEBGLAPP:: Change ' + this.id + ' from ' + this.currentItem + ' to ' + index);

    this.isAnimating = true;
    let inTime = time;

    this.prevMesh = this.currentMesh;

    if (this.prevMesh) this.parent.remove(this.prevMesh);

    this.currentItem = index;
    let mesh = this.items[index].mesh;
    this.updateItemHairPosition(index, 0, 0, hairIndex, mesh);
    if (mesh) this.parent.add(mesh);

    for (const k in this.currentColors) {
      let id = k === 'main' ? '' : k;
      this.changeColor(id, this.currentColors[k], 0, 0, false, true);
    }

    let inDelay = delay;
    this.time = 0;
    animate
      .to(this, inTime, {
        time: 1,
        ease: Power1.easeOut,
        delay: inDelay,
        onUpdate: () => {
          this.updateMaterialsShader(index, 'all', 'uTime', this.time);
          this.currentMesh = mesh;
        }
      })
      .then(() => {
        this.isAnimating = false;
      });
  }

  getMaterialIndexByName(mesh, name) {
    let index = 0;
    let arrayLength = mesh.material.length ? mesh.material.length : false;
    if (arrayLength) {
      for (let i = 0; i < arrayLength; i++) {
        let material = mesh.material[i];
        if (material && material.name === name) {
          index = i;
          break;
        }
      }
    }
    return index;
  }

  updateMaterialsShader(index, id = 'all', param, time) {
    if (index >= this.items.length || index < 0) return;
    let mesh = this.items[index].mesh;
    if (!mesh) return;
    let arrayLength = mesh.material.length ? mesh.material.length : false;
    if (arrayLength) {
      for (let i = 0; i < arrayLength; i++) {
        let material = mesh.material[i];
        if (material && material.uniforms && (material.name === id || id === 'all')) {
          if (material.uniforms[param]) material.uniforms[param].value = time;
        }
      }
    } else {
      if (mesh.material.uniforms[param]) mesh.material.uniforms[param].value = time;
    }
  }

  updateOffset(id = 'all', offset) {
    let mesh = this.items[this.currentItem].mesh;
    if (!mesh) return;
    let arrayLength = mesh.material.length ? mesh.material.length : false;
    if (arrayLength) {
      for (let i = 0; i < arrayLength; i++) {
        let material = mesh.material[i];
        if (material && material.uniforms && (material.name === id || id === 'all')) {
          if (material.uniforms.uvOffset) material.uniforms.uvOffset.value = offset;
        }
      }
    } else {
      if (mesh.material.uniforms.uvOffset) mesh.material.uniforms.uvOffset.value = offset;
    }
  }

  nextMesh() {
    this.nextItem += 1;
    this.nextItem = this.nextItem >= this.items.length ? 0 : this.nextItem;
    this.changeItem(this.nextItem, 1.4, 0, 0);
  }

  nextProp() {
    this.parent.nextProp(this.id);
  }
}
