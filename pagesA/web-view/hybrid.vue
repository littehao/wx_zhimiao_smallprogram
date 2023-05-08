<template>
	<view class="agreement-page bgF7F8FA h-100vh flex flex-column">
		<comheader  :title="title"></comheader>
		<web-view :src="`/static/hybrid/html/${url}.html`"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: "",
				title:""
			}
		},
		onLoad(options) {
			this.url = options.url;
			if(options.title){
				this.title= options.title
			}
		}
	}
</script>

<style>
</style>
