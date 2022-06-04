<template>
	<view class="msg-page h-100vh flex flex-column bgF7F8FA">
		<comheader :backBtn="false" title="消息"></comheader>	
		<view class="flex align-center  justify-between border-bottom bgffff">
			<tui-tabs unlined :width="220" :tabs="tabs" :padding="0" sliderBgColor="#F85241" selectedColor="#F85241" color="#4E5969" itemWidth="33%" :currentTab="currentTab" @change="changeTab"></tui-tabs>
			<view class="fs-24 ft86909C flex align-center pr-3">
				<image class="mr-1" src="/static/images/clearmsg.png" mode="widthFix" style="width: 16px;height: 16px;"></image>清除未读
			</view>
		</view>
		<view class="flex-1 msg-scroll">
			<mescroll-uni ref="mescrollRef" :fixed="false" @init="mescrollInit" @down="downCallback" @up="upCallback"
				:down="downOption" :up="upOption" @scroll="scrollFn" >
				<!--通知消息-->
				<msg :topNotice="true" :forbid="true" @click="navToNotice" msgContent="疫情还没完，我已经抑制不住想剁手了"></msg>
				<view class="mb-3"></view>
				
				<!--会话消息-->
				<block v-for="item in msgList" :key="item.id">
					<msg msgTitle="王凡玄" :top="item.top" msgContent="韩国疫情蔓延放缓！专家：因重视中国经验…" msgNum="16"></msg>
				</block>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				currentTab:0,
				tabs:[
					{name:'全部'},
					{name:'打招呼'},
					{name:'沟通中'}
				],
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
				msgList:[
					{
						id:1,
						top:true
					},
					{
						id:2,
						top:false
					},
					{
						id:3,
						top:false
					},
					{
						id:4,
						top:false
					},
					{
						id:5,
						top:false
					}
				]
			}
		},
		computed:{
			...mapGetters(['getNavHeight','getNavTop'])
		},
		methods: {
			changeTab(e){
				this.currentTab =  e.index
			},
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
			navToNotice(){
				uni.navigateTo({
					url:'/pagesB/notice/notice'
				})
			}
		}
	}
</script>

<style lang="scss">
.msg-page{
	.msg-scroll{
		height: calc(100vh - 42px - 44px - var(--status-bar-height));
	}
}

</style>
