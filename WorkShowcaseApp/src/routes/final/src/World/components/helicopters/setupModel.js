import { AnimationMixer, Vector3 } from 'three';

function setupModel(data) {
    const model = data.scene.children[0];
    const clip = data.animations[0];

    const mixer = new AnimationMixer(model);
    const action = mixer.clipAction(clip);
    action.play();

    let driveDirection = 'stop';
    let driveSpeed = 8;

    let turnDirection = 'stop';
    let turnSpeed = Math.PI/360 * 90;

    let liftDirection = 'stop';
    let liftSpeed = 3;

    let landingPoint = 0;

    model.tick = (delta) => {
        mixer.update(delta);

        const forwardDirection = new Vector3(0, 1, 0).applyQuaternion(model.quaternion);

        if (driveDirection !== 'stop' && model.position.y > landingPoint) {
            if (driveDirection === 'forward') {
                model.position.add(forwardDirection.clone().multiplyScalar(-driveSpeed * delta));
            } else if (driveDirection === 'backward') {
                model.position.add(forwardDirection.clone().multiplyScalar(driveSpeed * delta));
            }
        }

        if (turnDirection !== 'stop' && model.position.y > landingPoint) {
            if (turnDirection === 'left') {
                model.rotation.z += turnSpeed * delta;
            }
            else if (turnDirection === 'right') {
                model.rotation.z -= turnSpeed * delta;
            }
        }

        if (liftDirection !== 'stop') {
            if (liftDirection === 'up') {
                model.position.y += liftSpeed * delta;
            }
            else if (liftDirection === 'down' && model.position.y > landingPoint) {
                model.position.y -= liftSpeed * delta;
                if (model.position.y < landingPoint) {
                    model.position.y = landingPoint;
                }
            }
        }

        if (model.position.y === landingPoint) {
            action.stop();
        }
        else {
            action.play();
        }
    }

    model.drive = (direction) => {
        driveDirection = direction;
    }

    model.turn = (direction) => {
        turnDirection = direction;
    }

    model.lift = (direction) => {
        liftDirection = direction;
    }
    
    model.setArcadeMode = (value) => {
        if (value) {
            driveSpeed = 8 * 3;
            turnSpeed = Math.PI/360 * 90 * 3;
            liftSpeed = 3 * 3;
        }
        else {
            driveSpeed = 8;
            turnSpeed = Math.PI/360 * 90;
            liftSpeed = 3;
        }
    }

    model.respawn = () => {
        model.position.set(0, landingPoint, 0);
        model.rotation.z = Math.PI;
    }

    model.setLandingPoint = (point) => {
        landingPoint = point;
    }

    return model;
    }
    
    export { setupModel };
  