<template>
	<view class="search-page h-100vh bgF7F8FA flex flex-column">
		<comheader  title="搜索"></comheader>	
		<view class="border-bottom bgffff">
			<view class="flex align-center mx-32 py-2">
				<view class="flex flex-1 align-center px-1 rounded-left border" 
				:class="[isBlur?'bdtransparent bgF2F3F5':(isBlur && searchValue)?'bdtransparent bgF2F3F5':'rounded-right bgffff bdF85241']" 
				style="width: 46px;height: 34px;">
					<tui-input
						padding="0" 
						:borderBottom="false" 
						:size="28" 
						focus 
						backgroundColor="transparent"
						placeholder="请输入" 
						placeholderStyle="color: #86909C;font-size: 14px;" 
						clearable 
						v-model="searchValue"
						@confirm="searchFn"
						@focus="searchFocus" 
						@blur="searchBlur" 
						>
					</tui-input>
				</view>
				<view class="flex align-center justify-center bgF2F3F5 rounded-right border-left" style="width: 46px;height: 36px;" @click="searchFn">
					<tui-icon size="22" color="#4E5969" name="search"></tui-icon>
				</view>
			</view>
			<template v-if="isBlur && searchValue">
				<view class="flex justify-center">
					<tui-tabs unlined :width="200" selectedColor="#F85241" color="#4E5969" sliderBgColor="#F85241" :tabs="tabs" :currentTab="currentTab" itemWidth="50%" @change="change"></tui-tabs>
				</view>
			</template>
		</view>	
		<template v-if="isBlur && searchValue">
			<view class="search-scroll">
				<template v-if="currentTab == 0">
					<mescroll-uni ref="mescrollRef"  :fixed="false" @init="mescrollInit" @down="downCallback" @up="upCallback"
						:down="downOption" :up="upOption" @scroll="scrollFn">
						<view class="px-32 py-2" v-if="demandList.length > 0">
							<block  v-for="item in demandList" :key="item.id">
							  <indexCard :item="item"></indexCard>
							</block>
						</view>
						<template v-else>
							<tui-no-data :fixed="false" :imgUrl="`https://zm.zgzhm.com/mini/img/null_nodata.png`" :marginBottom="0" :imgWidth="300" :imgHeight="300">
								<text class="fs-28">抱歉，没有搜到相关需求</text>
							</tui-no-data>
						</template>
					</mescroll-uni>
				</template>
				<template v-if="currentTab == 1">
					<mescroll-uni ref="mescrollRef"  :fixed="false" @init="mescrollInit" @down="downCallback" @up="upCallback"
						:down="downOption" :up="upOption" @scroll="scrollFn">
						<view class="px-32 bgffff" v-if="focusList.length">
							<block  v-for="item in focusList" :key="item.id">
							  <view class="flex py-3" @click="navToUserInfo(item)">
							  	<view class="position-relative mr-2" style="width:40px;height:40px;">
							  		<image class="rounded-circle bgF2F3F5 flex" :src="item.wxHeadPortrait" mode="aspectFill"  style="width:40px;height:40px;"></image>
							  		<image class="position-absolute right-0 bottom-0" src="/static/images/level.png" mode="widthFix" style="width: 20px;height: 20px;"></image>
							  	</view>
								<view class="flex flex-column flex-1">
									<text class="mb-1 ft1D2129 fs-28">{{item.name}}</text>
									<view class="flex align-center">
										<text class="fs-24 ft4E5969 mr-1">诚信值: {{item.integrityValue}}</text>
										<text class="fs-24 ft4E5969">等级: {{item.skillValue}}</text>
									</view>
								</view>
								<view class="fs-24 ftffff flex align-center justify-center rounded" :class="item.concernedOrNot == 1?'bgFCB6A4':'bgF85241'" style="width: 60px;height: 24px;" @click.stop="focusItemFn(item)">{{item.concernedOrNot == 1?'已关注':'关注'}}</view>
							  </view>
							</block>
						</view>
						<template v-else>
							<tui-no-data :fixed="false" :imgUrl="`https://zm.zgzhm.com/mini/img/null_nodata.png`" :marginBottom="0" :imgWidth="300" :imgHeight="300">
								<text class="fs-28">抱歉，没有搜到相关用户</text>
							</tui-no-data>
						</template>
					</mescroll-uni>
				</template>
			</view>
		</template>
		<template v-else>
			<view class="flex flex-column bgffff flex-1">
				<view class="flex align-center justify-between mx-32 py-32">
					<text class="fs-32 ft1D2129 f-w-b">搜索历史</text>
					<image src="/pagesA/static/images/clear.png" mode="widthFix" style="width: 16px;height: 16px;" @click="clearHistoryModal = true"></image>
				</view>
				<view class="flex flex-wrap  mx-32">
					<block v-for="item in  historyList"  :key="item">
						<text class="fs-28 ft4E5969 p-1 mr-2 bgF2F3F5 mb-2 rounded" @click="checkFn(item)">{{item}}</text>	
					</block>
				</view>
			</view>	
		</template>
		
		<!--清空搜索历史-->
		<tui-modal 
			:show="clearHistoryModal"  
			custom
			padding="0"
		>
			<view class="flex flex-column">
				<view class="flex justify-center align-center fs-32 ft000000" style="height: 88px;">确认清空搜索历史吗？</view>
				<view class="flex align-center border-top" style="height: 56px;">
					<view class="flex align-center justify-center ft000000 fs-28 flex-1 h-100" @click="clearHistoryModal = false">取消</view>
					<view class="flex align-center justify-center ftF85241 fs-28 border-left flex-1 h-100"  @click="comfirmFn">确定</view>
				</view>
			</view>
		</tui-modal>
		
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
	import { mapActions,mapGetters } from 'vuex'
	import tuiInput from '@/pagesA/components/tui-input/tui-input.vue'
	export default {
		components:{tuiInput},
		data() {
			return {
				searchValue:'',
				currentTab:0,
				isBlur:false, // 未失去焦点
				tabs:[
					{name:'需求'},
					{name:'用户'},
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
					toTop: {
						safearea: true,
						bottom: "15%"
					}
				},
				downOption: {
					auto: false
				},
				pageSize:15,
				demandList:[],//搜索需求列表
				clearHistoryModal:false,
				focusModal:false,
				focusInfo:'',
				focusList:[],//搜索用户列表
				historyList:[],//搜索历史
			}
		},
		computed:{
			...mapGetters(['currentLocation'])
		},
		created() {
			this.getSsearchHistoryListFn()
		},
		methods: {
			...mapActions(['selDemandSearchList','selUserSearchList','getSsearchHistoryList','delSsearchHistory','getFollow','cancelAttention']),
			async selDemandSearchListFn(page){ //  搜索需求
				try{
					let data = {
						content:this.searchValue,
						pageNum:page,
						pageSize:this.pageSize,
						sortOrder:1,
						xAxis:this.currentLocation.lat,
						yAxis:this.currentLocation.lng
					}
					let res = await this.selDemandSearchList(data)
					let list = res.data
					const hasNext = list.length > 14
					if(page == 1){
						this.demandList = list
					} else {
						this.demandList = this.demandList.concat(list)
					}
					this.getSsearchHistoryListFn()
					this.$nextTick(() => {
						this.mescroll.endSuccess(list.length, hasNext);
					})
				}catch(e){
					console.log(e)
					this.$nextTick(() => {
						this.mescroll.endSuccess(this.demandList.length, false);
					})
					//TODO handle the exception
				}
			},
			async selUserSearchListFn(page){ // 搜索用户
				try{
					let data = {
						content:this.searchValue,
						pageNum:page,
						pageSize:this.pageSize,
					}
					let res = await this.selUserSearchList(data)
					let list = res.data
					const hasNext = list.length > 14
					if(page == 1){
						this.focusList = list
					} else {
						this.focusList = this.focusList.concat(list)
					}
					this.getSsearchHistoryListFn()
					this.mescroll.endSuccess(list.length, hasNext);
				}catch(e){
					this.mescroll.endSuccess(this.focusList.length, false);
					//TODO handle the exception
				}
			},
			async getSsearchHistoryListFn(){ // 搜索历史
				try{
					let res = await this.getSsearchHistoryList()
					this.historyList = res.data
				}catch(e){
					//TODO handle the exception
				}
			},
			async delSsearchHistoryFn(){ // 清空历史
				try{
					let res = await this.delSsearchHistory()
					this.tui.toast(res.msg)
					this.clearHistoryModal = false
					this.getSsearchHistoryListFn()
				}catch(e){
					this.tui.toast(e.data.msg)
					//TODO handle the exception
				}
			},
			async followFn(){  // 关注
				try{
					let data = {
						attentionUserId:this.focusInfo.id,
						attentionUserName:this.focusInfo.name
					}
					let res = await this.getFollow(data)
					this.mescroll.resetUpScroll();
					this.tui.toast(res.msg)
				}catch(e){
					this.tui.toast(e.msg)
					//TODO handle the exception
				}
			},
			async cancelAttentionFn(){ // 取消关注
				try{
					let data = {
						attentionUserId:this.focusInfo.id,
						attentionUserName:this.focusInfo.name
					}
					let res = await this.cancelAttention(data)
					this.focusModal  =  false
					this.mescroll.resetUpScroll();
					this.tui.toast(res.msg)
				}catch(e){
					this.tui.toast(e.msg)
					//TODO handle the exception
				}
			},
			searchFn(){
				if(!this.searchValue){
					this.tui.toast('请输入搜索内容')
					return
				}
				this.mescroll && this.mescroll.setPageNum(1)
				if(this.currentTab == 1){
					this.selUserSearchListFn(1)
				} else {
					this.selDemandSearchListFn(1)
				}
			},
			checkFn(text){
				this.searchValue = text
				this.searchFn()
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
				if(this.currentTab == 1){
					this.selUserSearchListFn(mescroll.num)
				} else {
					this.selDemandSearchListFn(mescroll.num)
				}
			},
			comfirmFn(){  // 确认清空
				this.delSsearchHistoryFn()
			},
			focusItemFn(item){ // 当前取消用户信息
				this.focusInfo  = item
				if(item.concernedOrNot == 1){
					this.focusModal  =  true
				} else {
					this.followFn()
				}
				
			},
			comfirmFocusFn(){ // 取消关注
				this.cancelAttentionFn()
			},
			searchBlur(){ // 失去焦点状态
				this.isBlur = true
			},
			searchFocus(){ // 获取焦点状态
				this.isBlur = false
			},
			change(e){
				this.currentTab = e.index
				this.mescroll && this.mescroll.setPageNum(1)
				if(this.currentTab == 1){
					this.selUserSearchListFn(1)
				} else {
					this.selDemandSearchListFn(1)
				}
			},
			navToUserInfo(item){
				uni.navigateTo({
					url:'/pagesA/user/user?userId='+item.id
				})
			}
		}
	}
</script>

<style lang="scss">
.search-scroll{
	height: calc(100vh - 97px - 44px - var(--status-bar-height));
}
</style>
