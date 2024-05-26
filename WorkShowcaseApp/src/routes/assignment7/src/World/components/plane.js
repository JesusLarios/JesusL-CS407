import {
    PlaneGeometry,
    Mesh,
    MeshStandardMaterial,
    DoubleSide,
  } from 'three';
  
  function createPlane() {
    const geometry = new PlaneGeometry(100, 100);
    const material = new MeshStandardMaterial({ color: 0x00ff44, side: DoubleSide });
    const plane = new Mesh(geometry, material);
  
    plane.rotation.set(-0.5 * Math.PI, 0, 0);
  
    return plane;
  }
  
  export { createPlane };
  