import { DirectionalLight, PointLight, AmbientLight, SpotLight, RectAreaLight } from 'three';

function createLights() {
  const directionalLight = new DirectionalLight('white', 4);
  directionalLight.position.set(10, 10, 10);

  const pointLight = new PointLight(0xff00ff, 3000, 200);
  pointLight.position.set(-10, -10, -10);

  const ambientLight = new AmbientLight(0xffffff, 3);

  const spotLight = new SpotLight(0xffffff, 200, 25.0, Math.PI / 4, 0.5, 1.0);
  spotLight.position.set(0, 4, -50);

  const rectAreaLight = new RectAreaLight(0xffffff, 50, 10, 10);
  rectAreaLight.position.set(0, 6, 0);
  rectAreaLight.lookAt(0, 0, 0);
  rectAreaLight.rotation.y = Math.PI / 2;

  return {directionalLight, pointLight, ambientLight, spotLight, rectAreaLight};
}

export { createLights };
