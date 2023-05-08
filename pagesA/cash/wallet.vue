<template>
	<view class="bgF7F8FA h-100vh flex flex-column">
		<view class="flex flex-column bglinear pb-5">
			<view class="position-fixed top-0 left-0 right-0 z-index1030">
				<comheader :bgColor="scrollTop > 44"  title="我的钱包"></comheader>	
			</view>
			<view :style="{'height':(getNavHeight+getNavTop)+'px'}"></view>
			<view class="flex flex-column text-center pb-5" style="margin-top: 50rpx;">
				<text class="ftffff fs-52  font-weight-bolder">{{Number(walletNum).toFixed(2)}}</text>
				<text class="fs-28 my-1" style="color: rgb(255 255 255 / 72%);">可提现佣金（元）</text>
				<view class="mx-auto" style="width: 600rpx;">
					<uni-tooltip content="平台服务费=实际支付额*6%">
					  <view class="flex align-center bgfff3 mx-auto rounded justify-center" style="width: 250rpx;padding: 5rpx 0;color: rgb(255 255 255 / 72%);">
					  	<text class="fs-24">平台服务费已扣除</text>
					  	<uni-icons type="help-filled" size="20" color="rgb(255 255 255 / 72%)"></uni-icons>
					  </view>
					</uni-tooltip>
				</view>
			</view>
		</view>
		<view class="rounded-top-lg bgffff flex-1 px-3 py-3" style="margin-top: -30px;">
			<view class="flex align-center justify-between">
				<text class="ftffff fs-28 rounded py-2 text-center font-weight-bolder" :class="(card && Number(walletNum) > 0)?'bge63728':'bgc6c6c6'" style="width: 300rpx;" @click="cashFn">提现</text>
				<text class="ftffff fs-28 rounded py-2 bgf7811b text-center font-weight-bolder" style="width: 300rpx;" @click="tui.href('/pagesA/cash/commissiondetails')">佣金明细</text>
			</view>
			<view class="flex align-center rounded py-2 px-2 mt-5" style="background-color: rgb(248 129 28 / 31%);">
				<text class="fs-26 ftf7811b">卡号：</text>
				<text class="flex-1 fs-26  ft999999">{{card || '未绑定银行卡'}}</text>
				<text class="fs-26 ftf7811b" @click="tui.href('/pagesA/cash/addbank')">{{card ? '换卡':'去绑卡'}}></text>
			</view>
			<view class="mt-5 fs-26 ft999999" style="line-height: 50rpx;">
				<view class="fs-30 ftf7811b font-weight-bolder">提现说明：</view>
				<view>1.佣金收益的金额存放在您的职苗账户余额中，可直接提现。当发生退款时，相关收益也将从您账户中扣除并退还给发布方。</view>
				<view>2.提现一般48小时内到账（您理解并同意如遇高峰，提现到账时间会延长）。</view>
				<view>3.为保证您顺利提现，提现需按照提现页面规范操作，如您未按提现要求操作或不符合第三方支付平台的要求等原因导致不能收款（如未做实名认证或提现前与平台账号解绑等），所获得的佣金将无法提现，本平台无需承担任何责任。</view>
				<view>4.按照相关法律规定，本平台需就用户所获佣金进行代扣个人所得税的，本平台有权依法代扣代缴，用户获得佣金收益额均为税后金额。</view> 
			</view>
		</view>
		
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
				scrollTop:0,
				walletNum:0,
				withdrawalAmountNum:'',
				card:''
			}
		},
		computed:{
			...mapGetters(['getNavHeight','getNavTop','getSafeAreaBottom','getUser'])
		},
		onPageScroll(e){
			this.scrollTop = e.scrollTop
		},
		created() {
			this.getWalletFn()
			this.getWithdrawalAccountFn()
		},
		onShow() {
			this.card  && this.getWithdrawalAccountFn()
		},
		methods: {
			...mapActions(['getWallet','getWithdrawalAccount','transfer']),
			cashFn(){
				if(this.card && Number(this.walletNum) > 0){
					this.$refs.popup.open()
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
			async getWithdrawalAccountFn(){//获取用户绑定的银行卡号和姓名
				try{
					let res = await this.getWithdrawalAccount()
					this.card = res.data
					console.log(res)
				}catch(e){
					console.log(e)
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style>

</style>
