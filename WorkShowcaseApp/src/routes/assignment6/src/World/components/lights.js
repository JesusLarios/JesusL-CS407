import { DirectionalLight, PointLight, AmbientLight } from 'three';

function createLights() {
  const directionalLight = new DirectionalLight('white', 4);
  directionalLight.position.set(10, 10, 10);

  const pointLight = new PointLight(0xff00ff, 3000, 200);
  pointLight.position.set(-10, -10, -10);

  const ambientLight = new AmbientLight(0xffffff, 3);

  return {directionalLight, pointLight, ambientLight};
}

export { createLights };
