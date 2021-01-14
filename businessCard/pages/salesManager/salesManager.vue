<template>
	<view class="" style="padding-bottom: 120rpx;">
		<FixedChat  :userType="userType" :newsCount="newsCount"/>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false" :selfBack="true">
			<block slot="backText">
				<!-- <view class="flex">
					<view class="self-avatar margin-lr-xs" style="width: 2em;height: 2em">
						<open-data type="userAvatarUrl"></open-data>
					</view>
					<text class="cu-tag round padding-left-lg bg-white text-black"> 个人中心 </text>
				</view> -->
				<PersonalIcon :salesManagerInfo="salesManagerInfo" />
			</block>
			<block slot="content"> <text class="text-bold"> {{salesManagerInfo.jobTitle}} </text> </block>
		</cu-custom>
		<view class="bigCanvas-container">
			<canvas :id="myCanvasId" :canvas-id="myCanvasId" class="canvasW" :style="[ctxWStr,ctxHStr]" ></canvas>
		</view>
		<view class="">
			<view class="bg-white padding-top">
				<SalesManagerCard :salesManagerInfo="salesManagerInfo"  :companyInfo="companyInfo"  @onMailList="onMailList"  />
				<view class="padding-sm flex justify-between">
					<view class="">
						<view class="self-avatar-list">
							<view v-for="(item,index) in avatarList" :key="index" class="self-avatar-item">
								<u-avatar  size="50"  :src="item"></u-avatar>
							</view>
							<text class="u-p-l-20"> {{salesManagerInfo.readNum}} 人浏览 </text>
						</view>
						
					</view>
					<view class="text-lg text-green" @click="appreciate" >
						<text class="cuIcon-appreciate " v-if="!userIsAppreciate"></text>
						<text class="cuIcon-appreciatefill" v-if="userIsAppreciate" > </text>
						<text class="text-green"> {{salesManagerInfo.likeNum}} </text>  
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
				<view class="cu-tag round bg-green self-text" @click="confirmCallPhone"> 
					<view class="" >
						联系她
					</view>
					<view  class="sm-title">
						您的手机号码不会被泄露
					</view>
				</view>
			</view>
			
			<view class="padding bg-white margin-top">
				<view class="">
					个人简介
				</view>
				<view class="padding-top text-black">
					{{salesManagerInfo.salesWordIntroduce}}
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
			
			
		</view>
		<u-popup v-model="bottomPoup" height="260rpx" mode="bottom" border-radius="14">
			<view class="poup-container">
				<view class="item-container">
					<button open-type="share" @click="shareCard" class="hidden-btn">  </button>
					<view class="bottom-img-container bg-green">
						<image src="@/static/img/salesPersonImg/wexin.png" mode="widthFix"></image>
					</view>
					<view class="info">
						微信好友
					</view>
				</view>
				
				<view class="item-container" @click="createPostCard">
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
	
	import { getCardSalesInfoById ,addActiverecord} from '@/services/services.js'
	
	import {initGetAlbum,getImgInfo,urlToLocalPath,previewImg,getSalesInfo,getCompanyInfo,userAction} from '@/static/js/common.js'
	export default {
		data() {
			return {
				userType:-1,
				newsCount:12,
				avatarList: [
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg'
				],

				userIsAppreciate: false,
				
				clientId:2,
				salesId:20,

				salesManagerInfo:{
					companyId: -1,
					createTime: "",
					deleted: -1,
					headPortrait: "",
					id: -1,
					jobTitle: "",
					likeNum: -1,
					readNum: -1,
					resignStatus: -1,
					salesLoginPhone: "",
					salesMailbox: "",
					salesName: "",
					salesOpenId: "",
					salesPhone: "",
					salesVoiceIntroduce: "",
					salesWordIntroduce: "",
					salesWx: "",
					updateTime: "",
				},
				companyInfo:{
					"companyAddress": "",
					"companyImagesIntroduce": "",
					"companyLogo": "",
					"companyMailbox": "",
					"companyManifesto": "",
					"companyName": "",
					"companyPhone": "",
					"companyVoiceIntroduce": "",
					"companyWordIntroduce": "",
					"createTime": "",
					"deleted": 0,
					"id": 0,
					"updateTime": ""
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
				initCanvasRes: false,				
				
				paintArr:[],	
			}
		},
		

		
		
		
		
		watch:{
			
		},
		computed:{
			showAudioTime(){
				if(!this.audioIsPlay){return parseInt(this.allTime)+'s'}
				if(this.allTime === 0){return '0s'}
				return parseInt(this.allTime - this.audioCurrentTime ) + 's'
			},
			// 画布的 宽度
			ctxWStr(){
				if(this.smCtxW){
					return{ 'width':this.smCtxW * this.pixeRatio + 'px'}
				}
			},
			ctxHStr(){
				if(this.smCtxH){
					return{ 'height':this.smCtxH * this.pixeRatio + 'px' }
				}
			},
		},
		onShareAppMessage() {
			return{
				title:'您好，我是'+this.salesManagerInfo.salesName+',一键保存，了解更多...',
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
			this.sayHello(10000)
			getImgInfo('@/static/img/salecPersonImg/home.png')
		},
		onLoad() {
			
		},
		async created() {
			// 进入页面 首次 就算 浏览名片一次
			userAction(this.clientId,this.salesId,0)

			const initCanvasRes = await this.initCanvas(this.myCanvasId)
			this.initCanvasRes = initCanvasRes
			const getSalesInfoRes = await this.initSalesInfo(this.salesId)
			if(getSalesInfoRes){
				this.initCompanyInfo(this.salesManagerInfo.companyId)
			}
			
			
			// 对于异步的处理  
			// 建议 不要用在 for 循环中（特别是 使用 async await )
			
		},
		mounted() {
			
		},
		methods: {
			initUserType(){
				this.userType = getApp().globalData.userType
			},
			
			// 进入页面打招呼
			sayHello(durationTime=2000,title){
				if(!title){
					title = '您好，我是您的销售经理。有什么问题可以随时咨询我哦！'
				}
				uni.showToast({
					title: title,
					icon:'none',
					duration:durationTime,
				})
			},
			// 初始化 画布图片信息
			inintPaintImgArr(){
				this.paintArr.push(this.salesManagerInfo.headPortrait)
				this.paintArr.push(this.companyInfo.companyLogo)
				this.paintArr.push(this.companyInfo.companyLogo)
				console.log('push finally')
				console.log(this.paintArr)
			},
			// 初始化 销售的信息
			initSalesInfo(salesId){
				return new Promise(async (resolve,reject)=>{
					uni.showLoading({
						title:'您的专属销售正在赶路的路上...',
						mask:true
					})
					
					let data = {id:salesId}
					const getSalesInfoRes = await getSalesInfo(data)
					if(getSalesInfoRes.statu===200){
						this.salesManagerInfo = Object.assign({},getSalesInfoRes.value)
						resolve(true)
					}else{
						uni.showToast({
							title: getSalesInfoRes.msg,
							icon:'none'
						})
						resolve(false)
					}
					uni.hideLoading()
				})
				
			},
			
			// 初始化  公司信息
			
			async initCompanyInfo(companyId){
				uni.showLoading({
					title:'公司信息资源获取中....',
					mask:true
				})
				
				let data = {id:companyId}
				const getCompanyInfoRes = await getCompanyInfo(data)
				if(getCompanyInfoRes.statu===200){
					this.companyInfo = getCompanyInfoRes.value
					console.log('----- company  ---')
					console.log(getCompanyInfoRes.value)
					
					this.inintPaintImgArr()
					
					
				}else{
					uni.showToast({
						title: getCompanyInfoRes.msg,
						icon:'none'
					})
				}
				uni.hideLoading()
			},
			// 用户浏览 名片
			userAppreciate(){
				const res = userAction(this.clientId,this.salesId,1)
				console.log('res')
				console.log(res)
	
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
				console.log('音频文件')
				console.log(this.salesManagerInfo.salesVoiceIntroduce)
				
				innerAudioContext.src =  this.salesManagerInfo.salesVoiceIntroduce
				
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
					this.salesManagerInfo.likeNum --
					this.userIsAppreciate = false
					return
				}
				// const res = userAction(this.clientId,this.salesId,1)
				// this.salesManagerInfo.likeNum++;
				this.userIsAppreciate = true
			},
			
			
			confirmCallPhone(){
				uni.showModal({
					title:'拨号提示',
					content:'您确认拨打电话：'+ this.salesManagerInfo.salesPhone+' 吗？',
					success: (res) => {
						if(res.confirm){
							console.log('用户点击了 确认')
							this.phoneCall()
						}
					}
				})
			},
			
			// 保存通讯录的 额外操作
			// 因为只是单方面的对 销售的信息操作，不涉及后台
			onMailList(){
				userAction(this.clientId,this.salesId,4)
			},
			
			// 拨打电话
			phoneCall(){
				
				uni.makePhoneCall({
					phoneNumber: this.salesManagerInfo.salesPhone,
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
					data: this.salesManagerInfo.salesWx,
					success: ()=>{
						uni.showToast({
							title:'成功复制微信号',
						})
						userAction(this.clientId,this.salesId,3)
					},
					fail:()=>{
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
			// 生成名片海报
			createPostCard(){
				userAction(this.clientId,this.salesId,2)
				if(this.initCanvasRes){
					this.canvansTodo(this.ctx,this.myCanvasId,this.pixeRatio,this.paintArr,this.smCtxW *this.pixeRatio ,this.smCtxH * this.pixeRatio )
				}
			},	
			// 点击分享名片
			shareCard(){
				userAction(this.clientId,this.salesId,2)
			},
			// 画布所需
			initCanvas(canvansId){
				return new Promise((resolve,reject)=>{
					this.ctx = uni.createCanvasContext(canvansId)
					uni.getSystemInfo({
						success:(res)=>{
							console.log(res)
							
							this.smCtxH = res.screenHeight * 0.5
							this.smCtxW = this.smCtxH * 0.8
							if(res.screenWidth < this.smCtxW ){
								this.smCtxW = res.screenWidth
							}
							this.pixeRatio = res.pixelRatio
							resolve(true)
						}
					})
				})
			},
			
			// 绘制文字
			paintText(ctx,pixelRatio,text,color,fontSize,x,y){
				ctx.setFillStyle(color)
				ctx.setFontSize(fontSize * pixelRatio )
				ctx.fillText(text,x * pixelRatio,y * pixelRatio)
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
				ctx.rect(0,0,canvansW,canvansH);
				ctx.fillStyle = color;
				ctx.fill();
			},
			
			
			
		  /**该方法用来绘制一个有填充色的圆角矩形 
			 *@param cxt:canvas的上下文环境 
			 *@param x:左上角x轴坐标 
			 *@param y:左上角y轴坐标 
			 *@param width:矩形的宽度 
			 *@param height:矩形的高度 
			 *@param radius:圆的半径 
			 *@param fillColor:填充颜色 
			 **/
			fillRoundRect(cxt, x, y, width, height, radius, fillColor) {
				//圆的直径必然要小于矩形的宽高          
				if (2 * radius > width || 2 * radius > height) { return false; }
		 
				cxt.save();
				cxt.translate(x, y);
				//绘制圆角矩形的各个边  
				this.drawRoundRectPath(cxt, width, height, radius);
				cxt.fillStyle = fillColor || "#000"; //若是给定了值就用给定的值否则给予默认值  
				cxt.fill();
				cxt.restore();
			},
			
			
			// 绘制 圆角矩形
			drawRoundRectPath(cxt, width, height, radius) {
				cxt.beginPath(0);
				//从右下角顺时针绘制，弧度从0到1/2PI  
				cxt.arc(width - radius, height - radius, radius, 0, Math.PI / 2);
		
				//矩形下边线  
				cxt.lineTo(radius, height);
		
				//左下角圆弧，弧度从1/2PI到PI  
				cxt.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);
		
				//矩形左边线  
				cxt.lineTo(0, radius);
		
				//左上角圆弧，弧度从PI到3/2PI  
				cxt.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2);
		
				//上边线  
				cxt.lineTo(width - radius, 0);
		
				//右上角圆弧  
				cxt.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2);
		
				//右边线  
				cxt.lineTo(width, height - radius);
				cxt.closePath();
			},
			
			
			// 过滤 绘制数组，将图片转为本地图片
			async arrangPaintList(paintArr){
				// let arr = []
				// paintArr.forEach((item,index)=>{
				// 	let obj = Object.assign({},item)
				// 	arr[index] = obj
				// })
				if(this.paintArr[0].hasOwnProperty('content')){
					return  this.paintArr
				}
				
				
				for (let i = 0; i < paintArr.length; i++) {
					const res = await getImgInfo(paintArr[i])
					const obj = {}
					obj.content = res.path
					obj.width = res.width
					obj.height = res.height
					paintArr[i] = obj
					if(i === paintArr.length-1){
						console.log('finally')
						console.log(paintArr)
						return paintArr
					}	
				}
			},
			
			// 画布绘制图像
			canvasDrawImage(ctx,pixelRatio,imgObj,dx,dy,dWidth,dHeight,lager = 1){
				// if(!sWidth){
				// 	sWidth = imgObj.width
				// }
				// if(!sHeight){
				// 	sHeight = imgObj.height
				// }
			
				
				 dx = parseInt( dx * pixelRatio)
				 dy = parseInt(dy  * pixelRatio)
				 
				dWidth = parseInt(dWidth * pixelRatio ) 
				dHeight = parseInt(dHeight * pixelRatio) 
				
				let sx = 0
				let sy = 0 
				let sWidth = dWidth
				let sHeight = dHeight

				
				ctx.drawImage(imgObj.content,dx , dy, dWidth , dHeight)
			},
			
			
			async canvansTodo(ctx,canvasId,pixelRatio,paintArr,finalW,finalH){
				 this.paintBgColor(ctx,'#FFFFFF',finalW,finalH)
				
				uni.showLoading({
					title:'名片海报生成中',
					mask:true,
				})
				
				const readyArr = await this.arrangPaintList(paintArr)
				const startX = this.smCtxW / 10
				const startY = this.smCtxH / 10
				const addYStep = this.smCtxW / 7
				const addYStepsm = this.smCtxH / 24
				const addXStep = 10
				const addXStepsm = 10
				const fontSize = this.smCtxW / 750 * 20
				const iconWidth = 15
				const iconHeight = 15

				let HraceW = readyArr[0].height / readyArr[0].width;
				let dWidth = this.smCtxW / 10 * 3
				let dHeight = HraceW * dWidth
				this.fillRoundRect(ctx,(startX-10) *pixelRatio ,(startY -10)*pixelRatio,(this.smCtxW / 10 * 8 +20 )*pixelRatio ,(dHeight + 20) *pixelRatio,10*pixelRatio,'#efefef')
				this.canvasDrawImage(ctx,pixelRatio,readyArr[0],startX,(startY - 0.5) ,dWidth,dHeight)

				
				
				this.paintText(ctx,pixelRatio,this.salesManagerInfo.salesName,'#000',fontSize,(startX + dWidth + addXStep),startY + addYStepsm)
				this.paintText(ctx,pixelRatio,this.salesManagerInfo.jobTitle ,'#000',fontSize,(startX + dWidth + addXStep),startY  + addYStepsm *2 )
				
				this.canvasDrawImage(ctx,pixelRatio,readyArr[1],(startX + dWidth + addXStep + fontSize * 12),startY + addYStepsm - iconHeight / 2, iconWidth , iconHeight)
				
				
				this.paintText(ctx,pixelRatio,'电话：' ,'#000',fontSize,(startX + dWidth + addXStep),startY  + addYStepsm *3)
				this.paintText(ctx,pixelRatio,this.salesManagerInfo.salesPhone,'#000',fontSize,(startX + dWidth + addXStep  + fontSize * 3),startY  + addYStepsm *3)
				
				this.paintText(ctx,pixelRatio,'公司：' ,'#000',fontSize,(startX + dWidth + addXStep),startY  + addYStepsm *4)
				this.paintText(ctx,pixelRatio,this.companyInfo.companyName ,'#000',fontSize,(startX + dWidth + addXStep  + fontSize * 3),startY  + addYStepsm *4)
				
				this.paintText(ctx,pixelRatio,'邮箱：' ,'#000',fontSize,(startX + dWidth + addXStep),startY  + addYStepsm *5)
				this.paintText(ctx,pixelRatio,this.salesManagerInfo.salesMailbox ,'#000',fontSize,(startX + dWidth + addXStep  + fontSize * 3),startY  + addYStepsm *5)
				
				this.paintText(ctx,pixelRatio,'您好' ,'#000',fontSize * 1.2,(startX),startY  + addYStep + dHeight)
				this.paintText(ctx,pixelRatio,'我是' + this.companyInfo.companyName + '的销售经理' + this.salesManagerInfo.salesName ,'#000',fontSize * 1.2,(startX),startY  + addYStep * 1.5 + dHeight)
				this.paintText(ctx,pixelRatio,'这是我的名片，请保存' ,'#000',fontSize * 1.2,(startX),startY  + addYStep *2 + dHeight)
				this.paintText(ctx,pixelRatio,'谢谢！' ,'#000',fontSize * 1.2,(startX),startY  + addYStep *2.5 + dHeight)

				this.paintText(ctx,pixelRatio,'长按识别二维码收下名片' ,'#000',fontSize,(startX),this.smCtxH - 60)
				this.canvasDrawImage(ctx,pixelRatio,readyArr[2],this.smCtxW- iconWidth * 8,this.smCtxH - 60 - iconWidth *2.5, iconWidth * 5 , iconHeight * 5)
				// ctx.drawImage(readyArr[1].content,)

				ctx.draw()
				setTimeout(async ()=>{
					uni.hideLoading()
					const resTempFile = await this.canvansToFile(canvasId,finalW,finalH)
					this.saveToAlbum(resTempFile)
					previewImg(resTempFile)
					console.log(resTempFile)
				},1000)
			},

			
			
			// 图片存入 本地相册
			saveToAlbum(tempFilePath){
				uni.saveImageToPhotosAlbum({
					filePath:tempFilePath,
					success: (res) => {
						uni.showToast({
							title:'存入相册成功'
						})
					},
					fail:(res)=>{
						uni.showToast({
							title:'存入相册失败',
							icon:'none'
						})
					}
				})
			},
			
			
			// 画布生成本地路径
			
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
	width: 710rpx;
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
	// position: fixed;
	// bottom: 0;
	// left: 0;
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
.self-avatar-list{
	display: flex;
	align-items: center;
	.self-avatar-item{
		width: 60rpx;
		height: 60rpx;
		padding: 5rpx;
	}
}
</style>
