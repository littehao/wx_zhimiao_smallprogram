<template>
	<view class="container">
		<tui-picture-cropper lockRatio :imageUrl="imageUrl" @ready="ready" @cropper="cropper"></tui-picture-cropper>
	</view>
</template>

<script>
import tuiPictureCropper from '@/pagesA/components/tui-picture-cropper/tui-picture-cropper.vue'
export default {
	components:{tuiPictureCropper},
	data() {
		return {
			src: '',
			imageUrl: '' //要裁剪的图片
		};
	},
	onLoad(options) {
		this.src = options.src || '';
		//如果从上个页面传值时可显示loading
		this.src &&
			uni.showLoading({
				title: '请稍候...',
				mask: true
			});
	},
	methods: {
		ready() {
			this.imageUrl = this.src;
		},
		cropper(e) {
			
			//裁剪完成后处理逻辑
			if(e.url){
				// uni.previewImage({
				// 	current: '', // 当前显示图片的http链接
				// 	urls: [e.url] // 需要预览的图片http链接列表
				// });
				console.log(e)
			}else{
				console.log(e.base64)
				this.tui.toast('裁剪成功！查看控制台打印')
			}
		}
	}
};
</script>

<style></style>
