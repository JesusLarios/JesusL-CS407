import {
    Mesh,
    ShaderMaterial,
    TorusGeometry,
    Vector3,
  } from 'three';
  
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
        uniform float speed;
        uniform float time;
        in vec3 vPosition;
  
        void main() {
            
            vec3 color1 = vec3(1.0, 0.0, 0.0);
            vec3 color2 = vec3(0.0, 1.0, 0.0);
                
            float mixFactor = abs(sin(time/speed));
            vec3 color = mix(color1, color2, mixFactor);
            gl_FragColor = vec4(color, 1.0);
        }
    `;
  
    const material = new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            //color1: { value: new Vector3(1.0, 0.0, 0.0) },
            //color2: { value: new Vector3(0.0, 1.0, 0.0) },
            collapse: { value: false},
            speed: { value: 5.0 },
            time: { value: 0.0 },
        },
    });
  
    const torus = new Mesh(geometry, material);

    torus.setColor1 = (color) => {
        torus.material.uniforms.color1.value = color;
    };

    torus.setColor2 = (color) => {
        torus.material.uniforms.color2.value = color;
    };

    torus.setCollapse = (collapse) => {
        torus.material.uniforms.collapse.value = collapse;
    }

    torus.setSpeed = (speed) => {
        torus.material.uniforms.speed.value = speed;
    };

    torus.tick = (delta) => {
        torus.material.uniforms.time.value += delta;
    };
  
    return torus;
  }
  
  export { createTorus };
  