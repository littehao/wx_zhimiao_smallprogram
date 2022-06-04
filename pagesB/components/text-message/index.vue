<template>
	<view class="flex flex-column">
		<text :class="'fs-24 ft86909C mb-1 ' + (isMine ? 'text-right' : '')">4-26 22:40</text>
		<view :class="'text-message ' + (isMine ? 'my-text' : '')">
			<view v-for="(item, index) in renderDom" :key="index" class="message-body-span">
				<text class="message-body-span-text" v-if="item.name === 'span'">{{ item.text }}</text>
				<image v-if="item.name === 'img'" class="emoji-icon" :src="item.src"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import { parseText } from '@/utils/message-facade.js';
	export default {
		data() {
			return {
				renderDom: []
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
					console.log(newVal)
					this.renderDom = parseText(newVal)
				},
				immediate: true,
				deep: true
			}
		},
	
		beforeMount() {
			// 在组件实例进入页面节点树时执行
		},
	
		destroyed() {
			// 在组件实例被从页面节点树移除时执行
		},
	
		methods: {}
	};
</script>

<style lang="scss" scoped>
	.text-message {
		display: inline-flex;
		max-width: 64vw;
		line-height: 52rpx;
		padding: 12rpx 24rpx;
		background: #fff;
		// border: 1px solid #D9D9D9;
		border-radius: 2px 10px 10px 10px;
	}
	
	.my-text {
		border-radius: 10px 2px 10px 10px;
		// border: 1px solid rgba(0, 110, 255, 0.30);
		background:#fff;
	}
	
	.message-body-span {
		display: flex;
		justify-content: center;
		align-items: center;
		/*justify-content: flex-start;*/
		flex-wrap: wrap;
		outline: none;
		font-size: 28rpx;
		color: #333333;
		position: relative;
		// max-width: 60vw;
	}
	
	.message-body-span-text {
		width: 100%;
		display: inline;
		word-wrap: break-word;
		word-break: break-all;
		font-size: 28rpx;
	}
	
	.message-body-span-image {
		display: inline-block;
		width: 32rpx;
		height: 32rpx;
		margin: 0 4rpx;
	}
	
	.emoji-icon {
		width: 20px;
		height: 20px;
	}
</style>