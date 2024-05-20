import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.js';

async function loadRadar() {
  const loader = new GLTFLoader();

  const radarData = await loader.loadAsync('./models/Radar.glb');

    const radar = setupModel(radarData);
    radar.position.set(15, 0, 0);
    radar.scale.set(0.005, 0.005, 0.005);

  return radar;
}

export { loadRadar };
