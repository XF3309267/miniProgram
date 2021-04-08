<template>
	<view class="fixed-badge" @click="toChat">
		<view v-if="userType === 0 " class="normal_avatar" style="z-index: 100;">
			<image  :src="defaultSalesAvatar" mode="aspectFit"></image>	
		</view>
		<view v-if="userType === 1 " class="normal_avatar" style="z-index: 100;">
			<!-- <image  :src="defaultClientAvatar" mode="aspectFit"></image>	 -->
			<view class="newsBox">
				<view class="">
					消息
				</view>
				<view class="">
					({{newsCount}})
				</view>
			</view>
		</view>
		
		<!-- <view v-if="userType === 1"  class="avatar" style="z-index: 100;">
			<image :src="normalAvatar" mode="aspectFill"></image>
		</view> -->
		<view  v-if="userType === 0 " class="bottom-btn" >
			<u-badge type="error"  :is-center="true" :count="newsCount"></u-badge>
			<!-- <button v-if="userType === 0 " class="cu-btn round block sm text-green bg-white"> 咨询 </button> -->
			<!-- <button v-if="userType === 1 " class="cu-btn round block sm text-green bg-white"> 回复 </button> -->
		</view>
<!-- 		<view class="">
			<view class="cu-avatar round md margin-xs bg-grey text-xxl text-center">
				<text class="cuIcon-comment text-lg"> </text> 
			</view>
			<view class="bottom-btn">
				<view class="tag cu-tag badge bg-red">
					1
				</view>
				<button class="cu-btn round block sm text-green bg-white"> 回复 </button>
			</view>
		</view> -->
		
	</view>
</template>

<script>

	export default{
		name:'FixedChat',
		data(){
			return{
				defaultClientAvatar: 'http://jylqndev.kaiwumace.com/1616566164000_2809.jpg',
				defaultSalesAvatar:	'http://jylqndev.kaiwumace.com/1616564615000_9844.jpg'
			}
		},
		props:{
			// userType,  0: 普通用户  ，  1: 销售
			userType:{
				type:Number,
				default: 0,
			},
			newsCount:{
				type:Number,
				default: 0
			},
			toChatId:{
				type:String,
				default: ''
			}
		},
		onLoad () {

		 },
		 onShow: function () {
		   // this.getChatList()

		
		 },
		methods:{
			toChat(){
				// if(this.userType){
				// 	console.log('9999999999')
				// 	uni.navigateTo({
				// 		url:'/pageChat/chatSalesManager/chatSalesManager'
				// 	})

				// 	return 
				// }
				
				// uni.navigateTo({
				// 	url:'/pageChat/chatPerson/chatPerson'
				// })
				
				let isGetUserInfo = uni.getStorageSync('isGetUserInfo')
				if(!isGetUserInfo){
					uni.showToast({
						title:'您还未授权，暂时不能进行聊天功能',
						icon:'none'
					})
					return
				}
				
				let salesId = uni.getStorageSync('salesId')
				let your = ''
				
				if(this.userType==1){
					if(!this.toChatId){
						uni.showToast({
							title:'最近还没有人联系你',
							icon:'none'
						})
						return 
					}
					your = this.toChatId
				}
				if(this.userType==0){
					
					if(!salesId){
						uni.showToast({
							title:'本地缓存中没有销售Id',
							icon:'none'
						})
						return 
					}
					// salesId = 179
					your = 'jyl_' + 'sales_' + salesId
				}

				let myUsername =  uni.getStorageSync("myUsername")
				
				console.log('your')
				console.log(your)
				
				var nameList = {
				  myName: myUsername,
				  your: your
				};
				uni.navigateTo({
				  url: "/pageChat/chatroom/chatroom?username=" + JSON.stringify(nameList)
				});
			}
			
		}
	}
</script>
<style scoped>
	.fixed-badge{
		position: fixed;
		z-index: 1000;
		bottom: 20vh;
		right: 10rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 5em;
		width: 6em;
	}
	.bottom-btn{
		position: absolute;
		top: 25rpx;
		width: 4em;
	}
	.normal_avatar{
		width: 4em;
		height: 4em;
		background-color: rgba(0,0,0,0);
	}
	.normal_avatar image{
			width: 100%;
			height: 100%;
		}
	.avatar{
		width: 3em;
		height: 3em;
		border: 5rpx solid #FFF;
		border-radius: 50%;
		overflow: hidden;
		background-color: #FFF;
	}
	.avatar image{
			width: 100%;
			height: 100%;
		}
		
	.tag{
		position: absolute;
		z-index: 1000;
		right: -5rpx;
		top: -5rpx;
		
	}
	.newsBox{
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: rgba(60,79,83,0.7);
		color: #FFFFFF;
	}
</style>
