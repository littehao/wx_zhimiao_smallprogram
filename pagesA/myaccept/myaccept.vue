<template>
	<view class="bgF7F8FA h-100vh flex flex-column">
		<comheader  title="承接的需求"></comheader>
		<view class="flex">
			<tui-tabs selectedColor="#F85241" color="#4E5969" :padding="0" sliderBgColor="#F85241" :tabs="tabs" :currentTab="currentTab" itemWidth="25%" @change="changeTab"></tui-tabs>
		</view>
		<view class="accept-scroll bgF7F8FA">
			<mescroll-uni ref="mescrollRef"  :fixed="false" @init="mescrollInit" @down="downCallback" @up="upCallback"
				:down="downOption" :up="upOption" @scroll="scrollFn">
				<view class="px-32 py-2" v-if="demandList.length > 0">
					<block  v-for="item in demandList" :key="item.id">
					  <mydemandCard :item="item" @loadData="loadData"></mydemandCard>
					</block>
				</view>
				<template v-else>
					<tui-no-data :fixed="false" :imgUrl="`https://zm.zgzhm.com/mini/img/img_nodata.png`" :marginBottom="0" :imgWidth="300" :imgHeight="300">
						<text class="fs-28">暂无数据</text>
					</tui-no-data>
				</template>
				
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
	import { mapGetters,mapActions } from 'vuex'
	import { distance } from '@/utils/common.js'
	import mydemandCard from '@/pagesA/components/mydemandCard/mydemandCard.vue'
	export default {
		components:{mydemandCard},
		data() {
			return {
				mescroll: null,
				upOption: {
					onScroll: true,
					textNoMore: '暂无更多数据',
					auto: true,
					noMoreSize: 5,
					page: {
						num: 0,
						size: 10 // 每页数据的数量,默认10
					},
					empty: {
						use: false
					},
					textLoading: '加载中...',
					toTop: {
						safearea: true,
						bottom: "15%"
					}
				},
				downOption: {
					auto: false
				},
				currentTab:0,
				tabs:[
					{name:'全部',type:-1},
					{name:'申请中',type:1},
					{name:'进行中',type:2},
					{name:'已完成',type:4}
				],
				pageSize:15,
				demandList:[]
			}
		},
		computed:{
			...mapGetters(['currentLocation'])
		},
		onShow() {
			this.mescroll && this.mescroll.resetUpScroll();
		},
		methods: {
			...mapActions(['getDemandUndertakingList']),
			loadData(){
				this.mescroll && this.mescroll.resetUpScroll();
			},
			async getDemandUndertakingListFn(page){ // 我承接的需求
				try{
					let data = {
						pageNum:page,
						pageSize:this.pageSize,
						type:this.tabs[this.currentTab]['type']
					}
					this.demandList = []
					let res = await this.getDemandUndertakingList(data)
					let list = res.data
					const hasNext = list.length > 14
					list.forEach(item => {
						item.distance = distance(item.demandRegistrationSon.xaxis,item.demandRegistrationSon.yaxis,this.currentLocation)
					})
					if(page == 1){
						this.demandList = list
					} else {
						this.demandList = this.demandList.concat(list)
					}
					console.log(list)
					this.mescroll.endSuccess(list.length, hasNext);
				}catch(e){
					this.mescroll.endSuccess(this.demandList.length, false);
					//TODO handle the exception
				}
			},
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			scrollFn(mescroll) {
				this.scrollTop = mescroll.scrollTop
			},
			downCallback() {
				this.mescroll.resetUpScroll();
			},
			upCallback(mescroll) { //上拉加载
				this.getDemandUndertakingListFn(mescroll.num)
			},
			changeTab(e){
				this.currentTab = e.index
				this.mescroll.resetUpScroll();
			}
		}
	}
</script>

<style>
.accept-scroll{
	height: calc(100vh - 44px - 41px - var(--status-bar-height));
}
</style>
