<template>
	<scroll-view :scroll-y="true" :class="view + ' wrap ' + (isIPX?'scroll_view_X': '')" @tap="onTap"
		:scroll-into-view="toView" :scroll-top="toTopHeight" @scroll="scrolling"
		:style="{height: dynamicHeight,'overflow':'hidden',zIndex:1000,}">
		<view class="" style="height: 190rpx;"></view>
		<view class="message" v-for="item in chatMsg" :key="item.mid" :id="item.mid">
			<view class="main" :class="item.style">
				<view class="avatar">
					<image v-if="item.style!='self'" :src="yourInfo.headPortrait" mode="aspectFill" />
					<image v-if="item.style =='self' && selfInfo.headPortrait" :src="selfInfo.headPortrait"
						mode="aspectFill" />
					<open-data v-if="item.style=='self'&& !selfInfo.headPortrait" type="userAvatarUrl"></open-data>
				</view>
				<view :class="{msg:true,'self-msg':msgContainer(item.msg.type)}" >
					<image class="err" :class="(item.style == 'self' && item.isFail) ?  'show' : 'hide'" src="/static/images/msgerr.png" />
					<view v-if="item.msg.type == 'img' || item.msg.type == 'video'" class="self-img-container">
						<image v-if="item.msg.type == 'img'" class="avatar" style="margin: 0;" :src="item.msg.data"
							mode="widthFix" @tap="previewImage"
							:data-url="item.msg.data" />
						<video v-if="item.msg.type == 'video'" :src="item.msg.data" controls style="width:300rpx;"/>
					</view>
					<audio-msg v-if="item.msg.type == 'audio'" :msg="item"></audio-msg>

					<view v-else-if="item.msg.type == 'txt' || item.msg.type == 'emoji'">
						<view class="template" v-for="(d_item, d_index) in item.msg.data" :key="d_index">
							<text :data-msg="item" @tap="clickMsg" v-if="d_item.type == 'txt'" class="msg-text"
								style="float:left;">{{ d_item.data }}</text>
							<image v-if="d_item.type == 'emoji'" class="avatar"
								:src="'/static/images/faces/' + d_item.data"
								style="width:25px; height:25px; margin:0 0 2px 0; float:left;" />
						</view>
					</view>
				</view>
			</view>
		</view>
		<view id="msgListBottom" :style="{height: isIPX?'100rpx':'70rpx'}">
		</view>
	</scroll-view>
</template>


<script>
	let msgStorage = require("../msgstorage");
	let disp = require("../../../utils/broadcast");
	let LIST_STATUS = {
		SHORT: "scroll_view_change",
		NORMAL: "scroll_view"
	};
	let page = 0;
	let Index = 0;
	let curMsgMid = '';
	let isFail = false;
	import audioMsg from "./type/audio/audio";

	export default {
		data() {
			return {
				view: LIST_STATUS.NORMAL,
				toView: "",
				chatMsg: [],
				__visibility__: false,
				isIPX: false,
				toTopHeight: 0,
				isHeight: true,
				srollNameList:[]
			};
		},
		computed: {
			msgContainer(type){
				return (type)=>{
					if(type=='img'){
						return true
					}
					return false
				}
			},
			isUpBottom() {
				const {
					isShowBottomH,
					isAudioShowBottom
				} = this
				return {
					isShowBottomH,
					isAudioShowBottom,
				}
				// return this.isShowBottomH || this.isAudioShowBottom
			},
			dynamicHeight() {
				let isBottomHeight = this.InputBottom
				if(this.isIPX){
					isBottomHeight += 0
				}
				let bool = this.isShowBottomH || this.isAudioShowBottom || this.isEmojiShowBottom
				let str = '90vh'
				let msgLast = this.chatMsg ? this.chatMsg[this.chatMsg.length - 1] : null

				if (bool) {
					str = `calc(90vh - ${isBottomHeight}px )`
					// this.setData({
					// 		toView: 'msgListBottom'
					// 	})
					setTimeout(() => {
						this.setData({
							toView: 'msgListBottom'
						})
					}, 500)
				} else {
					if (msgLast && msgLast.hasOwnProperty('mid')) {
						this.setData({
							toView: this.chatMsg[this.chatMsg.length - 1].mid
						})
					}
				}

				return str
			},
			showAvatar() {
				return (str) => {
					if (str == 'self') {
						return this.selfInfo.headPortrait
					} else {
						return this.yourInfo.headPortrait
					}
				}
			},
			showName() {
				return (str) => {
					if (str == 'self') {
						return this.selfInfo.username
					} else {
						return this.yourInfo.username
					}
				}
			},
		},
		components: {
			audioMsg
		},
		watch: {
		},
		props: {
			isEmojiShowBottom: {
				type: Boolean,
				default: false
			},
			isShowBottomH: {
				type: Boolean,
				default: true
			},
			isAudioShowBottom: {
				type: Boolean,
				default: false
			},
			username: {
				type: Object,
				default: () => ({})
			},
			yourInfo: {
				type: Object,
				default: () => ({})
			},
			selfInfo: {
				type: Object,
				default: () => ({})
			},
			InputBottom: {
				type: Number,
				default: 0
			}
		},

		// lifetimes
		created() {},

		beforeMount() {
			this.__visibility__ = true;
			page = 0;
			Index = 0;
		},
		moved() {},

		destroyed() {
			this.__visibility__ = false;
			msgStorage.off("newChatMsg", this.dispMsg)
		},

		mounted(event) {
			let me = this;
			if (getApp().globalData.isIPX) {
				this.setData({
					isIPX: true
				});
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
				})
			}
			this.username = uni.username;
			let username = this.username;
			let myUsername = uni.getStorageSync("myUsername");
			
			let sessionKey = username.groupId ? username.groupId + myUsername : username.your + myUsername;
			let chatMsg = uni.getStorageSync(sessionKey) || [];
			this.renderMsg(null, null, chatMsg, sessionKey,true,true);
			uni.setStorageSync(sessionKey, null);
			disp.on('em.error.sendMsgErr', function(err) {
				curMsgMid = err.data.mid;
				isFail = true;
				console.log('发送失败了');
				return;
				let msgList = me.chatMsg;
				msgList.map(item => {
					if (item.mid.substring(item.mid.length - 10) == curMsgMid.substring(curMsgMid.length -
							10)) {
						item.msg.data[0].isFail = true;
						item.isFail = true;
						me.setData({
							chatMsg: msgList
						});
					}
				});

				if (me.curChatMsg[0].mid == curMsgMid) {
					me.curChatMsg[0].msg.data[0].isShow = false;
					me.curChatMsg[0].isShow = false;
				}

				uni.setStorageSync("rendered_" + sessionKey, msgList);
			});
			msgStorage.on("newChatMsg", this.dispMsg);
			// this.toMsglistBottom()
		},

		methods: {
			toMsglistBottom(msgList) {
				
				if(this.srollNameList.length!==0){
					this.srollNameList.forEach(item=>{
						clearTimeout(item)
					})
				}
				
				let length = msgList.length
				let baseStep = Math.floor(length/3)
				let scrollNameCount =  0
				
				
				
				for(let i = 0;i<msgList.length;i++){
					if((i+1)%baseStep===0){
						scrollNameCount++;
						let setTodo = setTimeout(() => {
							this.setData({
								toView: msgList[i].mid
							});
						}, (scrollNameCount)*100)
						this.scrollNameList.push(setTodo)
					}
				}
				
				let setTimeFinalDo = setTimeout(() => {
					this.setData({
						toView: 'msgListBottom'
					});
				}, (scrollNameCount+1)*100)
				this.scrollNameList.push(setTimeFinalDo)
			},
			scrolling(e) {
				console.log(e)
			},
			normalScroll() {},
			dispMsg(renderableMsg, type, curChatMsg, sesskey) {
				let me = this;
				let username = this.username;
				let myUsername = uni.getStorageSync("myUsername");
				let sessionKey = username.groupId ? username.groupId + myUsername : username.your + myUsername;
				me.curChatMsg = curChatMsg;

				if (!me.__visibility__) return; // 判断是否属于当前会话

				if (username.groupId) {
					// 群消息的 to 是 id，from 是 name
					if (renderableMsg.info.from == username.groupId || renderableMsg.info.to == username.groupId) {
						if (sesskey == sessionKey) {
							me.renderMsg(renderableMsg, type, curChatMsg, sessionKey, 'newMsg');
						}
					}
				} else if (renderableMsg.info.from == username.your || renderableMsg.info.to == username.your) {
					if (sesskey == sessionKey) {
						me.renderMsg(renderableMsg, type, curChatMsg, sessionKey, 'newMsg');
					}
				}
			},
			shortScroll() {},
			onTap() {
				this.$emit("msglistTap", null, {
					bubbles: true
				});
			},

			previewImage(event) {
				var url = event.target.dataset.url;
				uni.previewImage({
					urls: [url] // 需要预览的图片 http 链接列表
				});
			},

			getHistoryMsg() {
				let me = this;
				let username = this.username;
				let myUsername = uni.getStorageSync("myUsername");
				let sessionKey = username.groupId ? username.groupId + myUsername : username.your + myUsername;
				let historyChatMsgs = uni.getStorageSync("rendered_" + sessionKey) || [];
				if (Index < historyChatMsgs.length) {
					let timesMsgList = historyChatMsgs.slice(-Index - 10, -Index);
					this.setData({
						chatMsg: timesMsgList.concat(me.chatMsg),
						toView: timesMsgList[timesMsgList.length - 1].mid
					});

					Index += timesMsgList.length;
					if (timesMsgList.length == 10) {
						page++;
					}

					uni.stopPullDownRefresh();
				}
			},

			renderMsg(renderableMsg, type, curChatMsg, sessionKey, isnew, isNotToView) {
				console.log('HHHHHHHHHHHHHHHHHHHHHHHHH')
				console.log(isNotToView)
				let me = this;

				var historyChatMsgs = uni.getStorageSync("rendered_" + sessionKey) || [];
				historyChatMsgs = historyChatMsgs.concat(curChatMsg); //console.log('当前历史',renderableMsg)
				if (!historyChatMsgs.length) return;
				if (!isNotToView && isnew == 'newMsg') {
					this.setData({
						chatMsg: this.chatMsg.concat(curChatMsg),
					});
					
					if (isNotToView) {
						this.setData({
							toView: 'msgListBottom'
						});
					}else{
						console.log('进行了 原来环信的跳转')
						this.setData({
							toView: historyChatMsgs[historyChatMsgs.length - 1].mid
						});
					}
				} else {
					
					this.setData({
						chatMsg: historyChatMsgs.slice(-10),
					});
					
					if (isNotToView) {
						this.setData({
							toView: 'msgListBottom'
						});
					}else{
						console.log('进行了 原来环信的跳转')
						this.setData({
							toView: historyChatMsgs[historyChatMsgs.length - 1].mid
						});
					}
				}

				uni.setStorageSync("rendered_" + sessionKey, historyChatMsgs);
				let chatMsg = uni.getStorageSync(sessionKey) || [];
				chatMsg.map(function(item, index) {
					curChatMsg.map(function(item2, index2) {
						if (item2.mid == item.mid) {
							chatMsg.splice(index, 1);
						}
					});
				});
				uni.setStorageSync(sessionKey, chatMsg);
				Index = historyChatMsgs.slice(-10).length;
				if (isFail) {
					this.renderFail(sessionKey);
				}
			},

			renderFail(sessionKey) {
				let me = this;
				let msgList = me.chatMsg;
				msgList.map(item => {
					if (item.mid.substring(item.mid.length - 10) == curMsgMid.substring(curMsgMid.length - 10)) {
						item.msg.data[0].isFail = true;
						item.isFail = true;
						me.setData({
							chatMsg: msgList
						});
					}
				});

				if (me.curChatMsg[0].mid == curMsgMid) {
					me.curChatMsg[0].msg.data[0].isShow = false;
					me.curChatMsg[0].isShow = false;
				}

				uni.setStorageSync("rendered_" + sessionKey, msgList);
				isFail = false;
			},

			clickMsg(event) {
				if (typeof(event.target.dataset.msg) == 'object' &&
					event.target.dataset.msg.msg.ext &&
					event.target.dataset.msg.msg.ext.msg_extension) {
					this.$emit("clickMsg", event.target.dataset.msg.msg.ext)
				}
			}

		}
	};
</script>
<style>
	@import "./msglist.css";
	.main .self-msg{
		background-color: rgba(0,0,0,0);
		padding: 0;
		overflow: hidden;
		border-radius: 6rpx;
	}
	.msg .self-img-container{
		display: flex;
		align-items: top;
		width: 120px;
		min-height: 80px;
		max-height: 120px;
		max-width: 120px;
		overflow: hidden;
		border-radius: 6rpx;
	}
	.msg .self-img-container image{
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}
</style>
