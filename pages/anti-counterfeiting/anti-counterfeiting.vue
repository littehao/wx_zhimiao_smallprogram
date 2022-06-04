<template>
	<view class="bgF7F8FA h-100vh flex flex-column">
		<comheader  title="打假需求"></comheader>
		<view class="scroll-row-box pt-2 flex flex-column">
			<view class="demand-card bgffff mx-32 p-2 rounded mb-2">
				<view class="flex justify-between">
					<text class="ft1D2129 fs-28  flex-1 text-ellipsis2 lineh50  f-w-b">成都市武侯区需要广告安装工人，工费400一天，此处根据标题字数换行，标…</text>
					<view class="flex flex-column ml-2">
						<text class="ftF53F3F fs-40 f-w-b text-ellipsis">12000.00元</text>
						<text class="ft86909C fs-24 text-right">已支付</text>
					</view>
				</view>
				<view class="flex">
					<text class="text-ellipsis2  ft4E5969 fs-24 lineh44">所谓“功夫流感”是对亚裔人口的严重冒犯，是赤裸裸的种族主义，对日益成为种族歧视受害者的亚裔美国人来说尤其不可接…</text>
				</view>
			</view>
			
			<view class="flex-1 bgffff px-32 py-32">
				<view class="border-bottom flex flex-column mb-2 pb-1" style="min-height: 48px;">
					<textarea placeholder="请输入投诉理由 (必填)" maxlength="100" name="detail" @input="sumfontnum"/>
					<view class="flex align-center justify-end">
						<text class="ftC9CDD4 fs-24">{{fontNum}}/100</text>
					</view>
				</view>
				<view class="pb-2">
					<view class="flex align-center mb-1 ft1D2129 fs-32">上传图片<text class="ft86909C fs-28">(最多上传4张)</text></view>
					<tui-upload width="200" height="200" :value="uploadList" :limit="4" :serverUrl="serverUrl" @complete="uploadResult" @remove="removeImg"></tui-upload>
				</view>
			</view>
		</view>
		<view class="flex-1 flex align-end bgffff" :style="{'padding-bottom': getSafeAreaBottom > 0?getSafeAreaBottom+'px':'15'+'px'}">
			<view class="border-top  w-100 px-32 border-box pt-2">
				<view class="ftffff fs-28 bgF85241 rounded text-center py-2 w-100">发布需求</view>	
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				fontNum:0,
				uploadList:[],
				serverUrl:'',
			}
		},
		computed:{
			...mapGetters(['getNavHeight','getNavTop','getSafeAreaBottom'])
		},
		methods: {
			sumfontnum(e){ // 限制标题字数
				this.fontNum=e.detail.value.length
			},
			uploadResult(e){ // 上传完成
				
			},
			removeImg(e){ //删除图片，回传index
				
			}
		}
	}
</script>

<style  lang="scss" scoped>
.scroll-row-box{
	height: calc(100vh - 44px - var(--status-bar-height));
}
</style>
