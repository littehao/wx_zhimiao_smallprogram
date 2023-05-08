<template>
	<view class="flex flex-column">
		<button
		class="flex align-center justify-center ftffff py-1 rounded-circle bgF85241" 
		style="width: 100%;" 
		:open-type="checked?'getPhoneNumber':''"  
		@click="getPhoneNumberFn"
		@getphonenumber="getPhoneNumber">
			<image src="/static/images/wx.png" mode="widthFix" style="width: 25px;height: 25px;"></image>
			<text class="fs-32 ml-1">微信账号快速登录</text>
		</button>
		<view class="flex align-center justify-center mt-3">
			<uni-icons :type="checked?'checkbox':'circle'" size="20" :color="checked?'#FF4E54':'#999999'" @click="checkedFn"></uni-icons>
			<text class="ft86909C fs-24">已阅读并同意</text>
			<view class="flex align-center justify-center ft86909C fs-24">
				<text class="ftF85241 fs-24 text-ellipsis" @click="$debounce(navTo,'1')">《用户服务协议》</text>
				和
				<text class="ftF85241 fs-24 text-ellipsis" @click="$debounce(navTo,'3')">《隐私政策》</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapActions } from 'vuex'
	export default{
		props:{
			ispage:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return {
				show:false,
				code:null,//获取手机号code
				infoRes:null,
				loginCode:null,
				checked:false
			}
		},
		methods:{
			...mapActions(['authLogin','updNameAndPortrait','getCurrentLogonInformation','getUserSig','selWxPhone','bindMobileNumber']),
			checkedFn(){
				this.checked = !this.checked
			},
			getPhoneNumberFn(){
				if(!this.checked){
					uni.showToast({
						title:'请阅读并同意用户协议',
						icon:'none'
					})
					return
				}
			},
			getPhoneNumber(e){
				console.log("获取手机号码", e)
				if(e.detail.code){
					this.code = e.detail.code
					this.loginFn()	
				}
			},
			loginFn(){
				let that = this
				// this.getCurrentLogonInformationFn()
				// return
				uni.login({
					provider: 'weixin',
					success: function (res) {
					  console.log(res);
						that.loginCode = res.code
						that.$emit('hide')
						// that.getUserProfileFn()
					  that.getTokenFn(res.code)
					},
					fail:function(err) {
						console.log(err)
					}
				})
			},
			getUserProfileFn(){  //新用户获取用户信息
				let that = this
				uni.showModal({
					title: '温馨提示',
					content: '亲，授权微信登录后才能正常使用小程序功能',
					confirmColor:'#F85241',
					success(res) {
						console.log(0)
						console.log(res)
						//如果用户点击了确定按钮
						if (res.confirm) {
							if(uni.getUserProfile){
								 uni.getUserProfile({
								   desc: '获取你的昵称、头像、地区及性别',
								   success: function (infoRes) {
										console.log('用户昵称为：' + JSON.stringify(infoRes));
										that.infoRes = infoRes
										that.getTokenFn()
								   },
								   fail:function(err){
									   console.log(err);
									   uni.showToast({
									   	title: '您拒绝了请求,不能正常使用小程序',
									   	icon: 'error',
									   	duration: 2000
									   });
								   }
								 });
							}
						} else if (res.cancel) {
							//如果用户点击了取消按钮
							uni.showToast({
								title: '您拒绝了请求,不能正常使用小程序',
								icon: 'error',
								duration: 2000
							});
							return;
						}
					}
				});
			},
			async getTokenFn(){ // 微信小程序获取token
				try{
					uni.showLoading({
						title:'登录中'
					})
					let res = await this.authLogin({code:this.loginCode})
					if(res.code == 200){
						const { token } = res.data
						console.log(res.data)
						console.log(token)
						uni.setStorageSync('zhimiao_token',token)
						this.$store.commit('setToken',token)
						this.selWxPhoneFn()//查询用户手机号
					}
				}catch(err){
					uni.hideLoading()
					console.log(err)
					//TODO handle the exception
				}
			},
			async selWxPhoneFn(){ // 查询手机号
				try{
					let res = await this.selWxPhone()
					if(res.code == 200){
						// this.setUserProfileFn()
						this.getCurrentLogonInformationFn()
					}
				}catch(e){
					if(e.code == 417){ // 未绑定手机号
						this.bindMobileNumberFn()
					}
					//TODO handle the exception
				}
			},
			async bindMobileNumberFn(){ // 绑定手机号
				try{
					let res = await this.bindMobileNumber({phoneCode:this.code})
					if(res.code == 200){
						// this.setUserProfileFn()
						this.getCurrentLogonInformationFn()
					}
				}catch(e){
					this.tui.toast(e.msg)
					//TODO handle the exception
				}
			},
			setUserProfileFn(){  //新用户设置用户信息
				let that = this
				let data ={
					name:that.infoRes.userInfo.nickName,
					wxHeadPortraitUrl:that.infoRes.userInfo.avatarUrl || ''
				}
				that.updNameAndPortraitFn(data)
			},
			async updNameAndPortraitFn(data){ // 修改名称和头像
				try{
					let res = await this.updNameAndPortrait(data)
					if(res.code == 200){
						this.getCurrentLogonInformationFn()
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			async getCurrentLogonInformationFn(){ // 获取登录用户信息
				try{
					let res = await this.getCurrentLogonInformation()
					uni.hideLoading()
					console.log(res)
					if(res.code == 200){
						this.getUserSigFn(res.data.id)
						this.$store.commit('setUser',res.data)
						if(this.ispage){
							uni.navigateBack({
								delta:1
							})
						}
					} else {
						this.tui.toast(res.msg)
					}
				}catch(e){
					uni.hideLoading()
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
			navTo(type){
				uni.navigateTo({
					url:'/pagesA/agreement/agreement?type='+type
				})
			}
		}
	}
</script>

<style lang="scss">

</style>