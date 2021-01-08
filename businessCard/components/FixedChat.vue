<template>
	<view class="fixed-badge">
	
		<view class="avatar">
			
			<image v-if="userType === 0 " :src="salesAvatar" mode="aspectFill"></image>	
			<image v-if="userType === 1" :src="normalAvatar" mode="aspectFill"></image>
		</view>
		<view class="bottom-btn" @click="toChat">
			<view class="tag cu-tag badge bg-red">
				1
			</view>
			<button v-if="userType === 0 " class="cu-btn round block sm text-green bg-white"> 咨询 </button>
			<button v-if="userType === 1 " class="cu-btn round block sm text-green bg-white"> 回复 </button>
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
				salesAvatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
				normalAvatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
			}
		},
		props:{
			// userType,  0: 普通用户  ，  1: 销售
			userType:{
				type:Number,
				default: 0,
			}
		},
		methods:{
			toChat(){
				if(this.userType){
					uni.navigateTo({
						url:'/pages/chatSalesManager/chatSalesManager'
					})
					return 
				}
				uni.navigateTo({
					url:'/pages/chatPerson/chatPerson'
				})
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
		position: relative;
		top: -20rpx;
		width: 4em;
		
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
</style>
