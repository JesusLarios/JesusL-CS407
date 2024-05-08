import { PointLight } from 'three';

function createPointLights() {
    const light = new PointLight(0x00CED1, 20000, 100);

    light.position.set(0, 5, 5);

    return light;
}

export { createPointLights };