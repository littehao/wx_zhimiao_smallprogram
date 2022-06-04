<template>
	<view class="flex flex-column h-100vh">
		<comheader  title="注册登录"></comheader>
		<view class="flex-1 flex">
			<image class="m-auto" src="/static/images/zhimiao_logo.png" mode="widthFix" style="width: 100px;height: 100px;"></image>
		</view>
		<view class="flex flex-column align-center justify-center mx-32 flex-2">
			<view class="flex align-center justify-center bg00B42A  py-1 rounded w-100">
				<tui-icon :size="32" name="wechat" color="#fff"></tui-icon>
				<text  class="fs-28 ftffff ml-1">微信快捷登录</text>
			</view>
			<view class="flex align-center justify-center mt-3">
				<text class="ft86909C fs-24">登录即代表同意</text>
				<text class="ftF85241 fs-24">《职苗用户服务协议》</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
