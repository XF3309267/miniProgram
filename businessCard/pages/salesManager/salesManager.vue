<template>
	<view class="" style="padding-bottom: 120rpx;">
		<FixedChat  :userType="userType"/>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false" :selfBack="true">
			<block slot="backText">
				<!-- <view class="flex">
					<view class="self-avatar margin-lr-xs" style="width: 2em;height: 2em">
						<open-data type="userAvatarUrl"></open-data>
					</view>
					<text class="cu-tag round padding-left-lg bg-white text-black"> 个人中心 </text>
				</view> -->
				<PersonalIcon/>
			</block>
			<block slot="content"> <text class="text-bold"> 销售经理 </text> </block>
		</cu-custom>
		<view class="bigCanvas-container">
			<canvas :id="myCanvasId" :canvas-id="myCanvasId" class="canvasW" :style="[ctxWStr,ctxHStr]" ></canvas>
		</view>
		<view class="">
			<view class="bg-white padding-top">
				<SalesManagerCard/>
				<view class="padding-sm flex justify-between">
					<view class="">
						<view class="cu-avatar-group">
							<view class="cu-avatar round sm" v-for="(item,index) in avatar" :key="index" :style="[{ backgroundImage:'url(' + avatar[index] + ')' }]"></view>
						</view>
						<text> {{browseCount}} 人浏览 </text>
					</view>
					<view class="text-lg text-green" @click="appreciate" >
						<text class="cuIcon-appreciate " v-if="!userIsAppreciate"></text>
						<text class="cuIcon-appreciatefill" v-if="userIsAppreciate" > </text>
						<text class="text-green"> {{appreciateCount}} </text>  
					</view>
				</view>
			</view>
			<view class="padding bg-white margin-top">
				<view class="">
					个人简介
				</view>
				<view class="padding-top text-black">
					数年来一直从事经济管理教育工作，曾执教过多门专业课程，主要讲授课程：统计学原理、管理会计、市场营销学、人力资源管理统计。
				</view>
			</view>
			<view class="bg-white padding">
				<view class="text-gray padding-sm">
					语音留言
				</view>
				<view class=" round  play-line solids">
					<view class="self-round" @click="playAudio"   >
						<text class="cuIcon-playfill text-green  text-xl play"  v-show="!audioIsPlay" ></text>
						<text class="cuIcon-stop text-green  text-xl play" v-show="audioIsPlay"></text>
					</view>
					<text class="text-green"> {{showAudioTime}} </text>
				</view>
			</view>
			
			<view class="margin-top">
				<view class=" flex justify-between padding-sm margin-top bg-white">
					<text class="  text-lg text-bold"> 精彩图册 </text> 
				</view>
				<view class="padding-sm">
					<view class="img-container " v-for="(item,index) in altas" :key="item.id">
						<image   :src="item.url" mode="widthFix" ></image>
						<view class="brief"> 这里是对图片的说明  </view>
					</view>
				</view>
			</view>
			
			<view class="fixed-bottom">
				<button @click="showBottomPoup" class="cu-tag round padding-sm bg-green self-text margin-0"> 分享名片</button>
				<view class="cu-tag round padding-sm bg-green self-text" @click="copyWxId"> 
					加微信
					<view  class="sm-title">
						WX_id54633342
					</view>
				</view>
				<view class="cu-tag round bg-green self-text" @click="phoneCall"> 
					<view class="" >
						联系她
					</view>
					<view  class="sm-title">
						您的手机号码不会被泄露
					</view>
				</view>
			</view>
		</view>
		<u-popup v-model="bottomPoup" height="260rpx" mode="bottom" border-radius="14">
			<view class="poup-container">
				<view class="item-container">
					<button open-type="share" class="hidden-btn">  </button>
					<view class="bottom-img-container bg-green">
						<image src="@/static/img/salesPersonImg/wexin.png" mode="widthFix"></image>
					</view>
					<view class="info">
						微信好友
					</view>
				</view>
				
				<view class="item-container">
					<view class="bottom-img-container bg-blue">
						<image src="@/static/img/salesPersonImg/card.png" mode="widthFix"></image>
					</view>
					<view class="info">
						名片海报
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	
	import SalesManagerCard  from '@/components/SalesManagerCard'
	import PersonalIcon from '@/components/PersonalIcon'
	import FixedChat from '@/components/FixedChat.vue'
	
	
	import {initGetAlbum,getImgInfo,urlToLocalPath} from '@/static/js/common.js'
	export default {
		data() {
			return {
				userType:-1,
				avatar: [
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg'
				],
				browseCount:123,
				appreciateCount:53,
				userIsAppreciate: false,
				salesManagerInfo:{
					name:'王珞丹',
					avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
					position:'',
					wxId:'wx_id1245343543',
					phone:'13970853937',
					company:'江西省家院里科技江西省家院里科技',
					brief:'',
					mail:'123123222@gmail.com'
				},
				
				altas: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
				// 音频
				audioIsPlay: false,
				audioObj:'',
				audioSrc:'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
				allTime:0,
				audioCurrentTime:0,
				// type  区分 销售 和 普通用户, 0: 普通用户， 1: 销售
				type:0,
				
				bottomPoup: false,
				
				// 画布所需
				myCanvasId:'myCanvas',
				avatar:'',
				tempFilePath:'',
				smCtxW:0,
				smCtxH:0,
				ctx:null,
				pixeRatio:0,
				getalbum:false,
				
				// https://cdn.jsdelivr.net/gh/XF3309267/imgs/img/phone.png
				// https://cdn.jsdelivr.net/gh/XF3309267/imgs/img/home.png
				// https://cdn.jsdelivr.net/gh/XF3309267/imgs/img/email.png
				
				
				paintArr:[
					//  销售头像
					// https://cdn.jsdelivr.net/gh/XF3309267/imgs/img/81f6b5a961a5cd27d64f05192440b47.jpg
					{type:'img',content:'https://cdn.jsdelivr.net/gh/XF3309267/imgs/img/81f6b5a961a5cd27d64f05192440b47.jpg',xPosition:0,yPosition:0},
					
					{type:'img',content:'https://cdn.jsdelivr.net/gh/XF3309267/imgs/img/phone.png',xPosition:0,yPosition:0},
					{type:'img',content:'https://cdn.jsdelivr.net/gh/XF3309267/imgs/img/home.png',xPosition:0,yPosition:0},
					{type:'img',content:'https://cdn.jsdelivr.net/gh/XF3309267/imgs/img/email.png',xPosition:0,yPosition:0},
					// 公司  logo
					{type:'img',content:'https://cdn.jsdelivr.net/gh/XF3309267/imgs/img/email.png',xPosition:0,yPosition:0},
					{type:'text',content:'你好发送方大哥哥但是广东省法规收到',xPosition:0,yPosition:0}
				],
				newPainArr:[],			
			}
		},
		
		watch:{
			
		},
		computed:{
			showAudioTime(){
				if(!this.audioIsPlay){
					return parseInt(this.allTime)+'s'
				}
				
				if(this.allTime === 0){
					return '0s'
				}
				
				return parseInt(this.allTime - this.audioCurrentTime ) + 's'
			},
			// 画布的 宽度
			ctxWStr(){
				if(this.smCtxW){
					return{
						'width':this.smCtxW * this.pixeRatio + 'px'
					}
				}
			},
			ctxHStr(){
				if(this.smCtxH){
					return{
						'height':this.smCtxH * this.pixeRatio + 'px'
					}
				}
			},

		},
		onShareAppMessage() {
			return{
				title:'您好，我是'+this.salesManagerInfo.name+',一键保存，了解更多...',
				success:(res)=>{
					console.log('分享 success')
					console.log(res)
				},
				fail:(res)=>{
					console.log('分享 fail')
					console.log(res)
				}
			}
		},
		onShow() {
			if(this.userType===-1){
				this.initUserType()
			}
			getImgInfo('@/static/img/salecPersonImg/home.png')
		},
		onLoad() {
			
			// uni.chooseImage({
			// 	success: async (res) => {
			// 		console.log('选择图片后')
			// 		let imgLoaclUrl = res.tempFilePaths[0]
			// 		let obj = await urlToLocalPath(imgLoaclUrl)
			// 		console.log('-----------------')
			// 		console.log(obj)
			// 		console.log('----*************-')
			// 	},
				
			// })
			uni.showToast({
				title:'您好，我是您的销售经理。有什么问题可以随时咨询我哦！',
				icon:'none',
			})
		},
		created() {
			this.initCanvas(this.myCanvasId)
			
			console.log(this.paintArr)
			this.newPainArr =  this.arrangPaintList(this.paintArr)
			console.log(this.newPainArr)
			this.canvansTodo(this.ctx,this.myCanvasId,this.pixeRatio,this.newPainArr,this.smCtxW *this.pixeRatio ,this.smCtxH * this.pixeRatio )
		},
		mounted() {
			
		},
		methods: {
			initUserType(){
				this.userType = getApp().globalData.userType
			},
			// 播放音频
			playAudio(){
				if(this.audioIsPlay){
					console.log('音乐播放中')
					this.startTime = 0
					this.audioIsPlay = false
					this.audioObj.pause()
					this.audioObj.destroy()
					return 
				}
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.src =  this.audioSrc
				
				innerAudioContext.onCanplay(()=>{
					this.audioCurrentTime = innerAudioContext.currentTime 
					innerAudioContext.play()
					this.audioIsPlay = true
						
					innerAudioContext.onPlay(() => {
					 this.audioCurrentTime = innerAudioContext.currentTime
					 this.audioObj = innerAudioContext
					 innerAudioContext.onTimeUpdate(()=>{
					 	this.allTime = innerAudioContext.duration
					 	this.audioCurrentTime = innerAudioContext.currentTime
					 	
					 	const restTime = parseInt(this.allTime - this.audioCurrentTime )
					 	if(!restTime){
					 		innerAudioContext.destroy()
					 		this.audioIsPlay = false
					 	}
					 })
					});
				})
				innerAudioContext.onError(()=>{
					uni.showToast({
						title:'音频播放错误',
						icon:'none'
					})
					this.audioIsPlay = false
					innerAudioContext.destroy()
				})
			},
		
			// 点赞
			appreciate(){
				if(this.userIsAppreciate){
					console.log('用户已经点赞')
					return
				}
				this.appreciateCount++;
				this.userIsAppreciate = true
			},
			// 拨打电话
			phoneCall(){
				uni.makePhoneCall({
					phoneNumber: this.salesManagerInfo.phone,
					success(res) {
						console.log('makePhoneCall success')
						console.log(res)
					},
					fail(res){
						console.log('makePhoneCall fail')
						console.log(res)
					}
				})
			},
			// 复制微信号
			copyWxId(){
				uni.setClipboardData({
					data: this.salesManagerInfo.wxId,
					success: function() {
						uni.showToast({
							title:'成功复制微信号',
						})
					},
					fail:function(){
						console.log('复制失败')
					}
				})
			},
			// 弹出 弹出框
			showBottomPoup(){
				this.bottomPoup = true
			},
			
			// 将要绘制的元素加入 绘制 数组
			addEleToList(ele,type,x,y){
				if(type==='img'){
					
				}
			},
			
			
			// 画布所需
			initCanvas(canvansId){
				this.ctx = uni.createCanvasContext(canvansId)
				uni.getSystemInfo({
					success:(res)=>{
						this.smCtxH = res.screenHeight * 0.8
						this.smCtxW = this.smCtxH * 0.5
						if(res.screenWidth < this.smCtxW ){
							this.smCtxW = res.screenWidth
						}
						this.pixeRatio = res.pixelRatio
					}
				})
			},
			
			// 绘制文字
			paintText(ctx,text,color,fontSize,x,y){
				ctx.setFillColor(color)
				ctx.setFontSize(fontSize)
				ctx.fillText(text,x,y)
			},
			// 绘制 换行文字
			paintLogText(ctx,text,color,fontSize,x,y,lineStep,limitLength){
				if(!limitLength){
					limitLength = 8
				}
				if(!lineStep){
					lineStep = 17
				}
				let textLengthArr = []
				textLengthArr.length = Math.ceil(textLength / limitLength)
				
				const textLength = text.length
				if(textLength>limitLength){
					for (let i = 0; i < textLengthArr.length; i++) {
						let str2 = text.subString(limitLength * i ,limitLength * (i + 1))
						textLengthArr[i] = str2
						this.paintText(ctx,str2,color,fontSize,x,y + (addStep * i * this.pixeRatio) )
					}
				}else{
					this.paintText(ctx,text,color,fontSize,x,y)
				}
			},
			
			// 绘制 纯色背景
			paintBgColor(ctx,color,canvansW,canvansH){
				ctx.setFillColor(color)
				canvansW = this.smCtxW * this.pixelRatio 
				canvansH = this.smCtxH * this.pixelRatio 
				ctx.fillRect(0,0,canvansW,canvansH)
			},
			
			
			// 过滤 绘制数组，将图片转为本地图片
			arrangPaintList(paintArr){
				console.log(paintArr)
				let arr = paintArr
				arr.forEach(async (ele,index)=>{
				
					if(ele.type === 'img'){
						console.log('for  ')
						console.log(ele)
						const res = await urlToLocalPath(ele.content)
				
						
						
						ele.content = res.path
						ele.widtth = res.width
						ele.height = res.height
					}
				})
				console.log('----------arrr-------------')
				console.log(arr)
				return arr
			},
			
			canvansTodo(ctx,canvasId,pixelRatio,paintArr,finalW,finalH){
				uni.showLoading({
					title:'名片海报生成中',
					mask:true
				})
				
				
				let HraceW = paintArr[0].height / paintArr[0].width;
				
				let dwidth = finalW / 5;
				let dHeight = dwidth * HraceW;
			
				if(paintArr[0].content!==undefined){
					console.log('首项数据')
					console.log(paintArr[0].conent)
					ctx.drawImage(paintArr[0].content,paintArr[0].xPosition,paintArr[0].yPosition, 200, 200)
					ctx.draw(true)
					setTimeout( async ()=>{
						uni.hideLoading()
						const resTempFile = await this.canvansToFile(canvasId,finalW,finalH)
						console.log(resTempFile)
					},1000)
				}
				

			},
			canvansToFile(canvansId,clipW,clipH){
				return new Promise(function(resolve,reject){
					uni.canvasToTempFilePath({
						x:0,
						y:0,
						destWidth:clipW,
						destHeight:clipH,
						canvasId:canvansId,
						success:(res)=>{
							resolve(res.tempFilePath)
						},
						fail:(res)=>{
							resolve(res.tempFilePath)
						}
					})
				})
			}
		},
		components:{
			SalesManagerCard,
			PersonalIcon,
			FixedChat
		}
	}
</script>

<style lang="scss" scoped>

.play-line{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx 40rpx;
	background-color: #FFFFFF;
	
}
.self-round{
	position: relative;
	width: 50rpx;
	height: 50rpx;
	border:4rpx solid #4CD964;
	border-radius: 50%;
	text-align: center;
	
	.play{
		
		line-height: 42rpx;
		/* width: 1em;
		height: 1em; */
		margin: auto;
	}
}



/*  精彩图册  */
.img-container{
	position: relative;
	width: 720rpx;
/* 	height: 380rpx; */
	padding: 20rpx;
	border-radius: 10rpx;
	margin: 20rpx auto;
	background-color: #FFF;
	
	image{
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}
	
	.brief{
		position: absolute;
		bottom: 30rpx;
		left: 30rpx;
		color: #FFFFFF;
	}
}



.fixed-bottom{
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	justify-content: space-around;
	padding: 30rpx 20rpx;
	width: 100%;
	background-color: #FFFFFF;
	font-size: 40rpx;
	
	.self-text{
		display: flex;
		flex-flow: column nowrap; 
		height: 3em;
		padding: 20rpx 30rpx;
		
		.sm-title{
			font-size: .7em;
		}
	}
}




.poup-container{
	display: flex;
	justify-content: space-around;
	padding: 20rpx;
	.item-container{
		position: relative;
		width: 220rpx;
		height: 220rpx;
		padding: 20rpx;
		overflow: hidden;
		
		.hidden-btn{
			position: absolute;
			z-index: 100;
			top: -20%;
			left: -20%;
			width: 140%;
			height: 140%;
			background-color: rgba(255,255,255,0);
		}
		
		.bottom-img-container{
			display: flex;
			justify-content: center;
			align-items: center;
			width: 120rpx;
			height: 120rpx;
			padding: 20rpx;
			border-radius: 50%;
			margin: auto;
			image{
				width: 80rpx;
				height: 80rpx;
			}
		}
		
		
		.info{
			width: 100%;
			height: 40rpx;
			line-height: 40rpx;
			text-align: center;
		}
		
	}
	
}


// 画布样式
.bigCanvas-container{
	position: relative;
	height: 0rpx;
	overflow: hidden;
}
.canvasW{
	position: absolute;
	top: 10000000rpx;
	width: 100%;
}

</style>
