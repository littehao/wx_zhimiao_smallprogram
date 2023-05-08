<template>
	<view class="bgF7F8FA h-100vh flex flex-column">
		<comheader  title="打假需求"></comheader>
		<view class="scroll-row-box pt-2 flex flex-column">
			<view class="demand-card bgffff mx-2 p-2 rounded mb-2">
				<view class="flex justify-between">
					<text class="ft1D2129 fs-28  flex-1 text-ellipsis2 lineh50  f-w-b">{{demandData.title}}</text>
					<view class="flex flex-column ml-2">
						<text class="ftF53F3F fs-40 f-w-b text-ellipsis">{{formatNumber(demandData.demandPrice || 0)}}元</text>
						<text class="ft86909C fs-24 text-right">{{demandData.paymentStatusStr}}</text>
					</view>
				</view>
				<view class="flex">
					<text class="text-ellipsis2  ft4E5969 fs-24 lineh44">{{demandData.content}}</text>
				</view>
			</view>
			
			<view class="flex-1 bgffff px-32 py-32 mx-2">
				<view class="border-bottom flex flex-column mb-2 pb-1" style="min-height: 48px;">
					<textarea v-model="complaintContent" placeholder="请输入打假理由 (必填)" maxlength="100" name="detail" @input="sumfontnum"/>
					<view class="flex align-center justify-end">
						<text class="ftC9CDD4 fs-24">{{fontNum}}/100</text>
					</view>
				</view>
				<view class="pb-2">
					<view class="flex align-center mb-1 ft1D2129 fs-32">上传图片<text class="ft86909C fs-28">(最少上传1张，最多上传9张)</text></view>
					<tui-upload
						width="200" 
						height="200" 
						:value="uploadList" 
						fileKeyName="upfile" 
						:formData="{operationCode:'demandRegistration'}" 
						:limit="4" 
						:header="headers"
						:serverUrl="serverUrl"
						@complete="uploadResult" 
						@remove="removeImg">
					</tui-upload>
				</view>
			</view>
			<view :style="{height:(getSafeAreaBottom + 70)+'px'}"></view>
		</view>
		<view class="flex-1 flex align-end bgffff position-fixed left-0 right-0 bottom-0" 
		:style="{'padding-bottom': getSafeAreaBottom > 0?getSafeAreaBottom+'px':'15'+'px'}">
			<view class="border-top  w-100 px-32 border-box pt-2">
				<view class="ftffff fs-28 bgF85241 rounded-circle text-center py-2 w-100" @tap="demandComplaintFn">提交</view>	
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters,mapActions } from 'vuex'
	import { formatNumber } from '@/utils/common.js'
	import tuiUpload from '@/pagesA/components/tui-upload/tui-upload.vue'
	export default {
		components:{tuiUpload},
		data() {
			return {
				fontNum:0,
				complaintContent:'',
				uploadList:[],
				serverUrl:'',
				headers:{},//上传图片headers
				demandData:{},
				enclosure:[],//上传图片id
			}
		},
		computed:{
			...mapGetters(['getNavHeight','getNavTop','getSafeAreaBottom'])
		},
		onLoad(query) {
			if(query.demandId){
				this.demandId = query.demandId
				this.getDemandDatelsFn()
			}
		},
		created() {
			this.uploadFileToDisk().then(url => {
				this.serverUrl = this.tui.interfaceUrl() + url
				this.headers  = {
					token:this.tui.getToken(),
				}
				console.log(this.serverUrl)
			})
		},
		methods: {
			...mapActions(['getDemandDatels','demandComplaint','uploadFileToDisk','deleteFile']),
			async getDemandDatelsFn(){ // 获取需求详情
				try{
					let res = await this.getDemandDatels({id:this.demandId})
					this.demandData = res.data
				}catch(e){
					console.log(e)
					//TODO handle the exception
				}
			},
			async demandComplaintFn(){//需求投诉
				try{
					if(!this.complaintContent){
						this.tui.toast('打假理由不能为空')
						return
					}
					if(!this.fontNum > 100){
						this.tui.toast('打假理由字数超出限制')
						return
					}
					let data = {
						enclosure:this.enclosure.join(','),
						complaintContent:this.complaintContent,
						demandRegistrationId:this.demandId
					}
					let res = await this.demandComplaint(data)
					if(res.code == 200){
						this.tui.toast('提交成功，感谢你为净化平台做的贡献')
						this.complaintContent = ''
						this.enclosure = ''
						this.uploadList = []
					}
				}catch(e){
					this.tui.toast(e.msg)
					//TODO handle the exception
				}
			},
			sumfontnum(e){ // 限制标题字数
				this.fontNum=e.detail.value.length
			},
			uploadResult(e){ // 上传完成
				if(e.status == 1 ){
					this.enclosure = e.ids
					this.uploadList = e.imgArr
					console.log(this.uploadList)
				}
			},
			async removeImg(e){ //删除图片，回传index
				try{
					let res = await this.deleteFile({operationCode:'demandRegistration',operationId:this.enclosure[e.index]})
					this.enclosure.splice(e.index,1)
				}catch(e){
					this.tui.toast(e.data.msg)
					//TODO handle the exception
				}
			},
			formatNumber(price){
				return formatNumber(price)
			},
		}
	}
</script>

<style  lang="scss" scoped>
.scroll-row-box{
	height: calc(100vh - 44px - var(--status-bar-height));
}
</style>
