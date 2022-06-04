<template>
	<view class="select-city-page">
		<comheader title="选择城市"></comheader>	
		<view class="mx-32">
			<tui-index-list @click="itemClick" 
			color="#000" 
			padding="0" 
			size="32rpx" 
			height="100rpx" 
			activeColor="#F85241"
			activeKeyColor="#F85241"
			activeKeyBackground="transparent"
			:list-data="cityList" 
			background="#fff" 
			:isblock="false" 
			:bottomLine="false">
				<template slot-scope="{ entity, index, subi }" slot="item">
					<view class="fs-28 ft1D2129 p-1 bgF2F3F5 mr-2 mb-2">{{entity.name}}</view>
				</template>
			</tui-index-list>
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cityList:[
					{
						"letter": "A",
						"title":"A省",
						"data": [{
								"id": 1,
								"name": "延边朝鲜族自治州",
							},
							{
								"id": 2,
								"name": "枣庄市"
							},
							{
								"id": 2,
								"name": "株洲市"
							},
							{
								"id": 2,
								"name": "九江市"
							},
							{
								"id": 2,
								"name": "湘潭市"
							}
						]
					},
					{
						"letter": "B",
						"title":"B省",
						"data": [{
								"id": 1,
								"name": "延边朝鲜族自治州",
							},
							{
								"id": 2,
								"name": "枣庄市3"
							},
							{
								"id": 2,
								"name": "枣庄市4"
							},
							{
								"id": 2,
								"name": "枣庄市5"
							},
							{
								"id": 2,
								"name": "枣庄市6"
							}
						]
					}
				
				]
			}
		},
		methods: {
			itemClick(e){
				// console.log(e)
				uni.$emit('updateData',e)
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style>

</style>
