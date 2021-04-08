<template>
	<view style="min-height: 100vh;overflow: hidden;padding-top: 120rpx;">
	<!-- 	<view class="bg-white" :style="{position:'fixed',zIndex:'10000',top:1000+'px' }">
			 -->
			<!-- <cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block><block slot="content">聊天</block></cu-custom> -->
		<u-navbar :is-back="true" :is-fixed="true" :title="clientName" height="44" :background="{background: '#ffffff' }">
		</u-navbar>
	
		<!-- :style="[{position:'relative',bottom:InputBottom+'px',transition:'all 0s' }]" -->
		<view class="chat-head shadow" :style="{top:44  + statusBarHeight +'px',zIndex:'10000' }">
			<view class="head-item" @click="callPhone">
				<view class="img-container">
					<image src="@/static/img/chatImg/call.png" mode="widthFix"></image>
				</view>
				<text> 打电话 </text>
			</view>
			<view class="head-item" @click="copyWxId">
				<view class="img-container">
					<image src="@/static/img/chatImg/wexin.png" mode="widthFix"></image>
				</view>
				<text> 加好友 </text>
			</view>
			<view class="head-item"  @click="toSetCustomerLabel">
				<view class="img-container">
					<image src="@/static/img/chatImg/remarks.png" mode="widthFix"></image>
				</view>
				<text> 备注/标签 </text>
			</view>
			<view class="head-item" @click="toCustomerRecord">
				<view class="img-container">
					<image src="@/static/img/chatImg/record.png" mode="widthFix"></image>
				</view>
				<text> 用户追踪 </text>
			</view>
		</view>
		<scroll-view :scroll-top="scrollViewTop" :style="{height:scrollViewHeight}" id="scrollView" scroll-y="true" >
			<view class="cu-chat" id="cuChat" >
				<view class="cu-item self">
					<view class="main">
						<view class="content bg-green shadow">
							<text>喵喵喵！喵喵喵！喵喵喵！喵喵！喵喵！！喵！喵喵喵！</text>
						</view>
					</view>
					<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				</view>
				<view class="text-center text-gray">
					2018年3月23日 13:23
				</view>
				<!-- <view class="cu-info round">对方撤回一条消息!</view> -->
				<view class="cu-item">
					<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
					<view class="main">
						<view class="content shadow">
							<text>喵喵喵！{{InputBottom}}</text>
						</view>
					</view>
				</view>
				<view class="cu-info">
					<text class="cuIcon-roundclosefill text-red "></text> 对方拒绝了你的消息
				</view>
				<view class="cu-info">
					对方开启了好友验证，你还不是他(她)的好友。请先发送好友验证请求，对方验证通过后，才能聊天。
					<text class="text-blue">发送好友验证</text>
				</view>
				<view class="cu-item self">
					<view class="main">
						<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" class="radius" mode="widthFix"></image>
					</view>
					<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				</view>
				<view class="cu-item self">
					<view class="main">
						<view class="action text-bold text-grey">
							3"
						</view>
						<view class="content shadow">
							<text class="cuIcon-sound text-xxl padding-right-xl"> </text>
						</view>
					</view>
					<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				</view>
				
				<view class="cu-item self">
					<view class="main">
						<view class="action">
							<text class="cuIcon-locationfill text-orange text-xxl"></text>
						</view>
						<view class="content shadow">
							喵星球，{{topCount}}
						</view>
					</view>
					<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				</view>
				
				<view class="cu-item" id="info-history-last">
					<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
					<view class="main">
						<view class="content shadow">
							{{InputBottom}}
						</view>
						<view class="action text-grey">
							<text class="cuIcon-warnfill text-red text-xxl"></text> <text class="text-sm margin-left-sm">翻译错误</text>
						</view>
					</view>
				</view>
				
				<!-- 新的聊天消息列表 -->
				<view v-for="(item,index) in infoList" :key="index" :id="'info-'+index" :class="['cu-item',item.userType===0?'self':'' ]">
					<view v-if="item.userType===1" class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
					<view class="main">
						<view class="content shadow">
							{{item.content}}
						</view>
					</view>
					<view v-if="item.userType===0" class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
				</view>
			</view>
		</scroll-view>
		


		<!-- :style="[{bottom:InputBottom+'px',transition:'all 0s' }]" -->
		
		<view class="cu-bar foot" style="position: static;height: 180rpx">
			<!-- <view class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view> -->
			<view class="">
				<input 
					class="solid-bottom chat-input"  
					type="text"
					confirm-type="send" 
					:confirm-hold="true"
					:auto-focus="true" 
					v-model="inputV"  
					hold-keyboard 
					:adjust-position="false"  
					maxlength="300" 
					cursor-spacing="50" 
					@keyboardheightchange="keyboardHeight"
					@confirm="submit"
					@focus="InputFocus"  
					@blur="InputBlur"></input>
			</view>
			<view class="chat-iconList">
				<view class="icon-item">
					<image src="../../static/img/chatImg/chat-audio.png" mode="aspectFill"></image>
				</view>
				<view class="icon-item">
					<image src="../../static/img/chatImg/chat-smile.png" mode="aspectFill"></image>
				</view>
				<view class="icon-item">
					<image src="../../static/img/chatImg/chat-img.png" mode="aspectFill"></image>
				</view>
				<view class="icon-item">
					<image src="../../static/img/chatImg/chat-camera.png" mode="aspectFill"></image>
				</view>
				<!-- <view class="icon-item">
					<image src="../../static/img/chatImg/chat-smile.png" mode="aspectFill"></image>
				</view> -->
			</view>
			
			
			
		<!-- 	<view class="action">
				<text class="cuIcon-emojifill text-grey"></text>
			</view>
			<button class="cu-btn bg-green shadow" @tap="submit">发送</button> -->
		</view>
		<view class="" :style="{height: (InputBottom) +'px'} ">
			
		</view>
	</view>
</template>

<script>
	let systemInfo = uni.getSystemInfoSync();
	import { getUserInfo,getUserInfoByClientId } from '@/services/services.js'
	import {initBaseInfo,userAction} from '@/static/js/common.js'
	
	export default {
		data() {
			return {
				companyId:-1,
				userOpenId:-1,
				salesId:-1,
				clientId:-1,
				userId:-1,
				userInfo:'',
				clientName:'',
				  // "data": {
				  //   "id": 105,
				  //   "clientName": "唐",
				  //   "clientBz": "客户",
				  //   "clientPhone": "17984841891",
				  //   "clientAddress": "NanchangJiangxi",
				  //   "clientMailbox": "17984841891@qq.com",
				  //   "clientWx": "as12312",
				  //   "clientHeadPortrait": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoIpjT9rusL9lkqKlvoicBChXBhS9vtogQM1gbUHkNLtFibGBas0ZqYUGicocxhUcg2iaMqwMnicF6yG4w/132",
				  //   "clientLable": "asdaad"
				  // }
				
				scrollViewTop:0,
				fixedInputBottom:0,
				InputBottom: 0,
				inputV:'',
				infoList:[
					{userType:0,infoType:'text',content:'奉公守法公司的风格',},
					{userType:0,infoType:'text',content:'规划局饭锅和豆腐干司的风格',},
					{userType:0,infoType:'text',content:'高合金钢法公法国红酒发过火',},
					{userType:0,infoType:'text',content:'电饭锅好地方法公司的风格',}
				],
				topCount:-1,
				statusBarHeight: systemInfo.statusBarHeight,
				
			};
		},
		computed:{
			paddingTopStr(){
				const px =  wx.getSystemInfoSync().windowWidth / 750 * 220
				return this.statusBarHeight  + px +'px'
			},
			scrollViewHeight(){
				let str = `calc(100vh - ${this.statusBarHeight + 'px'} - 44px - 120rpx - 180rpx )`
				console.log('scorllview height')
				console.log(str)
				return str 
			},
		},
		async onLoad(options){
			console.log('chat options')
			console.log(options)
			// if(options.customerOpenId){
			// 	this.userOpenId = options.customerOpenId
			// }else{
			// 	uni.showToast({
			// 		title:'用户不存在 openId',
			// 		icon:'none'
			// 	})
			// 	return 
			// }
			this.initScrollTop()
			if(options.customerId){
				
				const setBaseInfo = await initBaseInfo(this)
				// 因为 initBaseInfo 会从本地缓存中或 clientId,但是 本地缓存中的 clientId 是使用者的（这里就应该是销售的 clientId)
				this.userId = options.customerId
				console.log('chatSalesManager setBaseInfo')
				console.log(setBaseInfo)
				
				if(setBaseInfo){
					this.initUserInfo()
				}
			}else{
				uni.showToast({
					title:"未获取到用户id",
					icon:'none'
				})
			}
			
		},
		created() {
			// this.scrollPage('#cuChat',100000)
			
		},
		mounted() {
			
		},
		methods: {
			// 前往设置 用户标签页
			toSetCustomerLabel(){
				uni.navigateTo({
					url:'/pages/setCustomer/setCustomerLabel?customerId='+this.userId
				})
			},
			// 用户追踪情况页面
			toCustomerRecord(customerId){
				uni.navigateTo({
					url:'/pages/setCustomer/customerRecord?customerId='+this.userId
				})
			},
			// 初始化用户信息
			async initUserInfo(){
				
				
				const getUserRes = await getUserInfoByClientId({clientId: this.userId})
				if(getUserRes.statusCode === 200){
					let data = getUserRes.data.data
					this.userInfo = data
				}
			},
			callPhone(){
				let phoneNum = this.userInfo.clientPhone
				if(phoneNum&&phoneNum.length!==11){
					uni.showModal({
						title:'拨号提示',
						content:'您确认拨打电话：'+ this.salesManagerInfo.salesPhone+' 吗？',
						success: (res) => {
							if(res.confirm){

								uni.makePhoneCall({
									phoneNumber: phoneNum,
									success(res) {
										console.log('makePhoneCall success')
										console.log(res)
									},
									fail(res){
										console.log('makePhoneCall fail')
										console.log(res)
									}
								})
								
							}
						}
					})
				}else{
					uni.showToast({
						title:'该用户暂未有电话号码',
						icon:'none'
					})
				}
			},
			// 复制微信号
			copyWxId(){
				if(!this.userInfo.clientWx){
					uni.showToast({
						title:'该用户暂无微信号',
						icon:'none'
					})
					return false
				}
				
				uni.setClipboardData({
					data: this.userInfo.clientWx,
					success: ()=>{
						uni.showToast({
							title:'成功复制微信号',
						})
						// userAction(this.clientId,this.salesId,4)
					},
					fail:()=>{
						console.log('复制失败')
					}
				})
			},
			// 发送信息时,页面做相应的滚动
			initScrollTop(){
				this.scrollViewTop = 1000
			},
			InputFocus(e) {
				// this.inputFocus = true
				// this.InputBottom = e.detail.height  
				// this.fixedInputBottom =  e.detail.height

				let lastIndexId = '#info-'+(this.infoList.length -1)
				// this.scrollPage('#info-history-last',200*this.infoList.length)
				this.scrollPage('#scrollView',this.InputBottom)
				// this.initScrollTop()
			},
			InputBlur(e) {
				// this.inputFocus = false
				// this.InputBottom = 0
			},
			keyboardHeight(e){
				console.log('键盘高度发生变化')
				console.log(e)
				this.InputBottom = e.detail.height
			},
			
			submit(){
				const info = this.inputV.trim()
				if(!info){
					return 
				}	
				// this.inFocus = true
				let noramlNewsModel = {userType:0,infoType:'text',content:'',}
				let newsObj = noramlNewsModel
				newsObj.content = info
				this.inputV = ''
				this.infoList.push(newsObj)
				let lastIndexId = '#info-'+(this.infoList.length -1)
				this.scrollViewTop =  this.scrollViewTop + 250*this.infoList.length
				console.log('scrollview height ')
				console.log(this.scrollViewTop)
				this.scrollPage('#scrollView',this.InputBottom)
				// this.scrollPage('#info-history-last',200*this.infoList.length)
			},
			scrollPage(indexName,height){
				let me = this;
				var query = wx.createSelectorQuery().in(me);
				query.selectViewport().scrollOffset()
				
				query.select(indexName).boundingClientRect();
				query.exec(function (res) {
				 var miss =  res[1].top + res[0].scrollTop + height
				 console.log('dddddddddddddddd')
				 console.log(miss)
				 uni.pageScrollTo({
				  scrollTop: miss,
				  duration: 300
				 });
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
page{
	padding-top: 120rpx;
	padding-bottom: 100rpx;
}
.chat-head{
	position: fixed;
	
	left: 0;
	display: flex;
	justify-content: space-around;
	height: 120rpx;
	width: 100%;
	padding: 20rpx 30rpx;
	background-color: #FFFFFF;
	
	.head-item{
		width: 100rpx;
		text-align: center;

		.img-container{
			width: 50rpx;
			height: 50rpx;
			margin: auto;
			
			image{
				width: 100%;
				height: 100%;
			}

		}
		text{
			font-size: .8em;
			color: $uni-text-color-grey;
		}

	}
	
}
.cu-item{
	.content{
		min-width: 4em;
	}
}
.cu-chat {
	.self{
		.main{
			.content{
				background-color: #81F881;
			}
		}
	
	}
}


.cu-bar{
	display: flex;
	flex-flow: column nowrap;
	padding: 20rpx 0;
	.chat-input{
		width: 700rpx;
		height: 70rpx;
		line-height: 60rpx;
		transition: all 1s 1s; 
		border-radius: 50rpx;  
		border: 2rpx solid #bdbdbd;
		padding: 10rpx 30rpx;
		margin: auto;
	}
	.chat-iconList{
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-around;
		width: 100%;
		padding: 5rpx 30rpx;
		.icon-item{
			width: 2em;
			height: 2em;
			
		}
	}
}
image{
	width: 100%;
	height: 100%;
}
</style>
