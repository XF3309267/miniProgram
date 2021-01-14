<template>
	<view class="contain">
		<FixedChat  :userType="userType" />
		<cu-custom bgColor="bg-gradual-blue" >
			<!-- <block slot="backText">返回</block> -->
			<block slot="content"> <text class="text-bold"> 家院里 </text> </block>
		</cu-custom>
		
		<swiper class="screen-swiper" :class="'square-dot'" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="padding bg-white">
			<view class="bg-white self-bold">
				公司简介
			</view>
			<view class="padding-sm">
				{{companyInfo.companyWordIntroduce}}
			</view>
		</view>
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
		<view class="padding-sm">
			<view class="img-container " v-for="(item,index) in altas" :key="item.id">
				<image   :src="item.url" mode="widthFix" ></image>
				<!-- <view class="brief"> 这里是对图片的说明  </view> -->
			</view>
		</view>
		
		<view class="company-bottom">
			<view class="head u-border-bottom">
				联系我们
			</view>
			<view class="bottom-item">
				<view class="title">
					地址
				</view>
				<view class="content">
					{{companyInfo.companyAddress}}
				</view>
			</view>
			<u-gap height="20" bg-color="#eee"></u-gap>
			<view class="bottom-item">
				<view class="title">
					联系电话
				</view>
				<view class="content">
					{{companyInfo.companyPhone}}
				</view>
			</view>
			<u-gap height="20" bg-color="#eee"></u-gap>
		</view>
		
		
		<view class="text-gray text-center padding-sm" > 没有更多了 </view>
	</view>
</template>

<script>
	import ItemCard  from '@/components/ItemCard'
	import FixedChat from '@/components/FixedChat.vue'
	
	import {previewImg,getSalesInfo,getCompanyInfo,userAction} from '@/static/js/common.js'
	
	export default {
		data() {
			return {
				cardCur: 0,
				
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
				userType:-1,
				towerStart: 0,
				direction: '',
				salesManagerInfo:'',
				companyInfo:'',
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
				
				
				
				companyId:1,
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
		async created() {
			const getSalesInfoRes = await this.initSalesInfo(this.salesId)
			if(getSalesInfoRes){
				this.initCompanyInfo(this.salesManagerInfo.companyId)
			}
		},
		methods: {
				
			
			initUserType(){
				this.userType = getApp().globalData.userType
			},
			
			
			// 初始化 销售的信息
			initSalesInfo(salesId){
				return new Promise(async (resolve,reject)=>{
					uni.showLoading({
						title:'您的专属销售正在赶路的路上...',
						mask:true
					})
					
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
					uni.hideLoading()
				})
				
			},
			
			// 获取公司信息
			async initCompanyInfo(companyId){
				uni.showLoading({
					title:'公司信息资源获取中....',
					mask:true
				})
				
				let data = {id:companyId}
				const getCompanyInfoRes = await getCompanyInfo(data)
				if(getCompanyInfoRes.statu===200){
					this.companyInfo = getCompanyInfoRes.value
					console.log('----- company  ---')
					console.log(getCompanyInfoRes.value)
					this.getCompanyInfoAfter()
				}else{
					uni.showToast({
						title: getCompanyInfoRes.msg,
						icon:'none'
					})
				}
				uni.hideLoading()
			},
			// 获取公司信息后 分配 this 其他各值
			getCompanyInfoAfter(){
				const swiperItem = {}
				swiperItem.url = this.companyInfo.companyImagesIntroduce
				this.swiperList = [swiperItem]
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

<style lang="scss" scoped>
	.contain{
		width: 100%;
		min-height: 100vh;
		padding-bottom: 360rpx;
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
	
	.company-bottom{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 350rpx;
		padding-bottom: 20rpx;
		border-radius: 30rpx 30rpx 0 0;
		background-color: #ffffff;
		
		
		
		.head{
			font-weight: bold;
			height: 70rpx;
			padding: 20rpx 50rpx;
		}
		.bottom-item{
			height: 120rpx;
			padding: 20rpx 60rpx;
			background-color: #FFFFFF;
			.title{
				height: 40rpx;
				font-size: .8em;
				color: #606266;
			}
			.content{
				height: 40rpx;
				padding-top: 5rpx;
			}
		}
	}
</style>
