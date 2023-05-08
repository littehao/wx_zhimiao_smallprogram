<template>
	<view class="h-100vh flex flex-column">
		<comheader :backBtn="isshare != 1"  title="需求详情">
			<tui-icon v-if="isshare == 1" class="position-absolute left-0 bottom-0 flex align-center justify-center ml-2"
				:style="{top:getNavTop+'px'}" color="#fff" :size="24" unit="px" name="home" @click="backFn"></tui-icon>
		</comheader>
		<view class="demand-content  px-32 py-3 border-box overflow-y">
			<view class="flex align-start">
				<text class="fs-32 ft1D2129 f-w-b lineh50 flex-1">{{demandData.title}}</text>
				<view class="flex flex-column">
					<text class="ftF53F3F fs-40 f-w-b text-ellipsis">{{formatNumber(demandData.demandPrice || 0)}}元</text>
					<text class="ft86909C fs-24">{{demandData.paymentStatusStr}}</text>
				</view>
			</view>
			<view class="flex align-center justify-end py-3 border-bottom">
			    <!-- <view  class="flex-1 flex align-center">
			        <text class="bgF2F3F5 fs-24 family rounded px-2 lineh40 ft1D2129 text-ellipsis">签合同</text>
			        <text class="bgF2F3F5 fs-24 family rounded ml-2 rounded px-2 lineh40 ft1D2129 text-ellipsis">买保险</text>
			    </view> -->
			    <view class="flex  align-center justify-end" style="width: 350rpx;">
					<tui-icon  size="28" unit="rpx"  color="#86909C" name="gps"></tui-icon>
			        <text class="ft86909C fs-24 family text-right">{{demandData.address || ''}} {{demandData.distance || 0}}km</text>
			    </view>
			</view>
			<view class="flex py-3 border-bottom" @click="navToUser">
				<view class="position-relative mr-2" style="width:40px;height:40px;">
				    <image class="rounded-circle bgF2F3F5" :src="demandData.userMap  && demandData.userMap.WxHeadPortrait" mode="aspectFill"  style="width:40px;height:40px;"></image>
				    <image class="position-absolute right-0 bottom-0" src="/static/images/level.png" mode="widthFix" style="width: 20px;height: 20px;"></image>
				</view>
				<view class="flex flex-column flex-1">
					<text class="mb-1 ft1D2129 fs-28">{{demandData.userMap  &&  demandData.userMap.userName}}</text>
					<view class="flex align-center">
						<text class="fs-24 ft4E5969 mr-2">诚信值: {{(demandData.userMap  && demandData.userMap.integrityValue) || 0}}</text>
						<text class="fs-24 ft4E5969">等级: {{(demandData.userMap  &&  demandData.userMap.skillValue) || 0}}</text>
					</view>
				</view>
				<tui-icon color="#86909C" :size="28" name="arrowright"></tui-icon>
			</view>
			<view class="flex flex-column">
				<view class="fs-28 ft1D2129 f-w-b py-3">需求详情</view>
				<text class="ft4E5969 fs-28 lineh44">{{demandData.content}}</text>
				<view v-if="imgsList.length > 2" class="flex align-center justify-around my-2">
					<block v-for="(item,index) in imgsList" :key="index">
						<image @click="previewImage(index)" class="mr-1 rounded" :src="item" mode="widthFix" style="width: 25%;height: 25%;"></image>
					</block>
				</view>	
				<template  v-else>
					<view class="mt-2">
						<block v-for="(item,index) in imgsList" :key="index">
							<image @click="previewImage(index)" class="mr-1 mb-2 rounded" :src="item" mode="widthFix" style="width: 100%;height: 100%;"></image>
						</block>
					</view>
				</template>
			</view>
			<view class="flex ft1D2129 fs-28 f-w-b mt-4 mb-2">详细地址</view>
			<view class="demand-map">
				<map style="width: 100%; height: 408rpx;" 
				@markertap="callouttapFn" 
				@callouttap='callouttapFn' 
				:latitude="latitude" 
				:longitude="longitude" 
				:markers="covers"
				@tap="callouttapFn"
				:enable-scroll="false"
				>
				</map>
			</view>
			<view :style="{height: (100  + getSafeAreaBottom) + 'px'}"></view>
		</view>
		<view class="flex align-center px-32 position-fixed bottom-0 left-0 right-0 bgffff pt-3  border-top" :style="{'padding-bottom': getSafeAreaBottom > 0?getSafeAreaBottom+'px':'15'+'px'}">
			<view class="flex flex-column justify-center text-center" style="width: 48px;" @click="navToDaJia">
				<tui-icon :size="24" color="#86909C" name="about"></tui-icon>
				<text class="ft86909C fs-24">打假</text>
			</view>
			<view style="width: 48px;">
				<button class="flex flex-column align-center p-0 demand-sharebtn" 
				type="default" 
				data-name="shareBtn" 
				open-type="share" 
				style="width: 100%;background-color: transparent;line-height: 20px;">
					<tui-icon :size="24" color="#86909C" name="share"></tui-icon>
					<text class="ft86909C fs-24">分享</text>
				</button>
			</view>
			<view 
			class="rounded ftffff fs-28 py-2 text-center  flex-1 ml-2" 
			:class="demandData.whetherItCanCommunicate == 1?'bgF85241':'bgFCB6A4'" 
			@click="createSingleChatSessionFn">立即沟通</view>
		</view>
		
		<login :modal="showLogin" @hide="showLogin = false"></login>
	</view>
</template>

<script>
	import { mapGetters,mapActions } from 'vuex'
	import QQMapWX from '@/pagesA/utils/qqmap-wx-jssdk.min.js'
	import { formatNumber, distance } from '@/utils/common.js'
	export default {
		data() {
			return {
				showLogin:false,
				imgsList:[],
				id:0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 30.65984, //中心纬度
				longitude: 104.10194, //中心经度
				covers: [{
					id:999,
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
				}],
				demandId:null,//需求id
				demandData:{},
				isshare:0,//判断是否分享进入
				qqmapsdk: null,
				key: 'W4WBZ-TUD65-IDAIR-QPM36-HMFQ5-CGBZP'
			}
		},
		computed:{
			...mapGetters(['getNavHeight','getNavTop','getSafeAreaBottom','getIsLogin','currentLocation','getUser'])
		},
		onLoad(query) {
			console.log(query)
			if(query.demandId){
				this.demandId = query.demandId
				if(this.currentLocation){
					this.getDemandDatelsFn()
				} else {
					setTimeout(() => {
						this.qqmapsdk = new QQMapWX({
							key: this.key
						});
						this.getLocation()
					}, 80);
				}
			}
			this.isshare = 0
			if(query.isshare == 1){
				this.isshare = 1
			} 
		},
		onShareAppMessage(res) {
		    if (res.from === 'button') {
		      // 来自页面内转发按钮
		      console.log(res.target)
		    }
				let imageUrl = ''
				if(this.imgsList.length > 0){
					imageUrl = this.imgsList[0]
				}
		    return {
		    	title:this.demandData.title,
		    	// imageUrl: imageUrl,
		    	path: '/pagesA/demand-details/demand-details?isshare=1&demandId='+this.demandId, 
		    }
		},
		methods: {
			...mapActions(['getDemandDatels','createSingleChatSession']),
			//获取当前位置
			getLocation() {
				const _this = this;
				uni.getLocation({
					success(res) {
						console.log(res)
						_this.getAddress(res.longitude, res.latitude);
					},
					fail(err) {
						_this.getDemandDatelsFn()
						console.log(err) //获取失败则返回经纬坐标为0
					}
				})
			},
			getAddress: function(lng, lat) {
				let location = {
					lat: 0,
					lng: 0,
					cityName:"",
				}
				const _this = this;
				// #ifndef H5
				//根据经纬度获取地址信息
				this.qqmapsdk.reverseGeocoder({
					location: {
						latitude: lat,
						longitude: lng
					},
					success: res => {
						console.log(res)
						location.lat = res.result.location.lat
						location.lng = res.result.location.lng,
						location.cityName = res.result.ad_info.city,
						_this.$store.commit('setcurrentLocation',location)
						_this.tui.setStorage('currentLocation', JSON.stringify(location))
						_this.getDemandDatelsFn()
					},
					fail: res => {
						console.log(res)
					}
				});
				// #endif
			},
			async getDemandDatelsFn(){
				try{
					console.log(this.currentLocation)
					const data = {
						id:this.demandId
					}
					if(this.currentLocation){
						data.xAxis = this.currentLocation.lat
						data.yAxis = this.currentLocation.lng
					}
					let res = await this.getDemandDatels(data)
					this.demandData = res.data
					if(this.currentLocation){
						this.demandData.distance = distance(this.demandData.xaxis,this.demandData.yaxis,this.currentLocation)
					} else {
						this.demandData.distance = 0
					}
					this.imgsList = this.demandData.httpPathList
					this.latitude  = this.demandData.xaxis
					this.longitude  = this.demandData.yaxis
					this.covers[0]['latitude'] = this.demandData.xaxis
					this.covers[0]['longitude'] = this.demandData.yaxis
					this.covers[0]['callout']['content'] = this.demandData.address
				}catch(e){
					//TODO handle the exception
				}
			},
			async createSingleChatSessionFn(){ // 创建单聊会话
				try{
					if(!this.getIsLogin){
						this.showLogin = true
						return
					}
					if(!this.getUser.name || !this.getUser.wxHeadPortrait || this.getUser.name ==  '微信用户'){
						uni.showModal({
							title: '系统提示',
							content: '请完善头像和昵称后发布需求或聊天',
							confirmText:'去完善',
							success: function (res) {
								if (res.confirm) {
									uni.redirectTo({
										url:'/pagesA/myinfo/myinfo'
									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
						return
					}
					if(this.demandData.businessStatus == 4){
						this.navToChat()
					} else  {
						if(this.demandData.whetherItCanCommunicate != 1) return // 等于1才能聊天
						let res =  await this.createSingleChatSession({demandRegistrationId:this.demandId})
						if(res.code == 200){
							this.navToChat()
						}
					}
				}catch(e){
					console.log(e)
					if(e.code == 412){
						this.navToChat(e)
					} else {
						this.tui.toast(e.msg)
					}
					//TODO handle the exception
				}
			},
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
					name:this.covers[0]['callout']['content'],//地址名称
					address:this.covers[0]['callout']['content'],//地址详情
				})
			},
			navToChat(e){
				if(e && e.code){
					this.tui.setStorage('olddemandRegistrationId',e.data.demandRegistrationId)
					this.tui.setStorage('newdemandRegistrationId',this.demandId)
					this.tui.setStorage('newimSingleChatSessionId',e.data.id)
					this.tui.setStorage('newdemandTitle',this.demandData.title)
				}
				uni.navigateTo({
					url:`/pagesB/chat/chat?userID=${this.demandData.userId}`
				})
			},
			navToDaJia(){
				uni.navigateTo({
					url:`/pagesA/anti-counterfeiting/anti-counterfeiting?demandId=${this.demandId}`
				})
			},
			navToUser(){
				uni.navigateTo({
					url:'/pagesA/user/user?userId='+this.demandData.userMap.userId
				})
			},
			backFn(){
				uni.reLaunch({
					url:'/pages/main'
				})
			},
			formatNumber(price){
				return formatNumber(price)
			},
		}
	}
</script>

<style lang="scss">
.demand-content{
	height: calc(100vh - 44px - var(--status-bar-height));
}
.demand-sharebtn:after{
	border: 0;
}
</style>
