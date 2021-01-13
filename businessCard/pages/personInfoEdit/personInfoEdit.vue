<template>
	<view class="">
		<cu-custom  :isBack="true">
			<block slot="backText"><text @click="personInfoEditBack"> 返回</text>  </block>
			<block slot="content"> 个人资料 </block>
		</cu-custom>
		<view class="cu-list menu sm-border  margin-top" >
			<view class="cu-item " >
				<view class="flex align-center">
					<text class="item-label "> 昵称 </text>
					<input class="item-conten" disabled="true" type="text" v-model="inputV" placeholder="您的昵称" />
				</view>
			</view>
			<view class="cu-item arrow " >
				<view class="flex align-center">
					<text class="item-label "> 手机号 </text>
					<input class="item-conten" disabled="true" type="text" placeholder="绑定手机号" />
				</view>
			</view>
			<view class="cu-item arrow " @click="verifySales" >
				<view class="flex align-center">
					<text class="item-label"> 绑定员工身份 </text>
					<input class="item-conten text-gray" disabled="true" type="text" placeholder="企业员工专用" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userType:-1,
				userInfo:null,
				inputV:'',
				
			}
		},
		created() {
			this.initUserInfo()
		},
		methods: {
			initUserInfo(){
				const globalData = getApp().globalData
				if(globalData.userInfo){
					this.userInfo = globalData.userInfo
					this.inputV = globalData.userInfo.name
				}
				if(globalData.userType){
					this.userType = globalData.userType
				}
				 
			},
			personInfoEditBack(){
				
			},
			// 验证 销售信息
			verifySales(){
				uni.navigateTo({
					url:'/pages/bindSalesManager/bindSalesManager'
				})
			}
		}
	}
</script>

<style scoped>
.item{
	
}
.item-label{
	min-width: 4em;
	text-align: center;
	font-size: 1.1em;
	padding: 0 20rpx;
	
}
.item-conten{
	flex-basis: 1;
	flex-grow: 1;
}
</style>
