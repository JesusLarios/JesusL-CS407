import {
    Mesh,
    MeshPhongMaterial,
    OctahedronGeometry,
  } from 'three';
  
  function createOctahedron() {
    const geometry = new OctahedronGeometry( 8, 0 );
    const material = new MeshPhongMaterial({ color: 'yellow' });
  
    const octahedron = new Mesh(geometry, material);
    octahedron.position.set(20, 0, 0);
  
    return octahedron;
  }
  
  export { createOctahedron };
  