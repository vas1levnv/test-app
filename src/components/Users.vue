<script setup>

import {onMounted, ref} from "vue";
import axios from "axios";

const users = ref([])

const fetchPosts = async() => {
	try {
		const response = await axios.get('https://jsonplaceholder.typicode.com/users')
		users.value = response.data
	} catch(e) {
		console.error(e)
	}
	
}

onMounted(() => {
	fetchPosts()
})

</script>

<template>
	<div>Users</div>
	<div class="user-list">
		<div class="user-item"
			 v-for="user in users">
			<div>{{ user.name }}</div>
			<div class="user-item__address">
				<div style="font-weight: 700">Address:</div>
				<div>Street: {{ user.address.street }}</div>
				<div>City: {{ user.address.city }}</div>
				<div>Suite: {{ user.address.suite }}</div>
				<div></div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.user {
	&-list {
		display: grid;
		gap: 1rem;
		margin-top: 1.5rem;
	}
	
	&-item {
		border-radius: 1.5rem;
		padding: 1.15rem;
		border: 2px solid var(--color-border);
		
		&__address {
			
		}
	}
}

@media (min-width: 1024px) {
	.user {
		&-list {
			grid-template-columns: repeat(3, 1fr);
		}
	}
}
</style>