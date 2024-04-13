import { PointLight } from 'three';

function createPointLights() {
    const light = new PointLight('red', 10000, 100);

    light.position.set(0, -15, -10);

    return light;
}

export { createPointLights };