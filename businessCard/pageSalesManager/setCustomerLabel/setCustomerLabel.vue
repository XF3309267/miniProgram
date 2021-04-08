<template>
	<view>
		<u-navbar :is-back="true" title="客户管理" :is-fixed="true" height="44"></u-navbar>
		<view class="bg-white u-p-20">
			<u-field
				v-model="remarks"
				label="备注"
				label-width="70"
				label-align="center"
				icon-color="#000"
				placeholder="请输入备注"
				
				/>
			<view class="tag-list-container u-border-bottom">
				<view class="tag-label"> 标签 </view>
				<view class="tag-main">
					<!-- <view class="" v-if="tagList.length === 0" >
						<u-empty text="用户标签等待您去添加" mode="list"></u-empty>
					</view> -->
					<u-tag 
						v-for="(item,index) in userTagList" 
						closeable 
						:key="index" 
						class=" u-m-l-15 u-m-t-10"  
						:text="item.labelName"  
						shape="circle" 
						@click="delUserTag(index)" />
				</view>
				<!-- <view class="tag-right">
					<u-icon name="arrow-right" size="30rpx"></u-icon>
				</view> -->
			</view>
			
			
		</view>

		<view class="bg-white u-m-t-20">
			<view class="u-p-20 u-flex u-row-between u-border-bottom">
				<text class="u-type-default"> 可选标签列表 </text>
				<view class="" @click="toSalesTagPage">
					<text class="u-type-info"> 编辑标签  </text>
					<u-icon name="arrow-right" size="30rpx" ></u-icon>
				</view>
			</view>
		</view>
		<view class="bg-white u-p-20" >
			<view  v-if="salesTagList.length === 0" class="u-flex u-row-center" style="width: 100%;" @click="toSalesTagPage" >
				<u-empty  text="用户标签等待您去添加" mode="list"></u-empty>
			</view>
			<view class="tag-main " >
				<u-tag v-for="(item,index) in salesTagList"  :key="item.id" class="u-m-t-20 u-m-l-20" style="display: inline-block;" @click="adUserTag(index)" :text="item.labelName"  shape="circle" />
			</view>
			<!-- <view class="tag-label"> 已有标签 </view>
			<view class="tag-main">
				<u-tag v-for="(item,index) in salesTagList"  :key="item.id" class=" u-m-l-20 u-m-t-20" @click="adUserTag(index)" :text="item.labelName"  shape="circle" />
			</view>
			<view class="tag-right">
				<u-icon name="arrow-right" size="30rpx" @click="toSalesTagPage"></u-icon>
			</view> -->
		</view>
		<view class="u-m-t-50 text-center">
			<button class="cu-btn round bg-blue min-650" @click="saveUserTag" > 保存 </button>
		</view>
		
		<u-popup v-model="showTipPoup" mode="center" :closeable="false" width="730" height="500" border-radius="20">
			<view class="self-poupCard " style=" ">
				<view class="u-p-10 text-bold text-center">
					您还未保存哦！ 确认修改用户标签？
				</view>
				<view class="u-flex u-row-around u-p-20">
					<button class="cu-btn bg-gradual-red round " @click="cancelModify"  > 取消 </button>
					<button class="cu-btn bg-gradual-blue round " @click="confirmModify" > 确认 </button>
				</view>
			</view>
		</u-popup>
		
		
	</view>
</template>

<script>
	import { getActiveTypeList,addFollowupType,getUserTag,getSalesTag,updateUserInfo,getUserInfo,getUserInfoByClientId } from '@/services/services.js'
	import { initBaseInfo } from '@/static/js/common.js'
	export default {
		data() {
			return {
				remarks:'',
				userTagList:[
					// tagItem
					// {
					//   "id": 9,
					//   "labelName": "无意向",
					//   "salesId": 18,
					//   "createTime": "2021-01-09 15:57:38",
					//   "updateTime": "2021-01-09 15:57:38",
					//   "deleted": 0
					// },
					// {
					//   "id": 10,
					//   "labelName": "无意向",
					//   "salesId": 0,
					//   "createTime": "2021-01-09 15:57:38",
					//   "updateTime": "2021-01-09 15:57:38",
					//   "deleted": 0
					// },
				],
				salesTagList:[
					//  {
					//   "id": 19,
					//   "labelName": "宇智波尼玛",
					//   "salesId": 20,
					//   "createTime": "2021-01-20 14:30:02",
					//   "updateTime": "2021-01-26 14:28:55",
					//   "deleted": 1
					// },
					// {
					//   "id": 9,
					//   "labelName": "无意向",
					//   "salesId": 18,
					//   "createTime": "2021-01-09 15:57:38",
					//   "updateTime": "2021-01-09 15:57:38",
					//   "deleted": 0
					// },
					// {
					//   "id": 10,
					//   "labelName": "无意向",
					//   "salesId": 0,
					//   "createTime": "2021-01-09 15:57:38",
					//   "updateTime": "2021-01-09 15:57:38",
					//   "deleted": 0
					// },
				],
				userTagIdList:[],
				
				isSaved:true,
				showTipPoup: false,
				
				salesId:-1,
				clientId:-1,
				userInfo:'',
				userId:-1,
			}
		},
		onBackPress(e) {
		    console.log(e);
			
			if(!this.isSaved){
				this.showTipPoup = true
				return true
			}
		},
		async onLoad(options){

			console.log('setCustomerLabel')
			console.log(options)
			
			if(options.customerId){
				const setBaseInfo = await initBaseInfo(this)
				// 因为 initBaseInfo 会从本地缓存中或 clientId,但是 本地缓存中的 clientId 是使用者的（这里就应该是销售的 clientId)
				this.userId = options.customerId
				console.log('chatSalesManager setBaseInfo')
				console.log(setBaseInfo)
				if(setBaseInfo){
					this.initUserInfo()
				}
				this.initUserTagList(this.salesId,this.userId)
			}else{
				uni.showToast({
					title:"未获取到用户id",
					icon:'none'
				})
			}
			
		},
		onShow() {
			if(this.salesId!==-1&&this.userId!==-1){
				this.initSalesTagList(this.salesId)
			}
		},
		
		
		created() {
			
			
			
		},
		methods: {
			async initUserInfo(){

				const getUserRes = await getUserInfoByClientId({clientId:this.userId})
				
				
				if(getUserRes.statusCode === 200){
					let data = getUserRes.data.data
					this.userInfo = data
				}
			},
			async initUserTagList(salesId,clientId){
				console.log('initUserTagList 上传的data')
				console.log(salesId)
				console.log(clientId)
				const tagRes = await getUserTag({clientId,salesId})
				let tagData = {}
				console.log('getUserTagListRes')
				console.log(tagRes)
				if(tagRes.data.data){
					tagData = tagRes.data.data[0]
				}
				this.userTagList = []
				if(tagRes.statusCode===200){
					if(tagData.clientLabel){
						console.log('getUserTagList---------')
						console.log(tagData)
						this.userTagList = tagData.clientLabel
						
						if(this.salesId!==-1&&this.salesTagList.length===0){
							this.initSalesTagList(this.salesId)
						}
						
					}
				}
			},
			initTagIdList(tagList){
				if(!tagList){
					return []
				}
				const userTagIdList = tagList.map((item,index)=>{
					return item.id
				})
				console.log('初始化 userTagList')
				console.log(tagList)
				console.log(userTagIdList)
				
				this.userTagIdList = userTagIdList
				return userTagIdList
			},
			async initSalesTagList(salesId){
				const data = {id:salesId}
				const tagRes = await getSalesTag(data)
				console.log('salesTagRes')
				console.log(tagRes)
				if(tagRes.statusCode === 200){
					const salesTagList = tagRes.data.data
					// this.salesTagList = salesTagList
					
					
					this.salesTagList = this.fliterSalesTagList(tagRes.data.data)
					console.log('getSalesTagList ')
					console.log(this.salesTagList)
				}
			},
			// 对销售所有的标签进行一次过滤， salesTagList 不应该有 userTagList 的标签
			fliterSalesTagList(salesTagList){
				console.log('filter salesTagList userTagList')
				console.log(salesTagList)
				console.log(this.userTagList)
				
				
				let finalSalesTagList = salesTagList.filter(item=>{
					const salesTagItemId = item.id
					
					let finalRes = this.userTagList.some(item=>{
						if(item.id===salesTagItemId){
							return true
						}
					})
					return !finalRes
				})
				return finalSalesTagList
			},
			
			
			delUserTag(index){
				this.isSavedFalse()
				
				const deleteTagArr = this.userTagList.splice(index,1)
				const deleteTagItem = deleteTagArr[0]
				if(deleteTagItem.salesId === 0){
					this.salesTagList.unshift(deleteTagItem)
				}else{
					this.salesTagList.push(deleteTagItem)
				}
			},
			adUserTag(index){
				this.isSavedFalse()
				
				console.log('^^^^^^^^^^^^')
				console.log(this.userTagList)
				console.log(this.salesTagList)
				
				const deleteTagArr = this.salesTagList.splice(index,1)
				const deleteTagItem = deleteTagArr[0]
				console.log('***********')
				console.log(this.userTagList)
				console.log(deleteTagItem)
				if(deleteTagItem.salesId === 0){
					this.userTagList.unshift(deleteTagItem)
				}else{
					console.log('****111111111111*******')
					this.userTagList.push(deleteTagItem)
				}
			},
			//保存用户标签
			async saveUserTag(){
				uni.showLoading({
					title:'上传标签中...',
				})
				
				const idList = this.initTagIdList(this.userTagList)
				const isListStr = idList.join(',')
				
				
				const subData = {id:this.clientId,clientLable:isListStr }
				console.log('添加标签即将要上传的数据')
				console.log(subData)
				
				const saveUserTagRes = await updateUserInfo(subData)
				
				console.log('updataRes')
				console.log(saveUserTagRes)
				
				
				if(saveUserTagRes.statusCode===200){
					uni.showToast({
						title:'保存成功',
					})
					this.isSaved = true
				}
				uni.hideLoading()
			},
			isSavedFalse(){
				this.isSaved = false
			},
			cancelModify(){
				uni.navigateBack({
					delta:1
				})
			},
			confirmModify(){
				this.saveUserTag()
				this.showTipPoup = false
				
				// uni.navigateBack({
				// 	delta:1
				// })
			},
			// 前往销售标签页面
			toSalesTagPage(){
				uni.navigateTo({
					url:'/pages/setTag/setTag'
				})
			}
		}
	}
</script>


<!-- https://apis.map.qq.com;https://jylapi.jiayuanli.net;https://jylqn.kaiwumace.com;https://jylqndev.kaiwumace.com;https://jylqntest.kaiwumace.com;https://jyltestapi.jiayuanli.net;https://wechat.jiayuanli.net;https://wechattest.jiayuanli.net; -->
<!-- https://up-z2.qbox.me;https://up-z2.qiniup.com;https://up.qbox.me;https://up.qiniup.com; -->
<style lang="scss" scoped>
.tag-list-container{
	display: flex;
	align-items: center;
	padding: 20rpx 28rpx;
	.tag-label{
		
		color: #000;
		text-align: center;
		min-width: 70rpx;
	}
	.tag-main{
		flex-basis: 1;
		flex-grow: 1;
		
		
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		

		
	}
	.tag-right{
		min-height: 4em;
		line-height: 4em;
		width: 60rpx;
		padding: 20rpx;
	}
	.tag-normal{
		
	}
}
.min-h-2em{
	min-height: 2em;
}
.min-650{
	min-width: 650rpx;
}
.self-poupCard{
	display: flex;
	flex-flow: column nowrap;
	justify-content: space-around;
	width: 730rpx;
	height: 500rpx;
	padding: 40rpx;
	margin: auto;
	border-radius: 40rpx;
}
</style>
