import {
  PlaneGeometry,
  Mesh,
  ShaderMaterial,
  DoubleSide,
} from 'three';

// Helper function to load shaders
async function loadShader(path) {
  const response = await fetch(path);
  return await response.text();
}

async function createPlane() {
  const geometry = new PlaneGeometry(100, 100);

  const vertexShader = await loadShader('./shaders/planeVS.glsl');
  const fragmentShader = await loadShader('./shaders/planeFS.glsl');

  const material = new ShaderMaterial({ vertexShader, fragmentShader, side: DoubleSide });

  const plane = new Mesh(geometry, material);

  return plane;
}

export { createPlane };
