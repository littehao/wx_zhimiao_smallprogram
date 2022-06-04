<template>
	<view class="release-page flex flex-column h-100vh">
		<comheader :backBtn="false" title="发布需求"></comheader>	
		<view class="release-form flex-1 px-32 flex flex-column">
			<view class="border-bottom flex align-center position-relative mb-2" style="min-height: 48px;">
				<textarea placeholder="请输入需求标题" maxlength="50" name="title" auto-height @input="sumfontnum"/>
				<text class="position-absolute right-0 bottom-0 ftC9CDD4 fs-24">{{fontNum}}/50</text>
			</view>
			<view class="border-bottom flex flex-column mb-2" style="min-height: 48px;">
				<textarea placeholder="请输入需求详情" maxlength="100" name="detail" @input="sumfontnum"/>
				<view class="flex align-center justify-end">
					<text class="ftC9CDD4 fs-24">{{fontNum}}/100</text>
				</view>
			</view>
			<view class="flex justify-start mb-4">
				<view class="flex align-center bgF2F3F5 rounded-circle  px-2 py-1" @click="locationTo">
					<tui-icon color="#4E5969" size="16" name="gps"></tui-icon>
					<text class="ml-1 fs-24 ft4E5969">{{wordkAddress}}</text>
				</view>	
			</view>
			<view class="border-bottom pb-2">
				<view class="flex align-center mb-1 ft1D2129 fs-32">上传图片<text class="ft86909C fs-28">(最多上传4张)</text></view>
				<tui-upload width="200" height="200" :value="uploadList" :limit="4" :serverUrl="serverUrl" @complete="uploadResult" @remove="removeImg"></tui-upload>
			</view>
			<view class="flex align-center border-bottom" style="height: 46px;">
				<text class="ft000000 fs-28 family">需求价格</text>
				<input class="flex-1 text-right" type="number" placeholder-class="placeholder" placeholder="请输入价格" />
				<text class="ftF85241 fs-28 family ml-2">元</text>
			</view>
			<view class="flex align-center ft86909C fs-24 py-2">发布即代表同意 <text class="fs-24 ftF85241">《寻工/找工信息发布规则》</text></view>	
		</view>
		<view class="flex-1 flex align-end">
			<view class="border-top  w-100 px-32 border-box pt-2">
				<view class="ftffff fs-28 bgF85241 rounded text-center py-2 w-100">发布需求</view>	
			</view>
		</view>
		<view :style="{height:getSafeAreaBottom+'px'}"></view>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				fontNum:0,
				uploadList:[],
				serverUrl:'',
				wordkAddress:'选择工作地点'
			}
		},
		computed:{
			...mapGetters(['getSafeAreaBottom'])
		},
		onShow() {
			// uni.hideTabBar()
			let that = this
			uni.$on('updateData',function(data){
				that.wordkAddress  = data.title
			})
		},
		onHide(){
			// uni.showTabBar()
		},
		methods: {
			locationTo(){
				uni.navigateTo({
					url:'/pagesA/location/location'
				})
			},
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

<style>

</style>
