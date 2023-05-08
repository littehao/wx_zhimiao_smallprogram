<template>
	<view class="service-page bgF7F8FA h-100vh flex flex-column">
		<comheader title="服务声明"></comheader>
		<view class="bgffff px-3">
			<view class="flex align-center mx-2 py-4 border-bottom" @click="tui.href('/pagesA/agreement/agreement?type=2')">
				<text class="ft1D2129  fs-32 flex-1">寻工/找工信息发布规则</text>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
			<view class="flex align-center mx-2 py-4 border-bottom" @click="tui.href('/pagesA/agreement/agreement?type=1')">
				<text class="ft1D2129  fs-32 flex-1">用户服务协议</text>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
			<view class="flex align-center mx-2 py-4 border-bottom" @click="tui.href('/pagesA/agreement/agreement?type=3')">
				<text class="ft1D2129  fs-32 flex-1">隐私政策</text>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
			<view class="flex align-center mx-2 py-4 border-bottom" @click="tui.href('/pagesA/agreement/agreement?type=4')">
				<text class="ft1D2129  fs-32 flex-1">提现说明</text>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
			<view class="flex align-center mx-2 py-4" @click="tui.href('/pagesA/agreement/agreement?type=5')">
				<text class="ft1D2129  fs-32 flex-1">佣金收益及提现服务</text>
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
			
			
		}
	}
</script>

<style>
.agreement-scroll{
	height: calc(100vh - 44px - var(--status-bar-height));
}
</style>
