import { PointLight } from 'three';

function createPointLights() {
    const light = new PointLight('DarkTurquoise', 20000, 100);

    light.position.set(-40, 0, -25);

    return light;
}

export { createPointLights };