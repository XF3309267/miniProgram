<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"><text @click="personInfoEditBack"> 返回</text> </block>
			<block slot="content"> 个人资料 </block>
		</cu-custom>
		<u-popup v-model="show" mode="center" :closeable="false" width="730" height="500" border-radius="20">
			<view class="self-poupCard " style=" ">
				<view class="u-p-10 text-bold text-center">
					输入您的电话号码
				</view>
				<u-form :model="form" ref="uForm">
					<u-form-item label="电话号码" prop="phone" label-width="150">
						<u-input type="number" maxlength="11" v-model="form.phone" />
					</u-form-item>
				</u-form>
				<view class="u-flex u-row-around u-p-20">
					<button class="cu-btn bg-gradual-red round " @click="show = false"> 取消 </button>
					<button class="cu-btn bg-gradual-blue round " @click="onConfirmBind"> 确认绑定 </button>
				</view>
			</view>
		</u-popup>
		<view class="self-marginTop padding ">
			<view class="text-center">
				如果您为【{{companyInfo.companyName}}】的员工
			</view>
			<view class="text-center">
				请绑定员工身份，以便更好的使用小程序
			</view>
		</view>
		<view class="self-marginTop padding text-center">
			<!-- <button class="cu-btn bg-gradual-green round " open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">绑定员工身份</button> -->
			<button class="cu-btn bg-gradual-green round " @click="show = true">绑定员工身份</button>
		</view>
	</view>
</template>

<script>
	var WebIM = require("@/utils/WebIM")["default"];
	import WXBizDataCrypt from "@/static/js/WXBizDataCrypt.js"
	import {
		getCardSalesInfoByLonginPhone,
		loginChat
	} from '@/services/services.js'
	import {
		setUserType,
		judgeUserType,
		getCompanyInfo,
		userAction,
		initBaseInfo
	} from '@/static/js/common.js'
	export default {
		data() {
			return {
				show: false,
				form: {
					phone: '13574988888'
				},
				isIPX: false,
				unReadSpotNum: 0,
				arr: [],
				salesId: -1,
				userType:-1,
				companyId:-1,
				companyInfo:{
					companyWordIntroduce:'',
					companyAddress:'',
					companyPhone:'',
					companyName:''
				},
				rules: {
					phone: [{
							required: true,
							message: '请输入电话号码',
							// 可以单个或者同时写两个触发验证方式
							trigger: 'blur,change'
						},
						{
							pattern: /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/i,
							transform(value) {
								return String(value);
							},

							message: '请输入正确的手机号',
							trigger: ['blur', 'change']
						},
					]
				}
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
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
		async created() {
			const getBaseInfo = await initBaseInfo(this)
			this.initCompanyInfo(this.companyId)
			if(!getBaseInfo){
				return false
			}
		},
		methods: {
			// 获取公司信息
			async initCompanyInfo(companyId){
				console.log('index companyId')
				console.log(companyId)
				
				
				let data = {id:companyId}
				const getCompanyInfoRes = await getCompanyInfo(data)
				if(getCompanyInfoRes.statu===200){
					this.companyInfo = getCompanyInfoRes.value
					
					try {
					    uni.setStorageSync('companyInfo',this.companyInfo)
					   
					} catch (e) {
					    // error
					}
					console.log('----- company  ---')
					console.log(getCompanyInfoRes.value)
				}else{
					uni.showToast({
						title: getCompanyInfoRes.msg,
						icon:'none'
					})
				}
			},
			onGetPhoneNumber(res) {
				if (e.detail.errMsg == "getPhoneNumber:fail user deny") { //用户决绝授权  
					uni.showToast({
						title: '若您是企业员工，请认证后使用',
						icon: 'none'
					})

				} else { //允许授权  
					let pc = new WXBizDataCrypt('wxXXXXXXX', this.session_key); //wxXXXXXXX为你的小程序APPID  
					let data = pc.decryptData(e.detail.encryptedData, e.detail.iv);
					console.log(data) //data就是最终解密的用户信息  
					//后续操作。。。  
				}
			},
			onConfirmBind() {
				this.$refs.uForm.validate(async valid => {
					if (valid) {
						console.log('form 通过')
						this.bindStaff(this.form.phone)

					} else {
						console.log('验证失败');
					}
				});
			},

			// 进行员工绑定
			async bindStaff(loginPhone) {
				let data = {
					loginPhone: this.form.phone
				}
				console.log('form 通过，开始 请求')
				const bindRes = await getCardSalesInfoByLonginPhone(data)
				let resData = bindRes.data

				console.log('绑定员工身份返回')
				console.log(bindRes)

				if (resData.code === 0) {
					setUserType(1)
					uni.setStorage({
						key: 'salesId',
						data: resData.data.id
					})
					WebIM.conn.close();
					
					// this.onloadChatTodo(resData.data.id)
					uni.showToast({
						title: resData.msg
					})
				} else {
					uni.showToast({
						title: resData.msg,
						icon: 'none'
					})
				}
				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/salesManager/salesManager'
					})
				}, 500)
			},
			async onloadChatTodo(salesId) {
				const chatUser = 'jyl_' + 'sales_' + salesId
				const password = 'jyl2020'
				const loginChatRes = await loginChat(chatUser, password)

				console.log('登录环信返回')
				console.log(loginChatRes)

				if (!loginChatRes) {
					const siginChatRes = await siginChat(chatUser)

					console.log('注册环信账号 返回')
					console.log(siginChatRes)

					if (siginChatRes.data.data == 1) {

						const loginChatRes2 = await loginChat(chatUser)
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
					if (message) {
						console.log(message)
					}
					// me.getChatList()
					me.setData({
						arr: me.getChatList(),
						unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp()
							.globalData.unReadMessageNum
					});
				}); //监听未读加群“通知”


				disp.on("em.contacts.remove", function() {
					me.getRoster(); // me.setData({
					// 	arr: me.getChatList(),
					// 	unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum,
					// });
				});
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
						return b.dateTimeNum - a.dateTimeNum
					})
					this.setData({
						arr: array
					})

					console.log('finally arr ')
					console.log(me.arr)
				}
			}

		}
	}
</script>

<style scoped>
	.self-marginTop {
		margin-top: 200rpx
	}
</style>
