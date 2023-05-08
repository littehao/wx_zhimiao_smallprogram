<template>
	<view class="bgF7F8FA h-100vh main-page">
		<view class="main-content position-relative" :style="{height:'calc(100vh - 50px - ' +getSafeAreaBottom+ 'px)'}">
			<indexPage v-if="activeIndex == 0" ref="indexPage"></indexPage>
			<releasePage v-if="activeIndex == 1" @follow="isfollowFn"></releasePage>
			<msgPage v-if="activeIndex == 2"></msgPage>
			<myPage v-if="activeIndex == 3"></myPage>
		</view>
		
		<view class="position-fixed left-0 right-0 bottom-0 boxsizing border-top bgffff" style="z-index: 99;" 
			:style="{height: 50 + getSafeAreaBottom + 'px'}">
			<view class="flex align-center mian-tab  nav-bg">
				<view class="flex flex-1 flex-column position-relative" @click="changeTab(0)"
					:class="{homeactive:activeIndex == 0}">
					<text class="topcircle" v-if="activeIndex == 0"></text>
					<view class="flex flex-column justify-center text-center position-relative bgffff pt-1">
						<text class="tab_icon home mx-auto"></text>
						<text class="fs-24 ft999999 tab-text">首页</text>
					</view>
				</view>
				<view class="flex flex-1 flex-column position-relative" @click="changeTab(1)"
					:class="{homeactive:activeIndex == 1}">
					<text class="topcircle" v-if="activeIndex == 1"></text>
					<view class="flex flex-column justify-center text-center position-relative bgffff pt-1">
						<text class="tab_icon release  mx-auto"></text>
						<text class="fs-24 ft999999 tab-text">发布</text>
					</view>
				</view>
				<view class="flex flex-1 flex-column position-relative" @click="changeTab(2)"
					:class="{homeactive:activeIndex == 2}">
					<text class="topcircle" v-if="activeIndex == 2"></text>
					<view class="flex flex-column justify-center text-center position-relative bgffff pt-1">
						<text class="tab_icon msg mx-auto"></text>
						<text class="fs-24 ft999999  tab-text">消息</text>
						<text
						v-if="unreadNum > 0  && activeIndex != 2"
						class="bgF85241 ftffff fs-24 rounded-circle text-center position-absolute top-0 px-1" 
						style="left:52%;padding-top:2rpx;padding-bottom: 2rpx;">{{unreadNum}}</text>
					</view>
				</view>
				<view class="flex flex-1 flex-column position-relative" @click="changeTab(3)"
					:class="{homeactive:activeIndex == 3}">
					<text class="topcircle" v-if="activeIndex == 3"></text>
					<view class="flex flex-column justify-center text-center position-relative bgffff pt-1">
						<text class="tab_icon my mx-auto"></text>
						<text class="fs-24 ft999999  tab-text">我的</text>
					</view>
				</view>
			</view>
			<view :style="{height: getSafeAreaBottom+'px'}" class="bgffff position-relative" style="z-index: 99;"></view>
		</view>

		<view 
		v-if="showFollow"
		class="position-fixed left-0 right-0  flex align-center justify-between py-2 px-2 mx-3 rounded-circle" 
		style="background-color: rgba(0, 0, 0, 0.8);z-index: 100;"
		:style="{bottom:(getSafeAreaBottom + 60) + 'px'}"
		>
			<view class="flex align-center">
				<uni-icons type="clear" size="20" color="#999" @click="showFollow = false"></uni-icons>
				<text class="fs-24 ftffffff ml-1">关注公众号，实时接收消息</text>
			</view>
			<text class="fs-24 ftffffff bgF85241 rounded-circle py-1 px-2" @click="toFollow">去关注</text>
		</view>
	</view>
</template>

<script>
	import QQMapWX from '@/pagesA/utils/qqmap-wx-jssdk.min.js'
	import { mapGetters,mapActions } from 'vuex'
	import indexPage from './index/index.vue'
	import msgPage from './msg/msg.vue'
	import releasePage from './release/release.vue'
	import myPage from './my/my.vue'
	export default {
		components:{
			indexPage,
			msgPage,
			releasePage,
			myPage
		},
		data() {
			return {
				activeIndex:0,
				showFollow:true,
				conversationList:[],
				key: 'W4WBZ-TUD65-IDAIR-QPM36-HMFQ5-CGBZP',
				qqmapsdk: null,
			}
		},
		onLoad(query) {
			setTimeout(() => {
				this.qqmapsdk = new QQMapWX({
					key: this.key
				});
				this.getLocation()
			}, 80);
			// #ifdef MP-WEIXIN
			uni.showShareMenu({
				withShareTicket:true,
				menus:["shareAppMessage","shareTimeline"],
				title:'理想生活，自由职在',
				path:'/pages/main'
			})
			// #endif
			if(query.form && query.form == 'details'){
				this.activeIndex = 3
			}
		},
		onShareAppMessage(res) {
				console.log(res)
		    if (res.from === 'button') {
		      // 来自页面内转发按钮
		      console.log(res.target)
		    }
				const target = res.target.dataset
				if(target.path){
					return {
						title:target.title,
						imageUrl: 'https://zm.zgzhm.com/mini/img/fmina.jpg',
						path: target.path,
					}
				}
		    return {
		    	title:'理想生活，自由职在',
		    	imageUrl: 'https://zm.zgzhm.com/mini/img/fmina.jpg',
		    	path: '/pages/main', 
		    }
		},
		onShareTimeline(){
			return {
					title: '理想生活，自由职在',
					type: 0,
					summary: "",
			}
		},
		mounted() {
			this.isfollowFn()
		},
		computed:{
			...mapGetters(['getSafeAreaBottom','unreadNum','getUser','isSDKReady'])
		},
		watch:{
			isSDKReady(val){ // 监听im初始化是否成功 获取会话
				if(val){
					this.getConversationList()
				}
			},
			getUser(val){
				if(val){
					this.isfollowFn()
				}
			}
		},
		onShow() {
			if(this.isSDKReady){
				this.getConversationList()
			}
			this.$refs.indexPage && this.$refs.indexPage.loadData()
		},
		created() {
			if(this.tui.getToken()){
				this.getCurrentLogonInformationFn()
			}
		},
		methods: {
			...mapActions(['getCurrentLogonInformation']),
			isfollowFn(){
				this.showFollow = this.getUser && this.getUser.whetherToPayAttention == 1? false : true
			},
			//获取当前位置
			getLocation() {
				const _this = this;
				uni.getLocation({
					success(res) {
						console.log(res)
						_this.getAddress(res.longitude, res.latitude);
					},
					fail(err) {
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
				// #ifdef H5
				let url =
					`https://apis.map.qq.com/ws/geocoder/v1/?location=${lat + ',' + lng}&key=${this.key}&get_poi=0&callbackName=QQmap&output=jsonp&coord_type=5`;
				this.tui.tuiJsonp(
					url,
					res => {
						if (res.status === 0) {
							location.lat = res.result.location.lat
							location.lng = res.result.location.lng,
							location.cityName = res.result.ad_info.city,
							_this.$store.commit('setcurrentLocation',location)
							_this.tui.setStorage('currentLocation', JSON.stringify(location))
						}
					},
					'QQmap'
				);
				// #endif
			
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
					},
					fail: res => {
						console.log(res)
					}
				});
				// #endif
			},
			async getCurrentLogonInformationFn(){ // 获取登录用户信息
				try{
					let res = await this.getCurrentLogonInformation()
					console.log(res)
					if(res.code == 200){
						this.$store.commit('setUser',res.data)
					} else {
						this.tui.toast(res.msg)
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			getConversationList() { //  获取会话列表
				uni.$TUIKit.on(uni.$TUIKitEvent.CONVERSATION_LIST_UPDATED, this.onConversationListUpdated); // 监听会话更新
				uni.$TUIKit.getConversationList().then(imResponse => {  
					console.log(imResponse)
					const converList = imResponse.data.conversationList
					this.conversationList = converList.filter(item => item.conversationID != "C2Cadministrator")
					let num = 0;
					this.conversationList.forEach(item => {
						num += item.unreadCount
					})
					this.$store.commit('setUnreadNum',num)
				}).catch(()=>{
					
				});
			},
			onConversationListUpdated(event) { // 更新会话
				// console.log(event,'更新会话')
				this.conversationList = event.data
			},
			changeTab(index){
				if(index == 1 || index == 2){
					if(this.getUser && (!this.getUser.name || !this.getUser.wxHeadPortrait || this.getUser.name ==  '微信用户')){
						uni.showModal({
							title: '系统提示',
							content: '请完善头像和昵称后发布需求或聊天',
							confirmText:'去完善',
							success: function (res) {
								if (res.confirm) {
									uni.navigateTo({
										url:'/pagesA/myinfo/myinfo'
									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					} else {
						this.activeIndex = index
					}
				} else {
					this.activeIndex = index
				}
				if(this.tui.getToken()){
					this.getCurrentLogonInformationFn()
				}
			},
			toFollow(){
				uni.navigateTo({
					url:'/pagesB/webview/webview'
				})
			}
		}
	}
</script>

<style lang="scss">
.main-page{
	.main-content{
		height: calc(100vh - 50px);
	}
	.tab_icon {
		width: 50rpx;
		height: 50rpx;
		background-size: 48rpx;
		background-repeat: no-repeat;
		background-position: center;
	}
	.home {
		background-image: url('/static/images/home-off.png');
	}
	.release {
		background-image: url('/static/images/release-off.png');
	}
	.msg{
		background-image: url('/static/images/msg-off.png');
	}
	.my {
		background-image: url('/static/images/my-off.png');
	}
	.homeactive .tab_icon{
		width:80rpx;
		height: 80rpx;
		border-radius: 100rpx;
		margin-top:-30rpx;
	}
	.homeactive .home {
		background-image: url('/static/images/home-on.png');
		background-size: 85rpx;
	}
	.homeactive .release {
		background-image: url('/static/images/release-on.png');
		background-size: 80rpx;
	}
	.homeactive .msg {
		background-image: url('/static/images/msg-on.png');
		background-size: 80rpx;
	}
	.homeactive .my {
		background-image: url('/static/images/my-on.png');
		background-size: 80rpx;
	}
	.homeactive .tab-text{
		color:#e64340
	}
}

</style>
