<script>
  import { onMount } from 'svelte';
  import { World } from './src/World/World.js'

  let world;

  onMount(() => {
    const container = document.querySelector('#scene-container');
    world = new World(container);
    world.start();
    document.addEventListener('keydown', (event) => {
      world.turnFrontTires(event.key);
    });
  });
</script>

<h1>Hierarchical Scene & Transformations with Animation</h1>

<div class="container mt-5">
  <div class="row">
      <div class="col-md-2">
        <!-- User options go here -->
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
      </div>
  </div>
</div>

<style>
  #scene-container {
    background-color: lightsteelblue;
  }
</style>