<template>
	<view class="flex flex-column">
		<text :class="'fs-24 ft86909C mb-1 ' + (isMine ? 'text-right' : '')">4-26 22:40</text>
		<view :class="'order-apply bgffff rounded flex flex-column ' + (isMine ? 'my-text' : '')">
			<view class="p-2 flex flex-column">
				<text class="fs-28 ft1D2129">接单申请</text>
				<text class="fs-24 ft4E5969 lineh44">对方发起了申请接单请尽快确认哦 确认接单后 将不在首页显示 订单进入 确认状态</text>
			</view>
			<view class="flex align-center p-1 border-top">
				<text class="border bdF85241 ftF85241 text-center lineh50 flex-1 rounded fs-28">拒绝</text>
				<text class="ftffff bgF85241 ml-1 text-center lineh50 flex-1 rounded fs-28">同意</text>
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
	.order-apply{
		max-width: 70vw;
		// border: 1px solid #D9D9D9;
		border-radius: 2px 10px 10px 10px;
	}
	.my-text {
		border-radius: 10px 2px 10px 10px;
		// border: 1px solid rgba(0, 110, 255, 0.30);
		background:#fff;
	}
</style>