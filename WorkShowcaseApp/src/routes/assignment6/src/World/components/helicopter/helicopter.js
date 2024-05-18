import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.js';

async function loadHelicopter() {
  const loader = new GLTFLoader();

  const heliData = await loader.loadAsync('./models/Helicopter.glb');

  const helicopter = setupModel(heliData);
  helicopter.position.set(0, 2, 0);
  helicopter.scale.set(0.05, 0.05, 0.05);
  helicopter.rotation.z = Math.PI;

  return helicopter;
}

export { loadHelicopter };
