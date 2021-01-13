// 预览图片
const previewImg = function(arg,index){
	let arr = arg
	if(!index){
		index = 0
	}
	if(!Object.prototype.toString.call(arg)== '[object Array]'){
		arr = [arg]
	}
	
	// 预览图片
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



// 检测用户 是否开启 相册权限
const initGetAlbum = function(){
	return new Promise(function(resolve,rejcet){
		uni.getSetting({
			success(res){
				console.log(res)
				if(res.authSetting["scope.writePhotosAlbum"]){
					resolve(true)
				}else{
					resolve(false)
				}
			},
			fail(res){
				resolve(false)
			}
		})
	})
}

// 获取图片信息
const getImgInfo = function(src){
	return new Promise(function(resolve,reject){
		uni.getImageInfo({
			src: src,	
			success:(res)=>{
				resolve(res)
			},
			fail:(res)=>{
				resolve(res)
			}
		})
	})
}

// height: 1080
// orientation: "up"
// path: "http://tmp/wx35fcaefd77a58c6c.o6zAJs-IEBAnJ17SbtuHII1h1zXI.rPqVBkwilNOF11d6c58b1f1fa1cddc3a8e476c67e756.jpg"
// type: "jpeg"
// width: 1440


// 网络图片转为 本地链接  和 宽高信息

const urlToLocalPath =  function(url){
	// const getImginfoRes = await getImgInfo(url)
	return new Promise(function(resolve,reject){
		const obj = {}
		uni.downloadFile({
			url:url,
			success: (res) => {
				const temp = res.tempFilePath
				resolve(temp)
			},
			fail:(res)=>{
				resolve(res)
			}
		})
	})

}


module.exports = {
	previewImg,
	initGetAlbum,
	getImgInfo,
	urlToLocalPath
}