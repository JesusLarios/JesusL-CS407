import { AxesHelper } from 'three';

function createAxesHelper() {
  const helper = new AxesHelper(3);
  return helper;
}

export { createAxesHelper, createGridHelper };
