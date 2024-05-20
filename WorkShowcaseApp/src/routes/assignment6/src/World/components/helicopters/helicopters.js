import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.js';

async function loadHelicopters() {
  const loader = new GLTFLoader();

  const [heli1Data, heli2Data, heli3Data, heli4Data] = await Promise.all([
    loader.loadAsync('./models/Helicopter1.glb'),
    loader.loadAsync('./models/Helicopter2.glb'),
    loader.loadAsync('./models/Helicopter3.glb'),
    loader.loadAsync('./models/Helicopter4.glb'),
]);

    const heli1 = setupModel(heli1Data);
    heli1.setLandingPoint(2);
    heli1.respawn();
    heli1.scale.set(0.05, 0.05, 0.05);

    const heli2 = setupModel(heli2Data);
    heli2.respawn();
    heli2.scale.set(0.6, 0.6, 0.6);

    const heli3 = setupModel(heli3Data);
    heli3.respawn();
    heli3.scale.set(0.6, 0.6, 0.6);

    const heli4 = setupModel(heli4Data);
    heli4.setLandingPoint(1.1);
    heli4.respawn();
    heli4.scale.set(0.01, 0.01, 0.01);

    return {
        heli1,
        heli2,
        heli3,
        heli4,
    };
}

export { loadHelicopters };
  