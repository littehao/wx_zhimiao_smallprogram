<template>
	<view class="flex flex-column bgffff px-32 py-2">
		<view class="flex align-center">
			<image src="/static/images/emoji.png" mode="widthFix" @tap="handleEmoji" style="width: 22px;height: 22px;"></image>
			<view class="flex flex-1 mx-2 flex align-center rounded fs-24" :class="isFocus?'border bdF85241':'bgF2F3F5'" style="min-height: 32px;">
				<textarea 
					:adjust-position="true"
					v-model="inputText"
					:cursor-spacing="10"
					maxlength="140"
					placeholder="说点什么呢~"
					auto-height
					class="lineh40 overflow-y px-1"
					style="width: 100%;font-size: 24rpx;max-height: 80px;"
					@input="onInputValueChange"
					@focus="inputBindFocus"
					@blur="inputBindBlur"
				/>
			</view>
			<view 
			class="ftffff fs-28 flex align-center justify-center rounded" 
			:class="sendMessageBtn?'bgF85241':'bgFCB6A4'" 
			@tap="sendTextMessage"
			style="width: 48px;height: 32px;">{{sended?'发送':'发送中'}}</view>
			
		</view>
		<view v-if="displayFlag === 'emoji'" class="TUI-Emoji-area"><Emoji @enterEmoji="appendMessage"></Emoji></view>
	</view>
</template>

<script>
	import { mapActions } from 'vuex'
	import { trim } from '@/utils/common.js'
	import Emoji from '@/pagesB/components/emoji/index.vue'
	import { emojiName, emojiUrl, emojiMap } from '@/pagesB/utils/emojiMap.js';
	export default {
		props: {
			conversation: {
				type: Object,
				default: () => {}
			},
			demandId:{
				type:String,
				default:''
			},
			sendmsgId:{ //  发送消息会话id
				type:String,
				default:''
			}
		},
		components:{Emoji},
		data(){
			return {
				inputText:'',
				emojiIndex:0,
				sendMessageBtn:false,
				isFocus:false,
				displayFlag: '',
				msgType:'TIMTextElem',
				sended:true,//消息发送状态
			}
		},
		methods:{
			...mapActions(['sendMessage']),
			onInputValueChange(event){
				if (event.detail.value) {
					this.sendMessageBtn = true
				} else {
					this.sendMessageBtn = false
				}
			},
			async sendTextMessage() {
				console.log(this.conversation)
				try{
					const to = this.getToAccount();
					const text = this.inputText;
					if(!trim(text) || !this.sended)return
					this.sended = false
					const msgContent = {}
					if(this.msgType == 'TIMFaceElem'){
						msgContent.index = this.emojiIndex
					} else {
						msgContent.text = text
					}
					let data = {
						imSingleChatSessionId:this.sendmsgId,
						msgBody:{
							msgType:this.msgType,
							toAccountId:to,
							toAccountName:this.conversation.userProfile.nick,
							msgContent:{...msgContent}
						}
					}
					let res = await this.sendMessage(data)
					if(res.code == 200){
						this.inputText = ''
						this.sendMessageBtn = false
						this.sended = true
						this.handleClose()
						// this.$sendTIMMessage(text)
					}
				}catch(e){
					console.log(e)
					this.tui.toast(e.msg)
					this.sended = true
					//TODO handle the exception
				}
			},
			$sendTIMMessage(text){
				const message= {
					type:'TIMTextElem',
					flow:'out',
					isRead:true,
					payload:{
						text
					}
				}
				this.$emit('sendMessage', {
					detail: {
						message
					}
				});
			},
			getToAccount() {
				if (!this.conversation || !this.conversation.conversationID) {
					return '';
				}
			
				switch (this.conversation.type) {
					case 'C2C':
						return this.conversation.conversationID.replace('C2C', '');
					default:
						return this.conversation.conversationID;
				}
			},
			inputBindFocus() {
				this.isFocus = true
			},
			inputBindBlur() {
				this.isFocus = false
				
			},
			handleClose() {
				this.displayFlag = ''
				this.emojiIndex = 0
				this.msgType = 'TIMTextElem'
				this.$emit('emoji',false)
			},
			handleEmoji() {
				let targetFlag = 'emoji';
				
				if (this.displayFlag === 'emoji') {
					targetFlag = '';
				}
				if(targetFlag){
					this.$emit('emoji',true)
				}
				this.displayFlag = targetFlag
			},
			appendMessage(e) {
				console.log(e)
				this.inputText = this.inputText + e.detail.message
				this.emojiIndex = emojiName.findIndex(item =>  item == e.detail.message) + 1
				if(e.detail.message){
					this.msgType = 'TIMFaceElem'
				} else {
					this.msgType = 'TIMTextElem'
				}
				this.sendMessageBtn = true
			},
		}
	}
</script>

<style lang="scss"  scoped>
	.message-input-area{
		word-wrap: break-word;
		word-break: break-all;
		white-space: pre-line;
	}
	.TUI-Emoji-area {
		width: 100vw;
		height: 450rpx;
	}
</style>