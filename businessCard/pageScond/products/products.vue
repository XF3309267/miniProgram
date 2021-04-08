<template>
	<view class="self-tableBar-container" style="padding">
		<cu-custom bgColor="bg-white" :isBack="false">
			<block slot="content"> 产品介绍 </block>
		</cu-custom>
		<FixedChat :userType="userType" :toChatId="toChatId" :newsCount="unReadSpotNum" />
		<view v-if="productDisplayMode === 1" class="">
			<view class="product-img-item" v-for="(item,index) in imgList" :key="index">
				<view class="u-p-20 u-flex u-border-bottom">
					<u-avatar :src="companyInfo.companyLogo" size="80"></u-avatar>
					<view class="u-p-l-30 ">
						<view class="text-bold">
							{{companyInfo.companyName}}
						</view>
						<view class="u-type-info">
							{{ showTimeStr(companyInfo.updateTime)}}
						</view>
					</view>
				</view>
				<view class="img-container ">
					<image @tap="showBigImage(index)" :src="item" mode="widthFix"  @load="onoff='1'"></image>
					<!-- <view class="brief"> 这里是对图片的说明  </view> -->
				</view>
			</view>

		</view>
		<view v-if="productDisplayMode === 2" class="u-content ql-editor">
			<u-parse :html="productDetails"></u-parse>
		</view>




		<view :class="isIPX?'chatRoom_tab_X':'chatRoom_tab'">
			<view class="tableBar" @tap="tab_card">
				<view class="image">
					<image src="/static/img/tabBarIcon/card.png" mode="aspectFit"></image>
				</view>

				<text>名片</text>
			</view>

			<view class="tableBar" @tap="tab_home">
				<view class="image">
					<image src="/static/img/tabBarIcon/home.png" mode="aspectFit"></image>
				</view>

				<text> 企业介绍 </text>
			</view>

			<view class="tableBar">
				<view class="image">
					<image src="/static/img/tabBarIcon/productA.png" mode="aspectFit"></image>
				</view>

				<text>产品介绍</text>
			</view>

			<view class="tableBar" @tap="tab_person">
				<view class="image">
					<image src="/static/img/tabBarIcon/person.png" mode="aspectFit"></image>
				</view>

				<text>我的</text>
			</view>
		</view>

	</view>
</template>

<script>
	let disp = require("../../utils/broadcast");
	var WebIM = require("../../utils/WebIM")["default"];
	import FixedChat from '@/components/FixedChat.vue'


	import {
		getCompanyInfo,
		getSalesInfo,
		setUserType,
		judgeUserType,
		initBaseInfo
	} from '@/static/js/common.js'
	import {
		getCompanyProducts
	} from '@/services/services.js'
	export default {
		data() {
			return {
				unReadSpotNum: 0,
				arr: [],
				isIPX: false,

				//   	1 	图片集的形式
				//		2	富文本的形式
				salesId: -1,
				companyId: -1,
				userType: 0,
				clientId: -1,
				productDisplayMode: 1,
				// 公司简介
				productDetails: "",
				imgList: [],
				companyInfo: '',
				toChatId:null,
			}
		},
		computed: {
			showTimeStr() {
				return (data) => {
					const timeChuo = this.moment(data).unix() * 1000
					return this.moment(timeChuo).format('YYYY年MM月DD日')
				}
			}
		},
		onShow() {

			this.setData({
				arr: this.getChatList(),
				unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData
					.unReadMessageNum,

			});

			if (getApp().globalData.isIPX) {
				this.setData({
					isIPX: true
				});
			}
		},
		onLoad() {
			
			this.getLocalProducts()
			let me = this;
			//监听未读消息数
			disp.on("em.unreadspot", function(message) {
				console.log('监听未读消息')

				// me.getChatList()
				me.setData({
					arr: me.getChatList(),
					unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData
						.unReadMessageNum
				});
			}); //监听未读加群“通知”
			this.getRoster();
		},

		async created() {
			const getBase = await initBaseInfo(this)
			this.getProducts(this.companyId)
		},
		methods: {
			// 点击图片预览大图
			showBigImage(index) {
				uni.previewImage({
					current: index,
					urls: this.imgList,
				})
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

					for (let i = 0; i < newChatMsgKeys.length; i++) {
						let newChatMsgs = uni.getStorageSync(newChatMsgKeys[i]) || [];
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
					this.toChatId = me.arr[0]?me.arr[0].username:null
				}
			},



			into_chatRoom: function(event) {
				let detail = JSON.parse(event.currentTarget.dataset
				.item); //群聊的chatType居然是singlechat？脏数据？ 等sdk重写后整理一下字段
				console.log('detail', detail)
				if (detail.chatType == 'groupchat' || detail.chatType == 'chatRoom' || detail.groupName) {
					this.into_groupChatRoom(detail);
				} else {
					this.into_singleChatRoom(detail);
				}
			},
			//	单聊
			into_singleChatRoom: function(detail) {
				var my = uni.getStorageSync("myUsername");
				var nameList = {
					myName: my,
					your: detail.username
				};
				uni.$emit('goChatRoom', nameList)
				uni.navigateTo({
					url: "../chatroom/chatroom?username=" + JSON.stringify(nameList)
				});
			},

			async getProducts(companyId) {
				
				let obj = {}
				obj.id = companyId
				let productRes = await getCompanyProducts(obj)
				let companyRes = await getCompanyInfo(obj)

				if (productRes.statusCode === 200) {
					const products = productRes.data.data[0]
					this.productDisplayMode = products.productDisplayMode
					this.imgList = products.productImages.split(',')
					this.productDetails = products.productDetails

					try {
						uni.setStorageSync('productImgList', this.imgList);
					} catch (e) {
						// error
					}
				} else {
					uni.showToast({
						title: productRes.data.msg,
						icon: 'none'
					})
				}

				if (companyRes.statu === 200) {
					this.companyInfo = companyRes.value
				}

			},
			// 从本地缓存中获取 产品信息
			getLocalProducts() {
				try {
					const value = uni.getStorageSync('productImgList');
					if (value) {
						this.imgList = value
					}
				} catch (e) {
					// error
				}

			},
			// tableBar
			tab_card() {
				uni.redirectTo({
					url: "/pages/salesManager/salesManager"
				});
			},
			tab_home() {
				uni.redirectTo({
					url: "/pageScond/index/index"
				});
			},
			tab_person() {
				uni.redirectTo({
					url: "/pageScond/personal/personal"
				});
			}

		},
		components: {
			FixedChat,
		}
	}
</script>

<style lang="scss">
	image{
		will-change: transform
	}
	.self-tableBar-container {
		padding-bottom: 162rpx;
	}

	/*  精彩图册  */
	.product-img-item {
		border-radius: 10rpx 10rpx 0 0;
		background-color: #FFFFFF;
	}

	.img-container {
		position: relative;
		width: 710rpx;
		min-height: 300rpx;
		/* 	height: 380rpx; */
		padding: 20rpx;
		border-radius: 10rpx;
		margin: 0 auto;
		margin-bottom: 20rpx;
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

	//  富文本 样式
</style>
