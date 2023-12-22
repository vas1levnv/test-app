<script setup>
import logo from '@/assets/logo.svg'
</script>

<template>
	<div class="preloader">
		<img :src="logo" alt="preloader">
	</div>
</template>

<style scoped lang="scss">
.preloader {
	width: 200px;
	height: 200px;
	animation-name: rotation;
	animation-duration: 3s;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
}

@keyframes rotation  {
	0%{
		transform: rotate(0);
	}
	100%{
		transform: rotate(360deg);
	}
}
</style>