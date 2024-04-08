<script>
    import { onMount } from 'svelte';
    import {
        ConeGeometry,
        Color,
        Mesh,
        MeshBasicMaterial,
        PerspectiveCamera,
        Scene,
        WebGLRenderer,
    } from 'three';

    let showWireframe = false;
    let showAnimation = false;
    let cone;
    let renderer;
    let scene;
    let camera;

    function toggleWireframe() {
            showWireframe = !showWireframe;
            cone.material.wireframe = showWireframe;
            renderer.render(scene, camera);
        }

    function toggleAnimation() {
        showAnimation = !showAnimation;
        if (showAnimation) {
            animateCone();
        }
    }

    function animateCone() {
        if (showAnimation) {
            cone.rotation.x -= 0.01;
            cone.rotation.y += 0.008;
            renderer.render(scene, camera);
            requestAnimationFrame(animateCone);
        }
    }
    
    onMount(() => {
        //Create a scene
        scene = new Scene();
        scene.background = new Color('dimgray');

        // Create a camera
        const fov = 10; // AKA Field of View
        const aspect = window.innerWidth / window.innerHeight;
        const near = 0.1; // the near clipping plane
        const far = 200; // the far clipping plane
        camera = new PerspectiveCamera(fov, aspect, near, far);

        // Adjust camera to be outside the center
        camera.position.set(0, 0, 100);

        // Create a Mesh using a geometry and material
        const geometry = new ConeGeometry(5, 10, 8);
        const material = new MeshBasicMaterial({color: 0xff9705});
        cone = new Mesh(geometry, material);

        // Add the mesh to the scene
        scene.add(cone);
        
        // Create a renderer
        renderer = new WebGLRenderer();
        renderer.setSize(window.innerWidth/2, window.innerHeight/2);

        // Add the automatically created <canvas> element to the page
        const container = document.querySelector('#scene-container');
        container.append(renderer.domElement);
        
        // Render, or 'create a still image', of the scene
        renderer.render(scene, camera);
    });
</script>
    
<div id="scene-container">
    <h1>Hello World! using three.js</h1>
</div>

<button on:click={toggleWireframe}>
    {showWireframe ? 'Hide' :' Show'}
    wireframe
</button>

<button on:click={toggleAnimation}>
    {showAnimation ? 'Stop' :' Start'}
    animation
</button>

<div>
    <p>
        The goal of this assignment is to prove the architecture we'll be using to display WebGL 3D graphics in a web application. We want to show that we can successfully:
    </p>

    <ul>
        <li>Use the three.js library to create a 3D scene</li>
        <li>Render the scene to a canvas element</li>
        <li>Control the animation of the scene</li>
        <li>All in a Svelte app</li>
        <li>Deployed to the Web</li>
    </ul>
</div>

<style>

</style>