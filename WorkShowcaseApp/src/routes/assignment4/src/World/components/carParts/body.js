import {
    BoxGeometry,
    Mesh,
    MeshStandardMaterial,
} from 'three';
  
function createBody() {
    const geometry1 = new BoxGeometry(0, 0, 0);
    const material1 = new MeshStandardMaterial();
    const body = new Mesh(geometry1, material1);

    const geometry2 = new BoxGeometry(35, 7, 15);
    const material2 = new MeshStandardMaterial({ color: 'FireBrick' });
    const lowerBody = new Mesh(geometry2, material2);

    body.add(lowerBody);

    const geometry3 = new BoxGeometry(15, 7, 13);
    const material3 = new MeshStandardMaterial({ color: 'white' });
    const upperBody = new Mesh(geometry3, material3);

    body.add(upperBody);
    upperBody.position.set(4, 5, 0);

    // this method will be called once per frame
    body.tick = (delta) => {
    };

    return body;
}
  
export { createBody };