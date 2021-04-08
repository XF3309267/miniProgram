<script>
	import Vue from 'vue'


	// require("sdk/libs/strophe");
	let WebIM = wx.WebIM = require("./utils/WebIM")["default"];
	let msgStorage = require("./comps/chat/msgstorage");
	let msgType = require("./comps/chat/msgtype");
	let disp = require("./utils/broadcast");
	let logout = false;
	// let emedia = uni.emedia = require("./emediaSDK/webrtc/src/entry") 
	let emedia = uni.emedia = require("./emediaSDK/emedia_for_miniProgram")
	emedia.config({
		useUniappPlugin: true
	})

	function ack(receiveMsg) {
		// 处理未读消息回执
		var bodyId = receiveMsg.id; // 需要发送已读回执的消息id
		var ackMsg = new WebIM.message("read", WebIM.conn.getUniqueId());
		ackMsg.set({
			id: bodyId,
			to: receiveMsg.from
		});
		WebIM.conn.send(ackMsg.body);
	}

	function onMessageError(err) {
		if (err.type === "error") {
			uni.showToast({
				title: err.errorText
			});
			return false;
		}
		return true;
	}

	function getCurrentRoute() {
		let pages = getCurrentPages();
		if (pages.length > 0) {
			let currentPage = pages[pages.length - 1];
			return currentPage.route;
		}
		return '/'
	}

	// 不包含陌生人版本
	// function calcUnReadSpot(message) {
	//   let myName = uni.getStorageSync("myUsername");
	//   let members = uni.getStorageSync("member") || []; //好友

	//   var listGroups = uni.getStorageSync("listGroup") || []; //群组
	//   let allMembers = members.concat(listGroups);
	//   let count = allMembers.reduce(function(result, curMember, idx) {
	//     let chatMsgs;
	//     if (curMember.groupid) {
	//       chatMsgs =
	//         uni.getStorageSync(curMember.groupid + myName.toLowerCase()) || [];
	//     } else {
	//       chatMsgs =
	//         uni.getStorageSync(
	//           curMember.name && curMember.name.toLowerCase() + myName.toLowerCase()
	//         ) || [];
	//     }
	//     return result + chatMsgs.length;
	//   }, 0);
	//   getApp().globalData.unReadMessageNum = count;
	//   disp.fire("em.unreadspot", message);
	// }

	// // 包含陌生人版本
	function calcUnReadSpot(message) {
		let myName = uni.getStorageSync("myUsername");
		uni.getStorageInfo({
			success: function(res) {
				let storageKeys = res.keys
				let newChatMsgKeys = [];
				let historyChatMsgKeys = [];
				storageKeys.forEach((item) => {
					if (item.indexOf(myName) > -1 && item.indexOf('rendered_') == -1) {
						newChatMsgKeys.push(item)
					}
				})
				let count = newChatMsgKeys.reduce(function(result, curMember, idx) {
					let chatMsgs;
					chatMsgs = uni.getStorageSync(curMember) || [];
					return result + chatMsgs.length;
				}, 0)

				getApp().globalData.unReadMessageNum = count;
				disp.fire("em.unreadspot", message);
			},
			fail: function(err) {
				console.log(err);
			}
		})
	}


	function saveGroups() {
		var me = this;
		return WebIM.conn.getGroup({
			limit: 50,
			success: function(res) {
				uni.setStorage({
					key: "listGroup",
					data: res.data
				});
			},
			error: function(err) {
				console.log(err);
			}
		});
	}

	export default {
		globalData: {
			// bussinessCard
			// 安卓 还是 ios
			// 用户未授权时，默认信息
			clientDefaultAvatarUrl:'http://jylqndev.kaiwumace.com/1616471720172_tx.png',
			clientDefaultAvatarNickname:'jyl_',
			localChatInfo: {},
			// 该小程序 基本全局信息
			navBgImg: 'https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg',

			// 用户信息
			self_companyId: -1,
			self_salesId: -1,
			self_userType: -1,
			self_openId: -1,
			userInfo: {
				name: '',
				avatar: '',
				phone: '',
			},


			unReadMessageNum: 0,
			userInfo: null,
			saveFriendList: [],
			saveGroupInvitedList: [],
			isIPX: false, //是否为iphone X
			conn: {
				closed: false,
				curOpenOpt: {},

				open(opt) {
					uni.showLoading({
						title: "正在初始化客户端..",
						mask: true
					});
					this.curOpenOpt = opt;
					WebIM.conn.open(opt);
					this.closed = false;
				},

				reopen() {
					if (this.closed) {
						//this.open(this.curOpenOpt);
						WebIM.conn.open(this.curOpenOpt);
						this.closed = false;
					}
				}
			},
			// onShow(){
			// 	WebIM.conn.reconnect();
			// },
			// onHide(){
			// 	WebIM.conn.close();
			// 	WebIM.conn.stopHeartBeat();
			// },
			// onUnload(){
			// 	WebIM.conn.close();
			// 	WebIM.conn.stopHeartBeat();
			// 	uni.redirectTo({
			// 		url: "../login/login?myName=" + myName
			// 	});
			// },
			onLoginSuccess: function(myName) {
				console.log('myName')
				console.log(myName)
				uni.hideLoading();



				// uni.redirectTo({
				// 	url: "/pages/salesManager/salesManager?myName=" + myName
				// });
			},

			getUserInfo(cb) {
				var me = this;

				if (this.userInfo) {
					typeof cb == "function" && cb(this.userInfo);
				} else {
					// 调用登录接口
					uni.login({
						success() {
							uni.getUserInfo({
								success(res) {
									me.userInfo = res.userInfo;
									typeof cb == "function" && cb(me.userInfo);
								}
							});
						}
					});
				}
			},

			checkIsIPhoneX: function() {
				const me = this;
				uni.getSystemInfo({
					success: function(res) {
						console.log('获取 systemInfo')
						console.log(res)
						// 根据 model 进行判断
						if (res.model && res.model.search("iPhone") != -1) {
							me.isIPX = true;
						}
					}
				});
			}
		},

		// getPage(pageName){
		// 	var pages = getCurrentPages();
		// 	return pages.find(function(page){
		// 		return page.__route__ == pageName;
		// 	});
		// },
		onLaunch(options) {
			// bussinessCard 
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})


			// 调用 API 从本地缓存中获取数据
			// uni.setInnerAudioOption({
			//   obeyMuteSwitch: false
			// });
			var me = this;
			var logs = uni.getStorageSync("logs") || [];
			logs.unshift(Date.now());
			uni.setStorageSync("logs", logs); //

			disp.on("em.main.ready", function() {
				calcUnReadSpot();
			});
			disp.on("em.chatroom.leave", function() {
				calcUnReadSpot();
			});
			disp.on("em.chat.session.remove", function() {
				calcUnReadSpot();
			});
			disp.on("em.chat.audio.fileLoaded", function() {
				calcUnReadSpot();
			});
			disp.on("em.main.deleteFriend", function() {
				calcUnReadSpot();
			});
			disp.on("em.chat.audio.fileLoaded", function() {
				calcUnReadSpot();
			}); //

			WebIM.conn.listen({
				onOpened(message) {
					console.log('--------------000000000')
					console.log(message)
					uni.$emit('loginback', true)
					me.globalData.onLoginSuccess(
						// uni.getStorageSync("myUsername").toLowerCase()
					);

					// if (
					//   getCurrentRoute() == "pages/login/login" ||
					//   getCurrentRoute() == "pages/login_token/login_token"
					// ) {
					//   me.globalData.onLoginSuccess(
					//     uni.getStorageSync("myUsername").toLowerCase()
					//   );
					// }
				},

				onReconnect() {
					uni.showToast({
						title: "重连中...",
						duration: 2000
					});
				},

				onSocketConnected() {
					uni.showToast({
						title: "socket连接成功",
						duration: 2000
					});
				},

				onClosed() {
					// uni.showToast({
					// 	title: "网络已断开",
					// 	icon: "none",
					// 	duration: 2000
					// });
					return;
					// uni.redirectTo({
					// 	url: "../login/login"
					// });
					me.globalData.conn.closed = true;
					WebIM.conn.close();
				},

				onInviteMessage(message) {
					me.globalData.saveGroupInvitedList.push(message);
					disp.fire("em.invite.joingroup", message); // uni.showModal({
					// 	title: message.from + " 已邀你入群 " + message.roomid,
					// 	success(){
					// 		disp.fire("em.invite.joingroup", message);
					// 	},
					// 	error(){
					// 		disp.fire("em.invite.joingroup", message);
					// 	}
					// });
				},

				onReadMessage(message) {
					//console.log('已读', message)
				},

				onPresence(message) {
					//console.log("onPresence", message);
					switch (message.type) {
						case "unsubscribe":
							break;
							// 好友邀请列表
						case "subscribe":
							if (message.status === "[resp:true]") {} else {
								// pages[0].handleFriendMsg(message);
								for (let i = 0; i < me.globalData.saveFriendList.length; i++) {
									if (me.globalData.saveFriendList[i].from === message.from) {
										me.globalData.saveFriendList[i] = message;
										disp.fire("em.subscribe");
										return;
									}
								}

								me.globalData.saveFriendList.push(message);
								disp.fire("em.subscribe");
							}

							break;

						case "subscribed":
							uni.showToast({
								title: "添加成功",
								duration: 1000
							});
							disp.fire("em.subscribed");
							break;

						case "unsubscribed":
							// uni.showToast({
							// 	title: "已拒绝",
							// 	duration: 1000
							// });
							disp.fire("em.unsubscribed");
							break;
						case "direct_joined":
							saveGroups();
							uni.showToast({
								title: "已进群",
								duration: 1000
							});
							break;
						case "memberJoinPublicGroupSuccess":
							saveGroups();
							uni.showToast({
								title: "已进群",
								duration: 1000
							});
							break;
						case "invite":
							let info = message.from + "邀请你加入群组";
							uni.showModal({
								title: "提示",
								content: info,
								success(res) {
									if (res.confirm) {
										console.log("用户点击确定");
										WebIM.conn.agreeInviteIntoGroup({
											invitee: WebIM.conn.context.userId,
											groupId: message.gid,
											success: () => {
												saveGroups()
												console.log("加入成功");
											}
										});
									} else if (res.cancel) {
										console.log("用户点击取消");
										WebIM.conn.rejectInviteIntoGroup({
											invitee: WebIM.conn.context.userId,
											groupId: message.gid
										});
									}
								}
							});
							break;
						case "unavailable":
							disp.fire("em.contacts.remove");
							disp.fire("em.group.leaveGroup", message);
							break;

						case "deleteGroupChat":
							disp.fire("em.invite.deleteGroup", message);
							break;

						case "leaveGroup":
							disp.fire("em.group.leaveGroup", message);
							break;

						case "removedFromGroup":
							disp.fire("em.group.leaveGroup", message);
							break;

						default:
							break;
					}
				},

				onRoster(message) {
					// let pages = getCurrentPages();
					// if(pages[0]){
					// 	pages[0].onShow();
					// }
				},

				onVideoMessage(message) {
					console.log("onVideoMessage: ", message);

					if (message) {
						msgStorage.saveReceiveMsg(message, msgType.VIDEO);
					}

					calcUnReadSpot(message);
					ack(message);
				},

				onAudioMessage(message) {
					console.log("onAudioMessage", message);

					if (message) {
						if (onMessageError(message)) {
							msgStorage.saveReceiveMsg(message, msgType.AUDIO);
						}

						calcUnReadSpot(message);
						ack(message);
					}
				},

				onCmdMessage(message) {
					console.log("onCmdMessage", message);

					if (message) {
						if (onMessageError(message)) {
							msgStorage.saveReceiveMsg(message, msgType.CMD);
						}

						calcUnReadSpot(message);
						ack(message);
					}
				},

				// onLocationMessage(message){
				// 	console.log("Location message: ", message);
				// 	if(message){
				// 		msgStorage.saveReceiveMsg(message, msgType.LOCATION);
				// 	}
				// },
				onTextMessage(message) {
					console.log("onTextMessage", message);

					if (message) {
						if (onMessageError(message)) {
							msgStorage.saveReceiveMsg(message, msgType.TEXT);
						}

						calcUnReadSpot(message);
						ack(message);
					}
				},

				onEmojiMessage(message) {
					console.log("onEmojiMessage", message);

					if (message) {
						if (onMessageError(message)) {
							msgStorage.saveReceiveMsg(message, msgType.EMOJI);
						}

						calcUnReadSpot(message);
						ack(message);
					}
				},

				onPictureMessage(message) {
					console.log("onPictureMessage", message);

					if (message) {
						if (onMessageError(message)) {
							msgStorage.saveReceiveMsg(message, msgType.IMAGE);
						}

						calcUnReadSpot(message);
						ack(message);
					}
				},

				onFileMessage(message) {
					console.log("onFileMessage", message);

					if (message) {
						if (onMessageError(message)) {
							msgStorage.saveReceiveMsg(message, msgType.FILE);
						}

						calcUnReadSpot(message);
						ack(message);
					}
				},

				// 各种异常
				onError(error) {
					console.log('全局 环信 异常')
					console.log(error); // 16: server-side close the websocket connection
					// if (error.type == WebIM.statusCode.WEBIM_CONNCTION_DISCONNECTED) {
					//   // if(error.type == WebIM.statusCode.WEBIM_CONNCTION_DISCONNECTED && !logout){
					//   // if(WebIM.conn.autoReconnectNumTotal < WebIM.conn.autoReconnectNumMax){
					//   // 	return;
					//   // }
					//   uni.showToast({
					//     title: "websocket 断开",
					//     duration: 1000
					//   });
					//   uni.redirectTo({
					//     url: "../login/login"
					//   });
					//   logout = true;
					//   return;
					// } // 8: offline by multi login

					// if (error.type == WebIM.statusCode.WEBIM_CONNCTION_SERVER_ERROR) {
					//   uni.showToast({
					//     title: "offline by multi login",
					//     duration: 1000
					//   });
					//   uni.redirectTo({
					//     url: "../login/login"
					//   });
					// }
					console.log('调用全局  loginback')
					uni.$emit('loginback', false)
					if (error.type == WebIM.statusCode.WEBIM_CONNCTION_OPEN_ERROR) {
						const myUsername = uni.getStorageSync('myUsername')
						const password = myUsername + '123456'
						uni.hideLoading();
						disp.fire("em.error.passwordErr");
						if (error.data.data.error_description == 'user not found') {


							var options = {
								apiUrl: WebIM.config.apiURL,
								username: myUsername.toLowerCase(),
								password: password,
								nickname: "",
								appKey: WebIM.config.appkey,
								success: function(res) {
									console.log('res', res);
									uni.showToast({
										title: "注册成功"
									});
									var data = {
										apiUrl: WebIM.config.apiURL,
										user: myUsername.toLowerCase(),
										pwd: password,
										grant_type: "password",
										appKey: WebIM.config.appkey
									};
									uni.setStorage({
										key: "myUsername",
										data: myUsername
									});
								},
								error: function(res) {
									console.log('res', res);
									return

									if (res.statusCode !== "200") {
										if (res.statusCode == '400' && res.data.error ==
											'illegal_argument') {
											return uni.showToast({
												title: "用户名非法",
												icon: 'none'
											});
										}

										uni.showToast({
											title: "用户名已被占用",
											icon: 'none'
										});
									}
								}
							};
							WebIM.conn.registerUser(options);

							getApp().globalData.conn.open({
								apiUrl: WebIM.config.apiURL,
								user: myUsername.toLowerCase(),
								pwd: password,
								grant_type: "password",
								appKey: WebIM.config.appkey
							});
						}
						// uni.showModal({
						// 	title: "用户名或密码错误",
						// 	confirmText: "OK",
						// 	showCancel: false
						// });
					}

					if (error.type == WebIM.statusCode.WEBIM_CONNCTION_AUTH_ERROR) {
						uni.hideLoading();
						disp.fire("em.error.tokenErr");
					}

					if (error.type == "socket_error") {
						///sendMsgError
						console.log("socket_errorsocket_error", error);
						uni.showToast({
							title: "网络已断开",
							icon: "none",
							duration: 2000
						});
						disp.fire("em.error.sendMsgErr", error);
					}
				}
			});


			this.globalData.checkIsIPhoneX();
			
		},

		methods: {
			loginBack() {

			},

			
		}
	};
</script>
<style lang="scss">
	@import "uview-ui/index.scss";
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "static/css/quill.core.css";

	// @import "./app.css"
	.container {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: 200rpx 0;
		box-sizing: border-box;
	}

	.f {
		flex: 1;
	}

	.f-row {
		display: flex;
		flex-direction: row;
	}

	page {
		width: 100%;
	}

	.em-unread-spot {
		width: 32rpx;
		height: 32rpx;
		background-color: red;
		position: relative;
		border-radius: 50%;
		left: 110rpx;
		top: 4rpx;
		color: #fff;
		font-size: 24rpx;
		text-align: center;
		line-height: 32rpx;
	}

	.em-unread-spot-litleFont {
		font-size: 16rpx;
	}

	.chatRoom_tab {
		z-index: 100000;
		width: 100%;
		height: 94rpx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		right: 0;
		border-top: 1px solid rgba(173, 185, 193, 0.5);
		display: flex;
		justify-content: space-around;
	}

	.chatRoom_tab_X {
		z-index: 100000;
		width: 100%;
		height: 142rpx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		right: 0;
		border-top: 1px solid rgba(173, 185, 193, 0.5);
		display: flex;
		justify-content: space-around;
	}

	.tableBar {
		flex: 1;
	}

	.tableBar text {
		font-size: 10px;
		text-align: center;
		width: 100%;
		display: block;
		color: #666666;
	}

	.tableBar .activeText {
		color: #085AB8;
	}

	.tableBar .image {
		width: 48rpx;
		height: 48rpx;
		margin: auto;
		display: block;
		margin-top: 12rpx;
	}

	.tableBar .image image {
		width: 100%;
		height: 100%;
	}

	.tableBar .haveSpot {
		margin-top: -24rpx;
	}

	// bussinessCard
	.container {
		background-color: $uni-bg-color-grey;
		padding: 20rpx 0;
	}

	.padding-container {
		padding: 20rpx;
	}

	/*  关于文字  */
	.limit-text {
		height: 1.2em;
		white-space: nowrap;
		vertical-align: cetner;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.self-bold {
		font-weight: bold;
		color: #000;
	}

	.self-shadow {
		box-shadow: 0px 2px 4px rgba(136, 136, 136, 0.5);
	}

	.btn-hover {
		position: relative;
		top: 5rpx;
		background-color: #efefef;
		box-shadow: 0px 2px 4px rgba(136, 136, 136, 0.5) inset;
	}

	.underLine {
		text-decoration: underline;
	}

	.self-avatar {
		border-radius: 50%;
		overflow: hidden;
	}

	
	//  用以 不得不使用 button 的情况下
	//   将 btn 定位使用 absolute 并且 背景透明
	.absolute-btn-container {
		position: relative;
		overflow: hidden;

		.absolute-btn {
			position: absolute;
			z-index: 100;
			left: -10%;
			top: -10%;

			width: 120%;
			height: 120%;
			background-color: rgba(255, 255, 255, 0);
		}
	}

	image {
		width: 100%;
		height: 100%;
	}

	// 卡片
	.introduce-card {
		width: 750rpx;
		margin: auto;
		// box-shadow: 0px 2px 4px rgba(136, 136, 136, 0.5);
		// margin-bottom: 20rpx;
		background-color: $self-color-them;
		.content {
			background-color: #FFFFFF;
			padding: 30rpx 40rpx;
			border-radius: 0 0 20rpx 20rpx;

			.bottom {
				margin-top: 20rpx;

				.title {
					color: #666666;
				}

				.bottom-main {
					display: flex;
					padding: 6rpx 00;
				}
			}

		}

	}


	.card-head {
		display: flex;
		padding: 20rpx 40rpx;
		border-radius: 20rpx 20rpx 0 0;
		align-items: center;
		// background-color: #F6F6F6;
		background-color: $self-color-them;
		font-weight: bold;
		.icon-container {
			width: 2em;
			height: 2em;
			margin-right: 16rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

	}

	// poup card
	.self-poupCard {
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-around;
		width: 730rpx;
		height: 500rpx;
		padding: 40rpx;
		margin: auto;
		border-radius: 40rpx;
	}
</style>
