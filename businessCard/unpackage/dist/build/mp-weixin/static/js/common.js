// 预览图片
const previewImg = function(arg,index){
	let arr = arg
	if(!index){
		index = 0
	}
	if(!Object.prototype.toString.call(o)== '[object Array]'){
		arr = [arg]
	}
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

module.exports = {
	previewImg
}