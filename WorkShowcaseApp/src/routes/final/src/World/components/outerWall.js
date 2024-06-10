import {
    Object3D,
    BoxGeometry,
    Mesh,
    MeshStandardMaterial,
  } from 'three';
  
  function createOuterWall() {
    const outerWall = new Object3D();

    const frontFace = outerWallFace();
    const backFace = outerWallFace();
    const leftFace = outerWallFace();
    const rightFace = outerWallFace();

    frontFace.position.set(0, 4, -54);
    backFace.position.set(0, 4, 54);
    leftFace.position.set(-54, 4, 0);
    rightFace.position.set(54, 4, 0);

    leftFace.rotation.y = Math.PI / 2;
    rightFace.rotation.y = Math.PI / 2;

    outerWall.add(frontFace, backFace, leftFace, rightFace);
  
    return outerWall;
}

// Helps create the outer walls of the scene
function outerWallFace() {
    const geometry = new BoxGeometry(100, 8, 8);
    const material = new MeshStandardMaterial({ color: 0xA9A9A9 });
    const wall = new Mesh(geometry, material);
  
    return wall;
}
  
  export { createOuterWall };
  