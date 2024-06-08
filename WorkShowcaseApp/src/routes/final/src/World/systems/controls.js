import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

function createControls(camera, canvas) {
    const controls = new PointerLockControls(camera, canvas);
    
    canvas.addEventListener('click', () => {
        controls.lock();
    });

    /*
    controls.addEventListener('lock', () => {
        console.log('Pointer locked');
    });

    controls.addEventListener('unlock', () => {
        console.log('Pointer unlocked');
    });
    */

    controls.tick = (delta) => {
    };

    return controls;
}

export { createControls };
