<template>
	<view class="contain" >
	
		<FixedChat  :userType="userType" :toChatId="toChatId" :newsCount="unReadSpotNum"/>
		<cu-custom bgColor="bg-white" >
			<!-- <block slot="backText">返回</block> -->
			<block slot="content"> <text> {{companyInfo.companyName}} </text> </block>
		</cu-custom>
		<u-swiper :list="bannerList" height="400" name="url" @click="viewBannerBigImg"></u-swiper>
<!-- 		<view class="">
			<swiper 
				:class="'square-dot'" 
				:indicator-dots="true" 
				:circular="true" 
				:autoplay="true" 
				height="200"
				interval="5000" 
				duration="500">
				<swiper-item v-for="(item,index) in bannerList" :key="index"  >
					<image :src="item.url" mode="aspectFill" @click="viewBannerBigImg(index)"></image>
				</swiper-item>
			</swiper>
		</view> -->
		<!-- <u-gap  bg-color="#efefef"></u-gap> -->
		<view class="introduce-card add-introduce-card" >
			<view class="card-head">
				<view class="icon-container">
					<image src="@/static/img/company/company.png"></image>
				</view>
				公司介绍	
			</view>
			<view class="content min-height-300">
				<view class="">
					<text selectable="true"> {{companyInfo.companyWordIntroduce}} </text>
				</view>
			</view>			
		</view>

		<!-- <view class="padding bg-white">
			<view class="bg-white self-bold">
				公司简介
			</view>
			<view class="padding-sm">
				{{companyInfo.companyWordIntroduce}}
			</view>
		</view> -->
<!-- 		<view class="self-card bg-white">
			<view class="card-head">
				<view class="avatar">
					<image :src="companyInfo.companyLogo" mode="widthFix"></image>
				</view>
				<view class="main">
					{{companyInfo.companyName}}
				</view>
				<view class="right">
					<button class="cu-btn block line-green"> 关注 </button>
				</view>
			</view>
			<view class="card-content solid-bottom text-df text-gray">
				{{companyInfo.companyManifesto}}
			</view>
		</view> -->
<!-- 		<view class=" flex justify-between padding-sm margin-top bg-white">
			<text class="  text-lg text-bold"> 公司产品 </text> 
			<view class="">
				<text class="text-lg text-gray"> 更多  </text>
				<text class="lg text-gray" :class="cuIcon-right"></text>
			</view>
		</view> -->
		<view class="reduce-introduce-crad">
			<view class="img-container " v-for="(item,index) in introduceList" :key="index" @tap="viewIntroduceBigImg(index)">
				<u-image   :src="item" mode="widthFix" ></u-image>
				<!-- <view class="brief"> 这里是对图片的说明  </view> -->
			</view>
			<view class="u-text-center" v-if="introduceList.length === 0 || !introduceList">
				<u-empty text="公司信息走丢了" mode="list"></u-empty>
			</view>
		</view>
		
		<view class="company-bottom" :style="{bottom:pageScrollTop===0?'':'-448rpx'}">
			<view class="card-head">
				<view class="icon-container">
					<image src="@/static/img/company/address.png"></image>
				</view>
				联系我们
			</view>
			
			<!-- <view class="head u-border-bottom">
				联系我们
			</view> -->
			<view class="bottom-item">
				<view class="title">
					地址:
				</view>
				<view class="content" >
					<text selectable="true"> {{companyInfo.companyAddress}} </text>
					
				</view>
			</view>
			<u-gap bg-color="#efefef" height="20"></u-gap>
			<view class="bottom-item">
				<view class="title">
					联系电话:
				</view>
				<view class="content">
					<text selectable="true">
						{{companyInfo.companyPhone}}
					</text>
				</view>
			</view>
			<u-gap bg-color="#efefef" height="40"></u-gap>
		</view>
		
		<!-- <view class="text-gray text-center padding-sm" > 没有更多了 </view> -->
		
		
		<view :class="isIPX?'chatRoom_tab_X':'chatRoom_tab'" >
			<view class="tableBar" @tap="tab_card">
				<view class="image">
					<image  src="/static/img/tabBarIcon/card.png" mode="aspectFit"></image>
				</view>
				
				<text>名片</text>
			</view>
		
			<view class="tableBar">
				<view class="image">
					<image  src="/static/img/tabBarIcon/homeA.png" mode="aspectFit"></image>
				</view>
				
				<text style="color:#00AA00"> 企业介绍 </text>
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
	</view>
</template>

<script>
	let disp = require("../../utils/broadcast");
	var WebIM = require("../../utils/WebIM")["default"];
	import ItemCard  from '@/components/ItemCard'
	import FixedChat from '@/components/FixedChat.vue'
	import {previewImg,getSalesInfo,getCompanyInfo,userAction,initBaseInfo} from '@/static/js/common.js'
	export default {
		data() {
			return {

				unReadSpotNum: 0,
				arr: [],
				isIPX:false,
				
				
				salesId: -1,
				userType:-1,
				companyId:-1,
				// 公司简介
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

				swiperList: [{
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

				salesManagerInfo:'',
				companyInfo:{
					companyWordIntroduce:'',
					companyAddress:'',
					companyPhone:'',
					companyName:''
				},
				bannerList:[],
				bannerImgList:[],
				introduceList:[],
				pageScrollTop:0,
				//  "id": 1,
				// "companyPhone": "3",
				// "companyAddress": "3",
				// "companyMailbox": "3",
				// "companyName": "3",
				// "companyLogo": "3",
				// "companyManifesto": "3",
				// "companyWordIntroduce": "3",
				// "companyVoiceIntroduce": "3",
				// "companyImagesIntroduce": "3",
				// "createTime": "2021-01-05 06:28:52",
				// "updateTime": "2021-01-07 19:22:00",
				// "deleted": 1
				toChatId:null
			}
		},
		
		onPageScroll(res) {
				this.pageScrollTop = res.scrollTop
		},
		
		
		onShow() {
			this.getComanyInfoLocal()
			this.setData({
			  arr: this.getChatList(),
			  unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum,
			 
			});
			
			if (getApp().globalData.isIPX) {
			  this.setData({
			    isIPX: true
			  });
			}
		},
		onShareAppMessage() {
			return {
				title: '快来分享',
				path: '/pages/index/index'
			}
		},
	  onLoad () {
		let me = this; 
		

		
		//监听未读消息数
		disp.on("em.unreadspot", function (message) {
			console.log('监听未读消息 index')
			
		  // me.getChatList()
		  me.setData({
			arr: me.getChatList(),
			unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum
		  });
		}); //监听未读加群“通知”


		this.getRoster();
	  },
		async created() {
			
			const getBaseInfo = await initBaseInfo(this)
			this.initCompanyInfo(this.companyId)
			
			
			if(!getBaseInfo){
				return false
			}
			
			// const getSalesInfoRes = await this.initSalesInfo(this.salesId)
		},
		methods: {
		
			listGroups() {
			    var me = this;
			    return WebIM.conn.getGroup({
			      limit: 50,
			      success: function (res) {
			        uni.setStorage({
			          key: "listGroup",
			          data: res.data
			        });
			        me.getChatList();
			      },
			      error: function (err) {
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
			getChatList(){
					var myName = uni.getStorageSync("myUsername");
					var array = [];
					const me = this
					uni.getStorageInfo({
						success: function(res){
			      let storageKeys = res.keys
							let newChatMsgKeys = [];
							let historyChatMsgKeys = [];
							storageKeys.forEach((item) => {
								if (item.indexOf(myName) > -1 && item.indexOf('rendered_') == -1) {
									newChatMsgKeys.push(item)
								}else if(item.indexOf(myName) > -1 && item.indexOf('rendered_') > -1){
									historyChatMsgKeys.push(item)
								}
							})
			
						  cul.call(me, newChatMsgKeys, historyChatMsgKeys)
						}
					})
			
					function cul(newChatMsgKeys, historyChatMsgKeys){
						let array = []
						let lastChatMsg;
						for(let i = 0; i < historyChatMsgKeys.length; i++){
							let index = newChatMsgKeys.indexOf(historyChatMsgKeys[i].slice(9))
							if ( index > -1 ) {
			        let newChatMsgs = uni.getStorageSync(newChatMsgKeys[index]) || [];
								if(newChatMsgs.length){
									lastChatMsg = newChatMsgs[newChatMsgs.length - 1];
									lastChatMsg.unReadCount = newChatMsgs.length;
									if(lastChatMsg.unReadCount > 99) {
										lastChatMsg.unReadCount = "99+";
									}
									let dateArr = lastChatMsg.time.split(' ')[0].split('-')
									let timeArr = lastChatMsg.time.split(' ')[1].split(':')
									let month = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2]
									lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`
									lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`
									newChatMsgKeys.splice(index, 1)
								}else{
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
							}else{
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
			
						for(let i = 0; i < newChatMsgKeys.length; i++){
							let newChatMsgs = uni.getStorageSync(newChatMsgKeys[i]) || [];
							if(newChatMsgs.length){
								lastChatMsg = newChatMsgs[newChatMsgs.length - 1];
								lastChatMsg.unReadCount = newChatMsgs.length;
								if(lastChatMsg.unReadCount > 99) {
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
			
			

			  into_chatRoom: function (event) {
			    let detail = JSON.parse(event.currentTarget.dataset.item); //群聊的chatType居然是singlechat？脏数据？ 等sdk重写后整理一下字段
					console.log('detail', detail)
			    if (detail.chatType == 'groupchat' || detail.chatType == 'chatRoom' || detail.groupName) {
			      this.into_groupChatRoom(detail);
			    } else {
			      this.into_singleChatRoom(detail);
			    }
			  },
			  //	单聊
			  into_singleChatRoom: function (detail) {
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
		
		

			// 初始化 销售的信息
			initSalesInfo(salesId){
				return new Promise(async (resolve,reject)=>{
					
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
				})
				
			},
			
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
					this.getCompanyInfoAfter(getCompanyInfoRes.value)
				}else{
					uni.showToast({
						title: getCompanyInfoRes.msg,
						icon:'none'
					})
				}
			},
			// 从本地缓存中获取 公司信息
			getComanyInfoLocal(){
				try {
				    const value = uni.getStorageSync('companyInfo');
				    if (value) {
				        this.companyInfo = value
				    }
				} catch (e) {
				    // error
				}
			},
			// 获取公司信息后 分配 this 其他各值
			getCompanyInfoAfter(companyInfoRes){
				let banneres = companyInfoRes.slideshow.split(',')
				let companyIntroduceImgList = companyInfoRes.companyImagesIntroduce.split(',')
				banneres = banneres.map(item=>{
					let obj = {}  
					obj.url = item
					return obj
				})
				this.bannerList = banneres
				this.introduceList = companyIntroduceImgList
				
				this.arrangeBannerImgList()
				
			},
			// 整理出 轮播图 数组（ 数组仅为 图片连接 ）
			arrangeBannerImgList(){
				let imgList = this.bannerList.map(item=>{
					return item.url
				})
				this.bannerImgList = imgList
			},
			// 轮播图大图
			viewBannerBigImg(index){
				console.log('bannerItem click')
				uni.previewImage({
					current:index,
					urls:this.bannerImgList,
				})
			},
			// 公司介绍图片大图
			viewIntroduceBigImg(index){
				console.log('bannerItem click')
				uni.previewImage({
					current:index,
					urls:this.introduceList,
				})
			},
			
			
			// tableBar
			tab_card() {
			  uni.redirectTo({
				url: "/pages/salesManager/salesManager"
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
		components:{
			ItemCard,
			FixedChat,
		}
	}
</script>

<style lang="scss" scoped>
	.contain{
		width: 100%;
		min-height: 100vh;
		padding-bottom: 500rpx;
		background-color: #FFFFFF;
	}
	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
	}
	
	/*  精彩图册  */
	.img-container{
		position: relative;
		width: 710rpx;
	/* 	height: 380rpx; */
		padding: 20rpx;
		margin: auto;
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
	// 对 introduce-card 增加样式
	.add-introduce-card{

	}
	.reduce-introduce-crad{
		
	}
	// .self-card{
	// 	padding: 10rpx 20rpx;
	// 	border-radius: 10rpx;
	// 	.card-head{
	// 		display: flex;
	// 		align-items: center;
	// 		padding: 10rpx 20rpx;
	// 		.avatar{
	// 			width: 3em;
	// 			height: 3em;
	// 			border-radius: 50%;
	// 			overflow: hidden;
	// 			image{
	// 				width: 100%;
	// 				height: 100%;
	// 			}
				
	// 		}
	// 		.main{
	// 			flex-basis: 1;
	// 			flex-grow: 1;
	// 			font-size: 1.5em;
	// 			font-weight: bold;
	// 			padding-left: 20rpx;
	// 		}
	// 		.right{
	// 			min-width: 4em;
	// 		}
	// 	}
	// 	.card-content{
	// 		padding:  20rpx;
	// 	}
	// }
	
	.company-bottom{
		position: fixed;
		bottom: 90rpx;
		left: 0;
		width: 100%;
		height: 418rpx;
		border-bottom: 50rpx;
		// padding-bottom: 28rpx;
		border-radius: 30rpx 30rpx 0 0;
		// background-color: #F6F6F6;
		background-color: #FFFFFF;
		transition: bottom .5s ease-out;
		.head{
			font-weight: bold;
			height: 70rpx;
			padding: 20rpx 50rpx;
		}
		.bottom-item{
			width: 750rpx;
			height: 120rpx;
			padding: 20rpx 40rpx;
			border-radius: 10rpx;
			// box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
			background-color: #FFFFFF;
			.title{
				height: 35rpx;
				font-size: .8em;
				color: #666666;
			}
			.content{
				height: 35rpx;
				padding-top: 5rpx;
				color: #666666;
			}
		}
	}
	.min-height-300{
		min-height: 300rpx;
	}
</style>
