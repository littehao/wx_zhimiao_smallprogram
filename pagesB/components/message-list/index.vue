<template>
	<scroll-view
		class="message-list-container"
		scroll-y="true"
		:scroll-into-view="scrollView"
		:refresher-enabled="true"
		@refresherrefresh="refresh"
		:scroll-top="scrollTop"
		:refresher-triggered="triggered"
	>
		<view class="py-3">
			<view class="no-message" v-if="isCompleted">没有更多啦</view>
			<view v-for="item in messageList" :key="item.id" class="t-message">
				<view v-if="conversation.type !== '@TIM#SYSTEM'" :id="item.id">
					<view class="t-message-item">
						<view v-if="item.type !== 'TIMGroupTipElem'" :class="item.flow === 'out' ? 't-self-message' : 't-recieve-message'">
							<image
								class="t-message-avatar rounded-circle"
								v-if="item.flow === 'in'"
								:src="item.avatar || 'https://sdk-web-1252463788.cos.ap-hongkong.myqcloud.com/component/TUIKit/assets/avatar_21.png'"
							></image>
							<!-- <view class="read-receipts" v-if="conversation.type === 'C2C' && item.flow === 'out'">
								<tui-icon v-if="item.isPeerRead" :size="20" name="circle-selected"></tui-icon>
							</view> -->
							<view>
								<TextMessage v-if="item.type === 'TIMTextElem'" :message="item" :isMine="item.flow === 'out'"></TextMessage>
								<CardMessage v-if="item.type === 'TIMCardElem'" :message="item" :isMine="item.flow === 'out'"></CardMessage>
								<OrderapplyMessage v-if="item.type === 'TIMOrderElem'" :message="item" :isMine="item.flow === 'out'"></OrderapplyMessage>
							</view>
							<image
								class="t-message-avatar rounded-circle"
								v-if="item.flow === 'out'"
								:src="item.avatar || 'https://sdk-web-1252463788.cos.ap-hongkong.myqcloud.com/component/TUIKit/assets/avatar_21.png'"
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
	import TipMessage from '../tip-message/index.vue'
	import TextMessage from '../text-message/index.vue'
	import CardMessage from '../card-message/index.vue'
	import OrderapplyMessage from '../orderapply-message/index.vue'
	import SystemMessage from '../system-message/index.vue'
	export default {
		components:{TipMessage,TextMessage,CardMessage,SystemMessage,OrderapplyMessage},
		props:{
			conversation:{
				type:Object,
				default:{}
			}
		},
		data(){
			return {
				isCompleted:false,
				// 当前会话
				messageList:[
					{
						id:1,
						type:'TIMTextElem',
						flow:'out',
						avatar:'',
						isPeerRead:true,
						name:'span',
						payload:{
							text:'世卫组织：中国以外新冠肺炎确诊病例共计37371例'
						}
					},
					{
						id:2,
						type:'TIMTextElem',
						flow:'in',
						avatar:'',
						isPeerRead:false,
						name:'span',
						payload:{
							text:'世卫组织：中国以外新冠肺炎确诊病例共计37371例'
						}
					},
					{
						id:3,
						type:'TIMCardElem',
						flow:'out',
						avatar:'',
						isPeerRead:false,
						name:'span',
						payload:{
							text:'世卫组织：中国以外新冠肺炎确诊病例共计37371例'
						}
					},
					{
						id:4,
						type:'TIMOrderElem',
						flow:'in',
						avatar:'',
						isPeerRead:false,
						name:'span',
						payload:{
							text:'世卫组织：中国以外新冠肺炎确诊病例共计37371例'
						}
					}
				],
				// 自己的 ID 用于区分历史消息中，哪部分是自己发出的
				scrollView: '',
				scrollTop: 0,
				triggered: true,
			}
		},
		methods: {
			refresh() {
				if (this.isCompleted) {
					this.isCompleted = true,
					this.triggered = false
					return;
				}
				setTimeout(() => {
					this.triggered = false
				}, 2000);
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