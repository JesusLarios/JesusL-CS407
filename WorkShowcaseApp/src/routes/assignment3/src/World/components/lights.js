import { DirectionalLight } from 'three';

function createLights() {
  // Create a directional light
  const light = new DirectionalLight('white', 13);

  // move the light right, up, and towards us
  light.position.set(20, 31, 31);

  return light;
}

export { createLights };
