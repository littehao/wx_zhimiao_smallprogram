<template>
	<view class="myinfo-page">
		<comheader  title="个人资料"></comheader>
		<view class="flex flex-column px-32">
			<view class="flex align-center border-bottom py-3" @click="$refs.dateTime.show()">
				<text class="fs-28  ft1D2129 f-w-b" style="width: 80px;">年龄</text>
				<text class="fs-28 ft1D2129 flex-1">{{infoForm.age?infoForm.age:'保密'}}</text>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
			<view class="flex align-center border-bottom py-3" @click="showSexActionSheet = true">
				<text class="fs-28  ft1D2129 f-w-b" style="width: 80px;">性别</text>
				<text class="fs-28 ft1D2129 flex-1">{{infoForm.sex?infoForm.sex:'保密'}}</text>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
			<view class="flex align-center border-bottom py-3" @click="showAddressSheet = true">
				<text class="fs-28  ft1D2129 f-w-b" style="width: 80px;">所在地</text>
				<text class="fs-28 ft1D2129 flex-1">{{infoForm.address.length?infoForm.address.join('-'):'保密'}}</text>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
			<view class="flex align-center border-bottom py-3" @click="showEthnicActionSheet = true">
				<text class="fs-28  ft1D2129 f-w-b" style="width: 80px;">民族</text>
				<text class="fs-28 ft1D2129 flex-1">{{infoForm.ethnic?infoForm.ethnic:'保密'}}</text>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
			<view class="flex align-center border-bottom py-3" @click="showDiplomaActionSheet = true">
				<text class="fs-28  ft1D2129 f-w-b" style="width: 80px;">学历</text>
				<text class="fs-28 ft1D2129 flex-1">{{infoForm.schooling?infoForm.schooling:'保密'}}</text>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
			<view class="flex align-center border-bottom py-3" @click="toMylabel">
				<text class="fs-28  ft1D2129 f-w-b" style="width: 80px;">标签</text>
				<view class="fs-28 ft1D2129 flex-1 flex flex-wrap">
					<block v-for="(item,index) in infoForm.labels" :key="index">
						<text class="fs-28 ft1D2129 px-2 py-1 bgF2F3F5 mr-2 mb-1 rounded">{{item}}</text>
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
					<text class="ft4E5969 fs-28 lineh44" style="min-height: 200rpx;">{{infoForm.intro || '你还没填简介哟～'}}</text>
				</view>	
			</view>
		</view>
		<!--年龄-->
		<tui-datetime title="选择出生日期"  :titleSize="28" :type="2" ref="dateTime" color="#F85241" @confirm="changeDateTime"></tui-datetime>
		<!--性别-->
		<tui-picker title="选择性别" :bold="false" :titleSize="32" confirmColor="#F85241" :show="showSexActionSheet" :pickerData="sexList" @change="sexClick">
		</tui-picker>
		<!--民族-->
		<tui-picker title="选择民族" :bold="false" :titleSize="32" confirmColor="#F85241" :show="showEthnicActionSheet" :pickerData="ethnicList" @change="ethnicClick">
		</tui-picker>
		<!--学历-->
		<tui-picker title="选择学历" :bold="false" :titleSize="32" confirmColor="#F85241" :show="showDiplomaActionSheet" :pickerData="diplomaList" @change="diplomaClick">
		</tui-picker>
		<!--地址选择-->
		<tui-picker title="选择所在地"  :bold="false" :titleSize="32" :value="infoForm.address" confirmColor="#F85241" :show="showAddressSheet" :layer="3" :pickerData="multiArray" :params="2"
			@change="pickerAddressFn">
		</tui-picker>

	</view>
</template>

<script>
	import city from '@/utils/picker.city.js'
	import ethnic  from '@/utils/ethnic.js'
	export default {
		data() {
			return {
				infoForm:{
					age:'',
					sex:'',
					address:[],
					ethnic:'',
					schooling:'',
					intro:''
				},
				showSexActionSheet:false,
				sexList: [
					{
						text: "男",
						value:'1'
					}, {
						text: "女",
						value:'0'
					},{
						text: "保密",
						value:'-1'
					}
				],
				showAddressSheet:false,
				multiArray:city,// 城市列表
				showEthnicActionSheet:false,
				ethnicList:ethnic, // 民族列表 
				showDiplomaActionSheet:false,
				diplomaList:[
					{
						text: "小学",
						value:'0'
					},
					{
						text: "初中",
						value:'1'
					}, {
						text: "高中",
						value:'2'
					},{
						text: "专科",
						value:'3'
					},{
						text: "本科",
						value:'4'
					},{
						text: "研究生",
						value:'5'
					},{
						text: "博士",
						value:'6'
					}
				]
			}
		},
		onShow() {
			let that = this
			uni.$on('updateData',function(data){
				console.log(data)
				that.infoForm.labels = data.labels
				that.infoForm.intro  = data.intro
			})
		},
		created() {
			// console.log(ethnic)
		},
		methods: {
			changeDateTime(e){ // 年龄计算
				const year = new Date().getFullYear()
				this.infoForm.age =  String(year - e.year)
			},
			sexClick(e){
				this.infoForm.sex = e.text
				this.showSexActionSheet = false
			},
			closeActionSheet(){
				this.showSexActionSheet = false
			},
			pickerAddressFn(e){
				// console.log(e)
				this.infoForm.address = e.text
				this.showAddressSheet = false
			},
			ethnicClick(e){
				this.infoForm.ethnic = e.text
				this.showEthnicActionSheet = false
			},
			diplomaClick(e){
				this.infoForm.schooling = e.text
				this.showDiplomaActionSheet = false
			},
			toIntroduction(){
				uni.navigateTo({
					url:'/pagesA/Introduction/Introduction'
				})
			},
			toMylabel(){
				uni.navigateTo({
					url:'/pagesA/mylabel/mylabel'
				})
			}
		}
	}
</script>

<style>

</style>
