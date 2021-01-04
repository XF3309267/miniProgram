<template>
	<view class="person-contain">
		<cu-custom bgColor="bg-gradual-blue" >
			<!-- <block slot="backText">返回</block> -->
			<block slot="content"> <text class="text-bold"> 凤凰云 </text> </block>
		</cu-custom>
		<view class="person-head">
			<view class="avatar">
				<open-data type="userAvatarUrl"></open-data>
			</view>
			<view class="content padding-sm text-xl">
				<view class="limit-text  padding-left-sm" style="max-width: 8em">
					<open-data  type="userNickName"></open-data>
				</view>
				<view class="padding-xs text-xs">
					<view class='cu-tag round bg-gradual-blue'>访客</view>
				</view>
			</view>
			<view class="right">
				<button class="cu-btn block bg-gradual-green"   bindgetphonenumber='getPhoneNum' open-type='getPhoneNumber' > 去注册 <text class="cuIcon-right padding-xs"></text>  </button>
			</view>
		</view>
		<view class=" flex justify-between padding-sm">
			<text class="  text-lg text-bold"> 我的销售经理 </text> 
		</view>
		<view class="" @click="toCardDetail">
			<salesManagerCard/>
		</view>
<!-- 		<view class="sale-card">
			<view class="left">
				<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg" mode="aspectFill"> </image>
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
					<view class="flex align-center">
						<text class="cuIcon-phone  padding-right"></text>
						<text class="underLine " @click="phoneCall" > {{salesManagerInfo.phone}} </text>
					</view>
					<text class="cu-tag round bg-gradual-green" @click="addPhonePerson" > 保存通讯录 </text>
				</view>
				
				<view class="flex align-start padding-xs">
					<text class="cuIcon-home padding-right"></text>
					<text> {{salesManagerInfo.company}} </text>
				</view>
				<view class="flex align-center padding-xs">
					<text class="cuIcon-mail padding-right"></text>
					<text> {{salesManagerInfo.mail}} </text>
				</view>
			</view>
		</view>
	 -->
	</view>
</template>

<script>
	import salesManagerCard from '@/components/SalesManagerCard.vue'
	export default {
		data() {
			return {
				salesManagerInfo:{
					name:'王珞丹',
					phone:'13970853937',
					company:'江西省家院里科技江西省家院里科技',
					mail:'123123222@gmail.com'
				}
			}
		},
		methods: {
			// 获取用户手机号码
			getPhoneNum(e){
				console.log(e)
			},
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
			},
			// 前往名片详情
			toCardDetail(){
				uni.navigateTo({
					url:'/pages/salesManager/salesManager'
				})
			}
		},
		components:{
			salesManagerCard
		}
	}
</script>

<style scoped>
	/*  全局CSS */
	.underLine{
		text-decoration: underline;
	}
	.padding-left{
		padding-right: 10rpx;
	}
	
	.person-contain{
		padding: 20rpx 0;
	}
	.person-head{
		display: flex;
		align-items: center;
		width: 700rpx;
		margin: auto;
		border-radius: 10rpx;
		background-color: #FFF;
		padding: 20rpx;
		
	}
	.person-head .content{
		display: flex;
		flex-flow: column nowrap;
		align-items: flex-start;
	}
	.person-head .right{
		
		height: 100%;
		vertical-align: bottom;
	}
	.avatar{
		width: 4em;
		height: 4em;
		border-radius: 50%;
		overflow: hidden;
		background-color: #FFF;
	}
	.avatar image{
		width: 100%;
		height: 100%;
	}
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
