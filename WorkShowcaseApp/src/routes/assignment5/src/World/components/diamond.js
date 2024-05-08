import {
    BufferGeometry,
    BufferAttribute,
    Mesh,
    MeshStandardMaterial,
    MathUtils,
} from 'three';

function generateVertices() {
    const r1 = 1;
    const i = r1*(Math.sqrt(3)/2);

    const r2 = 1.4;
    const j = r2*(Math.sqrt(3)/2);

    const x = r2 * (1 - 0.5) + 0.5 * 0.5;
    const y = 0 * (1 - 0.5) + i * 0.5;

    const vertices = [
        r1, 0, 0, // 0
        r1/2, i, 0, // 1
        -r1/2, i, 0, // 2
        -r1, 0, 0, // 3
        -r1/2, -i, 0, // 4
        r1/2, -i, 0, // 5

        r2, 0, -1, // 6
        x, y, -1, // 7
        r2/2, j, -1, // 8
        0, r2, -1, // 9
        -r2/2, j, -1, // 10
        -x, y, -1, // 11
        -r2, 0, -1, // 12
        -x, -y, -1, // 13
        -r2/2, -j, -1, // 14
        0, -r2, -1, // 15
        r2/2, -j, -1, // 16
        x, -y, -1, // 17

        0, 0, -3, // 18
    ];
    return vertices;
}

function generateIndicies() {
    const indices = [
        0, 1, 2,
        0, 2, 3,
        0, 3, 4,
        0, 4, 5,

        6, 7, 0,
        7, 1, 0,
        7, 8, 1,
        8, 9, 1,
        1, 9, 2,
        9, 10, 2,
        2, 10, 11,
        2, 11, 3,
        3, 11, 12,
        3, 12, 13,
        4, 3, 13,
        4, 13, 14,
        15, 4, 14,
        5, 4, 15,
        16, 5, 15,
        17, 5, 16,
        17, 0, 5,
        6, 0, 17,

        6, 18, 7,
        7, 18, 8,
        8, 18, 9,
        9, 18, 10,
        10, 18, 11,
        11, 18, 12,
        13, 12, 18,
        14, 13, 18,
        15, 14, 18,
        16, 15, 18,
        18, 17, 16,
        18, 6, 17,
    ];
    return indices;
}


function generateColors() {
    const colors = new Float32Array([
        0, 0, 255,   
        0, 0, 255,     
        0, 0, 255,    
        0, 0, 255,   
        0, 0, 255, 
        0, 0, 255,   

        255, 165, 0,   
        128, 0, 255,   
        255, 165, 0,   
        128, 0, 255, 
        255, 165, 0, 
        128, 0, 255,
        255, 165, 0,   
        128, 0, 255,   
        255, 165, 0,  
        128, 0, 255,   
        255, 165, 0,   
        128, 0, 255, 

        0, 0, 0 
    ]);
    return colors.map((color) => color / 255);
}

  
function createDiamond() {
    const geometry1 = new BufferGeometry();
    const indices = generateIndicies();
    const vertices = new Float32Array(generateVertices());
    const colors = new Float32Array(generateColors());
    geometry1.setIndex(indices);
    geometry1.setAttribute( 'position', new BufferAttribute(vertices, 3));
    geometry1.setAttribute( 'color', new BufferAttribute(colors, 3));

    const material1 = new MeshStandardMaterial( { color: 0xffffff, vertexColors: true} );
    const diamond = new Mesh(geometry1, material1);

    diamond.rotationSpeed = MathUtils.degToRad(0);

    diamond.toggleAnimation = (enabled) => {
        if (enabled) {
            diamond.rotationSpeed = MathUtils.degToRad(100);
        }
        else {
            diamond.rotationSpeed = 0;
        }
        
    };

    // this method will be called once per frame
    diamond.tick = (delta) => {
        // increase the cube's rotation each frame
        diamond.rotation.z += diamond.rotationSpeed * delta;
    };

    diamond.setWireframe = (enabled) => {
        diamond.material.wireframe = enabled;
    };

    return diamond;
}

export { createDiamond };

