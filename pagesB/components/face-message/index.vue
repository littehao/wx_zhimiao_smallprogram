<template>
	<view class="TUI-faceMessage">
		<view :class="'text-message ' + (isMine ? 'my-text' : '')">
			<image v-if="emojiText" class="face-message" :src="renderDom.src" style="width:70rpx;" mode="widthFix"></image>
			<text v-else>.</text>
		</view>
		
	</view>
</template>

<script>
import { emojiName, emojiUrl, emojiMap } from '@/pagesB/utils/emojiMap.js';
export default {
	data() {
		return {
			renderDom: [],
			percent: 0,
			faceUrl: 'https://web.sdk.qcloud.com/im/assets/emoji/',
			emojiText:''
		};
	},

	components: {},
	props: {
		message: {
			type: Object
		},
		isMine: {
			type: Boolean,
			default: true
		}
	},
	watch: {
		message: {
			handler: function(newVal) {
				this.renderDom = this.parseFace(newVal)
			},
			immediate: true,
			deep: true
		}
	},
	methods: {
		// 解析face 消息
		parseFace(message) {
			this.emojiText = emojiMap[emojiName[message.payload.index - 1]]
			const renderDom = {
				src: `${this.faceUrl + emojiMap[emojiName[message.payload.index - 1]]}`
			};
			return renderDom;
		},

		previewImage() {
			uni.previewImage({
				current: this.renderDom[0].src,
				// 当前显示图片的http链接
				urls: [this.renderDom[0].src]
			});
		}
	}
};
</script>
<style>
@import './index.css';
</style>
