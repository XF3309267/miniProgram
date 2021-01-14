<template>
	<view class="sale-card">
		<view class="left">
			<image :src="salesManagerInfo.headPortrait" mode="aspectFill"> </image>
		</view>
		<view class="right">
			<view class="flex justify-between">
				<view class="">
					<view class="text-bold text-lg padding-xs">
						{{salesManagerInfo.salesName}}
					</view>
					<view class="padding-xs">
						{{salesManagerInfo.jobTitle}}
					</view>
				</view>
				<view class="">
					<u-image :src="companyInfo.companyLogo" width="100rpx" height="30rpx" mode="aspectFit" ></u-image>
					<!-- <text class="cu-tag"> 公司logo </text> -->
				</view>
			</view>
			
			<view class="flex align-center justify-between padding-xs">
				<view class="flex align-center" @click.stop="phoneCall" >
					<text class="cuIcon-phone  padding-right"></text>
					<text class="underLine " > {{salesManagerInfo.salesPhone}} </text>
				</view>
				<text class="cu-tag round bg-gradual-green" @click.stop="addPhonePerson" > 保存通讯录 </text>
			</view>
			
			<view class="flex align-center padding-xs">
				<text class="cuIcon-home padding-right"></text>
				<text> {{companyInfo.companyName}} </text>
			</view>
			<view class="flex align-center padding-xs">
				<text class="cuIcon-mail padding-right"></text>
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
