<template>
	<mescroll-uni  ref="mescrollRef" :fixed="false" :bottombar="false" @init="mescrollInit" @down="downCallback" @up="upCallback"
		:down="downOption" :up="upOption">
		<view class="px-32">
		  <template v-if="demandList.length > 0">
		  	<block  v-for="item in demandList" :key="item.id">
		  		<indexCard :item="item"></indexCard>
		  	</block>
		  </template>
			<template v-else>
				<tui-no-data :fixed="false" :imgUrl="`https://zm.zgzhm.com/mini/img/img_nodata.png`" :marginBottom="0" :imgWidth="300" :imgHeight="300">
					<text class="fs-28">{{offList?'暂无数据':currentTab == 1?'用户关闭自己发布的需求':'用户关闭自己承接的需求'}}</text>
				</tui-no-data>
			</template>
		</view>
	</mescroll-uni>
</template>

<script>
	import { mapGetters,mapActions } from 'vuex'
export default {
	props:{
		currentTab:Number,
		userId:String,
		wxHeadPortrait:String
	},
	data(){
		return {
			mescroll: null,
			upOption: {
				onScroll: true,
				textNoMore: '暂无更多数据',
				auto: false,
				noMoreSize: 5,
				page: {
					num: 0,
					size: 10 // 每页数据的数量,默认10
				},
				empty: {
					use: false
				},
				textLoading: '加载中...',
				toTop: {
					safearea: true,
					bottom: "15%"
				}
			},
			downOption: {
				auto: false
			},
			page:1,
			pageSize:15,
			demandList:[],//需求列表
			offList:true,//关闭需求
		}
	},
	watch:{
		currentTab(val){
			console.log(val)
			this.mescroll && this.mescroll.setPageNum(1)
			if(this.currentTab == 1){
				this.getUserPublishedRequirementsFn(1)
			} else if(this.currentTab == 2){
				this.getRequirementsUndertakenByUsersListFn(1)
			}
		}
	},
	created() {
		this.mescroll && this.mescroll.setPageNum(1)
		if(this.currentTab == 1){
			this.getUserPublishedRequirementsFn(1)
		} else if(this.currentTab == 2){
			this.getRequirementsUndertakenByUsersListFn(1)
		}
	},
	methods:{
		...mapActions(['getUserInfo','getUserPublishedRequirements','getRequirementsUndertakenByUsersList','getFollow','cancelAttention']),
		async getUserPublishedRequirementsFn(page){ // 我发布的需求
			try{
				let data = {
					pageNum:page,
					pageSize:this.pageSize,
					userId:this.userId
				}
				this.offList  = true
				this.demandList = []
				let res = await this.getUserPublishedRequirements(data)
				let list = res.data
				list.forEach(item => {
					item.wxHeadPortrait = this.wxHeadPortrait
				})
				const hasNext = list.length > 14
				if(page == 1){
					this.demandList = list
				} else {
					this.demandList = this.demandList.concat(list)
				}
				if(list.length < 1){
					this.$emit('list',true)
				} else {
					this.$emit('list',false)
				}
				this.mescroll.endSuccess(list.length, hasNext);
			}catch(e){
				if(e.code == 421){
					this.offList  = false
				}
				//TODO handle the exception
			}
		},
		async getRequirementsUndertakenByUsersListFn(page){ // 承接的需求
			try{
				let data = {
					pageNum:page,
					pageSize:this.pageSize,
					userId:this.userId,
				}
				this.offList  = true
				this.demandList = []
				let res = await this.getRequirementsUndertakenByUsersList(data)
				let list = res.data
				list.forEach(item => {
					item = Object.assign(item,item.demandRegistrationSon)
				})
				const hasNext = list.length > 14
				if(page == 1){
					this.demandList = list
				} else {
					this.demandList = this.demandList.concat(list)
				}
				if(list.length < 1){
					this.$emit('list',true)
				} else {
					this.$emit('list',false)
				}
				
				this.mescroll.endSuccess(list.length, hasNext);
			}catch(e){
				if(e.code == 422){
					this.offList  = false
				}
				//TODO handle the exception
			}
		},
		mescrollInit(mescroll) {
			this.mescroll = mescroll;
		},
		scrollFn(mescroll) {
			this.scrollTop = mescroll.scrollTop
		},
		downCallback() {
			setTimeout(() => {
				this.mescroll.resetUpScroll();
			}, 600);
		},
		upCallback(mescroll) { //上拉加载
			console.log(mescroll)
			if(this.currentTab == 1){
				this.getUserPublishedRequirementsFn(mescroll.num)
			} else if(this.currentTab == 2) {
				this.getRequirementsUndertakenByUsersListFn(mescroll.num)
			}
		},
	}
}
</script>

<style>
</style>