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
        const container = document.querySelector('#scene-container');

        //Create a scene
        scene = new Scene();
        scene.background = new Color('dimgray');

        // Create a camera
        const fov = 10; // AKA Field of View
        const aspect = container.clientWidth / container.clientHeight;
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
        renderer.setSize(container.clientWidth, container.clientHeight);

        // Add the automatically created <canvas> element to the page
        container.append(renderer.domElement);
        
        // Render, or 'create a still image', of the scene
        renderer.render(scene, camera);
    });
</script>

<h1>Hello World! using three.js</h1>

<div class="container mt-5">
    <div class="row">
        <div class="col-md-2">
            <button on:click={toggleWireframe}>
                {showWireframe ? 'Hide' : 'Show'} Wireframe
            </button>
            <button on:click={toggleAnimation}>
                {showAnimation ? 'Stop' : 'Start'} Animation
            </button>
        </div>

        <div class="col-md-7">
            <div id="scene-container" style="height: 500px;">
                <!-- Canvas will be dynamically inserted here -->
            </div>
        </div>

        <div class="col-md-3">
            <h4>Project Goals</h4>
            <ul>
                <li>Use the three.js library to create a 3D scene</li>
                <li>Render the scene to a canvas element</li>
                <li>Control the animation of the scene</li>
                <li>All in a Svelte app</li>
                <li>Deployed to the Web</li>
            </ul>
        </div>
    </div>
</div>

<style>
    #scene-container {
        background-color: dimgray;
    }

    button {
        width: 100%;
        height: 40px;
        margin-bottom: 25px;
        border-radius: 20px;
        color: white;
        background-color: crimson;
        border: solid crimson;
    }
</style>