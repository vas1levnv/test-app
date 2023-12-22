<script setup>

import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import axios from "axios";
import CustomButton from "@/components/UI/CustomButton.vue";
import Preloader from "@/components/UI/Preloader.vue";

const route = useRoute()
const id = route.params.id
const post = ref(null)
const comments = ref(null)
const isLoading = ref(false)
const error = ref(null)

const fetchPost = async() => {
	try {
		isLoading.value = true
		const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
		await new Promise((resolve) => setTimeout(resolve, 2000))
		post.value = response.data
	} catch(e) {
		error.value = e.message
	} finally {
		isLoading.value = false
	}
}

const showComment = async() => {
	try {
		isLoading.value = true
		const response = await axios.get('https://jsonplaceholder.typicode.com/comments?postId', {
			params: {
				postId: id
			}
		})
		await new Promise((resolve) => setTimeout(resolve, 2000))
		comments.value = response.data
	} catch(e) {
		error.value = e.message
	} finally {
		isLoading.value = false
	}
}

onMounted(() => {
	fetchPost()
})

</script>

<template>
	<div v-if="post">
		<div class="comments-content">
			<div>Title: {{ post.title }}</div>
			<div>Body: {{ post.body }}</div>
		</div>
		<CustomButton @click="showComment">Show comments</CustomButton>
		<div class="comments-list" v-if="comments">
			<div class="comments-item" v-for="comment in comments">
				<div>email: {{ comment.email }}</div>
				<div>name: {{ comment.name }}</div>
				<div>body: {{ comment.body }}</div>
			</div>
		</div>
	</div>
	<div class="error" v-show="error">{{ error }}</div>
	<Preloader v-show="isLoading"/>
</template>

<style scoped lang="scss">
.comments {
	&-content {
		margin-bottom: 2rem;
	}
	
	&-list {
		display: grid;
		gap: 2rem;
		margin-top: 2rem;
	}
}

</style>