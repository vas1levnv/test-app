<script setup>
</script>

<template>
	<div>
		<router-link to="/">Home</router-link>
		<router-link to="/users">Users</router-link>
		<router-link to="/posts">Posts</router-link>
	</div>
	<div class="af">
		<router-view/>
	</div>
</template>

<style scoped>

</style>
