import {
    BoxGeometry,
    MathUtils,
    Mesh,
    MeshStandardMaterial,
} from 'three';

import { createTire } from './tire.js';
  
  function createCar() {
    const geometry1 = new BoxGeometry(0, 0, 0);
    const material1 = new MeshStandardMaterial();
    const car = new Mesh(geometry1, material1);

    const geometry2 = new BoxGeometry(35, 7, 15);
    const material2 = new MeshStandardMaterial({ color: 'FireBrick' });
    const body = new Mesh(geometry2, material2);

    car.add(body);

    const geometry3 = new BoxGeometry(15, 7, 13);
    const material3 = new MeshStandardMaterial({ color: 'white' });
    const roof = new Mesh(geometry3, material3);

    car.add(roof);

    roof.position.set(4, 5, 0);

    const tire1 = createTire();
    const tire2 = createTire();
    const tire3 = createTire();
    const tire4 = createTire();

    car.add(tire1, tire2, tire3, tire4);

    tire1.position.set(-10, -3, -8);
    tire2.position.set(-10, -3, 8);
    tire3.position.set(10, -3, -8);
    tire4.position.set(10, -3, 8);

    tire1.children[0].rotation.x = MathUtils.degToRad(270);
    tire2.children[0].rotation.x = MathUtils.degToRad(90);
    tire3.children[0].rotation.x = MathUtils.degToRad(270);
    tire4.children[0].rotation.x = MathUtils.degToRad(90);

    car.frontTireAngle = MathUtils.degToRad(0);
    
    const carRotationSpeed = MathUtils.degToRad(60);
  
    // this method will be called once per frame
    car.tick = (delta) => {
        // increase the cube's rotation each frame
        car.rotation.y += carRotationSpeed * delta;
        tire1.rotation.y = car.frontTireAngle;
        tire2.rotation.y = car.frontTireAngle
        tire1.tick(delta);
        tire2.tick(delta);
        tire3.tick(delta);
        tire4.tick(delta);

        if (car.frontTireAngle > 0) {
        car.frontTireAngle -= MathUtils.degToRad(.1);
        }
        else if (car.frontTireAngle < 0) {
            car.frontTireAngle += MathUtils.degToRad(.1);
        }
    };
  
    return car;
  }
  
  export { createCar };
  