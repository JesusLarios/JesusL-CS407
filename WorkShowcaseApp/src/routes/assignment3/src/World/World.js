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

let capsule;
let torusKnot;
let light;
let pointLight;

class World {
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    container.append(renderer.domElement);

    capsule = createCapsule();
    torusKnot = createTorusKnot();
    light = createLights();
    pointLight = createPointLights();

    scene.add(capsule, torusKnot, light, pointLight);

    const resizer = new Resizer(container, camera, renderer);
  }

  render() {
    // draw a single frame
    renderer.render(scene, camera);
  }

  toggleCapsuleReflection(showCapsuleReflection) {
    if (showCapsuleReflection)
    {
      capsule.material.shininess = 90;
    }
    else
    {
      capsule.material.shininess = 0;
    }
  }
}

export { World };
