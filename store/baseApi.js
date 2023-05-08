import tui from "@/utils/httpRequest.js"
import store from '@/store'

const baseApi = {
	/**
	 * 查询手机号
	 */
	selWxPhone: (context,data) => tui.request(
		'/api-business-user-code/user/info/selWxPhone',
		'GET'
	),
	/**
	 * 绑定手机号
	 */
	bindMobileNumber: (context,data) => tui.request(
		'/api-business-user-code/user/info/bindMobileNumber',
		'GET',
		data
	),
	/**
	 * 根据字典编码获取字典值列表
	 */
	byDictCode: (context,data) => tui.request(
		'/api-sys/sys/sysDictvalue/byDictCode',
		'GET',
		data
	),
	/**
	 * 验证token是否合法以及过期
	 */
	verificationToken: (context,data) => tui.request(
		'/api-auth/signIn/verifyToken',
		'GET',
		data
	),
	/**
	 * login获取token
	 */
	authLogin: (context,data) => tui.request(
		'/api-auth/signIn/getWxToken',
		'POST',
		data
	),
	/**
	 * 文件上传,直接上传到硬盘,返回的是附件对象
	 */
	uploadFileToDisk: () => '/api-file-uploader/file/uploadFileToDisk',
	/**
	 * 删除附件
	 */
	deleteFile: (context,data) => tui.request(
		`/api-file-uploader/${data.operationId}/${data.operationCode}`,
		'DELETE'
	),
	/**
	 * 获取im userSig
	 */
	getUserSig: (context,data) => tui.request(
		`/api-business-user-code/user/info/getUserSig`,
		'GET'
	),
	/**
	 * 根据坐标获取距离
	 */
	getDistance: (context,data) => tui.request(
		`/api-business-user-code/user/info/getDistance`,
		'GET',
		data,
		false,
		true,
		true
	),
	/**
	 * 获取用户钱包
	 */
	getWallet: (context,data) => tui.request(
		`/api-business-user-code/user/wallet`,
		'GET'
	),
	/**
	 * 获取用户绑定的银行卡号和姓名
	 */
	getWithdrawalAccount: (context,data) => tui.request(
		`/api-business-user-code/user/wallet/getWithdrawalAccount`,
		'GET'
	),
	/**
	 * 设置银行卡提现帐号
	 */
	setWithdrawalAccount: (context,data) => tui.request(
		`/api-business-user-code/user/wallet/setWithdrawalAccount`,
		'POST',
		data,
		false,
		true,
		true
	),
	/**
	 * 提现
	 */
	transfer: (context,data) => tui.request(
		`/api-business-user-code/user/wallet/transfer`,
		'GET',
		data
	),
	/**
	 * 高级查询获取余额变动记录列表
	 */
	getSeniorList: (context,data) => tui.request(
		`/api-business-user-code/balance/changeRecord/getSeniorList`,
		'POST',
		data,
		false,
		true,
		true
	),
}

export default baseApi;