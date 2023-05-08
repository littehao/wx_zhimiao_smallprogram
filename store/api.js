import tui from "@/utils/httpRequest.js"
import store from '@/store'
const api = {
	/**
	 * 获取服务协议
	 */
	getServiceAgreement: (context,data) => tui.request(
		`/api-business-user-code/service/agreement/getServiceAgreement/${data.type}`,
		'GET'
	),
	/**
	 * 修改名称和头像
	 */
	updNameAndPortrait: (context,data) => tui.request(
		'/api-business-user-code/user/info/updNameAndPortrait',
		'GET',
		data
	),
	/**
	 * 获取当前用户信息
	 */
	getCurrentLogonInformation: (context,data) => {
		return tui.request(
			'/api-business-user-code/user/info/getCurrentLogonInformation',
			'GET'
		).then(res =>{
			if (res.code == 200){
				uni.setStorageSync('zhimiao_user',JSON.stringify(res.data))
				store.commit('setUser',res.data)
				if(tui.isLogin()){
					store.commit('setisLogin',true)
				}
			}
			return res
		}).catch(err =>{
			console.log(err,'--------')
		})
	},
	/**
	 * 获取登录用户信息数值
	 */
	getUserInformationQuantity: (context,data) => tui.request(
		'/api-business-user-code/user/info/getUserInformationQuantity',
		'GET'
	),
	/**
	 * 完善个人资料
	 */
	improvePersonalData: (context,data) => tui.request(
		'/api-business-user-code/user/info/improvePersonalData',
		'POST',
		data,
		false,
		true
	),
	/**
	 * 添加职业标签
	 */
	occupationLabel: (context,data) => tui.request(
		'/api-business-user-code/occupation/label',
		'POST',
		data,
		false,
		true
	),
	/**
	 * 获取当前登录人的职业标签
	 */
	getUserOccupationLabel: (context,data) => tui.request(
		'/api-business-user-code/occupation/label/getUserOccupationLabel',
		'POST',
		data,
		false,
		true
	),
	/**
	 * 删除职业标签
	 */
	deleteLabel: (context,data) => tui.request(
		`/api-business-user-code/occupation/label/${data.id}`,
		'DELETE'
	),
	/**
	 * 添加需求登记
	 */
	registrationDemand: (context,data) => tui.request(
		`/api-business-user-code/demand/registration`,
		'POST',
		data,
		false,
		true
	),
	/**
	 * 删除需求
	 */
	delUserDemandRegistration: (context,data) => tui.request(
		`/api-business-user-code/demand/registration/delUserDemandRegistration`,
		'DELETE',
		data
	),
	/**
	 * 获取轮播图列表
	 */
	getRotationChartList: (context,data) => tui.request(
		`/api-business-user-code/user/rotation/chart/getRotationChartList`,
		'GET',
		data
	),
	/**
	 * 查询我的首页推荐
	 */
	getMyHomeRecommendationList: (context,data) => tui.request(
		`/api-business-user-code/demand/registration/getMyHomeRecommendationList`,
		'GET',
		data,
		false,
		true
	),
	/**
	 * 获取最新需求
	 */
	getNewestList: (context,data) => tui.request(
		`/api-business-user-code/demand/registration/getNewestList`,
		'GET',
		data,
		false,
		true
	),
	/**
	 * 获取需求登记
	 */
	getDemandDatels: (context,data) => tui.request(
		`/api-business-user-code/demand/registration/selectByPrimaryKey/${data.id}`,
		'GET',
		data,
		false,
		false
	),
	/**
	 * 获取用户信息
	 */
	getUserInfo: (context,data) => tui.request(
		`/api-business-user-code/user/info/selectByPrimaryKey/${data.id}`,
		'GET'
	),
	/**
	 * 我发布的需求
	 */
	getMyPublishedRequirements: (context,data) => tui.request(
		`/api-business-user-code/demand/registration/getMyPublishedRequirements`,
		'GET',
		data
	),
	/**
	 * 我承接的需求
	 */
	getDemandUndertakingList: (context,data) => tui.request(
		`/api-business-user-code/demand/undertaking/getDemandUndertakingList`,
		'GET',
		data
	),
	/**
	 * 获取用户已完成承接或发布需求
	 */
	getCompletedAcceptanceReleaseRequirements: (context,data) => tui.request(
		`/api-business-user-code/demand/registration/getCompletedAcceptanceReleaseRequirements`,
		'GET',
		data
	),
	/**
	 * 查询用户发布的需求
	 */
	getUserPublishedRequirements: (context,data) => tui.request(
		`/api-business-user-code/demand/registration/getUserPublishedRequirements`,
		'GET',
		data
	),
	/**
	 * 用户承接的需求
	 */
	getRequirementsUndertakenByUsersList: (context,data) => tui.request(
		`/api-business-user-code/demand/undertaking/getRequirementsUndertakenByUsersList`,
		'GET',
		data
	),
	/**
	 * 关注
	 */
	getFollow: (context,data) => tui.request(
		`/api-business-user-code/what/iAreAbout/follow`,
		'GET',
		data
	),
	/**
	 * 取消关注
	 */
	cancelAttention: (context,data) => tui.request(
		`/api-business-user-code/what/iAreAbout/cancelAttention`,
		'GET',
		data
	),
	/**
	 * 粉丝列表
	 */
	getfollowMyList: (context,data) => tui.request(
		`/api-business-user-code/what/iAreAbout/followMyList`,
		'POST',
		data,
		false,
		true
	),
	/**
	 * 我的关注列表
	 */
	getmyFollowList: (context,data) => tui.request(
		`/api-business-user-code/what/iAreAbout/myFollowList`,
		'POST',
		data,
		false,
		true
	),
	/**
	 * 需求搜索
	 */
	selDemandSearchList: (context,data) => tui.request(
		`/api-business-user-code/demand/registration/selDemandSearchList`,
		'GET',
		data,
		false,
		true
	),
	/**
	 * 搜索用户
	 */
	selUserSearchList: (context,data) => tui.request(
		`/api-business-user-code/user/info/selUserSearchList`,
		'GET',
		data,
		false,
		true
	),
	/**
	 * 获取登录人搜索历史
	 */
	getSsearchHistoryList: (context,data) => tui.request(
		`/api-business-user-code/user/info/getSsearchHistoryList`,
		'GET'
	),
	/**
	 * 清空登录人搜索历史
	 */
	delSsearchHistory: (context,data) => tui.request(
		`/api-business-user-code/user/info/delSsearchHistory`,
		'GET'
	),
	/**
	 * 添加需求投诉
	 */
	demandComplaint: (context,data) => tui.request(
		`/api-business-user-code/demand/complaint`,
		'POST',
		data,
		false,
		true
	),
	/**
	 * 获取星级
	 */
	getStarLevel: (context,data) => tui.request(
		`/api-business-user-code/credit/starSettingTable/getStarLevel`,
		'GET'
	),
	/**
	 * 评价
	 */
	evaluateApi: (context,data) => tui.request(
		`/api-business-user-code/user/evaluation/evaluate/${data.userEvaluationId}`,
		'GET',
		data,
	),
	/**
	 * 获取双方评论
	 */
	getEvaluation: (context,data) => tui.request(
		`/api-business-user-code/user/evaluation/getEvaluation/${data.userEvaluationId}`,
		'GET'
	),
	/**
	 * 获取用户评价列表
	 */
	getEvaluationList: (context,data) => tui.request(
		`/api-business-user-code/user/evaluation/getEvaluationList`,
		'GET',
		data,
	),
	/**
	 * 确认完工
	 */
	confirmCompletion: (context,data) => tui.request(
		`/api-business-user-code/demand/registration/confirmCompletion`,
		'GET',
		data,
	),
	/**
	 * 完成需求
	 */
	completionRequirements: (context,data) => tui.request(
		`/api-business-user-code/demand/undertaking/completionRequirements`,
		'GET',
		data,
	),
	/**
	 * 添加意见反馈
	 */
	feedbackservice: (context,data) => tui.request(
		`/api-business-user-code/feedbackservice`,
		'POST',
		data,
		false,
		true
	),
	/**
	 * 我的承接开关（0、为关闭，1、为开启）
	 */
	myAcceptanceSwitch: (context,data) => tui.request(
		`/api-business-user-code/user/info/myAcceptanceSwitch`,
		'GET',
		data
	),
	/**
	 * 我的承接开关状态
	 */
	myAcceptanceSwitchState: (context,data) => tui.request(
		`/api-business-user-code/user/info/myAcceptanceSwitchState`,
		'GET',
		data
	),
	/**
	 * 我的发布开关（0、为关闭，1、为开启）
	 */
	myReleaseSwitch: (context,data) => tui.request(
		`/api-business-user-code/user/info/myReleaseSwitch`,
		'GET',
		data
	),
	/**
	 * 我的发布开关状态
	 */
	myReleaseSwitchState: (context,data) => tui.request(
		`/api-business-user-code/user/info/myReleaseSwitchState`,
		'GET',
		data
	),
}

export default api