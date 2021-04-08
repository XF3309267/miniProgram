<template>
	<view class="person-contain">
		<!-- :bgImage="getApp().globalData.navBgImg" -->
		<cu-custom bgColor="bg-white" id="customNav">
			<block slot="content"> <text class="text-bold">  </text> </block>
		</cu-custom>
		<view class="person-head" id="personHead" @click="toPersonEdit">
			<view class="flex align-center ">
				<view class="avatar">
					<open-data type="userAvatarUrl"></open-data>
				</view>
				<view class="content padding-sm text-xl">
					<view class="limit-text  padding-left-sm" style="max-width: 8em">
						<open-data type="userNickName"></open-data>
					</view>
					<!-- <view class="padding-xs text-xs">
						<view class='cu-tag round bg-gradual-blue'>访客</view>
					</view> -->
				</view>
			</view>

			<view class="right">
				<!-- <u-image src="@/static/img/personImg/arrow-right.png" width="40" height="40"></u-image> -->
				<!-- <u-icon name="arrow-right" color="#989898" size="80rpx"></u-icon> -->
				<!-- <button class="cu-btn block bg-gradual-green"   bindgetphonenumber='getPhoneNum' open-type='getPhoneNumber' > 去注册 <text class="cuIcon-right padding-xs"></text>  </button> -->
			</view>
		</view>
		<!--  用户应该显示的画面 -->
		<view>
			<view v-if="userType === 0" class=" flex justify-between align-center u-p-10 u-p-l-50 u-p-r-50">
				<text class="text-bold"> 我的销售经理 </text>
			</view>
			<view v-if="userType === 1" id="personCardTitle " class="  u-p-l-50 u-p-r-50">
				<view class=" flex justify-between align-center" style="height: 100rpx;">
					<text class="  text-lg text-bold"> 我的名片 </text>
					<text class="u-type-info" @click="toMangaerInfoEdit"> 修改 <text class="cuIcon-right"> </text> </text>
				</view>
			</view>
			<view class="">
				<SalesManagerCard :equipmentType="equipmentType" :salesManagerInfo="salesManagerInfo" :companyInfo="companyInfo"
					@onMailList="onMailList" />
			</view>
		</view>

		<view v-if="userType === 1" class="u-relative">

			<!-- <view class=" flex justify-between padding bg-white align-center" style="height: 100rpx;" id="personHead">
				<text class="text-lg text-bold"> 我的客户 </text>
				<view class="padding-xs  round solids  flex align-center">
					<text class="cuIcon-search padding-xs"></text>
					<input type="text" value="" class="bg-white text-sm" :disabled="true"  @click="toUserListDetail" placeholder="搜索" />
				</view>
			</view> -->
			<view class="sm-bar-container">
				<view class="main">
					<u-tabs-swiper ref="tabs" :list="smTablist" active-color="#ff5500" inactive-color="#606266"
						font-size="26" @change="smTabChange" :current="smTabCurrent"></u-tabs-swiper>
					<!-- <view class=""  v-show="smTabCurrent===0" style="position: absolute;left: 0; width: 100%;">
						<u-dropdown ref="uDropdown" @open="open" @close="close">
							<u-dropdown-item :title="fliterDateStr" class="" style="position: relative;" >
								<view class="slot-content bg-white" >
									<view class=" u-p-20  u-m-b-20 flex justify-around">
										<u-tag v-for="(item,index) in filterActiveList" :kye="index" :text="item.label" shape="circle" />
									</view>
								</view>
							</u-dropdown-item>
						</u-dropdown>
					</view> -->
				</view>
				<!-- <view v-show="smTabCurrent===1" class="right-icon" @click="filterClick">
					<text class="u-p-r-20"> {{fliterDateStr}} </text>
					<u-icon :name="isFilter?'arrow-up':'arrow-down' " size="40"></u-icon>
				</view> -->
				<view v-show="smTabCurrent===2 " @click="toUserListDetail" class="right-icon">
					<u-icon name="search" size="40"></u-icon>
				</view>
			</view>
			<view :class="['filter-list',isFilter?'filter-list-active':'' ]">
				<u-tag v-for="(item,index) in filterActiveList" :key="index" :text="item.label"
					:mode="filterActiveIndex===index?'dark':'light' " @click="selectFilter(index)" shape="circle" />
			</view>


			<view v-show="smTabCurrent===0" class="u-rela">
				<view v-if="arr.length === 0" style="position: fixed;bottom: 15vh;left: 300rpx;">
					<u-empty text="暂无聊天记录" mode="message"></u-empty>
				</view>
				
				<view v-for="(item, index) in arr" :key="index" class="chat_list" :data-item="item" @tap.stop="del_chat">
					<swipe-delete>
						<view class="tap_mask" @tap.stop="into_chatRoom" :data-item="JSON.stringify(item)">
							<view class="list_box">
								<view class="list_left" :data-username="item.username">
									<view class="list_pic">
										<view class="em-msgNum"
											v-if="item.unReadCount > 0 || item.unReadCount == '99+'">
											{{ item.unReadCount }}
										</view>
										<u-avatar :src="item.addInfo.clientHeadPortrait"  shape="circle" ></u-avatar>
										<!-- <image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg" mode="aspectFill"></image> -->
									</view>
									<view class="list_text">
										<!-- <text class="list_user">{{
										  item.chatType == "groupchat" ||
										  item.chatType == "chatRoom" ||
										  item.groupName
											? item.groupName
											: item.username
										}}</text> -->
										<text class="list_user"> {{item.addInfo.clientName?item.addInfo.clientName:''}} </text>
										<text class="list_word" v-if="item.msg.data[0].data">{{ item.msg.data[0].data }}</text>
										<text class="list_word" v-if="item.msg.type == 'img'">[图片]</text>	
										<text class="list_word" v-if="item.msg.type == 'audio'">[语音]</text>	
									</view>
								</view>
								<view class="list_right">
									
									<text :data-username="item.username">{{ showChatTimeStr(item.dateTimeNum )}}</text>
									<!-- <text :data-username="item.username">{{ item.time }}</text> -->
								</view>
							</view>
						</view>
					</swipe-delete>
				</view>
			</view>
			<view v-show="smTabCurrent===1" class="">
				<view class="cu-list menu-avatar no-padding">
					<view v-if="userActiveList.length === 0" style="position: fixed;bottom: 15vh;left: 300rpx;">
						<u-empty text="暂无互动记录" mode="history"></u-empty>
					</view>
					<view class="cu-item flex u-p-t-20 u-p-b-20 u-p-l-40 u-p-r-40"
						v-for="(userItem,sub) in userActiveList" :key="sub">
						<view class="cu-avatar self-avatar" style="width: 2em;height: 2em;">
							<u-avatar :src="userItem.clientHeadPortrait" mode="aspectFill"></u-avatar>
						</view>
						<view class="content">
							<view class=" flex align-center">
								<text class="text-bold text-black"> {{userItem.clientName}} </text>
								<!-- <text class="u-p-l-20 u-font-20 text-grey"> {{userItem.clientBz}}  </text> -->
							</view>
							<view class="text-gray text-sm">
								{{userItem.activeContent}}
							</view>
						</view>
						<view class="right-container" @click="customerClick0(userItem)">
							<view class="right-title">

								{{ showTimeStr(userItem.updateTime)}}
							</view>
							<!-- <view class="chat-icon u-m-r-20">
								<image src="@/static/img/personImg/news.png"></image>
							</view> -->
						</view>

					</view>
				</view>
			</view>


			<view v-show="smTabCurrent===2" class="">
				<view v-if="userList.length === 0"style="position: fixed;bottom: 15vh;left: 300rpx;">
					<u-empty text="暂无用户" mode="list"></u-empty>
				</view>
				<block v-for="(item,index) in userList" :key="index" >
					<view :class="'indexItem-' + item.indexName" :id="'indexes-' + item.indexName"  :data-index="item.indexName">
						<view class="padding u-p-l-40">{{item.indexName}}</view>
						<view class="cu-list menu-avatar no-padding">
							<view class="cu-item flex u-p-b-20 u-p-l-40 u-p-r-40" v-for="(userItem,sub) in item.list" @tap="into_singleChatRoom({username: 'jyl_client_' + userItem.id})" :data-key="userItem.id" :key="sub" >
								<view class="cu-avatar self-avatar" style="width: 2em;height: 2em;">
									<image :src="userItem.clientHeadPortrait" style="width: 100%; height: 100%;" mode="aspectFill">
									</image>
								</view>
								<view class="content">
									<view class=" flex align-center">
										<text class="text-bold"> {{userItem.clientName}} </text>
										<text class="u-p-l-20 u-font-20 text-grey"> {{userItem.clientBz}} </text>
									</view>
									<view class="text-gray text-sm">
										{{userItem.clientPhone}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
			<!-- "http://jylqndev.kaiwumace.com/1616564615000_9844.jpg" -->
			<view v-if="smTabCurrent===2" class="indexBar"
				:style="[{zIndex:'1000',bottom: (26-list.length)*15+'rpx' }]">
				<view class="indexBar-box" id="indexBarBox" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
					<view class="indexBar-item" v-for="(item,index) in list" :key="index" :id="index" @touchstart="getCur" @touchend="setCur"> {{item.name}}</view>
				</view>
			</view>
			<view v-show="!hidden" class="indexToast">
				{{listCur}}
			</view>

		</view>
		<view :class="isIPX?'chatRoom_tab_X':'chatRoom_tab'" >
			<view class="tableBar" @tap="tab_card">
				<view class="image">
					<image  src="/static/img/tabBarIcon/card.png" mode="aspectFit"></image>
				</view>
				
				<text>名片</text>
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
			
			<view class="tableBar" >
				<view class="image">
					<image  src="/static/img/tabBarIcon/personA.png" mode="aspectFit"></image>
				</view>
				
				<text style="color:#00AA00">我的</text>
			</view>
		</view>
	</view>
</template>

<script>
	let disp = require("../../utils/broadcast");
	var WebIM = require("../../utils/WebIM")["default"];

	import {
		pinyin
	} from '@/static/js/pinyin.js'
	import SalesManagerCard from '@/components/SalesManagerCard.vue'
	import swipeDelete from "../../comps/swipedelete/swipedelete";
	import {
		uniBadge
	} from '@dcloudio/uni-ui'
	import {
		previewImg,
		getSalesInfo,
		getCompanyInfo,
		userAction,
		setUserType,
		judgeUserType,
		initBaseInfo
	} from '@/static/js/common.js'

	import {
		getClientInfosByCardSalesId,
		getCardClientActiverecordByWeek
	} from '@/services/services.js'

	export default {
		data() {
			return {
				defaultSalesAvatar:'http://jylqndev.kaiwumace.com/1616555312000_5454.jpg',
				
				scrollTop: 0,
				indexList: ["#","A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
					"T", "U", "V", "W", "X", "Y", "Z"
				],
				// userType 区分用户 与销售
				userType: 0,
				companyInfo: '',
				salesManagerInfo: {},
				searchResList: [],

				isFilter: false,
				filterActiveIndex: 0, // 筛选日期被选中的  数组索引
				filterActiveList: [{
						label: '全部',
						value: 0,
					},
					{
						label: '一周',
						value: 1,
					},
					{
						label: '半个月',
						value: 2,
					},
					{
						label: '一个月',
						value: 3,
					}
				],

				smTabCurrent: 0,
				smTablist: [{
						name: '最近聊天'
					},
					{
						name: '用户访问'
					},
					{
						name: '我的客户'
					},
				],


				clientId: 2,
				salesId: 20,


				// 所有索引列表
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				hidden: true,
				sourceUserList: [],
				userList: [],
				userActiveList: [],



				list: [],
				listCur: '',

				unReadSpotNum: 0,
				
				arr: [],
				isIPX: false,
				yourname: "",
	
				// search_btn: true,
				// search_chats: false,
				// show_mask: false,
				// unReadNoticeNum: 0,
				// messageNum: 0,
				// unReadTotalNotNum: 0,
				// show_clear: false,
				// member: "",
				// gotop: false,
				// input_code: ""
			}
		},
		computed: {
			// lastChatUserAvatar(){
			// 	let lastUser = this.arr[0]
			// 	if(lastUser){
			// 		return lastUser.headPortrait
			// 	}
			// 	return this.defaultSalesAvatar
			// },
			fliterDateStr() {
				return this.filterActiveList[this.filterActiveIndex].label
			},
			filterStyle() {
				if (this.isFilter) {
					return {
						top: '100rpx',
						opacity: 1
					}
				} else {
					return '{opacity:0}'
				}
			},
			showTimeStr() {
				return (data) => {
					return this.timeDistance(data)
				}
			},
			showChatTimeStr(){
				return (data)=>{
					let fullData = data
					let nowYear = new Date()
					let YYYY = '0000'
					let MM = '00'
					let DD = '00'
					let HH = '00'
					let mm = '00'
					let ss = '00'
					let timeChuo = 0
					YYYY = nowYear.getFullYear()
					
					fullData = YYYY + data
					

					if(data.length == 10){
						fullData = YYYY + data
					}
					if(data.length<10){
						fullData = YYYY + '0'+ data
					}
					YYYY = fullData.substring(0,4)
					MM = fullData.substring(4,6)
					DD = fullData.substring(6,8)
					HH = fullData.substring(8,10)
					mm = fullData.substring(10,12)
					ss = fullData.substring(12,14)
					
					fullData = YYYY + '-' + MM + '-' + DD + ' ' + HH + ':' + mm + ':' + ss
					return this.timeDistance(fullData)
				}
			}
		},
		watch: {
			smTabCurrent(val){
				if(val===2){
					setTimeout(()=>{
							this.initWordListInfo()
					},400)
				
				}
			}
			
		},
		components: {
			swipeDelete,
			SalesManagerCard
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onLoad() {

			let me = this;
			this.initEuipment()
			//监听未读消息数
			disp.on("em.unreadspot", function(message) {
				console.log('监听未读消息')

				console.log(message)
				
				// me.getChatList()

				me.setData({
					arr: me.getChatList(),
					unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum
				});
				console.log('arr')
				console.log(me.getChatList())
			}); //监听未读加群“通知”

			disp.on("em.contacts.remove", function() {
				me.getRoster(); // me.setData({
				// 	arr: me.getChatList(),
				// 	unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum,
				// });
			});
			this.getRoster();

		},
		onReady() {
			this.initWordListInfo()
		},
		onShow() {
			this.getLocalSalesInfo()
			// this.getChatList()
			this.setData({
				arr: this.getChatList(),
				unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum,
				messageNum: getApp().globalData.saveFriendList.length,
				unReadNoticeNum: getApp().globalData.saveGroupInvitedList.length,
				unReadTotalNotNum: getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length
			});

			if (getApp().globalData.isIPX) {
				this.setData({
					isIPX: true
				});
			}
		},
		async created() {
			// this.initIndexList()
			const setBaseInfo = await initBaseInfo(this)

			this.initCompanyInfo(this.companyId)
			if (!setBaseInfo) {
				return
			}
			const getSalesInfoRes = await this.initSalesInfo(this.salesId)
			this.initSalesBinds(this.salesId)
			this.getUserActive(this.salesId)
		},
		mounted() {

		},
		methods: {
			initWordListInfo(){
				let that = this;
				const query = uni.createSelectorQuery().in(this);
				query.select('#indexBarBox').boundingClientRect(function(res) {
					console.log('RRRRRRRRRRRRRRRR')
					console.log(res)
					if (res) {
						console.log('.indexBar-box res')
						console.log(res)
						that.boxTop = res.top	
					}
				}).exec();
			},
			
			// 判断机型
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
					

						disp.fire("em.main.ready"); //systemReady = true;
						//}
						// me.getChatList()
						me.setData({
							arr: me.getChatList(),
							unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum
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
									lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`
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
						console.log('cul first array')
						console.log(array)
					}
					console.log('newChatMsgKeys')
					console.log(newChatMsgKeys)
					for (let i = 0; i < newChatMsgKeys.length; i++) {
						let newChatMsgs = uni.getStorageSync(newChatMsgKeys[i]) || [];
						console.log('newChatMsgs')
						console.log(newChatMsgs)
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
					let finaArray = []
					array.forEach(item=>{
						let boo = false
						boo = finaArray.some(item2=>{
							if(item2.username == item.username && item2.yourname == item.username){
								return true
							}
						})
						// !boo 为 true  就是 没有相同的元素
						if(!boo){
							finaArray.push(item)
						}
					})
					array = finaArray
					
					console.log('11111111array')
					console.log(array)
					// 为 每个用户添加 ，用户的其他信息
					let managerArr = array.map(item=>{
						let clientId = item.username
						console.log('item77777777777')
						console.log(item)
						console.log(getApp().globalData.localChatInfo)
						let clientInfo = getApp().globalData.localChatInfo[clientId]
						
						console.log('获取 clientInfo')
						console.log(clientInfo)
						
						item['addInfo'] = clientInfo
						return item
					})
					
					
					this.setData({
						arr: managerArr
					})
					console.log('添加额外信息之后')
					console.log(me.arr)
				}
			},
			close_mask: function() {
				this.setData({
					search_btn: true,
					search_chats: false,
					show_mask: false
				});
			},
			tab_setting: function() {
				uni.redirectTo({
					url: "../setting/setting"
				});
			},
			tab_notification: function() {
				uni.redirectTo({
					url: "../notification/notification"
				});
			},
			into_chatRoom: function(event) {
				let detail = JSON.parse(event.currentTarget.dataset.item); //群聊的chatType居然是singlechat？脏数据？ 等sdk重写后整理一下字段
				console.log('detail', detail)
				
				this.into_singleChatRoom(detail);
				
				// if (detail.chatType == 'groupchat' || detail.chatType == 'chatRoom' || detail.groupName) {
				// 	this.into_groupChatRoom(detail);
				// } else {
				// 	this.into_singleChatRoom(detail);
				// }
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
					url: "/pageChat/chatroom/chatroom?username=" + JSON.stringify(nameList)
				});
			},

			del_chat: function(event) {
				let me = this
				let detail = event.currentTarget.dataset.item;
				let nameList;

				if (detail.chatType == 'groupchat' || detail.chatType == 'chatRoom') {
					nameList = {
						your: detail.info.to
					};
				} else {
					nameList = {
						your: detail.username
					};
				}

				var myName = uni.getStorageSync("myUsername");
				// var currentPage = getCurrentPages();
				// console.log('currentPage>>',currentPage);
				uni.showModal({
					title: "删除该聊天记录",
					confirmText: "删除",
					success: function(res) {
						if (res.confirm) {
							uni.setStorageSync(nameList.your + myName, "");
							uni.setStorageSync("rendered_" + nameList.your + myName, "");

							// if (currentPage[0]) {
							//   console.log('currentPage[0]>>',currentPage[0]);
							//   const val = currentPage[0]
							//   val.onShow();
							// }
							me.getChatList()
							
							disp.fire("em.chat.session.remove");
						}
					},
					fail: function(err) {}
				});
			},
			// 使用 环信账号 返回该用户基本信息
			// 参数：(如：jyl_client_123)
			chatIdInfo(username){
				
				let index = username.lastIndexOf()+1
				let str = username.substring(index)
				let clientList = getApp().globalData.clientList
				let finaArr = clientList.forEach(item=>{
					if(item.id == str){
						return item
					}
				})
				return finaArr[0]
			},

			customerClick0(customer) {
				let customerId = customer.clientId
				let customerOpenId = customer.clientOppenId
				console.log('customer')
				console.log(customer)
				uni.navigateTo({
					url: '/pages/chatSalesManager/chatSalesManager?customerId=' + customerId
				})
			},
			customerClick1(index, sub) {
				console.log(index)
				console.log(sub)
				let firList = this.userList[index].list
				let finalItem = firList[sub]
				let customerId = finalItem.id

				let customerOpenId = finalItem.clientOppenId
				console.log('finalItem')
				console.log(finalItem)
				uni.navigateTo({
					url: '/pages/chatSalesManager/chatSalesManager?customerId=' + customerId
				})
			},
			getLocalSalesInfo(){
				try {
				    const salesValue = uni.getStorageSync('salesInfo');
				    if (salesValue) {
				        this.salesManagerInfo = salesValue
				    }
				} catch (e) {
				    // error
				}
			},
			// 初始化 销售的信息
			initSalesInfo(salesId) {
				return new Promise(async (resolve, reject) => {
					uni.showLoading({
						title: '您的销售正在路上...',
						mask: true
					})

					let data = {
						id: salesId
					}
					const getSalesInfoRes = await getSalesInfo(data)
					if (getSalesInfoRes.statu === 200) {
						this.salesManagerInfo = Object.assign({}, getSalesInfoRes.value)
						resolve(true)
					} else {
						uni.showToast({
							title: getSalesInfoRes.msg,
							icon: 'none'
						})
						resolve(false)
					}
					uni.hideLoading()
				})

			},
			// 初始化  公司信息

			async initCompanyInfo(companyId) {
				uni.showLoading({
					title: '公司信息资源获取中....',
					mask: true
				})

				let data = {
					id: companyId
				}
				const getCompanyInfoRes = await getCompanyInfo(data)
				if (getCompanyInfoRes.statu === 200) {
					this.companyInfo = getCompanyInfoRes.value
					console.log('----- company  ---')
					console.log(getCompanyInfoRes.value)
				} else {
					uni.showToast({
						title: getCompanyInfoRes.msg,
						icon: 'none'
					})
				}
				uni.hideLoading()
			},
			//  初始化 销售所绑定的 用户的信息
			async initSalesBinds(salesId) {
				let argObj = {}

				//*********！！！！！！！！！！！！
				// 这里 暂时更改 salesId

				argObj.id = salesId

				console.log('argObj')
				console.log(argObj)

				let getRes = await getClientInfosByCardSalesId(argObj)
				console.log('通过 salesId')
				console.log(getRes)

				if (getRes.statusCode === 200) {
					this.searchResList = getRes.data.data
					
					if (this.searchResList) {
						this.arrangeUserList(this.searchResList)
					}
				}
			},
			// 获取该销售 所绑定的用户的 活跃记录
			async getUserActive() {
				let dataObj = {
					saleId: this.salesId
				}
				const res = await getCardClientActiverecordByWeek(dataObj)
				if (res.statusCode === 200) {
					this.userActiveList = res.data.data
					console.log('personal  所有用户信息')
					console.log(this.userActiveList)

				}
			},
			// 
			// 用户访问 我的客户  tabbar
			smTabChange(index) {
				this.smTabCurrent = index
				this.closeFliterList()
			},

			// 跳转至 销售编辑页面
			toMangaerInfoEdit() {
				uni.navigateTo({
					url: '/pageSalesManager/salesManagerInfoEdit/salesManagerInfoEdit'
				})
			},

			// 时间差
			//	参数：时间戳
			timeDistance(oldTime, newTime) {
				if (!newTime) {
					newTime = this.moment()
				}

				if (!oldTime) {
					oldTime = this.moment(1610767485276)
				}

				const timeType = typeof oldTime
				
				if (timeType === 'String') {
					oldTime = this.moment(oldTime).unix() * 1000
				}

				let oldMoment = this.moment(oldTime)
				let newMomentStart = this.moment(newTime).startOf('day')
				let oldMomentStart = this.moment(oldTime).startOf('day')
				
				let tempTimeDay = newMomentStart.diff(oldMomentStart, 'day')
				let resStr = oldMoment.format('YYYY年MM月DD日')


				if (tempTimeDay <= 7) {
					resStr = oldMoment.format('dddd')
				}

				if (tempTimeDay === 1) {
					resStr = '昨天' + oldMoment.format('HH:mm')
				}

				if (tempTimeDay === 0) {
					resStr = oldMoment.format('HH:mm')
				}
				
				return resStr
			},
			selectFilter(index) {
				this.filterActiveIndex = index
				this.closeFliterList()
			},
			filterClick() {
				this.isFilter = !this.isFilter
			},
			// 打开下拉菜单
			openFliterList() {
				this.isFilter = true
			},
			closeFliterList() {
				this.isFilter = false
			},

			// 对 用户信息 根据名字的拼音首字母 分组
			arrangeUserList(sourceUserList) {
				const resArr = []
				let initialArr = this.returnInitObjList()
				
				console.log('initialArr')
				console.log(initialArr)
				const list = sourceUserList
				
				console.log('arrangeUserList list')
				console.log(list)
				
				
				list.forEach(item => {
					// 名字首字母
					console.log('name')
					console.log(item.clientName)
					let nameInitial = this.returnCapWord(item.clientName)
					console.log('nameInitial')
					console.log(nameInitial)
					// 如果昵称首字母 未找到与其相匹配 统一归为 
					if(!nameInitial){
							nameInitial = 'A'
					}
					// 名字首字母的索引
					let initIndex = nameInitial.charCodeAt() - 'A'.charCodeAt()
					console.log('initIndex')
					console.log(initIndex)
					console.log(initialArr[initIndex])
					if(initialArr[initIndex].hasOwnProperty('list')){
						initialArr[initIndex].list.push(item)
					}
				})
				let flitObj = this.flitUserList(initialArr)
				this.userList = flitObj.userArr
				console.log('arrange userList')
				console.log(this.userList)
				this.list = flitObj.wordArr
			},
			// 返回 首字母的 列表  （纯函数）
			returnInitObjList() {
				const arr = []
				// 用以存放要展示的 用户列表
				for (let i = 0; i < 26; i++) {
					const num = 65 + i
					const word = String.fromCharCode(num)
					const obj = {
						indexName: word,
						list: []
					}
					arr.push(obj)
				}
				return arr
			},
			// 过滤掉 首字母数组中没有数据的那一项
			// 
			flitUserList(list) {
				const wordArr = []
				const userArr = list.filter(item => {
					//	用以存放 通讯录左边的导航栏
					if (item.list.length !== 0) {
						const obj = {}
						obj.name = item.indexName
						wordArr.push(obj)
						return true
					}
				})
				return {
					userArr,
					wordArr
				}
			},
			// 返回汉字的拼音 首字母
			returnCapWord(wordStr) {
				if (!wordStr) {
					return 'A'
				}


				wordStr = wordStr.trim()
				let pinyinStr = pinyin(wordStr)
				let initial = pinyinStr.slice(0, 1).toUpperCase()
				return initial
			},
			// 通讯录 页面的跳转
			scrollPage(indexName) {
				console.log('scrollPage')
				let me = this;
				var query = wx.createSelectorQuery().in(me);
				query.selectViewport().scrollOffset()
				query.select("#customNav").boundingClientRect();
				query.select("#indexes-" + indexName).boundingClientRect();
				query.exec(function(res) {
					var miss = res[2].top + res[0].scrollTop - res[1].height;
					console.log('missMMMMMMMMMMMM')
					console.log(miss)
					uni.pageScrollTo({
						scrollTop: miss,
						duration: 300
					});
				});
			},
			// 初始化 左边的导航栏 list
			initIndexList() {
				let list = [{}];
				for (let i = 0; i < this.userList.length; i++) {
					list[i] = {};
					list[i].name = this.userList[i].indexName
				}
				this.list = list;
				this.listCur = list[0];
			},
			// 保存通讯录的 额外操作
			// 因为只是单方面的对 销售的信息操作，不涉及后台
			onMailList() {
				userAction(this.clientId, this.salesId, 3)
			},


			// 获取用户手机号码
			getPhoneNum(e) {
				console.log(e)
			},
			
			// 拨打电话
			phoneCall() {
				uni.makePhoneCall({
					phoneNumber: this.salesManagerInfo.phone,
					success(res) {
						console.log('makePhoneCall success')
						console.log(res)
					},
					fail(res) {
						console.log('makePhoneCall fail')
						console.log(res)
					}
				})
			},
			// 添加联系人
			addPhonePerson() {
				uni.addPhoneContact({
					nickName: this.salesManagerInfo.name,
					mobilePhoneNumber: this.salesManagerInfo.phone, //手机号
					email: this.salesManagerInfo.mail,
					success(res) {
						console.log('success addPhoneContact');
						console.log(res)
					},
					fail(res) {
						console.log('fail addPhoneContact');
						console.log(res)
					}
				});
			},
			// 前往用户列表详情
			toUserListDetail() {
				uni.navigateTo({
					url: '/pageSalesManager/contactUserList/contactUserList'
				})
			},
			// 前往用户资料中心
			toPersonEdit() {
				uni.navigateTo({
					url: '/pageSalesManager/personInfoEdit/personInfoEdit'
				})
			},



			// 前往名片详情
			toCardDetail() {
				console.log('------------------')
				uni.navigateTo({
					url: '/pages/salesManager/salesManager'
				})
			},
			// 索引列表
			//获取文字信息
			getCur(e) {
				this.hidden = false;
				this.listCur = this.list[e.target.id].name;
			},
			setCur(e) {
				this.hidden = true;
				// this.listCur = this.listCur
			},
			//滑动选择Item
			tMove(e) {
				let y = e.touches[0].clientY,
					offsettop = this.boxTop,
					that = this;
				//判断选择区域,只有在选择区才会生效
				if (y > offsettop) {
					let num = parseInt((y - offsettop) / 14);
					if (num < this.userList.length) {
						this.listCur = that.list[num].name
						console.log('listCur')
						console.log(this.listCur)
					}
				};
			},
			//触发全部开始选择
			tStart() {
				console.log('触发开始')
				console.log('sSSSSSSSSSS')
				this.hidden = false
			},
			//触发结束选择
			tEnd() {
				console.log('触发结束')
				console.log('EEEEEEEEEEEEEEEEEE')
				this.hidden = true;
				this.scrollPage(this.listCur)
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
			tab_product() {
			  uni.redirectTo({
				url: "/pageScond/products/products"
			  });
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	/*  全局CSS */
	.underLine {
		text-decoration: underline;
	}

	.padding-left {
		padding-right: 10rpx;
	}

	.person-contain {
		min-height: 100vh;
		width:100%;
		overflow-x:hidden;
		padding: 20rpx 0;
		background-color: #F8F8F9;
		padding-bottom: 182rpx;
	}

	.person-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 700rpx;
		height: 200rpx;
		margin: auto;
		border-radius: 10rpx;
		background-color: #FFF;
		padding: 20rpx;

	}

	.person-head .content {
		display: flex;
		flex-flow: column nowrap;
		align-items: flex-start;
	}

	.person-head .right {
		height: 100%;
		display: flex;
		align-items: center;
		padding-right: 36rpx;
	}

	.avatar {
		width: 4em;
		height: 4em;
		border-radius: 50%;
		overflow: hidden;
		background-color: #FFF;
	}

	.avatar image {
		width: 100%;
		height: 100%;
	}

	.sale-card {
		position: relative;
		display: flex;
		width: 700rpx;
		height: 370rpx;
		margin: auto;
		border-radius: 20rpx;
		background-color: #FFF;
	}

	.sale-card .left {
		width: 250rpx;
		height: 100%;
		border-radius: 20rpx 0 0 20rpx;
		overflow: hidden;
	}

	.sale-card .absolute-right-icon {
		position: absolute;
		left: 300rpx;
		top: 0;
		font-size: 5em;
	}

	.sale-card .right {
		flex-basis: 1;
		flex-grow: 1;
		padding: 20rpx;
	}

	/* 索引列表 */
	.page {
		padding-top: 100upx;
	}

	.indexes {
		position: relative;
	}

	.indexBar {
		position: fixed;
		right: 0px;
		bottom: 50rpx;
		padding: 20upx 20upx 20upx 60upx;
		display: flex;
		align-items: center;
	}

	.indexBar .indexBar-box {
		width: 40upx;
		height: auto;
		background: #fff;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
		border-radius: 10upx;
	}

	.indexBar-item {
		flex: 1;
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		color: #888;
	}

	movable-view.indexBar-item {
		width: 40upx;
		height: 40upx;
		z-index: 9;
		position: relative;
	}

	movable-view.indexBar-item::before {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		top: 10upx;
		height: 20upx;
		width: 4upx;
		background-color: #f37b1d;
	}

	.indexToast {
		position: fixed;
		top: 0;
		right: 80upx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
		margin: auto;
		color: #fff;
		line-height: 100upx;
		text-align: center;
		font-size: 48upx;
	}

	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
	}

	.sm-bar-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #FFFFFF;
		padding: 20rpx 50rpx;

		.main {
			z-index: 1000;
			flex-basis: 1;
			flex-grow: 1;
		}

		.right-icon {
			z-index: 1000;
			padding: 20rpx 30rpx;
			background-color: #FFFFFF;
		}

	}

	.filter-list {
		position: absolute;
		z-index: 10;
		left: 0;

		top: 0rpx;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-around;
		width: 100%;
		height: 100rpx;
		padding: 20rpx;
		background-color: #FFFFFF;
		transition: all .5s;
		opacity: 0;
	}

	.filter-list-active {
		top: 100rpx;
		opacity: 1;
	}


	image {
		width: 100%;
		height: 100%;
	}

	.right-container {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;

		min-width: 6em;
		padding: 10rpx;
		text-align: center;

		.chat-icon {
			width: 2em;
			height: 2em;
			padding: .2em;
		}

		.right-title {
			color: #999999;
		}
	}


	// 聊天记录
	.tap_mask {
		width: 100%;
		background-color: #FFFFFF;
		overflow: hidden;
	}

	.list_box {
		margin: 0 32rpx;
		height: 126rpx;
		border-bottom: 0.5px #E5E5E5 solid;
		display: flex;
	}

	.list_left {
		width: 63%;
		height: 100%;
		float: left;
		display: flex;
		flex-direction: row;
		align-items: center;
		flex: 1;
	}

	.list_text {
		width: 60%;
		height: 100%;
		float: left;
		font-size: 28rpx;
	}

	.list_pic {
		width: 88rpx;
		height: 88rpx;
		border-radius: 13rpx;
		overflow: hidden;
		margin-right: 20rpx;
	}

	.list_pic image {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 13rpx;
	}

	.list_user {
		font-size: 34rpx;
		color: #000;
		position: relative;
		top: 22rpx;
		overflow: hidden;
		width: 350rpx;
		display: inline-block;
		text-overflow: ellipsis;
	}

	.em-msgNum {
		position: absolute;
		right: 32rpx;
		top: 76rpx;
		min-width: 28rpx;
		height: 28rpx;
		border-radius: 14rpx;
		background: #f04134;
		color: #fff;
		line-height: 28rpx;
		font-size: 24rpx;
		text-align: center;
	}

	.list_word {
		height: 40rpx;
		display: block;
		margin-top: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		position: absolute;
		width: 70%;
		font-size: 24rpx;
		color: #9B9B9B;
		top: 66rpx;
	}

	.list_right {
		width: 240rpx;
		height: 100%;
		float: right;
		font-size: 24rpx;
		text-align: right;
	}

	.list_right text:first-child {
		display: block;
		line-height: 60rpx;
		margin: 12rpx auto auto auto;
	}

	.list_right text:last-child {
		height: 40rpx;
		font-size: 26rpx;
		color: #CFCFCF;
		display: block;
		margin-top: 4rpx;
	}
</style>
