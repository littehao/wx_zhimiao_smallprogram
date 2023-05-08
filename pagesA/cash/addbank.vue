<template>
	<view class="bgF7F8FA h-100vh flex flex-column">
		<comheader  title="绑定银行卡"></comheader>
		<view class="p-3">
			<view class="fs-24 ftf7811b mb-5">注：请绑定与实名信息一致的银行卡</view>
			<view class="flex align-center border-bottom  py-2 mb-2"  style="border-color: #ddd;">
				<view class="title ft4E5969" style="width: 200rpx;">身份证姓名</view>
				<input class="uni-input" v-model="bank.certName" placeholder="输入身份证姓名" placeholder-class="placeholder"/>
			</view>
			<view class="flex align-center border-bottom  py-2 mb-2"  style="border-color: #ddd;">
				<view class="title ft4E5969" style="width: 200rpx;">身份证号</view>
				<input class="uni-input" v-model="bank.certNo" placeholder="输入身份证号" placeholder-class="placeholder"/>
			</view>
			<view class="flex align-center border-bottom  py-2  mb-2"  style="border-color: #ddd;">
				<view class="title ft4E5969" style="width: 200rpx;">银行名称</view>
				<input class="flex-1" v-model="bank.bankName" placeholder="请输入银行名称" placeholder-class="placeholder"/>
			</view>
			<view class="flex align-center border-bottom  py-2  mb-2"  style="border-color: #ddd;">
				<view class="title ft4E5969" style="width: 200rpx;">银行卡号</view>
				<input class="flex-1" v-model="bank.bankCardNo" placeholder="请输入银行卡号" placeholder-class="placeholder"/>
			</view>
			<view class="flex align-center border-bottom  py-2 mb-2"  style="border-color: #ddd;">
				<view class="title ft4E5969" style="width: 200rpx;">手机号</view>
				<input class="uni-input" v-model="bank.mobile" placeholder="输入手机号" placeholder-class="placeholder"/>
			</view>
			<view class="flex align-center ft86909C fs-24 py-2">绑定即代表您已阅读并接受<text class="fs-24 ftf7811b" @click="navRule">《佣金收益及提现服务》</text></view>
			<view class="border-top  w-100 px-32 border-box pt-2  mt-5">
				<view class="ftffff fs-28 bgF85241 rounded-circle text-center py-2 w-100" @tap="submit">确定</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { mapGetters,mapActions } from 'vuex'
	export default {
		data(){
			return {
				bank:{
					bankName:'',
					bankCardNo:'',
					certName:'',
					certNo:'',
					mobile:''
				}
			}
		},
		computed:{
			...mapGetters(['getUser'])
		},
		created() {
			this.bank.mobile = this.getUser.realPhone
		},
		methods:{
			...mapActions(['setWithdrawalAccount']),
			async submit(){
				try{
					const isempty = Object.keys(this.bank).some(item => !this.bank[item])
					if(isempty){
						this.tui.toast('请完善信息后提交')
						return
					}
					const data = {
						...this.bank
					}
					let res = await this.setWithdrawalAccount(data)
					this.tui.toast('绑定成功')
					setTimeout(() => {
						uni.navigateBack()
					},1000)
				}catch(e){
					this.tui.toast(e.msg)
					//TODO handle the exception
				}
			},
			navRule(){
				uni.navigateTo({
					url:'/pagesA/agreement/agreement?type=5'
				})
			},
		}
	}
</script>

<style>
</style>