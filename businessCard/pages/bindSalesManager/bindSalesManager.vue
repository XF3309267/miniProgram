<template>
	<view>
		<cu-custom  bgImage="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg" :isBack="true">
			<block slot="backText"><text @click="personInfoEditBack"> 返回</text>  </block>
			<block slot="content"> 个人资料 </block>
		</cu-custom>
		<view class="self-marginTop padding ">
			<view class="text-center">
				如果您为【家园里】的员工，
			</view>
			<view class="text-center">
				请绑定员工身份，以便更好的使用小程序。
			</view>
		</view>
		<view class="self-marginTop padding text-center">
			<button class="cu-btn bg-gradual-green round " open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">绑定员工身份</button>
		</view>
	</view>
</template>

<script>
	import WXBizDataCrypt from "@/static/js/WXBizDataCrypt.js"
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			onGetPhoneNumber(res){
				if(e.detail.errMsg=="getPhoneNumber:fail user deny"){       //用户决绝授权  
					uni.showToast({
						title:'若您是企业员工，请认证后使用',
						icon:'none'
					})
					
				}else{      //允许授权  
					 let pc = new WXBizDataCrypt('wxXXXXXXX',this.session_key);           //wxXXXXXXX为你的小程序APPID  
					let data = pc.decryptData(e.detail.encryptedData , e.detail.iv);  
					console.log(data)       //data就是最终解密的用户信息  
		
					//后续操作。。。  
				}  
			}
		}
	}
</script>

<style scoped>
.self-marginTop{
	margin-top: 200rpx
}
</style>
