import { loadJet } from './components/jet/jet.js';
import { loadCar } from './components/car/car.js';
import { createCamera } from './components/camera.js';
import { createAxesHelper, createGridHelper, createDirectionalLightHelper } from './systems/helpers.js';
import { createLights } from './components/lights.js';
import { createPlane } from './components/plane.js';
import { createOuterWall } from './components/outerWall.js';
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
let spotLight;
let rectAreaLight;

let car;
let jet;

class World {
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);
    //controls = createControls(camera, renderer.domElement);

    ({directionalLight, ambientLight, pointLight, spotLight, rectAreaLight} = createLights());

    const plane = createPlane();
    const outerWall = createOuterWall();
    
    scene.add(directionalLight, ambientLight, pointLight, spotLight, rectAreaLight, plane, outerWall);

    const resizer = new Resizer(container, camera, renderer);

    scene.add(createGridHelper(), createAxesHelper(), createDirectionalLightHelper(directionalLight));
  }

  async init() {
    const jetModel = await loadJet();
    jet = jetModel;
    loop.updatables.push(jet);

    const carModel = await loadCar(camera);
    car = carModel;
    loop.updatables.push(car);

    scene.add(jet, car);
    //jet.visible = false;
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

  moveCar(direction, state) {
    //character.move(direction, state);
    car.move(direction, state);
  }

  respawnCar() {
    car.respawn();
    jet.attack();
  }

  setFog(enabled) {
    scene.setFog(enabled);
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
