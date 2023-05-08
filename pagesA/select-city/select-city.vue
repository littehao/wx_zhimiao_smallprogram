<template>
	<view class="select-city-page bgF7F8FA h-100vh flex flex-column">
		<comheader title="选择城市"></comheader>	
		<view class="bgffff fs-28 flex align-center px-2" style="height: 50px;">
			<text class="ft86909C">当前所在城市：</text>
			<text @click="curCity">{{currentLocation.cityName}}</text>
		</view>
		<view class="city-scroll position-relative flex-1">
			<uni-indexed-list :options="cityList" :showSelect="false" @click="itemClick"></uni-indexed-list>
		</view>	
		<view :style="{height: getSafeAreaBottom+'px'}" class="bgffff position-relative" style="z-index: 99;"></view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { city } from './cityList.js'
	import uniIndexedList from '@/pagesA/components/uni-indexed-list/components/uni-indexed-list/uni-indexed-list.vue'
	export default {
		components:{uniIndexedList},
		data() {
			return {
				cityList:[]
			}
		},
		computed:{
			...mapGetters(['getAxis','getSafeAreaBottom','currentLocation']),
		},
		created() {
			city.sort((a,b)=>{
				if(a.letter < b.letter){
					return -1
				} else if(a.letter == b.letter) {
					return 0
				} else {
					return 1
				}
			})
			this.cityList = city
		},
		methods: {
			curCity(){
				let list = []
				this.cityList.forEach(item => {
					list = list.concat(item.data)
				})
				const cur = list.find(obj => obj.title == this.currentLocation.cityName)
				uni.$emit('updateData',{
					item:{
						location:{
							lat:cur.center[1],
							lng:cur.center[0],
						},
						name:cur.title
					},
					type:'home'
				})
				uni.navigateBack({
					delta: 1
				})
			},
			itemClick(e){
				uni.$emit('updateData',{...e,type:'home'})
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.city-scroll{
	height: calc(100vh - 44px - 50px - var(--status-bar-height));
	overflow-y: auto;
}
</style>
