<template>
	<view class="chat-page h-100vh flex flex-column bgF7F8FA position-fixed top-0 left-0 right-0 bottom-0">
		<comheader title="某某对话" class="flex-shrink"></comheader>	
		<view class="bgffff px-2 flex align-center flex-shrink" style="height: 64px;">
			<view class="flex flex-column" style="width: 75%;">
				<text class="ft1D2129 fs-28 text-ellipsis">大标题可以详细描述需求大标题可以详细描述需求，展示一行用…</text>
				<view class="flex align-center">
					<text class="ftF53F3F fs-32">12000元</text>
					<text class="ft86909C fs-24">已支付</text>
				</view>
			</view>
			<view class="ftFCB6A4 fs-24 border bdFCB6A4 rounded px-2  py-1 ml-2">申请接单</view>
		</view>
		<view class="flex-1 messageList overflow-y">
			<messageList :conversation="conversation"></messageList>
		</view>
		<view class="message-input position-relative z-index1030">
			<message-input ref="messageInput"/>
		</view>
	</view>
</template>

<script>
	import messageInput from '../components/message-input/message-input.vue'
	import messageList from '../components/message-list/index.vue'
	export default {
		components:{
			messageInput,
			messageList
		},
		data() {
			return {
				conversation: {
					type:'C2C'
				},
				// conversation: {
				// 	type:'@TIM#SYSTEM'
				// }
			}
		},
		methods: {
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
					this.mescroll.endSuccess([], false);
				}, 600);
			},
		}
	}
</script>

<style lang="scss">
.messageList{
	// max-height: calc(100vh - 44px - 64px - 48px - var(--status-bar-height));
}
</style>
