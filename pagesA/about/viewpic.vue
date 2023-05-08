<template>
	<view class="bgF7F8FA h-100vh flex flex-column">
		<comheader  :title="title"></comheader>
		<view v-if="content" class="fs-32 ft86909C text-center py-5">{{content}}</view>
		<image v-if="url" :src="url" mode="widthFix" style="width: 100%;" class="flex"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'',
				url:'',
				content:''
			}
		},
		onLoad(query) {
			this.title = query.title
			if(query.url){
				this.url = query.url
			}
			if(query.content){
				this.content = query.content
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
