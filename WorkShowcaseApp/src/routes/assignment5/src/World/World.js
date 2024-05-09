import { createCamera } from './components/camera.js';
import { createDiamond } from './components/diamond.js';
import { createLights } from './components/lights.js';
import { createAmbientLights } from './components/ambientLights.js';
import { createPointLights } from './components/pointLights.js';
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
let light;
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
    light = createLights();
    ambientLight = createAmbientLights();
    pointLight = createPointLights();

    loop.updatables.push(controls, diamond);

    scene.add(light, ambientLight, pointLight, diamond);

    const resizer = new Resizer(container, camera, renderer);
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
    diamond.toggleAnimation(enabled);
  }

  toggleWireframe(enabled) {
    diamond.setWireframe(enabled);
  }

  togglePointLight(enabled) {
    if (enabled)
      pointLight.intensity = 3000;
    else
      pointLight.intensity = 0;
  }

  toggleAmbientLight(enabled) {
    if (enabled)
      ambientLight.intensity = 3;
    else
      ambientLight.intensity = 0;
  }
}

export { World };
