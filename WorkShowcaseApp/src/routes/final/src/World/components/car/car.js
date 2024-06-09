import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.js';

async function loadCar(camera) {
    const loader = new GLTFLoader();
    
    const carData = await loader.loadAsync('./models/Car.glb');

    const car = setupModel(carData, camera);

    return car;
}

export { loadCar };
