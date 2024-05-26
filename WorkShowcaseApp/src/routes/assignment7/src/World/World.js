import { createCamera } from './components/camera.js';
import { createAxesHelper } from './systems/helpers.js';
import { createLights } from './components/lights.js';
import { createPlane } from './components/plane.js';
import { createScene } from './components/scene.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

let scene;
let controls;
let camera;
let renderer;
let loop;

let directionalLight;
let ambientLight;
let pointLight;

class World {
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);
    controls = createControls(camera, renderer.domElement);

    ({directionalLight, ambientLight, pointLight} = createLights());

    const plane = createPlane();
    
    loop.updatables.push(controls);
    scene.add(directionalLight, ambientLight, pointLight, plane);

    const resizer = new Resizer(container, camera, renderer);

    scene.add(createAxesHelper());
  }

  async init() {
  }

  render() {
    // draw a single frame
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
  
  toggleAnimation(enabled) {
    turret.setAnimation(enabled);
    radar.setAnimation(enabled);
  }

  toggleWireframe(enabled) {
    //diamond.setWireframe(enabled);
  }

  togglePointLight(enabled) {
    pointLight.visible = enabled;
  }

  toggleAmbientLight(enabled) {
    ambientLight.visible = enabled;
  }
}

export { World };
