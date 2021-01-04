'use strict';
	let  bool = false
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log(event)
	let customUserId = '123456';
	const auth = uniCloud.auth()

	const ticket = uniCloud.customAuth().createTicket(customUserId, {
	  refresh: 10 * 60 * 1000 // 每十分钟刷新一次登录态， 默认为一小时
	});
	auth.getLoginState().then(loginState => {
	  if (loginState) {
	    // 登录态有效
		console.log('已经登录')
	  } else {
		console.log('暂未登录')
	    // 没有登录态，或者登录态已经失效
	  }
	})

	console.log('检测 uniCloud.customAuth() 是否有 signInWithTicket 方法')
	console.log(uniCloud.customAuth().hasOwnProperty('signInWithTicket'))

	return {event:event}
};