
const baseURL = 'http://192.168.188.110:9999'
const normalHeader = {
	
}
const token = function(){
	let value = uni.getStorageSync('token')
	if(value){
		return value
	}
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
				resolve(res)
			},
			fail:(res)=>{
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
// /card/wx/cardcompanyinfo/all
const allCompanyInfo = function(data){
	return myHttp({url:'/card/wx/cardcompanyinfo/all'})   
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
	allCompanyInfo
}