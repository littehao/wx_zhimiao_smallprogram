<template>
	<view class="release-page h-100vh">
		<comheader :backBtn="false" title="发布需求"></comheader>	
		<template v-if="getIsLogin">
			<view class="release-form flex-1 mx-2 flex flex-column pt-2">
				<view class="border-bottom flex align-center position-relative mb-2 bgffff px-2" style="min-height: 48px;">
					<textarea v-model="form.title" placeholder="需求标题" placeholder-class="placeholder" maxlength="50" name="title" auto-height @input="titlesumfontnum"/>
					<text class="position-absolute ftC9CDD4 fs-24" style="bottom:5px;right:5px">{{TitlefontNum}}/50</text>
				</view>
				<view class="border-bottom flex flex-column mb-2 bgffff p-2" style="min-height: 48px;">
					<textarea v-model="form.content" placeholder="需求描述" placeholder-class="placeholder" maxlength="100" name="detail" style="width:100%" @input="sumfontnum"/>
					<view class="flex align-center justify-end">
						<text class="ftC9CDD4 fs-24">{{fontNum}}/100</text>
					</view>
				</view>
				<view class="flex justify-start mb-4">
					<view class="flex align-center bgF2F3F5 rounded-circle  px-2 py-1" @click="locationTo">
						<tui-icon color="#4E5969" size="16" name="gps"></tui-icon>
						<text class="ml-1 fs-24 ft4E5969">{{form.address || wordkAddress}}</text>
					</view>	
				</view>
				<view class="border-bottom pb-2 bgffff px-2 py-3">
					<view class="flex align-center mb-1 ft1D2129 fs-32">上传图片<text class="ft86909C fs-28">(最多上传4张)</text></view>
					<uni-file-picker ref="unifilepicker" v-model="imageValue" fileMediatype="image" return-type="array" mode="grid"
					@select="select" @delete="removeImg" :auto-upload="false" limit="4" :image-styles="imageStyles"/>
				</view>
				<view class="flex align-center border-bottom bgffff px-2 py-2" style="height: 46px;">
					<text class="ft000000 fs-28 family">需求价格</text>
					<input v-model="form.demandPrice" class="flex-1 text-right py-1" type="digit" placeholder-class="placeholder" placeholder="请输入价格" />
					<text class="ftF85241 fs-28 family ml-2">元</text>
				</view>
				<view class="flex align-center ft86909C fs-24 py-2">发布即代表同意 <text class="fs-24 ftF85241" @click="navRule">《寻工/找工信息发布规则》</text></view>	
			</view>
			<view class="flex-1 flex align-end">
				<view class="border-top  w-100 px-32 border-box pt-2">
					<view class="ftffff fs-28 bgF85241 rounded-circle text-center py-2 w-100" @tap="sendFn">发布需求</view>
				</view>
			</view>
			<view :style="{height:(getSafeAreaBottom + 70)+'px'}"></view>
		</template>
		<template v-else>
			<tui-no-data :imgUrl="`https://zm.zgzhm.com/mini/img/img_nodata.png`" :marginBottom="0" :imgWidth="300" :imgHeight="300" btnText="去登录" backgroundColor="#F85241" @click="showLogin = true">
				<text class="fs-28">登录后发布需求</text>
			</tui-no-data>
		</template>
		
		<login :modal="showLogin" @hide="showLogin = false"></login>
		<!--支付确认-->
		<uni-popup ref="paypopup" type="center" :mask-click="false" style="z-index: 9999999;">
			<view class="rounded-lg bgffff p-2" style="width: 650rpx;height: 400rpx;">
				<view class="fs-32 ft000000 text-center mb-4 font-weight-bolder">请选择是否支付发布</view>
				<view class="bgF85241 ftffff fs-30 text-center rounded-circle py-2 border mb-2" 
				style="border-color: transparent;" 
				@click="registrationDemandFn(1)">支付并发布</view>
				<view class="border rounded-circle text-center py-2 fs-30 ftF85241 mb-2" 
				style="border-color: #F85241;" 
				@click="registrationDemandFn(2)">直接发布</view>
				<view class="border rounded-circle text-center py-2 fs-30" @click="$refs.paypopup.close()">取消发布</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	export default {
		data() {
			return {
				showLogin:false,
				fontNum:0,
				TitlefontNum:0,
				serverUrl:'',
				wordkAddress:'定位工作地点',
				imageValue:[],
				enclosure:[],//上传图片id
				headers:{},//上传图片headers
				bloblist:[],
				imageStyles:{
					width:100,
					height:100
				},
				form:{
					title:'',
					content:'',
					address:'',
					xaxis:'',//经度
					yaxis:'',//纬度
					demandPrice:'',
					submit:1,//1提交  0草稿
				}
			}
		},
		computed:{
			...mapGetters(['getSafeAreaBottom','getIsLogin'])
		},
		created() {
			let that = this
			uni.$on('updateData',function(data){
				console.log(data)
				if(data.type == 'release'){
					that.form.xaxis = data.location.lat
					that.form.yaxis = data.location.lng
					that.form.address  = data.title
				}
			})
			this.uploadFileToDisk().then(url => {
				this.serverUrl = url
				this.headers  = {
					token:this.tui.getToken(),
				}
				console.log(this.serverUrl)
			})
		},
		onHide(){
			// uni.showTabBar()
		},
		methods: {
			...mapActions(['registrationDemand','uploadFileToDisk','deleteFile']),
			sendFn(){
				if(!this.form.title){
					this.tui.toast('请填写需求标题')
					return;
				}
				if(!this.form.content){
					this.tui.toast('请填写需求内容')
					return;
				}
				if(!this.form.address){
					this.tui.toast('请选择工作地址')
					return;
				}
				// if(this.enclosure.length < 1){
				// 	this.tui.toast('请上传需求图片附近')
				// 	return;
				// }
				if(!this.form.demandPrice){
					this.tui.toast('请填写需求价格')
					return;
				}
				this.$refs.paypopup.open()
			},
			requestPaymentFn(pay){
				const _this = this
				uni.requestPayment({
					provider: 'wxpay',    //支付类型-固定值
					timeStamp: pay.timeStamp,
					nonceStr: pay.nonceStr,
					package: pay.packageValue,
					signType: pay.signType,
					paySign: pay.paySign,
					success: function (res) {
						console.log('success:' + JSON.stringify(res));
						console.log("支付成功");
						_this.initFn()
						// uni.showToast({
						// 	icon: 'success',
						// 	title: '支付成功'
						// })
					},
					fail: function (err) {
						console.log('fail:' + JSON.stringify(err));
						console.log("支付失败");
						if(err.errMsg.includes('cancel')){
							uni.showToast({
								icon: 'none',
								title: '取消支付'
							})
							_this.initFn('cancel')
						} else {
							uni.showToast({
								icon: 'none',
								title: '支付失败'
							})
							_this.initFn('cancel')
						}
					}
				});
			},
			async registrationDemandFn(type){ // 发布需求
				try{
					let data = {
						...this.form,
						enclosure:this.enclosure.join(',')
					}
					let res = await this.registrationDemand(data)
					if(type == 1){
						this.requestPaymentFn(res.data)
					} else {
						this.initFn()
					}    
				}catch(e){
					console.log(e)
					this.tui.toast(e.msg)
					//TODO handle the exception
				}
			},
			initFn(type){
				this.$refs.paypopup.close()
				this.form = {
					title:'',
					content:'',
					address:'',
					xaxis:'',//经度
					yaxis:'',//纬度
					demandPrice:'',
					submit:1,
				}
				// this.form = this.$options.data().form
				this.enclosure  = []
				this.imageValue = []
				this.bloblist = []
				this.$refs.unifilepicker.clearFiles()
				this.$emit('follow')
				if(!type){
					setTimeout(() => {
						this.tui.toast('提交成功，审核中...')   
					},1000)
				}
			},
			locationTo(){
				uni.navigateTo({
					url:'/pagesA/location/location'
				})
			},
			navRule(){
				uni.navigateTo({
					url:'/pagesA/agreement/agreement?type=2'
				})
			},
			sumfontnum(e){ // 限制标题字数
				this.fontNum=e.detail.value.length
			},
			titlesumfontnum(e){
				this.TitlefontNum=e.detail.value.length
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
					this.tui.uploadFile(this.serverUrl,imgfile,{operationCode:'demandRegistration'})
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
					let res = await this.deleteFile({operationCode:'demandRegistration',operationId:this.enclosure[index]})
					this.enclosure.splice(e.index,1)
				}catch(e){
					this.tui.toast(e.data.msg)
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss">

</style>
