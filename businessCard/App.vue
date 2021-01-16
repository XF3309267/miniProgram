<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData:{
			// 该小程序 基本全局信息
			navBgImg:'https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg',
			
			
			// 用户信息
			userType:1,
			userInfo:{
				name:'',
				avatar:'',
				phone:'',
			}
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import "colorui/main.css";
	@import "colorui/icon.css";
	.container{
		background-color: $uni-bg-color-grey;
		padding: 20rpx 0;
	}
	.padding-container{
		padding: 20rpx;
	}

	/*  关于文字  */
	.limit-text{
		height: 1.2em;
		white-space: nowrap;
		vertical-align: cetner;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.self-bold{
		font-weight: bold;
		color: #000;
	}
	
	
	
	
	.self-shadow{
		box-shadow: 0px 2px 4px rgba(136, 136, 136, 0.5);
	}
	.btn-hover{
		position: relative;
		top: 5rpx;
		background-color: #efefef;
		box-shadow: 0px 2px 4px rgba(136, 136, 136, 0.5) inset;
	}
	
	.underLine{
		text-decoration: underline;
	}
	
	.self-avatar{
		border-radius: 50%;
		overflow: hidden;
	}
	
	//  用以 不得不使用 button 的情况下
	//   将 btn 定位使用 absolute 并且 背景透明
	.absolute-btn-container{
		position: relative;
		overflow: hidden;
		.absolute-btn{
			position: absolute;
			z-index: 100;
			left: -10%;
			top: -10%;
			
			width: 120%;
			height: 120%;
			background-color: rgba(255,255,255,0);
		}
	}
	image{
		width: 100%;
		height: 100%;
	}
	// 卡片
	.introduce-card{
		width: 710rpx;
		margin: auto;
		border-radius: 20rpx;
		box-shadow: 0px 2px 4px rgba(136, 136, 136, 0.5);
		margin-bottom: 50rpx;
	
		.content{
			background-color: #FFFFFF;
			padding: 30rpx 20rpx;
			border-radius: 0 0 20rpx 20rpx;
			.bottom{
				margin-top: 20rpx;
				
				.title{
					color: #666666;
				}
				.bottom-main{
					display: flex;
					padding: 6rpx 00;
				}
			}
			
		}
		
	}
	
	
	.card-head{
		display: flex;
		padding: 20rpx;
		border-radius:20rpx 20rpx 0 0;
		align-items: center;
		background-color: #F6F6F6;
		
		.icon-container{
			width: 2em;
			height: 2em;
			margin-right: 16rpx;
			
			image{
				width: 100%;
				height: 100%;
			}
		}
	
	}
	
</style>
