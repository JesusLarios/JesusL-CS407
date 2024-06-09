import {
    Vector3,
    Quaternion,
} from 'three';

function setupModel(data, camera) {
    const model = data.scene.children[0];

    model.rotation.z = -Math.PI/2;
    model.scale.set(18, 18, 18);

    // Movement settings
    const speed = 15.0;
    const turnSpeed = 1.0

    const movement = {
        forward: false,
        backward: false,
        left: false,
        right: false,
    };

    // Camera settings
    const targetCameraPosition = new Vector3();
    const targetCameraQuaternion = new Quaternion();
    const lerpFactor = 0.1;

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

        // Calculate the target camera position and orientation
        const offset = new Vector3(10, 0, 2);
        offset.applyEuler(model.rotation);
        targetCameraPosition.copy(model.position.clone().add(offset));
        camera.lookAt(model.position);
        targetCameraQuaternion.copy(camera.quaternion);

        // Interpolate the camera's current position towards the target
        camera.position.lerp(targetCameraPosition, lerpFactor);

        // Interpolate the camera's current orientation towards the target
        const currentCameraQuaternion = new Quaternion().copy(camera.quaternion);
        currentCameraQuaternion.slerp(targetCameraQuaternion, lerpFactor);
        camera.quaternion.copy(currentCameraQuaternion);
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
