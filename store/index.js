import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import baseApi from './baseApi.js'
import chatApi from './chat.js'
import api from './api.js'

const state ={
	isLogin:false,//判断是否登录
	token:null,//用户登录token
	user:null, //  用户信息
	navHeight:50, // 顶部导航栏高度
	navTop:0,//状态栏高度
	windowHeight:0,  // 窗口高度
	menuButtonObject:0, // 小程序右上角胶南信息
	safeAreaBottom:0,  // 手机底部安全距离
	axis:null,//当前用户定位坐标信息
	customAxis:null,//自定义位置
	isSDKReady:false,//im是否初始化成功
	unreadNum:0,//未读消息数量
	currentLocation:null,//当前定位城市
}

const mutations = {
	setToken:(state,token) => state.token = token,
	setisLogin:(state,isLogin) => state.isLogin = isLogin,
	setUser:(state,data) => state.user = data,
	setAxis:(state,data) => state.axis = data,
	setcustomAxis:(state,data) => state.customAxis = data,
	setcurrentLocation:(state,data) => state.currentLocation = data,
	
	setNavHeight: (state,data) => state.navHeight = data,
	setNavTop: (state,data) => state.navTop = data,
	setWindowHeight: (state,data) => state.windowHeight = data,
	setMenuButtonObject: (state,data) => state.menuButtonObject = data,
	setSafeAreaBottom:(state,data) => state.safeAreaBottom = data,
	
	setIsSDKReady:(state,data) => state.isSDKReady = data,
	setUnreadNum:(state,data) => state.unreadNum = data,
}

const getters = {
	getToken: state => state.token,
	getUser: state => state.user,  // 获取用户信息
	getAxis: state => state.axis,  // 获取用户信息
	customAxis: state => state.customAxis,  // 获取用户信息
	getIsLogin: state => state.isLogin, 
	currentLocation: state => state.currentLocation, 
	
	getNavHeight: state => state.navHeight,
	getNavTop: state => state.navTop,
	getWindowHeight: state => state.windowHeight,
	getMenuButtonObject: state => state.menuButtonObject,
	getSafeAreaBottom: state => state.safeAreaBottom,
	
	isSDKReady: state => state.isSDKReady,
	unreadNum: state => state.unreadNum,
}

const actions  = {
	...baseApi,
	...chatApi,
	...api
}

const store = new Vuex.Store({
	state,
	mutations,
	getters,
	actions
})
export default store
