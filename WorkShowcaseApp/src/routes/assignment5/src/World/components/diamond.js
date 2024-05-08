import {
    BoxGeometry,
    BufferGeometry,
    BufferAttribute,
    MathUtils,
    Mesh,
    MeshStandardMaterial,
    MeshBasicMaterial,
} from 'three';

function generateVertices() {
    const vertices = new Float32Array([
        -1.0, -1.0,  1.0, // v0
         1.0, -1.0,  1.0, // v1
         1.0,  1.0,  1.0, // v2
        -1.0,  1.0,  1.0, // v3
    ]);
    return vertices;
}

function generateIndicies() {
    const indices = [
        0, 1, 2,
        2, 3, 0,
    ];
}
  
function createDiamond() {
    const geometry1 = new BufferGeometry();
    const vertices = generateVertices();
    const indices = generateIndicies();
    geometry1.setAttribute( 'position', new BufferAttribute(vertices, 3));
    //const material1 = new MeshStandardMaterial();
    const material1 = new MeshBasicMaterial( { color: 0xff0000 } );
    const diamond = new Mesh(geometry1, material1);

    // this method will be called once per frame
    diamond.tick = (delta) => {
    };

    return diamond;
}

export { createDiamond };

