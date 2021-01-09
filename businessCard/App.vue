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
	
	.underLine{
		text-decoration: underline;
	}
	
	.self-avatar{
		border-radius: 50%;
		overflow: hidden;
	}
</style>
