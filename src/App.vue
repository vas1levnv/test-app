<script setup>
</script>

<template>
	<header class="header">
		<router-link to="/">Home</router-link>
		<router-link to="/users">Users</router-link>
		<router-link to="/posts">Posts</router-link>
	</header>
	<div class="af">
		<router-view/>
	</div>
</template>

<style scoped>
.header {
	display: flex;
	gap: 1rem;
	margin-bottom: 1rem;
	font-size: 1.5rem;
}
</style>
