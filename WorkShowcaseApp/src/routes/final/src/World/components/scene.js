import { Color, Scene, Fog, FogExp2 } from 'three';

function createScene() {
  const scene = new Scene();

  scene.background = new Color('lightsteelblue');
  
  scene.fog = new FogExp2( 0xcccccc, 0.019 );

  scene.setFog = (visible) => {
    scene.fog = visible ? new FogExp2( 0xcccccc, 0.019 ) : null;
  };

  return scene;
}

export { createScene };
