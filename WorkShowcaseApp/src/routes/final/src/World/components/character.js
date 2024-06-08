import {
    Object3D,
    Vector3,
} from 'three';

function createCharacter(camera) {
    const character = new Object3D();
    character.add(camera); // Attach the camera to the character

    character.position.set(0, 1, 0); // Set initial position (height of a human)

    const speed = 5.0;
    const movement = {
        forward: false,
        backward: false,
        left: false,
        right: false,
    };

    character.tick = (delta) => {
        const direction = new Vector3();
        camera.getWorldDirection(direction);

        direction.y = 0;
        direction.normalize();

        const velocity = new Vector3();

        if (movement.forward) {
            velocity.add(direction.clone().multiplyScalar(speed * delta));
        }
        if (movement.backward) {
            velocity.add(direction.clone().multiplyScalar(-speed * delta));
        }
        if (movement.left) {
            const leftDirection = new Vector3().crossVectors(new Vector3(0, 1, 0), direction).normalize();
            velocity.add(leftDirection.clone().multiplyScalar(speed * delta));
        }
        if (movement.right) {
            const rightDirection = new Vector3().crossVectors(direction, new Vector3(0, 1, 0)).normalize();
            velocity.add(rightDirection.clone().multiplyScalar(speed * delta));
        }

        character.position.add(velocity);
    };

    character.move = (direction, state) => {
        movement[direction] = state;
    };
    
    return character;
}

export { createCharacter };
