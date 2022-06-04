<template>
	<view class="h-100vh flex flex-column">
		<comheader  title="需求详情"></comheader>
		<view class="demand-content  px-32 py-3 border-box overflow-y">
			<view class="flex align-start">
				<text class="fs-32 ft1D2129 f-w-b lineh50">成都市武侯区需要广告安装工人，工费400一天，此处根据标题字数换行，标题下面内容根据标题高度向下移动现在限制50字，4行为最大行数</text>
				<view class="flex flex-column">
					<text class="ftF53F3F fs-40 f-w-b text-ellipsis">12000.00元</text>
					<text class="ft86909C fs-24 text-right">已支付</text>
				</view>
			</view>
			<view class="flex align-center py-3 border-bottom">
			    <view  class="flex-1 flex align-center">
			        <text class="bgF2F3F5 fs-24 family rounded px-2 lineh40 ft1D2129">签合同</text>
			        <text class="bgF2F3F5 fs-24 family rounded ml-2 rounded px-2 lineh40 ft1D2129">买保险</text>
			    </view>
			    <view class="flex  align-center">
					<tui-icon  size="28" unit="rpx"  color="#86909C" name="gps"></tui-icon>
			        <text class="ft86909C fs-24 family">天府三街 5.3km</text>
			    </view>
			</view>
			<view class="flex py-3 border-bottom" @click="navToUser">
				<view class="position-relative mr-2" style="width:40px;height:40px;">
				    <image class="rounded-circle" src="/static/images/avatar.png" mode="aspectFill"  style="width:40px;height:40px;"></image>
				    <image class="position-absolute right-0 bottom-0" src="/static/images/level.png" mode="widthFix" style="width: 20px;height: 20px;"></image>
				</view>
				<view class="flex flex-column flex-1">
					<text class="mb-1 ft1D2129 fs-28">彭达敏</text>
					<view class="flex align-center">
						<text class="fs-24 ft4E5969">诚信值: LV23</text>
						<text class="fs-24 ft4E5969">技能量: 23</text>
					</view>
				</view>
				<tui-icon color="#86909C" :size="28" name="arrowright"></tui-icon>
			</view>
			<view class="flex flex-column">
				<view class="fs-28 ft1D2129 f-w-b py-3">需求详情</view>
				<text class="ft4E5969 fs-28 lineh44">所谓“功夫流感”是对亚裔人口的严重冒犯，是赤裸裸的种族主义，对日益成为种族歧视受害者的亚裔美国人来说尤其不可接受。如今，美国国内面临“抗疫”“抗议”双重危机，那些仍不幡然悔悟的政客们，将注定背上祸国殃民的骂名。</text>
				<view v-if="imgsList.length > 2" class="flex align-center justify-around my-2">
					<block v-for="(item,index) in imgsList" :key="index">
						<image @click="previewImage(index)" class="mr-1" :src="item" mode="widthFix" style="width: 25%;height: 25%;"></image>
					</block>
				</view>	
				<template  v-else>
					<block v-for="(item,index) in imgsList" :key="index">
						<image @click="previewImage(index)" class="mr-1" :src="item" mode="widthFix" style="width: 100%;height: 100%;"></image>
					</block>
				</template>
			</view>
			<view class="flex ft1D2129 fs-28 f-w-b mt-4 mb-2">详细地址</view>
			<view class="demand-map">
				<map style="width: 100%; height: 408rpx;" @markertap="callouttapFn" @callouttap='callouttapFn' :latitude="latitude" :longitude="longitude" :markers="covers">
				</map>
			</view>
			<view :style="{height: (100  + getSafeAreaBottom) + 'px'}"></view>
		</view>
		<view class="flex align-center px-32 position-fixed bottom-0 left-0 right-0 bgffff pt-3  border-top" :style="{'padding-bottom': getSafeAreaBottom > 0?getSafeAreaBottom+'px':'15'+'px'}">
			<view class="flex flex-column justify-center text-center" style="width: 48px;" @click="navToDaJia">
				<tui-icon :size="24" color="#86909C" name="about"></tui-icon>
				<text class="ft86909C fs-24">打假</text>
			</view>
			<view class="flex flex-column justify-center text-center" style="width: 48px;" @click="share">
				<tui-icon :size="24" color="#86909C" name="share"></tui-icon>
				<text class="ft86909C fs-24">分享</text>
			</view>
			<view class="rounded ftffff fs-28 py-2 text-center bgF85241 flex-1 ml-2" @click="navToChat">立即沟通</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				imgsList:[
					require('../../static/images/img1.jpg'),
					require('../../static/images/img2.jpg')
				],
				id:0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 30.65984, //中心纬度
				longitude: 104.10194, //中心经度
				covers: [{
					id:1,
					latitude: 30.65984,
					longitude: 104.10194,
					callout:{
						content:'四川省成都市武侯区天府三街288号',
						color:'#1D2129',
						display:'ALWAYS',
						padding:'10',
						fontSize:'14',
						borderRadius:'5'
					},
					width:'30',
					height:'30',
					iconPath: '../../static/images/markers.png'
				}]
			}
		},
		computed:{
			...mapGetters(['getNavHeight','getNavTop','getSafeAreaBottom'])
		},
		methods: {
			previewImage(index){
				uni.previewImage({
					current:index,
					urls: this.imgsList,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			callouttapFn(e){
				console.log(e)
				uni.openLocation({
					latitude: this.latitude,//维度
					longitude: this.longitude,//经度
					scale: 18,//缩放比例，范围5~18，默认为18
					name:'四川省成都市武侯区天府三街288号',//地址名称
					address:'四川省成都市武侯区天府三街288号',//地址详情
				})
			},
			navToChat(){
				uni.navigateTo({
					url:'/pagesB/chat/chat'
				})
			},
			navToDaJia(){
				uni.navigateTo({
					url:'/pages/anti-counterfeiting/anti-counterfeiting'
				})
			},
			navToUser(){
				uni.navigateTo({
					url:'/pagesA/user/user'
				})
			},
			share(){
				
			}
		}
	}
</script>

<style>
.demand-content{
	height: calc(100vh - 44px - var(--status-bar-height));
}
</style>
