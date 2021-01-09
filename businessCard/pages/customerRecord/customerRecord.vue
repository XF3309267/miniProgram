<template>
	<view >
		<!-- <cu-custom  bgColor="bg-gradual-blue" :isBack="true" >
			<block slot="content"> <text class="text-bold"> 用户追踪 </text> </block>
		</cu-custom> -->
		<u-navbar  title="用户追踪" :is-fixed="true" height="44"></u-navbar>
		<view>
			<view>
				<u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper :style="{height:scrollViewHeight}" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item"  >
					<scroll-view class="scrollClass" :style="{height:scrollViewHeight}" scroll-y  @scrolltolower="onreachBottom">
						<u-time-line >
							<u-time-line-item  v-for="(item,index) in customerActiveRecord" :key="index"  bg-color="#00aaff" nodeTop="2" >
								<template  v-slot:content>
									<view >
										<view class="u-order-time">{{toTimeStr(item.time)}} </view>
										<view class="u-p-t-14"> {{item.content}} </view>
									</view>
								</template>
							</u-time-line-item>
						</u-time-line>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view  class="bg-gray u-p-t-20" :style="{height:scrollViewHeight}"  scroll-y  @scrolltolower="onreachBottom">
						<view class="padding bg-white flex">
							<view class="text-center min-5em">
								跟进方式
							</view>
							<view class="u-p-l-20 u-p-r-20">
								<u-radio-group v-model="value" @change="radioGroupChange">
									<u-radio 
										@change="radioChange" 
										v-for="(item, index) in radioList" :key="index" 
										:name="item.name"
										:disabled="item.disabled"
									>
										{{item.name}}
									</u-radio>
								</u-radio-group>
							</view>
						</view>
						<view class="bg-white">
							<u-field
								v-model="recordInputV"
								label="跟进进度"
								required
							>
							</u-field>
						</view>
						
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	let systemInfo = uni.getSystemInfoSync();
	
	export default {
		data() {
			return {
				statusBarHeight: systemInfo.statusBarHeight,
				
				
				list: [{
					name: '活跃记录'
				}, {
					name: '跟进记录'
				}],
				radioList:[{
					name:'小程序即时沟通'
				},{
					name:'微信沟通'
				},{
					name:'电话拜访'
				},{
					name:'当面沟通'
				}],
				tabs:[
					{content:'111'},
					{content:'222'},
				],
				customerActiveRecord:[
					{time: 1610184630000,content:'发起了即时聊天'},
					{time: 1610184630000,content:'分享了您的名片'},
					{time: 1610184630000,content:'查看了您的名片'},
					{time: 1610184630000,content:'保留了您的微信号'}
				],
				
				
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
				
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				recordInputV:' ',
			};
		},
		computed:{
			scrollViewHeight(){
				// 44px 	导航栏高度
				// 80rpx 	全屏选项卡 导航栏高度
				
				let str = `calc(100vh - ${this.statusBarHeight + 'px'} - 44px - 80rpx)`
				console.log('scorllview height')
				console.log(str)
				return str 
			},
		},
		methods: {
			
			// moment 转换时间
			toTimeStr(timeNum){
				let str = this.moment(timeNum).format('YYYY.MM.DD HH:MM:SS')
				return str
			},
			
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				
			}
		}
	};
</script>

<style lang="scss" scoped>
.img-container{
	width: 100%;
	height: 400rpx;
	border-radius: 10rpx;
	padding: 20rpx;
	background-color: #FFFFFF;
	image{
		width: 100%;
		height: 100%;
	}
}
.scrollClass{
	padding: 20rpx 30rpx;
	background-color: #FFFFFF;
	border-top: 20rpx solid #efefef;
	font-size: 1.2em;
}

.u-order-title {
	color: #333333;
	font-weight: bold;
	font-size: 32rpx;
}

.u-order-desc {
	color: rgb(150, 150, 150);
	font-size: 28rpx;
	margin-bottom: 6rpx;
}

.u-order-time {
	color: rgb(200, 200, 200);
	font-size: 26rpx;
}





// 跟进记录
.min-5em{
	min-width: 4em;
}

</style>
