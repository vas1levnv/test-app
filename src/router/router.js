import Home from "@/components/Home.vue";
import Users from "@/components/Users.vue";
import {createRouter, createWebHistory} from "vue-router";
import Posts from "@/components/Posts.vue";

const routes = [
	{path: '/', component: Home},
	{path: '/users', component: Users},
	{path: '/posts', component: Posts},
]


const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router