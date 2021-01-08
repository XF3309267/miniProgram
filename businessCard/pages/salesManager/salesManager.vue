<template>
	<view class="" style="padding-bottom: 120rpx;">
		<FixedChat/>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false" :selfBack="true">
			<block slot="backText">
				<!-- <view class="flex">
					<view class="self-avatar margin-lr-xs" style="width: 2em;height: 2em">
						<open-data type="userAvatarUrl"></open-data>
					</view>
					<text class="cu-tag round padding-left-lg bg-white text-black"> 个人中心 </text>
				</view> -->
				<PersonalIcon/>
			</block>
			<block slot="content"> <text class="text-bold"> 销售经理 </text> </block>
		</cu-custom>
		<view class="">
			<view class="bg-white padding-top">
				<SalesManagerCard/>
				<view class="padding-sm flex justify-between">
					<view class="">
						<view class="cu-avatar-group">
							<view class="cu-avatar round sm" v-for="(item,index) in avatar" :key="index" :style="[{ backgroundImage:'url(' + avatar[index] + ')' }]"></view>
						</view>
						<text> {{browseCount}} 人浏览 </text>
					</view>
					<view class="text-lg text-green" @click="appreciate" >
						<text class="cuIcon-appreciate " v-if="!userIsAppreciate"></text>
						<text class="cuIcon-appreciatefill" v-if="userIsAppreciate" > </text>
						<text class="text-green"> {{appreciateCount}} </text>  
					</view>
				</view>
			</view>
			<view class="padding bg-white margin-top">
				<view class="">
					个人简介
				</view>
				<view class="padding-top text-black">
					数年来一直从事经济管理教育工作，曾执教过多门专业课程，主要讲授课程：统计学原理、管理会计、市场营销学、人力资源管理统计。
				</view>
			</view>
			<view class="bg-white padding">
				<view class="text-gray padding-sm">
					语音留言
				</view>
				<view class=" round  play-line solids">
					<view class="self-round" @click="playAudio"   >
						<text class="cuIcon-playfill text-green  text-xl play"  v-show="!audioIsPlay" ></text>
						<text class="cuIcon-stop text-green  text-xl play" v-show="audioIsPlay"></text>
					</view>
					<text class="text-green"> {{showAudioTime}} </text>
				</view>
			</view>
			
			<view class="margin-top">
				<view class=" flex justify-between padding-sm margin-top bg-white">
					<text class="  text-lg text-bold"> 精彩图册 </text> 
				</view>
				<view class="padding-sm">
					<view class="img-container" v-for="(item,index) in altas" :key="item.id">
						<image   :src="item.url" mode="widthFix" ></image>
						<view class="brief"> 这里是对图片的说明  </view>
					</view>
				</view>
			</view>
			
			<view class="fixed-bottom">
				<button open-type="share" class="cu-tag round padding-sm bg-green self-text margin-0"> 分享名片</button>
				<view class="cu-tag round padding-sm bg-green self-text" @click="copyWxId"> 
					加微信
					<view  class="sm-title">
						WX_id54633342
					</view>
				</view>
				<view class="cu-tag round bg-green self-text" @click="phoneCall"> 
					<view class="" >
						联系她
					</view>
					<view  class="sm-title">
						您的手机号码不会被泄露
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	
	import SalesManagerCard  from '@/components/SalesManagerCard'
	import PersonalIcon from '@/components/PersonalIcon'
	import FixedChat from '@/components/FixedChat.vue'
	
	export default {
		data() {
			return {
				avatar: [
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg'
				],
				browseCount:123,
				appreciateCount:53,
				userIsAppreciate: false,
				salesManagerInfo:{
					name:'王珞丹',
					avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
					position:'',
					wxId:'wx_id1245343543',
					phone:'13970853937',
					company:'江西省家院里科技江西省家院里科技',
					brief:'',
					mail:'123123222@gmail.com'
				},
				
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
				// 音频
				audioIsPlay: false,
				audioObj:'',
				audioSrc:'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
				allTime:0,
				audioCurrentTime:0,
				// type  区分 销售 和 普通用户, 0: 普通用户， 1: 销售
				type:0,
			}
		},
		
		watch:{
			
		},
		computed:{
			showAudioTime(){
				if(!this.audioIsPlay){
					return parseInt(this.allTime)+'s'
				}
				
				if(this.allTime === 0){
					return '0s'
				}
				
				return parseInt(this.allTime - this.audioCurrentTime ) + 's'
			},
			// 拨打电话

		},
		onShareAppMessage() {
			return{
				title:'您好，我是'+this.salesManagerInfo.name+',一键保存，了解更多...',
				success:(res)=>{
					console.log('分享 success')
					console.log(res)
				},
				fail:(res)=>{
					console.log('分享 fail')
					console.log(res)
				}
			}
		},
		onLoad() {
			uni.showToast({
				title:'您好，我是您的销售经理。有什么问题可以随时咨询我哦！',
				icon:'none',
			})
		},
		methods: {
			// 播放音频
			playAudio(){
				if(this.audioIsPlay){
					console.log('音乐播放中')
					this.startTime = 0
					this.audioIsPlay = false
					this.audioObj.pause()
					this.audioObj.destroy()
					return 
				}
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.src =  this.audioSrc
				
				innerAudioContext.onCanplay(()=>{
					this.audioCurrentTime = innerAudioContext.currentTime 
					innerAudioContext.play()
					this.audioIsPlay = true
						
					innerAudioContext.onPlay(() => {
					 this.audioCurrentTime = innerAudioContext.currentTime
					 this.audioObj = innerAudioContext
					 innerAudioContext.onTimeUpdate(()=>{
					 	this.allTime = innerAudioContext.duration
					 	this.audioCurrentTime = innerAudioContext.currentTime
					 	
					 	const restTime = parseInt(this.allTime - this.audioCurrentTime )
					 	if(!restTime){
					 		innerAudioContext.destroy()
					 		this.audioIsPlay = false
					 	}
					 })
					});
				})
				innerAudioContext.onError(()=>{
					uni.showToast({
						title:'音频播放错误',
						icon:'none'
					})
					this.audioIsPlay = false
					innerAudioContext.destroy()
				})
			},
		
			// 点赞
			appreciate(){
				if(this.userIsAppreciate){
					console.log('用户已经点赞')
					return
				}
				this.appreciateCount++;
				this.userIsAppreciate = true
			},
			// 拨打电话
			phoneCall(){
				uni.makePhoneCall({
					phoneNumber: this.salesManagerInfo.phone,
					success(res) {
						console.log('makePhoneCall success')
						console.log(res)
					},
					fail(res){
						console.log('makePhoneCall fail')
						console.log(res)
					}
				})
			},
			// 复制微信号
			copyWxId(){
				uni.setClipboardData({
					data: this.salesManagerInfo.wxId,
					success: function() {
						uni.showToast({
							title:'成功复制微信号',
						})
					},
					fail:function(){
						console.log('复制失败')
					}
				})
			},
		},
		components:{
			SalesManagerCard,
			PersonalIcon,
			FixedChat
		}
	}
</script>

<style scoped>
.sales-container{

}
.play-line{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx 40rpx;
	background-color: #FFFFFF;
	
}
.self-round{
	position: relative;
	width: 50rpx;
	height: 50rpx;
	border:4rpx solid #4CD964;
	border-radius: 50%;
	text-align: center;
}
.self-round .play{
	
	line-height: 42rpx;
	/* width: 1em;
	height: 1em; */
	margin: auto;
}


/*  精彩图册  */
.img-container{
	position: relative;
	width: 720rpx;
/* 	height: 380rpx; */
	padding: 20rpx;
	border-radius: 10rpx;
	margin: 20rpx auto;
	background-color: #FFF;
}

.img-container image{
	width: 100%;
	height: 100%;
	border-radius: 10rpx;
}
.img-container .brief{
	position: absolute;
	bottom: 30rpx;
	left: 30rpx;
	color: #FFFFFF;
}

.fixed-bottom{
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	justify-content: space-around;
	padding: 30rpx 20rpx;
	width: 100%;
	background-color: #FFFFFF;
	font-size: 40rpx;
}
.fixed-bottom .self-text{
	display: flex;
	flex-flow: column nowrap; 
	height: 3em;
	padding: 20rpx 30rpx;
}
.fixed-bottom .self-text .sm-title{
	font-size: .7em;
}
</style>
