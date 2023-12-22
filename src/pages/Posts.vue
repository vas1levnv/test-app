<script setup>

import {computed, onMounted, ref} from "vue";
import axios from "axios";
import Preloader from "@/components/UI/Preloader.vue";
import CustomButton from "@/components/UI/CustomButton.vue";

const posts = ref([])
const limit = ref(9)
const page = ref(1)
const totalPages = ref(null)
const isLoading = ref(false)
const error = ref(null)
const currentPage = ref(1)

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
		currentPage.value = page
		await new Promise((resolve) => setTimeout(resolve, 2000))
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

const showPage = computed(() => {
	
})

</script>

<template>
	<div>Posts</div>
	<div class="posts-list">
		<div class="posts-item"
			 v-for="post in posts">
			<div class="posts-item__title">{{ post.title }}</div>
			<div class="posts-item__body">{{ post.body }}</div>
			
			<router-link :to="'/posts/' + post.id">
				<custom-button>
					Detail post
				</custom-button>
			</router-link>
		
		</div>
	</div>
	<div class="pagination">
		<div class="pagination-item"
			 @click="changePage(item)"
			 :class="{active: item === currentPage}"
			 v-show="item === currentPage 
			 || item === currentPage + 1 
			 || item === currentPage + 2
			 || item === currentPage - 1
			 || item === currentPage - 2
			 || item === 1
			 || item === totalPages
"
			 v-for="item in totalPages">{{ item }}
		</div>
	</div>
	<div class="error">{{ error }}</div>
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
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		border-radius: 1.5rem;
		padding: 1.15rem;
		border: 2px solid var(--color-border);
		color: inherit;
		
		
		&__title {
			color: var(--green);
			font-weight: 500;
		}
		
		a {
			display: flex;
			align-items: end;
			width: fit-content;
			border-radius: 0.5rem;
			align-self: end;
			flex: 1 1 0;
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
		border-radius: 0.5rem;
		
		
		&.active, &:hover {
			background: var(--green_hover);
			font-weight: 700;
		}
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