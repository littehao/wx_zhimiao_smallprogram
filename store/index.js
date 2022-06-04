import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state ={
	navHeight:50, // 顶部导航栏高度
	navTop:0,//状态栏高度
	windowHeight:0,  // 窗口高度
	menuButtonObject:0, // 小程序右上角胶南信息
	safeAreaBottom:0,  // 手机底部安全距离
}

const mutations = {
	setNavHeight: (state,data) => state.navHeight = data,
	setNavTop: (state,data) => state.navTop = data,
	setWindowHeight: (state,data) => state.windowHeight = data,
	setMenuButtonObject: (state,data) => state.menuButtonObject = data,
	setSafeAreaBottom:(state,data) => state.safeAreaBottom = data,
}

const getters = {
	getNavHeight: state => state.navHeight,
	getNavTop: state => state.navTop,
	getWindowHeight: state => state.windowHeight,
	getMenuButtonObject: state => state.menuButtonObject,
	getSafeAreaBottom: state => state.safeAreaBottom,
}

const actions  = {
	
}

const store = new Vuex.Store({
	state,
	mutations,
	getters,
	actions
})
export default store
