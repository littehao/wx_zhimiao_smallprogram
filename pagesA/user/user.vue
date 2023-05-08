<template>
	<view class="bgF7F8FA flex flex-column user-page">
		<view class="flex flex-column bglinear" >
			<view class="position-fixed top-0 left-0 right-0 z-index1030">
				<comheader :bgColor="scrollTop > 44"  title="用户主页"></comheader>	
			</view>
			<view :style="{'height':(getNavHeight+getNavTop)+'px'}"></view>
			<view class="flex align-center px-32 mt-4">
				<view class="position-relative mr-2">
				    <image class="rounded-circle bgF2F3F5 flex" :src="userData.wxHeadPortrait" mode="aspectFill"  style="width:64px;height:64px;"></image>
				    <image class="position-absolute right-0 bottom-0" src="/static/images/level.png" mode="widthFix" style="width: 20px;height: 20px;"></image>
				</view>
				<view class="flex flex-column flex-1">
					<text class="fs-40 ftffff mb-1">{{userData.name}}</text>
					<text class="ftffff fs-28">{{userData.wxPhone}}</text>
				</view>
				<view class="flex align-center" v-if="!getUser || getUser.id != userData.id">
					<text class="fs-24 ftffff mr-1 px-3 py-1 rounded" :class="userData.concernedOrNot == 1?'bgFCB6A4':'border'" @click="$debounce(attentionFn)">{{userData.concernedOrNot == 1?'已关注':'关注'}}</text>
				</view>
			</view>
			<view class="flex align-center justify-around py-3">
				<view class="flex flex-column text-center">
					<text class="fs-28 ftFED3C6 mb-1">等级</text>
					<text class="ftffff fs-32">{{userData.skillValue}}</text>
				</view>
				<view class="flex flex-column text-center">
					<text class="fs-28 ftFED3C6 mb-1">诚信值</text>
					<text class="ftffff fs-32">{{userData.integrityValue}}</text>
				</view>
				<view class="flex flex-column">
					<text class="fs-28 ftFED3C6 mb-1">关注</text>
					<text class="ftffff fs-32">{{userData.numberOfConcerns}}</text>
				</view>
				<view class="flex flex-column">
					<text class="fs-28 ftFED3C6 mb-1">粉丝</text>
					<text class="ftffff fs-32">{{userData.numberOfPeopleConcerned}}</text>
				</view>
			</view>
		</view>
		
		<view class="flex">
			<tui-tabs backgroundColor="transparent" selectedColor="#F85241" color="#4E5969" :padding="0" 
			sliderBgColor="#F85241" 
			:tabs="tabs" 
			:currentTab="currentTab" itemWidth="33%" @change="changeTab"></tui-tabs>
		</view>
		<template v-if="currentTab  == 0">
			<view class="flex flex-column px-32  bgffff">
				<view class="flex align-center border-bottom py-3">
					<text class="fs-28  ft1D2129 f-w-b" style="width: 80px;">年龄</text>
					<text class="fs-28 ft1D2129 flex-1">{{userData.age || '保密'}}</text>
					
				</view>
				<view class="flex align-center border-bottom py-3">
					<text class="fs-28  ft1D2129 f-w-b" style="width: 80px;">性别</text>
					<text class="fs-28 ft1D2129 flex-1">{{userData.genderStr || '保密'}}</text>
					
				</view>
				<view class="flex align-center border-bottom py-3">
					<text class="fs-28  ft1D2129 f-w-b" style="width: 80px;">所在地</text>
					<text class="fs-28 ft1D2129 flex-1">{{userData.location || '保密'}}</text>
					
				</view>
				<view class="flex align-center border-bottom py-3">
					<text class="fs-28  ft1D2129 f-w-b" style="width: 80px;">民族</text>
					<text class="fs-28 ft1D2129 flex-1">{{userData.nameFamilyStr || '保密'}}</text>
					
				</view>
				<view class="flex align-center border-bottom py-3">
					<text class="fs-28  ft1D2129 f-w-b" style="width: 80px;">学历</text>
					<text class="fs-28 ft1D2129 flex-1">{{userData.educationStr || '保密'}}</text>
					
				</view>
				<view class="flex align-center border-bottom py-3">
					<text class="fs-28  ft1D2129 f-w-b" style="width: 80px;">标签</text>
					<view class="fs-28 ft1D2129 flex-1 flex flex-wrap">
						<template  v-if="labels.length > 0">
							<block v-for="(item,index) in labels" :key="index">
								<text class="fs-28 ft1D2129 px-2 py-1 bgF2F3F5 mr-2 rounded" :class="labels.length > 3?'mb-1':''">{{item.label}}</text>
							</block>
						</template>
						<text v-else class="fs-28 ft1D2129 px-2 py-1 mr-2 rounded">-</text>
					</view>
					
				</view>
				<view class="myintro border-bottom pb-4">
					<view class="flex align-center justify-between py-2">
						<text class="fs-28  ft1D2129 f-w-b" style="width: 80px;">个人简介</text>
					</view>
					<view class="flex flex-wrap">
						<text class="ft4E5969 fs-28 lineh44" style="min-height: 200rpx;">{{userData.curriculumVitae || '未设置'}}</text>
					</view>	
				</view>
				<view style="height: 50px;"></view>
			</view>
		</template>
		<demandListTep 
		v-if="currentTab  == 1 || currentTab  == 2" 
		:currentTab="currentTab" 
		:userId="userId" 
		:wxHeadPortrait="userData.wxHeadPortrait"
		@list="showNull">
		</demandListTep>
		<template v-if="nulldata && ( currentTab  == 1 || currentTab  == 2)">
			<tui-no-data :fixed="false" :imgUrl="`https://zm.zgzhm.com/mini/img/img_nodata.png`" :marginBottom="0" :imgWidth="300" :imgHeight="300">
				<text class="fs-28">暂无数据</text>
			</tui-no-data>
		</template>
		
		<login :modal="showLogin" @hide="showLogin = false"></login>
	</view>
</template>

<script>
	import { mapGetters,mapActions } from 'vuex'
	import demandListTep from './demandList.vue'
	export default {
		components:{demandListTep},
		data() {
			return {
				showLogin:false,
				scrollTop:0,
				isFixedSearch:false,
				currentTab:0,
				tabs:[
					{name:'个人信息'},
					{name:'发布的需求'},
					{name:'承接的需求'}
				],
				labels:[],
				userId:null,
				userData:{},//用户信息
				nulldata:false,
				page:1,
				pageSize:15,
				demandList:[],//需求列表
			}
		},
		computed:{
			...mapGetters(['getNavHeight','getNavTop','getSafeAreaBottom','getUser'])
		},
		onLoad(query) {
			if(query.userId){
				this.userId = query.userId
				this.getUserInfoFn()
			}
		},
		onPageScroll(e){
			this.scrollTop = e.scrollTop
		},
		methods: {
			...mapActions(['getUserInfo','getUserPublishedRequirements','getRequirementsUndertakenByUsersList','getFollow','cancelAttention']),
			async getUserInfoFn(){
				try{
					let res = await this.getUserInfo({id:this.userId})
					this.userData = res.data
					this.labels = this.userData.occupationLabelLsit
				}catch(e){
					//TODO handle the exception
				}
			},
			async followFn(){  // 关注
				try{
					let data = {
						attentionUserId:this.userData.id,
						attentionUserName:this.userData.name
					}
					let res = await this.getFollow(data)
					this.getUserInfoFn()
					this.tui.toast(res.msg)
				}catch(e){
					this.tui.toast(e.msg)
					//TODO handle the exception
				}
			},
			async cancelAttentionFn(){ // 取消关注
				try{
					let data = {
						attentionUserId:this.userData.id,
						attentionUserName:this.userData.name
					}
					let res = await this.cancelAttention(data)
					this.getUserInfoFn()
					this.tui.toast(res.msg)
				}catch(e){
					this.tui.toast(e.msg)
					//TODO handle the exception
				}
			},
			showNull(data){
				this.nulldata = data
			},
			attentionFn(){
				if(!this.tui.isLogin()){
					this.showLogin = true
					return
				}
				if(this.userData.concernedOrNot == 1){
					this.cancelAttentionFn()
				} else {
					this.followFn()
				}
			},
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

<style lang="scss">
.user-page{
	min-height: 100vh;
}
</style>
