<template>
	<view class="peson-icon" @click="toPersonal">
		<view class="self-avatar person-avatar">
			<open-data type="userAvatarUrl"></open-data>
		</view>
		<text class="cu-tag round person-tag"> 个人中心 </text>
	</view>
</template>

<script>
	export default {
		name:'PersonalIcon',
		data() {
			return {
				
			}
		},
		methods:{
			toPersonal(){
				console.log('fgsdfasd')
				uni.switchTab({
					url:'/pages/personal/personal'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.peson-icon{
	position: relative;
	display: flex;
	margin-left: 20rpx;
	
	.person-avatar{
		width: 2em;
		height: 2em;
		
	}
	
	.person-tag{
		position: absolute;
		z-index: -1;
		left: 0;
		top: 5rpx;
		height: 2em;
		line-height: 2em;
		padding-left: 3em;
		background-color: #FFFFFF;
		color: #c0c0c0;
	}
}

</style>
