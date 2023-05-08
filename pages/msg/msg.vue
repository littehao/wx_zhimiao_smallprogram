<template>
	<view class="msg-page h-100vh flex flex-column bgF7F8FA">
		<comheader :backBtn="false" title="消息"></comheader>	
		<template v-if="getIsLogin">
			<view class="flex align-center  justify-between border-bottom bgffff">
				<tui-tabs unlined :width="220" :tabs="tabs" :padding="0" 
				sliderBgColor="#F85241" selectedColor="#F85241" color="#4E5969" itemWidth="33%" 
				:currentTab="currentTab" @change="changeTab">
				</tui-tabs>
				<view class="fs-24 ft86909C flex align-center pr-3" @tap="clearMsgModal = true">
					<image class="mr-1" src="/static/images/clearmsg.png" mode="widthFix" style="width: 16px;height: 16px;"></image>清除未读
				</view>
			</view>
			<view class="flex-1 msg-scroll">
				<mescroll-uni ref="mescrollRef" :fixed="false" @init="mescrollInit" @down="downCallback" @up="upCallback"
					:down="downOption" :up="upOption" @scroll="scrollFn" >
					<template v-if="currentTab == 0">
						<!--通知消息-->
						<template v-if="systemMsg">
							<msg 
							:topNotice="true" 
							:forbid="true" 
							@click="navToNotice" 
							:msgTime="new Date().getTime()/1000"
							:msgContent="systemMsg.lastMessage && systemMsg.lastMessage.payload.description || '系统消息'"></msg>
							<view class="mb-3"></view>
						</template>
					</template>
					
					<!--会话消息-->
					<template v-if="msgList.length > 0">
						<block v-for="item in msgList" :key="item.conversationID">
							<template v-if="item.conversationID != 'C2Cadministrator'">
								<msg
								:msgTitle="item.userProfile && item.userProfile.nick" 
								:top="item.isPinned" 
								:msgContent="item.lastMessage && tranMessage(item.lastMessage)" 
								:msgNum="item.unreadCount" 
								:conversationID="item.conversationID"
								:isPinned="item.isPinned"
								:avatar="item.userProfile && item.userProfile.avatar"
								:msgTime="item.lastMessage.lastTime"
								@customClick="customClick"
								@click="navToChat(item)">
								</msg>
							</template>
						</block>
					</template>
					<template v-if="currentTab != 0 && msgList.length == 0 && systemMsg">
						<tui-no-data :fixed="false" :imgUrl="`https://zm.zgzhm.com/mini/img/img_nodata.png`" :marginBottom="0" :imgWidth="300" :imgHeight="300">
							<text class="fs-28">暂无数据</text>
						</tui-no-data>
					</template>
					<template v-if="msgList.length == 0 && !systemMsg">
						<tui-no-data :fixed="false" :imgUrl="`https://zm.zgzhm.com/mini/img/img_nodata.png`" :marginBottom="0" :imgWidth="300" :imgHeight="300">
							<text class="fs-28">暂无数据</text>
						</tui-no-data>
					</template>
				</mescroll-uni>
			</view>
		</template>
		<template v-else>
			<tui-no-data :imgUrl="`https://zm.zgzhm.com/mini/img/img_nodata.png`" btnText="去登录" backgroundColor="#F85241" :marginBottom="0" :imgWidth="300" :imgHeight="300" @click="showLogin = true">
				<text class="fs-28">登录后查看信息</text>
			</tui-no-data>
		</template>
		<!--删除会话-->
		<tui-modal
			:show="deleteConversationModal"  
			custom
			padding="0"
		>
			<view class="flex flex-column">
				<view class="flex justify-center align-center fs-32 ft000000" style="height: 60px;">确认删除该会话吗？</view>
				<view class="fs-28 ft86909C text-center pb-5">删除会话后将会清空聊天记录</view>
				<view class="flex align-center border-top" style="height: 56px;">
					<view class="flex align-center justify-center ft000000 fs-28 flex-1 h-100" @click="deleteConversationModal = false">取消</view>
					<view class="flex align-center justify-center ftF85241 fs-28 border-left flex-1 h-100"  @click="deleteConversationFn">确定</view>
				</view>
			</view>
		</tui-modal>
		
		<!--清空搜索历史-->
		<tui-modal 
			:show="clearMsgModal"  
			custom
			padding="0"
		>
			<view class="flex flex-column">
				<view class="flex justify-center align-center fs-32 ft000000" style="height: 88px;">确认清空未读消息吗？</view>
				<view class="flex align-center border-top" style="height: 56px;">
					<view class="flex align-center justify-center ft000000 fs-28 flex-1 h-100" @click="clearMsgModal = false">取消</view>
					<view class="flex align-center justify-center ftF85241 fs-28 border-left flex-1 h-100"  @click="comfirmFn">确定</view>
				</view>
			</view>
		</tui-modal>
		
		<login :modal="showLogin" @hide="showLogin = false"></login>
	</view>
</template>

<script>
	import { mapGetters,mapActions } from 'vuex'
	export default {
		data() {
			return {
				clearMsgModal:false,
				showLogin:false,
				currentTab:0,
				msgType:1,
				tabs:[
					{name:'全部'},
					{name:'打招呼'},
					{name:'沟通中'}
				],
				mescroll: null,
				upOption: {
					onScroll: true,
					textNoMore: '',
					auto: false,
					noMoreSize: 5,
					page: {
						num: 0,
						size: 10 // 每页数据的数量,默认10
					},
					empty: {
						use: false
					},
					textLoading: '加载中...',
					toTop: {
						safearea: true,
						bottom: "15%"
					}
				},
				downOption: {
					auto: false
				},
				conversationList:[],
				msgList:[],
				unreadNum:0,//未读消息数量
				deleteConversationModal:false,//删除会话弹窗
				systemMsg:null,//通知消息
				
			}
		},
		computed:{
			...mapGetters(['getNavHeight','getNavTop','getIsLogin','isSDKReady'])
		},
		watch: {
			isSDKReady(val){ // 监听im初始化是否成功 获取会话
				if(val){
					this.getConversationList()
				}
			}
		},
		created() {
			this.isSDKReady && this.getConversationList()
		},
		methods: {
			...mapActions(['selCommunicationList']),
			async selCommunicationListFn(page){// 获取会话分类列表
				try{
					let data = {
						pageNum:page,
						pageSize:20,
						type:this.msgType
					}
					let res = await this.selCommunicationList(data)
					if(res.code == 200){
						let list = res.data
						const hasNext = list.length > 19
						// console.log(list,'------------')
						const originatorUserId = list.map(item => item.originatorUserId)
						let conversationList =  JSON.parse(JSON.stringify(this.conversationList))
						// console.log(conversationList,originatorUserId)
						const conversations = []
						originatorUserId.forEach(user =>  {
							let userObj = conversationList.find(item => {
								return item.userProfile.userID == user
							})
							if(userObj){
								conversations.push(userObj)
							}
						})
						// console.log(conversations,'------------')
						this.msgList = conversations
						this.mescroll.endSuccess(list.length, hasNext);
					}
				}catch(e){
					this.mescroll.endSuccess(this.msgList.length, true);
					//TODO handle the exception
				}
			},
			getConversationList() { //  获取会话列表
				uni.$TUIKit.on(uni.$TUIKitEvent.CONVERSATION_LIST_UPDATED, this.onConversationListUpdated); // 监听会话更新
				uni.$TUIKit.getConversationList().then(imResponse => {  
					console.log(imResponse)
					const converList = imResponse.data.conversationList
					const hasNext = converList.length > 19
					this.conversationList = converList.filter(item => item.conversationID != "C2Cadministrator")
					this.msgList = this.conversationList
					let num = 0;
					this.msgList.forEach(item => {
						num += item.unreadCount
					})
					this.$store.commit('setUnreadNum',num)
					console.log(this.conversationList,'获取会话列表----------')
					const sysmsg = {
						lastMessage:{
							payload:{
								description:'新手指南'
							}
						},
						conversationID:''
					}
					this.systemMsg = converList.find(item => item.conversationID == "C2Cadministrator") || sysmsg
					
					this.mescroll.endSuccess(converList.length, hasNext);
				}).catch(()=>{
					this.mescroll.endSuccess(this.conversationList.length, true);
				});
			},
			customClick(data){ // 会话列表操作
				console.log(data)
				if(data.index == 1){ // 删除当前会话
					this.deleteConversationModal = true
					this.deleteConversationID = data.conversationID
				} else { // 置顶
					this.pinConversationFn(data)
				}
			},
			deleteConversationFn() {
				uni.$TUIKit.deleteConversation(this.deleteConversationID).then(res => {
					this.deleteConversationModal = false
					this.deleteConversationID = ''
					this.tui.toast('删除成功')
					this.getConversationList()
				});
			},
			pinConversationFn(data){ // 置顶会话
				uni.$TUIKit.pinConversation({conversationID:data.conversationID,isPinned: !data.isPinned }).then(res => {
					console.log(res)
					if(!data.isPinned){
						this.tui.toast('置顶成功')
					} else {
						this.tui.toast('取消置顶')
					}
				});
			},
			onConversationListUpdated(event) { // 更新会话
				// console.log(event,'更新会话')
				this.conversationList = event.data
			},
			tranMessage(lastMessage){//显示对应消息
				if(lastMessage.type == "TIMCustomElem"){
					return lastMessage.payload.description
				} else {
					return lastMessage.messageForShow
				}
			},
			changeTab(e){
				this.currentTab =  e.index
				this.mescroll && this.mescroll.setPageNum(1)
				if(this.currentTab  == 1){
					this.msgType  = 1 // 打招呼
					this.selCommunicationListFn(1)
				} else if(this.currentTab  == 2) {
					this.msgType  = 2 // 沟通中
					this.selCommunicationListFn(1)
				} else {
					this.msgList = JSON.parse(JSON.stringify(this.conversationList))
				}
			},
			comfirmFn(){ // 清除未读消息
				// 将所有会话的未读消息全部设置为已读
				let promise = uni.$TUIKit.setAllMessageRead(); // 等同于 tim.setAllMessageRead({scope: TIM.TYPES.READ_ALL_MSG})
				promise.then((imResponse)=> {
				  // 已读上报成功，所有会话的 unreadCount 属性值被置为0
				  this.tui.toast('成功')
				  this.clearMsgModal = false
				}).catch((imError) =>{
				  // 已读上报失败
				  this.tui.toast(imError)
				  console.warn('setAllMessageRead error:', imError);
				});
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
				if(this.currentTab < 1) {
					this.getConversationList()
				} else {
					this.selCommunicationListFn(mescroll.num)
				}
			},
			navToNotice(){
				uni.navigateTo({
					url:`/pagesB/notice/notice?conversationID=${this.systemMsg.conversationID}`
				})
			},
			navToChat(item){
				console.log(item)
				uni.navigateTo({
					url:`/pagesB/chat/chat?userID=${item.userProfile.userID}`
				})
			},
		}
	}
</script>

<style lang="scss">
.msg-page{
	.msg-scroll{
		height: calc(100vh - 42px - 44px - var(--status-bar-height));
	}
}

</style>
