<template>
	<chat id="chat" :username="username" ref="chat" chatType="singleChat" @onClickInviteMsg="onClickMsg"></chat>
</template>

<script>
	let disp = require("@/utils/broadcast");
	import chat from "@/comps/chat/chat.vue";

	export default {
		data() {
			return {
				username: {
					your: ""
				},
				yourInfo: null,
			};
		},

		components: {
			chat
		},
		props: {},
		// options = 系统传入的 url 参数
		onBackPress(e) {
			console.log('监听用户返回')
			console.log(e)
			uni.navigateBack({
				delta: 1
			})
			// console.log(e);
			// if(e.from == 'backbutton'){
			// this.$utils.showModal('提示','房型尚未保存,确认退出吗?',true,'继续编辑','确定').then(()=>{
			// 	console.log('确定')
			// 	uni.navigateBack({
			// 		delta:1
			// 	})
			// }).catch(()=>{
			// 	console.log('继续编辑')
			// })
			// return true;//阻止默认返回行为
			// }
		},
		onLoad(options) {
			let username = JSON.parse(options.username);
			console.log('onload username')
			console.log(options.username)
			
			this.setData({
				username: username
			});
			this.getYouInfo()
			// 生成的支付宝小程序在onLoad里获取不到，这里放到全局变量下

			console.log('this.yourInfo')
			console.log(this.yourInfo)

			uni.username = username;
			uni.setNavigationBarTitle({
				title: this.yourInfo.username
			});
		},

		onUnload() {
			disp.fire("em.chatroom.leave");
		},

		onPullDownRefresh: function() {
			console.log('getMore???????????????')
			
			uni.showNavigationBarLoading();
			this.$refs.chat.getMore();
			// 停止下拉动作
			uni.hideNavigationBarLoading();
			uni.stopPullDownRefresh();
		},
		methods: {
			getYouInfo() {
				let yourname = this.username.your

				if (!yourname) {
					return
				}
				console.log('YYYYYYYYYYYY')
				console.log(yourname)
				let userType = uni.getStorageSync('userType')

				console.log('getApp')
				console.log(getApp().globalData.localChatInfo)

				let yourInfo = getApp().globalData.localChatInfo[yourname]


				console.log('SSSSSSSSSS')
				console.log(yourInfo)

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

					yourInfo['headPortrait'] = yourInfo.clientHeadPortrait


					yourInfo['username'] = yourInfo.clientName
					yourInfo['wxId'] = yourInfo.clientWx
					yourInfo['phone'] = yourInfo.clientPhone
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

			onClickMsg(msg) {
				msg.action = 'join'
				uni.navigateTo({
					url: "/pages/emedia/index?srcData=" + JSON.stringify(msg)
				});
			}
		}
	};
</script>
<style>
	/* @import "./chatroom.css"; */
</style>
