<template>
	<view class="Introduction-page bgffff h-100vh flex flex-column">
		<comheader  title="个人简介"></comheader>
		<view class="fs-40 ft1D2129 mx-32 py-3">请用简练的话来介绍自己</view>
		<view class="mx-32 flex-1">
			<tui-textarea v-model="intro" minHeight="600rpx" padding="0" :borderTop="false" :borderBottom="false" placeholder="请输入内容"></tui-textarea>
		</view>
		<view class="mx-32 pt-2 border-top">
			<view class="ftffff fs-28 py-2 rounded text-center" :class="intro?'bgF85241':'bgc6c6c6'" @click="submitIntro">提交</view>
			<view :style="{height:getSafeAreaBottom + 20+'px'}"></view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				intro:''
			}
		},
		computed:{
			...mapGetters(['getSafeAreaBottom'])
		},
		methods: {
			submitIntro(){
				if(!this.intro)return
				uni.$emit('updateData',{intro:this.intro})
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>

</style>
