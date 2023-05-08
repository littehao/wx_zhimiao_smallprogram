<template>
	<view class="flex flex-column">
		<text :class="'fs-24 ft86909C mb-1 ' + (isMine ? 'text-right' : '')">{{transTimeFn(message.time)}}</text>
		<view :class="'order-apply bgffff rounded flex flex-column ' + (isMine ? 'my-text' : '')">
			<view class="p-2 flex flex-column">
				<text class="fs-28 ft1D2129">{{message.payload.data.dbTitle}}</text>
				<text class="fs-24 ft4E5969 lineh44">{{message.payload.data.mpsContent}}</text>
			</view>
			<view class="flex align-center p-1 border-top" v-if="(message.payload.data.dbOperationType == 7 || 
			message.payload.data.dbOperationType == 8) && message.payload.data.mainBusinessId == demandId">
				<text 
				class="border text-center lineh50 flex-1 rounded fs-28" 
				:class="businessStatus >= 4 || demandData.inviteeStatus == 1 || demandData.applicationStatus == 1?'bdFCB6A4 ftFCB6A4':'bdF85241 ftF85241 '" 
				@click="$emit('click',0)">拒绝</text>
				<text 
				class="ftffff ml-1 text-center lineh50 flex-1 rounded fs-28" 
				:class="businessStatus >= 4 || demandData.inviteeStatus == 1 || demandData.applicationStatus == 1?'bgFCB6A4':'bgF85241'"  
				@click="$emit('click',1)">同意</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapActions } from 'vuex'
	import { transTime } from '@/utils/common.js'
	export default {
		data() {
			return {
				
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
			demandId:{
				type:String,
				default:''
			},
			businessStatus:{ // 当前需求状态
				type:Number
			},
			demandData:{
				type:Object,
				default:{}
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
	.order-apply{
		width: 70vw;
		// border: 1px solid #D9D9D9;
		border-radius: 2px 10px 10px 10px;
	}
	.my-text {
		border-radius: 10px 2px 10px 10px;
		// border: 1px solid rgba(0, 110, 255, 0.30);
		background:#fff;
	}
</style>