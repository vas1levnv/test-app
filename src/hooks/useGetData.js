import axios from "axios";
import {onMounted, ref} from "vue";

export const useGetData = (endpoint) => {
	const arr = ref([])
	const isLoading = ref(false)
	const error = ref(null)
	
	const fetching = async() => {
		try {
			isLoading.value = true
			const response = await axios.get(`https://jsonplaceholder.typicode.com/${endpoint.value}/`)
			arr.value = response.data
			await new Promise((resolve) => setTimeout(resolve, 2000))
		} catch(e) {
			error.value = e.message
		} finally {
			isLoading.value = false
		}
	}
	onMounted(fetching)
	return {
		arr, isLoading, error
	}
}