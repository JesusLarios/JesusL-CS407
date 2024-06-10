import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.js';

async function loadJet() {
    const loader = new GLTFLoader();

    const jetData = await loader.loadAsync('./models/Jet.glb');

    const jet = setupModel(jetData);

    return jet;
}

export { loadJet };









