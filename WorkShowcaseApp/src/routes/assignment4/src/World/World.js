import { createCamera } from './components/camera.js';
import { createCar } from './components/car.js';
import { createLights } from './components/lights.js';
import { createAmbientLights } from './components/ambientLights.js';
import { createPointLights } from './components/pointLights.js';
import { createScene } from './components/scene.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

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

  turnCar(key) {
    if (key === 'a') {
      car.turn('left');
    }
    else if (key === 'd') {
      car.turn('right');
    }
  }

  stopTurningCar(key) {
    if (key === 'a' || key === 'd') {
      car.turn('stop');
    }
  }

  moveCar(key) {
    if (key === 'w') {
      car.drive('forward');
    }
    else if (key === 's') {
      car.drive('backward');
    }
  }

  stopMovingCar(key) {
    if (key === 'w' || key === 's') {
      car.drive('stop');
    }
  }

  toggleCarRotation(rotate) {
    car.toggleRotation(rotate);
  }

  setCarTopSpeed(speed) {
    car.setTopSpeed(speed);
  }

  setCarColor(color) {
    car.SetBodyColor(color);
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
