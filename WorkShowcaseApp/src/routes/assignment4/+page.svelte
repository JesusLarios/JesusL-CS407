<script>
  import { onMount } from 'svelte';
  import { World } from './src/World/World.js'

  let world;
  let carRotation = false;
  let carSpeed = 0;
  let carColor = 'FireBrick';

  onMount(() => {
    const container = document.querySelector('#scene-container');
    world = new World(container);
    world.start();
    document.addEventListener('keydown', (event) => {
      world.turnFrontTires(event.key);
    });
  });


  function toggleCarRotation() {
    carRotation = !carRotation;
    world.toggleCarRotation(carRotation);
  }

  function handleSpeedChange() {
    world.setCarSpeed(carSpeed);
  }

  $: if (world) {
    world.setCarColor(carColor);
    world.render();
  }
</script>

<h1>Hierarchical Scene & Transformations with Animation</h1>

<div class="container mt-5">
  <div class="row">
      <div class="col-md-2">
        <!-- User options go here -->
        <button on:click={toggleCarRotation}>
          {carRotation ? 'Stop' : 'Start'} car rotation
      </button>

      <p>Car speed: {carSpeed}</p>
      <input type="range" min="0" max="540" step="10" bind:value={carSpeed} on:change={handleSpeedChange}/>

      <label for="carColor" class="form-label">Car body color</label>
      <input type="color" class="form-control form-control-color" id="carColor" bind:value={carColor}>
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

        <p>The tires can be controlled with "a" and "d" keyboard presses.</p>
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