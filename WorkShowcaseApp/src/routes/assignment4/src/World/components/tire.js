import {
    BoxGeometry,
    CylinderGeometry,
    MathUtils,
    Mesh,
    MeshStandardMaterial,
  } from 'three';
  
  function createTire() {
    const geometry1 = new BoxGeometry(0, 0, 0);
    const material1 = new MeshStandardMaterial();
    const tire = new Mesh(geometry1, material1);

    const geometry2 = new CylinderGeometry(5, 5, 3, 30, 1);
    const material2 = new MeshStandardMaterial({ color: 'black' });
    const cylinder = new Mesh(geometry2, material2);

    tire.add(cylinder);

    const geometry3 = new BoxGeometry(0.5, 0.5, 8);
    const material3 = new MeshStandardMaterial({ color: 'dimgray' });

    for (let i = 0; i < 4; i++) {
        const cube = new Mesh(geometry3, material3);
        cylinder.add(cube);

        cube.position.set(0, 1.5, 0);
        cube.rotation.set(0, MathUtils.degToRad(45 * i), 0);
    }
  
    tire.rotationSpeed = MathUtils.degToRad(180);
  
    // this method will be called once per frame
    tire.tick = (delta) => {
      // increase the cube's rotation each frame
      cylinder.rotation.y += tire.rotationSpeed * delta;
    };
  
    return tire;
  }
  
  export { createTire };
  