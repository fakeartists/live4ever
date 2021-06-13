import { WebGLRenderer, PCFSoftShadowMap } from 'three';
import settings from '../../data/settings';

const renderer = new WebGLRenderer({
  antialias: true,
  alpha: true,
  preserveDrawingBuffer: true
});

renderer.setPixelRatio(window.devicePixelRatio || 1);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = settings.useShadows;
renderer.shadowMap.type = PCFSoftShadowMap;
renderer.setScissorTest(true);
renderer.sortObjects = false;

export default renderer;
