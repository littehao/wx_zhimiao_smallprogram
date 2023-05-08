<template>
	<scroll-view
		class="message-list-container"
		scroll-y="true"
		:scroll-into-view="scrollView"
		:refresher-enabled="enabled"
		@refresherrefresh="refresh"
		:scroll-top="scrollTop"
		:refresher-triggered="triggered"
		refresher-background="#F7F8FA"
		refresher-default-style="none"
	>
		<template #refresher>
			<view class="text-center" style="width:100%">
			  <tui-loadmore text="加载中..." :index="3" type="orange"></tui-loadmore>
			</view>
		</template>
		<view class="py-3" id="message-scroll">
			<view class="no-message fs-24 text-center ft86909C" v-if="isCompleted">~没有更多啦~</view>
			<view v-for="(item,index) in messageList" :key="index" class="t-message">
				<view v-if="item.type !== '@TIM#SYSTEM'" :id="item.ID">
					<view class="t-message-item">
						<view v-if="item.type !== 'TIMGroupTipElem'" :class="item.flow === 'out' ? 't-self-message' : 't-recieve-message'">
							<image
								class="t-message-avatar rounded-circle bgF2F3F5"
								v-if="item.flow === 'in'"
								:src="item.avatar || `https://zm.zgzhm.com/mini/img/avatar.png`"
							></image>
							<view>
								<TextMessage 
								v-if="item.type === 'TIMTextElem'" 
								:message="item" 
								:isMine="item.flow === 'out'"
								:sended="item.sended"
								>
								</TextMessage>
								<CardMessage 
								v-if="item.type === 'TIMCustomElem'" 
								:message="item" 
								:isMine="item.flow === 'out'"
								>
								</CardMessage>
								<FaceMessage 
								v-if="item.type === 'TIMFaceElem'" 
								:message="item" 
								:isMine="item.flow === 'out'">
								</FaceMessage >
								<OrderapplyMessage 
								v-if="item.type === 'TIMOrderElem'" 
								:message="item" 
								:demandId="demandId" 
								:demandData="demandData"
								:isMine="item.flow === 'out'"
								:businessStatus="businessStatus"
								@click="receiptApprovalFn"
								>
								</OrderapplyMessage>
							</view>
							<image
								class="t-message-avatar rounded-circle bgF2F3F5"
								v-if="item.flow === 'out'"
								:src="(getUser && getUser.wxHeadPortrait) || '/static/images/avatar.png'"
							></image>
						</view>
						
					</view>
				</view>
				<view v-else >
					<SystemMessage :message="item"></SystemMessage>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import { mapGetters,mapActions } from 'vuex'
	import TextMessage from '../text-message/index.vue'
	import CardMessage from '../card-message/index.vue'
	import FaceMessage from '../face-message/index.vue'
	import OrderapplyMessage from '../orderapply-message/index.vue'
	import SystemMessage from '../system-message/index.vue'
	const dbOperationType = {
		1:'im消息',
		2:'需求详情',
		3:'系统消息',
		4:'im系统通知',
		5:'承接人申请接单',
		6:'发起人邀请接单',
		7:'发起人收到申请接单',
		8:'承接人收到邀请接单',
		9: '承接人完成需求',
		10: '发起人确认需求',
		11: '微信公众号推送',
		12: '更换需求',
		13: '删除需求'
	}
	export default {
		components:{TextMessage,CardMessage,SystemMessage,OrderapplyMessage,FaceMessage},
		props:{
			conversation:{
				type:Object,
				default:{}
			},
			demandId:{
				type:String,
				default:''
			},
			sendMsgId:{
				type:String,
				default:''
			},
			businessStatus:{ // 当前需求状态
				type:Number
			},
			currentPersonRole:{//1、发起人，2、承接人
				type:Number
			},
			demandData:{
				type:Object,
				default:{}
			}
		},
		data(){
			return {
				isCompleted:false,
				enabled:true,//允许下拉
				// 当前会话
				messageList:[],
				nextReqMessageID: '',
				// 自己的 ID 用于区分历史消息中，哪部分是自己发出的
				scrollView: '',
				scrollTop: 0,
				triggered: true,
				avatar:'',//我的头像
				userID:'',//我的userID
				applyOrder:false,// 判断是否请求 申请接单
				interTime:null,
			}
		},
		computed:{
			...mapGetters(['isSDKReady','getUser']),
		},
		watch: {
			conversation: {
				handler: function(newVal) {
					if (!newVal.conversationID) return;
					this.conversation = newVal
					this.getMessageList();
				},
				immediate: true,
				deep: true
			},
			isSDKReady(val){ // 监听im初始化是否成功 获取会话
				if(val){
					this.init()
				}
			}
		},
		mounted() {
			this.isSDKReady && this.init()
		},
		destroyed() {
			clearTimeout(this.interTime)
			this.interTime = null
			// 一定要解除相关的事件绑定
			uni.$TUIKit.off(uni.$TUIKitEvent.MESSAGE_RECEIVED, this.$onMessageReceived);
		},
		methods: {
			...mapActions(['getIsThereAnyReply','receiptApproval','declineTheInvitation','sendPayment','queryPayment']),
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
						this.interTime = null
						uni.hideLoading()
						 uni.showToast({
							icon: 'success',
							title: '支付成功'
						 })
						 this.paySuccess()
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
			async paySuccess(){ // 支付成后同意
				try{
					if(this.businessStatus >= 4 || this.demandData.inviteeStatus == 1 || this.demandData.applicationStatus == 1)return //进行中不能再次点击
					let data = {
						demandRegistrationId:this.demandId,//需求承接Id
						passOrNot:this.passOrNot//是否通过（0、拒绝，1、通过）
					}
					let res = await this.receiptApproval(data)
					if(res.code == 200){
						this.tui.toast(res.msg)
						this.$emit('getDemandDatelsFn')// 重新获取需求详情 状态
					}
				}catch(e){
					console.log(e)
					if(e.code == 406){
						this.sendPaymentFn()
					} else {
						this.tui.toast(e.msg)
					}
					//TODO handle the exception
				}
			},
			async sendPaymentFn(){//发起支付
				try{
					let res = await this.sendPayment({demandRegistrationId:this.demandId})
					let pay = res.data;
					this.requestPaymentFn(pay)
				}catch(e){
					if(e.code == 418){
						this.tui.toast(e.msg)
						this.paySuccess()
					}
					//TODO handle the exception
				}
			},
			async receiptApprovalFn(passOrNot){ // 同意接单 拒绝接单
				this.passOrNot = passOrNot
				if(this.currentPersonRole == 1){
					try{
						this.paySuccess()
					}catch(e){
						console.log(e)
						//TODO handle the exception
					}
				} else {
					try{
						if(this.businessStatus >= 4 || this.demandData.inviteeStatus == 1 || this.demandData.applicationStatus == 1)return //进行中不能再次点击
						let data = {
							imSingleChatSessionId:this.sendMsgId,//需求承接Id
							state:passOrNot//是否通过（0、拒绝，1、通过）
						}
						let res = await this.declineTheInvitation(data)
						if(res.code == 200){
							this.tui.toast(res.msg)
							this.$emit('getDemandDatelsFn')// 重新获取需求详情 状态
						}
					}catch(e){
						console.log(e)
						this.tui.toast(e.msg)
						//TODO handle the exception
					}
				}
				
			},
			init(){
				uni.$TUIKit.on(uni.$TUIKitEvent.MESSAGE_RECEIVED, this.$onMessageReceived, this);
				uni.$TUIKit.on(uni.$TUIKitEvent.MESSAGE_READ_BY_PEER, this.$onMessageReadByPeer, this);
			},
			refresh() {
				console.log(this.isCompleted,this.triggered)
				if (this.isCompleted) {
					this.isCompleted = true,
					this.triggered = false
					return;
				}
				this.getMessageList();
				setTimeout(() => {
					this.triggered = false
				}, 1000);
			},
			getMessageList() { // 获取消息列表
				if (!this.isCompleted) {
					uni.$TUIKit
						.getMessageList({
							conversationID: this.conversation.conversationID,
							nextReqMessageID: this.nextReqMessageID,
							count: 20
						})
						.then(res => {
							const { messageList } = res.data; // 消息列表。
							console.log(res.data,'消息列表---------------')
							this.nextReqMessageID = res.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
							this.isCompleted = res.data.isCompleted; // 表示是否已经拉完所有消息。
							this.enabled  = this.isCompleted? false:true
							let list = [...messageList, ...this.messageList]
							list.forEach(item => {
								if(item.type == "TIMCustomElem"){
									console.log(item.payload.data)
									if(item.payload.data){
										if(typeof  item.payload.data  !=  'object' ){
											item.payload.data = JSON.parse(item.payload.data)
										}
										if(item.payload.data.dbOperationType == 4){ // 系统通知
											item.type = '@TIM#SYSTEM'
										}
										if(item.payload.data.dbOperationType == 5 || item.payload.data.dbOperationType == 6){// 5承接人点击申请接单
											item.type = 'TIMOrderElem'
											item.flow = 'out'
										}
										if(item.payload.data.dbOperationType == 7  || item.payload.data.dbOperationType == 8){ // 7发起人收到接单申请  
											item.type = 'TIMOrderElem'
										}
										if(item.payload.data.dbOperationType >= 9){ // 12 更换需求
											item.type = '@TIM#SYSTEM'
										}
									}
								}
							})
							console.log(list,'消息列表list---------------')
							this.messageList = list;
							this.$handleMessageRender(this.messageList, messageList);
							// !this.applyOrder && this.getIsThereAnyReplyFn()
						});
				}
			},
			// 消息已读更新
			$onMessageReadByPeer(event) {
				console.log(event,'已读$onMessageReadByPeer----------')
				// this.messageList = this.messageList
			},
			//设置消息已读
			setMessageRead(){
				uni.$TUIKit.setMessageRead({conversationID: this.conversation.conversationID}).then(res => {
					console.log('已读上报成功，指定 ID 的会话的 unreadCount 属性值被置为0')
				})
			},
			// 收到的消息
			$onMessageReceived(value) {
				// 若需修改消息，需将内存的消息复制一份，不能直接更改消息，防止修复内存消息，导致其他消息监听处发生消息错误
				console.log(value,'收到的消息')
				!this.applyOrder && this.getIsThereAnyReplyFn(this.sendMsgId)// 判断是否回复了消息
				const event = value;
				const list = [];
				event.data.forEach(item => {
					if (item.conversationID === this.conversation.conversationID) {
						if(item.type == "TIMCustomElem"){
							if(item.payload.data){
								console.log(typeof  item.payload.data  !=  'object')
								if(typeof  item.payload.data  !=  'object' ){
									item.payload.data = JSON.parse(item.payload.data)
								}
								if(item.payload.data.dbOperationType == 4){ // 系统通知
									item.type = '@TIM#SYSTEM'
								}
								if(item.payload.data.dbOperationType == 5 || item.payload.data.dbOperationType == 6){// 5承接人点击申请接单
									item.type = 'TIMOrderElem'
									item.flow = 'out'
								}
								if(item.payload.data.dbOperationType == 7 || item.payload.data.dbOperationType == 8){ // 7发起人收到接单申请  
									item.type = 'TIMOrderElem'
								}
								if(item.payload.data.dbOperationType >= 9){ // 12 更换需求
									item.type = '@TIM#SYSTEM'
								}
							}
						}
						list.push(Object.assign(item));
					}
				});
				this.messageList = this.messageList.concat(list);
				this.scrollToButtom();
				this.setMessageRead()
			},
			// 历史消息渲染
			$handleMessageRender(messageList) {
				if (messageList.length > 0) {
					this.messageList = messageList
					this.$nextTick(() => {
						//进入页面滚动到底部
						this.scrollTop = 9999;
					});
				}
			},
			async getIsThereAnyReplyFn(sendMsgId){ // 是否有回复消息
				try{
					let res = await this.getIsThereAnyReply({imSingleChatSessionId:sendMsgId})
					if(res.code == 200){
						this.$emit('changeApplyOrder',true)
						this.applyOrder = true
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			scrollToButtom() { //消息至底
				const query = uni.createSelectorQuery().in(this);
				let nodesRef = query.select('#message-scroll');
				nodesRef
					.boundingClientRect(res => {
						this.$nextTick(() => {
							//进入页面滚动到底部
							this.scrollTop = res.height;
						});
					})
					.exec();
			},
			
		}
	}
</script>

<style lang="scss">
	.message-list-container{
		height: 100%;
		width: 100%;
		.t-message-item {
			padding: 16rpx 0;
		}
		
		.t-recieve-message {
			display: flex;
			flex-direction: row;
			justify-items: flex-start;
			align-items: flex-end;
			width: 100vw;
		}
		
		.t-message-avatar {
			margin-left: 20rpx;
			margin-right: 12rpx;
			// border-radius: 10rpx;
			width: 80rpx;
			height: 80rpx;
		}
		
		.t-self-message {
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			align-items: flex-end;
			width: 100vw;
		}
		.read-receipts {
			line-height: 42px;
			height: 42px;
			font-size: 12px;
			color: #6e7981;
			margin-right: 10px
		}
	}
</style>