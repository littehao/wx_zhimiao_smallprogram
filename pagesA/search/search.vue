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
						@focus="searchFocus" 
						@blur="searchBlur" 
						>
					</tui-input>
				</view>
				<view class="flex align-center justify-center bgF2F3F5 rounded-right border-left" style="width: 46px;height: 36px;">
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
						<view class="px-32 py-2">
							<block  v-for="item in 6" :key="item">
							  <indexCard></indexCard>
							</block>
						</view>
					</mescroll-uni>
				</template>
				<template v-if="currentTab == 1">
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
						<text class="fs-28 ft4E5969 p-1 mr-2 bgF2F3F5 mb-2 rounded">{{item}}</text>	
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
					textNoMore: '暂无更多商品',
					toTop: {
						safearea: true,
						bottom: "15%"
					}
				},
				downOption: {
					auto: false
				},
				historyList:['搜索历史','灯具安装','标签字数过多展示换行','办公电脑出租',],
				clearHistoryModal:false,
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
			comfirmFn(){  // 确认清空
				this.clearHistoryModal = false
			},
			focusItemFn(item){ // 当前取消用户信息
				this.focusInfo  = item
				this.focusModal  =  true
			},
			comfirmFocusFn(){
				this.focusModal  =  false
			},
			searchBlur(){ // 失去焦点状态
				this.isBlur = true
			},
			searchFocus(){ // 获取焦点状态
				this.isBlur = false
			},
			change(e){
				this.currentTab = e.index
			}
		}
	}
</script>

<style lang="scss">
.search-scroll{
	height: calc(100vh - 97px - 44px - var(--status-bar-height));
}
</style>
