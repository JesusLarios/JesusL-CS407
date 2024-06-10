/*
import { AnimationMixer, Vector3, Mesh, SphereGeometry, MeshBasicMaterial } from 'three';

function setupModel(data) {
    const model = data.scene.children[0];

    model.scale.set(3, 3, 3);
    model.position.set(0, 2, 0);

    // Array to hold the bullets
    model.bombs = [];

    model.tick = (delta) => {
    };

    model.attack = () => {  
    };

    return model;
}

export { setupModel };
*/




import { AnimationMixer, Vector3, Mesh, SphereGeometry, MeshBasicMaterial } from 'three';

function setupModel(data) {
    const model = data.scene.children[0];

    model.scale.set(3, 3, 3);
    model.position.set(0, 10, 100); // Jet starts at y=10 and z=100

    // Array to hold the bombs
    model.bombs = [];

    // Function to create a bomb
    const createBomb = () => {
        const bombGeometry = new SphereGeometry(0.5, 16, 16);
        const bombMaterial = new MeshBasicMaterial({ color: 0xff0000 });
        const bomb = new Mesh(bombGeometry, bombMaterial);

        bomb.position.copy(model.position);
        bomb.velocity = new Vector3(0, -10, 0); // Bomb falls downwards

        return bomb;
    };

    // Function to handle bomb explosion
    const explodeBomb = (bomb) => {
        console.log("Bomb exploded at", bomb.position);

        // Placeholder for explosion effect
        const explosionGeometry = new SphereGeometry(2, 32, 32);
        const explosionMaterial = new MeshBasicMaterial({ color: 0xffff00 });
        const explosion = new Mesh(explosionGeometry, explosionMaterial);

        explosion.position.copy(bomb.position);
        data.scene.add(explosion);

        // Remove the bomb from the scene and model's bomb array
        data.scene.remove(bomb);
        const index = model.bombs.indexOf(bomb);
        if (index > -1) {
            model.bombs.splice(index, 1);
        }

        // Optionally remove explosion effect after some time
        setTimeout(() => {
            data.scene.remove(explosion);
        }, 1000); // Explosion effect lasts 1 second
    };

    // Model tick function to update bombs and jet position
    model.tick = (delta) => {
        // Move the jet forward along the z-axis
        model.position.z -= 50 * delta; // Adjust speed as needed

        // Make the jet invisible if it moves past z=-50
        if (model.position.z < -50) {
            model.visible = false;
        }

        for (let i = model.bombs.length - 1; i >= 0; i--) {
            const bomb = model.bombs[i];
            bomb.position.add(bomb.velocity.clone().multiplyScalar(delta));

            if (bomb.position.y <= 0) {
                explodeBomb(bomb);
            }
        }
    };

    // Model attack function to drop bombs
    model.attack = () => {
        for (let i = 0; i < 6; i++) {
            const bomb = createBomb();
            model.bombs.push(bomb);
            data.scene.add(bomb);
        }
    };

    return model;
}

export { setupModel };
