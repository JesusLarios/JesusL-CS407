import { createCamera } from './components/camera.js';
import { createCapsule } from './components/capsule.js';
import { createTorusKnot } from './components/torusKnot.js';
import { createLights } from './components/lights.js';
import { createPointLights } from './components/pointLights.js';
import { createScene } from './components/scene.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';

let scene;
let camera;
let renderer;

class World {
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    container.append(renderer.domElement);

    const capsule = createCapsule();
    const torusKnot = createTorusKnot();
    const light = createLights();
    const pointLight = createPointLights();

    scene.add(capsule, torusKnot, light, pointLight);

    const resizer = new Resizer(container, camera, renderer);
  }

  render() {
    // draw a single frame
    renderer.render(scene, camera);
  }
}

export { World };
