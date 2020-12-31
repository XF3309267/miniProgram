<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
			<button @click="clickLoginClound"> 调用云函数getTicket </button>
		</view>
	</view>
</template>

<script>
	import {getCode} from '@/services/service.js'
	export default {
		data() {
			return {
				title: 'Hello',
				userInfo:{},
			}
		},
		onLoad() {
			this.userLogin()
		},
		methods: {
			async userLogin(){
				let getCodeRes = await getCode()
				let code = getCodeRes.code
				let userInfo = this.userInfo
				uniCloud.callFunction({
					name:"quickLogin",
					data:{code,userInfo},
					success(res) {
						console.log('登录成功 ')
						console.log(res)
					},
					fail(res) {
						console.log('登录fail ')
						console.log(res)
					}
				})
			},
			getTicket(){
				uniCloud.callFunction({
					name:'getTicket',
					data:{},
				}).then(res=>{
					uniCloud.callFunction({
						name:'login',
						data:{ticket:res.ticket},
					}).then(res=>{
						console.log('调用 login 云函数之后')
						console.log(res)
					})
				})
			},
			clickLoginClound(){
				uniCloud.callFunction({
					name:'login',
					data:{arg:'传进参数'}
				}).then(res=>{
					console.log('调用 login云函数之后')
					console.log(res)
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
