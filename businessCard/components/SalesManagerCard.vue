<template>
	<view class="sale-card">
		<view class="left">
			<image :src="salesManagerInfo.headPortrait" mode="aspectFill"> </image>
		</view>
		<view class="right">
			<view class=" head">
				<view class="">
					<view class="text-bold text-md padding-xs">
						{{salesManagerInfo.salesName}}
					</view>
					<view class="padding-xs text-md">
						销售经理
					</view>
				</view>
				<view class="padding-xs">
					<u-image :src="companyInfo.companyLogo" width="100rpx" height="30rpx" mode="aspectFit" ></u-image>
					<!-- <text class="cu-tag"> 公司logo </text> -->
				</view>
			</view>
			
			<view class="flex align-center justify-between normal-item">
				<view class="flex align-center u-m-r-2" @click.stop="phoneCall" >
					<text class="cuIcon-phone  u-p-r-10"></text>
					<text class="underLine " > {{salesManagerInfo.salesPhone}} </text>
				</view>
				<u-tag text="保存通讯录" type="info"  shape="circle" size="mini" @click="addPhonePerson" />
				<!-- <text class="cu-tag round bg-whtie text-black " style="font-size: .7em;" @click.stop="addPhonePerson" > 保存通讯录 </text> -->
			</view>
			
			<view class="normal-item">
				<text class="cuIcon-home u-p-r-10"></text>
				<text> {{companyInfo.companyName}} </text>
			</view>
			<view class="normal-item{">
				<text class="cuIcon-mail u-p-r-10"></text>
				<text> {{salesManagerInfo.salesMailbox}} </text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		props:{
			salesManagerInfo:{
				type:Object,
				default:{
					companyId: -1,
					createTime: "",
					deleted: -1,
					headPortrait: "",
					id: -1,
					jobTitle: "",
					likeNum: -1,
					readNum: -1,
					resignStatus: -1,
					salesLoginPhone: "0",
					salesMailbox: "",
					salesName: "1111111",
					salesOpenId: -1,
					salesPhone: "0",
					salesVoiceIntroduce: "",
					salesWordIntroduce: "",
					salesWx: "",
					updateTime: ""
				}
			},
			companyInfo:{
				type:Object,
				default:{
					"companyAddress": "",
					"companyImagesIntroduce": "",
					"companyLogo": "",
					"companyMailbox": "",
					"companyManifesto": "",
					"companyName": "",
					"companyPhone": "",
					"companyVoiceIntroduce": "",
					"companyWordIntroduce": "",
					"createTime": "",
					"deleted": 0,
					"id": 0,
					"updateTime": ""
				}
			}
		},
		methods:{
			phoneCall(){
				
				uni.makePhoneCall({
					phoneNumber: this.salesManagerInfo.salesPhone,
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
					firstName:this.salesManagerInfo.salesName.slice(0,1),
				    nickName: this.salesManagerInfo.salesName,
				    mobilePhoneNumber: this.salesManagerInfo.salesPhone, //手机号
					email:this.salesManagerInfo.salesMailbox,
				    success:(res)=>{
						this.$emit('onMailList')
				        console.log('success addPhoneContact');
						console.log(res)
				    },
				    fail:(res)=>{
				        console.log('fail addPhoneContact');
						console.log(res)
				    }
				});
			}
		}
	}
</script>

<style lang="scss" scoped >
	.sale-card{
		position: relative;
		display: flex;
		width: 670rpx;
		height: 370rpx;
		padding: 30rpx;
		margin: auto;
		margin-bottom: 30rpx;
		font-size: .9em;
		border-radius: 20rpx 70rpx 20rpx 70rpx;
		background-color: #FFF;
	
		
		box-shadow: 0px 2px 4px rgba(136, 136, 136, 0.5);
		.left{
			width: 250rpx;
			height: 100%;
			border-radius: 20rpx;
			overflow: hidden;
		}
		
		.absolute-right-icon{
			position: absolute;
			left: 300rpx;
			top: 0;
			font-size: 5em;
		}
		
		
		.right{
			flex-basis: 1;
			flex-grow: 1;
			padding: 10rpx 20rpx;
			
			.head{
				display: flex;
				height: 140rpx;
				justify-content: space-between;
				align-items: flex-start;
				font-size: 1.2em;
			
			}
			.normal-item{
				height: 50rpx;
				line-height: 50rpx;
				overflow: hidden;
			}
		}
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
</style>
