import { createCamera } from './components/camera.js';
import { createCar } from './components/car.js';
import { createLights } from './components/lights.js';
import { createAmbientLights } from './components/ambientLights.js';
import { createPointLights } from './components/pointLights.js';
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
let pointLight;

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
    pointLight = createPointLights();

    loop.updatables.push(car);

    scene.add(light, ambientLight, pointLight, car);

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

  toggleCarRotation(rotate) {
    if (rotate) {
      car.rotationSpeed = MathUtils.degToRad(60);
    }
    else {
      car.rotationSpeed = 0;
    }
  }

  setCarSpeed(speed) {
    car.tireSpeed = MathUtils.degToRad(speed);
  }

  setCarColor(color) {
    let carBody = car.children[0]
    carBody.material.color.set(color);
  }

  setPointLightColor(color) {
    pointLight.color.set(color);
  }

  togglePointLight(enabled) {
    if (enabled)
      pointLight.intensity = 20000;
    else
      pointLight.intensity = 0;
  }

  toggleAmbientLight(enabled) {
    if (enabled)
      ambientLight.intensity = 20;
    else
      ambientLight.intensity = 0;
  }
}

export { World };
