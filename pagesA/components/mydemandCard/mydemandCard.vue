<template>
	<view class="bgffff rounded p-2 mb-2"  @click="navTo">
	    <view  class="flex align-center justify-between">
	        <text class="family fs-28 ft1D2129 flex-1 lineh44 f-w-b">{{demandRegistrationSon.title}}</text>
	        <view class="flex flex-column ml-2">
	            <text class="ftF53F3F family fs-32 f-w-b">{{formatNumber(demandRegistrationSon.demandPrice || 0)}}元</text>
	            <text class="ft86909C fs-24">{{demandRegistrationSon.paymentStatusStr}}</text>
	        </view>
	    </view>
	    <view class="ft4E5969 fs-24  family lineh40">{{demandRegistrationSon.content}}</view>
	    <view class="flex align-center mt-1 border-bottom  pb-2">
	        <view  class="flex-1 flex align-center">
	            <!-- <text class="bgF2F3F5 fs-24 family rounded px-2 lineh40 ft1D2129">签合同</text>
	            <text class="bgF2F3F5 fs-24 family rounded ml-2 rounded px-2 lineh40 ft1D2129">买保险</text> -->
	        </view>
	        <view class="flex  align-center justify-end" style="width: 400rpx;">
							<tui-icon size="28" unit="rpx"  color="#86909C" name="gps"></tui-icon>
	            <text class="ft86909C fs-24 family text-ellipsis">{{demandRegistrationSon.address}} {{item.distance || 0}}km</text>
	        </view>
	    </view>
	    <view class="flex align-center justify-between mt-2">
	        <tui-icon  color="#86909C"  size="40rpx" name="more-fill"></tui-icon>
			<view class="flex align-center">
				<!--承接人状态操作-->
				<template v-if="item.demandRegistrationSon">
					<!--承接人需求状态-->
					<view
					class="fs-28 ftF85241 border bdF85241 px-3 py-1 rounded" 
					v-if="acceptState">{{acceptState}}</view>
					
					<!--承接人操作-->
					<view
					class="fs-28 ftffff border bdF85241 px-3 py-1 bgF85241 ml-2 rounded" @tap.stop="demendHandle" v-if="acceptText">{{acceptText}}</view>
					
					<!--承接人评价-->
					<view
					class="fs-28 ftffff border bdF85241 px-3 py-1 bgF85241 ml-2 rounded" 
					v-if="item.state == 4" @tap.stop="toEvaluate">{{whetherToEvaluate}}</view>
				</template>
				<!--发布人状态操作-->
				<template v-else>
					<!--发布人需求状态-->
					<view
					class="fs-28 ftF85241 border bdF85241 px-3 py-1 rounded"
					 v-if="demandState" @tap.stop="refuseDetailsFn">{{demandState}}</view>
					 
					 <view
					 class="fs-28 ftffff border bgF85241 px-3 py-1 rounded ml-1"
					  v-if="demandRegistrationSon.businessStatus < 4" @tap.stop="$emit('cancle',item)">取消</view>
					
					<!--发布人操作-->
					<view
					class="fs-28 ftffff border bdF85241 px-3 py-1 bgF85241 ml-2 rounded" @tap.stop="demendHandle" v-if="demendText">{{demendText}}</view>
					
					<!--发布人评价-->
					<view
					class="fs-28 ftffff border bdF85241 px-3 py-1 bgF85241 ml-2 rounded" 
					v-if="demandRegistrationSon.businessStatus == 6" @tap.stop="toEvaluate">{{whetherToEvaluate}}</view>
				</template>
			</view>
	    </view>

		<!--uni-app-->
		<tui-alert :show="refuseshow" @click="refuseshow = false">
			<view>
				<view class="ft000000 fs-30 text-center pb-5">拒绝原因</view>
				<view class="fs-28 ft86909C">{{reasonForRejection}}</view>
			</view>
		</tui-alert>
	</view>
</template>

<script>
	/**
	 * 我承接的状态
	 * state
	 * 0:拒绝
	 * 1:申请中
	 * 2:进行中
	 * 3:待发布人确认完工
	 * 4:已完成
	 */
	/**
	 * 我发布的状态
	 * paymentStatus
	 * 0:未支付
	 * 1:已支付
	 * ----------------
	 * businessStatus
	 * -1:已删除， 
	 * 0:平台拒绝，
	 * 1:草稿，
	 * 2:待平台审核，
	 * 3:待承接人接单，
	 * 4:订单进行中，
	 * 5:确认完工，
	 * 6:需求完成，
	 * 7:已取消
	*/
   /**
	* 去评价状态
	* whetherToEvaluate
	* 0：未评价，
	* 1：已评价
	* */
	import {mapGetters,mapActions} from 'vuex'
	import { formatNumber } from '@/utils/common.js'
	import tuiAlert from '@/pagesA/components/tui-alert/tui-alert.vue'
	export default {
		components:{ tuiAlert },
		props:{
			item:{
				type:Object,
				default:()=>{}
			},
			hidepay:{
				type:Boolean,
				defalut:false
			}
		},
		data(){
			return{
				refuseshow:false,
				demendmodal:false,
				reasonForRejection:'',
				id:'',
				interTime:null
			}
		},
		computed:{
			demandRegistrationSon(){
				if(this.item.demandRegistration){
					this.item.whetherToEvaluate = this.item.state
					return this.item.demandRegistration
				} else if(this.item.demandRegistrationSon){
					return this.item.demandRegistrationSon
				} else {
					return this.item
				}
			},
			acceptText(){
				if(this.item.state == 2){
					return '确认完成'
				} else {
					return ''
				}
			},
			demendText(){
				if(this.demandRegistrationSon.businessStatus == 5){
					return '确认完成'
				} else if(this.demandRegistrationSon.paymentStatus == 0 && !this.hidepay){
					return '去付款'
				} else if(this.demandRegistrationSon.businessStatus < 2){
					return ''
				}else {
					return ''
				}
			},
			acceptState(){
				switch(this.item.state){
					case 0:
						return '拒绝'
					break;
					case 1:
						return '申请中'
					break;
					case 2:
						return '进行中'
					break;
					case 3:
						return '待发布人确认完工'
					break;
					case 4:
						return ''//已完成
					break;
				}
			},
			demandState(){
				switch(this.demandRegistrationSon.businessStatus ){
					case -1:
						return '已删除'
					break;
					case 0:
						return '平台拒绝'
					break;
					case 1:
						return '草稿'
					break;
					case 2:
						return '待平台审核'
					break;
					case 3:
						return '待承接人接单'//待承接人接单
					break;
					case 4:
						return '进行中'
					break;
					case 5:
						return '待确认完成'//待确认完成
					break;
					case 6:
						return '已完成'//已完成
					break;
					case 7:
						return '已取消'
					break;
				}
			},
			whetherToEvaluate(){
				switch(this.item.whetherToEvaluate){
					case 0:
						return '去评价'
					break;
					case 1:
						return '查看评价'
					break;
					default:
						return '去评价'
				}
			}
		},
		created() {
			this.demandRegistrationId = this.item.demandRegistrationId || this.demandRegistrationSon.id
			this.id = this.item.id
			this.userEvaluationId = this.item.userEvaluationId || this.demandRegistrationSon.userEvaluationId || this.item.id
			
		},
		methods:{
			...mapActions(['confirmCompletion','completionRequirements','sendPayment']),
			refuseDetailsFn(){
				if(this.demandRegistrationSon.businessStatus == 0){
					this.reasonForRejection = this.demandRegistrationSon.reasonForRejection
					this.refuseshow = true
				}
			},
			demendHandle(){
				if(this.item.state == 2){ // 承接人确认完成需求
					this.completionRequirementsFn()
				} else if(this.demandRegistrationSon.businessStatus == 5){  // 发布人确认完成需求
					this.confirmCompletionFn()
				} else if(this.demandRegistrationSon.paymentStatus == 0){ // 发布人去付款
					//
					const _this = this
					uni.showModal({
						title: '提示',
						content: `确认付款${_this.demandRegistrationSon.title}需求吗？`,
						confirmColor:'#F85241',
						success: async (res) => {
							if (res.confirm) {
								_this.sendPaymentFn()
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			async sendPaymentFn(){
				let res = await this.sendPayment({demandRegistrationId:this.id})
				let pay = res.data;
				this.requestPaymentFn(pay)
			},
			requestPaymentFn(pay){
				const _this = this
				uni.requestPayment({
					provider: 'wxpay',    //支付类型-固定值
					timeStamp: pay.timeStamp,
					nonceStr: pay.nonceStr,
					package: pay.packageValue,
					signType: pay.signType,
					paySign: pay.paySign,
					success: function (res) {
						console.log('success:' + JSON.stringify(res));
						console.log("支付成功");
						_this.queryPaymentFn()
					},
					fail: function (err) {
						console.log('fail:' + JSON.stringify(err));
						console.log("支付失败");
						if(err.errMsg.includes('cancel')){
							uni.showToast({
								icon: 'none',
								title: '取消支付'
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '支付失败'
							})
						}
					}
				});
			},
			queryPaymentFn(){
				this.queryPayment({demandRegistrationId:this.demandId}).then(res => {
					if(res.code == 200){
						clearTimeout(this.interTime)
						uni.hideLoading()
						 uni.showToast({
							icon: 'success',
							title: '支付成功'
						 })
						 this.$emit('loadData')
					}
				}).catch(e => {
					console.log(e)
					if(e.code == 420){
						 uni.showLoading({
							title:'支付中...'
						 })
						 clearTimeout(this.interTime)
						 this.interTime = setTimeout(() => {
						 	this.queryPaymentFn()
						 },2000)
					} else {
						this.tui.toast('支付失败')	 
					}
				})
			},
			completionRequirementsFn(){
				let _this = this
				uni.showModal({
					title: '提示',
					content: '确认完成该需求吗？',
					confirmColor:'#F85241',
					success: async (res) => {
						if (res.confirm) {
							try{
								let result = await _this.completionRequirements({demandRegistrationId:this.id})
								if(result.code == 200){
									_this.tui.toast(result.msg)
									_this.$emit('loadData')
								}
							}catch(e){
								_this.tui.toast(e.msg)
								//TODO handle the exception
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			confirmCompletionFn(){ // 确认完成需求
				let _this = this
				uni.showModal({
					title: '提示',
					content: '确认完成该需求吗？',
					confirmColor:'#F85241',
					success: async (res) => {
						if (res.confirm) {
							try{
								let result = await _this.confirmCompletion({demandRegistrationId:this.id})
								if(result.code == 200){
									_this.tui.toast(result.msg)
									_this.$emit('loadData')
								}
							}catch(e){
								_this.tui.toast(e.msg)
								//TODO handle the exception
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			formatNumber(price){
				return formatNumber(price)
			},
			navTo(){
				uni.navigateTo({
					url:'/pagesA/demand-details/demand-details?demandId='+ this.demandRegistrationId
				})
			},
			toEvaluate(){
				if(this.item.whetherToEvaluate == 1){
					uni.navigateTo({
						url:`/pagesA/evaluate/evaluate-details?demandId=${this.demandRegistrationId}&userEvaluationId=${this.userEvaluationId}`
					})
				} else {
					uni.navigateTo({
						url:`/pagesA/evaluate/evaluate?demandId=${this.demandRegistrationId}&userEvaluationId=${this.userEvaluationId}`
					})
				}
				
			}
		}
	}
</script>

<style>
</style>