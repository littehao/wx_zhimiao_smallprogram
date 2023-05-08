<template>
	<view class="h-100vh bgffff login-page">
		<comheader  title="注册登录"></comheader>
		<view class="flex flex-column position-relative login-content">
			<view class="ft1D2129  fs-40 text-center mb-5" style="padding-top:10vh">
				<image src="https://zm.zgzhm.com/mini/img/login_img.png" mode="widthFix" style="width: 100%;height: 100%;"></image>
			</view>
			<view class="mx-3" style="margin-top:20vh">
				<loginBt :ispage="true"></loginBt>
			</view>
		</view>
	</view>
</template>

<script>
	import loginBt from '@/components/login/loginBtn.vue'
	export default {
		components:{loginBt},
		data() {
			return {
				
			}
		},
		methods: {
			navTo(){
				uni.navigateTo({
					url:'/pagesA/web-view/hybrid?url=serviceagreement&title=用户服务协议'
				})
			}
		}
	}
</script>

<style lang="scss">
.login-content{
	height: calc(100vh - 44px - var(--status-bar-height));
}
</style>
