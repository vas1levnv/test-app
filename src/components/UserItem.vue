<script setup>
import {useRoute} from "vue-router";

const route = useRoute()
const id = route.params.id
</script>

<template>
	User item component #{{ id }}
</template>

<style scoped lang="scss">

</style>