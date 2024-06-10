<h1>Final project</h1>

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

        <div class="form-check form-switch mt-5">
          <label class="form-check-label" for="pointLightToggle">Point light</label>
          <input class="form-check-input" type="checkbox" role="switch" id="pointLightToggle" bind:checked={pointLight} on:change={togglePointLight}>
        </div>

        <div class="form-check form-switch">
          <label class="form-check-label" for="ambientLightToggle">Ambient light</label>
          <input class="form-check-input" type="checkbox" role="switch" id="ambientLightToggle" bind:checked={ambientLight} on:change={toggleAmbientLight}>
        </div>

        <div class="form-check form-switch">
          <label class="form-check-label" for="fogToggle">Fog</label>
          <input class="form-check-input" type="checkbox" role="switch" id="fogToggle" bind:checked={fog} on:change={toggleFog}>
        </div>
      </div>

      <div class="col-md-7">
          <div id="scene-container" style="height: 600px;">
              <!-- Canvas will be dynamically inserted here -->
          </div>
      </div>

      <div class="col-md-3">
        <p>The goal here is to demonstrate the skills learned throughout the term.</p>

        <p>Requirements are:</p>
      
        <ul>
          <li>Try something new.</li>
          <li>Have fun!</li>
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

<script>
  import { onMount } from 'svelte';
  import { World } from './src/World/World.js'

  let world;
  let animation = false;
  let wireframe = false;
  let pointLight = true;
  let ambientLight = true;
  let fog = true;
  let currentHelicopter = "1";

  onMount(async () => {
    try {
      const container = document.querySelector('#scene-container');
      world = new World(container);
      await world.init();
      world.start();

      document.addEventListener('keydown', (event) => {
        switch (event.key) {
          case 'w':
            world.moveCar('forward', true);
            break;
          case 's':
            world.moveCar('backward', true);
            break;
          case 'a':
            world.moveCar('left', true);
            break;
          case 'd':
            world.moveCar('right', true);
            break;
        }
      });

      document.addEventListener('keyup', (event) => {
        switch (event.key) {
          case 'w':
            world.moveCar('forward', false);
            break;
          case 's':
            world.moveCar('backward', false);
            break;
          case 'a':
            world.moveCar('left', false);
            break;
          case 'd':
            world.moveCar('right', false);
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

  function toggleFog() {
    world.setFog(fog);
  }
</script>