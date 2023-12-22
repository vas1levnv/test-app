<script setup>

import {computed, onMounted, ref} from "vue";
import axios from "axios";
import Preloader from "@/components/UI/Preloader.vue";
import CustomInput from "@/components/UI/CustomInput.vue";

const users = ref([])
const isLoading = ref(false)
const error = ref(null)
const searchText = ref('')

const fetchPosts = async() => {
	try {
		isLoading.value = true
		const response = await axios.get('https://jsonplaceholder.typicode.com/users')
		users.value = response.data
		await new Promise((resolve) => setTimeout(resolve, 2000))
	} catch(e) {
		error.value = e.message
	} finally {
		isLoading.value = false
	}
	
}

onMounted(() => {
	fetchPosts()
})

const searchedPosts = computed(() => {
	return users.value.filter(user => user.name.toLowerCase().includes(searchText.value.toLowerCase()))
})

</script>

<template>
	<div>Users</div>
	<div class="user-field">
		<custom-input placeholder="Поиск по имени..." v-model="searchText"/>
	</div>
	<div class="user-list">
		<div class="user-item"
			 v-for="user in searchedPosts">
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
	<div v-show="error">{{ error }}</div>
	<Preloader v-show="isLoading"/>
</template>

<style scoped lang="scss">
.user {
	&-field {
		margin-top: 1rem;
	}
	
	&-list {
		display: grid;
		gap: 1rem;
		margin-top: 1.5rem;
	}
	
	&-item {
		border-radius: 1.5rem;
		padding: 1.15rem;
		border: 2px solid var(--color-border);
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