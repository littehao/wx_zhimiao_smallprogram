<template>
	<view class="bgF7F8FA h-100vh flex flex-column">
		<comheader  title="承接的需求"></comheader>
		<view class="flex">
			<tui-tabs selectedColor="#F85241" color="#4E5969" :padding="0" sliderBgColor="#F85241" :tabs="tabs" :currentTab="currentTab" itemWidth="25%" @change="changeTab"></tui-tabs>
		</view>
		<view class="accept-scroll bgF7F8FA">
			<mescroll-uni ref="mescrollRef"  :fixed="false" @init="mescrollInit" @down="downCallback" @up="upCallback"
				:down="downOption" :up="upOption" @scroll="scrollFn">
				<view class="px-32 py-2">
					<block  v-for="item in 6" :key="item.id">
					  <mydemandCard></mydemandCard>
					</block>
				</view>
				
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mescroll: null,
				upOption: {
					onScroll: true,
					textNoMore: '暂无更多数据',
					auto: false,
					noMoreSize: 5,
					page: {
						num: 0,
						size: 10 // 每页数据的数量,默认10
					},
					empty: {
						use: false
					},
					textLoading: '加载中...',
					textNoMore: '暂无更多商品',
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
					{name:'全部'},
					{name:'待付款'},
					{name:'进行中'},
					{name:'已完成'}
				]
			}
		},
		methods: {
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			scrollFn(mescroll) {
				this.scrollTop = mescroll.scrollTop
			},
			downCallback() {
				setTimeout(() => {
					this.mescroll.resetUpScroll();
				}, 600);
			},
			upCallback(mescroll) { //上拉加载
				setTimeout(() => {
					this.mescroll.endSuccess([], false);
				}, 600);
			},
			changeTab(e){
				this.currentTab = e.index
			}
		}
	}
</script>

<style>
.accept-scroll{
	height: calc(100vh - 44px - 41px - var(--status-bar-height));
}
</style>
