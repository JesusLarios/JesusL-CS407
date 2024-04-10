<script>
  import { onMount } from 'svelte';
  import {
    PointLight,
    DirectionalLight,
    CapsuleGeometry,
    TorusKnotGeometry,
    Color,
    Mesh,
    MeshPhongMaterial,
    MeshLambertMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
  } from 'three';

  // camera.js CODE
  function createCamera() {
      const camera = new PerspectiveCamera(
          35, // fov = Field Of View
          1, // aspect ratio (dummy value)
          0.1, // near clipping plane
          100, // far clipping plane
      );

      // move the camera back so we can view the scene
      camera.position.set(0, 0, 50);

      return camera;
  }


  //torusKnot.js CODE
  function createTorusKnot() {
    const geometry = new TorusKnotGeometry(3, 1, 300, 16, 1, 6);

    // Switch the old "basic" material to
    // a physically correct "standard" material
    const material = new MeshLambertMaterial({ color: 'brown'});

    const torusKnot = new Mesh(geometry, material);

    torusKnot.rotation.set(-0.5, 2.6, 1.5);
    torusKnot.position.set(-8, -9, -10)

    return torusKnot;
  }


  //capsule.js CODE
  function createCapsule() {
    const geometry = new CapsuleGeometry(3, 3, 13, 12);

    // Switch the old "basic" material to
    // a physically correct "standard" material
    const material = new MeshPhongMaterial({ color: 'green', flatShading: true, shininess: 90});

    const capsule = new Mesh(geometry, material);

    capsule.rotation.set(-1.5, 2.6, 1.5);
    capsule.position.set(8, 9, -5)

    return capsule;
  }


  // lights.js CODE
  function createLights() {
      // Create a directional light
      const light = new DirectionalLight('white', 13);

      // move the light right, up, and towards us
      light.position.set(20, 31, 31);

      return light;
  }


  // pointLights.js CODE
  function createPointLights() {
      // Create a directional light
      const light = new PointLight('red', 10000, 100);

      // move the light right, up, and towards us
      light.position.set(0, -15, -10);

      return light;
  }


  // scene.js CODE
  function createScene() {
      const scene = new Scene();

      scene.background = new Color('skyblue');

      return scene;
  }








  // Resizer.js CODE
  class Resizer {
      constructor(container, camera, renderer) {
          // Set the camera's aspect ratio
          camera.aspect = container.clientWidth / container.clientHeight;

          // update the camera's frustum
          camera.updateProjectionMatrix();

          // update the size of the renderer AND the canvas
          renderer.setSize(container.clientWidth, container.clientHeight);

          // set the pixel ratio (for mobile devices)
          renderer.setPixelRatio(window.devicePixelRatio);
      }
  }


  // renderer.js CODE
  function createRenderer() {
  const renderer = new WebGLRenderer();

  // turn on the physically correct lighting model
  renderer.physicallyCorrectLights = true;

  return renderer;
  }



  // World.js CODE
  let scene;
  let camera;
  let renderer;

  class World {
      constructor(container) {
          camera = createCamera();
          scene = createScene();
          renderer = createRenderer();
          container.append(renderer.domElement);

          const torusKnot = createTorusKnot();
          const capsule = createCapsule();
          const light = createLights();
          const spotLight = createPointLights();

          scene.add(torusKnot, capsule, light, spotLight);

          const resizer = new Resizer(container, camera, renderer);
      }

      render() {
          // draw a single frame
          renderer.render(scene, camera);
      }
  }
  
  // main.js CODE
  onMount(() => {
      // Get a reference to the container element
      const container = document.querySelector('#scene-container');

      // create a new world
      const world = new World(container);

      // draw the scene
      world.render();
  });
</script>

<body>
  <h1>Discoverthreejs.com - Physically Based Rendering</h1>

  <div id="scene-container">
  <!-- Our <canvas> will be inserted here -->
  </div>

  <p>The goal of this assignment is to use the World App architecture from Discover three.js
    book to:
  </p>

  <ul>
    <li>Wrap the three.js scene in a World class that hides its implementation</li>
    <li>refactor the design into separate modules for the scene, camera, objects, renderer, lights, ...</li>
    <li>and that does a little more than the last assignment, in terms of objects and specifically a lighting effect</li>
  </ul>
</body>


<style>
body {
/* remove margins and scroll bars */
margin: 0;
overflow: hidden;

/* style text */
text-align: center;
font-size: 12px;
font-family: Sans-Serif;

/* color text */
color: #444;
}

h1 {
/* position the heading */
position: absolute;
width: 100%;

/* make sure that the heading is drawn on top */
z-index: 1;
}

#scene-container {
/* tell our scene container to take up the full page */
position: absolute;
width: 60%;
height: 60%;


/*
  Set the container's background color to the same as the scene's
  background to prevent flashing on load
*/
background-color: skyblue;
}
</style>