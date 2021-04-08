// 环信
let WebIM = require("@/utils/WebIM")["default"]
let __test_account__, __test_psword__
let disp = require("@/utils/broadcast")
let runAnimation = true


const baseURL = 'https://dzmp.kaiwumace.com'
const normalHeader = {

}
const token = function() {
	let value = uni.getStorageSync('token')
	return 'bearer 58043982-63fa-4db8-aca3-e548309dfb24'
	if (value) {
		return value
	} else {
		return 'bearer 58043982-63fa-4db8-aca3-e548309dfb24'
	}
}

const tokenHeadr = {
	// Authorization: token()
}


const myHttp = function({
	url,
	data,
	method,
	header
}) {
	if (!data) {
		data = ''
	}
	if (!method) {
		method = 'GET'
	}
	if (!header) {
		header = ''
	}
	return new Promise(function(resolve, reject) {
		uni.request({
			url: baseURL + url,
			method: method,
			header: header,
			timeout: 10000,
			data: data,
			success: (res) => {

				resolve(res)
			},
			fail: (res) => {
				resolve(res)
			}
		})
	})
}

// 获取七牛云 token
const getQiNiuToken = function(data) {
	return myHttp({
		url: '/card/cardWeChat/public/getQiNiuToken',
		method: 'GET',
		header: tokenHeadr,
	})
}



// 获取图片后缀名
const getSuffix = function(sourceName) {
	let lastIndex = sourceName.lastIndexOf('.')
	let strSuffix = sourceName.substring(lastIndex)
	return strSuffix
}

// 上传图片至 七牛云
//  http://jylqndev.kaiwumace.com/
//	data  中需要的参数: 	filePath：	要上文件的本地路径，
//						
//						
//						name:		要上传文件的文件名（ 暂且不定义 ）

const qiniuUpload = async function(data) {
	let dataNum = Date.parse(new Date())
	let suffix = getSuffix(data.filePath)
	if (suffix == '.mp3' || suffix == '.aac' || suffix == '.m4a') {
		suffix = '.mp3'
	}

	const upKey = dataNum + '_' + parseInt(Math.random() * 1000000000) + '*' + data.addInfo + '*' + suffix
	const qiniuTokenRes = await getQiNiuToken()
	console.log('获取 七牛云 token')
	console.log(qiniuTokenRes)

	console.log('-------upKey---------')
	console.log(upKey)

	const qiniuToken = qiniuTokenRes.data.data
	return new Promise(function(resolve, reject) {
		uni.uploadFile({
			url: 'https://upload-z2.qiniup.com',
			filePath: data.filePath,
			name: 'file',
			formData: {
				token: qiniuToken,
				key: upKey
			},
			success: (res) => {
				resolve(res)
			},
			fail: (res) => {
				resolve(res)
			}
		})
	})

}




// 获取小程序用户 code
const geCode = function() {
	return new Promise(function(resolve, reject) {
		uni.login({
			provider: 'weixin',
			success: (res) => {
				resolve(res)
			},
			fail: (res) => {
				reject(res)
			}
		})
	})
}


// 	微信登录 提交 code
//	/card/cardWeChat/app/initWxLogin
//	data:{js_code: }
const initWxLogin = async function() {

	const getCodeRes = await geCode()
	console.log('获取到的code----------------------------')
	console.log(getCodeRes)
	let dataObj = {
		js_code: getCodeRes.code
	}
	let token = tokenHeadr

	return myHttp({
		url: '/card/cardWeChat/app/initWxLogin',
		method: 'POST',
		// data:'\r\n--XXX' + '\r\nContent-Disposition: form-data; name=js_code' + '\r\n' +'\r\n'+getCodeRes.code,
		data: dataObj,
		header: {
			'content-type': 'application/x-www-form-urlencoded',
			Authorization: token.Authorization
		},
	})
}

// 注册环信
//	/card/cardWeChat/public/createHxUser/{nickName}

const siginChat = function(chatUser) {

	return myHttp({
		url: '/card/cardWeChat/public/createHxUser/' + chatUser,
		method: 'POST',
		// data:'\r\n--XXX' + '\r\nContent-Disposition: form-data; name=js_code' + '\r\n' +'\r\n'+getCodeRes.code,
		header: {
			'content-type': 'application/x-www-form-urlencoded',
			Authorization: token.Authorization
		},
	})

	// return new Promise(function(resolve,reject){
	// 	var options = {
	// 	  apiUrl: WebIM.config.apiURL,
	// 	  username: chatUser,
	// 	  password: chatUser,
	// 	  nickname: "",
	// 	  appKey: WebIM.config.appkey,
	// 	  success: function (res) {
	// 	    console.log('res', res);

	// 	    var data = {
	// 	      apiUrl: WebIM.config.apiURL,
	// 	      user: chatUser,
	// 	      pwd: chatUser,
	// 	      grant_type: "password",
	// 	      appKey: WebIM.config.appkey
	// 	    };
	// 	    uni.setStorage({
	// 	      key: "myUsername",
	// 	      data: chatUser
	// 	    });

	// 		resolve(true)
	// 	  },
	// 	  error: function (res) {
	// 	    console.log('res', res);
	// 		resolve(false)
	// 	    if (res.statusCode !== "200") {
	// 	      if (res.statusCode == '400' && res.data.error == 'illegal_argument') {
	// 	        return uni.showToast({title: "用户名非法",icon:'none'});
	// 	      }

	// 	      uni.showToast({title: "用户名已被占用",icon:'none'});
	// 	    }
	// 	  }
	// 	};
	// 	WebIM.conn.registerUser(options);
	// })

}

// 登录 环信
//	data:{user}
// 
const loginChat = function(chatUser, password) {
	return new Promise(function(resolve, reject) {
		chatUser = chatUser.toLowerCase()
		getApp().globalData.conn.open({
			apiUrl: WebIM.config.apiURL,
			user: chatUser,
			pwd: password,
			grant_type: "password",
			appKey: WebIM.config.appkey
		});
		console.log('loginChat')
		uni.$on('loginback',(backres)=>{
			console.log('LLLLLLLLLLLLLLLLssssssssssssss')
			console.log('chat登录返回')
			resolve(backres)
		})
		
		console.log('login chat')
		// resolve(true)
		
		// WebIM.conn.listen({
		// 	onOpened: function(message) {
		// 		console.log('---------login success')
		// 		uni.setStorage({
		// 			key: "myUsername",
		// 			data: chatUser
		// 		});
		// 		console.log('huanxin login success')
		// 		// uni.redirectTo({
		// 		// 	url: "/pages/salesManager/salesManager"
		// 		// })
		// 		getApp().globalData.onLoginSuccess(
		// 			uni.getStorageSync("myUsername").toLowerCase()
		// 		);
		// 		resolve(true)
		// 	},
		// 	onError(error) {
		// 		console.log('全局 环信 异常')
		// 		console.log(error); // 16: server-side close the websocket connection
		// 		resolve(false)
		// 	}
		// })
	})
}


// 	获取微信小程序用户信息
//	返回值： data:{data: status: true( 授权成功 )  false（ 授权失败 ） }
const getWxUserInfo = function() {
	let resData = {
		status: false,
		data: null
	}
	return new Promise((resolve, reject) => {
		uni.getUserProfile({
			// provider: 'weixin',
			desc:'获取昵称 头像',
			success: function(infoRes) {
				
				resData.status = true
				resData.data = infoRes
				
				console.log('---------')
				console.log(infoRes)
				
				if(infoRes.userInfo.nickName == '微信用户' && infoRes.userInfo.gender == 0){
					console.log('获取到虚拟信息')
					resolve({status: false,data: null})
				}else{
					// getApp().globalData.localChatInfo['selfUserInfo'] = infoRes
					uni.setStorageSync({
						key: 'selfInfo',
						data: infoRes
					})
					resolve(resData)
				}
				
			},
			fail(res) {
				console.log('wexin getUserInfo fail')
				console.log(res)
				resolve(resData)
			}
		});
		
		// uni.login({
		// 	provider: 'weixin',
		// 	success: function(loginRes) {
		// 		// 获取用户信息
		// 		uni.getUserProfile({
		// 			// provider: 'weixin',
		// 			desc:'获取昵称 头像',
		// 			success: function(infoRes) {
						
		// 				resData.status = true
		// 				resData.data = infoRes
						
		// 				console.log('---------')
		// 				console.log(infoRes)
						
		// 				if(infoRes.userInfo.nickName == '微信用户' && infoRes.userInfo.gender == 0){
		// 					console.log('获取到虚拟信息')
		// 					resolve({status: false,data: null})
		// 				}else{
		// 					// getApp().globalData.localChatInfo['selfUserInfo'] = infoRes
		// 					uni.setStorageSync({
		// 						key: 'selfInfo',
		// 						data: infoRes
		// 					})
		// 					resolve(resData)
		// 				}
						
		// 			},
		// 			fail(res) {
		// 				console.log('wexin getUserInfo fail')
		// 				console.log(res)
		// 				resolve(resData)
		// 			}
		// 		});
		// 	},
		// 	fail(res) {
		// 		console.log('wexin login fail')
		// 		console.log(res)
		// 		resolve(resData)
		// 	}
		// });
	})
}
//	 	获取用户信息
//		/card/cardWeChat/cardclientinfo/isAuthorization/{oppenId}/{companyId}
//		data:{openId:  companyId }
const getUserInfo = function(data) {
	console.log('尝试获取用户信息  data')
	console.log(data)
	return myHttp({
		url: '/card/cardWeChat/cardclientinfo/isAuthorization/' + data.openId + '/' + data.companyId,
		method: 'GET',
		header: tokenHeadr,
	})
}



//  通过 使用 clientId    获取用户信息
//	/card/cardWeChat/cardclientinfo/getCardClientInfoById/{id}
//  data:{clientID}
const getUserInfoByClientId = function(data) {
	console.log('尝试获取用户信息  data')
	console.log(data)
	return myHttp({
		url: '/card/cardWeChat/cardclientinfo/getCardClientInfoById/' + data.clientId,
		method: 'GET',
		header: tokenHeadr,
	})
}


// 		上传用户信息 / 修改用户信息	( 暂且用户修改 )
//		/card/cardWeChat/cardclientinfo/updateCardClientInfo
//		data:{  }

//		修改用户标签信息	
//		/card/cardWeChat/cardclientinfo/updateCardClientInfo
//		data:{ id: 用户id , clientLable: 标签id 字符串拼接形式（ 逗号隔开 ） }
const updateUserInfo = function(data) {

	return myHttp({
		url: '/card/cardWeChat/cardclientinfo/updateCardClientInfo',
		method: 'POST',
		data: data,
		header: tokenHeadr,
	})
}


//  	查询用户标签
//		/card/cardWeChat/cardclientinfo/getClientInfosByCardSalesId/{saleId}
//		data:{ clientId: saleId: }
const getUserTag = function(data) {
	let resData = {
		clientId: data.clientId
	}
	return myHttp({
		url: '/card/cardWeChat/cardclientinfo/getClientInfosByCardSalesId/' + data.salesId,
		method: 'GET',
		data: resData,
		header: tokenHeadr,
	})
}

// 		查询销售所有的标签
// 		/card/cardWeChat/cardclientlabel/getCardClientLabelById/{id}
//		data:{id:  销售的id }
const getSalesTag = function(data) {
	let resData = {
		clientId: data.clientId
	}
	return myHttp({
		url: '/card/cardWeChat/cardclientlabel/getCardClientLabelById/' + data.id,
		method: 'GET',
		header: tokenHeadr,
	})
}

// 	新增用户标签
//	/card/cardWeChat/cardclientlabel/addCardClientLabel
//	data:{ labelName:'标签内容'，salesId: }
const addTag = function(data) {

	return myHttp({
		url: '/card/cardWeChat/cardclientlabel/addCardClientLabel',
		method: 'POST',
		data: data,
		header: tokenHeadr,
	})
}



// 	通过标签ID 删除标签
//	/card/cardWeChat/cardclientlabel/deleteById/{id}
//	data:{id: }
const deleteTag = function(data) {
	return myHttp({
		url: '/card/cardWeChat/cardclientlabel/deleteById/' + data.id,
		method: 'GET',
		header: tokenHeadr,
	})
}



// 	从 公众号进入小程序   获取  销售id
//	/card/cardWeChat/cardsalesinfo/getCardSalesInfoByoppenId/{oppenId}/{companyId}
const getCardSalesInfoByArticle = function(data) {

	return myHttp({
		url: '/card/cardWeChat/cardsalesinfo/getCardSalesInfoByoppenId/' + data.oppenId + '/' + data.companyId,
		method: 'GET',
		header: tokenHeadr,
	})
}

//	从分享链接 进入 小程序
//	/card/cardWeChat/cardsalesinfo/getCardSalesInfoByoppenId
// 	data: { companyId  oppenId  saleId }
const getCardSalesInfoByLink = function(data) {
	console.log('分享链接传入 data')
	console.log(data)
	return myHttp({
		url: '/card/cardWeChat/cardsalesinfo/getCardSalesInfoByoppenId',
		data: data,
		method: 'POST',
		header: tokenHeadr,
	})
}

//	获取公司信息   
//  参数： 公司id
// /card/wx/cardcompanyinfo/getCompany/
const getCompanyInfoById = function(data) {
	console.log('tokenHeadr')
	console.log(tokenHeadr)
	console.log('获取公司信息')
	console.log(data)
	return myHttp({
		url: '/card/wx/cardcompanyinfo/getCompany/' + data.id,
		method: 'GET',
		header: tokenHeadr,
	})
}

// 	获取产品信息
// 	/card/cardWeChat/cardProductinfo/getCompany/{companyId}
const getCompanyProducts = function(data) {
	console.log('tokenHeadr')
	console.log(tokenHeadr)
	console.log('获取产品信息')
	console.log(data)
	return myHttp({
		url: '/card/cardWeChat/cardProductinfo/getCompany/' + data.id,
		method: 'GET',
		header: tokenHeadr,
	})
}


// 获取小程序二维码
const getPageCode = function(data) {
	return myHttp({
		url: '/card/cardWeChat/cardsalesinfo/getCardSalesInfoById/' + data.id,
		method: 'GET',
		header: tokenHeadr,
	})
}



//	获取销售信息   
//  参数： 销售id
//	/card/cardWeChat/cardsalesinfo/getCardSalesInfoById/
const getCardSalesInfoById = function(data) {
	return myHttp({
		url: '/card/cardWeChat/cardsalesinfo/getCardSalesInfoById/' + data.id,
		method: 'GET',
		header: tokenHeadr,
	})
}

//	 修改销售信息
//   /card/cardWeChat/cardsalesinfo/updateCardSalesInfo	
const updateCardSalesInfo = function(data) {
	return myHttp({
		url: '/card/cardWeChat/cardsalesinfo/updateCardSalesInfo',
		method: 'POST',
		data: data,
		header: tokenHeadr,
	})
}

// 	销售使用手机号 登录
// 	/card/cardWeChat/cardsalesinfo/getCardSalesInfoByLonginPhone/{loginPhone}
const getCardSalesInfoByLonginPhone = function(data) {
	return myHttp({
		url: '/card/cardWeChat/cardsalesinfo/getCardSalesInfoByLonginPhone/' + data.loginPhone,
		method: 'GET',
		header: tokenHeadr,
	})
}


// 	添加用户活跃记录
//	/card/cardWeChat/cardClientActiverecord/addActiverecord
const addActiverecord = function(data) {
	return myHttp({
		url: '/card/cardWeChat/cardClientActiverecord/addActiverecord',
		method: 'POST',
		header: tokenHeadr,
		data: data
	})
}

// 用户标签查询
// 	查看用户是否对销售点赞过
// 	/card/cardWeChat/clientpraise/getClientPraise
// 	data:{clientId      salesId}
const getClientPraise = function(data) {
	return myHttp({
		url: '/card/cardWeChat/clientpraise/getClientPraise',
		method: 'POST',
		header: tokenHeadr,
		data: data
	})
}

// 	用户对销售点赞
//	/card/cardWeChat/clientpraise/addClientPraise
// 	data:{clientId      salesId}
const addClientPraise = function(data) {
	return myHttp({
		url: '/card/cardWeChat/clientpraise/addClientPraise',
		method: 'POST',
		header: tokenHeadr,
		data: data
	})
}




// 	根据 销售Id 获取销售所绑定的用户
//  /card/cardWeChat/cardclientinfo/getClientInfosByCardSalesId/
const getClientInfosByCardSalesId = function(data) {
	return myHttp({
		url: '/card/cardWeChat/cardclientinfo/getClientInfosByCardSalesId/' + data.id,
		method: 'GET',
		header: tokenHeadr,
	})
}

// 	根据输入内容 搜索用户
//	/card/cardWeChat/cardclientinfo/getClientInfosBySearchContent
const getClientInfosBySearchContent = function(data) {
	return myHttp({
		url: '/card/cardWeChat/cardclientinfo/getClientInfosBySearchContent',
		method: 'GET',
		data: data,
		header: tokenHeadr,
	})
}

//根据销售 id 查询 其所有用户的活跃记录
// 	/card/cardWeChat/cardClientActiverecord/getCardClientActiverecordByWeek
const getCardClientActiverecordByWeek = function(data) {
	return myHttp({
		url: '/card/cardWeChat/cardClientActiverecord/getCardClientActiverecordByWeek',
		method: 'GET',
		data: data,
		header: tokenHeadr,
	})
}

// 	查询 追踪记录类型
//	/card/cardWeChat/cardClientFollowupType/getList
const getActiveTypeList = function() {
	return myHttp({
		url: '/card/cardWeChat/cardClientFollowupType/getList',
		method: 'GET',
		header: tokenHeadr,
	})
}

// 	根据 客户 Id，查询  客户的追踪记录 
// 	/card/cardWeChat/cardClientFollowuprecord/getListByClientId/{clientId}

const getListByClientId = function(data) {
	return myHttp({
		url: '/card/cardWeChat/cardClientFollowuprecord/getListByClientId/' + data.clientId,
		method: 'GET',
		header: tokenHeadr,
	})
}

// 	添加用户 追踪记录
//	/card/cardWeChat/cardClientFollowuprecord/addFollowuprecord
// 	data:{ clientId saleId  createTime  followUpSchedule:(跟进进度内容)  followupWay：（跟进类型 ） }
const addFollowupType = function(data) {
	return myHttp({
		url: '/card/cardWeChat/cardClientFollowuprecord/addFollowuprecord',
		method: 'POST',
		data: data,
		header: tokenHeadr,
	})
}


module.exports = {
	geCode,
	initWxLogin, //	获取 openid  session_key  根据 code
	siginChat, //	注册环信账号
	loginChat, //	登录环信账号
	getWxUserInfo, //	获取 微信小程序用户基本信息
	getUserInfo, //  获取用户信息
	getUserInfoByClientId,
	updateUserInfo, //	修改用户标签
	getUserTag, //	获取用户标签
	getSalesTag,
	addTag,
	deleteTag,
	getCardSalesInfoByArticle,
	getCardSalesInfoByLink,
	getQiNiuToken,
	qiniuUpload, //	七牛云上传文件
	getCompanyInfoById,
	getCompanyProducts, //	获取产品信息
	getCardSalesInfoById, //	获取销售信息
	updateCardSalesInfo, //	修改销售信息
	getCardSalesInfoByLonginPhone, //	销售使用手机号进行绑定
	getClientInfosByCardSalesId,
	getClientInfosBySearchContent,
	addActiverecord,
	getClientPraise,
	addClientPraise,
	getCardClientActiverecordByWeek,
	getActiveTypeList,
	getListByClientId,
	addFollowupType
}
