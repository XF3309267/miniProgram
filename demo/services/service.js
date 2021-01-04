const baseURL = ''


const getCode = function(){
	return new Promise(function(resolve,reject){
		uni.login({
			provider: 'weixin',
			success(res) {
				console.log('登录返回 success')
				console.log(res)
				resolve(res)
			},
			fail(res){
				console.log('登录返回 fail')
				console.log(res)
				resolve(res)
			}
			
		})
	})
}

module.exports = {
	getCode
}