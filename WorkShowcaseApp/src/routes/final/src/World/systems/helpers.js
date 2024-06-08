import { AxesHelper, GridHelper, DirectionalLightHelper, PointLightHelper, SpotLightHelper  } from 'three';

function createAxesHelper() {
  const helper = new AxesHelper(3);
  return helper;
}

function createGridHelper() {
  const helper = new GridHelper(50, 50);
  return helper;
}

function createDirectionalLightHelper(light) {
  const helper = new DirectionalLightHelper(light);
  return helper;
}

function createPointLightHelper(light) {
  const helper = new PointLightHelper(light);
  return helper;
}

function createSpotLightHelper(light) {
  const helper = new SpotLightHelper(light);
  return helper;
}

export { createAxesHelper, createGridHelper, createDirectionalLightHelper, createPointLightHelper, createSpotLightHelper };
