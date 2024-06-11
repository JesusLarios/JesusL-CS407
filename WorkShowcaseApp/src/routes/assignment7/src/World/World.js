import { createCamera } from './components/camera.js';
import { createAxesHelper } from './systems/helpers.js';
import { createLights } from './components/lights.js';
import { createTorus } from './components/torus.js';
import { createOctahedron } from './components/octahedron.js';
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

let torus;
let octahedron

class World {
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);
    controls = createControls(camera, renderer.domElement);

    ({directionalLight, ambientLight, pointLight} = createLights());

    torus = createTorus();
    octahedron = createOctahedron();
    
    loop.updatables.push(controls, torus);
    scene.add(directionalLight, ambientLight, pointLight, torus, octahedron);

    const resizer = new Resizer(container, camera, renderer);

    scene.add(createAxesHelper());
  }

  async init() {
    /*
    plane = await createPlane();
    scene.add(plane);
    */
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
    torus.setAnimation(enabled);
  }

  toggleWireframe(enabled) {
    torus.setWireFrame(enabled);
  }

  togglePointLight(enabled) {
    pointLight.visible = enabled;
  }

  toggleAmbientLight(enabled) {
    ambientLight.visible = enabled;
  }

  setColor1(color) {
    torus.setColor1(color);
  }

  setColor2(color) {
    torus.setColor2(color);
  }

  setColorSpeed(speed) {
    torus.setSpeed(speed);
  }

  setCollapse(collapse) {
    torus.setCollapse(collapse);
  }
}

export { World };
