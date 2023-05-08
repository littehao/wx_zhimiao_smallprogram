import tui from "@/utils/httpRequest.js"
import store from '@/store'

const chatApi = {
	/**
	 * 消息发送
	 */
	sendMessage: (context,data) => tui.request(
		`/api-business-user-code/im/messageSending/sendMessage/${data.imSingleChatSessionId}`,
		'POST',
		{...data.msgBody},
		false,
		true
	),
	/**
	 * 新建im单聊会话
	 */
	createSingleChatSession: (context,data) => tui.request(
		`/api-business-user-code/im/singleChatSession/insert/${data.demandRegistrationId}`,
		'GET'
	),
	/**
	 * 通过聊天id获取单聊会话
	 */
	selectByPrimaryKey: (context,data) => tui.request(
		`/api-business-user-code/im/singleChatSession/selectByPrimaryKey`,
		'GET',
		data,
		false,
		true
	),
	/**
	 * 是否有回复
	 */
	getIsThereAnyReply: (context,data) => tui.request(
		`/api-business-user-code/im/messageSending/getIsThereAnyReply`,
		'GET',
		data,
		false,
		true
	),
	/**
	 * 获取会话列表
	 */
	selCommunicationList: (context,data) => tui.request(
		`/api-business-user-code/im/singleChatSession/selCommunicationList`,
		'GET',
		data,
		false,
		true
	),
	/**
	 * 申请接单
	 */
	requestReceipt: (context,data) => tui.request(
		`/api-business-user-code/demand/undertaking/requestReceipt`,
		'GET',
		data
	),
	/**
	 * 发起人邀请接单
	 */
	invitationToReceiveOrders: (context,data) => tui.request(
		`/api-business-user-code/demand/invitationRecord/invitationToReceiveOrders`,
		'GET',
		data,
	),
	/**
	 * 需求同意或拒绝 发起人同意承接人申请接单
	 */
	receiptApproval: (context,data) => tui.request(
		`/api-business-user-code/demand/registration/receiptApproval`,
		'GET',
		data
	),
	/**
	 * 需求同意或拒绝 承接人同意发起人邀请接单
	 */
	declineTheInvitation: (context,data) => tui.request(
		`/api-business-user-code/demand/invitationRecord/declineTheInvitation`,
		'GET',
		data
	),
	/**
	 * 更换会话需求
	 */
	replacementRequirements: (context,data) => tui.request(
		`/api-business-user-code/im/singleChatSession/replacementRequirements`,
		'GET',
		data
	),
	/**
	 * 发起支付
	 */
	sendPayment: (context,data) => tui.request(
		`/api-business-user-code/payment/record`,
		'GET',
		data
	),
	/**
	 * 查询支付
	 */
	queryPayment: (context,data) => tui.request(
		`/api-business-user-code/payment/record/selPay`,
		'GET',
		data
	)
}

export default chatApi;