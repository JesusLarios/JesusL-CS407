import { createCamera } from './components/camera.js';
import { createCar } from './components/car.js';
import { createLights } from './components/lights.js';
import { createAmbientLights } from './components/ambientLights.js';
import { createScene } from './components/scene.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

import { MathUtils } from 'three';

let scene;
let camera;
let renderer;
let loop;

let car;
let light;
let ambientLight;

class World {
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);

    car = createCar();
    light = createLights();
    ambientLight = createAmbientLights();

    loop.updatables.push(car);

    scene.add(light, ambientLight, car);

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

  turnFrontTires(direction) {
    if (direction === 'a') {
      car.frontTireAngle = MathUtils.degToRad(20);
    }
    else if (direction === 'd') {
      car.frontTireAngle = MathUtils.degToRad(-20);
    }
  }
}

export { World };
