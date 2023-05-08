<template>
	<view class="notice-page h-100vh flex flex-column bgF7F8FA">
		<comheader title="通知消息"></comheader>	
		<view class="msg-scroll">
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
				<view class="py-3 px-32" id="message-scroll">
					<view class="no-message fs-24 text-center ft86909C" v-if="isCompleted">~没有更多啦~</view>
					<block v-for="item in messageList" :key="item.ID">
						<template v-if="item.type == 'TIMTextElem'">
							<view class="ft86909C fs-24 text-center py-1">{{transTimeFn(item.time)}}</view>
							<view class="msg-item flex flex-column rounded bgffff p-2 mb-2" @tap="navTo(`${item.payload.jumpUrl || ''}`)">
								<text class="ft1D2129 fs-28">系统消息</text>
								<text class="ft86909C fs-28">{{item.payload.text}}</text>
							</view>
						</template>
						<template v-if="item.type == 'TIMCustomElem'">
							<view class="ft86909C fs-24 text-center py-1">{{transTimeFn(item.time)}}</view>
							<template v-if="item.payload.data">
								<view class="msg-item flex flex-column rounded bgffff p-2 mb-2" @click="navTo(`${item.payload.data.jumpUrl}`)">
									<text class="ft1D2129 fs-28">{{item.payload.data.dbTitle}}</text>
									<text class="ft86909C fs-24 lineh44">{{item.payload.data.mpsContent}}</text>
									<image v-if="item.payload.data.httpPath" :src="item.payload.data.httpPath" mode="widthFix" style="width: 100%;height: 100%;"></image>
								</view>
							</template>
							<template v-else>
								<view class="msg-item flex flex-column rounded bgffff p-2 mb-2">
									<text class="ft1D2129 fs-28">.</text>
								</view>
							</template>
						</template>
					</block>
				
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { transTime } from '@/utils/common.js'
	export default {
		data() {
			return {
				conversationID:'',
				nextReqMessageID:'',
				isCompleted:false,
				enabled:true,//允许下拉
				scrollView: '',
				scrollTop: 0,
				triggered: true,
				messageList:[
					{
						type:'TIMTextElem',
						time:new Date().getTime()/1000,
						payload:{
							text:'新手指南',
							jumpUrl:'https://mp.weixin.qq.com/s/jaRjD2viKn7ltHrDoLC-3A'
						}
					}
				]
			}
		},
		computed:{
			...mapGetters(['isSDKReady']),
		},
		watch: {
			isSDKReady(val){ // 监听im初始化是否成功 获取会话
				if(val){
					this.getConversationProfileFn()
				}
			}
		},
		onLoad(options) {
			const { conversationID } = options;
			if(conversationID){
				this.conversationID = conversationID // 会话ID
				this.isSDKReady && this.getConversationProfileFn()
			}
			console.log(this.messageList)
		},
		methods: {
			getConversationProfileFn(){ // 获取会话
				console.log(this.conversationID)
				uni.$TUIKit
					.setMessageRead({
						conversationID:this.conversationID
					})
					.then((res) => {
						console.log(res)
					}).catch(err => {
						console.log(res)
					});
				console.log(this.conversationID)
				uni.$TUIKit.getConversationProfile(this.conversationID).then(res => {
					const { conversation } = res.data;
					this.getMessageList()
					// this.conversationName = this.getConversationName(conversation)
				}).catch(err => {
					console.log(err)
				});
			},
			getMessageList() { // 获取消息列表
				uni.$TUIKit
				.getMessageList({
					conversationID: this.conversationID,
					nextReqMessageID: this.nextReqMessageID,
					count: 15
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
							if(item.payload.data){
								if(item.payload.data.dbOperationType){
									item.payload.data = item.payload.data
								} else {
									item.payload.data = JSON.parse(item.payload.data)
								}
								
							}
						}
					})
					this.messageList = list
					setTimeout(()=>{
						this.scrollToButtom();
					},500)
					
				});
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
			scrollToButtom() { //消息至底
				const query = uni.createSelectorQuery().in(this);
				let nodesRef = query.select('#message-scroll');
				
				nodesRef
					.boundingClientRect(res => {
						console.log(res)
						this.$nextTick(() => {
							//进入页面滚动到底部
							this.scrollTop = res.height;
						});
					})
					.exec();
			},
			navTo(url){
				if(!url)return
				this.tui.href(`/pagesA/web-view/web-view?url=${url}`)
			},
			transTimeFn(times){
				return transTime(times,'mm-dd hh:mm:ss')
			}
		}
	}
</script>

<style lang="scss">
.msg-scroll{
	height: calc(100vh - 44px - var(--status-bar-height));
	.message-list-container{
		height: 100%;
	}
}
</style>
