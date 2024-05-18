import { PerspectiveCamera } from 'three';

function createCamera() {
  const camera = new PerspectiveCamera(
    35, // fov = Field Of View
    1, // aspect ratio (dummy value)
    0.1, // near clipping plane
    300, // far clipping plane
  );

  // move the camera back so we can view the scene
  camera.position.set(0, 5, 25);

  return camera;
}

export { createCamera };
