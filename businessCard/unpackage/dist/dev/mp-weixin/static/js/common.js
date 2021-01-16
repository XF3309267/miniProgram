import { getCardSalesInfoById,getCompanyInfoById,addActiverecord } from '@/services/services.js'

// 预览图片
const previewImg = function(arg,index=0){
	let arr = arg

	if(Object.prototype.toString.call(arg) !== '[object Array]'){
		arr = [arg]
	}
	
	// 预览图片
	uni.previewImage({
		urls:arr,
		current: index,
		longPressActions: {
			itemList: ['发送给朋友', '保存图片', '收藏'],
			success: function(data) {
				console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
			},
			fail: function(err) {
				console.log(err.errMsg);
			}
		},
		success:(res)=>{
			console.log('previewImag success')
			console.log(res)
		},
		fail:(res)=>{
			console.log('previewImag fail')
			console.log(res)
		}
	})
}



// 检测用户 是否开启 相册权限
const initGetAlbum = function(){
	return new Promise(function(resolve,rejcet){
		uni.getSetting({
			success(res){
				console.log(res)
				if(res.authSetting["scope.writePhotosAlbum"]){
					resolve(true)
				}else{
					resolve(false)
				}
			},
			fail(res){
				resolve(false)
			}
		})
	})
}

// 获取图片信息
const getImgInfo = function(src){
	return new Promise(function(resolve,reject){
		uni.getImageInfo({
			src: src,	
			success:(res)=>{
				console.log(res)
				resolve(res)
			},
			fail:(res)=>{
				console.log(res)
				resolve(res)
			}
		})
	})
}

// height: 1080
// orientation: "up"
// path: "http://tmp/wx35fcaefd77a58c6c.o6zAJs-IEBAnJ17SbtuHII1h1zXI.rPqVBkwilNOF11d6c58b1f1fa1cddc3a8e476c67e756.jpg"
// type: "jpeg"
// width: 1440


// 网络图片转为 本地链接  和 宽高信息
const urlToLocalPath =  function(url){
	// const getImginfoRes = await getImgInfo(url)
	return new Promise(function(resolve,reject){
		const obj = {}
		uni.downloadFile({
			url:url,
			success: (res) => {
				const temp = res.tempFilePath
				resolve(temp)
			},
			fail:(res)=>{
				resolve(res)
			}
		})
	})

}

// 获取销售信息
const getSalesInfo = function(data){
	return new Promise(async function(resolve,reject){
		let localData = uni.getStorageSync('salesInfo')
		if(localData){
			resolve({value:localData,statu:200,msg:'本地获取销售信息成功'})
		}else{
			let res = await getCardSalesInfoById(data)
			console.log('接口获取信息')
			console.log(res)
			
			if(res.statusCode === 200){
				uni.setStorage({
					key:'salesInfo',
					data:res.data.data,
					success() {
						resolve({value:res.data.data,statu:res.statusCode,msg:res.msg})
					}
				})
			}else{
				resolve({value:null,statu:res.statusCode,msg:res.msg})
			}
		}
	})
}

// 获取 公司信息
const getCompanyInfo = function(data){
	return new Promise(async function(resolve,reject){
		let localData = uni.getStorageSync('companyInfo')
		if(localData){
			resolve({value:localData,statu:200,msg:'本地获取公司信息成功'})
		}else{
			let res = await getCompanyInfoById(data)
			console.log('接口获取信息')
			console.log(res)

			if(res.statusCode === 200){
				uni.setStorage({
					key:'companyInfo',
					data:res.data.data,
					success() {
						resolve({value:res.data.data,statu:res.statusCode,msg:res.msg})
					}
				})
			}else{
				resolve({value:null,statu:res.statusCode,msg:res.msg})
			}
		}
	})
}

const userActiveList = [
	'正在查看 你的 名片',				//	查看名片
	'正在分享 你的 名片',				//  分享名片
	'靠谱 +1 ，及时沟通，效率更高', 	//  点赞
	'保留了您的电话号码，请及时回复',	//  保存通讯录
	'保留了您的微信号，请及时回复',		//  复制微信号
]


const userAction = async function(clientId,saleId,type){
	const activeContent = userActiveList[type]
	const addRes = await addActiverecord({activeContent, clientId ,saleId,activeType:type})

	if(addRes.data.data==1){
		console.log('aaaaaaaaaaaa')
		console.log(activeContent + ' success')
		console.log('aaaaaaaaaaaa')
	}
	return addRes
	
}




module.exports = {
	previewImg,
	initGetAlbum,
	getImgInfo,
	urlToLocalPath,
	getSalesInfo,
	getCompanyInfo,
	userAction
}