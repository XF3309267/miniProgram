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
				uni.navigateTo({
					url:'/pageSalesManager/personInfoEdit/personInfoEdit'
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
	font-size: .9em;
	.person-avatar{
		width: 1.5em;
		height: 1.5em;
	}
	
	.person-tag{
		position: absolute;
		z-index: -1;
		left: 0;
		top: 0;
		height: 1.5em;
		line-height: 1.5em;
		padding-left: 2em;
		background-color: #FFFFFF;
		color: #c0c0c0;
	}
}

</style>
