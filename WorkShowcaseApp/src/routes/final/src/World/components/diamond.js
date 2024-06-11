import {
    BufferGeometry,
    BufferAttribute,
    Mesh,
    MeshPhongMaterial,
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
        // Top
        0, 0, 0, // 0
        r1, 0, 0, // 1
        r1/2, i, 0, // 2
        -r1/2, i, 0, // 3
        -r1, 0, 0, // 4
        -r1/2, -i, 0, // 5
        r1/2, -i, 0, // 6

        // Middle
        r2, 0, -1, // 7
        x, y, -1, // 8
        r2/2, j, -1, // 9
        0, r1, -1, // 10
        -r2/2, j, -1, // 11
        -x, y, -1, // 12
        -r2, 0, -1, // 13
        -x, -y, -1, // 14
        -r2/2, -j, -1, // 15
        0, -r1, -1, // 16
        r2/2, -j, -1, // 17
        x, -y, -1, // 18

        // Bottom
        0, 0, -3, // 19
    ];
    return vertices;
}

function generateIndicies() {
    const indices = [
        // Top
        1, 2, 0, 
        2, 3, 0, 
        0, 3, 4, 
        0, 4, 5, 
        6, 0, 5, 
        1, 0, 6,

        // Middle
        7, 8, 1, 
        8, 2, 1, 
        8, 9, 2, 
        9, 10, 2, 
        2, 10, 3, 
        10, 11, 3, 
        3, 11, 12,
        3, 12, 4,
        4, 12, 13,
        4, 13, 14,
        5, 4, 14,
        5, 14, 15,
        16, 5, 15,
        6, 5, 16, 
        17, 6, 16,
        18, 6, 17,
        18, 1, 6,
        7, 1, 18,

        // Bottom
        19, 8, 7,
        19, 9, 8,
        9, 19, 10,
        10, 19, 11,
        11, 19, 12,
        12, 19, 13,
        14, 13, 19,
        15, 14, 19,
        16, 15, 19,
        17, 16, 19,
        19, 18, 17,
        19, 7, 18,
    ];
    return indices;
}


function generateColors() {
    const colors = new Float32Array([
        // Top
        0, 0, 255, // 0
        0, 0, 255, // 1 
        0, 0, 255, // 2    
        0, 0, 255, // 3    
        0, 0, 255, // 4   
        0, 0, 255, // 5 
        0, 0, 255, // 6   

        // Middle
        3, 248, 252, // 7   
        128, 0, 255, // 8   
        3, 248, 252, // 9   
        128, 0, 255, // 10 
        3, 248, 252, // 11 
        128, 0, 255, // 12
        3, 248, 252, // 13   
        128, 0, 255, // 14   
        3, 248, 252, // 15  
        128, 0, 255, // 16   
        3, 248, 252, // 17   
        128, 0, 255, // 18 

        // Bottom
        0, 0, 0, // 19
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
    geometry1.computeVertexNormals();

    const material1 = new MeshPhongMaterial( { color: 0xffffff, vertexColors: true} );
    const diamond = new Mesh(geometry1, material1);

    diamond.position.set(10, 2, 10);
    diamond.rotation.x = -Math.PI / 2;
    diamond.scale.set(0.5, 0.5, 0.5);
    diamond.rotationSpeed = 0;

    diamond.setAnimation = (enabled) => {
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

