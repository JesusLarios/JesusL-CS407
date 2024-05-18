import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.js';

async function loadHelicopter() {
  const loader = new GLTFLoader();

  const heliData = await loader.loadAsync('./models/Helicopter.glb');

  const helicopter = setupModel(heliData);
  helicopter.position.set(0, 0, -5);
  helicopter.scale.set(0.05, 0.05, 0.05);

  return helicopter;
}

export { loadHelicopter };
