<template>
	<view class="bgffff rounded p-2 mb-2" @click="navTo">
	    <view  class="flex align-center justify-between">
	        <text class="family fs-28 ft1D2129 flex-1 lineh44 f-w-b">大标题可以详细描述需求，展示两行，超出部分显示…</text>
	        <view class="flex flex-column ml-2">
	            <text class="ftF53F3F family fs-32 f-w-b">1.2万元</text>
	            <text class="ft86909C fs-24">已支付</text>
	        </view>
	    </view>
	    <view class="ft4E5969 fs-24  family lineh40">成都市武侯区需要广告安装工人，工费400一天，此处最多显示两行，超出使用…代替</view>
	    <view class="flex align-center mt-1">
	        <view  class="flex-1 flex align-center">
	            <text class="bgF2F3F5 fs-24 family rounded px-2 lineh40 ft1D2129">签合同</text>
	            <text class="bgF2F3F5 fs-24 family rounded ml-2 rounded px-2 lineh40 ft1D2129">买保险</text>
	        </view>
	        <view class="flex  align-center">
				<tui-icon  size="28" unit="rpx"  color="#86909C" name="gps"></tui-icon>
	            <text class="ft86909C fs-24 family">天府三街 5.3km</text>
	        </view>
	    </view>
	    <view class="flex align-center mt-2">
	        <view class="flex align-center flex-1">
	            <view class="position-relative">
	                <image class="rounded-circle" src="/static/images/avatar.png" mode="aspectFill"  style="width:48rpx;height:48rpx;"></image>
	                <image class="position-absolute right-0 bottom-0" src="/static/images/level.png" mode="widthFix" style="width: 24rpx;height: 24rpx;"></image>
	            </view>
	            <text class="ft86909C fs-24 ml-1 family">王小翔</text>
	        </view>
	        <view class="flex align-center" @click.stop="share">
	            <image src="/static/images/share.png" mode="widthFix" style="width: 28rpx;height: 28rpx;"></image>
	            <text class="ftF85241 fs-24 family ml-1">转发</text>
	        </view>
	    </view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			navTo(){
				uni.navigateTo({
					url:'/pages/demand-details/demand-details'
				})
			},
			share(){
				console.log('分享')
			}
		}
	}
</script>

<style>
</style>