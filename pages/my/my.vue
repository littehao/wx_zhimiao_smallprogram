<template>
	<view class="my-page bgF7F8FA h-100 overflow-y">
		<view class="flex flex-column bgmylinear">
			<comheader :bgColor="false" :backBtn="false"></comheader>	
			<view class="flex flex-column rounded bgffff mx-3" style="margin-top:100rpx">
				<view class="flex flex-column px-32">
					<view class="position-relative mx-auto" style="margin-top:-32px">
						<template  v-if="getIsLogin">
							<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
							  <image v-if="wxHeadPortrait || headerImg" class="rounded-circle flex bgF2F3F5" :src="wxHeadPortrait || headerImg" mode="aspectFill"  style="width:64px;height:64px;"></image>
							  <image v-else class="rounded-circle flex bgF2F3F5" 
							  :src="`https://zm.zgzhm.com/mini/img/avatar.png`" mode="aspectFill"  style="width:64px;height:64px;"></image>
							  <!-- <image  v-if="getIsLogin" class="position-absolute" src="/static/images/level.png" mode="widthFix" style="width: 20px;height: 20px;bottom:5px;right:5px;"></image> -->
							</button>
						</template> 
						<image v-else @click="tui.href('/pagesA/login/login')" class="rounded-circle flex bgF2F3F5"
						:src="`https://zm.zgzhm.com/mini/img/avatar.png`" mode="aspectFill"  style="width:64px;height:64px;"></image>
					</view>
					<template v-if="getIsLogin">
						<view class="flex flex-column flex-1 mx-auto text-center">
							<view class="flex align-center justify-center" @tap="tui.href('/pagesA/myinfo/myinfo',true)">
								<text class="fs-38 ft000000 mb-1 mr-2">{{getUser.name || getUser.wxPhone}}</text>
								<image src="/static/images/edit_icon.png" mode="aspectFill" style="width: 14px;height: 14px;"></image>
							</view>
							<!-- <text class="ft999999 fs-28">{{getUser.wxPhone  || '-'}}</text> -->
						</view>
					</template>
					<view v-else class="flex justify-center" @tap="tui.href('login',true)">
						<text class="fs-32 f-w-b ft000000">登录/注册</text>
					</view>
				</view>
				<view class="flex align-center justify-around py-3">
					<view class="flex flex-column text-center" @tap="tui.href('/pagesA/intro/intro',true)">
						<text class="ft1D2129 fs-28">{{quantity.skillValue || 0}}</text>
						<text class="fs-28 ft000000 mb-1">等级</text>
					</view>
					<view class="flex flex-column text-center" @tap="tui.href('/pagesA/intro/intro',true)">
						<text class="ft1D2129 fs-32">{{quantity.integrityValue || 0}}</text>
						<text class="fs-28 ft000000 mb-1">诚信值</text>
					</view>
					<view class="flex flex-column text-center" @click="tui.href('/pagesA/focus-list/focus-list',true)">
						<text class="ft1D2129 fs-32">{{quantity.numberOfConcerns || 0}}</text>
						<text class="fs-28 ft000000 mb-1">关注</text>
					</view>
					<view class="flex flex-column text-center"  @click="tui.href('/pagesA/fans-list/fans-list',true)">
						<text class="ft1D2129 fs-32">{{quantity.numberOfPeopleConcerned || 0}}</text>
						<text class="fs-28 ft000000 mb-1">粉丝</text>
					</view>
				</view>
			</view>
		</view>
		<view class="flex align-center bgffff rounded mx-32 py-3 px-32  mt-2">
			<view class="flex flex-column flex-1 text-center"  @click="tui.href('/pagesA/cash/wallet',true)">
				<text class="fs-24 ft999999">可提现佣金(元)</text>
				<text class="fs-36 font-weight-bolder ft000000">{{Number(walletNum).toFixed(2)}}</text>
			</view>
			<text class="border-right" style="width: 1px;height: 50px;border-color: #eee;"></text>
			<view class="flex align-center flex-1  justify-center" @click="cashFn">
				<image src="/static/images/qian.png" mode="widthFix" style="width: 40rpx;height: 40rpx;"></image>
				<text class="fs-30 font-weight-bolder ml-1">提现</text>
			</view>
		</view>
		
		<view class="flex align-center justify-around mx-32 bgffff rounded my-2 py-3">
			<view class="flex flex-column text-center" @click="tui.href('/pagesA/mydemand/mydemand',true)">
				<image src="/static/images/my-icon1.png"  class="mx-auto mb-1" mode="widthFix" style="width: 26px;height: 26px;"></image>
				<text class="ft1D2129 fs-28">我的发布</text>
			</view>
			<view class="flex flex-column text-center" @click="tui.href('/pagesA/myaccept/myaccept',true)">
				<image src="/static/images/my-icon2.png" class="mx-auto mb-1" mode="widthFix" style="width: 26px;height: 26px;"></image>
				<text class="ft1D2129 fs-28">我的承接</text>
			</view>
			<view class="flex flex-column text-center" @click="tui.href('/pagesA/completed/completed',true)">
				<image src="/static/images/my-icon3.png" class="mx-auto mb-1" mode="widthFix" style="width: 26px;height: 26px;"></image>
				<text class="ft1D2129 fs-28">已完成</text>
			</view>
			<view class="flex flex-column text-center position-relative" @click="tui.href('/pagesA/evaluate/list',true)">
				<image src="/static/images/my-icon4.png" class="mx-auto mb-1" mode="widthFix" style="width: 26px;height: 26px;"></image>
				<text class="ft1D2129 fs-28">待评价</text>
				<tui-badge type="danger" absolute :scaleRatio="0.8" translateX="40%" top="-6rpx" v-if="quantity.userEvaluation > 0">{{quantity.userEvaluation}}</tui-badge>
			</view>
		</view>	
		
		<view class="my-nav bgffff rounded mx-32">
			
			<view class="flex align-center mx-2 py-3 border-bottom" @click="tui.href('/pagesA/web-view/web-view?url=https://mp.weixin.qq.com/s/jaRjD2viKn7ltHrDoLC-3A')">
				<image src="/static/images/my-nav-icon1.png" mode="widthFix" style="width: 30px;height: 30px;"></image>
				<text class="ft1D2129  fs-32 flex-1 ml-2">新手教程</text>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
			<view class="flex align-center mx-2 py-3 border-bottom" @click="tui.href('/pagesA/service/service')">
				<image src="/static/images/my-nav-icon2.png" mode="widthFix" style="width: 30px;height: 30px;"></image>
				<text class="ft1D2129  fs-32 flex-1 ml-2">服务声明</text>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
			<view class="flex align-center mx-2 py-3 border-bottom" @click="tui.href('/pagesA/setup/setup')">
				<image src="/static/images/my-nav-icon3.png" mode="widthFix" style="width: 30px;height: 30px;"></image>
				<text class="ft1D2129  fs-32 flex-1 ml-2">隐私设置</text>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
			<view class="flex align-center mx-2 py-3 border-bottom" @click="tui.href('/pagesA/feedback/feedback')">
				<image src="/static/images/my-nav-icon4.png" mode="widthFix" style="width: 30px;height: 30px;"></image>
				<text class="ft1D2129  fs-32 flex-1 ml-2">意见反馈</text>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
			<view class="flex align-center mx-2 py-3" @click="tui.href('/pagesA/about/about')">
				<image src="/static/images/my-nav-icon5.png" mode="widthFix" style="width: 30px;height: 30px;"></image>
				<text class="ft1D2129  fs-32 flex-1 ml-2">关于职苗</text>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
		</view>	
		<view style="height:20px"></view>
		
		<login :modal="showLogin" @hide="showLogin = false"></login>
		
		<uni-popup ref="popup" type="center" :mask-click="false">
			<view class="rounded bgffff p-3" style="width: 500rpx;">
				<view class="fs-38 text-center">提现</view>
				<view class="flex align-center border-bottom  py-2 mt-5"  style="border-color: #ddd;">
					<view class="title ft4E5969 mr-2 fs-28">金额</view>
					<input class="flex-1" v-model.trim="withdrawalAmountNum" placeholder="请输入提现金额" placeholder-class="placeholder"/>
					<text class="fs-28 ft999999">元</text>
				</view>
				<view class="w-100 px-1 border-box pt-2  mt-5 flex align-center">
					<view class="ftffff fs-28 bgc6c6c6  rounded-circle text-center py-1 w-100 mr-2" @tap="$refs.popup.close()">取消</view>
					<view class="ftffff fs-28 bgF85241 rounded-circle text-center py-1 w-100" @tap="cashSubmit">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { mapGetters,mapActions } from 'vuex'
	export default {
		data() {
			return {
				showLogin:false,
				evalTotal:0,
				walletNum:0,
				withdrawalAmountNum:'',
				card:'',
				wxHeadPortrait:'',
				quantity:{
					gradeIntegral: 0,
					numberOfConcerns: 0,
					numberOfPeopleConcerned: 0,
					skillQuantity: 0,
				}
			}
		},
		computed:{
			...mapGetters(['getIsLogin','getUser','getSafeAreaBottom']),
			headerImg(){
				if(this.getIsLogin && this.getUser){
					return this.getUser.wxHeadPortrait
				}
				return ''
			}
		},
		created() {
			if(this.getIsLogin){
				this.getUserInformationQuantityFn()
				this.getWalletFn()
				this.getWithdrawalAccountFn()
			}
		},
		methods: {
			...mapActions(['getUserInformationQuantity','uploadFileToDisk','updNameAndPortrait','getCurrentLogonInformation','getWallet','transfer','getWithdrawalAccount']),
			onChooseAvatar(e) {
				const { avatarUrl } = e.detail 
				console.log(avatarUrl)
				this.myUpload(avatarUrl)
				// this.setUserProfileFn(avatarUrl)
			},
			setUserProfileFn(avatarUrl){  //新用户设置用户信息
				let data ={
					name:this.getUser.name,
					wxHeadPortraitUrl:'https://xyg-shop01.oss-cn-hangzhou.aliyuncs.com/Test/images/2023-04-09/4415e0811728df5af2b39fdbead26f59.jpeg'
				}
				this.updNameAndPortraitFn(data)
			},
			async getWithdrawalAccountFn(){//获取用户绑定的银行卡号和姓名
				try{
					let res = await this.getWithdrawalAccount()
					this.card = res.data || ''
					console.log(res)
				}catch(e){
					console.log(e)
					//TODO handle the exception
				}
			},
			async cashSubmit(){//提现
				if(!this.withdrawalAmountNum){
					this.tui.toast('请输入提现金额')
					return
				}
				try{
					let res = await this.transfer({withdrawalAmount:Number(this.withdrawalAmountNum)})
					this.$refs.popup.close()
				}catch(e){
					this.tui.toast(e.msg)
					//TODO handle the exception
				}
			},
			async getWalletFn(){
				try{
					let res = await this.getWallet()
					this.walletNum = res.data
				}catch(e){
					//TODO handle the exception
				}
			},
			async getUserInformationQuantityFn(){ // 统计数
				try{
					let res = await this.getUserInformationQuantity()
					this.quantity = {...res.data}
				}catch(e){
					//TODO handle the exception
				}
			},
			async updNameAndPortraitFn(portraitId){ //修改头像
				try{
					let data ={
						name:this.getUser.name,
						portraitId:portraitId
					}
					let res = await this.updNameAndPortrait(data)
					this.tui.toast(res.msg)
					this.getCurrentLogonInformation()
				}catch(e){
					this.tui.toast(e.msg)
					//TODO handle the exception
				}
			},
			cashFn(){
				if(!this.getIsLogin){
					this.tui.href('login',true)
					return
				}
				if(!this.card){
					this.tui.href('/pagesA/cash/addbank')
					return
				}
				this.$refs.popup.open()
			},
			// previewImage(){
			// 	if(!this.getIsLogin){
			// 		this.tui.href('login',true)
			// 		return
			// 	}
			// 	let that = this
			// 	uni.chooseImage({
			// 		count: 1, //默认9
			// 		sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			// 		sourceType: ['album'], //从相册选择
			// 		success: function (res) {
			// 			console.log(JSON.stringify(res.tempFilePaths));
			// 			that.myUpload(res.tempFilePaths[0])
			// 		}
			// 	});
			// },
			myUpload(rsp) {
				console.log(rsp)
				this.wxHeadPortrait = rsp; //更新头像方式一
				this.uploadFileToDisk().then(url => {
					this.tui.uploadFile(url,rsp,{
						operationCode:"userHeaderImage"
					}).then(res => {
						console.log(res)
						this.updNameAndPortraitFn(res.id)
					})
				})
			}
		
		}
	}
</script>

<style lang="scss">
.my-page{
	.avatar-wrapper{
		width:64px;
		height:64px;
		background-color: transparent;
		border-radius: 100px;
		padding:0;
	}
	.sharebtn:after{
		border: 0;
	}
}
</style>
