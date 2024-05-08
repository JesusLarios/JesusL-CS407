import { AmbientLight } from 'three';

function createAmbientLights() {
  const ambientLight = new AmbientLight(0xffffff, 1.5);

  return ambientLight;
}

export { createAmbientLights };