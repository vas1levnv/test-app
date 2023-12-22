<script setup>

import {onMounted, ref} from "vue";
import axios from "axios";
import Preloader from "@/components/UI/Preloader.vue";

const posts = ref([])
const limit = ref(10)
const page = ref(1)
const totalPages = ref(null)
const isLoading = ref(false)
const error = ref(null)

const fetchPosts = async(page) => {
	try {
		isLoading.value = true
		const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
			params: {
				_limit: limit.value,
				_page: page,
			}
		})
		totalPages.value = Math.ceil(response.headers['x-total-count'] / limit.value)
		posts.value = response.data
		await new Promise((resolve, reject) => setTimeout(resolve, 2000))
	} catch(e) {
		error.value = e.message
	} finally {
		isLoading.value = false
	}
	
}

const changePage = (page) => {
	fetchPosts(page)
}

onMounted(() => {
	fetchPosts(page.value)
})

</script>

<template>
	<div>Posts</div>
	<div class="posts-list">
		<router-link :to="'/posts/' + post.id" class="posts-item"
					 v-for="post in posts">
			<div class="posts-item__title">{{ post.title }}</div>
			<div>{{ post.body }}</div>
		</router-link>
	</div>
	<div class="pagination">
		<div class="pagination-item"
			 @click="changePage(item)"
			 v-for="item in totalPages">{{ item }}
		</div>
	</div>
	<div class="error">{{ error}}</div>
	<Preloader v-show="isLoading"/>
</template>

<style scoped lang="scss">
.posts {
	&-list {
		display: grid;
		gap: 1rem;
		margin-top: 1.5rem;
	}
	
	&-item {
		border-radius: 1.5rem;
		padding: 1.15rem;
		border: 2px solid var(--color-border);
		color: inherit;
		
		&__title {
			color: var(--green);
			font-weight: 500;
			margin-bottom: 0.5rem;
		}
	}
}

.pagination {
	display: flex;
	justify-content: center;
	margin-top: 2rem;
	
	&-item {
		padding: 0.5rem;
		cursor: pointer;
	}
}

@media (min-width: 1024px) {
	.posts {
		&-list {
			grid-template-columns: repeat(3, 1fr);
		}
	}
}
</style>