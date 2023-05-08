<script>
	import { mapGetters,mapActions } from 'vuex'
	// #ifdef  MP-WEIXIN
	import TIM from 'tim-wx-sdk';
	// import TIM from '@/pagesB/static/tim-wx-sdk.js'
	// import COS from 'cos-wx-sdk-v5';
	// #endif
	export default {
		onLaunch: function() {
			console.log('App Launch')
			let options = {
			  SDKAppID: 1400687654 // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
			};
			// #ifdef  MP-WEIXIN
			// 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
			uni.$TUIKit = TIM.create(options); // SDK 实例通常用 tim 表示
			// 设置 SDK 日志输出级别，详细分级请参见 <a href="https://web.sdk.qcloud.com/im/doc/zh-cn/SDK.html#setLogLevel">setLogLevel 接口的说明</a>
			uni.$TUIKit.setLogLevel(0); // 普通级别，日志量较多，接入时建议使用
			// #endif
			// tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用
			// #ifndef H5
			// uni.$TUIKit.registerPlugin({
			// 	'cos-wx-sdk': COS
			// });
			// #endif
			
			// #ifdef MP-WEIXIN
			wx.$TIM = uni.$TUIKit;
			uni.$TUIKitTIM = TIM;
			uni.$TUIKitEvent = TIM.EVENT;
			uni.$TUIKitVersion = TIM.VERSION;
			uni.$TUIKitTypes = TIM.TYPES; // 监听系统级事件
			uni.$TUIKit.on(uni.$TUIKitEvent.SDK_READY, this.onSDKReady);
			uni.$TUIKit.on(uni.$TUIKitEvent.SDK_NOT_READY, this.onSdkNotReady);
			// #endif
			// #ifdef MP-WEIXIN
			 // 检测新版本
			const updateManager = uni.getUpdateManager();
			updateManager.onUpdateReady(function (res) {
			  uni.showModal({
			    title: '更新提示',
			    content: '新版本已经准备好，是否重启应用？',
			    success(res) {
			      if (res.confirm) {
			        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
			        updateManager.applyUpdate();
			      }
			    }
			  });
			});
			updateManager.onUpdateFailed(function (res) {
				console.log(res)
			  // 新的版本下载失败
			});
			/**
			 * 初次加载判断网络情况
			 * 无网络状态下根据实际情况进行调整
			 */
			uni.getNetworkType({
				success(res) {
				const networkType = res.networkType
				if (networkType === 'none') {
					that.globalData.isConnected = false
					uni.showToast({
						title: '当前无网络',
						icon: 'loading',
						duration: 2000
					})
				}
				}
			});
			
			/**
			 * 监听网络状态变化
			 * 可根据业务需求进行调整
			 */
			uni.onNetworkStatusChange(function(res) {
				if (!res.isConnected) {
				that.globalData.isConnected = false
				uni.showToast({
					title: '网络已断开',
					icon: 'loading',
					duration: 2000
				})
				} else {
				that.globalData.isConnected = true
				uni.hideToast()
				}
			})
			
			// ---------------检测navbar高度
			let menuButtonObject = uni.getMenuButtonBoundingClientRect();
			console.log("小程序胶囊信息",menuButtonObject)
			uni.getSystemInfo({
				success: res => {
					let statusBarHeight = res.statusBarHeight,
					navTop = menuButtonObject.top,//胶囊按钮与顶部的距离
					navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight)*3;//导航高度
					this.$store.commit("setNavHeight", navHeight)
					this.$store.commit("setNavTop", navTop)
					this.$store.commit("setWindowHeight", res.windowHeight)
					this.$store.commit("setMenuButtonObject", menuButtonObject)
					this.$store.commit("setSafeAreaBottom", Math.abs(res.safeAreaInsets.bottom) > 0 ? Math.abs(res.safeAreaInsets.bottom): 10)
					console.log("navHeight",res);
				},
				fail(err) {
					console.log(err);
				}
			})
			
			//判断是否登录 获取用户信息
			let token = this.tui.getToken()
			let user = this.tui.getUser()
			console.log(user)
			if(token && user){
				this.verificationTokenFn(token,user) // 验证token
			}else {
				this.$store.commit('setToken',null)
				this.$store.commit('setUser',null)
			}
			//#endif
		},
		onShow: function() {
			console.log('App Show')
			// 获取本地定位信息
			let axis = this.tui.getStorage('axis')
			if(axis){
				this.$store.commit('setAxis',axis)
			} else {
				this.$store.commit('setAxis',null)
			}
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			// userInfo: userID userSig token phone
			userInfo: null,
			// 个人信息
			userProfile: null,
			isTUIKit: true,
			headerHeight: 0,
			statusBarHeight: 0,
			SDKAppID: '1400687654'
		},
		methods:{
			...mapActions(['verificationToken','getUserSig']),
			async verificationTokenFn(token,user){ // 验证token
				try{
					let res = await this.verificationToken()
					if(res.code == 200){
						this.$store.commit('setisLogin',true)
						this.$store.commit('setToken',token)
						this.$store.commit('setUser',user)
						//开发登录im
						uni.$TUIKit.login({
							userID: user.id,
							userSig: this.tui.getStorage('userSig')
						}).then((imResponse) => {
								console.log(imResponse.data,'登录成功'); // 登录成功
							  if (imResponse.data.repeatLogin === true) {
								// 标识账号已登录，本次登录操作为重复登录。v2.5.1 起支持
								console.log(imResponse.data.errorInfo);
							  }
						}).catch((imError) => {
							if(imError.code == 6206 || imError.code == 70003 || imError.code == 70001){
								this.getUserSigFn(user.id)//UserSig 过期，请重新获取有效的 UserSig 后再重新登录
							}
							console.warn('login error:', imError.code); // 登录失败的相关信息
						})
					}
				}catch(e){
					this.$store.commit('setToken',null)
					this.$store.commit('setUser',null)
					uni.removeStorageSync('zhimiao_token')
					uni.removeStorageSync('zhimiao_user')
					uni.reLaunch({
						url:'/pages/main'
					})
					//TODO handle the exception
				}
			},
			async getUserSigFn(userID){
				try{
					let res = await this.getUserSig()
					if(res.code == 200){
						this.tui.setStorage('userSig',res.data)
						console.log(userID)
						uni.$TUIKit.login({
							userID: userID,
							userSig: res.data
						}).then((imResponse) => {
							console.log(imResponse.data); // 登录成功
							  if (imResponse.data.repeatLogin === true) {
							    // 标识账号已登录，本次登录操作为重复登录。v2.5.1 起支持
							    console.log(imResponse.data.errorInfo);
							  }
						}).catch((imError) => {
							console.warn('login error:', imError); // 登录失败的相关信息
						})
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			onSDKReady({name}) {
					console.log(name,'初始化成功----------------')
				  const isSDKReady = name === uni.$TUIKitEvent.SDK_READY ? true : false
					this.$store.commit('setIsSDKReady',isSDKReady)
			},
			onSdkNotReady(){
				console.log('onSdkNotReady')
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	 @import '@/common/free.css';
	 @import '@/common/common.css';
</style>
