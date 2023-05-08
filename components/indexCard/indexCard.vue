<template>
	<view class="bgffff rounded p-2 mb-2 indexcard" @click="navTo">
	    <view  class="flex align-center justify-between">
	        <text class="family fs-36 ft1D2129 flex-1 lineh44 f-w-b text-ellipsis2">{{item.title}}</text>
	        <view class="flex flex-column justify-end text-right ml-2">
	            <text class="ftF53F3F family fs-32 f-w-b">{{formatNumber(item.demandPrice || 0)}}元</text>
	            <text class="ft86909C fs-24">{{item.paymentStatusStr}}</text>
	        </view>
	    </view>
	    <view class="ft4E5969 fs-28  family lineh40 text-ellipsis2">{{item.content}}</view>
	    <view class="flex align-center mt-1">
	       <view  class="flex-1 flex align-center">
	            <!-- <text class="bgF2F3F5 fs-24 family rounded px-2 lineh40 ft1D2129">签合同</text>
	            <text class="bgF2F3F5 fs-24 family rounded ml-2 rounded px-2 lineh40 ft1D2129">买保险</text> -->
	        </view>
	        <view class="flex align-center">
							<image src="/static/images/dingwei2.png" mode="aspectFill" style="width:20rpx;height: 24rpx;"></image>
							<!-- <tui-icon  size="28" unit="rpx"  color="#86909C" name="gps"></tui-icon> -->
	            <text class="ft86909C fs-24 family text-ellipsis ml-1" style="max-width: 300rpx;">{{item.address}} {{item.distance || 0}}km</text>
	        </view>
	    </view>
	    <view class="flex align-center mt-2">
	        <view class="flex align-center flex-1">
	            <view class="position-relative">
	                <image class="rounded-circle bgF2F3F5" :src="item.wxHeadPortrait" mode="aspectFill"  style="width:48rpx;height:48rpx;"></image>
	                <image class="position-absolute right-0 bottom-0" src="/static/images/level.png" mode="widthFix" style="width: 24rpx;height: 24rpx;"></image>
	            </view>
	            <text class="ft86909C fs-24 ml-1 family">{{item.userName}}</text>
	        </view>
	        <view class="flex align-center" @tap.stop="shareFn" v-if="item.businessStatus < 4">
							<button class="flex align-center p-0 demand-sharebtn"
							type="default" 
							data-name="shareBtn" 
							:data-title="item.title"
							:data-path="`/pagesA/demand-details/demand-details?isshare=1&demandId=${item.id}`"
							open-type="share" 
							style="width: 100%;background-color: transparent;line-height: 20px;">
								<image src="/static/images/share.png" mode="widthFix" style="width: 28rpx;height: 28rpx;"></image>
								<text class="ft1D2129 fs-24 family ml-1">转发</text>
							</button>
	        </view>
			<view class="flex align-center" v-if="item.businessStatus == 6">
				<text class="ftF85241 fs-24 family ml-1">已完成</text>
			</view>
	    </view>
	</view>
</template>

<script>
	import { formatNumber } from '@/utils/common.js'
	export default{
		props:{
			item:{
				type:Object,
				default:()=>{}
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			formatNumber(price){
				return formatNumber(price)
			},
			navTo(){
				uni.navigateTo({
					url:'/pagesA/demand-details/demand-details?demandId='+ this.item.id
				})
			},
			shareFn(){
				console.log('分享')
			}
		}
	}
</script>

<style lang="scss">
	.indexcard uni-button:after,
	.indexcard button::after{
		border: 0;
	}
</style>