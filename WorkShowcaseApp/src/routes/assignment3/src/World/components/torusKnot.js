import { TorusKnotGeometry, Mesh, MeshLambertMaterial } from 'three';

function createTorusKnot() {
    const geometry = new TorusKnotGeometry(3, 1, 300, 16, 1, 6);

    const material = new MeshLambertMaterial({ color: 'brown'});

    const torusKnot = new Mesh(geometry, material);

    torusKnot.rotation.set(-0.5, 2.6, 1.5);
    torusKnot.position.set(-8, -9, -10)

    return torusKnot;
}

export { createTorusKnot };
