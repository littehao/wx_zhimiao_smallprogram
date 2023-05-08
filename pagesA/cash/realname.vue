<template>
	<view class="bgF7F8FA h-100vh flex flex-column">
		<comheader  title="实名认证"></comheader>
		<view class="p-3">
			<view class="fs-24 ftf7811b mb-5">认证后可进行服务佣金提现</view>
			<view class="flex align-center border-bottom  py-2  mb-2"  style="border-color: #ddd;">
				<view class="title ft4E5969" style="width: 200rpx;">姓名</view>
				<input class="flex-1" v-model="username" placeholder="输入本人姓名" placeholder-class="placeholder"/>
			</view>
			<view class="flex align-center border-bottom  py-2 mb-2"  style="border-color: #ddd;">
				<view class="title ft4E5969" style="width: 200rpx;">身份证号</view>
				<input class="uni-input" v-model="cardId" placeholder="输入本人身份证号" placeholder-class="placeholder"/>
			</view>
			<view class="flex align-center border-bottom  py-2 mb-2"  style="border-color: #ddd;">
				<view class="title ft4E5969" style="width: 200rpx;">手机号</view>
				<input class="uni-input" v-model="phone" disabled placeholder="输入本人姓名" placeholder-class="placeholder"/>
			</view>
			
			<view class="flex align-center ft86909C fs-24 py-2">认证即代表同意<text class="fs-24 ftf7811b" @click="navRule">《支付服务相关协议》</text></view>
			<view class="border-top  w-100 px-32 border-box pt-2  mt-5">
				<view class="ftffff fs-28 bgF85241 rounded-circle text-center py-2 w-100" @tap="submit">确定</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data(){
			return {
				username:'',
				cardId:'',
				phone:''
			}
		},
		methods:{
			submit(){
				
			},
			navRule(){
				uni.navigateTo({
					url:'/pagesA/agreement/agreement?type=2'
				})
			},
		}
	}
</script>

<style>
</style>