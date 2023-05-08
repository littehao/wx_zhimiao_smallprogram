<template>
	<view class="flex flex-column">
		<text :class="'fs-24 ft86909C mb-1 ' + (isMine ? 'text-right' : '')">{{transTimeFn(message.time)}}</text>
		
		<template v-if="dbOperationType == 2">
			<view :class="'card-message bgffff rounded flex flex-column p-2 ' + (isMine ? 'my-text' : '')" @tap="navTo">
				<text class="fs-28 ft1D2129 f-w-b lineh44 text-ellipsis2">{{dataMsg.title}}</text>
				<view class="flex align-center my-1">
					<text class="ftF53F3F fs-32">{{formatNumber(dataMsg.demandPrice || 0)}}元</text>
					<text class="ft86909C fs-24">{{dataMsg.paymentStatusStr}}</text>
				</view>
				<view class="flex align-center mt-1">
				    <view  class="flex-1 flex align-center">
				       <!-- <text class="bgF2F3F5 fs-24 family rounded px-2 lineh40 ft1D2129 text-ellipsis">签合同</text>
				        <text class="bgF2F3F5 fs-24 family rounded ml-1 rounded px-2 lineh40 ft1D2129 text-ellipsis">买保险</text> -->
				    </view>
				    <view class="flex  align-center ml-2">
						<tui-icon  size="28" unit="rpx"  color="#86909C" name="gps"></tui-icon>
				        <text class="ft86909C fs-24 family text-ellipsis2" style="width: 200rpx;">{{dataMsg.address}} {{distance || 0}}km</text>
				    </view>
				</view>
			</view>
		</template>
		<template v-else>
			<view :class="'card-message bgffff rounded flex flex-column p-2 ' + (isMine ? 'my-text' : '')">.</view>
		</template>
	</view>
</template>

<script>
	import { mapGetters,mapActions } from 'vuex'
	import { parseText } from '@/pagesB/utils/message-facade.js';
	import { formatNumber,transTime } from '@/utils/common.js'
	export default {
		data() {
			return {
				dataMsg: {},
				distance:0,
				dbOperationType:2,//判断是不是需求
				sysmsg:'',
				msgdata:''
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
		computed:{
			...mapGetters(['getAxis'])
		},
		watch: {
			message: {
				handler: function(newVal) {
					this.msgdata = newVal.payload.data
					if(this.msgdata){
						const data = this.msgdata
						if(data.mpsContent){
							if(data.dbOperationType == 2){
								this.dbOperationType = 2
								// console.log(JSON.parse(data.mpsContent),'===============')
								this.dataMsg = JSON.parse(data.mpsContent)
								// console.log(this.dataMsg)
								this.getDistanceFn()
							}
						} else {
							this.dbOperationType = -1
						}
					}
				},
				immediate: true,
				deep: true
			}
		},
		methods: {
			...mapActions(['getDistance']),
			async getDistanceFn(){
				try{
					const data = {
						endXAxis:this.dataMsg.xAxis,
						endYAxis:this.dataMsg.yAxis,
						startXAxis:this.getAxis.center[1],
						startYAxis:this.getAxis.center[0]
					}
					let res = await this.getDistance(data)
					if(res){
						this.distance = res.data
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			formatNumber(price){
				return formatNumber(price)
			},
			transTimeFn(times){
				return transTime(times,'mm-dd hh:mm:ss')
			},
			navTo(){
				uni.navigateTo({
					url:'/pagesA/demand-details/demand-details?demandId='+ this.msgdata.mainBusinessId
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.card-message{
		max-width: 68vw;
		min-width: 50vw;		// border: 1px solid #D9D9D9;
		border-radius: 2px 10px 10px 10px;
	}
	.my-text {
		border-radius: 10px 2px 10px 10px;
		// border: 1px solid rgba(0, 110, 255, 0.30);
		background:#fff;
	}
</style>