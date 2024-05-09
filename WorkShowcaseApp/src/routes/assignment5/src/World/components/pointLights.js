import { PointLight } from 'three';

function createPointLights() {
    const light = new PointLight(0xff00ff, 3000, 200);

    light.position.set(-10, -10, -10);

    return light;
}

export { createPointLights };