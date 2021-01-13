
const baseURL = 'http://192.168.188.139:9999'
const normalHeader = {
	
}
const token = function(){
	let value = uni.getStorageSync('token')
	return 'bearer a347a4b8-6d71-4b73-9eaa-0f4276df50ad'
	if(value){
		return value
	}else{
		return 'bearer a347a4b8-6d71-4b73-9eaa-0f4276df50ad'
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
// /card/wx/cardcompanyinfo/getCompany/
const getCompanyInfo = function(data){
	console.log('tokenHeadr')
	console.log(tokenHeadr)
	return myHttp(
		{
			url:'/card/wx/cardcompanyinfo/getCompany/'+ data.id,
			header:tokenHeadr,
		}
	)   
} 

// function({addUrl,data,method,  }  ){
// 	return new Promise(function(resolve,reject){
// 		uni.request({
// 			url:baseURL + '/card/wx/cardcompanyinfo/all' ,
// 			data:{ },
// 			method: 'GET',
// 			success:(res)=>{
// 				resolve(res)
// 			},
// 			fail:(res)=>{
// 				resolve(res)
// 			},
// 			complete:(res)=>{
				
// 			},
// 		})
// 	})
// }



module.exports = {
	getCompanyInfo
}