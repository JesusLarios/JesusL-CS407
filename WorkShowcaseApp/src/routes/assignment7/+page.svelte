<h1>Learn about and use custom shaders</h1>

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
          <label class="form-check-label" for="collapseToggle">Collapse</label>
          <input class="form-check-input" type="checkbox" role="switch" id="collapseToggle" bind:checked={collapse} on:change={toggleCollapse}>
        </div>

        <label for="colorSpeedSlider" class="form-label mt-3">Color change speed: {colorSpeed}</label>
        <input type="range" class="form-label" style="accent-color:blue;" min="1" max="10" step="1" id="colorSpeedSlider" bind:value={colorSpeed} on:change={handleSpeedChange}/>

        <div>
          <label for="color1" class="form-label mt-4">Color 1</label>
          <input type="color" class="form-control form-control-color" id="color1" bind:value={color1}>
        </div>

        <div>
          <label for="color2" class="form-label mt-4">Color 2</label>
          <input type="color" class="form-control form-control-color" id="color2" bind:value={color2}>
        </div>
      </div>

      <div class="col-md-7">
          <div id="scene-container" style="height: 600px;">
              <!-- Canvas will be dynamically inserted here -->
          </div>
      </div>

      <div class="col-md-3">
        <p>The goal of this assignment is to do something cool with shaders.</p>

        <p>Requirements are:</p>
      
        <ul>
          <li>Write your own shaders to do something interesting. Feel free to find some inspiration online, but you'll need to build a big part of it yourself. Remember to attribute where you got the idea from, if that's what you did.</li>
          <li>Include interaction of some kind that sends uniforms or attributes to your custom shader.</li>
          <li>Include more than one object in your scene, but only have your shaders applied to one of those objects. This will enable you to see how different "materials" (and thus shaders) are used for different objects.</li>
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
  let colorSpeed = 5.0;
  let collapse = false;
  let color1 = '#ff0000';
  let color2 = '#00ff00';

  onMount(async () => {
    try {
      const container = document.querySelector('#scene-container');
      world = new World(container);
      await world.init();
      world.start();
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

  function toggleCollapse() {
    world.setCollapse(collapse);
  }

  function handleSpeedChange() {;
    world.setColorSpeed(colorSpeed);
  }

  $: if (world) {
    console.log(color1);
    world.setColor1(color1);
    world.render();
  }

  $: if (world) {
    world.setColor2(color2);
    world.render();
  }
</script>