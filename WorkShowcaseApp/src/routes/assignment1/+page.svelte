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
    
    onMount(() => {
        //Create a scene
        const scene = new Scene();
        scene.background = new Color('dimgray');

        // Create a camera
        const fov = 10; // AKA Field of View
        const aspect = window.innerWidth / window.innerHeight;
        const near = 0.1; // the near clipping plane
        const far = 200; // the far clipping plane
        const camera = new PerspectiveCamera(fov, aspect, near, far);

        // Adjust camera to be outside the center
        camera.position.set(0, 0, 100);

        // Create a Mesh using a geometry and material
        const geometry = new ConeGeometry(5, 10, 8);
        const material = new MeshBasicMaterial({color: 0xff9705, wireframe: true});
        const cone = new Mesh(geometry, material);

        // Add the mesh to the scene
        scene.add(cone);
        
        // Create a renderer
        const renderer = new WebGLRenderer();
        renderer.setSize(window.innerWidth/2, window.innerHeight/2);

        // Add the automatically created <canvas> element to the page
        const container = document.querySelector('#scene-container');
        container.append(renderer.domElement);
        
        // Render, or 'create a still image', of the scene
        renderer.render(scene, camera);

        // Continuosly rotate cone to render
        function animateCone() {
        cone.rotation.x -= 0.01;
        cone.rotation.y += 0.008;
        renderer.render(scene, camera);
        requestAnimationFrame(animateCone);
      }
      animateCone();
    });
    

    
</script>
    
<div id="scene-container">
    <h1>Hello World! using three.js</h1>
</div>



<style>

</style>