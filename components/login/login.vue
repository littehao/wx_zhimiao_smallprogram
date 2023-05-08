<template>
	<tui-modal :show="show" padding="0" custom width="90%">
		<view class="flex flex-column position-relative" style="padding:40px 10px">
			<tui-icon class="position-absolute" style="top:5px;right:5px" :size="24" name="shut" color="#86909C" @click="hide"></tui-icon>
			<view class="ft1D2129  fs-40 text-center mb-5">
				登录或注册
			</view>
			<loginBt ref="loginBt" @hide="hide"></loginBt>
		</view>
	</tui-modal>
</template>

<script>
	import { mapActions } from 'vuex'
	import loginBt from './loginBtn.vue'
	export default{
		components:{loginBt},
		props:{
			modal:{
				type:Boolean,
				default:false
			}
		},
		watch:{
			modal(newVal){
				this.show = newVal
			}
		},
		data(){
			return {
				show:false
			}
		},
		methods:{
			hide(){
				this.show = false
				this.$refs.loginBt.showphone = false
				this.$emit('hide')
			}
		}
	}
</script>

<style>
</style>