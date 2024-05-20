import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.js';

async function loadTurret() {
  const loader = new GLTFLoader();

  const turretData = await loader.loadAsync('./models/Turret.glb');

    const turret = setupModel(turretData);
    turret.position.set(15, 0, 10);
    turret.scale.set(0.005, 0.005, 0.005);

  return turret;
}

export { loadTurret };
