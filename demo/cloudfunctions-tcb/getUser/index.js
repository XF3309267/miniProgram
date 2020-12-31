'use strict';
const db = uniCloud.database();
const userDb = db.collection('user')

exports.main = async (event, context) => {
	//event为客户端上传的参数
	let res = await userDb.get();
	
	console.log('event : ', res)
	
	//返回数据给客户端
	return res
};
