<script setup>

import TheWelcome from "@/components/TheWelcome.vue";
import HelloWorld from "@/components/HelloWorld.vue";
import logo from "@/assets/logo.svg"

</script>

<template>
	<div class="home">
		<header>
			<div>
			
			</div>
			<img alt="Vue logo" class="logo" :src="logo" width="125" height="125"/>
			
			<div class="wrapper">
				<HelloWorld msg="You did it!"/>
			</div>
		</header>
		
		<main>
			<TheWelcome/>
		</main>
	</div>
</template>

<style scoped>
header {
	line-height: 1.5;
}

.logo {
	display: block;
	margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
	header {
		display: flex;
		place-items: center;
		padding-right: calc(var(--section-gap) / 2);
	}
	
	.logo {
		margin: 0 2rem 0 0;
	}
	
	header .wrapper {
		display: flex;
		place-items: flex-start;
		flex-wrap: wrap;
	}
	
	.home{
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
}
</style>