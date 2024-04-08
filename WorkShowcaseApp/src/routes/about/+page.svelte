<script>
	import github from '$lib/images/github.svg';
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
	<h1>Jesus Larios's portfolio</h1>

	<h2>
		<strong>CS407 computer graphics semiar class at WOU.</strong>
	</h2>

	<p>
		The work showcased here is from spring term of 2024. All assignments will
		have their own page and demonstrate what I have learned regarding
		computer graphics. This involves work with WebGL, three.js, and other topics
		such as WASM, Svelte, and data visualization with D3.js.
	</p>

	<p>
		<a href="https://github.com/sveltejs/kit">
			<img src={github} alt="GitHub" />
		</a>
		My GitHub repository: 
		<a href="https://github.com/JesusLarios/JesusL-CS407">
			https://github.com/JesusLarios/JesusL-CS407
		</a>
	</p>
</div>

<style>
	h2 {
		text-align: center;
	}

	a img {
		width: 1.2em;
		height: 1.2em;
		object-fit: contain;
	}
</style>