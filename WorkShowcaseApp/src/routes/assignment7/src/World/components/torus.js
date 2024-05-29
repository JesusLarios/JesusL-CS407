import {
    Mesh,
    ShaderMaterial,
    TorusGeometry,
  } from 'three';
  
  function createTorus() {
    const geometry = new TorusGeometry( 8, 3, 16, 100 );

    const vertexShader = `
        out vec3 vPosition;
  
        void main() {
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;
  
    const fragmentShader = `
        uniform float time;
        in vec3 vPosition;
  
        void main() {
            vec3 color1 = vec3(1.0, 0.0, 0.0);
            vec3 color2 = vec3(0.0, 1.0, 0.0);
            
            //if (vPosition.x >= 0.0 && vPosition.y >= 0.0) {
            if (time > 1.0) {
                gl_FragColor = vec4(color1, 1.0);
            } else {
                gl_FragColor = vec4(color2, 1.0);
            }
        }
    `;
  
    const material = new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            time: { value: 0 },
        },
    });
  
    const torus = new Mesh(geometry, material);

    torus.tick = (delta) => {
        torus.material.uniforms.time.value += delta;
    };
  
    return torus;
  }
  
  export { createTorus };
  