<template>
	<view class="agreement-page bgF7F8FA h-100vh flex flex-column">
		<comheader  :title="title"></comheader>
		<view class="agreement-scroll overflow-y p-2">
			<template v-if="content">
				<rich-text :nodes="content" :selectable="false"></rich-text>
			</template>
			<template v-else>
				<tui-no-data :fixed="false" :imgUrl="`https://zm.zgzhm.com/mini/img/img_nodata.png`" :marginBottom="0" :imgWidth="300" :imgHeight="300">
					<text class="fs-28">暂无数据</text>
				</tui-no-data>
			</template>
		</view>
	</view>
</template>

<script>
	import { mapGetters,mapActions } from 'vuex'
	const titleMap = {
		1:'服务协议',
		2:'发布规则',
		3:'隐私政策',
		4:'提现说明',
		5:'佣金收益及提现服务',
	}
	export default {
		data() {
			return {
				content:'',
				title:''
			}
		},
		onLoad(query) {
			this.title = titleMap[query.type]
			this.getServiceAgreementFn(query.type)
		},
		methods: {
			...mapActions(['getServiceAgreement']),
			async getServiceAgreementFn(type){
				try{
					let res = await this.getServiceAgreement({type:type})
					if(res.code == 200){
						this.content = res.data
					}
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style>
.agreement-scroll{
	height: calc(100vh - 44px - var(--status-bar-height));
}
</style>
