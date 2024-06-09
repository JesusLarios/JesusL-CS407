import {
    Object3D,
    Vector3,
    Euler,
} from 'three';

function setupModel(data, camera) {
    const model = data.scene.children[0];

    model.rotation.z = -Math.PI/2;
    model.scale.set(18, 18, 18);

    const speed = 15.0;
    const turnSpeed = 1.0
    const movement = {
        forward: false,
        backward: false,
        left: false,
        right: false,
    };

    model.tick = (delta) => {
        const forwardDirection = new Vector3(1, 0, 0).applyQuaternion(model.quaternion);

        if (movement.forward) {
            model.position.add(forwardDirection.clone().multiplyScalar(-speed * delta));
        }
        if (movement.backward) {
            model.position.add(forwardDirection.clone().multiplyScalar(speed * delta));
        }
        if (movement.forward || movement.backward) {
            if (movement.left) {
                model.rotation.z += turnSpeed * delta;
            }
            if (movement.right) {
                model.rotation.z -= turnSpeed * delta;
            }
        }

        const offset = new Vector3(10, 0, 2);
        offset.applyEuler(model.rotation);
        camera.position.copy(model.position.clone().add(offset));
        camera.lookAt(model.position);
    };

    model.move = (direction, state) => {
        movement[direction] = state;
    };

    model.respawn = () => {
        model.rotation.z = -Math.PI/2;
        model.position.set(0, 0, 0);
    };
    
    return model;
}

export { setupModel };
