import { AmbientLight } from 'three';

function createAmbientLights() {
  const ambientLight = new AmbientLight(0xffffff, 3);

  return ambientLight;
}

export { createAmbientLights };