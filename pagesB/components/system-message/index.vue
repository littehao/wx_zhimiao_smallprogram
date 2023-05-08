<template>
	<view class="flex align-center flex-wrap justify-center my-3">
		<tui-icon name="about-fill" size="16" color="#86909C"></tui-icon>
		<text v-if="message.payload.data.mpsContent" class="fs-24 ft86909C lineh44 text-center px-3">{{message.payload.data.mpsContent}}</text>
		<text v-else class="fs-24 ft86909C lineh44 text-center ml-1">{{message.payload.data.dbTitle}}</text>
	</view>
</template>

<script>
	export default {
		props:{
			message:{
				type:Object
			}
		},
		data(){
			return {
				
			}
		}
	}
</script>

<style>
</style>