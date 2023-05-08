<template>
	<view class="service-page bgF7F8FA h-100vh flex flex-column">
		<comheader  title="职苗资质"></comheader>
		<view class="bgffff px-3">
			<view class="flex align-center mx-2 py-4 border-bottom" @click="tui.href('/pagesA/about/viewpic?title=营业执照&url=https://zm.zgzhm.com/mini/img/flair_yingye.png')">
				<text class="ft1D2129  fs-32 flex-1">营业执照</text>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
			<view class="flex align-center mx-2 py-4 border-bottom" @click="tui.href('/pagesA/about/viewpic?title=人力资源许可证&url=https://zm.zgzhm.com/mini/img/flair_renli.png')">
				<text class="ft1D2129  fs-32 flex-1">人力资源许可证</text>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
			<view class="flex align-center mx-2 py-4 border-bottom" @click="tui.href('/pagesA/about/viewpic?title=平台EDI许可证&url=https://zm.zgzhm.com/mini/img/flair_dianxin.png')">
				<text class="ft1D2129  fs-32 flex-1">平台EDI许可证</text>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
			<view class="flex align-center mx-2 py-4 border-bottom" @click="tui.href('/pagesA/about/viewpic?title=ICP备案/许可证号&content=蜀ICP备2022017784号')">
				<text class="ft1D2129  fs-32 flex-1">ICP备案/许可证号</text>
				<tui-icon color="#86909C" size="20" name="arrowright"></tui-icon>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters,mapActions } from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		
		methods: {
			clickImg(url) {
				wx.previewImage({
					urls: [url], //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
					current: '', // 当前显示图片的http链接，默认是第一个
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},
		}
	}
</script>

<style>
.agreement-scroll{
	height: calc(100vh - 44px - var(--status-bar-height));
}
</style>
