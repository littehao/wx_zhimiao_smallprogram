<template>
	<view class="bgF7F8FA h-100vh">
		<comheader title="评价"></comheader>
		<view class="scroll-content overflow-y pt-2">
			<view class="px-2 flex align-center justify-between mx-3 bgffff rounded mb-2 py-3 lefticon">
				<view class="fs-32 ft1D2129">
					{{demandData.title}}
				</view>
				<view class="ftF53F3F fs-32 font-weight-bolder">¥{{formatNumber(demandData.demandPrice || 0)}}</view>
			</view>
			<view class="flex flex-column mx-3 bgffff mb-2 rounded pb-3" style="min-height: 48px;">
				<view class="position-relative mb-2 p-2">
					<textarea v-model="content" placeholder="请输入评价" placeholder-class="placeholder" maxlength="100" style="width:100%" name="detail" @input="sumfontnum" />
					<text class="ftC9CDD4 fs-24 position-absolute top-0 right-0" style="top: 10px;right:10px;">{{fontNum}}/100</text>
				</view>
				<view class="flex align-center justify-around">
					<view>
						<uni-file-picker v-model="uploadList1" fileMediatype="image" return-type="array" mode="grid"
							@select="select" @delete="removeImg(0)" :auto-upload="false" limit="1" :image-styles="imageStyles">
							<image src="https://zm.zgzhm.com/mini/img/update.png" mode="aspectFill" style="width: 85px;height: 85px;"></image>
						</uni-file-picker>
					</view>
					<view> 
						<uni-file-picker v-model="uploadList2" fileMediatype="image" return-type="array" mode="grid"
							@select="select" @delete="removeImg(1)" :auto-upload="false" limit="1" :image-styles="imageStyles">
							<image src="https://zm.zgzhm.com/mini/img/update.png" mode="aspectFill" style="width: 85px;height: 85px;"></image>
						</uni-file-picker>
					</view>
					<view>
						<uni-file-picker v-model="uploadList3" fileMediatype="image" return-type="array" mode="grid"
							@select="select" @delete="removeImg(2)" :auto-upload="false" limit="1" :image-styles="imageStyles">
							<image src="https://zm.zgzhm.com/mini/img/update.png" mode="aspectFill" style="width: 85px;height: 85px;"></image>
						</uni-file-picker>
					</view>
					<view>
						<uni-file-picker v-model="uploadList4" fileMediatype="image" return-type="array" mode="grid"
							@select="select" @delete="removeImg(3)" :auto-upload="false" limit="1" :image-styles="imageStyles">
							<image src="https://zm.zgzhm.com/mini/img/update.png" mode="aspectFill" style="width: 85px;height: 85px;"></image>
						</uni-file-picker>
					</view>
				</view>
			</view>
			
			<view class="bgffff rounded mx-3">
				<view class="fs-28 ft1D2129 p-2 font-weight-bolder">请对
					{{demandData.currentPersonRole != 2?demandData.rreceiverName:demandData.userName}}
					的本次合作进行打分</view>
				<view class="border-bottom">
					<view class="flex align-center mb-2 lefticon p-2" v-if="demandData.currentPersonRole != 2">
						<text class="fs-28 ft1D2129 mr-5">专业分</text>
						<view class="flex align-center">
							<tui-rate :current="majorcurrent" active="#F7BA1E" @change="majorchange"></tui-rate>
							<text style="width: 80rpx;" class="fs-24 ft86909C text-right">{{majorText}}</text>
						</view>
					</view>
					<view class="flex align-center lefticon p-2">
						<text class="fs-28 ft1D2129 mr-5">诚信值</text>
						<view class="flex align-center">
							<tui-rate :current="integritycurrent" active="#F7BA1E" @change="integritychange"></tui-rate>
							<text style="width: 80rpx;" class="fs-24 ft86909C text-right">{{integrityText}}</text>
						</view>
					</view>
				</view>
			</view>

			<view class="flex-1 flex align-end" style="margin-top:100rpx">
				<view class=" w-100 px-32 border-box pt-2">
					<view class="ftffff fs-32 bgF85241 rounded-circle text-center py-3 w-100" @tap="evaluateApiFn">提交评价</view>
				</view>
			</view>
			<view :style="{height:(getSafeAreaBottom + 60)+'px'}"></view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	import {
		formatNumber
	} from '@/utils/common.js'
	import tuiRate from '@/pagesA/components/tui-rate/tui-rate.vue'
	export default {
		components:{tuiRate},
		data() {
			return {
				demandId: '',
				fontNum: 0,
				serverUrl: '',
				wordkAddress: '选择工作地点',
				uploadList1: [],
				uploadList2: [],
				uploadList3: [],
				uploadList4: [],
				enclosure: [], //上传图片id
				headers: {}, //上传图片headers
				content: '', //评价内容
				majorcurrent: 0, //专业分 
				integritycurrent: 0, //诚信分
				demandData: {},
				credit: [], //信用星级
				major: [], //专业星级
				content: '',
				bloblist: [],
				imageStyles: {
					width: 85,
					height: 85
				},
			}
		},
		computed: {
			...mapGetters(['getSafeAreaBottom']),
			majorText() {
				switch (this.majorcurrent) {
					case 1:
						return '非常差'
						break;
					case 2:
						return '差'
						break;
					case 3:
						return '一般'
						break;
					case 4:
						return '好'
						break;
					case 5:
						return '非常好'
						break;
				}
			},
			integrityText() {
				switch (this.integritycurrent) {
					case 1:
						return '非常差'
						break;
					case 2:
						return '差'
						break;
					case 3:
						return '一般'
						break;
					case 4:
						return '好'
						break;
					case 5:
						return '非常好'
						break;
				}
			}
		},
		onLoad(query) {
			if (query.demandId) {
				this.demandId = query.demandId
				this.userEvaluationId = query.userEvaluationId
				this.getDemandDatelsFn()
				this.getStarLevelFn()
			}
		},
		created() {
			this.uploadFileToDisk().then(url => {
				this.serverUrl = url
				this.headers = {
					token: this.tui.getToken(),
				}
				console.log(this.serverUrl)
			})
		},
		methods: {
			...mapActions(['getDemandDatels', 'deleteFile', 'getStarLevel', 'evaluateApi', 'uploadFileToDisk']),
			async getStarLevelFn() { //获取星级
				try {
					let res = await this.getStarLevel()
					if (res.code == 200) {
						const {
							major,
							credit
						} = res.data
						this.credit = credit
						this.major = major
					}
				} catch (e) {
					console.log(e)
					//TODO handle the exception
				}
			},
			async getDemandDatelsFn() {
				try {
					let res = await this.getDemandDatels({
						id: this.demandId
					})
					this.demandData = res.data
				} catch (e) {
					console.log(e)
					//TODO handle the exception
				}
			},
			async evaluateApiFn() { // 评价
				try {
					if (this.demandData.currentPersonRole == 2 && this.integritycurrent < 1) {
						this.tui.toast('请做出诚信分评价')
						return
					}
					if (this.demandData.currentPersonRole == 1 && (this.integritycurrent < 1 || this.majorcurrent <
						1)) {
						this.tui.toast('请做出专业评价和诚信评价')
						return
					}
					const data = {
						creditId: this.credit[this.integritycurrent - 1]['id'],
						enclosure: this.enclosure.join(','),
						evaluationContent: this.content,
						userEvaluationId: this.userEvaluationId
					}
					if (this.majorcurrent > 0) {
						data.majorId = this.major[this.majorcurrent - 1]['id']
					}
					let res = await this.evaluateApi(data)
					if (res.code == 200) {
						this.tui.toast('评价成功')
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					}
				} catch (e) {
					console.log(e)
					this.tui.toast(e.msg)

					//TODO handle the exception
				}
			},
			async removeImg(index) { //删除图片，回传index
				try {
					let res = await this.deleteFile({
						operationCode: 'userEvaluation',
						operationId: this.enclosure[index]
					})
					let eq = this.enclosure.indexOf(this.enclosure[index])
					if (eq > -1) {
						this.enclosure.splice(eq, 1)
					}
				} catch (e) {
					this.tui.toast(e.data.msg)
					//TODO handle the exception
				}
			},
			select(e) {
				//当选择多张一起上传
				if (e.tempFilePaths.length > 1) {
					e.tempFiles.map((item, index) => {
						this.imgupload(e.tempFilePaths[index]);
					})
					return;
				}
				//单张上传
				this.imgupload(e.tempFilePaths[0]);
			},
			//上传图片
			async imgupload(imgfile) {
				try {
					this.tui.uploadFile(this.serverUrl, imgfile, {
							operationCode: 'userEvaluation'
						})
						.then(res => {
							this.enclosure.push(res.id)
							this.bloblist.push(imgfile);
						})
				} catch (e) {
					console.log(e)
				}
			},
			formatNumber(price) {
				return formatNumber(price)
			},
			majorchange(e) {
				console.log(e.index)
				this.majorcurrent = e.index
			},
			integritychange(e) {
				this.integritycurrent = e.index
			},
			sumfontnum(e) { // 限制标题字数
				this.fontNum = e.detail.value.length
			},
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-content {
		height: calc(100vh - 44px - var(--status-bar-height) - constant(--safe-area-inset-bottom));
	}
	.lefticon{
		background-image: url('/static/images/pingjia.png');
		background-size: 5px;
		background-position: left center;
		background-repeat: no-repeat;
	}
</style>
