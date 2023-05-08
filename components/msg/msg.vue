<template>
	<tui-swipe-action class="msgCard" backgroundColor="#fff" :operateWidth="100" :forbid="forbid">
		<template v-slot:content>
			<view class="msg-item-content flex align-center px-32" :class="isPinned?'bgF2F3F5':''" @click="$emit('click')">
				<template v-if="topNotice">
					<view class="notice-icon flex justify-center align-center mr-2">
						<tui-icon name="notice" color="#fff" size="20"></tui-icon>
					</view>
				</template>
				<view v-else class="position-relative mr-2">
				    <image v-if="avatar" class="rounded-circle" :src="avatar" mode="aspectFill"  style="width:40px;height:40px;"></image>
				    <image v-else class="rounded-circle" :src="`https://zm.zgzhm.com/mini/img/avatar.png`" mode="aspectFill"  style="width:40px;height:40px;"></image>
				    <image class="position-absolute right-0 bottom-0" src="/static/images/level.png" mode="widthFix" style="width: 20px;height: 20px;"></image>
				</view>
				<view class="flex flex-column flex-1">
					<view class="flex align-center mb-1">
						<text class="ft1D2129 fs-28 family f-w-b flex-1">{{msgTitle}}</text>
						<text class="fs-24 ft86909C">{{transTimeFn()}}</text>
					</view>
					<view class="flex align-center">
						<text class="fs-24 ft4E5969 text-ellipsis flex-1 pr-2 text-ellipsis" style="width: 500rpx">{{msgContent}}</text>	
						<text class="ftffff fs-24 bgF53F3F rounded-lg px-2" v-if="msgNum > 0">{{msgNum}}</text>	
					</view>	
				</view>	
			</view>
		</template>
		<template v-slot:button>
			<view class="msg-item-btn flex align-center pl-2" :class="isPinned?'bgF2F3F5':''">
				<view class="tui-custom-btn tui-custom-mr mr-2" @tap="customBtn({index:0,conversationID,isPinned})">
					<image v-if="isPinned" src="/static/images/msgbottom.png" style="width: 32px;height: 32px;" mode="widthFix"></image>
					<image v-else src="/static/images/msgtop.png" style="width: 32px;height: 32px;" mode="widthFix"></image>
				</view>
				<view class="tui-custom-btn" @tap="customBtn({index:1,conversationID,isPinned})">
					<image src="/static/images/msgdel.png" style="width: 32px;height: 32px;" mode="widthFix"></image>
				</view>
			</view>
		</template>
	</tui-swipe-action>
</template>

<script>
	import { transTime } from '@/utils/common.js'
	export default {
		name:"msg",
		props:{
			conversationID:{
				type:String
			},
			forbid:{ // 是否禁止滑动
				type:Boolean,
				default:false
			},
			topNotice:{ // 是否是系统消息
				type:Boolean,
				default:false
			},
			avatar:{
				type:String,
				default:''
			},
			msgTitle:{
				type:String,
				default:'通知消息'
			},
			msgTime:{
				type:Number,
				default:0
			},
			msgContent:{
				type:String,
				default:'-'
			},
			msgNum:{
				type:[Number,String],
				default:'0'
			},
			isPinned:{
				type:Boolean,
				default:false
			},
		},
		data() {
			return {

			};
		},
		methods:{
			customBtn(index){
				this.$emit('customClick',index)
			},
			transTimeFn(){
				return transTime(this.msgTime,'mm-dd hh:mm:ss')
			}
		}
	}
</script>

<style lang="scss">
.msgCard{
	.msg-item-content,.msg-item-btn{
		height: 78px;
	}
	.notice-icon{
		width: 80rpx;
		height: 80rpx;
		background: linear-gradient(180deg, #F85241 0%, #F29F63 100%);
		border-radius: 100px 100px 100px 100px;
	}
}
</style>