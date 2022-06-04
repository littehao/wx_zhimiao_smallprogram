<template>
	<view class="notice-page h-100vh flex flex-column bgF7F8FA">
		<comheader title="通知消息"></comheader>	
		<view class="msg-scroll">
			<mescroll-uni ref="mescrollRef" :fixed="false" @init="mescrollInit" @down="downCallback" @up="upCallback"
				:down="downOption" :up="upOption" @scroll="scrollFn" >
				<view class="py-3 px-32">
					<view class="ft86909C fs-24 text-center py-1">4-26 22:40</view>
					<view class="msg-item flex flex-column rounded bgffff p-2 mb-2">
						<text class="ft1D2129 fs-28">荷兰新增121例新冠肺炎确诊病例，累计503例</text>
						<text class="ft86909C fs-24 lineh44">世界上脑残那么多，你却成了佼佼者。</text>
					</view>
					<view class="ft86909C fs-24 text-center py-1">4-26 22:40</view>
					<view class="msg-item flex flex-column rounded bgffff p-2 mb-2">
						<text class="ft1D2129 fs-28">荷兰新增121例新冠肺炎确诊病例，累计503例荷兰新增121例新冠肺炎确诊病例，累计503例</text>
						<text class="ft86909C fs-24 lineh44">世界上脑残那么多，你却成了佼佼者。世界上脑残那么多，你却成了佼佼者。</text>
						<image src="/static/images/img1.jpg" mode="widthFix" style="width: 100%;height: 100%;"></image>
					</view>
					<view class="ft86909C fs-24 text-center py-1">4-26 22:40</view>
					<view class="msg-item flex flex-column rounded bgffff p-2 mb-2">
						<text class="ft1D2129 fs-28">荷兰新增121例新冠肺炎确诊病例，累计503例</text>
						<text class="ft86909C fs-24 lineh44">世界上脑残那么多，你却成了佼佼者。</text>
						<image src="/static/images/img1.jpg" mode="widthFix" style="width: 100%;height: 100%;"></image>
					</view>
				
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
		}
	}
</script>

<style lang="scss">
.msg-scroll{
	height: calc(100vh - 44px - var(--status-bar-height));
}
</style>
