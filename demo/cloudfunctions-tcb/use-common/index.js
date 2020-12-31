'use strict';
	

	let customUserId = 'xilu';

	
	const ticket = uniCloud.auth().createTicket(customUserId, {
	  refresh: 10 * 60 * 1000 // 每十分钟刷新一次登录态， 默认为一小时
	});


exports.main = async (event, context) => {
	//event为客户端上传的参数
	//返回数据给客户端
	let addUserRes = await userDb.add(bool);
	return ticket
};
