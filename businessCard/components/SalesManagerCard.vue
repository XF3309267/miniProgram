<template>
	<view class="sale-card">
		<view class="left">
			<image :src="salesManagerInfo.avatar" mode="aspectFill"> </image>
		</view>
		<view class="right">
			<view class="flex justify-between">
				<view class="">
					<view class="text-bold text-lg padding-xs">
						{{salesManagerInfo.name}}
					</view>
					<view class="padding-xs">
						销售经理
					</view>
				</view>
				<view class="">
					<text class="cu-tag"> 公司logo </text>
				</view>
			</view>
			
			<view class="flex align-center justify-between padding-xs">
				<view class="flex align-center" @click.stop="phoneCall" >
					<text class="cuIcon-phone  padding-right"></text>
					<text class="underLine " > {{salesManagerInfo.phone}} </text>
				</view>
				<text class="cu-tag round bg-gradual-green" @click.stop="addPhonePerson" > 保存通讯录 </text>
			</view>
			
			<view class="flex align-center padding-xs">
				<text class="cuIcon-home padding-right"></text>
				<text> {{salesManagerInfo.company}} </text>
			</view>
			<view class="flex align-center padding-xs">
				<text class="cuIcon-mail padding-right"></text>
				<text> {{salesManagerInfo.mail}} </text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				salesManagerInfo:{
					name:'王珞丹',
					avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
					wxId:'wx_id1245343543',
					phone:'13970853937',
					company:'江西省家院里科技江西省家院里科技',
					mail:'123123222@gmail.com'
				}
			};
		},

		methods:{
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
			addPhonePerson(){
				uni.addPhoneContact({
					firstName:this.salesManagerInfo.name.slice(0,1),
				    nickName: this.salesManagerInfo.name,
				    mobilePhoneNumber: this.salesManagerInfo.phone, //手机号
					email:this.salesManagerInfo.mail,
				    success(res) {
				        console.log('success addPhoneContact');
						console.log(res)
				    },
				    fail(res) {
				        console.log('fail addPhoneContact');
						console.log(res)
				    }
				});
			}
		}
	}
</script>

<style>
	.sale-card{
		position: relative;
		display: flex;
		width: 700rpx;
		height: 370rpx;
		margin: auto;
		border-radius: 20rpx;
		background-color: #FFF;
	}
	.sale-card .left{
		width: 250rpx;
		height: 100%;
		border-radius: 20rpx 0 0 20rpx ;
		overflow: hidden;
	}
	.sale-card .absolute-right-icon{
		position: absolute;
		left: 300rpx;
		top: 0;
		font-size: 5em;
	}
	.sale-card .right{
		flex-basis: 1;
		flex-grow: 1;
		padding: 20rpx;
	}
</style>
