<script>
  import { onMount } from 'svelte';
  import { World } from './src/World/World.js'

  let world;
  let shine = true;
  let pointLightColor = '#ff0000';

  onMount(() => {
    const container = document.querySelector('#scene-container');
    world = new World(container);
    world.render();
  });

  $: if (world) {
    world.setCapsuleShine(shine);
    world.render();
  }

  $: if (world) {
    world.setPointLightColor(pointLightColor);
    world.render();
  }
</script>

<h1>Discoverthreejs.com - Physically Based Rendering</h1>

<div class="container mt-5">
  <div class="row">
      <div class="col-md-2">
        <h4 class="text-center mb-3">Controls</h4>

        <hr>

        <div class="form-check form-switch">
          <label class="form-check-label" for="toggleCapsuleShine">Capsule shine</label>
          <input class="form-check-input" type="checkbox" role="switch" id="toggleCapsuleShine" bind:checked={shine}>
        </div>

        <label for="pointColor" class="form-label mt-5">Point light color</label>
        <input type="color" class="form-control form-control-color" id="pointColor" bind:value={pointLightColor}>
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
    background-color: skyblue;
  }
</style>