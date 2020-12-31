'use strict';
const config =  {
	wechat:{
		mini:{//小程序
			appId:"wxbb7fbda7b9d8e243",
			appSecret:"646d5c7163972b1fd7e697deb26361c9"
		},
		service:{//公众号
			appId:"wx7d791f0af4d8c837",
			appSecret:"d7c62bac725b0fa8bac428012b4d9e2f"
		}
	}
}//填写对应的key
exports.main = async (event, context) => {
	var res = {code:1000,data:[]}
	var {userInfo} = event;
	
	switch (context.PLATFORM){
		case 'app-plus':
			var {access_token,openid} = event.authResult
			//1.通过判断access_token判断openId为真
			var access_token_res = await uniCloud.httpclient.request('https://api.weixin.qq.com/sns/auth?access_token',{		
				method: 'GET',
				dataType:"json",
				data:{ access_token,openid }
			});
			if(access_token_res.res.data.errcode){
				res.toast =	"access_token||openId无效";
				res.code  =	1001;
				return res;
			}else{
				//2.获取userinfo
				let userinfo_res = await uniCloud.httpclient.request('https://api.weixin.qq.com/sns/userinfo',
				{
					method: 'GET',
					dataType:"json",
					data:{ access_token,openid}
				});
				userinfo_res = userinfo_res.res.data;
				userInfo.openId = userinfo_res.openid
				userInfo.unionId = userinfo_res.unionid
			}
			break;
		case 'mp-weixin':
			let apiUrl = 'https://api.weixin.qq.com/sns/jscode2session';
			const res = await uniCloud.httpclient.request(apiUrl,
						{			
							method: 'GET',
							dataType:"json",
							data: {
								'grant_type' : 'authorization_code',
								'appid'	  : config.wechat.mini.appId,
								'secret'  : config.wechat.mini.appSecret,
								'js_code' : event.code
							}
						});
			userInfo.openId = res.data.openid
			userInfo.unionId = res.data.unionid
			break;
		case 'h5':
			
			var access_token_res = await uniCloud.httpclient.request('https://api.weixin.qq.com/sns/oauth2/access_token',
				{			
					method: 'GET',
					dataType:"json",
					data: {
						"appid":config.wechat.service.appId,
						"secret":config.wechat.service.appSecret,
						"grant_type":"authorization_code",
						"code":event.code
					}
				});
			var {access_token,openid,unionid} 	=	access_token_res.data;
			const userinfo_res = await uniCloud.httpclient.request(
				'https://api.weixin.qq.com/sns/userinfo',
				{			
					method: 'GET',
					dataType:"json",
					data: {
						access_token,openid,
						"lang":"zh_CN",
					}
				},
			);
			let {language,city,province,country} = userinfo_res.data
			var userInfo = {language,city,province,country}
			userInfo.nickName = userinfo_res.data.nickname
			userInfo.avatarUrl = userinfo_res.data.headimgurl
			userInfo.gender = userinfo_res.data.sex
			userInfo.openId = userinfo_res.data.openid
			userInfo.unionId = userinfo_res.data.unionid
			break;
		default:
			break;
	}
	return userInfo
  //event为客户端上传的参数
 // console.log('event : ' + event)
  //返回数据给客户端
  // return res
};