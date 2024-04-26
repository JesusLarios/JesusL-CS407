<script>
  import { onMount } from 'svelte';
  import { World } from './src/World/World.js'

  let world;

  onMount(() => {
    const container = document.querySelector('#scene-container');
    world = new World(container);
    world.start();
  });
</script>

<h1>Discoverthreejs.com - Physically Based Rendering</h1>

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
        <p>The goal of this assignment is to use the World App architecture from Discover three.js
          book to:
        </p>
      
        <ul>
          <li>Wrap the three.js scene in a World class that hides its implementation</li>
          <li>refactor the design into separate modules for the scene, camera, objects, renderer, lights, ...</li>
          <li>and that does a little more than the last assignment, in terms of objects and specifically a lighting effect</li>
        </ul>
      </div>
  </div>
</div>

<style>
  #scene-container {
    background-color: lightsteelblue;
  }
</style>