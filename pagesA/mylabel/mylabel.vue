<template>
	<view class="mylabel-page bgffff h-100vh flex flex-column">
		<comheader  title="我的标签"></comheader>
		<view class="flex  align-center mx-32 py-3">
			<text class="ft1D2129 fs-32" style="width: 250rpx;">职业标签</text>
			<tui-input v-model="labelText" :size="28" :borderTop="false" padding="0" :borderBottom="false" placeholderStyle="color:#86909C;font-size:28rpx;" placeholder="(最多添加5个)"></tui-input>
			<view class="flex align-center" @click="addLabel">
				<tui-icon :size="20" color="#F85241" name="plus"></tui-icon>
				<text class="ftF85241 fs-28 text-center" style="width: 40px;">添加</text>
			</view>
		</view>
		<view class="flex flex-wrap align-start content-start mx-32 flex-1">
			<block v-for="(item,index) in labelList" :key="index">
				<view class="flex align-center bgF2F3F5 rounded px-2 mr-2 mb-2" style="height: 50rpx;">
					<text class="fs-28 ft4E5969 mr-1">{{item}}</text>
					<tui-icon :size="15" color="#4E5969" name="shut" @click="delItem(index)"></tui-icon>
				</view>
			</block>
		</view>
		<view class="mx-32 pt-2 border-top">
			<view class="ftffff fs-28 py-2 rounded text-center" :class="labelList.length?'bgF85241':'bgc6c6c6'" @click="submitLabel">提交</view>
			<view :style="{height:getSafeAreaBottom + 20+'px'}"></view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				labelText:'',
				labelList:['搜索历史']
			}
		},
		computed:{
			...mapGetters(['getSafeAreaBottom'])
		},
		methods: {
			addLabel(){
				if(!this.labelText) return
				this.labelList.push(this.labelText)
				this.labelText =  ''
			},
			delItem(index){
				this.labelList.splice(index,1)
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
