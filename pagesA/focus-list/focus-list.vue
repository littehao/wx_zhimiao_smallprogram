<template>
	<view class="focuslist-page bgF7F8FA h-100vh flex flex-column">
		<comheader  title="关注列表"></comheader>
		<view class="focuslis-scroll">
			<mescroll-uni ref="mescrollRef"  :fixed="false" @init="mescrollInit" @down="downCallback" @up="upCallback"
				:down="downOption" :up="upOption" @scroll="scrollFn">
				<view class="px-32 bgffff" v-if="focusList.length > 0">
					<block  v-for="item in focusList" :key="item.id">
					  <view class="flex py-3" @click="navTo(item)">
						<view class="position-relative mr-2" style="width:40px;height:40px;">
							<image class="rounded-circle bgF2F3F5 flex" :src="item.wxHeadPortrait" mode="aspectFill"  style="width:40px;height:40px;"></image>
							<image class="position-absolute right-0 bottom-0" src="/static/images/level.png" mode="widthFix" style="width: 20px;height: 20px;"></image>
						</view>
						<view class="flex flex-column flex-1">
							<text class="mb-1 ft1D2129 fs-28">{{item.attentionUserName}}</text>
							<view class="flex align-center">
								<text class="fs-24 ft4E5969 mr-1">诚信值: {{item.integrityValue}}</text>
								<text class="fs-24 ft4E5969">等级: {{item.skillValue}}</text>
							</view>
						</view>
						<view class="fs-24 ftffff flex align-center justify-center rounded bgFCB6A4" style="width: 60px;height: 24px;" @click.stop="focusItemFn(item)">已关注</view>
					  </view>
					</block>
				</view>
				<template v-else>
					<tui-no-data :fixed="false" :imgUrl="`https://zm.zgzhm.com/mini/img/img_nodata.png`" :marginBottom="0" :imgWidth="300" :imgHeight="300">
						<text class="fs-28">暂无数据</text>
					</tui-no-data>
				</template>
			</mescroll-uni>
		</view>
		
		<!--取消关注-->
		<tui-modal :show="focusModal" custom padding="0">
			<view class="flex flex-column pt-5">
				<view class="position-relative mr-2 mx-auto mb-2" style="width:40px;height:40px;">
				    <image class="rounded-circle" :src="`https://zm.zgzhm.com/mini/img/avatar.png`" mode="aspectFill"  style="width:40px;height:40px;"></image>
				    <image class="position-absolute right-0 bottom-0" src="/static/images/level.png" mode="widthFix" style="width: 20px;height: 20px;"></image>
				</view>
				<view class="flex align-center justify-center fs-32 ft1D2129 pb-3">你将不再关注<text class="f-w-b">{{focusInfo.attentionUserName}}</text></view>
				<view class="flex align-center border-top" style="height: 56px;">
					<view class="flex align-center justify-center ft000000 fs-28 flex-1 h-100" @click="focusModal = false">取消</view>
					<view class="flex align-center justify-center ftF85241 fs-28 border-left flex-1 h-100"  @click="comfirmFocusFn">取消关注</view>
				</view>
			</view>
		</tui-modal>
	</view>
</template>

<script>
	import { mapActions } from 'vuex' 
	export default {
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
				focusModal:false,
				focusInfo:'',
				focusList:[]
			}
		},
		methods: {
			...mapActions(['getmyFollowList','cancelAttention']),
			async getmyFollowListFn(page){
				try{
					let data = {
						pageNum:page,
						pageSize:20
					}
					let res = await this.getmyFollowList(data)
					let list = res.data
					const hasNext = list.length > 14
					if(page == 1){
						this.focusList = list
					} else {
						this.focusList = this.focusList.concat(list)
					}
					this.mescroll.endSuccess(list.length, hasNext);
				}catch(e){
					this.mescroll.endSuccess(this.focusList.length, false);
					//TODO handle the exception
				}
			},
			async cancelAttentionFn(){ // 取消关注
				try{
					let data = {
						attentionUserId:this.focusInfo.attentionUserId,
						attentionUserName:this.focusInfo.attentionUserName
					}
					let res = await this.cancelAttention(data)
					this.mescroll.resetUpScroll();
					this.focusModal  =  false
					this.tui.toast(res.msg)
				}catch(e){
					this.tui.toast(e.msg)
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
				this.getmyFollowListFn(mescroll.num)
			},
			focusItemFn(item){ // 当前取消用户信息
				this.focusInfo  = item
				this.focusModal  =  true
			},
			comfirmFocusFn(){
				this.cancelAttentionFn();
			},
			navTo(item){
				uni.navigateTo({
					url:'/pagesA/user/user?userId='+item.attentionUserId
				})
			}
		}
	}
</script>

<style>
.focuslis-scroll{
	height: calc(100vh - 44px - var(--status-bar-height));
}
</style>
