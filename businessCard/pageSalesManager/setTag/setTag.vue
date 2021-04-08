<template>
	<view>
		<u-navbar :is-back="true" title="设置标签" :is-fixed="true" height="44"></u-navbar>
		<view class="u-m-t-20 bg-white">
			<u-field
				v-model="tagValue"
				label="添加标签"
				label-width="120"
				label-align="center"
				icon-color="#000"
				placeholder="请输入标签"
				@confirm="confirmTag"
				/>
		</view>
		<view class="u-p-20 bg-white">
			<view class="">
				所有标签  <!-- <text class="text-gray u-font-20 u-p-l-20 "> 为您的用户合适的标签 </text> -->
			</view>
			<view class="tag-list u-p-20">
				<u-tag 
					v-for="(item,index) in salesTagList" 
					:key="index" 
					class="tag-item " 
					:closeable="item.salesId===0?false:true"
					type="info" 
					:type="item.salesId===0?'info':'success'" 
					:text="item.labelName"  
					shape="circle" 
					@close="deleteSalesTag(item,index)"
					 />
			</view>
		</view>

		<view class="bottom-btn ">
			<button class="cu-btn round bg-blue min-650"> 保存 </button>
		</view>
	</view>
</template>

<script>
	import {getSalesTag,deleteTag,addTag} from '@/services/services.js'
	export default {
		data() {
			return {
				salesId:-1,
				tagValue:'',
				tagList:[
				
				],

				salesTagList:[

				]
			}
		},
		onLoad() {
			this.initSalesId()
		},
		methods: {
			initSalesId(){
				try {
				    const value = uni.getStorageSync('salesId');
				    if (value) {
				        this.salesId = value
						this.initSalesTagList(this.salesId)
				    }
				} catch (e) {
				    // error
				}
			},
			async initSalesTagList(salesId){
				const data = {id:salesId}
				const tagRes = await getSalesTag(data)
				
				console.log('salesTagRes')
				console.log(tagRes)
				
				if(tagRes.statusCode === 200){
					const salesTagList = tagRes.data.data
					this.salesTagList = salesTagList
				}
			},
			async deleteSalesTag(item,index){
				uni.showModal({
				    title: '删除标签提示',
				    content: '您确认删除该标签吗',
				    success: async (res)=> {
						
				        if (res.confirm) {
				            const deleteTagItem = this.salesTagList.splice(index,1)
				            const deleteRes = await deleteTag(item)
							console.log('delete success')
							console.log(deleteRes)
							
				            if(deleteRes.statusCode === 200){
				            	uni.showToast({
				            		title:'删除成功',
									
				            	})
				            }else{
				            	// 没有删除成功 撤销本地的删除
				            	this.salesTagList.splice(index,0,deleteTagItem[0])
				            }
							
				        } else if (res.cancel) {
				            
				        }
				    }
				});
				
				
				
			},
			async addSalesTag(tagContent){
				let data = {labelName:tagContent,salesId:this.salesId}
				
				console.log('添加标签 上传数据')
				console.log(data)
				
				const demoTagObj = { "labelName": tagContent,"salesId": this.salesId,}
				this.salesTagList.push(demoTagObj)
				const addTagRes = await addTag(data)
				
				console.log('add success')
				
				
				if(addTagRes.statusCode === 200){
					uni.showToast({
						title:'成功添加标签'
					})
				} else{
					// 没有添加成功 撤销本地的添加
					this.salesTagList.pop()
				}
			},
			
			
			confirmTag(){
				const tagValue = this.tagValue
				this.tagValue = ''
				this.addSalesTag(tagValue)
				// this.addTagList(tagValue)
			},
			addTagList(title){
				const obj = {title:title}
				this.tagList.push(obj)
			},
			
		}
	}
</script>

<style lang="scss" scoped>
.tag-list{
	display: flex;
	flex-flow: row wrap;
	.tag-item{
		margin: 20rpx 0 0 20rpx;
	}
}
.bottom-btn{
	text-align: center;
	width: 100%;
	margin-top: 50vh;
	padding: 30rpx;
}
.min-650{
	min-width: 650rpx;
}
</style>
