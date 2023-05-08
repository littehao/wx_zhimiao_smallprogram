<template>
	<view class="setup-page bgF7F8FA h-100vh flex flex-column">
		<comheader  title="隐私设置"></comheader>
		<view class="bgffff px-3 pb-4">
			<view  class="border-bottom mb-5 py-3">
				<view class="flex align-center justify-between">
					<text class="fs-32 ft000000 mb-2">我的承接</text>
					<view class="flex align-center" @click="myAcceptanceSwitchFn">
						<image v-if="myAcceptOpen" src="/static/images/open.png" mode="widthFix" style="width: 50rpx;height: 50rpx;"></image>
						<image v-else src="/static/images/off.png" mode="widthFix" style="width: 50rpx;height: 50rpx;"></image>
						<text  class="fs-26 ft999999 ml-1">{{myAcceptOpen?'开':'关'}}</text>
					</view>
				</view>
				<view class="fs-26 ft999999 lineh50">关闭后，你的个人主页将不再展示过往承接的需求，雇主查看你的信息时也无法查看。</view>
			</view>
			<view  class="">
				<view class="flex align-center justify-between">
					<text class="fs-32 ft000000 mb-2">我的发布</text>
					<view class="flex align-center" @click="myReleaseSwitchFn">
						<image v-if="myReleaseOpen" src="/static/images/open.png" mode="widthFix" style="width: 50rpx;height: 50rpx;"></image>
						<image v-else src="/static/images/off.png" mode="widthFix" style="width: 50rpx;height: 50rpx;"></image>
						<text  class="fs-26 ft999999 ml-1">{{myReleaseOpen?'开':'关'}}</text>
					</view>
				</view>
				<view class="fs-26 ft999999 lineh50">关闭后，你的个人主页将不再展示过往发布的需求，可能影响发布需求的承接。</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters,mapActions } from 'vuex'
	export default {
		data() {
			return {
				myAcceptOpen:false,
				myReleaseOpen:false,
			}
		},
		created() {
			this.myAcceptanceSwitchStateFn()
			this.myReleaseSwitchStateFn()
		},
		methods: {
			...mapActions(['myAcceptanceSwitch','myAcceptanceSwitchState','myReleaseSwitch','myReleaseSwitchState']),
			async myAcceptanceSwitchFn(){
				try{
					let res = await this.myAcceptanceSwitch()
					this.tui.toast(res.msg)
					this.myAcceptanceSwitchStateFn()
				}catch(e){
					this.tui.toast(e.msg)
					//TODO handle the exception
				}
			},
			async myAcceptanceSwitchStateFn(){
				try{
					let res = await this.myAcceptanceSwitchState()
					this.myAcceptOpen = res.data == '1'?true:false
				}catch(e){
					//TODO handle the exception
				}
			},
			async myReleaseSwitchFn(){
				try{
					let res = await this.myReleaseSwitch()
					this.tui.toast(res.msg)
					this.myReleaseSwitchStateFn()
				}catch(e){
					//TODO handle the exception
				}
			},
			async myReleaseSwitchStateFn(){
				try{
					let res = await this.myReleaseSwitchState()
					this.myReleaseOpen = res.data == '1'?true:false
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style>
.agreement-scroll{
	height: calc(100vh - 44px - var(--status-bar-height));
}
</style>
