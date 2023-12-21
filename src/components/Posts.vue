<script setup>

import {onMounted, ref, watch} from "vue";
import axios from "axios";

const posts = ref([])
const limit = ref(10)
const page = ref(1)
const totalPages = ref(null)

const fetchPosts = async(page) => {
	try {
		const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
			params: {
				_limit: limit.value,
				_page: page,
			}
		})
		totalPages.value = Math.ceil(response.headers['x-total-count'] / limit.value)
		posts.value = response.data
	} catch(e) {
		console.error(e)
	}
	
}

const addMorePosts = (page) => {
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
			 @click="addMorePosts(item)"
			 v-for="item in totalPages">{{ item }}
		</div>
	</div>
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

@media (min-width: 1024px) {
	.posts {
		&-list {
			grid-template-columns: repeat(3, 1fr);
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
}
</style>