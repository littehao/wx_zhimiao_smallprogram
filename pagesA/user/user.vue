<template>
	<view class="bgF7F8FA h-100vh flex flex-column">
		<view class="flex flex-column bglinear" >
			<view class="position-fixed top-0 left-0 right-0 z-index1030">
				<comheader :bgColor="scrollTop > 44"  title="用户主页"></comheader>	
			</view>
			<view :style="{'height':(getNavHeight+getNavTop)+'px'}"></view>
			<view class="flex align-center px-32 mt-4">
				<view class="position-relative mr-2">
				    <image class="rounded-circle" src="/static/images/avatar.png" mode="aspectFill"  style="width:64px;height:64px;"></image>
				    <image class="position-absolute right-0 bottom-0" src="/static/images/level.png" mode="widthFix" style="width: 20px;height: 20px;"></image>
				</view>
				<view class="flex flex-column flex-1">
					<text class="fs-40 ftffff mb-1">彭达敏</text>
					<text class="ftffff fs-28">13888888888</text>
				</view>
				<view class="flex align-center">
					<text class="fs-24 ftffff mr-1 border px-3 py-1">关注</text>
				</view>
			</view>
			<view class="flex align-center justify-around py-3">
				<view class="flex flex-column">
					<text class="fs-28 ftFED3C6 mb-1">等级</text>
					<text class="ftffff fs-32">皇冠</text>
				</view>
				<view class="flex flex-column">
					<text class="fs-28 ftFED3C6 mb-1">技能量</text>
					<text class="ftffff fs-32">80</text>
				</view>
				<view class="flex flex-column" @click="navToFocusList">
					<text class="fs-28 ftFED3C6 mb-1">关注</text>
					<text class="ftffff fs-32">80</text>
				</view>
				<view class="flex flex-column"  @click="navToFansList">
					<text class="fs-28 ftFED3C6 mb-1">粉丝</text>
					<text class="ftffff fs-32">1.1万</text>
				</view>
			</view>
		</view>
		
		<view class="flex">
			<tui-tabs backgroundColor="transparent" selectedColor="#F85241" color="#4E5969" :padding="0" sliderBgColor="#F85241" :tabs="tabs" :currentTab="currentTab" itemWidth="33%" @change="changeTab"></tui-tabs>
		</view>
		<template v-if="currentTab  == 0">
			<view class="flex flex-column px-32  bgffff">
				<view class="flex align-center border-bottom py-3">
					<text class="fs-28  ft1D2129 f-w-b" style="width: 80px;">年龄</text>
					<text class="fs-28 ft1D2129 flex-1">22</text>
					
				</view>
				<view class="flex align-center border-bottom py-3">
					<text class="fs-28  ft1D2129 f-w-b" style="width: 80px;">性别</text>
					<text class="fs-28 ft1D2129 flex-1">男</text>
					
				</view>
				<view class="flex align-center border-bottom py-3">
					<text class="fs-28  ft1D2129 f-w-b" style="width: 80px;">所在地</text>
					<text class="fs-28 ft1D2129 flex-1">四川省-成都市-武侯区</text>
					
				</view>
				<view class="flex align-center border-bottom py-3">
					<text class="fs-28  ft1D2129 f-w-b" style="width: 80px;">民族</text>
					<text class="fs-28 ft1D2129 flex-1">汉族</text>
					
				</view>
				<view class="flex align-center border-bottom py-3">
					<text class="fs-28  ft1D2129 f-w-b" style="width: 80px;">学历</text>
					<text class="fs-28 ft1D2129 flex-1">本科</text>
					
				</view>
				<view class="flex align-center border-bottom py-3">
					<text class="fs-28  ft1D2129 f-w-b" style="width: 80px;">标签</text>
					<view class="fs-28 ft1D2129 flex-1 flex flex-wrap">
						<block v-for="(item,index) in labels" :key="index">
							<text class="fs-28 ft1D2129 px-2 py-1 bgF2F3F5 mr-2 mb-1 rounded">{{item}}</text>
						</block>
					</view>
					
				</view>
				<view class="myintro border-bottom pb-4">
					<view class="flex align-center justify-between py-2">
						<text class="fs-28  ft1D2129 f-w-b" style="width: 80px;">个人简介</text>
					</view>
					<view class="flex flex-wrap">
						<text class="ft4E5969 fs-28 lineh44" style="min-height: 200rpx;">新华社北京4月10日电  国家主席习近平10日晚同委内瑞拉总统马杜罗通电话。马杜罗表示，中方抗击新冠肺炎疫情斗争取得重大阶段性成果，中方成功做法值得委方学习借鉴。委内瑞拉珍视同中国的全面战略伙伴关系，希望同中国继续加强合作，共同推进构建人类命运共同体。</text>
					</view>	
				</view>
				<view style="height: 50px;"></view>
			</view>
		</template>
		<template v-if="currentTab  == 1">
			<view class="px-32">
			  <block  v-for="item in 2" :key="item">
			    <indexCard></indexCard>
			  </block>
			</view>
		</template>
		<template v-if="currentTab == 2">
			<view class="px-32">
			  <block  v-for="item in 3" :key="item">
			    <indexCard></indexCard>
			  </block>
			</view>
		</template>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				scrollTop:0,
				isFixedSearch:false,
				currentTab:0,
				tabs:[
					{name:'个人信息'},
					{name:'发布的需求'},
					{name:'承接的需求'}
				],
				labels:["标签01","标签02"]
			}
		},
		computed:{
			...mapGetters(['getNavHeight','getNavTop','getSafeAreaBottom'])
		},
		onPageScroll(e){
			this.scrollTop = e.scrollTop
		},
		methods: {
			changeTab(e){
				this.currentTab = e.index
			},
			navToFocusList(){
				uni.navigateTo({
					url:'/pagesA/focus-list/focus-list'
				})
			},
			navToFansList(){
				uni.navigateTo({
					url:'/pagesA/fans-list/fans-list'
				})
			},
		}
	}
</script>

<style>

</style>
