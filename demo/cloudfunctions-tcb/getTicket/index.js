'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let customUserId = '123456';
	
	const ticket = uniCloud.customAuth().createTicket(customUserId, {
	  refresh: 10 * 60 * 1000 // 每十分钟刷新一次登录态， 默认为一小时
	});
	//返回数据给客户端
	return {ticket:ticket,result:true}
};
