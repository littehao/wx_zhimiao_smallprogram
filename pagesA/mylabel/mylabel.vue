<template>
	<view class="mylabel-page bgffff h-100vh flex flex-column">
		<comheader  title="我的标签"></comheader>
		<view class="flex  align-center mx-32 py-3  border-bottom">
			<text class="ft1D2129 fs-32" style="width: 250rpx;">职业标签</text>
			<tui-input v-model="labelText" :size="28" :borderTop="false" padding="0" :borderBottom="false" placeholderStyle="color:#86909C;font-size:28rpx;" placeholder="(最多添加5个)"></tui-input>
			<view class="flex align-center" @click="addLabel">
				<tui-icon :size="20" color="#F85241" name="plus"></tui-icon>
				<text class="ftF85241 fs-28 text-center" style="width: 40px;">添加</text>
			</view>
		</view>
		<view class="flex flex-wrap align-start content-start mx-32 flex-1 py-3">
			<template v-if="labelList.length > 0">
				<block v-for="(item,index) in labelList" :key="index">
					<view class="flex align-center bgF2F3F5 rounded px-2 mr-2 mb-2" style="height: 50rpx;">
						<text class="fs-28 ft4E5969 mr-1">{{item.label}}</text>
						<tui-icon :size="15" color="#4E5969" name="shut" @click="delItem(item)"></tui-icon>
					</view>
				</block>
			</template>
			<template v-else>
				<tui-no-data :imgUrl="`https://zm.zgzhm.com/mini/img/img_nodata.png`" :marginBottom="0" :imgWidth="300" :imgHeight="300">
					<text class="fs-28">你还没添加职业标签哟～</text>
				</tui-no-data>
			</template>
		</view>
		<view class="mx-32 pt-2 border-top">
			<view class="ftffff fs-28 py-2 rounded text-center" :class="labelList.length?'bgF85241':'bgc6c6c6'" @click="submitLabel">确定</view>
			<view :style="{height:getSafeAreaBottom + 20+'px'}"></view>
		</view>
	</view>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import tuiInput from '@/pagesA/components/tui-input/tui-input.vue'
	export default {
		components:{tuiInput},
		data() {
			return {
				labelText:'',
				labelList:[]
			}
		},
		computed:{
			...mapGetters(['getSafeAreaBottom'])
		},
		created() {
			this.getUserOccupationLabelFn()
		},
		methods: {
			...mapActions(['occupationLabel','getUserOccupationLabel','deleteLabel']),
			async addLabel(){ // 添加标签
				try{
					if(!this.labelText) return
					let data = {
						label:this.labelText
					}
					let res = await this.occupationLabel(data)
					this.labelText = ''
					this.tui.toast(res.msg)
					this.getUserOccupationLabelFn()
				}catch(e){
					console.log(e)
					this.tui.toast(e.data.msg)
					//TODO handle the exception
				}
			},
			async getUserOccupationLabelFn(){ // 获取 标签列表
				try{
					let res = await this.getUserOccupationLabel({})
					this.labelList  = res.data
				}catch(e){
					console.log(e)
					this.tui.toast(e.data.msg)
					//TODO handle the exception
				}
			},
			async delItem(item){ // 删除标签
				try{
					let res = await this.deleteLabel({id:item.id})
					this.tui.toast(res.msg)
					this.getUserOccupationLabelFn()
				}catch(e){
					console.log(e)
					this.tui.toast(e.data.msg)
					//TODO handle the exception
				}
			},
			submitLabel(){
				if(!this.labelList.length)return
				uni.$emit('updateData',{labels:this.labelList})
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>

</style>
