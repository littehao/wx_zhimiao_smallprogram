<template>
	<view class="index-page bgF7F8FA h-100" id="index-page">
	<mescroll-uni ref="mescrollRef" height="100%" @init="mescrollInit" @down="downCallback" @up="upCallback"
		:down="downOption" :up="upOption" @scroll="scrollFn">
	  <view class="bglinear top-radius position-absolute left-0 right-0 top-0"></view>
	  <view class="position-relative pb-4" :style="{'padding-top':getNavTop+'px'}">
	    <view class="welcome fs-40 px-32 border-box ">你好，欢迎来到职苗</view>
		<view v-if="isFixedSearch" class="position-fixed top-0 left-0 right-0 bglinear" style="z-index: 1;" :style="{height: getNavHeight+'px'}"></view>
	    <!--搜索-->
		<tui-sticky  :scrollTop="scrollTop" :stickyTop="getNavTop" @sticky="searchSticky" >
			<template v-slot:header>
				<view class="flex px-32 border-box">
				  <!--#ifdef MP-WEIXIN-->
				  <view class="flex align-center" @click="selectCityNavTo">
				    <text class="city fs-28 ftffff">{{cityValue}}</text>
				    <tui-icon  size="28" unit="rpx"  color="#fff" name="arrowdown"></tui-icon>
				  </view>
				  <view class="flex rounded bgffff header-rearch px-2 ml-2" 
				  :class="isFixedSearch?'':'flex-1'" 
				  :style="{width:getMenuButtonObject.left-30-((132/52)*(getNavHeight-getNavTop-5)) +'px'}"
				  @click="searchTo"
				  >
				    <input class="weui-input flex-1"  disabled v-model="searchValue" placeholder-class="placeholder" placeholder="搜索需求或用户"/>
					<tui-icon  size="28" unit="rpx"  color="#4E5969" name="search"></tui-icon>
				  </view>
				  <!--  #endif -->
				  <!--#ifdef H5-->
				  <view class="flex align-center mt-2" @click="selectCityNavTo">
				    <text class="city fs-28 ftffff">{{cityValue}}</text>
				    <tui-icon  size="28" unit="rpx"  color="#fff" name="arrowdown"></tui-icon>
				  </view>
				  <view class="flex rounded bgffff header-rearch px-2 ml-2 flex-1 mt-2"  @click="searchTo">
				    <input class="weui-input flex-1" disabled v-model="searchValue"	placeholder-class="placeholder" placeholder="搜索需求或用户"/>
				  	<tui-icon  size="28" unit="rpx"  color="#4E5969" name="search"></tui-icon>
				  </view>
				  <!--  #endif -->
				</view>
			</template>
		</tui-sticky>
	  </view>
	  
	  <view class="px-32">
	    <!--banner-->
	    <swiper class="index-swiper" indicator-dots="true" indicator-active-color="#fff" autoplay circular>
	      <swiper-item wx:for="item in 3" wx:key="item" class="swiper-item rounded">
	        <image class="rounded" mode="aspectFill" bindtap="tapBanner" style="width: 100%;height: 100%;" data-url="/static/images/banner1.png" src="/static/images/banner1.png" />
	      </swiper-item>
	    </swiper>
	  </view>
	  <tui-sticky :scrollTop="scrollTop" :stickyTop="getNavHeight" @sticky="tabSticky">
	  	<template v-slot:header>
	  		<view class="flex pr-3 position-relative" :style="{'background-color':istabSticky?'#fff':''}">
	  		  <view class="flex-1">
	  			<tui-tabs unlined selectedColor="#F85241" :size="32" :height="92" sliderBgColor="#F85241"  color="#4E5969" backgroundColor="transparent" :width="150" :padding="0" :tabs="tabs" :currentTab="currentTab" itemWidth="50%" @change="change"></tui-tabs>
	  		  </view>
	  		  <view class="flex align-center flex-1 justify-end" style="width: 100px;" @click="showNear">
	  			<text class="fs-28" :class="textNear == '附近'?'ft86909C':'ft1D2129'">{{textNear}}</text>
	  			<tui-icon  size="28" unit="rpx"  color="#86909C" name="arrowdown"></tui-icon>
	  		  </view>
			  <!---附近-->
			  <view v-if="isShowNear" class="position-fixed top-0 right-0 bottom-0 left-0 z-index1030" @click="isShowNear = false"></view>
			  <view v-if="isShowNear" class="bgffff rounded position-absolute right-0 border z-index1030" style="width: 124px;top:100%">
			  	<block v-for="item in nearList" :key="item">
					<view class="fs-24 ft1D2129 py-1 px-1" @click="changeNear(item)">{{item}}</view>
				</block>
			  </view>
	  		</view>
	  	</template>
	    
	  </tui-sticky>
	  <view class="px-32">
	    <block  v-for="item in 6" :key="item">
	      <indexCard></indexCard>
	    </block>
	  </view>
	</mescroll-uni>
	 
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				scrollTop:0,
				searchValue:'',
				currentTab:0,
				isFixedSearch:false,//判断是否吸顶
				istabSticky:false, // 判断tab是否吸顶
				topStyle:'',
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
				tabs:[
					{name:'推荐'},
					{name:'最新发布'},
				],
				cityValue:'成都市',
				textNear:'附近',
				nearList:['1公里','3公里','5公里','10公里'],
				isShowNear:false,//附近
			}
		},
		computed:{
			...mapGetters(['getNavHeight','getNavTop','getMenuButtonObject'])
		},
		onShow() {
			let that = this
			uni.$on('updateData',function(data){
				that.cityValue  = data.name
			})
		},
		created() {
			this.topStyle ={
				height:(this.getNavHeight + 5)+'px',
				paddingTop:this.getNavTop+'px',
				background:'linear-gradient(180deg, #F85241 49.75%, #F29F63 100%)'
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
			showNear(){ // 显示附近
				this.isShowNear = true
			},
			changeNear(text){
				this.textNear = text
				this.isShowNear = false
			},
			searchSticky(e){ // 搜索判断是否吸顶
				this.isFixedSearch = e.isFixed
			},
			tabSticky(e){	// 判断tab是否吸顶
				this.istabSticky = e.isFixed
			},
			change(e){
				this.currentTab = e.index
			},
			selectCityNavTo(){
				uni.navigateTo({
					url:'/pagesA/select-city/select-city'
				})
			},
			searchTo(){
				uni.navigateTo({
					url:'/pagesA/search/search'
				})
			}
		}
	}
</script>

<style scoped>
.top-radius{
    height: 199px;
    border-radius: 0px 0px 55px 55px;
}
.welcome{
    font-family: PingFang SC-Semibold, PingFang SC;
    font-weight: 600;
    color: #FFFFFF;
    height: 40px;
    line-height: 30px;
}
.header-rearch{
    height: 32px;
    line-height: 32px;
}
.header-rearch  .weui-input{
    height: 32px;
    line-height: 32px;
}
.index-swiper{
    height: 280rpx;
}
.van-tabs__scroll {
    background-color: transparent !important;
}
	
</style>
