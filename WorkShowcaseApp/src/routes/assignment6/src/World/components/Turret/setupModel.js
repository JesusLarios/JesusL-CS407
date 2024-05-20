import { AnimationMixer, Vector3 } from 'three';

function setupModel(data) {
    const model = data.scene.children[0];
    const clip = data.animations[0];

    const mixer = new AnimationMixer(model);
    const action = mixer.clipAction(clip);
    action.play();

    model.tick = (delta) => {
        mixer.update(delta);
    }

    model.setAnimation = (value) => {
        if (value) {
            action.play();
        } else {
            action.stop();
        }
    }

    return model;
    }
    
    export { setupModel };
  