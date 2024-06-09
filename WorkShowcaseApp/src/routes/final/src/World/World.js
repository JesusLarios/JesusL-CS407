import { loadJet } from './components/jet/jet.js';
import { loadCar } from './components/car/car.js';
import { createCamera } from './components/camera.js';
import { createAxesHelper, createDirectionalLightHelper } from './systems/helpers.js';
import { createLights } from './components/lights.js';
import { createPlane } from './components/plane.js';
import { createScene } from './components/scene.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

let scene;
let camera;
let renderer;
let loop;

let directionalLight;
let ambientLight;
let pointLight;

let car;

class World {
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);
    //controls = createControls(camera, renderer.domElement);

    ({directionalLight, ambientLight, pointLight} = createLights());

    const plane = createPlane();
    
    scene.add(directionalLight, ambientLight, pointLight, plane);

    const resizer = new Resizer(container, camera, renderer);

    scene.add(createAxesHelper(), createDirectionalLightHelper(directionalLight));
  }

  async init() {
    /*
    const radarModel = await loadRadar();
    radar = radarModel;
    loop.updatables.push(radarModel);
    */

    const jet = await loadJet();
    car = await loadCar(camera);

    //camera.lookAt(car.position);

    loop.updatables.push(car);

    scene.add(jet, car);
    jet.visible = false;
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

  moveCharacter(direction, state) {
    //character.move(direction, state);
    car.move(direction, state);
  }

  switchHelicopter(helicopterNumber) {
    helicopter.visible = false;
    helicopter = helicopters[helicopterNumber - 1];
    helicopter.respawn();
    helicopter.visible = true;
    helicopter.setWireframe(true);
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

  toggleArcadeMode(enabled) {
    helicopter.setArcadeMode(enabled);
  }
}

export { World };
