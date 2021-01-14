
const baseURL = 'http://192.168.188.139:9999'
const normalHeader = {
	
}
const token = function(){
	let value = uni.getStorageSync('token')
	return 'bearer ddbd3fcc-991d-4de2-a31d-1c351cc6170f'
	if(value){
		return value
	}else{
		return 'bearer ddbd3fcc-991d-4de2-a31d-1c351cc6170f'
	}
}

const tokenHeadr ={
	Authorization: token()
}


const myHttp = function({url,data,method,header}){
	if(!data){
		data = ''
	}
	if(!method){
		method = 'GET'
	}
	if(!header){
		header = ''
	}
	return new Promise(function(resolve,reject){
		uni.request({
			url:baseURL + url,
			method:method,
			header:header,
			data:data,
			success:(res)=>{
				console.log('success')
				
				console.log(res)
				resolve(res)
			},
			fail:(res)=>{
				console.log('fail')
				
				console.log(res)
				resolve(res)
			}
		})
	})

}

// 获取小程序用户 code
const geCode = function(){
	return new Promise(function(resolve,reject){
		uni.login({
			provider:'weixin',
			success: (res) => {
				resolve(res)
			},
			fail: (res)=>{
				reject(res)
			}
		})
	})
}


// 获取用户 openid
const getOpenId = async function(){
	const code = await geCode()
	let data = {}
	data.code = code 
	if(code){
		return myHttp({ url:'/card/wx/cardcompanyinfo/all',data})
	}
} 

//	获取公司信息   
//  参数： 公司id
// /card/wx/cardcompanyinfo/getCompany/
const getCompanyInfoById = function(data){
	console.log('tokenHeadr')
	console.log(tokenHeadr)
	console.log('获取公司信息')
	console.log(data)
	return myHttp(
		{
			url:'/card/wx/cardcompanyinfo/getCompany/'+ data.id,
			method:'GET',
			header:tokenHeadr,
		}
	)   
} 
//	获取销售信息   
//  参数： 销售id
//	/card/cardWeChat/cardsalesinfo/getCardSalesInfoById/
const getCardSalesInfoById = function(data){
	
	return myHttp(
		{
			url:'/card/cardWeChat/cardsalesinfo/getCardSalesInfoById/'+ data.id,
			method:'GET',
			header:tokenHeadr,
		}
	)   
} 

// 添加用户活跃记录
//	/card/cardWeChat/cardClientActiverecord/addActiverecord
const addActiverecord = function(data){
	
	return myHttp(
		{
			url:'/card/cardWeChat/cardClientActiverecord/addActiverecord',
			method:'POST',
			header:tokenHeadr,
			data:data
		}
	)   
}

// 	根据 销售Id 获取销售所绑定的用户
//  /card/cardWeChat/cardclientinfo/getClientInfosByCardSalesId/
const getClientInfosByCardSalesId = function(data){
	
	return myHttp(
		{
			url:'/card/cardWeChat/cardclientinfo/getClientInfosByCardSalesId/'+ data.id,
			method:'GET',
			header:tokenHeadr,
		}
	)   
} 

// 	根据输入内容 搜索用户
//	/card/cardWeChat/cardclientinfo/getClientInfosBySearchContent
const getClientInfosBySearchContent =  function(data){

	return myHttp(
		{
			url:'/card/cardWeChat/cardclientinfo/getClientInfosBySearchContent',
			method:'GET',
			data:data,
			header:tokenHeadr,
		}
	)   
} 


module.exports = {
	getCompanyInfoById,
	getCardSalesInfoById,
	getClientInfosByCardSalesId,
	getClientInfosBySearchContent,
	addActiverecord
}