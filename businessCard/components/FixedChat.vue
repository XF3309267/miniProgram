<template>
	<view class="fixed-badge">
		<view class="avatar">
			<image :src="avatar" mode="aspectFill"></image>	
		</view>
		<view class="bottom-btn">
			<view class="tag cu-tag badge bg-red">
				1
			</view>
			<button class="cu-btn round block sm text-green"> 咨询 </button>
		</view>
	</view>
</template>

<script>
	export default{
		name:'FixedChat',
		data(){
			return{
				avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
			}
		},
		props:{
			
		},
		methods:{
			
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
		width: 3.5em;
		height: 3.5em;
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
