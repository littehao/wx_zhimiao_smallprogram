<template>
	<view class="service-page bgF7F8FA h-100vh flex flex-column">
		<comheader  title="关于我们"></comheader>
		<view class="bgffff px-3">
			<view class="flex my-5">
				<image class="mx-auto" src="https://zm.zgzhm.com/mini/img/login_img.png" mode="widthFix" style="width: 70%;height: 100%;"></image>
			</view>
			<view class="flex align-center mx-2 py-4 border-bottom" @click="tui.href('/pagesA/web-view/web-view?url=https://mp.weixin.qq.com/s/0VEPpckd4_1RZfmQDcsVPQ')">
				<text class="ft1D2129  fs-32 flex-1">职苗简介</text>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
			<view class="flex align-center mx-2 py-4 border-bottom" @click="tui.href('/pagesA/about/flair')">
				<text class="ft1D2129  fs-32 flex-1">职苗资质</text>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
			<view class="flex align-center mx-2 py-4 border-bottom" @click="tui.toast('敬请期待')">
				<text class="ft1D2129  fs-32 flex-1">联系客服</text>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
			<view class="flex align-center mx-2 py-4 border-bottom" @click="tui.toast('敬请期待')">
				<text class="ft1D2129  fs-32 flex-1">商户合作</text>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters,mapActions } from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		
		methods: {
			openCustomerServiceChat(){
				wx.openCustomerServiceChat({
				  extInfo: {url: ''},
				  corpId: 'ww85ab5fe5ed36dd87',
				  success(res) {}
				})
			}
			
		}
	}
</script>

<style>
.agreement-scroll{
	height: calc(100vh - 44px - var(--status-bar-height));
}
</style>
