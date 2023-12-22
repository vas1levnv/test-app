<script setup>

import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import axios from "axios";
import CustomButton from "@/components/UI/CustomButton.vue";

const route = useRoute()
const id = route.params.id
const post = ref(null)
const comments = ref(null)

const fetchPost = async() => {
	try {
		const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
		post.value = response.data
	} catch(e) {
		console.error(e)
	}
}

const showComment = async() => {
	try {
		const response = await axios.get('https://jsonplaceholder.typicode.com/comments?postId', {
			params:{
				postId: id
			}
		})
		comments.value = response.data
	} catch(e) {
		console.error(e)
	}
}

onMounted(() => {
	fetchPost()
})

</script>

<template>
	<div v-if="post">
		<div>Title: {{ post.title }}</div>
		<div>Body: {{ post.body }}</div>
		<br>
		<CustomButton @click="showComment">Show comments</CustomButton>
		<div class="comments-list" v-if="comments">
			<div class="comments-item" v-for="comment in comments">
				<div>{{ comment.email}}</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.comments{
	&-list{
		display: grid;
		gap: 2rem;
		margin-top: 2rem;
	}
}


</style>