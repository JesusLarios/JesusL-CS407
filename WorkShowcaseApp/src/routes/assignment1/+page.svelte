<script>
    import { onMount } from 'svelte';
    import {
        BoxGeometry,
        Color,
        Mesh,
        MeshBasicMaterial,
        PerspectiveCamera,
        Scene,
        WebGLRenderer,
    } from 'three';
    
    onMount(() => {
        // Get a reference to the container element that will hold our scene
        const container = document.querySelector('#scene-container');

        // create a Scene
        const scene = new Scene();

        // Set the background color
        scene.background = new Color('springgreen');

        // Create a camera
        const fov = 10; // AKA Field of View
        const aspect = container.clientWidth / container.clientHeight;
        const near = 0.1; // the near clipping plane
        const far = 100; // the far clipping plane

        const camera = new PerspectiveCamera(fov, aspect, near, far);

        // every object is initially created at ( 0, 0, 0 )
        // move the camera back so we can view the scene
        camera.position.set(1, -1, 30);

        // create a geometry
        const geometry = new BoxGeometry(2, 2, 2);

        // create a default (white) Basic material
        const material = new MeshBasicMaterial();

        // create a Mesh containing the geometry and material
        const cube = new Mesh(geometry, material);

        // add the mesh to the scene
        scene.add(cube);

        // create the renderer
        const renderer = new WebGLRenderer();

        // next, set the renderer to the same size as our container element
        renderer.setSize(container.clientWidth/2, container.clientHeight);

        // finally, set the pixel ratio so that our scene will look good on HiDPI displays
        renderer.setPixelRatio(window.devicePixelRatio);

        // add the automatically created <canvas> element to the page
        container.append(renderer.domElement);

        // render, or 'create a still image', of the scene
        renderer.render(scene, camera);
    });
</script>

<body>
    <h1>Hello World! box</h1>

    <div id="scene-container">
    <!-- Our <canvas> will be inserted here -->
    </div>
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
  width: 100%;
  height: 100%;
  

  /*
    Set the container's background color to the same as the scene's
    background to prevent flashing on load
  */
  background-color: skyblue;
}
</style>