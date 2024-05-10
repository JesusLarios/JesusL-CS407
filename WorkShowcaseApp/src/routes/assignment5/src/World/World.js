import { createCamera } from './components/camera.js';
import { createAxesHelper } from './systems/helpers.js';
import { createDiamond } from './components/diamond.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

let scene;
let camera;
let renderer;
let loop;

let diamond;
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

    const controls = createControls(camera, renderer.domElement);

    diamond = createDiamond();
    ({directionalLight, ambientLight, pointLight} = createLights());
    
    loop.updatables.push(controls, diamond);

    scene.add(directionalLight, ambientLight, pointLight, diamond);

    const resizer = new Resizer(container, camera, renderer);

    scene.add(createAxesHelper());
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
    diamond.setAnimation(enabled);
  }

  toggleWireframe(enabled) {
    diamond.setWireframe(enabled);
  }

  togglePointLight(enabled) {
    pointLight.visible = enabled;
  }

  toggleAmbientLight(enabled) {
    ambientLight.visible = enabled;
  }
}

export { World };
