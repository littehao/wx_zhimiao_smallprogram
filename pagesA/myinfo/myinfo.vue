<template>
	<view class="myinfo-page">
		<comheader title="个人资料"></comheader>
		<view class="flex flex-column px-32">
			<view class="flex align-center border-bottom py-3">
				<text class="fs-28  ft1D2129 f-w-b" style="width: 80px;">头像</text>
				<view class="flex-1">
					<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
					  <image v-if="getUser.wxHeadPortrait" class="rounded-circle flex bgF2F3F5" :src="wxHeadPortrait || getUser.wxHeadPortrait" mode="aspectFill"  style="width:64px;height:64px;"></image>
					  <image v-else class="rounded-circle flex bgF2F3F5" 
					  :src="`https://zm.zgzhm.com/mini/img/avatar.png`" mode="aspectFill"  style="width:64px;height:64px;"></image>
					</button>
				</view>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
			<view class="flex align-center border-bottom py-3">
				<text class="fs-28  ft1D2129 f-w-b" style="width: 80px;">昵称</text>
				<input type="nickname" v-model="nickname" class="weui-input w-100" @input="changeInput" placeholder="请输入昵称"/>
				<!-- <tui-icon color="#86909C" size="20" name="arrowright"></tui-icon> -->
			</view>
			<view class="flex align-center border-bottom py-3" @click="$refs.dateTime.show()">
				<text class="fs-28  ft1D2129 f-w-b" style="width: 80px;">年龄</text>
				<text class="fs-28 ft1D2129 flex-1">{{infoForm.age?infoForm.age:'保密'}}</text>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
			<view class="flex align-center border-bottom py-3" @click="showSexActionSheet = true">
				<text class="fs-28  ft1D2129 f-w-b" style="width: 80px;">性别</text>
				<text class="fs-28 ft1D2129 flex-1">{{infoForm.gender?infoForm.gender:'保密'}}</text>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
			<view class="flex align-center border-bottom py-3" @click="showAddressSheet = true">
				<text class="fs-28  ft1D2129 f-w-b" style="width: 80px;">所在地</text>
				<text class="fs-28 ft1D2129 flex-1">{{infoForm.location?infoForm.location:'保密'}}</text>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
			<view class="flex align-center border-bottom py-3" @click="showEthnicActionSheet = true">
				<text class="fs-28  ft1D2129 f-w-b" style="width: 80px;">民族</text>
				<text class="fs-28 ft1D2129 flex-1">{{infoForm.nameFamilyStr?infoForm.nameFamilyStr:'保密'}}</text>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
			<view class="flex align-center border-bottom py-3" @click="showDiplomaActionSheet = true">
				<text class="fs-28  ft1D2129 f-w-b" style="width: 80px;">学历</text>
				<text class="fs-28 ft1D2129 flex-1">{{infoForm.educationStr?infoForm.educationStr:'保密'}}</text>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
			<view class="flex align-center border-bottom py-3" @click="toMylabel">
				<text class="fs-28  ft1D2129 f-w-b" style="width: 80px;">标签</text>
				<view class="fs-28 ft1D2129 flex-1 flex flex-wrap">
					<block v-for="(item,index) in infoForm.labels" :key="index">
						<text class="fs-28 ft1D2129 px-2 py-1 bgF2F3F5 mr-2 mb-1 rounded">{{item.label}}</text>
					</block>
				</view>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
			<view class="myintro border-bottom pb-4">
				<view class="flex align-center justify-between py-2">
					<text class="fs-28  ft1D2129 f-w-b" style="width: 80px;">个人简介</text>
					<view class="flex align-center" @click="toIntroduction">
						<tui-icon color="#F85241" size="20" name="evaluate"></tui-icon>
						<text class="ml-1 fs-28 ftF85241">编辑</text>
					</view>
				</view>
				<view class="flex flex-wrap">
					<text class="ft4E5969 fs-28 lineh44"
						style="min-height: 200rpx;">{{infoForm.curriculumVitae || '你还没填简介哟～'}}</text>
				</view>
			</view>
		</view>
		<!--年龄-->
		<tui-datetime title="选择出生日期" :titleSize="28" :type="2" ref="dateTime" color="#F85241" @confirm="changeDateTime">
		</tui-datetime>
		<!--性别-->
		<tui-picker title="选择性别" :bold="false" :titleSize="32" confirmColor="#F85241" :show="showSexActionSheet"
			:pickerData="sexList" @change="sexClick" @hide="showSexActionSheet = false">
		</tui-picker>
		<!--民族-->
		<tui-picker title="选择民族" :bold="false" :titleSize="32" confirmColor="#F85241" :show="showEthnicActionSheet"
			:pickerData="ethnicList" @change="ethnicClick" @hide="showEthnicActionSheet = false">
		</tui-picker>
		<!--学历-->
		<tui-picker title="选择学历" :bold="false" :titleSize="32" confirmColor="#F85241" :show="showDiplomaActionSheet"
			:pickerData="diplomaList" @change="diplomaClick" @hide="showDiplomaActionSheet = false">
		</tui-picker>
		<!--婚姻-->
		<tui-picker title="选择婚姻状况" :bold="false" :titleSize="32" confirmColor="#F85241"
			:show="showMaritalStatusActionSheet" :pickerData="sexList" @change="sexClick" @hide="showMaritalStatusActionSheet = false">
		</tui-picker>
		<!--地址选择-->
		<tui-picker title="选择所在地" :bold="false" :titleSize="32" :value="infoForm.address" confirmColor="#F85241"
			:show="showAddressSheet" :layer="3" :pickerData="multiArray" :params="2" @change="pickerAddressFn" @hide="showAddressSheet = false"> 
		</tui-picker>

	</view>
</template>

<script>
	import city from '@/pagesA/utils/picker.city.js'
	import tuiDatetime from '@/pagesA/components/tui-datetime/tui-datetime.vue'
	import tuiPicker from '@/pagesA/components/tui-picker/tui-picker.vue'
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	export default {
		components:{tuiDatetime,tuiPicker},
		data() {
			return {
				infoForm: {
					age: '',
					gender: '',
					genderValue: '',
					location: '',
					nameFamily: '',
					nameFamilyStr: '',
					education: '',
					educationStr: '',
					curriculumVitae: ''
				},
				nickname:'',
				showSexActionSheet: false,
				sexList: [], //性别
				showAddressSheet: false,
				multiArray: city, // 城市列表
				showEthnicActionSheet: false,
				ethnicList: [], // 民族列表 
				showMaritalStatusActionSheet: false,
				maritalStatusList: [], //婚姻
				showDiplomaActionSheet: false,
				diplomaList: [], //学历
				wxHeadPortrait:'',
				editNickTimer:null
			}
		},
		computed: {
			...mapGetters(['getUser']),
		},
		onShow() {
			let that = this
			uni.$on('updateData', function(data) {
				console.log(data)
				that.infoForm.labels = data.labels
				that.infoForm.curriculumVitae = data.intro
				that.improvePersonalDataFn() //设置学历
			})
		},
		created() {
			// console.log(ethnic)
			this.nickname = this.getUser.name || this.getUser.wxPhone
			this.byDictCodeFn()
			if (this.getUser) { // 显示个人信息
				const {
					age,
					gender,
					genderStr,
					location,
					nameFamily,
					nameFamilyStr,
					education,
					educationStr,
					curriculumVitae,
					occupationLabelLsit
				} = this.getUser
				this.infoForm.age = age
				this.infoForm.gender = genderStr
				this.infoForm.genderValue = gender
				this.infoForm.location = location
				this.infoForm.nameFamily = nameFamily
				this.infoForm.nameFamilyStr = nameFamilyStr
				this.infoForm.education = education
				this.infoForm.educationStr = educationStr
				this.infoForm.curriculumVitae = curriculumVitae
				this.infoForm.labels = occupationLabelLsit
			}
		},
		beforeDestroy(){
			clearTimeout(this.editNickTimer)
			this.editNickTimer = null
		},
		methods: {
			...mapActions(['byDictCode', 'improvePersonalData', 'getCurrentLogonInformation','updNameAndPortrait','uploadFileToDisk']),
			onChooseAvatar(e) {
				const { avatarUrl } = e.detail 
				console.log(avatarUrl)
				this.myUpload(avatarUrl)
				// this.setUserProfileFn(avatarUrl)
			},
			myUpload(rsp) {
				console.log(rsp)
				this.wxHeadPortrait = rsp; //更新头像方式一
				this.uploadFileToDisk().then(url => {
					this.tui.uploadFile(url,rsp,{
						operationCode:"userHeaderImage"
					}).then(res => {
						console.log(res)
						this.updNameAndPortraitFn(res.id)
					})
				})
			},
			async updNameAndPortraitFn(portraitId){ //修改头像
				try{
					let data ={
						name:this.getUser.name,
						portraitId:portraitId
					}
					let res = await this.updNameAndPortrait(data)
					this.tui.toast(res.msg)
					this.getCurrentLogonInformation()
				}catch(e){
					this.tui.toast(e.msg)
					//TODO handle the exception
				}
			},
			async changeInput(e){//修改昵称
				try{
					clearTimeout(this.editNickTimer)
					this.editNickTimer = setTimeout(async()=> {
						let data ={
							name:e.detail.value
						}
						let res = await this.updNameAndPortrait(data)
						this.tui.toast(res.msg)
						this.getCurrentLogonInformation()
					},2000)
				}catch(e){
					this.tui.toast(e.msg)
					//TODO handle the exception
				}
			},
			async byDictCodeFn() { // 获取字典列表
				try {
					let res = await this.byDictCode({
						dictcode: 'gender,nameFamily,education,maritalStatus'
					})
					if (res.data) {
						const {
							gender,
							maritalStatus,
							nameFamily,
							education
						} = res.data
						gender.forEach(item => {
							item.text = item.description
						})
						this.sexList = gender
						nameFamily.forEach(item => {
							item.text = item.description
						})
						this.ethnicList = nameFamily
						this.maritalStatusList = maritalStatus
						education.forEach(item => {
							item.text = item.description
						})
						this.diplomaList = education
					}
				} catch (e) {
					//TODO handle the exception
				}
			},
			async improvePersonalDataFn() { //完善个人资料
				try {
					const data = {}
					if (this.infoForm.age) data.age = this.infoForm.age
					if (this.infoForm.genderValue) data.gender = this.infoForm.genderValue
					if (this.infoForm.location) data.location = this.infoForm.location
					if (this.infoForm.nameFamily) data.nameFamily = this.infoForm.nameFamily
					if (this.infoForm.education) data.education = this.infoForm.education
					if (this.infoForm.curriculumVitae) data.curriculumVitae = this.infoForm.curriculumVitae
					let res = await this.improvePersonalData(data)
					uni.showToast({
						title: res.msg
					})
					//重值本地个人信息
					this.getCurrentLogonInformation()
				} catch (e) {
					uni.showToast({
						title: e.data.msg,
						icon: 'none'
					})
					//TODO handle the exception
				}
			},
			changeDateTime(e) { // 年龄计算
				const year = new Date().getFullYear()
				this.infoForm.age = String(year - e.year)
				this.improvePersonalDataFn() //设置年龄
			},
			sexClick(e) {
				console.log(e)
				this.infoForm.gender = e.text
				this.infoForm.genderValue = e.value
				this.showSexActionSheet = false
				this.improvePersonalDataFn() //设置性别
			},
			closeActionSheet() {
				this.showSexActionSheet = false
			},
			pickerAddressFn(e) {
				console.log(e)
				this.infoForm.location = e.text && e.text.join('-')
				this.showAddressSheet = false
				this.improvePersonalDataFn() //设置地址
			},
			ethnicClick(e) {
				console.log(e)
				this.infoForm.nameFamilyStr = e.text
				this.infoForm.nameFamily = e.value
				this.showEthnicActionSheet = false
				this.improvePersonalDataFn() //设置名族
			},
			diplomaClick(e) {
				this.infoForm.educationStr = e.text
				this.infoForm.education = e.value
				this.showDiplomaActionSheet = false
				this.improvePersonalDataFn() //设置学历
			},
			toIntroduction() {
				uni.navigateTo({
					url: '/pagesA/Introduction/Introduction'
				})
			},
			toMylabel() {
				uni.navigateTo({
					url: '/pagesA/mylabel/mylabel'
				})
			}
		}
	}
</script>

<style lang="scss">
.avatar-wrapper{
		width:64px;
		height:64px;
		background-color: transparent;
		border-radius: 100px;
		padding:0;
		margin:0;
	}
</style>
