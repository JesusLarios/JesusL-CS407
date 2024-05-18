<script>
  import { onMount } from 'svelte';
  import { World } from './src/World/World.js'

  let world;
  let animation = false;
  let wireframe = false;
  let pointLight = true;
  let ambientLight = true;

  onMount(async () => {
    try {
      const container = document.querySelector('#scene-container');
      world = new World(container);
      await world.init();
      world.start();

      document.addEventListener('keydown', (event) => {
        switch (event.key) {
          case 'w':
            world.driveForward();
            break;
          case 's':
            world.driveBackward();
            break;
          case 'a':
            world.turnLeft();
            break;
          case 'd':
            world.turnRight();
            break;
          default:
            break;
        }
      });

      document.addEventListener('keyup', (event) => {
        switch (event.key) {
          case 'w':
          case 's':
            world.stopDriving();
            break;
          case 'a':
          case 'd':
            world.stopTurning();
            break;
          default:
            break;
        }
      });
    } catch (error) {
      console.error("Error initializing the world:", error);
    }
  });

  function toggleAnimation() {
    animation = !animation;
    world.toggleAnimation(animation);
  }

  function toggleWireframe() {
    wireframe = !wireframe;
    world.toggleWireframe(wireframe);
  }

  function togglePointLight() {
    world.togglePointLight(pointLight);
  }

  function toggleAmbientLight() {
    world.toggleAmbientLight(ambientLight);
  }
</script>

<h1>Load a pre-build 3D model and use an animation</h1>

<div class="container mt-5">
  <div class="row">
      <div class="col-md-2">
        <!-- User controls go here -->
        <h4 class="text-center mb-3">Controls</h4>

        <hr>

        <button on:click={toggleAnimation}>
          {animation ? 'Stop' : 'Start'} animation
        </button>

        <button on:click={toggleWireframe}>
          {wireframe ? 'Hide' : 'Show'} wireframe
        </button>

        <div class="form-check form-switch">
          <label class="form-check-label mt-5" for="pointLightToggle">Point light</label>
          <input class="form-check-input mt-5" type="checkbox" role="switch" id="pointLightToggle" bind:checked={pointLight} on:change={togglePointLight}>
        </div>

        <div class="form-check form-switch">
          <label class="form-check-label" for="ambientLightToggle">Ambient light</label>
          <input class="form-check-input" type="checkbox" role="switch" id="ambientLightToggle" bind:checked={ambientLight} on:change={toggleAmbientLight}>
        </div>
      </div>

      <div class="col-md-7">
          <div id="scene-container" style="height: 600px;">
              <!-- Canvas will be dynamically inserted here -->
          </div>
      </div>

      <div class="col-md-3">
        <p>The goal of this assignment is to learn about pre-made models and animations.</p>

        <p>Requirements are:</p>
      
        <ul>
          <li>Load a pre-made model from a GLTF file, that contains one or more geometries with materials and animation clips.</li>
          <li>Use the three.js animation system</li>
          <li>Exercise both of these with some form of interactive control.</li>
        </ul>

        <p>More explanation of controls here.</p>
      </div>
  </div>
</div>

<style>
  #scene-container {
    background-color: lightsteelblue;
}

  button {
        width: 100%;
        height: 40px;
        margin-bottom: 25px;
        border-radius: 20px;
        color: white;
        background-color: blue;
        border: solid blue;
}
</style>