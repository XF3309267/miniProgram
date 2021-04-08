import {
	getCardSalesInfoById,
	getCompanyInfoById,
	addActiverecord,
	qiniuUpload,
	updateCardSalesInfo,
	initWxLogin,
	loginChat,
	getUserInfo,
	getCardSalesInfoByArticle,
	getCardSalesInfoByLink
} from '@/services/services.js'

// 预览图片
const previewImg = function(arg, index = 0) {
	let arr = arg

	if (Object.prototype.toString.call(arg) !== '[object Array]') {
		arr = [arg]
	}

	// 预览图片
	uni.previewImage({
		urls: arr,
		current: index,
		longPressActions: {
			itemList: ['发送给朋友', '保存图片', '收藏'],
			success: function(data) {
				console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
			},
			fail: function(err) {}
		},
		success: (res) => {

		},
		fail: (res) => {

		}
	})
}

// 检测用户 是否开启 相册权限
const initGetAlbum = function() {
	return new Promise(function(resolve, rejcet) {
		uni.getSetting({
			success(res) {
				if (res.authSetting["scope.writePhotosAlbum"]) {
					resolve(true)
				} else {
					resolve(false)
				}
			},
			fail(res) {
				resolve(false)
			}
		})
	})
}
// 获取图片信息
const getImgInfo = function(src) {
	return new Promise(function(resolve, reject) {
		uni.getImageInfo({
			src: src,
			success: (res) => {
				console.log(res)
				resolve(res)
			},
			fail: (res) => {
				console.log(res)
				resolve(res)
			}
		})
	})
}
// 网络图片转为 本地链接  和 宽高信息
const urlToLocalPath = function(url) {
	// const getImginfoRes = await getImgInfo(url)
	return new Promise(function(resolve, reject) {
		const obj = {}
		uni.downloadFile({
			url: url,
			success: (res) => {
				const temp = res.tempFilePath
				resolve(temp)
			},
			fail: (res) => {
				resolve(res)
			}
		})
	})

}

// 获取销售信息
const getSalesInfo = function(data) {
	return new Promise(function(resolve, reject) {
		// let localData = uni.getStorageSync('salesId')
		getCardSalesInfoById(data).then(res => {
			let finData = res.data.data
			console.log('获取销售信息返回')
			console.log(finData)
			if (res.statusCode === 200) {
				let chatSalesId = 'jyl_' + 'sales_' + finData.id
				getApp().globalData.localChatInfo[chatSalesId] = finData
				uni.setStorage({
					key: 'salesId',
					data: finData.id,
					success() {
						resolve({
							value: finData,
							statu: res.statusCode,
							msg: res.data.msg
						})
					}
				})


			} else {
				resolve({
					value: null,
					statu: res.statusCode,
					msg: res.data.msg
				})
			}
		})

	})
}

// 获取 销售音频信息
const getAudioTime = function(url) {

	let resObj = {
		statu: false
	}
	let audioTime = 0
	if (!url) {
		return resObj
	}
	let markStart = url.indexOf('*') + 1
	let markEnd = url.lastIndexOf('*')

	if (markStart !== 0 && markEnd !== -1) {
		let time = parseInt(url.slice(markStart, markEnd))
		return time
	}

}


// 修改销售信息
const modifySalesInfo = function(readySubInfo) {
	return new Promise(async (resolve, reject) => {
		const upSalesRes = await updateCardSalesInfo(readySubInfo)
		uni.hideLoading()
		if (upSalesRes.statusCode === 200) {
			const requesObj = {}
			requesObj.id = readySubInfo.id
			const getSalesInfoRes = await getCardSalesInfoById(requesObj)

			if (getSalesInfoRes.statusCode === 200) {
				const salesData = getSalesInfoRes.data.data
				uni.setStorage({
					key: 'salesInfo',
					data: salesData,
					success: (setSalesRes) => {
						uni.showToast({
							title: upSalesRes.msg,
							duration: 1000,
						})
					},
					fail: (setSalesRes) => {

					}
				})
			}


		} else {
			uni.showToast({
				title: upSalesRes.msg,
				duration: 1000,
			})

		}
		resolve(upSalesRes)
	})
}


// 获取 公司信息
// data: {id: }  为公司 id
const getCompanyInfo = function(data) {
	return new Promise(async function(resolve, reject) {

		let res = await getCompanyInfoById(data)
		if (res.statusCode === 200) {
			uni.setStorage({
				key: 'companyId',
				data: res.data.data.id,
				success() {
					resolve({
						value: res.data.data,
						statu: res.statusCode,
						msg: res.msg
					})
				}
			})
		} else {
			resolve({
				value: null,
				statu: res.statusCode,
				msg: res.msg
			})
		}

	})
}

const userActiveList = [
	'正在查看 你的 名片', //	查看名片
	'正在分享 你的 名片', //  分享名片
	'靠谱 +1 ，及时沟通，效率更高', //  点赞
	'保留了您的电话号码，请及时回复', //  保存通讯录
	'保留了您的微信号，请及时回复', //  复制微信号
]

// 添加用户活跃记录
const userAction = async function(clientId, saleId, type) {
	const activeContent = userActiveList[type]
	const addRes = await addActiverecord({
		activeContent,
		clientId,
		saleId,
		activeType: type
	})

	return addRes

}
const getSuffix = function(sourceName) {
	let lastIndex = sourceName.lastIndexOf('.')
	let strSuffix = sourceName.substring(lastIndex)
	return strSuffix
}

// 选择图片 
// 参数： 	imgCount: 限制选择图片的数量
//			maxSize:  限制图片的大小
//			返回图片数组
//			[{file:{path:  ,size: },url: }]
const selfChooseImg = function(imgCount = 1, maxSize = 3 * 1024 * 1024) {
	return new Promise((resolve, rejcet) => {
		let fileObjList = []
		uni.chooseImage({
			count: imgCount,
			success: (res) => {
				fileObjList = res.tempFiles
				fileObjList.forEach((item, index) => {
					const obj = {}

					obj.file = item
					obj.url = item.path

					fileObjList[index] = obj

				})
				resolve(fileObjList)
			},
			fail: (res) => {
				if (fileObjList.length === 0) {
					// uni.showToast({
					// 	title:'您还未选择图片',
					// 	icon:'none'
					// })
				} else {
					uni.showToast({
						title: '选择图片出错',
						icon: 'none'
					})
				}
				resolve(fileObjList)
			}
		})
	})
}

// 压缩图片 、
// item : {file:{size  ,path} url }
const judgeImg = function(item, compressPencentage = 50, upImgMaxSiz = 3 * 1024 * 1024) {
	return new Promise((resolve, reject) => {
		if (item.file.size > upImgMaxSiz) {
			uni.compressImage({
				src: item.url,
				quality: compressPencentage,
				success: (res) => {
					item.file.path = res.tempFilePath
					item.url = res.tempFilePath
					resolve(item)
				},
				fail: (res) => {
					resolve(item)
				}
			})
		} else {
			resolve(item)
		}
	})
}
// 上传资源至七牛云
// item : {file:{size  ,path} url: }
const uploadComplete = async function(ele, baseQiniuyunUrl) {
	const suffix = getSuffix(ele.url)
	let dataObj = {}
	let uploadRes = {}
	dataObj.filePath = ele.url
	if (suffix == '.png' || suffix == '.jpg' || suffix == '.jpeg' || suffix == '.webp' || suffix == '.gif') {
		ele = await judgeImg(ele)
		// uploadRes = await qiniuUpload(dataObj)
	}

	dataObj.filePath = ele.url
	dataObj.addInfo = ele.addInfo
	uploadRes = await qiniuUpload(dataObj)

	if (uploadRes.statusCode === 200) {
		const finaData = JSON.parse(uploadRes.data)
		const finaUrl = baseQiniuyunUrl + finaData.key
		let finaObj = {}
		finaObj.error = false
		finaObj.progress = 100
		finaObj.url = finaUrl
		return {
			...finaObj,
			statusCode: 200
		}
	} else {
		return {
			...ele,
			statusCode: uploadRes.statusCode
		}
	}
}


// 从本地缓存中获取 userType 字段 ， 0 普通用户，1 销售用户

// 	判断 使用该小程序的用户 是 普通用户 还是 销售
const judgeUserType = function() {
	const userType = uni.getStorageSync('userType')
	if (userType) {
		return userType
	}
	return 0
}

//  赋值小程序 userType
const setUserType = function(userTypeValue) {
	// this.self_userType = userTypeValue
	try {
		uni.setStorageSync('userType', userTypeValue);
	} catch (e) {

	}
}

const initInfo = async function(companyId, salesId, _this) {
	console.log('initInfo  下的数据')
	console.log(companyId)
	console.log(salesId)


	return new Promise(async (resolve, reject) => {

		if (!companyId) {
			companyId = 9
		}
		// 如果 salesId 不存在： 表示从 公众号进入
		let clientSalesRes = await initClientSalesId(companyId, salesId)
		let clientId = clientSalesRes.clientId
		let openId = clientSalesRes.openId
		salesId = clientSalesRes.salesId
		uni.setStorageSync('companyId', companyId)
		uni.setStorageSync('salesId', salesId)
		uni.setStorageSync('clientId', clientId)
		uni.setStorageSync('openId', openId)

		getApp().globalData.self_companyId = companyId
		getApp().globalData.self_salesId = salesId
		getApp().globalData.self_clientId = clientId
		getApp().globalData.self_openId = openId

		// 获取 userType
		let userType = judgeUserType()
		if (!userType) {
			uni.setStorageSync('userType', 0)
			userType = 0
		}
		if (openId && clientId && salesId && companyId && (userType !== -1)) {
			resolve(true)
		} else {
			console.log('_______ 基础数据不完全______')
			resolve(false)
		}
	})

}



const initBaseInfo = function(_this) {
	return new Promise(async (resolve, reject) => {

		const openId = uni.getStorageSync('openId');
		const clientId = uni.getStorageSync('clientId');
		const salesId = uni.getStorageSync('salesId');
		const companyId = uni.getStorageSync('companyId');
		const userType = uni.getStorageSync('userType');

		console.log('初始化基础信息')
		console.log('openId: ', openId)
		console.log('clientId: ', clientId)
		console.log('salesId: ', salesId)
		console.log('companyId: ', companyId)
		console.log('userType: ', userType)
		if (openId) {
			_this.openId = openId
		}
		if (clientId) {
			_this.clientId = clientId
		}
		if (salesId) {
			_this.salesId = salesId
		}
		if (companyId) {
			_this.companyId = companyId
		}
		if (userType || userType === 0) {
			_this.userType = userType
		}
		if (openId && clientId && salesId && companyId && (userType !== -1)) {
			resolve(true)
		} else {
			resolve(false)
		}

	})

}



//	获取 userId
//  getUserId 
const initClientSalesId = async function(companyId, salesId) {
	const openId = await getUserOpenId()
	// getCompanyId 是一定要 获取数据的
	// const companyId = await getCompanyId()
	let finalSalesId = ''
	let finalClientId = ''
	let getUserDataObj = {
		openId,
		companyId
	}
	let getSalesDataObj = {
		oppenId: openId,
		companyId
	}
	if (salesId) {


		getSalesDataObj.saleId = salesId
		finalSalesId = salesId
		console.log('___ 有了 salesId ______')
		console.log(getSalesDataObj)
		const getSalesBack = await getCardSalesInfoByLink(getSalesDataObj)
		if (getSalesBack.statusCode === 200) {
			finalSalesId = getSalesBack.data.data.id
			if (!getSalesBack.data.data.id) {
				uni.showToast({
					title: getSalesBack.data.msg,
					icon: 'none'
				})
				finalSalesId = -1
			}
		}
	} else {
		console.log('___ 没有 salesId ______')
		console.log(getSalesDataObj)
		const getSalesBack = await getCardSalesInfoByArticle(getSalesDataObj)
		if (getSalesBack.statusCode === 200) {

			if (!getSalesBack.data.data) {
				uni.showToast({
					title: getSalesBack.data.msg,
					icon: 'none',
					duration: 2000,
				})
				finalSalesId = -1
			} else {
				finalSalesId = getSalesBack.data.data.id
			}

		}
	}


	const getUserRes = await getUserInfo(getUserDataObj)
	if (getUserRes.statusCode === 200) {
		finalClientId = getUserRes.data.data.id
		try {
			uni.setStorageSync('clientId', getUserRes.data.data.id);
		} catch (e) {
			// error
		}
		return {
			clientId: finalClientId,
			salesId: finalSalesId,
			openId: openId
		}
	} else {
		return {
			clientId: -1,
			salesId: -1,
			openId: -1
		}
	}
}

// 	获取用户 openId 和 session_key
const getUserOpenId = async function() {
	return new Promise((resolve, reject) => {

		uni.getStorage({
			key: 'openId',
			success: (res) => {

				const value = res.data
				if (value && value !== -1) {
					resolve(value)
				}

			},
			fail: async (res) => {
				const loginRes = await initWxLogin()
				if (loginRes.statusCode === 200) {
					try {
						uni.setStorageSync('openId', loginRes.data.data.openId);
					} catch (e) {
						// error
					}
					resolve(loginRes.data.data.openId)
				}
			}
		})


	})

}

// 设置 companyId
const setCompanyId = function(companyId) {
	uni.setStorage({
		key: 'companyId',
		data: companyId,
		success: function() {},
		success: function() {}
	})
}

// 获取 companyId
const getCompanyId = function() {
	return new Promise((resolve, reject) => {
		uni.getStorage({
			key: 'companyId',
			success: function(res) {
				resolve(res.data)
			},
			fail: (res) => {
				resolve(res)
			}
		});
	})
}


// tabelBar 跳转
const tab_card = function() {
	uni.redirectTo({
		url: "/pages/salesManager/salesManager"
	});
}

const phoneCall = function(phoneNum) {

	uni.makePhoneCall({
		phoneNumber: phoneNum,
		success(res) {
			console.log('makePhoneCall success')
			console.log(res)
		},
		fail(res) {
			console.log('makePhoneCall fail')
			console.log(res)
		}
	})
}

// 拨打电话
const selfCallPhone =  function(phoneNum,equipmentType) {
	console.log()
	
	if (!phoneNum || phoneNum.length<11) {
		uni.showToast({
			title: '该销售暂未有电话号码',
			icon: 'none'
		})
		return
	}
	if(!equipmentType){
		equipmentType = uni.getSystemInfoSync().platform
	}
	
	
	if (equipmentType == 'android') {
		uni.showModal({
			title: '拨号提示',
			content: '您确认拨打电话：' + phoneNum + ' 吗？',
			success: (res) => {
				if (res.confirm) {
					console.log('用户点击了 确认')
					phoneCall(phoneNum)
				}
			}
		})
	} else {
		phoneCall(phoneNum)
	}
}


// 对于环信 联系人列表进一次的排序
//	对于 环信demo  cul 方法中 array 


module.exports = {
	previewImg,
	initGetAlbum,
	getImgInfo,
	urlToLocalPath,
	getSalesInfo,
	getAudioTime,
	getCompanyInfo,
	userAction,
	selfChooseImg,
	judgeImg,
	uploadComplete,
	modifySalesInfo, // 修改销售信息
	judgeUserType,
	setUserType,
	getUserOpenId,
	initInfo,
	initBaseInfo,
	initClientSalesId,
	setCompanyId,
	getCompanyId,
	selfCallPhone
}
