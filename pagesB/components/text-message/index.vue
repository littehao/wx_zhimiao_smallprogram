<template>
	<view class="flex flex-column" :class="isMine?'align-end':''">
		<text v-if="timesow" :class="'fs-24 ft86909C mb-1 ' + (isMine ? 'text-right' : '')">{{transTimeFn(message.time)}}</text>
		<view class="flex align-center" >
<!-- 			<template v-if="isMine">
				<tui-icon v-if="sended == 1"  name="circle-selected" color="#86909C" size="20rpx" margin="10rpx"></tui-icon>
				<tui-icon v-else-if="sended == 2" name="about" color="#F85241" size="20rpx" margin="10rpx"></tui-icon>
				<tui-icon v-else-if="sended == 0" class="tui-icon-loading" name="loading" color="#86909C" size="20rpx" margin="10rpx"></tui-icon>
			</template> -->
			<view :class="'text-message ' + (isMine ? 'my-text' : '')">
				<view v-for="(item, index) in renderDom" :key="index" class="message-body-span">
					<text class="message-body-span-text">{{ item.text }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { parseText } from '@/pagesB/utils/message-facade.js';
	import { transTime } from '@/utils/common.js'
	export default {
		data() {
			return {
				renderDom: [],
				timesow:true,//是否显示时间
				timeTmp:[],//时间列表
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
			},
			sended:{
				type: Number,
				default: -1
			}
		},
		watch: {
			message: {
				handler: function(newVal) {
					// console.log(newVal)
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
	
		methods: {
			transTimeFn(times){
				return transTime(times,'mm-dd hh:mm:ss')
			}
		}
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
	.tui-icon-loading {
		animation: rotate 1s linear infinite;
	}
	@-webkit-keyframes rotate {
		from {
			transform: rotatez(0deg);
		}
	
		to {
			transform: rotatez(360deg);
		}
	}
	
	@keyframes rotate {
		from {
			transform: rotatez(0deg);
		}
	
		to {
			transform: rotatez(360deg);
		}
	}
</style>