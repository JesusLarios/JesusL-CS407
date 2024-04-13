import { CapsuleGeometry, Mesh, MeshPhongMaterial } from 'three';

function createCapsule() {
    const geometry = new CapsuleGeometry(3, 3, 13, 12);
  
    const material = new MeshPhongMaterial({ color: 'green', flatShading: true, shininess: 90});

    const capsule = new Mesh(geometry, material);

    capsule.rotation.set(-1.5, 2.6, 1.5);
    capsule.position.set(8, 9, -5)

    return capsule;
}

export { createCapsule };
