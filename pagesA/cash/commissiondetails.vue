<template>
	<view class="bgF7F8FA h-100vh flex flex-column">
		<comheader  title="佣金明细"></comheader>
		<view class="commissiondetails">
			<comscroll
			ref="comscroll"
			@loadData="loadData"
			:isSuccess="isSuccess"
			:datalen="datalen"
			>
				<block v-for="(item,index) in listData" :key="index">
					<view class="fs-28 ft1D2129 px-2 py-1" style="background-color: rgb(248 129 28 / 31%);">{{item.yearMonth}}</view>
					<view class="mx-2 border-bottom py-2" v-for="(obj,i) in item.flowDetailsList" :key="i">
						<view class="flex align-center justify-between mb-2">
							<text class="fs-28 ft1D2129">{{obj.flowDescription}}</text>
							<text class="fs-28" :class="obj.changeAmount.includes('+')?'ftf7811b':''">{{obj.changeAmount}}</text>
						</view>
						<view class="flex align-center justify-between">
							<text class="ft86909C fs-24">{{obj.createTime}}</text>
							<view class="flex align-center">
								<text class="ft86909C fs-24">余额:</text>
								<text class="ftF85241 fs-24">{{obj.afterChange}}</text>
							</view>
						</view>
					</view>
				</block>
			</comscroll>
		</view>
	</view>
</template>

<script>
	import { mapActions } from  'vuex'
	const changeType = {
		1:'提现',
		2:'收入',
		3:'手续费',
	}
	export default{
		data(){
			return{
				listData:[],
				isSuccess:false,
				datalen:0,
			}
		},
		created() {
			this.loadData()
		},
		methods:{
			...mapActions(['getSeniorList']),
			async loadData(page){
				const data = {
					pageNum:1,
					pageSize:20
				}
				this.isSuccess = false
				let res = await this.getSeniorList(data)
				this.isSuccess = true
				let list = res.data
				this.datalen = list.length
				if(page == 1){
					this.listData = list
				} else {
					this.listData = this.listData.concat(list)
				}
			}
		}
	}
</script>

<style  lang="scss">
.commissiondetails{
	height: calc(100vh - 44px - var(--status-bar-height));
}
</style>