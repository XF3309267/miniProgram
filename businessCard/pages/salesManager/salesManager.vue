<template>
	<view class="bg-white self-tableBar-container" style="padding-bottom: 120rpx;">
		<FixedChat :userType="userType" :newsCount="unReadSpotNum" :toChatId="toChatId" />
		<cu-custom bgColor="bg-white" :isBack="false" :selfBack="true">
			<block slot="backText">
				<PersonalIcon :salesManagerInfo="salesManagerInfo" />
			</block>
			<block slot="content"> <text> {{salesManagerInfo.jobTitle}} </text> </block>
		</cu-custom>
		<view class="bigCanvas-container">
			<canvas :id="myCanvasId" :canvas-id="myCanvasId" class="canvasW" :style="[ctxWStr,ctxHStr]"></canvas>
		</view>
		<view class="">
			<view class="bg-white">
				<view class="card-container">
					<view class="absolute-bg" >
						<view class="" style="position: absolute;bottom:-25rpx;left: 0; width: 750rpx; height: 50rpx; border-radius: 50%;background:#6FC8F1 ;">
							
						</view>
					</view>
					<SalesManagerCard :equipmentType="equipmentType" :salesManagerInfo="salesManagerInfo" :companyInfo="companyInfo" @onMailList="onMailList" />
				</view>
				<view class=" flex justify-between align-center u-border-bottom u-border-top" style="min-height: 100rpx;">
					<view class="self-avatar-list">
						<!-- <view v-for="(item,index) in avatarList" :key="index" class="self-avatar-item">
							<u-avatar  size="50"  :src="item"></u-avatar>
						</view> -->
						<view class="u-p-20 u-font-14">
							<view class="cu-avatar-group">
								<view class="cu-avatar round sm" v-for="(item,index) in avatarList" :key="index"
									:style="[{ backgroundImage:'url(' + item.clientHeadPortrait + ')' }]"></view>
							</view>
						</view>
						<text class="u-p-l-20 u-type-info"> {{salesManagerInfo.readNum}} 次浏览 </text>
					</view>
					<view class=" text-green u-p-r-40" @click="debounceAppreciate">
						<text class="text-xl cuIcon-appreciate " v-if="!userIsAppreciate"></text>
						<text class="text-xl cuIcon-appreciatefill" v-if="userIsAppreciate"> </text>
						<text class="text-green"> {{salesManagerInfo.likeNum}} </text>
					</view>
				</view>
			</view>
			<view class="tag-list">
				<view class="cu-tag round padding-sm bg-white self-text tag-shadow absolute-btn-container"
					hover-class="btn-hover" @click="showBottomPoup">
					<view class="icon-container">
						<image src="@/static/img/salesPersonImg/tag-share.png" mode="aspectFit"></image>
					</view>
					<text class="text-bold"> 分享名片 </text>
				</view>
				<view class="cu-tag round padding-sm bg-white self-text tag-shadow" hover-class="btn-hover" @click="copyWxId">
					<view class="icon-container">
						<image src="@/static/img/salesPersonImg/tag-wechat.png" mode="aspectFit"></image>
					</view>
					<view class="">
						<view class="text-bold">
							加微信
						</view>
						<view class="sm-title">
							WX_id54633342
						</view>
					</view>

				</view>
				<view class="cu-tag cu-btn round bg-white self-text tag-shadow" hover-class="btn-hover" @click="judgePhoneCall">
					<view class="icon-container">
						<image src="@/static/img/salesPersonImg/tag-phone.png" mode="aspectFit"></image>
					</view>
					<view class="">
						<view class="text-bold text-left">
							联系她
						</view>
						<view class="sm-title">
							您的手机号码不会被泄露
						</view>
					</view>

				</view>
			</view>
			<view class="introduce-card">
				<view class="card-head">
					<view class="icon-container">
						<image src="@/static/img/salesPersonImg/card-introduce.png"></image>
					</view>
					我的个人介绍
				</view>
				<view class="content">
					<view class="" style="overflow: hidden;">
						{{ salesManagerInfo.salesWordIntroduce }}
					</view>
					<view class="bottom">
						<view class="title u-p-10">
							语音留言
						</view>
						<view class="bottom-main">
							<u-avatar :src="salesManagerInfo.headPortrait" size="70">
							</u-avatar>
							<view class="chat-container ">
								<view class="arrow">
									<u-icon name="play-left-fill" :color="audioIsPlay?'#00ee00':'#81F881'"></u-icon>
								</view>

								<view class="main-text self-shadow" @click="playAudio"
									:style="{backgroundColor:(audioIsPlay?'#00ee00':'#81F881')}">
									<view class="voice-container">
										<view  class="voice-item">
											<image v-show="voiceShowArr[0].statu" src="@/static/img/voiceImgs/01.png" mode="aspectFit"></image>
										</view>
										<view  class="voice-item">
											<image  v-show="voiceShowArr[1].statu" src="@/static/img/voiceImgs/02.png" mode="aspectFit"></image>
										</view>
										<view  class="voice-item" >
											<image v-show="voiceShowArr[2].statu" src="@/static/img/voiceImgs/03.png" mode="aspectFit"></image>
										</view>
									</view>
									<text class="u-p-l-20">
										{{(audioIsPlay&&showAudioTime!==0)?showAudioTime:initAllTime}}s" </text>
								</view>
							</view>
						</view>
					</view>
				</view>

			</view>
			<!-- 	
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
			</view> -->

			<view class="">
				<view class="card-head u-p-l-40 u-p-r-40">
					<view class="icon-container">
						<image src="@/static/img/salesPersonImg/album.png"></image>
					</view>
					精彩图册
				</view>
				<view class="padding-sm">
					<view class="salesImgList-img-container" v-for="(item,index) in salesAlbum" :key="index">
						<!-- {{item}} -->
						<u-image :src="item" @tap="showBigImage(index)" mode="widthFix"></u-image>
						<!-- <view class="brief"> 这里是对图片的说明  </view> -->
					</view>
					<view class="u-text-center" v-if="salesAlbum.length === 0 || !salesAlbum[0]">
						<u-empty text="销售暂未有图册" mode="list"></u-empty>
					</view>
				</view>
			</view>
		</view>
		
		<view :class="isIPX?'chatRoom_tab_X':'chatRoom_tab'" >
			<view class="tableBar" >
				<view class="image">
					<image  src="/static/img/tabBarIcon/cardA.png" mode="aspectFit"></image>
				</view>
				
				<text  style="color:#00AA00">名片</text>
			</view>
		
			<view class="tableBar" @tap="tab_home">
				<view class="image">
					<image  src="/static/img/tabBarIcon/home.png" mode="aspectFit"></image>
				</view>
				
				<text> 企业介绍 </text>
			</view>
		
			<view class="tableBar" @tap="tab_product">
				<view class="image">
					<image  src="/static/img/tabBarIcon/product.png" mode="aspectFit"></image>
				</view>
				
				<text>产品介绍</text>
			</view>
			
			<view class="tableBar" @tap="tab_person">
				<view class="image">
					<image  src="/static/img/tabBarIcon/person.png" mode="aspectFit"></image>
				</view>
				
				<text>我的</text>
			</view>
		</view>
		
		<u-popup v-model="bottomPoup" z-index="10000000" height="260rpx" mode="bottom" border-radius="14">
			<view class="poup-container">
				<view class="item-container">
					<button open-type="share" @click="shareCard" class="hidden-btn"> </button>
					<view class="bottom-img-container">
						<image src="@/static/img/salesPersonImg/wexin.png" mode="widthFix"></image>
					</view>
					<view class="info">
						微信好友
					</view>
				</view>

				<view class="item-container" @click="createPostCard">
					<view class="bottom-img-container">
						<image src="@/static/img/salesPersonImg/card.png" mode="widthFix"></image>
					</view>
					<view class="info">
						名片海报
					</view>
				</view>
			</view>
		</u-popup>
		<u-popup v-model="tipGetUserInfoPoup" mode="bottom" :mask-close-able="false" :closeable="false" width="730" height="500"
			border-radius="20" z-index="1000000">
			<view class="self-poupCard " style=" ">
				<view class="u-p-10 text-bold text-center">
					未授权提醒：部分功能将不会开放
				</view>
				<view class="u-p-20 text-center">
					请确认授权
				</view>
				<view class="u-flex u-row-around u-p-20">
					<button class="cu-btn bg-gradual-red round " @click="cacelGetUserInfo"> 取消 </button>
					<button class="cu-btn bg-gradual-blue round " @click="getUserInfoBack"> 确认 </button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	let disp = require("@/utils/broadcast");
	var WebIM = require("@/utils/WebIM")["default"];
	import SalesManagerCard from '@/components/SalesManagerCard'
	import PersonalIcon from '@/components/PersonalIcon'
	import FixedChat from '@/components/FixedChat.vue'

	import {
		getCardSalesInfoById,
		addActiverecord,
		getClientPraise,
		addClientPraise,
		initWxLogin,
		loginChat,
		siginChat,
		getCardClientActiverecordByWeek,
		geCode,
		getWxUserInfo,
		updateUserInfo,
		getClientInfosByCardSalesId
	} from '@/services/services.js'

	import {
		initGetAlbum,
		getImgInfo,
		urlToLocalPath,
		previewImg,
		getSalesInfo,
		getCompanyInfo,
		getCompanyId,
		userAction,
		initBaseInfo,
		initInfo,
		getUserOpenId,
		getAudioTime,
		selfCallPhone
		
	} from '@/static/js/common.js'

	export default {
		data() {
			return {
				userType: 0,
				openId: -1,
				companyId: -1,
				salesId: -1,
				clientId: -1,
				equipmentType:'android',
				isIPX: false,
				unReadSpotNum: 0,
				arr: [],

				isGetUserInfo: true,
				tipGetUserInfoPoup: false,
				allUserList:[],
				avatarList: [],
				
				setTimeDo:null,						// 点赞 重置时间
				setTimePrivate:0,					// 点赞 防抖间隔
				userIsAppreciate: false,
				userActiveList: [],

				salesManagerInfo: {
					companyId: -1,
					createTime: "",
					deleted: -1,
					headPortrait: "",
					id: -1,
					jobTitle: "",
					likeNum: 0,
					readNum: 0,
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
				companyInfo: {
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
				salesAlbum: [],
				// 音频
				audioIsPlay: false,
				audioCanPlay: false,
				audioObj: '',
				audioSrc: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
				allTime: 0,
				initAllTime: 0,
				audioCurrentTime: 0,
				// type  区分 销售 和 普通用户, 0: 普通用户， 1: 销售
				type: 0,

				bottomPoup: false,

				// 画布所需
				myCanvasId: 'myCanvas',
				avatar: '',
				tempFilePath: '',
				smCtxW: 0,
				smCtxH: 0,
				ctx: null,
				pixeRatio: 0,
				getalbum: false,
				initCanvasRes: false,
				paintArr: [],
				
				voiceShowArr:[
					{statu:true,setTimeTodo:null},
					{statu:true,setTimeTodo:null},
					{statu:true,setTimeTodo:null},
					],
				setIntervalVocie:null,
				toChatId:null,
			}
		},

		watch: {

		},
		computed: {
			// 最近联系人 userId (环信  ID)
			// toChatId(){
			// 	if(!this.arr || !this.arr[0]){
			// 		return ''
			// 	}
			// 	return this.arr[0].username
			// },
			showAudioTime() {
				if (!this.audioIsPlay) {
					return parseInt(this.allTime)
				}
				if (this.allTime === 0) {
					return 0
				}
				return parseInt(this.allTime - this.audioCurrentTime)
			},
			// 画布的 宽度
			ctxWStr() {
				if (this.smCtxW) {
					return {
						'width': this.smCtxW * this.pixeRatio + 'px'
					}
				}
			},
			ctxHStr() {
				if (this.smCtxH) {
					return {
						'height': this.smCtxH * this.pixeRatio + 'px'
					}
				}
			},
		},
		onShareAppMessage(res) {
			this.bottomPoup = false

			if (res.from === 'button') { // 来自页面内分享按钮
				return {
					title: '您好，我是' + this.salesManagerInfo.salesName + ',一键保存(模拟分享链接)...',
					path: '/pages/salesManager/salesManager?companyId=' + this.companyId + '&salesId=' + this.salesId,
					success: (ress) => {
						console.log('分享 success')
						console.log(ress)
					},
					fail: (res) => {

						console.log(ress)
					}
				}
			} else {
				return {
					title: '您好，我是' + this.salesManagerInfo.salesName + ',一键保存(模拟公众号分享)...',
					path: '/pages/salesManager/salesManager?companyId=' + this.companyId,
					success: (ress) => {
						console.log('分享 success')
						console.log(ress)
					},
					fail: (res) => {
						console.log('分享 fail')
						console.log(ress)
					}
				}
			}

		},
		onShow() {
			this.getLocalSalesInfo()
			console.log(uni.getSystemInfoSync().platform)
			console.log('全局未读消息数')
			console.log(getApp().globalData.unReadMessageNum)
			this.setData({
				arr: this.getChatList(),
				unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum,
			});
			
			if (getApp().globalData.isIPX) {
			  this.setData({
			    isIPX: true
			  });
			  console.log('YYYYYYYYY isIPX >> true')
			}else{
				
				uni.getSystemInfo({
					success: function(res) {
						console.log('获取 systemInfo')
						console.log(res)
						// 根据 model 进行判断
						if (res.model && res.model.search("iPhone X") != -1) {
							this.setData({
							  isIPX: true
							});
						}
					}
				});
			}
		},
		async onLoad(options) {
			let me = this;
			uni.showLoading({
				title:'资源获取中...',
			})
			//监听解散群
			disp.on("em.invite.deleteGroup", function() {
				me.listGroups();
				me.getRoster();
				// me.getChatList()
				me.setData({
					arr: me.getChatList(),
					messageNum: getApp().globalData.saveFriendList.length
				});
			});
			
			//监听未读消息数
			disp.on("em.unreadspot", function(message) {
				console.log('监听未读消息')
				if(message){
					console.log(message)
				}
				// me.getChatList()
				me.setData({
					arr: me.getChatList(),
					unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp()
						.globalData.unReadMessageNum
				});
			}); //监听未读加群“通知”
			// 判断机型
			this.initEuipment()
			
			console.log('首页 options')
			console.log(options)
			let companyId = options.companyId
			let localCompanyId = uni.getStorageSync('companyId')
			if(localCompanyId){
				companyId = localCompanyId
			}
			
			if(!companyId){
				companyId = 9
			}
			
			console.log('公司ID')
			console.log(companyId)
			uni.setStorageSync('companyId',companyId)
			let salesId = options.salesId
			let localUserType = uni.getStorageSync('userType')
			if(localUserType!==1){
				const initRes = await initInfo(companyId,salesId,this)
			}
			
			const setBaseInfo = await initBaseInfo(this)
			this.onloadChatTodo()
			
			this.sayHello(10000)
			const getSalesInfoRes = await this.initSalesInfo(this.salesId)
			this.initCompanyInfo(this.companyId)
			this.initAudio()
			
			
			this.initSalesBinds(this.salesId)
			const getUserObjRes = await getWxUserInfo()
			// getWxUserInfo 静默去获取用户信息，status: true( 获取到用户信息 )； false（ 未获取到用户信息 ）
			console.log('getWxUserInfo res')
			console.log(getUserObjRes)
			if(getUserObjRes.status){
				const userInfo = getUserObjRes.data.userInfo
				this.afterGetUserInfo(userInfo)
			}else{
				console.log('执行  initUserInfo()')
				
				this.initUserInfo()
			}
			
			// 浏览名片
			this.userAppreciate()
			this.initUserToAppreciate()
			
			this.getUserActive(this.salesId)
			
			uni.hideLoading()
			// this.onloadChatTodo()
			// getApp().globalData.localChatInfo['user1'] = {'headPortrait':'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoIpjT9rusL9lkqKlvoicBChXBhS9vtogQM1gbUHkNLtFibGBas0ZqYUGicocxhUcg2iaMqwMnicF6yG4w/132',username:'徐飞' }
		},
		async created() {
			// this.isGetUserInfo = await this.judgeHasUserInfo()
			const initCanvasRes = await this.initCanvas(this.myCanvasId)
			this.initCanvasRes = initCanvasRes
			// 对于异步的处理  
			// 建议 不要用在 for 循环中（特别是 使用 async await )
		},
		mounted() {

		},
		methods: {
			//语音动画
			voiceNaimation(){
				// if(this.setIntervalVocie){
				// 	clearInterval(this.setIntervalVocie)
				// }
				this.voiceShowArr.forEach(item=>{
					item.statu = false
				})
				this.setIntervalVocie = setInterval(()=>{
					this.voiceShowArr[0].statu = true
					this.voiceShowArr[0].setTimeTodo = setTimeout(()=>{
						this.voiceShowArr[1].statu = true
					},250)
					this.voiceShowArr[1].setTimeTodo = setTimeout(()=>{
						this.voiceShowArr[2].statu = true
					},500)
					this.voiceShowArr[2].setTimeTodo = setTimeout(()=>{
						this.voiceShowArr.forEach(item=>{
							item.statu = false
						})
					},750)
				},1000)
			},
			voiceNaimationStop(){
				clearInterval(this.setIntervalVocie)
				this.voiceShowArr.forEach(item=>{
					item.statu = true
					if(item.setTimeTodo){
						clearTimeout(item.setTimeTodo)
					}
				})


			},
			showBigImage(index){
				uni.previewImage({
					current:index,
					urls:this.salesAlbum,
				})
			},
			async onloadNormalTodo(options) {

			},
			async onloadChatTodo() {
				console.log("获取到的 ID")
				console.log(this.clientId)
				console.log(this.salesId)
				let chatUser = 'jyl_'+'client_'+this.clientId
				let password = 'jyl2020'
				// userType === 1
				// 必然是 认证为销售，并且 salesId 存的是自己
				if(this.userType==1){
					chatUser = 'jyl_'+'sales_'+this.salesId
				}
				if(this.clientId==-1 || this.salesId == -1){
					console.log('获取 用户ID 错误')
					uni.showToast({
						title:'获取用户Id 错误',
						icon:'none'
					})
					return 
				}
				
				
				console.log('chatUser')
				console.log(chatUser)
				
				let loginChatRes = await loginChat(chatUser,password)
				console.log('登录环信返回')
				console.log(loginChatRes)
				
				if (!loginChatRes) {
					const siginChatRes = await siginChat(chatUser)
					console.log('注册环信账号 返回')
					console.log(siginChatRes)
					if (siginChatRes.data.data == 1) {
						const loginChatRes2 = await loginChat(chatUser,password)
						console.log('注册环信返回  loginChatRes2')
						console.log(loginChatRes2)
						if (loginChatRes2) {
							console.log('注册后 登录成功')
						}
					} else {
						console.log('注册后 ')
						return false
					}
				}
				console.log('未注册 登录成功')
				uni.setStorage({
					key: "myUsername",
					data: chatUser.toLocaleLowerCase()
				});
				let me = this;
				this.getRoster();
			},
			listGroups() {
				var me = this;
				return WebIM.conn.getGroup({
					limit: 50,
					success: function(res) {
						uni.setStorage({
							key: "listGroup",
							data: res.data
						});
						me.getChatList();
					},
					error: function(err) {
						console.log(err);
					}
				});
			},
			getRoster() {
				let me = this;
				let rosters = {
					success(roster) {
						var member = [];

						for (let i = 0; i < roster.length; i++) {
							if (roster[i].subscription == "both") {
								member.push(roster[i]);
							}
						}

						uni.setStorage({
							key: "member",
							data: member
						});
						me.setData({
							member: member
						});
						me.listGroups(); //if(!systemReady){

						disp.fire("em.main.ready"); //systemReady = true;
						//}
						// me.getChatList()
						me.setData({
							arr: me.getChatList(),
							unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp()
								.globalData.unReadMessageNum
						});
					},

					error(err) {
						console.log(err);
					}

				};
				WebIM.conn.getRoster(rosters);
			},
			//// 包含陌生人版本
			getChatList() {
				var myName = uni.getStorageSync("myUsername");
				
				console.log('salesManager222222222222')
				console.log(myName)
				
				var array = [];
				const me = this
				uni.getStorageInfo({
					success: function(res) {
						let storageKeys = res.keys
						let newChatMsgKeys = [];
						let historyChatMsgKeys = [];
						storageKeys.forEach((item) => {
							if (item.indexOf(myName) > -1 && item.indexOf('rendered_') == -1) {
								newChatMsgKeys.push(item)
							} else if (item.indexOf(myName) > -1 && item.indexOf('rendered_') > -1) {
								historyChatMsgKeys.push(item)
							}
						})

						cul.call(me, newChatMsgKeys, historyChatMsgKeys)
					}
				})

				function cul(newChatMsgKeys, historyChatMsgKeys) {
					let array = []
					let lastChatMsg;
					for (let i = 0; i < historyChatMsgKeys.length; i++) {
						let index = newChatMsgKeys.indexOf(historyChatMsgKeys[i].slice(9))
						if (index > -1) {
							let newChatMsgs = uni.getStorageSync(newChatMsgKeys[index]) || [];
							if (newChatMsgs.length) {
								lastChatMsg = newChatMsgs[newChatMsgs.length - 1];
								lastChatMsg.unReadCount = newChatMsgs.length;
								if (lastChatMsg.unReadCount > 99) {
									lastChatMsg.unReadCount = "99+";
								}
								let dateArr = lastChatMsg.time.split(' ')[0].split('-')
								let timeArr = lastChatMsg.time.split(' ')[1].split(':')
								let month = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2]
								lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`
								lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`
								newChatMsgKeys.splice(index, 1)
							} else {
								let historyChatMsgs = uni.getStorageSync(historyChatMsgKeys[i]);
								if (historyChatMsgs.length) {
									lastChatMsg = historyChatMsgs[historyChatMsgs.length - 1];
									let dateArr = lastChatMsg.time.split(' ')[0].split('-')
									let timeArr = lastChatMsg.time.split(' ')[1].split(':')
									let month = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2]
									lastChatMsg.dateTimeNum =
										`${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`
									lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`
								}
							}
						} else {
							let historyChatMsgs = uni.getStorageSync(historyChatMsgKeys[i]);
							if (historyChatMsgs.length) {
								lastChatMsg = historyChatMsgs[historyChatMsgs.length - 1];
								let dateArr = lastChatMsg.time.split(' ')[0].split('-')
								let timeArr = lastChatMsg.time.split(' ')[1].split(':')
								let month = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2]
								lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`
								lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`
							}

						}
						lastChatMsg && array.push(lastChatMsg)
					}
					console.log('c')

					console.log(newChatMsgKeys)
					for (let i = 0; i < newChatMsgKeys.length; i++) {

						let newChatMsgs = uni.getStorageSync(newChatMsgKeys[i]) || [];
						if (newChatMsgs.length) {
							lastChatMsg = newChatMsgs[newChatMsgs.length - 1];
							console.log("lastChatMsg----------")
							console.log(lastChatMsg)

							lastChatMsg.unReadCount = newChatMsgs.length;
							if (lastChatMsg.unReadCount > 99) {
								lastChatMsg.unReadCount = "99+";
							}
							let dateArr = lastChatMsg.time.split(' ')[0].split('-')
							let timeArr = lastChatMsg.time.split(' ')[1].split(':')
							let month = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2]
							lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`
							lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`
							array.push(lastChatMsg)
						}
					}

					array.sort((a, b) => {
						// 这里排序有 三种可能
						// 1. unReadCount  与 unReadCount     比时间
						// 2. unReadCount  与 无unReadCount  unReadCount 靠前
						// 3. 无unReadCount 与 无unReadCount  比时间
						let AhasUnRead = a.hasOwnProperty('unReadCount')
						let BhasUnRead = b.hasOwnProperty('unReadCount')
						// 有一个  无unReadCount属性
						if(AhasUnRead ^ BhasUnRead){
							if(AhasUnRead){
								return -1
							}else{
								return 1
							}
						}
						return b.dateTimeNum - a.dateTimeNum
					})
					this.setData({
						arr: array
					})
					
					console.log('finally arr ')
					console.log(me.arr)
					this.toChatId = me.arr[0]?me.arr[0].username:null
				}
			},


			async initCompanyId() {
				const companyRes = await getCompanyId()
				if (companyRes) {
					this.companyId = companyRes
				}
			},
			async initOpenId() {
				const openIdRes = await getUserOpenId()
				if (openIdRes) {
					this.openId = openIdRes
				}
			},

			// 进入页面打招呼
			sayHello(durationTime = 2000, title) {
				if (!title) {
					title = '您好，我是您的销售经理。有什么问题可以随时咨询我哦！'
				}
				uni.showToast({
					title: title,
					icon: 'none',
					duration: durationTime,
				})
			},
			// 判断 android ios
			initEuipment(){
				switch (uni.getSystemInfoSync().platform) {
					case 'android':
						this.equipmentType  = 'android'
						break;
					case 'ios':
						this.equipmentType  = 'ios'
						break;
					default:
						this.equipmentType  = 'android'
						break;
				}
			},
			
			// 初始化 画布图片信息
			inintPaintImgArr() {
				if (!this.salesManagerInfo.headPortrait) {
					uni.showToast({
						title: '获取销售头像信息出错',
						icon: 'none'
					})
				}

				if (!this.companyInfo.companyLogo) {
					uni.showToast({
						title: '获取公司Logo错误',
						icon: 'none'
					})
				}

				if (!this.salesManagerInfo.salesCard) {
					uni.showToast({
						title: '获取小程序二维码错误',
						icon: 'none'
					})
				}
				this.paintArr.push(this.salesManagerInfo.headPortrait)
				this.paintArr.push(this.companyInfo.companyLogo)
				this.paintArr.push(this.salesManagerInfo.salesCard)
				console.log('push finally')
				console.log(this.paintArr)
			},
			// 获取本地缓存中  isGetuserInfo  字段是否为 true，
			//	true : 表示用户已经授权过了，这次不做任何操作
			//	false: 表示用户未授权，提示授权，授权获取数据后进行本地缓存更改  用户基本数据的上传
			async initUserInfo() {
				try {
					const value = uni.getStorageSync('isGetUserInfo');
					console.log('local isGetUserInfo')
					console.log(value)
					if (value) {
						this.isGetUserInfo = true
						this.tipGetUserInfoPoup = false
						uni.setStorageSync('isGetUserInfo', true)
					} else {
						
						try {
						    uni.setStorageSync('isGetUserInfo', false);
						} catch (e) {
						    // error
						}
						
						this.isGetUserInfo = false
						this.tipGetUserInfoPoup = true
						console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
						console.log('this.tipGetUserInfoPoup')
						console.log(this.tipGetUserInfoPoup)
						// this.wxUserInfo()
					}
				} catch (e) {}
			},

			// 获取微信小程序用户基本信息 ( 需要用户授权 )
			async wxUserInfo() {
				console.log('未获取到本地缓存  isGetUserInfo')
				const getUserObjRes = await getWxUserInfo()
				if (getUserObjRes.status) {
					const userInfo = getUserObjRes.data.userInfo
					this.afterGetUserInfo(userInfo)
				} else {}
			},

			// afterGetUserInfo
			afterGetUserInfo(userInfoData) {
				this.isGetUserInfo = true
				uni.setStorageSync('isGetUserInfo', true)
				// uni.setStorage({
				// 	key: 'isGetUserInfo',
				// 	data: true
				// })
				this.tipGetUserInfoPoup = false
				console.log('success 获取到用户信息')
				console.log(userInfoData)
				this.upLoadUserInfo(userInfoData)
			},
			// 上传用户基本 数据
			async upLoadUserInfo(userInfoData) {
				const uploadUserObj = {
					id: this.clientId,
					clientName: userInfoData.nickName,
					clientHeadPortrait: userInfoData.avatarUrl,
					clientAddress: userInfoData.city + userInfoData.province
				}
				const upInfoRes = await updateUserInfo(uploadUserObj)
				if (upInfoRes.statusCode === 200) {
					console.log('修改数据成功')
				}
			},
			// 用户点击了 自定义授权弹窗的  "确定"
			getUserInfoBack() {
				// this.initUserInfo()
				// uni.getUserProfile({
				// 	desc:'获取昵称 头像',
				// 	success: function(infoRes) {
				// 		resData.status = true
				// 		resData.data = infoRes
				// 		if(infoRes.userInfo.nickName == '微信用户' && infoRes.userInfo.gender == 0){
				// 			console.log('获取到虚拟信息')
				// 		}else{
				// 			const userInfo = infoRes.userInfo
				// 			this.afterGetUserInfo(userInfo)
				// 			// getApp().globalData.localChatInfo['selfUserInfo'] = infoRes
				// 			uni.setStorageSync({
				// 				key: 'selfInfo',
				// 				data: infoRes
				// 			})
				// 			resolve(resData)
				// 		}
						
				// 	},
				// 	fail(res) {
				// 		console.log('wexin getUserInfo fail')
				// 		console.log(res)
				// 		resolve(resData)
				// 	}
				// });
				this.wxUserInfo()
			},
			// 用户点击了 自定义授权弹窗的  "取消"
			// 此时 用户应该有自己的 clientId
			async cacelGetUserInfo(){
				this.tipGetUserInfoPoup = false
				uni.setStorageSync('isGetUserInfo', false)
				let defaultAvatar = getApp().globalData.clientDefaultAvatarUrl
				let defaultNickname = getApp().globalData.clientDefaultAvatarNickname
				const uploadUserObj = {
					id: this.clientId,
					clientName: defaultNickname + this.clientId ,
					clientHeadPortrait: defaultAvatar,
					clientAddress: ''
				}
				const upInfoRes = await updateUserInfo(uploadUserObj)
				if (upInfoRes.statusCode === 200) {
					console.log('设置用户默认数据成功')
				}
			},
			// 初始化 用户活跃记录
			async getUserActive() {
				let dataObj = {
					saleId: this.salesId
				}
				console.log('dataObj')
				console.log(dataObj)
				const res = await getCardClientActiverecordByWeek(dataObj)
				
				console.log('res')
				console.log(res)
				
				if (res.statusCode === 200) {
					this.userActiveList = res.data.data
					console.log('this.userActiveList')
					console.log(this.userActiveList)
					
					getApp().globalData.salesInfo = this.userActiveList
					
					this.avatarList = this.getActiveAvatarList(this.userActiveList)
					console.log('avatarList')
					console.log(this.avatarList)
				}
			},
			getActiveAvatarList(userActiveList) {
				if (!userActiveList) {
					return []
				}

				let currentAvatarList = [];
				userActiveList.forEach((item, index) => {
					if (item.activeType === 0) {
						currentAvatarList.push(item)
					}
				})
				return currentAvatarList.splice(0, 5)
			},
			// 初始化 销售的信息
			initSalesInfo(salesId) {
				console.log('this.salesId')
				console.log(this.salesId)
				console.log(this.salesId)

				return new Promise(async (resolve, reject) => {
					let data = {
						id: salesId
					}
					let getSalesInfoRes = await getSalesInfo(data)
					console.log('获取销售信息返回....................')
					console.log(getSalesInfoRes)
					if (getSalesInfoRes && getSalesInfoRes.statu == 200) {
						this.salesManagerInfo = Object.assign({}, getSalesInfoRes.value)
						uni.setStorageSync('salesInfo',this.salesManagerInfo);
						this.salesAlbum = this.salesManagerInfo.photoAlbum.split(',')
						
						console.log('销售音频信息')
						uni.setStorageSync('salesAlbum', this.salesAlbum);
						let getAudioRes = getAudioTime(this.salesManagerInfo.salesVoiceIntroduce)
						console.log('获取销售音频 时长')
						console.log(getAudioRes)
						this.initAllTime = getAudioRes
						if(getAudioRes && getAudioRes.hasOwnProperty('statu') && !getAudioRes.statu ){
							this.initAllTime = 0
						}
						
						console.log(this.salesManagerInfo)
						console.log(this.initAllTime)
						console.log(this.allTime)
						console.log('销售图册')
						console.log(this.salesAlbum)
						
						
						resolve(true)
					} else {
						
						uni.showToast({
							title: getSalesInfoRes.msg,
							icon: 'none'
						})
						resolve(false)
					}
				})
			},
			// 从本地缓存中 获取销售数据
			getLocalSalesInfo(){
				try {
				    const salesValue = uni.getStorageSync('salesInfo');
				    if (salesValue) {
				        this.salesManagerInfo = salesValue
				    }
				} catch (e) {
				    // error
				}
				try {
				    const albumValue = uni.getStorageSync('salesAlbum');
				    if (albumValue) {
				        this.salesAlbum = albumValue
				    }
				} catch (e) {
				    // error
				}
			},
			// 初始化  公司信息
			async initCompanyInfo(companyId) {
				let data = {
					id: companyId
				}
				const getCompanyInfoRes = await getCompanyInfo(data)
				if (getCompanyInfoRes.statu === 200) {
					this.companyInfo = getCompanyInfoRes.value
					console.log('----- company  ---')
					console.log(getCompanyInfoRes.value)

					this.inintPaintImgArr()
				} else {
					uni.showToast({
						title: getCompanyInfoRes.msg,
						icon: 'none'
					})
				}

			},
			// 初始化 该用户 对该销售是否点赞
			async initUserToAppreciate() {
				let dataObj = {}
				dataObj.salesId = this.salesId
				dataObj.clientId = this.clientId
				const appreciateRes = await getClientPraise(dataObj)
				if (appreciateRes.statusCode === 200) {
					this.userIsAppreciate = appreciateRes.data.data
				} else {
					console.log('获取用户对销售点赞信息错误')
				}
			},
			// 对 点赞 进行防抖
			debounceAppreciate(){
				if(this.setTimePrivate===0){
					console.log('setTime _________ 0')
					this.appreciate()
				}
				this.setTimePrivate = 200
				if(this.setTimeDo){
					clearTimeout(this.setTimeDo)
				}
				this.setTimeDo = setTimeout(()=>{
					this.setTimePrivate = 0
				},300)
			},
			// 点赞
			async appreciate() {
				let dataObj = {}
				let initLikeNum = this.salesManagerInfo.likeNum
				let initUserIsAppreciate = this.userIsAppreciate

				if (this.userIsAppreciate) {
					console.log('用户已经点赞')
					this.salesManagerInfo.likeNum--
					this.userIsAppreciate = false
				} else {
					const res = userAction(this.clientId, this.salesId, 2)
					this.salesManagerInfo.likeNum++;
					this.userIsAppreciate = true
				}

				dataObj = {
					clientId: this.clientId,
					salesId: this.salesId
				}
				const userAppreciateRes = await addClientPraise(dataObj)
				// isAppreciateSuccess 表示 用户 点击 “点赞” 这个操作是否成功

				console.log('userAppreciateRes')
				console.log(userAppreciateRes)

				if (userAppreciateRes.statusCode === 200) {
					if (userAppreciateRes.data.code !== 0) {
						uni.showToast({
							title: userAppreciateRes.data.msg,
							icon: 'none'
						})
						this.salesManagerInfo.likeNum = initLikeNum
						this.userIsAppreciate = initUserIsAppreciate
					} else {
						if (userAppreciateRes.data.data) {
							this.salesManagerInfo.likeNum = userAppreciateRes.data.data
						} else {
							uni.showToast({
								title: userAppreciateRes.data.msg,
								icon: 'none'
							})
						}
					}
				}
			},


			// 用户浏览 名片
			async userAppreciate() {
				if (this.clientId && this.salesId) {
					const res = await userAction(this.clientId, this.salesId, 0)
					if (res.data.data === 1) {
						this.salesManagerInfo.readNum++;
					}
					
				}
			},

			initAudio() {
				let audioObj = uni.createInnerAudioContext();
				if(this.salesManagerInfo.salesVoiceIntroduce){
					let audioSrc = this.salesManagerInfo.salesVoiceIntroduce
					audioObj.src = audioSrc
				}
				this.audioObj = audioObj
				this.audioObj.onCanplay(() => {
					console.log('音频已经可以播放')
					this.audioCanPlay = true
				})
				this.audioObj.onError(() => {
					uni.showToast({
						title: '音频播放错误',
						icon: 'none'
					})
					})
			},
			
			// 播放音频
			playAudio() {
				uni.vibrateShort()
				console.log('音乐播放----------')
				if (!this.salesManagerInfo.salesVoiceIntroduce) {
					uni.showToast({
						title: '该销售暂未有音频',
						icon: 'none'
					})
					return
				}
				console.log('this.audioIsPlay')
				console.log(this.audioCanPlay)
				if (this.audioIsPlay) {
					console.log('音乐播放中')
					this.audioIsPlay = false
					this.audioObj.stop()
					this.voiceNaimationStop()
					
					return
				}else{
					this.voiceNaimation()
				}
				let innerAudioContext = this.audioObj
				console.log('this.audioCanPlay')
				console.log(this.audioCanPlay)
				if (this.audioCanPlay) {
					this.audioCurrentTime = innerAudioContext.currentTime
					innerAudioContext.play()
					this.audioIsPlay = true

					innerAudioContext.onPlay(() => {
						this.audioCurrentTime = innerAudioContext.currentTime
						innerAudioContext.onTimeUpdate(() => {
							this.allTime = innerAudioContext.duration
							this.audioCurrentTime = innerAudioContext.currentTime
							const restTime = this.allTime - this.audioCurrentTime
							if (restTime <= 0) {
								innerAudioContext.stop()
								this.audioIsPlay = false
							}
						})
					});
				}

				innerAudioContext.onError(() => {
					uni.showToast({
						title: '音频播放错误',
						icon: 'none'
					})
					this.audioIsPlay = false
					innerAudioContext.destroy()
				})
			},
			judgePhoneCall() {
				selfCallPhone(this.salesManagerInfo.salesPhone,this.equipmentType)
			},

			// 保存通讯录的 额外操作
			// 因为只是单方面的对 销售的信息操作，不涉及后台
			onMailList() {
				userAction(this.clientId, this.salesId, 3)
			},


			// 复制微信号
			copyWxId() {
				uni.setClipboardData({
					data: this.salesManagerInfo.salesWx,
					success: () => {
						uni.showToast({
							title: '成功复制微信号',
						})
						userAction(this.clientId, this.salesId, 4)
					},
					fail: () => {
						console.log('复制失败')
					}
				})
			},
			// 弹出 弹出框
			showBottomPoup() {
				this.bottomPoup = true
			},

			// 将要绘制的元素加入 绘制 数组
			addEleToList(ele, type, x, y) {
				if (type === 'img') {

				}
			},
			// 生成名片海报
			createPostCard() {
				userAction(this.clientId, this.salesId, 1)
				if (this.initCanvasRes) {
					this.canvansTodo(this.ctx, this.myCanvasId, this.pixeRatio, this.paintArr, this.smCtxW * this.pixeRatio, this.smCtxH * this.pixeRatio)
				}
			},
			// 点击分享名片
			shareCard() {
				userAction(this.clientId, this.salesId, 1)
			},
			// 画布所需
			initCanvas(canvansId) {
				return new Promise((resolve, reject) => {
					this.ctx = uni.createCanvasContext(canvansId)
					uni.getSystemInfo({
						success: (res) => {
							console.log(res)

							this.smCtxH = res.screenHeight * 0.5
							this.smCtxW = this.smCtxH * 0.8
							if (res.screenWidth < this.smCtxW) {
								this.smCtxW = res.screenWidth
							}
							this.pixeRatio = res.pixelRatio
							resolve(true)
						}
					})
				})
			},
			//  初始化 销售所绑定的 用户的信息
			async initSalesBinds(salesId) {
				let argObj = {}

				argObj.id = salesId
			
				let getRes = await getClientInfosByCardSalesId(argObj)
				
				
				if (getRes.statusCode === 200) {
					let allUserList = getRes.data.data
					this.allUserList = getRes.data.data
					
					if(allUserList && allUserList.length > 0){
						allUserList.forEach(item=>{
							console.log('FFFFFFFFFFf')
							console.log(item)
							let chatName = 'jyl_' + 'client_' + item.id 
							getApp().globalData.localChatInfo[chatName] = item
						})
					}
					
				
				}
				
			},
			// 绘制文字
			paintText(ctx, pixelRatio, text, color, fontSize, x, y) {
				ctx.setFillStyle(color)
				ctx.setFontSize(fontSize * pixelRatio)
				ctx.fillText(text, x * pixelRatio, y * pixelRatio)
			},
			// 绘制 换行文字
			paintLogText(ctx, text, color, fontSize, x, y, lineStep, limitLength) {
				if (!limitLength) {
					limitLength = 8
				}
				if (!lineStep) {
					lineStep = 17
				}
				let textLengthArr = []
				textLengthArr.length = Math.ceil(textLength / limitLength)

				const textLength = text.length
				if (textLength > limitLength) {
					for (let i = 0; i < textLengthArr.length; i++) {
						let str2 = text.subString(limitLength * i, limitLength * (i + 1))
						textLengthArr[i] = str2
						this.paintText(ctx, str2, color, fontSize, x, y + (addStep * i * this.pixeRatio))
					}
				} else {
					this.paintText(ctx, text, color, fontSize, x, y)
				}
			},

			// 绘制 纯色背景
			paintBgColor(ctx, color, canvansW, canvansH) {
				ctx.rect(0, 0, canvansW, canvansH);
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
				if (2 * radius > width || 2 * radius > height) {
					return false;
				}

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
			async arrangPaintList(paintArr) {
				
				console.log('---------------paintArr---------------')
				console.log(paintArr)
				
				if (this.paintArr[0].hasOwnProperty('content')) {
					return this.paintArr
				}
				for (let i = 0; i < paintArr.length; i++) {
					const res = await getImgInfo(paintArr[i])
					const obj = {}
					obj.content = res.path
					obj.width = res.width
					obj.height = res.height
					paintArr[i] = obj
					if (i === paintArr.length - 1) {
						console.log('finally')
						console.log(paintArr)
						return paintArr
					}
				}
			},

			// 画布绘制图像
			canvasDrawImage(ctx, pixelRatio, imgObj, dx, dy, dWidth, dHeight, lager = 1) {
				dx = parseInt(dx * pixelRatio)
				dy = parseInt(dy * pixelRatio)

				dWidth = parseInt(dWidth * pixelRatio)
				dHeight = parseInt(dHeight * pixelRatio)

				let sx = 0
				let sy = 0
				let sWidth = dWidth
				let sHeight = dHeight
				ctx.drawImage(imgObj.content, dx, dy, dWidth, dHeight)
			},
			async canvansTodo(ctx, canvasId, pixelRatio, paintArr, finalW, finalH) {

				let isCompleteImgArr = true
				paintArr.some(item => {
					if (!item) {
						isCompleteImgArr = false
						return true
					}
				})
				if (!isCompleteImgArr) {
					uni.showToast({
						title: '销售信息残缺，不能生成海报',
						icon: 'none'
					})
					return
				}
				this.paintBgColor(ctx, '#FFFFFF', finalW, finalH)

				uni.showLoading({
					title: '名片海报生成中',
					mask: true,
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

				let dWidth = 0
				let dHeight = 0
				// if(readyArr[0].width>readyArr[0].height){
				// 	let WRaceH = readyArr[0].width / readyArr[0].height
				// 	dHeight = startY  + addYStepsm *5 + (fontSize * 2 + 20)
				// 	dWidth = dHeight * 0.5
				// }else{
				// 	let HraceW = readyArr[0].height / readyArr[0].width
				// 	dWidth = this.smCtxW / 10 * 3
				// 	dHeight = HraceW * dWidth
				// }

				let HraceW = readyArr[0].height / readyArr[0].width
				console.log('------NNNNNNNNNNNNNN----------')
				console.log( HraceW )
				dWidth = this.smCtxW / 10 * 3
				dHeight = HraceW * dWidth


				let roundHeight = (dHeight + 20) * pixelRatio
				let fontListHeight = (startY + addYStepsm * 5)
				if (fontListHeight > dHeight) {
					console.log('888888888888')
					roundHeight = fontListHeight
				}

				this.fillRoundRect(ctx, (startX - 10) * pixelRatio, (startY - 10) * pixelRatio, (this.smCtxW / 10 * 8 + 20) * pixelRatio, roundHeight, 10 * pixelRatio, '#efefef')


				// if(readyArr[0].width>readyArr[0].height){
				// 	let clipAvatarStartX = (readyArr[0].width - readyArr[0].height / 2)
				// 	let clipAvatarStartY = 0
				// 	let clipAvatarSWidth = startY  + addYStepsm *5 + (fontSize * 2 + 20) / 2
				// 	let clipAvatarSHeight = startY  + addYStepsm *5 + (fontSize * 2 + 20)
				// 	let finaImgWidth = startY  + addYStepsm *5 + (fontSize * 2 + 20) / 2
				// 	let finaImgHeight = startY  + addYStepsm *5 + (fontSize * 2 + 20)
				// 	ctx.drawImage(readyArr[0].content,clipAvatarStartX,clipAvatarStartY,clipAvatarSWidth,clipAvatarSHeight,startX,(startY - 0.5),finaImgWidth,finaImgHeight)
				// }else{
				// 	this.canvasDrawImage(ctx,pixelRatio,readyArr[0],startX,(startY - 0.5) ,dWidth,dHeight)
				// }
				this.canvasDrawImage(ctx, pixelRatio, readyArr[0], startX, (startY - 0.5), dWidth, dHeight)


				this.paintText(ctx, pixelRatio, this.salesManagerInfo.salesName, '#000', fontSize, (startX + dWidth +
					addXStep), startY + addYStepsm)
				this.paintText(ctx, pixelRatio, this.salesManagerInfo.jobTitle, '#000', fontSize, (startX + dWidth +
					addXStep), startY + addYStepsm * 2)

				this.canvasDrawImage(ctx, pixelRatio, readyArr[1], (startX + dWidth + addXStep + fontSize * 12),
				startY + addYStepsm - iconHeight / 2, iconWidth, iconHeight)


				this.paintText(ctx, pixelRatio, '电话：', '#000', fontSize, (startX + dWidth + addXStep), startY +
					addYStepsm * 3)
				this.paintText(ctx, pixelRatio, this.salesManagerInfo.salesPhone, '#000', fontSize, (startX + dWidth +
					addXStep + fontSize * 3), startY + addYStepsm * 3)

				this.paintText(ctx, pixelRatio, '公司：', '#000', fontSize, (startX + dWidth + addXStep), startY +
					addYStepsm * 4)
				this.paintText(ctx, pixelRatio, this.companyInfo.companyName, '#000', fontSize, (startX + dWidth +
					addXStep + fontSize * 3), startY + addYStepsm * 4)

				this.paintText(ctx, pixelRatio, '邮箱：', '#000', fontSize, (startX + dWidth + addXStep), startY +
					addYStepsm * 5)
				this.paintText(ctx, pixelRatio, this.salesManagerInfo.salesMailbox, '#000', fontSize, (startX +
					dWidth + addXStep + fontSize * 3), startY + addYStepsm * 5)

				this.paintText(ctx, pixelRatio, '您好', '#000', fontSize * 1.2, (startX), startY + addYStep +
					roundHeight / pixelRatio)
				this.paintText(ctx, pixelRatio, '我是' + this.companyInfo.companyName + '的销售经理' + this.salesManagerInfo
					.salesName, '#000', fontSize * 1.2, (startX), startY + addYStep * 1.5 + roundHeight /
					pixelRatio)
				this.paintText(ctx, pixelRatio, '这是我的名片，请保存', '#000', fontSize * 1.2, (startX), startY + addYStep * 2 +
					roundHeight / pixelRatio)
				this.paintText(ctx, pixelRatio, '谢谢！', '#000', fontSize * 1.2, (startX), startY + addYStep * 2.5 +
					roundHeight / pixelRatio)

				this.paintText(ctx, pixelRatio, '长按识别二维码收下名片', '#000', fontSize, (startX), this.smCtxH - 60)
				this.canvasDrawImage(ctx, pixelRatio, readyArr[2], this.smCtxW - iconWidth * 6, this.smCtxH - 60 -
					iconWidth * 2.5, iconWidth * 5, iconHeight * 5)
				// ctx.drawImage(readyArr[1].content,)

				ctx.draw()
				setTimeout(async () => {
					uni.hideLoading()
					const resTempFile = await this.canvansToFile(canvasId, finalW, finalH)
					this.saveToAlbum(resTempFile)
					previewImg(resTempFile)
					console.log(resTempFile)
				}, 1000)
			},
			// 图片存入 本地相册
			saveToAlbum(tempFilePath) {
				uni.saveImageToPhotosAlbum({
					filePath: tempFilePath,
					success: (res) => {
						uni.showToast({
							title: '存入相册成功'
						})
					},
					fail: (res) => {
						uni.showToast({
							title: '存入相册失败',
							icon: 'none'
						})
					}
				})
			},
			// 画布生成本地路径
			canvansToFile(canvansId, clipW, clipH) {
				return new Promise(function(resolve, reject) {
					uni.canvasToTempFilePath({
						x: 0,
						y: 0,
						destWidth: clipW,
						destHeight: clipH,
						canvasId: canvansId,
						success: (res) => {
							resolve(res.tempFilePath)
						},
						fail: (res) => {
							resolve(res.tempFilePath)
						}
					})
				})
			},
			// tableBar
			tab_home() {
			  uni.redirectTo({
				url: "/pageScond/index/index"
			  });
			},
			tab_product() {
			  uni.redirectTo({
				url: "/pageScond/products/products"
			  });
			},
			tab_person() {
			  uni.redirectTo({
				url: "/pageScond/personal/personal"
			  });
			}
			
			
		},
		components: {
			SalesManagerCard,
			PersonalIcon,
			FixedChat
		}
	}
</script>

<style lang="scss" scoped>
	.voice-container{
		position: relative;
		display: flex;
		align-items: center;
		width: 21rpx;
		height: 30rpx;
		.voice-item{
			position: absolute;
			left: 0;
			top: 0;
			width: 21rpx;
			height: 30rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		
		
	}
	

	
	
	.play-line {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 40rpx;
		background-color: #FFFFFF;

	}

	.self-round {
		position: relative;
		width: 50rpx;
		height: 50rpx;
		border: 4rpx solid #4CD964;
		border-radius: 50%;
		text-align: center;

		.play {

			line-height: 42rpx;
			/* width: 1em;
		height: 1em; */
			margin: auto;
		}
	}

	.card-container {
		position: relative;
		// background-color: #6FC8F1;
		background-color: #efefef;
		padding: 60rpx 40rpx 5rpx;
		
		.absolute-bg{
			position: absolute;
			top: -30rpx;
			left: 0;
			width: 100%;
			height: 300rpx;
			background-color: #6FC8F1;
		}
	}

	.tag-shadow {

		box-shadow: 0px 2px 4px rgba(136, 136, 136, 0.5);
		opacity: 1;
	}

	/*  精彩图册  */
	.salesImgList-img-container {
		position: relative;
		width: 710rpx;
		/* 	height: 380rpx; */
		padding: 20rpx;
		border-radius: 10rpx;
		margin: 20rpx auto;
		background-color: #FFF;

		image {
			width: 100%;
			height: 100%;
			border-radius: 10rpx;
		}

		.brief {
			position: absolute;
			bottom: 30rpx;
			left: 30rpx;
			color: #FFFFFF;
		}
	}



	.tag-list {

		display: flex;
		justify-content: space-around;
		padding: 30rpx 20rpx;
		width: 100%;
		background-color: #FFFFFF;
		font-size: 40rpx;

		.self-text {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			height: 3em;
			padding: 20rpx 30rpx;
			font-size: 23rpx;

			.icon-container {
				height: 1.5em;
				width: 1.8em;
				padding-right: .3em;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.sm-title {
				font-size: .7em;
			}
		}
	}




	// .card-head {
	// 	display: flex;
	// 	padding: 20rpx;

	// 	align-items: center;
	// 	background-color: $self-color-them;
	// 	font-weight: bold;
	// 	.icon-container {
	// 		width: 2em;
	// 		height: 2em;
	// 		margin-right: 16rpx;

	// 		image {
	// 			width: 100%;
	// 			height: 100%;
	// 		}
	// 	}

	// }

	.chat-container {
		display: flex;
		align-items: center;

		.arrow {
			position: relative;
			left: .5em;
			width: 1em;
		}

		.main-text {
			display: flex;
			align-items: center;
			min-height: 2em;
			padding: 10rpx 20rpx;
			border-radius: 10rpx;
			background-color: #81F881;

			.icon {
				width: 1.5em;
				height: 1.5em;

			}
		}
	}


	.poup-container {
		display: flex;
		justify-content: space-around;
		padding: 20rpx;

		.item-container {
			position: relative;
			width: 220rpx;
			height: 220rpx;
			padding: 20rpx;
			overflow: hidden;

			.hidden-btn {
				position: absolute;
				z-index: 100;
				top: -20%;
				left: -20%;
				width: 140%;
				height: 140%;
				background-color: rgba(255, 255, 255, 0);
			}

			.bottom-img-container {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 120rpx;
				height: 120rpx;
				// padding: 20rpx;
				// border-radius: 50%;
				margin: auto;

				image {
					width: 120rpx;
					height: 120rpx;
				}
			}


			.info {
				width: 100%;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				font-weight: bold;
			}

		}

	}


	// 画布样式
	.bigCanvas-container {
		position: relative;
		height: 0rpx;
		overflow: hidden;
	}

	.canvasW {
		position: absolute;
		top: 10000000rpx;
		width: 100%;
	}

	.self-avatar-list {
		display: flex;
		align-items: center;

		.self-avatar-item {
			width: 60rpx;
			height: 60rpx;
			padding: 5rpx;
		}
	}

	image {
		width: 100%;
		height: 100%;
	}

	.btn-hover {
		position: relative;
		top: 5rpx;
		background-color: #efefef;
		box-shadow: 0px 2px 4px rgba(136, 136, 136, 0.5) inset;
	}
</style>
