<template>
	<view class="focuslist-page bgF7F8FA h-100vh flex flex-column">
		<comheader  title="关注列表"></comheader>
		<view class="focuslis-scroll">
			<mescroll-uni ref="mescrollRef"  :fixed="false" @init="mescrollInit" @down="downCallback" @up="upCallback"
				:down="downOption" :up="upOption" @scroll="scrollFn">
				<view class="px-32 bgffff">
					<block  v-for="item in focusList" :key="item.id">
					  <view class="flex py-3">
					  	<view class="position-relative mr-2" style="width:40px;height:40px;">
					  	    <image class="rounded-circle" src="/static/images/avatar.png" mode="aspectFill"  style="width:40px;height:40px;"></image>
					  	    <image class="position-absolute right-0 bottom-0" src="/static/images/level.png" mode="widthFix" style="width: 20px;height: 20px;"></image>
					  	</view>
						<view class="flex flex-column flex-1">
							<text class="mb-1 ft1D2129 fs-28">{{item.name}}</text>
							<view class="flex align-center">
								<text class="fs-24 ft4E5969">诚信值: LV23</text>
								<text class="fs-24 ft4E5969">技能量: 23</text>
							</view>
						</view>
						<view class="fs-24 ftffff flex align-center justify-center rounded" :class="item.focus?'bgFCB6A4':'bgF85241'" style="width: 60px;height: 24px;" @click="focusItemFn(item)">{{item.focus?'已关注':'关注'}}</view>
					  </view>
					</block>
				</view>
			</mescroll-uni>
		</view>
		
		<!--取消关注-->
		<tui-modal :show="focusModal" custom padding="0">
			<view class="flex flex-column pt-5">
				<view class="position-relative mr-2 mx-auto mb-2" style="width:40px;height:40px;">
				    <image class="rounded-circle" src="/static/images/avatar.png" mode="aspectFill"  style="width:40px;height:40px;"></image>
				    <image class="position-absolute right-0 bottom-0" src="/static/images/level.png" mode="widthFix" style="width: 20px;height: 20px;"></image>
				</view>
				<view class="flex align-center justify-center fs-32 ft1D2129 pb-3">你将不再关注<text class="f-w-b">朱成慧</text></view>
				<view class="flex align-center border-top" style="height: 56px;">
					<view class="flex align-center justify-center ft000000 fs-28 flex-1 h-100" @click="focusModal = false">取消</view>
					<view class="flex align-center justify-center ftF85241 fs-28 border-left flex-1 h-100"  @click="comfirmFocusFn">取消关注</view>
				</view>
			</view>
		</tui-modal>
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
				focusModal:false,
				focusInfo:'',
				focusList:[
					{id:1,focus:false,name:'韩磊1'},
					{id:2,focus:false,name:'韩磊2'},
					{id:3,focus:true,name:'韩磊3'},
					{id:4,focus:false,name:'韩磊4'},
					{id:5,focus:true,name:'韩磊5'},
					{id:6,focus:false,name:'韩磊6'},
					{id:7,focus:false,name:'韩磊6'},
					{id:8,focus:false,name:'韩磊6'},
					{id:9,focus:false,name:'韩磊6'},
					{id:10,focus:false,name:'韩磊6'},
					{id:11,focus:false,name:'韩磊6'},
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
			focusItemFn(item){ // 当前取消用户信息
				this.focusInfo  = item
				this.focusModal  =  true
			},
			comfirmFocusFn(){
				this.focusModal  =  false
			},
		}
	}
</script>

<style>
.focuslis-scroll{
	height: calc(100vh - 44px - var(--status-bar-height));
}
</style>
