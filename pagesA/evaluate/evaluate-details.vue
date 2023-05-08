<template>
	<view class="bgF7F8FA h-100vh">
		<comheader title="查看评价"></comheader>
		<view class="scroll-content overflow-y pt-2">
			<view class="px-2 flex align-center justify-between mx-2 bgffff rounded mb-2 py-3">
				<view class="fs-32 ft1D2129">
					{{demandData.title}}
				</view>
				<view class="ftF53F3F fs-32 font-weight-bolder">¥{{formatNumber(demandData.demandPrice || 0)}}</view>
			</view>
			<view class="bgffff rounded mb-2 mx-2 px-2">
				<view class="flex py-3">
					<view class="position-relative mr-2" style="width:40px;height:40px;">
						<image class="rounded-circle bgF2F3F5" :src="demandRegistration.wxHeadPortrait"
							mode="aspectFill" style="width:40px;height:40px;"></image>
						<image class="position-absolute right-0 bottom-0" src="/static/images/level.png" mode="widthFix"
							style="width: 20px;height: 20px;"></image>
					</view>
					<view class="flex flex-column flex-1">
						<text class="mb-1 ft1D2129 fs-28">{{demandRegistration.evaluatorUserName}}</text>
						<view class="flex align-center" v-if="demandRegistration.evaluationTime">
							<text class="fs-24 ft4E5969">{{demandRegistration.evaluationTime}}</text>
						</view>
					</view>
				</view>
				<template v-if="demandRegistration.evaluationContent">
					<view class="fs-28 ft1D2129">{{demandRegistration.evaluationContent}}</view>
					<view class="mt-3 flex align-center justify-around">
						<block v-for="(item,index) in demandRegistration.httpPathList" :key="index">
							<image @click="previewImage(index,demandRegistration.httpPathList)" class="rounded"
								:src="item" mode="aspectFill" style="width: 75px;height: 75px;"></image>
						</block>
					</view>
					<view class="mt-3 pb-2">
						<view class="flex justify-between mb-2">
							<text class="fs-28 ft1D2129">专业分</text>
							<view class="flex align-center">
								<tui-rate :current="demandRegistration.professionalNumberOfStars" active="#F7BA1E">
								</tui-rate>
								<text style="width: 80rpx;"
									class="fs-24 ft86909C text-right">{{transText(demandRegistration.professionalNumberOfStars)}}</text>
							</view>
						</view>
						<view class="flex justify-between">
							<text class="fs-28 ft1D2129">诚信值</text>
							<view class="flex align-center">
								<tui-rate :current="demandRegistration.creditNumberOfStars" active="#F7BA1E"></tui-rate>
								<text style="width: 80rpx;"
									class="fs-24 ft86909C text-right">{{transText(demandRegistration.creditNumberOfStars)}}</text>
							</view>
						</view>
					</view>
				</template>
				<view class="pb-3" v-else>
					<tui-no-data :fixed="false" :imgUrl="`https://zm.zgzhm.com/mini/img/img_nodata.png`" :marginBottom="0" :imgWidth="300"
						:imgHeight="300" height="300rpx">
						<text class="fs-28">对方尚未评价</text>
					</tui-no-data>
				</view>
			</view>
			<view class="bgffff rounded my-1 mx-2 px-2 mt-2">
				<view class="flex py-3">
					<view class="position-relative mr-2" style="width:40px;height:40px;">
						<image class="rounded-circle bgF2F3F5" :src="demandUndertaking.wxHeadPortrait" mode="aspectFill"
							style="width:40px;height:40px;"></image>
						<image class="position-absolute right-0 bottom-0" src="/static/images/level.png" mode="widthFix"
							style="width: 20px;height: 20px;"></image>
					</view>
					<view class="flex flex-column flex-1">
						<text class="mb-1 ft1D2129 fs-28">{{demandUndertaking.evaluatorUserName}}</text>
						<view class="flex align-center" v-if="demandUndertaking.evaluationTime">
							<text class="fs-24 ft4E5969">{{demandUndertaking.evaluationTime}}</text>
						</view>
					</view>
				</view>
				<template v-if="demandUndertaking.evaluationContent">
					<view class="fs-28 ft1D2129">{{demandUndertaking.evaluationContent}}</view>
					<view class="mt-3" v-if="demandUndertaking.httpPathList.length > 0">
						<block v-for="(item,index) in demandUndertaking.httpPathList" :key="index">
							<image @click="previewImage(index,demandUndertaking.httpPathList)" class="mr-1 rounded"
								:src="item" mode="widthFix" style="width: 25%;height: 25%;"></image>
						</block>
					</view>
					<view class="border-bottom mt-3 pb-5">
						<view class="flex justify-between">
							<text class="fs-28 ft1D2129">诚信值</text>
							<view class="flex align-center">
								<tui-rate :current="demandUndertaking.creditNumberOfStars" active="#F7BA1E"></tui-rate>
								<text style="width: 80rpx;"
									class="fs-24 ft86909C text-right">{{transText(demandUndertaking.creditNumberOfStars)}}</text>
							</view>
						</view>
					</view>
				</template>
				<view class="pb-3" v-else>
					<tui-no-data :fixed="false" :imgUrl="`https://zm.zgzhm.com/mini/img/img_nodata.png`" :marginBottom="0" :imgWidth="300"
						:imgHeight="300" height="300rpx">
						<text class="fs-28">对方尚未评价</text>
					</tui-no-data>
				</view>
			</view>

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
				majorcurrent: 4, //专业分
				integritycurrent: 4, //诚信分
				demandData: {},
				demandRegistration: {}, //发起方
				demandUndertaking: {}, //承接方
			}
		},
		computed: {
			...mapGetters(['getSafeAreaBottom']),
		},
		onLoad(query) {
			if (query.demandId) {
				this.demandId = query.demandId
				this.userEvaluationId = query.userEvaluationId
				this.getDemandDatelsFn()
				this.getEvaluationFn()
			}
		},
		methods: {
			...mapActions(['getDemandDatels', 'getEvaluation']),
			async getDemandDatelsFn() {
				try {
					let res = await this.getDemandDatels({
						id: this.demandId
					})
					if (res.code == 200) {
						this.demandData = res.data
					}
				} catch (e) {
					console.log(e)
					//TODO handle the exception
				}
			},
			async getEvaluationFn() {
				try {
					let res = await this.getEvaluation({
						userEvaluationId: this.userEvaluationId
					})
					if (res.code == 200) {
						const {
							demandRegistration,
							demandUndertaking
						} = res.data
						this.demandRegistration = demandRegistration
						this.demandUndertaking = demandUndertaking
					}
				} catch (e) {
					//TODO handle the exception
				}
			},
			previewImage(index, imgsList) {
				uni.previewImage({
					current: index,
					urls: imgsList,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			transText(start) {
				switch (start) {
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
			formatNumber(price) {
				return formatNumber(price)
			},
		}
	}
</script>
<style lang="scss" scoped>
	.scroll-content {
		height: calc(100vh - 44px - var(--status-bar-height) - constant(--safe-area-inset-bottom));
	}
</style>
