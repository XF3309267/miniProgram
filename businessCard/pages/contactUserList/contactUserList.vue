<template>
	<view class="contact-container">
		<cu-custom  :isBack="true"><block slot="backText">返回</block>
			<block slot="content"> 搜索 </block>
		</cu-custom>
		<view class="cu-bar bg-white search " >
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" v-model="inputV" placeholder="输入搜索的关键词" confirm-type="search" @input="searchChange"  @confirm="searchConfirm"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round"  @click="searchConfirm">搜索</button>
			</view>
		</view>
		<view class="tag-list">
			<text  v-for="(item,index) in tagList" :key="item.id" class="item cu-tag round " :class="[index===activeTagIndex?'active-tag bg-white':'']"   @click="tagClick(item,index)" > {{item.title}} </text>
		</view>
		<view class="cu-list menu-avatar no-padding">
			<view class="cu-item flex" v-for="(userItem,sub) in searchResList"   :key="sub">
				<view class="cu-avatar self-avatar" style="width: 2em;height: 2em;">
					<image :src="userItem.avatar" style="width: 100%; height: 100%;" mode="aspectFill"></image>
				</view>
				<view class="content">
					<view class="text-grey">{{userItem.name + ' ' + userItem.addInfo   }} </view>
					<view class="text-gray text-sm">
						{{userItem.phone}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				tagList:[
					{id:0,title:'已成交'},
					{id:1,title:'有意向'},
					{id:2,title:'周末联系'},
					{id:3,title:'暂不联系'},
					{id:4,title:'可推广'}
				],
				activeTagIndex:-1,
				inputV:'',
				searchResList:[]
			};
		},
		onLoad() {
			
		},
		onReady() {

		},
		created() {
			
		},
		mounted() {
			
		},
		methods: {
			// 模拟搜索接口
			moniSearch(){
				let res = {code:200,data:{}};
				return new Promise(function(resolve,reject){
					setTimeout(()=>{
						const res = {
								code:200,
								data:{
										list:[
											{name:'柴总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'},
											{name:'江总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'},
											{name:'Z总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'},
											{name:'z总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'},
										],
									},
								}
						resolve(res)
					},500)
				})
			},
			
			
			// 发起搜索
			async searchText(text){
				text = text.trim()
				
				if(!text){
					uni.showToast({
						title:'您还未输入任何内容',
						icon:'none'
					})
					return 
				}
				
				console.log('搜索的 内容')
				console.log(text)
				
				uni.showLoading({
					title:'搜索中...',
					mask:true,
				})
				const res = await this.moniSearch(text)
				
				if(res.code === 200){
					this.searchResList = res.data.list
				}else{
					console.log(res)
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
				}
				uni.hideLoading()
			},
			// 搜索框 change 事件
			searchChange(){
				this.activeTagIndex = -1
				console.log(this.activeTagIndex)
			},
			
			// search 搜索框 点击搜索
			searchConfirm(){
				this.searchText(this.inputV)
			},
			
			
			// 点击标签
			tagClick(item,index){
				this.inputV = item.title
				this.searchText(item.title)
				this.activeTagIndex = index
			}
		}
	}
</script>

<style  lang="scss">
	page{
		// padding-top: 100rpx;
	}
	.contact-container {
		min-height: 100vh;
		background-color: #FFFFFF;
		// padding-top: 100rpx;
	}
	.tag-list{
		display: flex;
		flex-flow: row wrap;
		padding: 20rpx;
		background-color: #FFFFFF;
		
		.item{
			margin: 20rpx 0 0 30rpx ;
			font-size: 1.1em;
		}
		.active-tag{
			border: 1rpx solid #19BE6B;
			color: #19BE6B;
		}
	}
</style>