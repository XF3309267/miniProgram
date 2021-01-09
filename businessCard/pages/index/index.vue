<template>
	<view class="contain">
		<FixedChat  :userType="userType" />
		<!-- :bgImage="getApp().globalData.navBgImg" -->
		<cu-custom  bgColor="bg-gradual-blue" >
			<!-- <block slot="backText">返回</block> -->
			<block slot="content"> <text class="text-bold"> 家院里 </text> </block>
		</cu-custom>
		<!-- <u-swiper :list="swiperList" name="url" ></u-swiper> -->
		<swiper class="screen-swiper" :class="'square-dot'" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
			</swiper-item>
		</swiper>
		<view class="self-card bg-white">
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
		</view>
		<view class=" flex justify-between padding-sm margin-top bg-white">
			<text class="  text-lg text-bold"> 公司产品 </text> 
			<view class="">
				<text class="text-lg text-gray"> 更多  </text>
				<text class="lg text-gray" :class="cuIcon-right"></text>
			</view>
		</view>
		<ItemCard/>
		<view class="text-gray text-center padding-sm" > 没有更多了 </view>
	</view>
</template>

<script>
	import ItemCard  from '@/components/ItemCard'
	import FixedChat from '@/components/FixedChat.vue'
	
	import {allCompanyInfo} from '@/services/services.js'
	
	export default {
		data() {
			return {
				cardCur: 0,
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
				userType:-1,
				towerStart: 0,
				direction: '',
				
				companyInfo:'',
				productList:[
					// {
					// 	id:0,
					// 	bgUrl:'',
					// 	avatar:'',
					// 	title:'',
					// 	brief:'',
					// 	badge:'',
					// 	browseCount:0,
					// }
				]
				
			}
		},
		onShow() {
			if(this.userType===-1){
				this.initUserType()
			}
		},
		onShareAppMessage() {
			return {
				title: '快来分享',
				path: '/pages/index/index'
			}
		},
		onLoad() {
			this.TowerSwiper('swiperList');
		},
		created() {
			this.initCompanyInfo()
		},
		methods: {
				
			
			initUserType(){
				this.userType = getApp().globalData.userType
			},
			// 获取公司信息
			async initCompanyInfo(){
				uni.showLoading({
					title:'资源获取中...',
					mask:true
				})
				
				
				let res = await allCompanyInfo()
				if(res.statusCode===200){
					this.companyInfo = res.data.data
					console.log('这里应该拿到 res')
				}else{
					this.companyInfo = -1
				}
				uni.hideLoading()
				console.log('这里应该拿到 function finally')
			},
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			// towerSwiper
			// 初始化towerSwiper
			TowerSwiper(name) {
				let list = this[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.swiperList = list
			},
			
			// towerSwiper触摸开始
			TowerStart(e) {
				this.towerStart = e.touches[0].pageX
			},
			
			// towerSwiper计算方向
			TowerMove(e) {
				this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
			},
			
			// towerSwiper计算滚动
			TowerEnd(e) {
				let direction = this.direction;
				let list = this.swiperList;
				if (direction == 'right') {
					let mLeft = list[0].mLeft;
					let zIndex = list[0].zIndex;
					for (let i = 1; i < this.swiperList.length; i++) {
						this.swiperList[i - 1].mLeft = this.swiperList[i].mLeft
						this.swiperList[i - 1].zIndex = this.swiperList[i].zIndex
					}
					this.swiperList[list.length - 1].mLeft = mLeft;
					this.swiperList[list.length - 1].zIndex = zIndex;
				} else {
					let mLeft = list[list.length - 1].mLeft;
					let zIndex = list[list.length - 1].zIndex;
					for (let i = this.swiperList.length - 1; i > 0; i--) {
						this.swiperList[i].mLeft = this.swiperList[i - 1].mLeft
						this.swiperList[i].zIndex = this.swiperList[i - 1].zIndex
					}
					this.swiperList[0].mLeft = mLeft;
					this.swiperList[0].zIndex = zIndex;
				}
				this.direction = ""
				this.swiperList = this.swiperList
			},

		},
		components:{
			ItemCard,
			FixedChat
		}
	}
</script>

<style lang="scss">
	.contain{
		width: 100%;
		min-height: 100vh;
		padding-bottom: 30rpx;
	}
	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
	}
	.self-card{
		padding: 10rpx 20rpx;
		border-radius: 10rpx;
		.card-head{
			display: flex;
			align-items: center;
			padding: 10rpx 20rpx;
			.avatar{
				width: 3em;
				height: 3em;
				border-radius: 50%;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
				
			}
			.main{
				flex-basis: 1;
				flex-grow: 1;
				font-size: 1.5em;
				font-weight: bold;
				padding-left: 20rpx;
			}
			.right{
				min-width: 4em;
			}
		}
		.card-content{
			padding:  20rpx;
		}
	}
</style>
