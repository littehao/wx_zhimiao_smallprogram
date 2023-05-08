<template>
	<view class="fanslist-page bgF7F8FA h-100vh flex flex-column">
		<comheader  title="粉丝列表"></comheader>
		<view class="fanslist-scroll">
			<mescroll-uni ref="mescrollRef"  :fixed="false" @init="mescrollInit" @down="downCallback" @up="upCallback"
				:down="downOption" :up="upOption" @scroll="scrollFn">
				<view class="px-32 bgffff" v-if="focusList.length > 0">
					<block  v-for="item in focusList" :key="item.id">
					  <view class="flex py-3" @click="navTo(item)">
						<view class="position-relative mr-2" style="width:40px;height:40px;">
							<image class="rounded-circle flex bgF2F3F5" :src="item.wxHeadPortrait" mode="aspectFill"  style="width:40px;height:40px;"></image>
							<image class="position-absolute right-0 bottom-0" src="/static/images/level.png" mode="widthFix" style="width: 20px;height: 20px;"></image>
						</view>
						<view class="flex flex-column flex-1">
							<text class="mb-1 ft1D2129 fs-28">{{item.wxUserName}}</text>
							<view class="flex align-center">
								<text class="fs-24 ft4E5969">诚信值: {{item.integrityValue}}</text>
								<text class="fs-24 ft4E5969">等级: {{item.skillValue}}</text>
							</view>
						</view>
						<view class="fs-24 ftffff flex align-center justify-center rounded" :class="item.concernedOrNot == 1?'bgFCB6A4':'bgF85241'" style="width: 60px;height: 24px;" @click.stop="followItemFn(item)">{{item.concernedOrNot == 1?'已关注':'回粉'}}</view>
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
						use: true
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
			...mapActions(['getfollowMyList','getFollow','cancelAttention']),
			async getfollowMyListFn(page){
				try{
					let data = {
						pageNum:page,
						pageSize:20
					}
					let res = await this.getfollowMyList(data)
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
			async followFn(item){  // 关注
				try{
					let data = {
						attentionUserId:item.userId,
						attentionUserName:item.userName
					}
					let res = await this.getFollow(data)
					this.mescroll.resetUpScroll();
					this.tui.toast(res.msg)
				}catch(e){
					this.tui.toast(e.msg)
					//TODO handle the exception
				}
			},
			async cancelAttentionFn(item){ // 取消关注
				try{
					let data = {
						attentionUserId:item.userId,
						attentionUserName:item.userName
					}
					let res = await this.cancelAttention(data)
					this.mescroll.resetUpScroll();
					this.tui.toast(res.msg)
				}catch(e){
					this.tui.toast(e.msg)
					//TODO handle the exception
				}
			},
			followItemFn(item){ // 关注 
				if(item.concernedOrNot ==  1){
					this.cancelAttentionFn(item)
				} else {
					this.followFn(item)
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
				this.getfollowMyListFn(mescroll.num)
			},
			comfirmFocusFn(){
				this.focusModal  =  false
			},
			navTo(item){
				uni.navigateTo({
					url:'/pagesA/user/user?userId='+item.userId
				})
			}
		}
	}
</script>

<style>
.fanslist-scroll{
	height: calc(100vh - 44px - var(--status-bar-height));
}
</style>
