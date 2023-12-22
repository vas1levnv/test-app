<script>

export default {
	props: {
		
		options: {
			
			type: Array,
			
			required: true,
			
		},
		
		default: {
			
			type: Object,
			
			required: false,
			
			default: null,
			
		},
		
		tabindex: {
			
			type: Number,
			
			required: false,
			
			default: 0,
			
		},
		
	},
	
	data() {
		
		return {
			
			selected: this.default
				
				? this.default
				
				: this.options.length > 0
					
					? this.options[0]
					
					: null,
			
			open: false,
			
		};
		
	},
	
/*	mounted() {
		
		this.$emit("input", this.selected.value);
		
	},*/
	
};
</script>

<template>
	<div class="custom-select" :tabindex="tabindex" @blur="open = false">
		<div class="selected" :class="{ open: open }" @click="open = !open">
			{{ selected.title }}
		</div>
		<div class="items" :class="{ selectHide: !open }">
			<div
				v-for="(option, i) of options"
				:key="i"
				@click="
          selected = option;
          open = false;
          $emit('input', option.body);
        "
			>
				{{ option.title }}
			</div>
		</div>
	</div>
</template>

<style scoped>



.custom-select {
	
	position: relative;
	
	width: 100%;
	
	text-align: left;
	
	outline: none;
	
	height: auto;
	min-height: 40px;
	
	line-height: 47px;
	
}



.custom-select .selected {
	
	background-color: var(--color-background);
	
	border-radius: 6px;
	
	border: 2px solid var(--color-border);
	
	color: #fff;
	
	padding-left: 1em;
	
	cursor: pointer;
	
	user-select: none;
	
}



.custom-select .selected.open {
	
	border: 2px solid var(--green);
	
	border-radius: 6px 6px 0px 0px;
	
}



.custom-select .selected:after {
	
	position: absolute;
	
	content: "";
	
	top: 22px;
	
	right: 1em;
	
	width: 0;
	
	height: 0;
	
	border: 5px solid transparent;
	
	border-color: #fff transparent transparent transparent;
	
}



.custom-select .items {
	
	color: #fff;
	
	border-radius: 0px 0px 6px 6px;
	
	overflow: hidden;
	
	border-right: 2px solid var(--green);
	
	border-left: 2px solid var(--green);
	
	border-bottom: 2px solid var(--green);
	
	position: absolute;
	
	background-color: var(--color-background);
	
	left: 0;
	
	right: 0;
	
	z-index: 1;
	
}



.custom-select .items div {
	
	color: #fff;
	
	padding-left: 1em;
	
	cursor: pointer;
	
	user-select: none;
	
}



.custom-select .items div:hover {
	
	background-color: var(--green_hover);
	
}



.selectHide {
	
	display: none;
	
}

</style>
