import {createRouter, createWebHistory} from "vue-router";
import PostItem from "@/components/PostItem.vue";
import Home from "@/pages/Home.vue";
import Users from "@/pages/Users.vue";
import Posts from "@/pages/Posts.vue";

const routes = [
	{path: '/', component: Home},
	{path: '/users', component: Users},
	{path: '/posts', component: Posts},
	{path: '/posts/:id', component: PostItem}
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router