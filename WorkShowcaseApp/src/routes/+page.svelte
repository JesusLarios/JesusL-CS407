<script>
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>

		My computer graphics class work
	</h1>

	<ul>
		<li><a href="/assignment1">Assignment 1</a></li>
		<li><a href="/assignment2">Assignment 2</a></li>
		<li><a href="/assignment3">Assignment 3</a></li>
		<li><a href="/assignment4">Assignment 4</a></li>
		<li><a href="/assignment5">Assignment 5</a></li>
		<li><a href="/assignment6">Assignment 6</a></li>
		<li><a href="/assignment7">Assignment 7</a></li>
		<li><a href="/final">Final</a></li>
	</ul>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
