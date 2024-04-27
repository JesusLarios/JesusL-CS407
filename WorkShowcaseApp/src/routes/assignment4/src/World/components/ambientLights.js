import { AmbientLight } from 'three';

function createAmbientLights() {
  const ambientLight = new AmbientLight(0x404040, 20);

  return ambientLight;
}

export { createAmbientLights };