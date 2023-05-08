<template>
	<view class="index-page bgF7F8FA h-100" id="index-page">
		<comscroll
		ref="comscroll"
		@loadData="loadData"
		@scrollFn="scrollFn"
		:isSuccess="isSuccess"
		:datalen="datalen"
		>
			<view class="bglinear top-radius position-absolute left-0 right-0 top-0"></view>
			<view class="position-relative pb-3" :style="{'padding-top':getNavTop+'px'}">
				<view class="welcome fs-40 px-32 border-box ">
					<image src="https://zm.zgzhm.com/mini/img/zhimiao.png" mode="widthFix" style="width:70px;height: 24px;"></image>
				</view>
				<view v-if="isFixedSearch" class="position-fixed top-0 left-0 right-0 bglinear" style="z-index: 1;"
					:style="{height: getNavHeight+'px'}"></view>
				<!--搜索-->
				<tui-sticky :scrollTop="scrollTop" :stickyTop="getNavTop" @sticky="searchSticky">
					<template v-slot:header>
						<view class="flex px-32 border-box">
							<!--#ifdef MP-WEIXIN-->
							<view class="flex align-center" @click="selectCityNavTo">
								<image src="/static/images/dingwei1.png" mode="aspectFill" style="width:25rpx;height: 36rpx;"></image>
								<text class="city fs-28 ftffff text-ellipsis ml-1" style="max-width: 100rpx;">{{curCity.cityName}}</text>
								<tui-icon size="28" unit="rpx" color="#fff" name="arrowdown"></tui-icon>
							</view>
							<view class="flex rounded-circle bgffff header-rearch px-2 ml-1" :class="isFixedSearch?'':'flex-1'"
								:style="{width:getMenuButtonObject.left-30-((132/52)*(getNavHeight-getNavTop-5)) +'px'}"
								@click="searchTo">
								<tui-icon size="28" unit="rpx" color="#4E5969" name="search"></tui-icon>
								<input class="weui-input flex-1 ml-1" disabled v-model="searchValue"
									placeholder-class="placeholder" placeholder="搜索需求或用户" />
							</view>
							<!--  #endif -->
							<!--#ifdef H5-->
							<view class="flex align-center mt-2" @click="selectCityNavTo">
								<text class="city fs-28 ftffff text-ellipsis" style="max-width: 100rpx;">{{curCity.cityName}}</text>
								<tui-icon size="28" unit="rpx" color="#fff" name="arrowdown"></tui-icon>
							</view>
							<view class="flex rounded-circle bgffff header-rearch px-2 ml-2 flex-1 mt-2" @click="searchTo">
								<tui-icon size="28" unit="rpx" color="#4E5969" name="search"></tui-icon>
								<input class="weui-input flex-1 ml-1" disabled v-model="searchValue"
									placeholder-class="placeholder" placeholder="搜索需求或用户" />
							</view>
							<!--  #endif -->
						</view>
					</template>
				</tui-sticky>
			</view>
		
			<view class="px-2 bgF7F8FA rounded-top-lg position-relative pt-2" style="height: 300rpx;">
				<!--banner-->
				<swiper class="index-swiper" indicator-dots="true" indicator-active-color="#fff" autoplay circular>
					<swiper-item class="swiper-item rounded bgffff" v-for="item in bannerList" :key="item.id">
						<template v-if="item.compressedGraphHttpPath">
							<image @click="bannerTo(item)" class="rounded" mode="aspectFill" bindtap="tapBanner"
								style="width: 100%;height: 100%;" :data-url="item.compressedGraphHttpPath"
								:src="item.compressedGraphHttpPath" />
						</template>
						<view v-else class="h-100"  style="background-color: rgba(242, 159, 99, 0.9);"></view>
					</swiper-item>
				</swiper>
			</view>
			<tui-sticky :scrollTop="scrollTop" :stickyTop="getNavHeight" @sticky="tabSticky">
				<template v-slot:header>
					<view class="flex pr-3 position-relative"
						:style="{'background-color':istabSticky?'#fff':''}">
						<view class="flex-1 pl-2">
							<tui-tabs :zIndex="1" unlined selectedColor="#F85241" :size="32" :height="92"
								sliderBgColor="#F85241" color="#4E5969" backgroundColor="transparent" :width="150"
								:padding="0" :tabs="tabs" :currentTab="currentTab" itemWidth="50%" @change="change">
							</tui-tabs>
						</view>
						<view class="flex align-center flex-1 justify-end" style="width: 100px;"
							@click="isShowNear = true">
							<text class="fs-28 text-ellipsis text-right" style="width: 200rpx;" v-if="customAxis"
								:class="curtextNear == 4?'ft86909C':'ft1D2129'">{{customAxis.title}}</text>
							<text class="fs-28" v-else
								:class="curtextNear == 4?'ft86909C':'ft1D2129'">{{nearList[curtextNear]['text']}}</text>
							<tui-icon size="28" unit="rpx" color="#86909C" name="arrowdown"></tui-icon>
						</view>
						<!---附近-->
						<view v-if="isShowNear" class="position-fixed top-0 right-0 bottom-0 left-0 z-index1030"
							@click="isShowNear = false"></view>
						<view v-if="isShowNear" class="bgffff rounded position-absolute border z-index1030 pt-2"
							style="width: 100px;top:100%;right:10rpx">
							<block v-for="(item,index) in nearList" :key="index">
								<view class="fs-28 ft1D2129 mb-3 px-2" @click="changeNear(index)">{{item.text}}</view>
							</block>
						</view>
					</view>
				</template>
		
			</tui-sticky>
			<view class="px-32 position-relative pt-3">
				<template v-if="demandList.length > 0">
					<block v-for="item in demandList" :key="item.id">
						<indexCard :item="item"></indexCard>
					</block>
				</template>
				<template v-else>
					<tui-no-data :fixed="false" :imgUrl="`https://zm.zgzhm.com/mini/img/img_nodata.png`" :marginBottom="0" :imgWidth="300"
						:imgHeight="300">
						<text class="fs-28">暂无数据</text>
					</tui-no-data>
				</template>
			</view>
			<view :style="{height:getSafeAreaBottom+'px'}"></view>
		</comscroll>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	import { distance } from '@/utils/common.js'
	import comscroll from '@/components/comscroll/comscroll.vue'
	export default {
		components:{comscroll},
		data() {
			return {
				scrollTop: 0,
				searchValue: '',
				currentTab: 0,
				isFixedSearch: false, //判断是否吸顶
				istabSticky: false, // 判断tab是否吸顶
				bannerList: [], //轮播图列表
				tabs: [{
						name: '热门推荐'
					},
					{
						name: '最新发布'
					},
				],
				curCity: {
					lat: 0,
					lng: 0,
					cityName:"成都",
				},//当前选中的城市
				curtextNear: 4,
				nearList: [{
						type: 0,
						text: '1公里',
						label: 1
					},
					{
						type: 1,
						text: '3公里',
						label: 3
					},
					{
						type: 2,
						text: '5公里',
						label: 5
					},
					{
						type: 3,
						text: '10公里',
						label: 10
					},
					{
						type: 4,
						text: '附近',
						label: '附近'
					},
					{
						type: 5,
						text: '自定义位置',
						label: '自定义位置'
					}
				],
				isShowNear: false, //附近
				demandList: [], //推荐列表
				isSuccess:false,
				datalen:0,
			}
		},
		computed: {
			...mapGetters(['getNavHeight', 'getNavTop', 'getMenuButtonObject', 'getAxis', 'getSafeAreaBottom',
				'customAxis','currentLocation'])
		},
		watch:{
			currentLocation(val){
				if(val){
					this.curCity = val
					this.getRotationChartListFn()
					this.getMyHomeRecommendationListFn()
				}
			},
			customAxis(val){// 自定义位置
				if(val){
					this.isShowNear = false
					this.curCity = {
						lat: val.location.lat,
						lng: val.location.lng,
						cityName: val.city,
					}
					this.getRotationChartListFn()
					this.getMyHomeRecommendationListFn()
				}
			}
		},
		created() {
				if(this.currentLocation){
					this.curCity = this.currentLocation
				} else {
					if(this.tui.getStorage('currentLocation')){
						this.curCity = JSON.parse(this.tui.getStorage('currentLocation'))
					}
					this.$store.commit('setcurrentLocation',this.curCity)
					this.tui.setStorage('currentLocation', JSON.stringify(this.curCity))
				}
				this.getRotationChartListFn()
				this.getMyHomeRecommendationListFn()
				const _this = this
				uni.$on('updateData', function(data) {
					if(data.type == 'home'){
						this.$store.commit('setcustomAxis',null)
						_this.curCity = {
							lat: data.item.location.lat,
							lng: data.item.location.lng,
							cityName:data.item.name,
						}
						_this.getRotationChartListFn()
						_this.getMyHomeRecommendationListFn()
					}
				})
		},
		methods: {
			...mapActions(['getRotationChartList', 'getMyHomeRecommendationList', 'getNewestList', ]),    
			async getRotationChartListFn() { //获取轮播图
				try {
					let res = await this.getRotationChartList({city:this.curCity.cityName})
					let list = res.data
					if(list.length > 0){
						this.bannerList = list
					} else {
						this.bannerList = [1,2]
					}
					
				} catch (e) {
					//TODO handle the exception
				}
			},
			loadData(){
				if (this.currentTab == 1) {
					this.getNewestListFn()
				} else {
					this.getMyHomeRecommendationListFn()
				}
			},
			async getMyHomeRecommendationListFn() { // 推荐列表 
				try {
					let data = {
						sortOrder: 1,
						xAxis:this.curCity.lat,
						yAxis:this.curCity.lng,
					}
					if (this.curtextNear < 4) data.distance = this.nearList[this.curtextNear]['label']
					this.isSuccess = false
					console.log(data)
					let res = await this.getMyHomeRecommendationList(data)
					this.isSuccess = true
					const {
						myRelease,
						recommendation
					} = res.data
					this.demandList = []
					let list = []
					if (myRelease) {
						 list = myRelease.concat(recommendation)
						 list.forEach(item => {
							 item.distance = distance(item.xaxis,item.yaxis,this.curCity)
						 })
					} else {
						list = recommendation
						list.forEach(item => {
							item.distance = distance(item.xaxis,item.yaxis,this.curCity)
						})
					}
					this.datalen = list.length
					this.demandList = list
				} catch (e) {
					console.log(e)
					this.isSuccess = true
					//TODO handle the exception
				}
			},
			async getNewestListFn() { // 最新列表
				try {
					let data = {
						xAxis:this.curCity.lat,
						yAxis:this.curCity.lng,
					}
					if (this.curtextNear < 4) data.distance = this.nearList[this.curtextNear]['label']
					this.isSuccess = false
					let res = await this.getNewestList(data)
					this.isSuccess = true
					this.demandList = []
					let list = res.data
					list.forEach(item => {
							item.distance = distance(item.xaxis,item.yaxis,this.curCity)
					})
					this.demandList = list
					this.datalen = list.length
					
				} catch (e) {
					this.isSuccess = true
					//TODO handle the exception
				}
			},
			scrollFn(mescroll) {
				this.scrollTop = mescroll.scrollTop
			},
			changeNear(index) {
				if (index == 5) {
					uni.navigateTo({
						url: '/pagesA/location/location?from=home'
					})
					return
				}
				this.isShowNear = false
				this.curtextNear = index
				this.$refs.comscroll.downCallback()
			},
			searchSticky(e) { // 搜索判断是否吸顶
				this.isFixedSearch = e.isFixed
			},
			tabSticky(e) { // 判断tab是否吸顶
				this.istabSticky = e.isFixed
			},
			change(e) {
				this.currentTab = e.index
				this.$refs.comscroll.downCallback()
			},
			selectCityNavTo() {
				uni.navigateTo({
					url: '/pagesA/select-city/select-city'
				})
			},
			searchTo() {
				uni.navigateTo({
					url: '/pagesA/search/search'
				})
			},
			bannerTo(item) { //banner点击跳转地址
				if (!item.additionalAttributes.url.includes('http://') && !item.additionalAttributes.url.includes(
						'https://')) return
				uni.navigateTo({
					url: '/pagesA/web-view/web-view?url=' + item.additionalAttributes.url
				})
			}
		}
	}
</script>

<style scoped>
	.top-radius {
		height: 199px;
		border-radius: 0px 0px 55px 55px;
	}

	.welcome {
		font-family: PingFang SC-Semibold, PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		height: 40px;
		line-height: 30px;
	}

	.header-rearch {
		height: 32px;
		line-height: 32px;
	}

	.header-rearch .weui-input {
		height: 32px;
		line-height: 32px;
	}

	.index-swiper {
		height: 300rpx;
	}

	.van-tabs__scroll {
		background-color: transparent !important;
	}
</style>
