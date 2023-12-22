<script setup>
const props = defineProps({
	modelValue: String,
})
</script>

<template>
	<input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
</template>

<style scoped lang="scss">
input {
	background: transparent;
	border: 2px solid var(--color-border);
	padding: 0.5rem 1rem;
	border-radius: 0.5rem;
	color: var(--green);
	outline: none;
	transition: 0.4s ease;
	
	&:focus {
		border-color: var(--green);
	}
}
</style>