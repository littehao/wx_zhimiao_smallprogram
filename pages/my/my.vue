<template>
	<view class="my-page bgF7F8FA h-100vh">
		<view class="flex flex-column bglinear">
			<comheader :bgColor="false" :backBtn="false" title="我的"></comheader>	
			<view class="flex align-center px-32">
				<view class="position-relative mr-2">
				    <image class="rounded-circle" src="/static/images/avatar.png" mode="aspectFill"  style="width:64px;height:64px;"></image>
				    <image class="position-absolute right-0 bottom-0" src="/static/images/level.png" mode="widthFix" style="width: 20px;height: 20px;"></image>
				</view>
				<view class="flex flex-column flex-1">
					<text class="fs-40 ftffff mb-1">彭达敏</text>
					<text class="ftffff fs-28">13888888888</text>
				</view>
				<view class="flex align-center" @click="navToMyinfo">
					<text class="fs-28 ftffff mr-1">个人资料</text>
					<tui-icon color="#fff" size="20" name="arrowright"></tui-icon>
				</view>
			</view>
			<view class="flex align-center justify-around py-3">
				<view class="flex flex-column">
					<text class="fs-28 ftFED3C6 mb-1">等级</text>
					<text class="ftffff fs-32">皇冠</text>
				</view>
				<view class="flex flex-column">
					<text class="fs-28 ftFED3C6 mb-1">技能量</text>
					<text class="ftffff fs-32">80</text>
				</view>
				<view class="flex flex-column" @click="navToFocusList">
					<text class="fs-28 ftFED3C6 mb-1">关注</text>
					<text class="ftffff fs-32">80</text>
				</view>
				<view class="flex flex-column"  @click="navToFansList">
					<text class="fs-28 ftFED3C6 mb-1">粉丝</text>
					<text class="ftffff fs-32">1.1万</text>
				</view>
			</view>
		</view>
		
		<view class="flex align-center justify-around mx-32 bgffff rounded my-2 py-3">
			<view class="flex flex-column text-center" @click="navToMyDemand">
				<image src="/static/images/my-icon1.png"  class="mx-auto mb-1" mode="widthFix" style="width: 22px;height: 22px;"></image>
				<text class="ft1D2129 fs-24">我的发布</text>
			</view>
			<view class="flex flex-column text-center" @click="navToMyAccept">
				<image src="/static/images/my-icon2.png" class="mx-auto mb-1" mode="widthFix" style="width: 22px;height: 22px;"></image>
				<text class="ft1D2129 fs-24">我的承接</text>
			</view>
			<view class="flex flex-column text-center">
				<image src="/static/images/my-icon3.png" class="mx-auto mb-1" mode="widthFix" style="width: 22px;height: 22px;"></image>
				<text class="ft1D2129 fs-24">已完成</text>
			</view>
			<view class="flex flex-column text-center position-relative">
				<image src="/static/images/my-icon4.png" class="mx-auto mb-1" mode="widthFix" style="width: 22px;height: 22px;"></image>
				<text class="ft1D2129 fs-24">待评价</text>
				<tui-badge type="danger" absolute :scaleRatio="0.8" translateX="40%" top="-6rpx">9</tui-badge>
			</view>
		</view>	
		
		<view class="my-nav bgffff rounded mx-32">
			<view class="flex align-center mx-2 py-3 border-bottom" @click="navToAgreement">
				<image src="/static/images/my-nav-icon1.png" mode="widthFix" style="width: 22px;height: 22px;"></image>
				<text class="ft1D2129  fs-28 flex-1 ml-2">服务协议</text>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
			<view class="flex align-center mx-2 py-3 border-bottom">
				<image src="/static/images/my-nav-icon2.png" mode="widthFix" style="width: 22px;height: 22px;"></image>
				<text class="ft1D2129  fs-28 flex-1 ml-2">新手教程</text>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
			<view class="flex align-center mx-2 py-3 border-bottom">
				<image src="/static/images/my-nav-icon3.png" mode="widthFix" style="width: 22px;height: 22px;"></image>
				<text class="ft1D2129  fs-28 flex-1 ml-2">推荐给好友</text>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
			<view class="flex align-center mx-2 py-3 border-bottom" @click="navToAbout">
				<image src="/static/images/my-nav-icon4.png" mode="widthFix" style="width: 22px;height: 22px;"></image>
				<text class="ft1D2129  fs-28 flex-1 ml-2">关于我们</text>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
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
			navToFocusList(){
				uni.navigateTo({
					url:'/pagesA/focus-list/focus-list'
				})
			},
			navToFansList(){
				uni.navigateTo({
					url:'/pagesA/fans-list/fans-list'
				})
			},
			navToMyDemand(){
				uni.navigateTo({
					url:'/pagesA/mydemand/mydemand'
				})
			},
			navToMyAccept(){
				uni.navigateTo({
					url:'/pagesA/myaccept/myaccept'
				})
			},
			navToAgreement(){
				uni.navigateTo({
					url:'/pagesA/agreement/agreement'
				})
			},
			navToMyinfo(){
				uni.navigateTo({
					url:'/pagesA/myinfo/myinfo'
				})
			},
			navToAbout(){
				if(uni.getUserProfile){
					 uni.getUserProfile({
					   desc: '获取用户信息',
					   success: function (infoRes) {
						console.log('用户昵称为：' + JSON.stringify(infoRes));
					   },
					   fail:function(err){
						   console.log(err);
					   }
					 });
				}
			}
		}
	}
</script>

<style>

</style>
