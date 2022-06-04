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
			<view class="ftffff fs-28 flex align-center justify-center rounded" :class="sendMessageBtn?'bgF85241':'bgFCB6A4'" style="width: 48px;height: 32px;">发送</view>
			
		</view>
		<view v-if="displayFlag === 'emoji'" class="TUI-Emoji-area"><Emoji @enterEmoji="appendMessage"></Emoji></view>
	</view>
</template>

<script>
	import Emoji from '@/pagesB/components/emoji/index.vue'
	export default {
		components:{Emoji},
		data(){
			return {
				inputText:'',
				sendMessageBtn:false,
				isFocus:false,
				displayFlag: '',
			}
		},
		methods:{
			onInputValueChange(event){
				if (event.detail.value) {
					this.sendMessageBtn = true
				} else {
					this.sendMessageBtn = false
				}
			},
			inputBindFocus() {
				this.isFocus = true
			},
			inputBindBlur() {
				this.isFocus = false
			},
			handleEmoji() {
				let targetFlag = 'emoji';
			
				if (this.displayFlag === 'emoji') {
					targetFlag = '';
				}
				this.displayFlag = targetFlag
			},
			appendMessage(e) {
				this.inputText = this.inputText + e.detail.message
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