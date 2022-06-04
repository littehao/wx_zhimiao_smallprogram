<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef MP-WEIXIN
			uni.login({
			  provider: 'weixin',
			  success: function (loginRes) {
			    console.log(loginRes);
				 // if(uni.getUserProfile){
					//  uni.getUserProfile({
					//    desc: '获取用户信息',
					//    success: function (infoRes) {
					//  	console.log('用户昵称为：' + JSON.stringify(infoRes));
					//    },
					//    fail:function(err){
					// 	   console.log(err);
					//    }
					//  });
				 // }
			  }
			});
			
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
					this.$store.commit("setSafeAreaBottom", Math.abs(res.safeAreaInsets.bottom))
					console.log("navHeight",res);
				},
				fail(err) {
					console.log(err);
				}
			})
			//#endif
		},
		onShow: function() {
			console.log('App Show')
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	 @import '@/common/free.css';
	 @import '@/common/common.css';
</style>
