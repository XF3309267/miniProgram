<template>
	<view class="main">
		<view class="main">
		
			
			<!-- :style="{top: InputBottom!==0?(InputBottom+ 25 +'px'):'0px'}" -->
			<view :class="['chat-head','shadow']" v-if="userType == 0">
				
				<view class="head-item" @tap="judgePhoneCall">
					<view class="img-container">
						<image src="@/static/img/chatImg/call.png" mode="widthFix"></image>
					</view>
					<text> 打电话 </text>
				</view>
				<view class="head-item" @tap="copyWxId">
					<view class="img-container">
						<image src="@/static/img/chatImg/wexin.png" mode="widthFix"></image>
					</view>
					<text> 加好友 </text>
				</view>
				<view class="head-item" @tap="toSalesCard">
					<view class="img-container">
						<image src="@/static/img/chatImg/card.png" mode="widthFix"></image>
					</view>
					<text> 查看名片 </text>
				</view>
			</view>
			<!-- :style="{top: InputBottom!==0?(InputBottom+ 25 +'px'):'0px'}" -->
			<view :class="['chat-head','shadow']" v-if="userType == 1">
				<view class="head-item" @tap="judgePhoneCall">
					<view class="img-container">
						<image src="@/static/img/chatImg/call.png" mode="widthFix"></image>
					</view>
					<text> 打电话 </text>
				</view>
				<view class="head-item" @tap="copyWxId">
					<view class="img-container">
						<image src="@/static/img/chatImg/wexin.png" mode="widthFix"></image>
					</view>
					<text> 加好友 </text>
				</view>

				<view class="head-item" @tap="toSetCustomerLabel">
					<view class="img-container">
						<image src="@/static/img/chatImg/remarks.png" mode="widthFix"></image>
					</view>
					<text> 备注/标签 </text>
				</view>
				<view class="head-item" @tap="toCustomerRecord">
					<view class="img-container">
						<image src="@/static/img/chatImg/record.png" mode="widthFix"></image>
					</view>
					<text> 用户追踪 </text>
				</view>
			</view> 
<!-- 			<chatSuitAudio ref="chatSuitAudio" :username="username" :chatType="chatType" @newAudioMsg="saveSendMsg">
			</chatSuitAudio> -->
			<chatMsglist ref="chatMsglist" :username="username"  
			:selfInfo="selfInfo"  :yourInfo="yourInfo" :InputBottom="InputBottom" @msglistTap="normalScroll" @clickMsg="clickMsg" 
			id="chat-msglist"
			:isAudioShowBottom="isAudioShowBottom"
			:isShowBottomH="isShowBottomH"
			:isEmojiShowBottom="isEmojiShowBottom"
			>
		
			</chatMsglist>
		</view>

		<chatInputbar ref="chatInputbar" :username="username" :chatType="chatType" :InputBottom="InputBottom"   @setInputBottom="setInputBottom"
			@newTextMsg="saveSendMsg" @newImageMsg="saveSendMsg" @newLocationMsg="saveSendMsg"
			@newVideoMsg="saveSendMsg" @tapSendAudio="toggleRecordModalOpen" @inputFocused="shortScroll"
			@inputBlured="normalScroll" @makeVideoCall="onMakeVideoCall" @makeAudioCall="onMakeAudioCall"
			@cancelRecord="cancelRecord" 
			:isAudioShowBottom="isAudioShowBottom" @setIsShowBottomH="setIsShowBottomH"
			:isShowBottomH="isShowBottomH"	 @setIsAudioShowBottom="setIsAudioShowBottom"
			:isEmojiShowBottom="isEmojiShowBottom" @setIsEmojiShowBottomH="setIsEmojiShowBottomH"
			v-show="!showEmediaInvite"></chatInputbar>
	
		<chatEmediaInvite :username="username" :action="action" @onStartConfr="onStartConfr" @goBack="onGoBack" v-if="showEmediaInvite" />
	</view>

</template>

<script>
	let msgStorage = require("./msgstorage");
	let msgType = require("./msgtype");
	import chatMsglist from "./msglist/msglist.vue";
	import chatInputbar from "./inputbar/inputbar";
	import chatSuitAudio from "./inputbar/suit/audio/audio";
	import chatEmediaInvite from "./emediaInvite/emediaInvite.vue"
	import chatMultiEmedia from "./multiemedia/index.nvue"
	
	
	import {selfCallPhone} from '@/static/js/common.js'
	export default {
		data() {
			return {
				__comps__: {
					msglist: null,
					inputbar: null,
					audio: null,
				},
				inputbarVisible: 'block',
				action: null,
				pubUrl: '',
				subUrl: '',
				showEmedia: false,
				showmultiEmedia: false,
				showEmediaInvite: false,
				emediaAction: null,
				multiEmediaVisible: 'block',
				confrId: '',
				groupId: '',
				confrMember: [],

				selfInfo: null,
				yourInfo: null,
				userType: -1,
				userId: -1,
				InputBottom: 0,
				scrollViewTop:0,
				isShowBottomH:false,
				isAudioShowBottom:false,
				isEmojiShowBottom:false,
				equipmentType:'android'
			};
		},

		components: {
			chatMsglist,
			chatInputbar,
			chatSuitAudio,
			chatEmediaInvite,
			chatMultiEmedia
		},
		props: {
			username: {
				type: Object,
				default: () => ({}),
			},
			chatType: {
				type: String,
				default: msgType.chatType.SINGLE_CHAT,
			},
		},
		watch: {
			username() {
				if (this.username) {

					this.initUserId()
					this.getSelfInfo()
					this.getYouInfo()
				}
			}
		},
		computed: {
			computedUserName() {
				return this.username
			}
		},

		// created() {
		//   uni.$on("saveSendMsg", (data) => {
		//     this.saveSendMsg(data);
		//   });
		// },
		// beforeDestroy() {
		//   uni.$off("saveSendMsg");
		// },

		beforeMount() {},

		mounted() {
			// this.$data.__comps__.inputbar = this.selectComponent("#chat-inputbar");
			// this.$data.__comps__.msglist = this.selectComponent("#chat-msglist");
			// this.$data.__comps__.audio = this.selectComponent("#chat-suit-audio");

			// this.username = uni.username;
			uni.$on('createConfrSuccess', this.onCreateConfrSuccess)
			this.initEuipment()
			this.initUserType()
			
		},

		moved() {},

		destroyed() {},

		methods: {
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
			setIsEmojiShowBottomH(bool){
				this.isEmojiShowBottom = bool
			},
			setIsShowBottomH(bool){
				this.isShowBottomH = bool
			},
			setIsAudioShowBottom(bool){
				this.isAudioShowBottom = bool
			},
			toggleRecordModalOpen() {
				this.$refs.chatSuitAudio.toggleRecordModalOpen();
			},
			cancelRecord(){
				this.$refs.chatSuitAudio.toggleRecordModalClose()
			},
			setScrollViewTop(num){
				
				this.scrollViewTop = num
		
			},
			setToView(num){
				this.toView = num
			},
			initUserId() {
				let userId = uni.getStorageSync('clientId')
				if (userId && userId !== -1) {
					this.userId = userId
				} else {
					uni.showToast({
						title: '本地缓存中获取 clienId error',
						icon: 'none'
					})
				}
			},
			initUserType() {
				let userType = uni.getStorageSync('userType')
				console.log('userType')
				console.log(userType)
				if (userType == 0 || userType == 1) {
					this.userType = userType
				}
			},
			// 获取自己的信息
			getSelfInfo() {
				let myUsername = uni.getStorageSync('myUsername')

				if (!myUsername) {
					return
				}

				let selfInfo = getApp().globalData.localChatInfo[myUsername]

				if (!selfInfo) {
					let localSelfInfo = uni.getStorageSync('selfInfo')
					if (localSelfInfo) {
						selfInfo = localSelfInfo
					} else {
						// selfInfo['username'] = 0
						// selfInfo['headPortrait'] = 0
					}
				}
				this.selfInfo = selfInfo
			},
			getYouInfo() {
				let yourname = this.username.your

				if (!yourname) {
					return
				}

				let userType = uni.getStorageSync('userType')
				let yourInfo = getApp().globalData.localChatInfo[yourname]


				if (!yourInfo && userType == 0) {
					let salesInfo = uni.getStorageSync('salesInfo')
					console.log('-************----')
					console.log(salesInfo)
					if (salesInfo) {
						yourInfo = salesInfo
					}
				}
				if (userType == 0) {
					yourInfo['username'] = yourInfo.salesName
					yourInfo['phone'] = yourInfo.salesPhone
					yourInfo['wxId'] = yourInfo.salesWx
				} else {
					console.log('youyouyou')
					console.log(yourInfo)

					// yourInfo['phone'] = yourInfo.clientPhone
					// yourInfo['wxId'] = yourInfo.clientWx
				}
				this.yourInfo = yourInfo
				console.log('-----')
				console.log(yourInfo)
				// if (!this.yourInfo) {
				// 	uni.showToast({
				// 		title: '未获取到Your信息',
				// 		icon: 'none'
				// 	})
				// 	return
				// }


			},
			// 前往 销售名片页
			toSalesCard() {
				uni.navigateTo({
					url: '/pages/salesManager/salesManager'
				})
			},
			// 前往设置 用户标签页
			toSetCustomerLabel() {
				uni.navigateTo({
					url: '/pageSalesManager/setCustomerLabel/setCustomerLabel?customerId=' + this.userId
				})
			},
			// 用户追踪情况页面
			toCustomerRecord(customerId) {
				uni.navigateTo({
					url: '/pageSalesManager/customerRecord/customerRecord?customerId=' + this.userId
				})
			},
			judgePhoneCall() {
				selfCallPhone(this.yourInfo.phone)
			},
			// 复制微信号
			copyWxId() {
				if (!this.yourInfo.wxId) {
					uni.showToast({
						title: '该用户暂无微信号',
						icon: 'none'
					})
					return false
				}

				uni.setClipboardData({
					data: this.yourInfo.wxId,
					success: () => {
						uni.showToast({
							title: '成功复制微信号',
						})
						// userAction(this.clientId,this.salesId,4)
					},
					fail: () => {
						console.log('复制失败')
					}
				})
			},

			setInputBottom(num) {
				this.InputBottom = num
			},

			normalScroll() {
				// this.$data.__comps__.msglist.normalScroll();

				// this.$data.__comps__.inputbar.cancelEmoji();

				this.$refs.chatMsglist.normalScroll();
				this.$refs.chatInputbar.cancelEmoji();
				// this.cancelRecord()
				this.$refs.chatInputbar.cancelRecord()
				this.isAudioShowBottom = false
				this.isShowBottomH = false
			},
			clickMsg(msg) {
				this.$emit('onClickInviteMsg', msg)
				console.log('点击消息上一级', msg)

			},
			shortScroll() {
				// this.$data.__comps__.msglist.shortScroll();
				console.log(' shortScroll')
				console.log('----------------')
				this.$refs.chatMsglist.shortScroll();
			},

			saveSendMsg(evt) {
				msgStorage.saveMsg(evt.msg, evt.type);

				// this.$data.__comps__.inputbar.cancelEmoji();
				this.$refs.chatInputbar.cancelEmoji();
			},

			getMore() {
				// this.selectComponent("#chat-msglist").$vm.getHistoryMsg()
				this.$refs.chatMsglist.getHistoryMsg();
			},
			onMakeVideoCall() {
				this.setData({
					showEmediaInvite: true,
					inputbarVisible: 'none',
					action: 'create'
					//showEmedia: true
				})
				console.log(this.showEmediaInvite)
			},
			onStartConfr(data) {
				console.log('发起邀请的回调', data)
				this.setData({
					showEmediaInvite: false,
					showmultiEmedia: true,
					multiEmediaVisible: 'block',
					inputbarVisible: 'none',
					confrMember: data.confrMember,
					emediaAction: {
						action: 'create'
					}
				})

				// if(data.action == 'invite'){
				// 	console.log('发出邀请')
				// 	this.sendInviteMsg(data.confrMember, getApp().globalData.confrId)
				// }
				this.$emit('onMakeVideoCall', {
					confrMember: data.confrMember,
					groupId: this.username.groupId
				})
			},
			onCreateConfrSuccess(data) {
				console.log('创建会成功议回调', data)
				this.setData({
					confrId: data.confrId
				})
				getApp().globalData.confrId = data.confrId
				this.sendInviteMsg(this.confrMember, data.confrId, data)
			},
			onGoBack() {
				this.setData({
					showEmediaInvite: false,
					showmultiEmedia: true,
					multiEmediaVisible: 'block',
					inputbarVisible: 'none',
					confrMember: []
				})
			},

			onInviteMember(e) {
				let username = this.username;
				if (!this.username.groupId) {
					username.groupId = e.detail
				}

				this.setData({
					action: 'invite',
					showEmediaInvite: true,
					inputbarVisible: 'none',
					//showmultiEmedia: false
					multiEmediaVisible: 'none',
					// username
				})
			},
			onMakeAudioCall() {
				this.setData({
					showEmediaInvite: true,
					showmultiEmedia: false,
					inputbarVisible: 'none'
				})
			},
			onClickInviteMsg(data) {
				console.log('收到邀请消息')
				console.log(data)
				let confrId = data.conferenceId
				let msg_extension = typeof(data.msg_extension) == 'string' ? JSON.parse(data.msg_extension) : data
					.msg_extension
				let password = data.password || ''
				this.setData({
					emediaAction: {
						action: 'join',
						confrId: confrId,
						password: password,
						roomName: data.roomName || ''
					},
					showEmediaInvite: false,
					showmultiEmedia: true,
					inputbarVisible: 'none',
					groupId: msg_extension.group_id
					// username: {
					// 	groupId: msg_extension.group_id
					// }
				})
			},
			onHangup() {
				this.setData({
					showEmediaInvite: false,
					showmultiEmedia: false,
					inputbarVisible: 'block'
				})
				getApp().globalData.confrId = ''
			},
			sendInviteMsg(members, confrId, data) {
				console.log("%c members", "background: green")
				console.log(members)
				console.log('进入发邀请的函数', members)
				console.log('this.username.groupId----', this.username.groupId)

				console.log('confrId', confrId)
				console.log('data', data)
				members && members.forEach((value) => {
					let id = uni.WebIM.conn.getUniqueId();
					let msg = new uni.WebIM.message('txt', id);

					msg.set({
						msg: wx.WebIM.conn.context.userId + ' invite you to video call',
						from: wx.WebIM.conn.context.userId,
						to: value,
						roomType: false,
						chatType: 'singleChat',
						ext: {
							msg_extension: JSON.stringify({
								inviter: wx.WebIM.conn.context.userId,
								group_id: this.username.groupId
							}),
							// roomName: data&&data.roomName || '',
							password: '123456',
							conferenceId: getApp().globalData.confrId
						},
						success(id, serverMsgId) {
							console.log('发送邀请消息成功 to: ' + value)
							//disp.fire('em.chat.sendSuccess', id, me.data.userMessage);
						},
						fail(id, serverMsgId) {
							console.log('发送邀请消息失败了')
						}
					});

					// if(this.chatType == msgType.chatType.CHAT_ROOM){
					// 	msg.setGroup("groupchat");
					// }
					console.log('发送邀请', msg.body)
					uni.WebIM.conn.send(msg.body);

				})
			},
		},
	};
</script>
<style>
	@import "./chat.css";

	.chat-head {
		position: fixed;
		z-index: 1000;
		top: 0;
		left: 0;
		display: flex;
		justify-content: space-around;
		height: 120rpx;
		width: 750rpx;
		padding: 20rpx 30rpx;
		background-color: #FFFFFF;
		font-size: .8em;
	}

	.chat-head .head-item {
		width: 100rpx;
		text-align: center;
	}

	.head-item .img-container {
		width: 50rpx;
		height: 55rpx;
		padding-bottom: 6rpx;
		margin: auto;
	}

	.img-container image {
		width: 100%;
		height: 100%;

	}
</style>
