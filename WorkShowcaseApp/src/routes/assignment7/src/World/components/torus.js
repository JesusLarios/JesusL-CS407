import {
    Mesh,
    ShaderMaterial,
    TorusGeometry,
    Vector3,
  } from 'three';

// Function provided by ChatGPT
function hexToRgb(hex) {
    // Remove the hash at the start if it's there
    hex = hex.replace(/^#/, '');

    // Parse the r, g, b values
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return { r, g, b };
}
  
function createTorus() {
    const geometry = new TorusGeometry( 8, 3, 16, 100 );

    const vertexShader = `
    uniform bool collapse;
        out vec3 vPosition;
  
        void main() {
            vec3 newPosition = position;
            if (collapse) {
                if (position.x > 0.0 && position.y > 0.0) {
                    newPosition = vec3(0.0, 0.0, position.z);
                } else if (position.x < 0.0 && position.y < 0.0) {
                    newPosition = vec3(0.0, 0.0, position.z);
                }
            }
            vPosition = newPosition;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
    `;
  
    const fragmentShader = `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float speed;
        uniform float time;
        in vec3 vPosition;
  
        void main() {         
            float mixFactor = abs(sin(time/speed));
            vec3 color = mix(color1, color2, mixFactor);
            gl_FragColor = vec4(color, 1.0);
        }
    `;
  
    const material = new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            color1: { value: new Vector3(1.0, 0.0, 0.0) },
            color2: { value: new Vector3(0.0, 1.0, 0.0) },
            collapse: { value: false},
            speed: { value: 5.0 },
            time: { value: 0.0 },
        },
    });
  
    const torus = new Mesh(geometry, material);

    let rotationSpeed = 0;

    torus.setColor1 = (color) => {
        const rgb = hexToRgb(color);
        torus.material.uniforms.color1.value.set(rgb.r / 255, rgb.g / 255, rgb.b / 255);
    };

    torus.setColor2 = (color) => {
        const rgb = hexToRgb(color);
        torus.material.uniforms.color2.value.set(rgb.r / 255, rgb.g / 255, rgb.b / 255);
    };

    torus.setCollapse = (collapse) => {
        torus.material.uniforms.collapse.value = collapse;
    }

    torus.setSpeed = (speed) => {
        torus.material.uniforms.speed.value = speed;
    };

    torus.setWireFrame = (enabled) => {
        torus.material.wireframe = enabled;
    };

    torus.setAnimation = (enabled) => {
        rotationSpeed = enabled ? Math.PI / 4 : 0;
    };

    torus.tick = (delta) => {
        torus.material.uniforms.time.value += delta;
        torus.rotation.x += rotationSpeed * delta;
        torus.rotation.y += rotationSpeed * delta;
    };
  
    return torus;
  }
  
  export { createTorus };
  