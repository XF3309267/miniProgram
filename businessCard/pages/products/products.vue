<template>
	<view>
		<cu-custom  bgColor="bg-gradual-blue" :isBack="false">
			<block slot="content"> 产品介绍 </block>
		</cu-custom>
		<view v-if="showType === 0" class="padding-sm">
			<view class="img-container " v-for="(item,index) in altas" :key="item.id">
				<image   :src="item.url" mode="widthFix" ></image>
				<!-- <view class="brief"> 这里是对图片的说明  </view> -->
			</view>
		</view>
		<view v-if="showType === 1" class="u-content" >
			<u-parse :html="content"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showType:1,
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
				content:`<p> 露从今夜白，月是故乡明 </p> `
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	/*  精彩图册  */
	.img-container{
		position: relative;
		width: 710rpx;
	/* 	height: 380rpx; */
		padding: 20rpx;
		border-radius: 10rpx;
		margin: 20rpx auto;
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
</style>
