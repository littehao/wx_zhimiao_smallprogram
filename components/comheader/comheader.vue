<template>
	<view class="flex align-center justify-center w-100 position-relative border-box" :class="bgColor?'bglinear':''" style="z-index: 1;" :style="{height: getNavHeight+'px','padding-top':getNavTop+'px'}">
		<tui-icon v-if="backBtn" class="position-absolute left-0 bottom-0 flex align-center justify-center" :style="{top:getNavTop+'px'}" color="#fff" :size="34" unit="px" name="arrowleft" @click="backFn"></tui-icon>
		<text class="fs-32 ftffff family">{{title}}</text>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		props:{
			title:{
				type:String,
				default:''
			},
			backBtn:{
				type:Boolean,
				default:true
			},
			bgColor:{
				type:Boolean,
				default:true
			}
		},
		name:"comheader",
		data() {
			return {
				
			};
		},
		computed:{
			...mapGetters(['getNavHeight','getNavTop'])
		},
		methods:{
			backFn(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>

</style>