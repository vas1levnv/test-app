<script setup>

import {computed, ref} from "vue";
import Preloader from "@/components/UI/Preloader.vue";
import CustomInput from "@/components/UI/CustomInput.vue";
import CustomSelect from "@/components/UI/CustomSelect.vue";
import {useGetData} from "@/hooks/useGetData.js";

const searchText = ref('')
const endpoint = ref('users')
const options = ref([
	{title: 'Street', body: 'street'},
	{title: 'City', body: 'city'},
	{title: 'Suite', body: 'suite'},
])
const selectedOption = ref('')

const {arr, isLoading, error} = useGetData(endpoint)

const sortedUsers = computed(() => {
	return [...arr.value].sort((item1, item2) => item1.address[selectedOption.value]?.localeCompare(item2.address[selectedOption.value]))
})

const searchedPosts = computed(() => {
	return sortedUsers.value.filter(user => user.name.toLowerCase().includes(searchText.value.toLowerCase()))
})

</script>

<template>
	<div>Users</div>
	<div class="user-field">
		<custom-input placeholder="Search by name..." v-model="searchText"/>
		<CustomSelect
			:options="options"
			@input="selectedOption = $event"
		/>
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
			</div>
		</div>
	</div>
	<div v-show="error" class="error">{{ error }}</div>
	<Preloader v-show="isLoading"/>
</template>

<style scoped lang="scss">
.user {
	&-field {
		display: flex;
		flex-direction: column;
		gap: 1rem;
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
		
		&-field {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			gap: 1rem;
			margin-top: 1rem;
		}
		
		&-list {
			grid-template-columns: repeat(3, 1fr);
		}
	}
}
</style>