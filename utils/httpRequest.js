/**
 * 常用方法封装 请求，文件上传等
 * @author echo. 
 **/
import config from "../config/index.js"
import store from '@/store/index.js';
const tui = {
	//接口地址
	interfaceUrl: function() {
		return config.api
	},
	toast: function(text, duration, success) {
		uni.showToast({
			// #ifndef MP-ALIPAY
			duration: duration || 2000,
			// #endif
			title: text || "出错啦~",
			icon: success ? 'success' : 'none'
		})
	},
	modal: function(title, content, showCancel, callback, confirmColor, confirmText) {
		uni.showModal({
			title: title || '提示',
			content: content,
			showCancel: showCancel,
			cancelColor: "#555",
			confirmColor: confirmColor || "#5677fc",
			confirmText: confirmText || "确定",
			success(res) {
				if (res.confirm) {
					callback && callback(true)
				} else {
					callback && callback(false)
				}
			}
		})
	},
	isAndroid: function() {
		const res = uni.getSystemInfoSync();
		return res.platform.toLocaleLowerCase() == "android"
	},
	isPhoneX: function() {
		const res = uni.getSystemInfoSync();
		let iphonex = false;
		let models = ['iphonex', 'iphonexr', 'iphonexsmax', 'iphone11', 'iphone11pro', 'iphone11promax']
		const model = res.model.replace(/\s/g, "").toLowerCase()
		if (models.includes(model)) {
			iphonex = true;
		}
		return iphonex;
	},
	constNum: function() {
		let time = 0;
		// #ifdef APP-PLUS
		time = this.isAndroid() ? 300 : 0;
		// #endif
		return time
	},
	delayed: null,
	loadding: false,
	showLoading: function(title, mask = true) {
		uni.showLoading({
			mask: mask,
			title: title || '请稍候...'
		})
	},
	/**
	 * 请求数据处理
	 * @param string url 请求地址
	 * @param string method 请求方式
	 *  GET or POST
	 * @param {*} postData 请求参数
	 * @param bool isDelay 是否延迟显示loading
	 * @param bool isForm 数据格式
	 *  true: 'application/x-www-form-urlencoded'
	 *  false:'application/json'
	 * @param bool hideLoading 是否隐藏loading
	 *  true: 隐藏
	 *  false:显示
	 */
	request: async function(url, method, postData, isDelay, isForm, hideLoading) {
		//接口请求
		tui.loadding && uni.hideLoading();
		tui.loadding = false;
		if (hideLoading) {
			tui.loadding = true
			tui.showLoading()
		}
		const headers = {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
		if (isForm) {
			Object.assign(headers, {
				'Content-Type': 'application/json'
			});
		}
		if (tui.getToken()) {
			Object.assign(headers, {
				token: tui.getToken()
			});
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url: tui.interfaceUrl() + url,
				data: postData,
				header: headers,
				method: method || "POST", //'GET','POST'
				// dataType: 'json',
				success: (res) => {
					clearTimeout(tui.delayed)
					tui.delayed = null;
					if (tui.loadding && hideLoading) {
						uni.hideLoading()
					}
					if(res.data.code == 200){
						resolve(res.data)
					}else if(res.data.code == 401 || res.data.code == 405){ // token过期或被串改
						uni.removeStorageSync('zhimiao_token')
						uni.removeStorageSync('zhimiao_user')
						uni.removeStorageSync('userSig')
						store.commit('setToken',null)
						store.commit('setUser',null)
						uni.reLaunch({
							url:'/pages/main'
						})
					} else {
						reject(res.data)
					}
					
				},
				fail: (res) => {
					clearTimeout(tui.delayed)
					tui.delayed = null;
					console.log(tui.interfaceUrl() + url)
					tui.toast("网络不给力，请稍后再试~")
					reject(res)
				}
			})
		})
	},
	/**
	 * 上传文件
	 * @param string url 请求地址
	 * @param string src 文件路径
	 */
	uploadFile: function(url, src,formData) {
		tui.showLoading()
		return new Promise((resolve, reject) => {
			console.log(url)
			const uploadTask = uni.uploadFile({
				url: tui.interfaceUrl() + url,
				filePath: src,
				name: 'upfile',
				header: {
					'token': tui.getToken()
				},
				formData:formData,
				success: function(res) {
					uni.hideLoading()
					let d = JSON.parse(res.data.replace(/\ufeff/g, "") || "{}")
					if (d.code % 100 == 0) {
						//返回图片地址
						let fileObj = d.data;
						resolve(fileObj)
					} else {
						tui.toast(res.msg);
					}
				},
				fail: function(res) {
					reject(res)
					tui.toast(res.msg);
				}
			})
		})
	},
	tuiJsonp: function(url, callback, callbackname) {
		// #ifdef H5
		window[callbackname] = callback;
		let tuiScript = document.createElement("script");
		tuiScript.src = url;
		tuiScript.type = "text/javascript";
		document.head.appendChild(tuiScript);
		document.head.removeChild(tuiScript);
		// #endif
	},
	//设置用户信息
	setUserInfo: function(mobile, token) {
		//uni.setStorageSync("thorui_token", token)
		uni.setStorageSync("zhimiao_mobile", mobile)
	},
	//获取token
	getToken() {
		return uni.getStorageSync("zhimiao_token")
	},
	//获取当前用户信息
	getUser() {
		const user = uni.getStorageSync("zhimiao_user")
		if(user){
			return JSON.parse(user)
		}
		return null
	},
	// 设置缓存值
	setStorage(key,data){
		uni.setStorageSync(key,JSON.stringify(data))
	},
	// 获取缓存值
	getStorage(key){
		let data = uni.getStorageSync(key)
		if(data){
			return JSON.parse(data)
		} else {
			return null
		}
	},
	//判断是否登录
	isLogin: function() {
		if(uni.getStorageSync("zhimiao_token") && uni.getStorageSync("zhimiao_user")){
			return true
		}
		return false
	},
	//跳转页面，校验登录状态
	href(url, isVerify) {
		if (isVerify && !tui.isLogin()) {
			uni.navigateTo({
				url: '/pagesA/login/login'
			})
		} else {
			uni.navigateTo({
				url: url
			});
		}
	}
}

export default tui
