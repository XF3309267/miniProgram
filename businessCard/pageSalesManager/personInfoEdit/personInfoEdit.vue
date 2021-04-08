<template>
	<view class="">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"><text @click="personInfoEditBack"> 返回</text>  </block>
			<block slot="content"> 个人资料 </block>
		</cu-custom>
		<view class="cu-list menu sm-border  margin-top" >
			<view class="cu-item " >
				<view class="flex align-center">
					<text class="item-label "> 昵称 </text>
					<open-data class="item-conten u-type-info" type="userNickName" ></open-data>
					<!-- <input class="item-conten" disabled="true" type="text" v-model="inputV" placeholder="您的昵称" /> -->
				</view>
			</view>
			<view class="cu-item arrow " @tap="clientBindPhone">
				<view class="flex align-center">
					<text class="item-label "> 手机号 </text>
					<input class="item-conten" disabled="true" type="text" placeholder="绑定手机号" />
				</view>
			</view>
			<view class="cu-item arrow " @tap="verifySales">
				<view class="flex align-center" v-if="userType!==1"  > 
					<text class="item-label"> 绑定员工身份 </text>
					<input  class="item-conten text-gray" disabled="true"  type="text" placeholder="企业员工专用" />
				</view>
				
				<view class="flex align-center" v-if="userType===1" >
					<text class="item-label"> 绑定员工身份 </text>
					<input  class="item-conten text-gray" disabled="true" :disabled="true" type="text" :placeholder="showAlreadyBindInfo" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { initBaseInfo,getCompanyInfo } from '@/static/js/common.js'
	export default {
		data() {
			return {
				userInfo:null,
				inputV:'',
				userType: -1,
				openId:-1,
				companyId:-1,
				salesId:-1,
				clientId:-1,
				
				companyInfo:'',
			}
		},
		computed:{
			showAlreadyBindInfo(){
				return '已经绑定 ' + this.companyInfo.companyName 
			}
		},
		async created() {
			const baseInfo = await initBaseInfo(this)
			this.initCompanyInfo(this.companyId)
		},
		methods: {

			// 初始化  公司信息
			async initCompanyInfo(companyId){
				let data = {id:companyId}
				const getCompanyInfoRes = await getCompanyInfo(data)
				if(getCompanyInfoRes.statu===200){
					this.companyInfo = getCompanyInfoRes.value
					console.log('----- company  ---')
					console.log(getCompanyInfoRes.value)
					
				}else{
					uni.showToast({
						title: getCompanyInfoRes.msg,
						icon:'none'
					})
				}
				
			},
			clientBindPhone(){
				uni.showToast({
					title:"功能开发中",
					icon:'none'
				})
			},
			personInfoEditBack(){
				
			},
			// 验证 销售信息
			verifySales(){
				let isGetUserInfo = uni.getStorageSync('isGetUserInfo')
				if(!isGetUserInfo){
					uni.showToast({
						title:'您还未授权，暂时不能进行销售认证',
						icon:'none'
					})
					return
				}
				console.log('***********')
				uni.navigateTo({
					url:'/pageSalesManager/bindSalesManager/bindSalesManager'
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

		