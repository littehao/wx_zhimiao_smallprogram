<template>
	<view class="chat-page h-100vh flex flex-column bgF7F8FA position-fixed top-0 left-0 right-0 bottom-0">
		<comheader :title="toName" class="flex-shrink"></comheader>
		<view class="bgffff px-2 flex align-center flex-shrink" style="height: 64px;">
			<view class="flex flex-column" style="width: 75%;">
				<text class="ft1D2129 fs-28 text-ellipsis">{{demandData.title}}</text>
				<view class="flex align-center">
					<text class="ftF53F3F fs-32">{{formatNumber(demandData.demandPrice || 0)}}元</text>
					<text class="ft86909C fs-24">{{demandData.paymentStatusStr}}</text>
				</view>
			</view>
			<view v-if="businessStatus == 3" class="fs-24 border rounded px-2  py-1 ml-2"
				:class="applyOrderDisabled?'ftF85241 bdF85241':'bdFCB6A4 ftFCB6A4'" @click="applyOrder">
				{{conversationalistUserRolel == 1?'邀请接单':'申请接单'}}</view>
			<view v-if="businessStatus == 4" class="fs-24 border rounded px-2  py-1 ml-2 bdFCB6A4 ftFCB6A4">进行中</view>
		</view>
		<view class="flex-1 messageList overflow-y">
			<messageList ref="messageList" 
				:conversation="conversation" 
				:sendMsgId="sendMsgId" 
				:demandId="demandId"
				:demandData="demandData"
				:currentPersonRole="conversationalistUserRolel"
				:businessStatus="businessStatus" @changeApplyOrder="changeApplyOrder"
				@getDemandDatelsFn="getDemandDatelsFn">
			</messageList>
		</view>
		<view v-if="emojiShow" class="position-fixed top-0 left-0 right-0 bottom-0" @click.stop="handleClose"></view>
		<view class="message-input position-relative z-index1030">
			<message-input ref="messageInput" :conversation="conversation" :demandId="demandId" :sendmsgId="sendMsgId"
				@sendMessage="sendMessage" @emoji="emojiShowFn" />
		</view>
		<view :style="{height: getSafeAreaBottom + 'px'}"></view>
		<!--更换需求弹窗-->
		<tui-modal :show="changeDemandModal" custom padding="0">
			<view class="flex flex-column pt-5">
				<view class="text-center px-3 font-weight-bolder mb-3">你已与此需求方沟通过，是否切换新需求继续沟通？</view>
				<view class="flex align-start justify-center fs-32 ft1D2129 p-3">
					<text style="min-width: 100rpx;" class="flex text-ellipsis ft86909C">新需求:</text>
					<text class="ftF85241 text-center text-ellipsis2">{{newdemandTitle}}</text>
				</view>
				<view class="ft86909C text-center mb-4">注: 更换后将通知需求方</view>
				<view class="flex align-center border-top" style="height: 56px;">
					<view class="flex align-center justify-center ft000000 fs-28 flex-1 h-100"
						@click="changeDemandModal = false">取消</view>
					<view class="flex align-center justify-center ftF85241 fs-28 border-left flex-1 h-100"
						@tap="replacementRequirementsFn">切换新需求</view>
				</view>
			</view>
		</tui-modal>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	import {
		formatNumber
	} from '@/utils/common.js'
	import messageInput from '../components/message-input/message-input.vue'
	import messageList from '../components/message-list/index.vue'
	export default {
		components: {
			messageInput,
			messageList
		},
		data() {
			return {
				emojiShow: false, //是否显示表情
				conversation: {},
				conversationID: '',
				sendMsgId: '', //平台发送消息id
				demandId: '',
				userId: '',
				toName: '',
				demandData: {},
				businessStatus: 3, // 等待接单中 4 进行中
				conversationalistUserRolel: 1, //会话人角色（1、发布人，2、承接人）
				applyOrderDisabled: false, //申请接单可点
				changeDemandModal: false,
				imSingleChatSessionId: null, //平台会话id
				olddemandRegistrationId: null,
				newdemandRegistrationId: null,
				newimSingleChatSessionId: null,
				newdemandTitle: ''
			}
		},
		computed: {
			...mapGetters(['isSDKReady','getSafeAreaBottom']),
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad(options) {
			// conversationID: C2C、 GROUP
			// logger.log(` TUI-chat | onLoad | conversationID: ${options.conversationID}`);
			console.log(options)
			const {
				userID
			} = options;
			const olddemandRegistrationId = this.tui.getStorage('olddemandRegistrationId')
			const newdemandRegistrationId = this.tui.getStorage('newdemandRegistrationId')
			const imSingleChatSessionId = this.tui.getStorage('newimSingleChatSessionId')
			const newdemandTitle = this.tui.getStorage('newdemandTitle')
			console.log('---------olddemandRegistrationId',olddemandRegistrationId)
			console.log('---------newdemandRegistrationId',newdemandRegistrationId)
			console.log('---------imSingleChatSessionId',imSingleChatSessionId)
			if (olddemandRegistrationId && newdemandRegistrationId && imSingleChatSessionId) { //用户判断是否是更换需求
				this.olddemandRegistrationId = olddemandRegistrationId
				this.newdemandRegistrationId = newdemandRegistrationId
				this.newimSingleChatSessionId = imSingleChatSessionId
				this.newdemandTitle = newdemandTitle
				uni.removeStorageSync('olddemandRegistrationId')
				uni.removeStorageSync('newdemandRegistrationId')
				uni.removeStorageSync('newimSingleChatSessionId')
				uni.removeStorageSync('newdemandTitle')
				this.changeDemandModal = true
			}
			this.conversationID = 'C2C' + userID // 会话ID
			this.userId = userID // 需求ID
			this.conversationID && this.selectByPrimaryKeyFn()
			this.isSDKReady && this.getConversationProfileFn()
		},
		watch: {
			isSDKReady(val) { // 监听im初始化是否成功 获取会话
				if (val) {
					console.log('-----------isSDKReady')
					this.getConversationProfileFn()
				}
			}
		},
		destroyed() {
			clearTimeout(this.interTime)
			this.interTime = null
		},
		methods: {
			...mapActions(['getDemandDatels', 'selectByPrimaryKey', 'getIsThereAnyReply', 'requestReceipt',
				'replacementRequirements', 'invitationToReceiveOrders','sendPayment','queryPayment'
			]),
			async getDemandDatelsFn() { // 获取需求详情
				try {
					let res = await this.getDemandDatels({
						id: this.demandId,
						undertakingUserId:this.userId
					})
					this.demandData = res.data
					this.businessStatus = this.demandData.businessStatus
				} catch (e) {
					this.tui.toast(e.msg)
					//TODO handle the exception
				}
			},
			async selectByPrimaryKeyFn() { // 用用户id 获取需求id
				try {
					let res = await this.selectByPrimaryKey({
						userId: this.userId
					})
					if (res.code == 200) {
						this.conversationalistUserRolel = res.data.conversationalistUserRolel
						this.imSingleChatSessionId = res.data.id
						this.demandId = res.data.demandRegistrationId
						this.sendMsgId = res.data.id
						this.$nextTick(() => {
							this.$refs.messageList && this.$refs.messageList.getIsThereAnyReplyFn(res.data.id)
						})
						this.getDemandDatelsFn()
					}
				} catch (e) {
					this.tui.toast(e.msg)
					console.log(e)
					//TODO handle the exception
				}
			},
			changeApplyOrder() { // 申请接单是否可操作
				this.applyOrderDisabled = true
			},
			getConversationProfileFn() { // 获取会话
				console.log(this.conversationID)
				uni.$TUIKit
					.setMessageRead({
						conversationID: this.conversationID
					})
					.then((res) => {
						console.log(res)
					}).catch(err => {
						console.log(err)
					});
				console.log(this.conversationID)
				uni.$TUIKit.getConversationProfile(this.conversationID).then(res => {
					const {
						conversation
					} = res.data;
					console.log(conversation, '======================')
					this.toName = conversation.userProfile.nick
					this.conversation = conversation;
					// this.conversationName = this.getConversationName(conversation)
				}).catch(err => {
					console.log(err)
				});
			},
			getConversationName(conversation) { // 获取会话名称
				if (conversation.type === '@TIM#SYSTEM') {
					this.setData({
						showChat: false
					});
					return '系统通知';
				}

				if (conversation.type === 'C2C') {
					return conversation.remark || conversation.userProfile.nick || conversation.userProfile.userID;
				}
			},
			sendMessage(event) {
				// 将自己发送的消息写进消息列表里面
				this.$refs.messageList.updateMessageList(event.detail.message);
			},
			async applyOrder() {
				if (this.conversationalistUserRolel == 1) { // 点击邀请接单
					try {
						if (!this.applyOrderDisabled) {
							this.tui.toast('需对方回复后才可以邀请接单')
							return;
						}
						let res = await this.invitationToReceiveOrders({
							imSingleChatSessionId: this.imSingleChatSessionId
						})
						if (res.code == 200) {
							this.tui.toast(res.msg)
							this.getDemandDatelsFn()
						}
					} catch (e) {
						console.log(e)
						if(e.code == 406){
							this.sendPaymentFn()
						} else {
							this.tui.toast(e.msg)
						}
						//TODO handle the exception
					}
				} else {
					try { // 点击申请接单
						if (!this.applyOrderDisabled) {
							this.tui.toast('需求方回复后才可以申请接单')
							return;
						}
						let res = await this.requestReceipt({
							demandRegistrationId: this.demandId
						})
						if (res.code == 200) {
							this.tui.toast(res.msg)
							this.getDemandDatelsFn()
						}
					} catch (e) {
						console.log(e)
						this.tui.toast(e.msg)
						//TODO handle the exception
					}
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
						 //再次点击邀请接单
						 this.applyOrder()
						 this.getDemandDatelsFn()
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
			async replacementRequirementsFn() { //更换新需求
				try {
					let data = {
						demandRegistrationId: this.newdemandRegistrationId,
						imSingleChatSessionId: this.newimSingleChatSessionId
					}
					let res = await this.replacementRequirements(data)
					if (res.code == 200) {
						this.changeDemandModal = false
						this.tui.toast(res.msg)
						this.selectByPrimaryKeyFn()
					}
				} catch (e) {
					console.log(e)
					this.tui.toast(e.msg)
					//TODO handle the exception
				}
			},
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			scrollFn(mescroll) {
				this.scrollTop = mescroll.scrollTop
			},
			downCallback() {
				setTimeout(() => {
					this.mescroll.resetUpScroll();
				}, 600);
			},
			upCallback(mescroll) { //上拉加载
				setTimeout(() => {
					this.mescroll.endSuccess([], true);
				}, 600);
			},
			handleClose() {
				this.$refs.messageInput.handleClose()
			},
			emojiShowFn(data) {
				this.emojiShow = data
			},
			formatNumber(price) {
				return formatNumber(price)
			},
		}
	}
</script>

<style lang="scss">
	.messageList {
		// max-height: calc(100vh - 44px - 64px - 48px - var(--status-bar-height));
	}
</style>
