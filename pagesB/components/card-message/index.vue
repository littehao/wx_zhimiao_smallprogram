<template>
	<view class="flex flex-column">
		<text :class="'fs-24 ft86909C mb-1 ' + (isMine ? 'text-right' : '')">4-26 22:40</text>
		<view :class="'card-message bgffff rounded flex flex-column p-2 ' + (isMine ? 'my-text' : '')">
			<text class="fs-28 ft1D2129 f-w-b lineh44 text-ellipsis2">大标题可以详细描述需求大标题可以详细描述需求，展示一行…</text>
			<view class="flex align-center my-1">
				<text class="ftF53F3F fs-32">12000元</text>
				<text class="ft86909C fs-24">已支付</text>
			</view>
			<view class="flex align-center mt-1">
			    <view  class="flex-1 flex align-center">
			        <text class="bgF2F3F5 fs-24 family rounded px-2 lineh40 ft1D2129">签合同</text>
			        <text class="bgF2F3F5 fs-24 family rounded ml-2 rounded px-2 lineh40 ft1D2129">买保险</text>
			    </view>
			    <view class="flex  align-center">
					<tui-icon  size="28" unit="rpx"  color="#86909C" name="gps"></tui-icon>
			        <text class="ft86909C fs-24 family">天府三街 5.3km</text>
			    </view>
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
	.card-message{
		max-width: 64vw;
		// border: 1px solid #D9D9D9;
		border-radius: 2px 10px 10px 10px;
	}
	.my-text {
		border-radius: 10px 2px 10px 10px;
		// border: 1px solid rgba(0, 110, 255, 0.30);
		background:#fff;
	}
</style>