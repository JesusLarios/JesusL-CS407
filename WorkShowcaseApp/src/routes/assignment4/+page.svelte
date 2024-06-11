<script>
  import { onMount } from 'svelte';
  import { World } from './src/World/World.js'

  let world;
  let carRotation = false;
  let carSpeed = 310;
  let carColor = '#d68b09';
  let pointLightColor = '#e33505';
  let pointLightEnabled = true;
  let ambientLightEnabled = true;

  onMount(() => {
    const container = document.querySelector('#scene-container');
    world = new World(container);
    world.start();

    document.addEventListener('keydown', (event) => {
      world.turnCar(event.key);
    });
    document.addEventListener('keyup', (event) => {
      world.stopTurningCar(event.key);
    });
    document.addEventListener('keypress', (event) => {
      world.moveCar(event.key);
    });
    document.addEventListener('keyup', (event) => {
      world.stopMovingCar(event.key);
    });
  });

  function toggleCarRotation() {
    carRotation = !carRotation;
    world.toggleCarRotation(carRotation);
  }

  function handleSpeedChange() {
    world.setCarTopSpeed(carSpeed);
  }

  function togglePointLight() {
    world.togglePointLight(pointLightEnabled);
  }

  function toggleAmbientLight() {
    world.toggleAmbientLight(ambientLightEnabled);
  }

  $: if (world) {
    world.setCarColor(carColor);
    world.render();
  }

  $: if (world) {
    world.setPointLightColor(pointLightColor);
    world.render();
  }
</script>

<h1>Hierarchical Scene & Transformations with Animation</h1>

<div class="container mt-5">
  <div class="row">
      <div class="col-md-2">
        <!-- User options go here -->
        <h4 class="text-center mb-3">Controls</h4>

        <hr>

        <button on:click={toggleCarRotation}>
          {carRotation ? 'Stop' : 'Start'} car rotation
        </button>
        
        <label for="carSpeedSlider" class="form-label mt-3">Top speed: {carSpeed}</label>
        <input type="range" class="form-label" style="accent-color:blue;" min="0" max="700" step="10" id="carSpeedSlider" bind:value={carSpeed} on:change={handleSpeedChange}/>

        <label for="carColor" class="form-label mt-4">Car body color</label>
        <input type="color" class="form-control form-control-color" id="carColor" bind:value={carColor}>

        <label for="pointLightColor" class="form-label mt-4">Point light color</label>
        <input type="color" class="form-control form-control-color" id="pointLightColor" bind:value={pointLightColor}>

        <div class="form-check form-switch">
          <label class="form-check-label mt-5" for="pointLightToggle">Point light</label>
          <input class="form-check-input mt-5" type="checkbox" role="switch" id="pointLightToggle" bind:checked={pointLightEnabled} on:change={togglePointLight}>
        </div>

        <div class="form-check form-switch">
          <label class="form-check-label" for="ambientLightToggle">Ambient light</label>
          <input class="form-check-input" type="checkbox" role="switch" id="ambientLightToggle" bind:checked={ambientLightEnabled} on:change={toggleAmbientLight}>
        </div>
      </div>

      <div class="col-md-7">
          <div id="scene-container" style="height: 600px;">
              <!-- Canvas will be dynamically inserted here -->
          </div>
      </div>

      <div class="col-md-3">
        <p>The goal of this assignment is to create a simple scene using a hierarchical scene 
          graph as shown in Transformations, Coordinate Systems, and the Scene Graph in the Discover three.js book.
        </p>

        <p>Requirements are:</p>
      
        <ul>
          <li>Construct a compound model composed of a primary object and multiple child objects</li>
          <li>Place those child objects relative to the parent using transformations, at least one of which we create manually using vector or matrix algebra</li>
          <li>Have interactivity that moves both the entire object as well as the children</li>
        </ul>

        <p>The car can be controlled with "wasd" keys.</p>
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