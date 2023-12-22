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
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	z-index: 100;
	display: flex;
	justify-content: center;
	align-items: center;
	img {
		width: 200px;
		height: 200px;
		animation-name: rotation;
		animation-duration: 3s;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}
}

@keyframes rotation {
	0% {
		transform: rotate(0);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>