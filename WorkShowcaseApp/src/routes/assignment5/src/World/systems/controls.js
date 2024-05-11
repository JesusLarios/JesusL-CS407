import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function createControls(camera, canvas) {
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0, -3);

    // damping and auto rotation require
    // the controls to be updated each frame

    // this.controls.autoRotate = true;
    controls.enableDamping = true;

    controls.tick = () => controls.update();

    return controls;
}

export { createControls };
