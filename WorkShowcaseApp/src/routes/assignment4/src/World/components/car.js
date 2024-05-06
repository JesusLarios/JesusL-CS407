import {
    BoxGeometry,
    MathUtils,
    Mesh,
    MeshStandardMaterial,
    Vector3,
} from 'three';

import { createTire } from './carParts/tire.js'
import { createBody } from './carParts/body.js'

function applyVectorsToTire(tire, v1, v2, v3) {
    tire.position.add(v1);
    tire.position.add(v2);
    tire.position.add(v3);
}
  
function createCar() {
    const geometry1 = new BoxGeometry(0, 0, 0);
    const material1 = new MeshStandardMaterial();
    const car = new Mesh(geometry1, material1);

    const body = createBody();
    car.add(body);

    const frontLeftTire = createTire();
    const frontRightTire = createTire();
    const backLeftTire = createTire();
    const backRightTire = createTire();
    car.add(frontLeftTire, frontRightTire, backLeftTire, backRightTire);

    let v1;
    let v2;
    let v3;

    v1 = new Vector3(-8, 0, 0);
    v2 = new Vector3(0, -3, 0);
    v3 = new Vector3(0, 0, -10);
    applyVectorsToTire(frontLeftTire, v1, v2, v3);

    v1 = new Vector3(8, 0, 0);
    applyVectorsToTire(frontRightTire, v1, v2, v3);

    v3 = new Vector3(0, 0, 10);
    applyVectorsToTire(backRightTire, v1, v2, v3);

    v1 = new Vector3(-8, 0, 0);
    applyVectorsToTire(backLeftTire, v1, v2, v3);

    // Rotate wheels to be vertical
    frontLeftTire.rotation.z = MathUtils.degToRad(90);
    frontRightTire.rotation.z = MathUtils.degToRad(270);
    backLeftTire.rotation.z = MathUtils.degToRad(90);
    backRightTire.rotation.z = MathUtils.degToRad(270);

    car.SetBodyColor = (color) => {
        let lowerBody = body.children[0];
        lowerBody.material.color.set(color);
    }

    let rotateCar = false;

    car.toggleRotation = (rotate) => {
        rotateCar = rotate;
    }

    // Turn settings
    let turnSpeed = MathUtils.degToRad(80);
    let turnAngle = MathUtils.degToRad(0);
    let turnDirection = 'stop';

    car.turn = (direction) => {
        turnDirection = direction;
    }

    // Driving settings
    let topSpeed = MathUtils.degToRad(0);
    let currentSpeed = MathUtils.degToRad(0);
    let acceleration = MathUtils.degToRad(150);
    let driveDirection = 'stop';

    car.drive = (direction) => {
        driveDirection = direction;
    }

    car.setTopSpeed = (speed) => {
        topSpeed = MathUtils.degToRad(speed);
    }

    // this method will be called once per frame
    car.tick = (delta) => {
        if (turnDirection !== 'stop') {
            if (turnDirection === 'left') {
                turnAngle += turnSpeed * delta;
            }
            else if (turnDirection === 'right') {
                turnAngle -= turnSpeed * delta;
            }
            
            if (turnAngle > MathUtils.degToRad(23)) {
                turnAngle = MathUtils.degToRad(23);
            }
            else if (turnAngle < MathUtils.degToRad(-23)) {
                turnAngle = MathUtils.degToRad(-23);
            }
            frontLeftTire.rotation.y = turnAngle;
            frontRightTire.rotation.y = turnAngle;
        }


        if (driveDirection !== 'stop') {
            if (driveDirection === 'forward') {
                currentSpeed += acceleration * delta;
            }
            else if (driveDirection === 'backward') {
                currentSpeed -= acceleration * delta;
            }

            if (currentSpeed > topSpeed) {
                currentSpeed = topSpeed;
            }
            else if (currentSpeed < -topSpeed) {
                currentSpeed = -topSpeed;
            }
            frontLeftTire.setRotationSpeed(currentSpeed);
            frontRightTire.setRotationSpeed(-currentSpeed);
            backLeftTire.setRotationSpeed(currentSpeed);
            backRightTire.setRotationSpeed(-currentSpeed);
        }
        else
        {
            if (currentSpeed > 0) {
                currentSpeed -= acceleration * delta;
                if (currentSpeed < 0) {
                    currentSpeed = 0;
                }
            }
            else if (currentSpeed < 0) {
                currentSpeed += acceleration * delta;
                if (currentSpeed > 0) {
                    currentSpeed = 0;
                }
            }
            frontLeftTire.setRotationSpeed(currentSpeed);
            frontRightTire.setRotationSpeed(-currentSpeed);
            backLeftTire.setRotationSpeed(currentSpeed);
            backRightTire.setRotationSpeed(-currentSpeed);
        }

        if (rotateCar) {
            car.rotation.y += MathUtils.degToRad(65) * delta;
        }

        frontLeftTire.tick(delta);
        frontRightTire.tick(delta);
        backLeftTire.tick(delta);
        backRightTire.tick(delta);
    };

    return car;
}

export { createCar };

