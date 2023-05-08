<template>
	<view class="feedback-page h-100vh flex flex-column">
		<comheader title="意见反馈"></comheader>
		<view class="feedback-form flex-1 mx-2 flex flex-column pt-2">
			<view class="border-bottom flex flex-column mb-2 bgffff p-2" style="min-height: 48px;">
				<view class="flex align-center mb-1 ft1D2129 fs-32">问题描述</view>
				<textarea v-model="form.problemDescription" placeholder="请描述 您的问题或者意见,便于我们快速处理." placeholder-class="placeholder" maxlength="100" name="detail" style="width:100%"/>
			</view>
			<view class="border-bottom pb-2 bgffff px-2 py-3 mb-3">
				<view class="flex align-center mb-1 ft1D2129 fs-32">上传截图<text class="ft86909C fs-28">(最多上传4张)</text></view>
				<uni-file-picker ref="unifilepicker" v-model="imageValue" fileMediatype="image" return-type="array" mode="grid"
				@select="select" @delete="removeImg" :auto-upload="false" limit="4" :image-styles="imageStyles"/>
			</view>
			<view class="flex flex-column border-bottom bgffff px-2">
				<view class="flex align-center">
					<text class="ft000000 fs-32 family">联系方式</text>
					<text class="ft999999 fs-24 family ml-2">手机/微信/QQ</text>
				</view>
				<view class="pb-2 pt-5">
					<input v-model="form.contactInformation" class="flex-1 py-1" type="number" placeholder-class="placeholder" placeholder="请留下您的联系方式,便于我们及时反馈处理结果" />
				</view>
			</view>
			<view class="border-top  w-100 px-32 border-box pt-2 mt-5">
				<view class="ftffff fs-28 bgF85241 rounded-circle text-center py-2 w-100" @click="feedbackserviceFn">确认提交</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { mapGetters,mapActions } from 'vuex'
	export default {
		data() {
			return {
				imageValue:[],
				serverUrl:'',
				enclosure:[],
				bloblist:[],
				form:{
					problemDescription:'',
					contactInformation:''
				},
				imageStyles:{
					width:100,
					height:100
				},
			}
		},
		created() {
			this.uploadFileToDisk().then(url => {
				this.serverUrl = url
				this.headers  = {
					token:this.tui.getToken(),
				}
				console.log(this.serverUrl)
			})
		},
		methods: {
			...mapActions(['feedbackservice','uploadFileToDisk','deleteFile']),
			async feedbackserviceFn(){
				try{
					if(!this.form.problemDescription){
						this.tui.toast('请输入问题描述')
						return;
					}
					const data = {
						...this.form,
						enclosure:this.enclosure
					}
					let res = await this.feedbackservice(data)
					this.tui.toast(res.msg)
					this.form.problemDescription = ''
					this.form.contactInformation = ''
					this.form.enclosure = []
					this.form.imageValue = []
					this.form.bloblist = []
				}catch(e){
					this.tui.toast(e.msg)
					//TODO handle the exception
				}
			},
			select(e) {
				//当选择多张一起上传
				if(e.tempFilePaths.length>1){
					e.tempFiles.map((item,index)=>{
						this.imgupload(e.tempFilePaths[index]);
					})
					return;
				}
				//单张上传
				this.imgupload(e.tempFilePaths[0]);
			},
			//上传图片
			async imgupload(imgfile) {
			    try{
					this.tui.uploadFile(this.serverUrl,imgfile,{operationCode:'feedback'})
					.then(res => {
						this.enclosure.push(res.id)
						this.bloblist.push(imgfile);
					})
				}catch(e){ 
					console.log(e)
				}
			},
			async removeImg(e){ //删除图片，回传index
				try{
					let index = this.bloblist.indexOf(e.tempFilePath);
					let res = await this.deleteFile({operationCode:'feedback',operationId:this.enclosure[index]})
					this.enclosure.splice(e.index,1)
				}catch(e){
					this.tui.toast(e.data.msg)
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style>

</style>
