<template>
	<view style="min-height: 100vh; padding-top: 120rpx;padding-bottom: 180rpx;">
		<!-- <view class="" :style="{position:'fixed',zIndex:'10000',top:InputBottom+'px' }">
			<cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block><block slot="content">聊天</block></cu-custom>
		</view> -->
		<!-- :style="[{position:'relative',bottom:InputBottom+'px',transition:'all 0s' }]" -->
<!-- 
		<view :class="['chat-head','shadow']" v-show="InputBottom === 0 ">
			<view class="head-item">
				<view class="img-container">
					<image src="@/static/img/chatImg/call.png" mode="widthFix"></image>
				</view>
				<text> 打电话 </text>
			</view>
			<view class="head-item">
				<view class="img-container">
					<image src="@/static/img/chatImg/wexin.png" mode="widthFix"></image>
				</view>
				<text> 加好友 </text>
			</view>
			<view class="head-item">
				<view class="img-container">
					<image src="@/static/img/chatImg/card.png" mode="widthFix"></image>
				</view>
				<text> 查看名片 </text>
			</view>
		</view> -->
		
		
		<view :class="['chat-head','shadow']" v-show="InputBottom ===fixedInputBottom " :style="{top:InputBottom -10 +'px',opacity: opacityNo?0:1 }">
			<view class="head-item">
				<view class="img-container">
					<image src="@/static/img/chatImg/call.png" mode="widthFix"></image>
				</view>
				<text> 打电话 </text>
			</view>
			<view class="head-item">
				<view class="img-container">
					<image src="@/static/img/chatImg/wexin.png" mode="widthFix"></image>
				</view>
				<text> 加好友 </text>
			</view>
			<view class="head-item">
				<view class="img-container">
					<image src="@/static/img/chatImg/card.png" mode="widthFix"></image>
				</view>
				<text> 查看名片 </text>
			</view>
		</view>
		<scroll-view scroll-y="true"   :scroll-top="scrollViewTop" :style="{height:scrollViewHeight}">
			<view :style="{height:InputBottom+'px' }" >
				
			</view>
			<view class="cu-chat" >
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
				<view class="cu-item">
					<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
					<view class="main">
						<view class="content shadow">
							<text>喵喵喵！喵喵喵！</text>
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
						<view class="content shadow">
							喵星球，喵喵市
						</view>
					</view>
					<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				</view>
				
				<view class="cu-item" id="info-history-last">
					<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
					<view class="main">
						<view class="content shadow">
							@#$^&**
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
		<view class="cu-bar foot input" style="height: 180rpx;">
			<!-- <view class="action" >
				<text class="cuIcon-sound text-grey"></text>
			</view>
			<input class="solid-bottom" :auto-focus="true" v-model="inputV"  hold-keyboard :adjust-position="true" :focus="inFocus" maxlength="300" cursor-spacing="10" @focus="InputFocus" @blur="InputBlur"></input>
			<view class="action">
				<text class="cuIcon-emojifill text-grey"></text>
			</view>
			<button class="cu-btn bg-green shadow" @tap="submit">发送</button> -->
			
			<view class="">
				<input 
					class="solid-bottom chat-input"  
					type="text"
					confirm-type="send" 
					:confirm-hold="true"
					:auto-focus="true" 
					v-model="inputV"  
					hold-keyboard 
					:adjust-position="true"  
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
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollViewTop:0,
				fixedInputBottom:0,
				inputV:'',
				InputBottom: 0,
				infoList:[],
				inFocus:false,
				newSubInfoList:[],
				newAcceapInfoList:[
					
				],
				clickedSub:false,
				
				
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
			};
		},
		watch:{
			
		},
		computed:{
			scrollViewHeight(){
				let str = `calc(100vh   - 120rpx - 180rpx )`
				console.log('scorllview height')
				console.log(str)
				return str 
			},
			opacityNo(){
				if(this.InputBottom!==0&&this.InputBottom!==this.fixedInputBottom){
					return true
				}
				return false
			},
		},
		mounted() {
			// this.scrollPage('#info-history-last',0)
			this.initScrollTop()
		},
		methods: {
			initScrollTop(){
				this.scrollViewTop = 1000
				
			},
			InputFocus(e) {
				this.inFocus = true
				this.InputBottom = e.detail.height
				if(!this.fixedInputBottom){
					this.fixedInputBottom = this.InputBottom
				}
				let lastIndexId = '#info-'+(this.infoList.length -1)
				this.scrollViewTop =  this.scrollViewTop + 250*this.infoList.length
			},
			InputBlur(e) {
				// this.inputFocus = false
				this.InputBottom = 0
			},
			keyboardHeight(e){
				console.log('键盘高度发生变化')
				console.log(e)
				// this.InputBottom = e.detail.height
			},
			submit(){
				const info = this.inputV.trim()
				if(!info){
					return 
				}	
				this.inFocus = true
				let noramlNewsModel = {userType:0,infoType:'text',content:'',}
				let newsObj = noramlNewsModel
				newsObj.content = info 
				this.inputV = ''
				this.infoList.push(newsObj)
				let lastIndexId = '#info-'+(this.infoList.length -1)
				this.scrollViewTop =  this.scrollViewTop + 250*this.infoList.length
			},
			scrollPage(indexName,height){
				let me = this;
				console.log(indexName)
				var query = wx.createSelectorQuery().in(me);
				query.selectViewport().scrollOffset()
				
				query.select(indexName).boundingClientRect();
				query.exec(function (res) {
				console.log('dddddddddddddddd')
				console.log(res)
				 var miss =  res[1].top + res[0].scrollTop + height

				 uni.pageScrollTo({
				  scrollTop: miss,
				 });
				  this.inFocus = true
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
.chat-head{
	position: fixed;
	z-index: 1000;
	top: 0;
	left: 0;
	display: flex;
	justify-content: space-around;
	height: 120rpx;
	width: 100%;
	padding: 20rpx 30rpx;
	background-color: $uni-bg-color-grey;
	transition: opacity 1s;
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
.chat-head-active{	
	opacity: 1;
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
