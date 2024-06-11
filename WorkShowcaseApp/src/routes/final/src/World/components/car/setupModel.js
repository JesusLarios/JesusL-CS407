import {
    Vector3,
    Quaternion,
    SpotLight,
    SpotLightHelper,
    Mesh,
    BoxGeometry,
    MeshStandardMaterial,
} from 'three';

function setupModel(data, camera) {
    const model = data.scene.children[0];

    model.rotation.z = -Math.PI/2;
    model.scale.set(18, 18, 18);

    /*

    const geometry = new BoxGeometry(0.25/18, 0.25/18, 0.25/18);
    const material = new MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, material);
    //cube.position.set(-1.2/18, -0.4/18, 0.3/18); // z, x, y
    cube.position.set(-1.2/18, 0.5/18, 0.3/18); // z, x, y
    model.add(cube);

    // Headlights
    const headlightLeft = new SpotLight(0xffffff, 50);
    const headlightRight = new SpotLight(0xffffff, 200, 25.0, Math.PI / 4, 0.5, 1.0);
    
    // Position headlights in front of the car
    headlightLeft.position.set(0.5, 1, 0.5);  // Adjust as needed
    headlightRight.position.set(0.5, -1, 0.5); // Adjust as needed

    // Add the headlights to the model
    model.add(headlightLeft);
    model.add(headlightRight);

    // Optionally, add helpers to visualize the headlights
    const headlightHelperLeft = new SpotLightHelper(headlightLeft);
    const headlightHelperRight = new SpotLightHelper(headlightRight);
    model.add(headlightHelperLeft);
    model.add(headlightHelperRight);
    */

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
    let carCamera = true;
    const targetCameraPosition = new Vector3();
    const targetCameraQuaternion = new Quaternion();
    const lerpFactor = 0.1;

    
    model.tick = (delta) => {
        const forwardDirection = new Vector3(1, 0, 0).applyQuaternion(model.quaternion);
        const potentialPosition = model.position.clone();

        if (movement.forward) {
            potentialPosition.add(forwardDirection.clone().multiplyScalar(-speed * delta));
        }
        if (movement.backward) {
            potentialPosition.add(forwardDirection.clone().multiplyScalar(speed * delta));
        }

        // Check for collisions with the plane boundaries
        if (potentialPosition.x > 49.5) potentialPosition.x = 49.5;
        if (potentialPosition.x < -49.5) potentialPosition.x = -49.5;
        if (potentialPosition.z > 49.5) potentialPosition.z = 49.5;
        if (potentialPosition.z < -49.5) potentialPosition.z = -49.5;
    
        // Update the model position if no collisions detected
        model.position.copy(potentialPosition);

        if (movement.forward || movement.backward) {
            if (movement.left) {
                model.rotation.z += turnSpeed * delta;
            }
            if (movement.right) {
                model.rotation.z -= turnSpeed * delta;
            }
        }

        if (carCamera) {
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
        }
    };
    
    model.move = (direction, state) => {
        movement[direction] = state;
    };

    model.respawn = () => {
        model.rotation.z = -Math.PI/2;
        model.position.set(0, 0, 0);
    };

    model.setCarCamera = (enable) => {
        carCamera = enable;
    };

    model.setWireframe = (enabled) => {
        model.traverse((child) => {
            if (child.isMesh && child.material) {
                child.material.wireframe = enabled;
            }
        });
    };
    
    return model;
}

export { setupModel };





/*

import {
    Vector3,
    Quaternion,
} from 'three';

const barriers = [
    { position: new Vector3(10, 0, 10), size: new Vector3(5, 5, 5) },
    { position: new Vector3(-20, 0, 20), size: new Vector3(5, 5, 5) },
    // Add more barriers as needed
];

function isColliding(position, barrierPosition, barrierSize) {
    const minA = position.clone().sub(new Vector3(0.5, 0.5, 0.5));
    const maxA = position.clone().add(new Vector3(0.5, 0.5, 0.5));
    const minB = barrierPosition.clone().sub(barrierSize.clone().multiplyScalar(0.5));
    const maxB = barrierPosition.clone().add(barrierSize.clone().multiplyScalar(0.5));

    return (
        minA.x <= maxB.x && maxA.x >= minB.x &&
        minA.y <= maxB.y && maxA.y >= minB.y &&
        minA.z <= maxB.z && maxA.z >= minB.z
    );
}

function isCollidingWithBarriers(potentialPosition) {
    for (let barrier of barriers) {
        if (isColliding(potentialPosition, barrier.position, barrier.size)) {
            return true;
        }
    }
    return false;
}

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
        const potentialPosition = model.position.clone();

        if (movement.forward) {
            potentialPosition.add(forwardDirection.clone().multiplyScalar(-speed * delta));
        }
        if (movement.backward) {
            potentialPosition.add(forwardDirection.clone().multiplyScalar(speed * delta));
        }

        // Check for collisions with the plane boundaries
        if (potentialPosition.x > 49.5) potentialPosition.x = 49.5;
        if (potentialPosition.x < -49.5) potentialPosition.x = -49.5;
        if (potentialPosition.z > 49.5) potentialPosition.z = 49.5;
        if (potentialPosition.z < -49.5) potentialPosition.z = -49.5;

        // Check for collisions with barriers
        if (!isCollidingWithBarriers(potentialPosition)) {
            // Update the model position if no collisions detected
            model.position.copy(potentialPosition);
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
*/