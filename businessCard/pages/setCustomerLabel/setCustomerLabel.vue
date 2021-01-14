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
			<view class="tag-list-container">
				<view class="tag-label"> 标签 </view>
				<view class="tag-main">
					<u-tag v-for="(item,index) in tagList" :key="index" class=" u-m-l-20 u-m-t-20"  :text="item.title" closeable shape="circle" @close="deleteTagClick(index)" />
				</view>
				<view class="tag-right">
					<u-icon name="arrow-right" size="30rpx"></u-icon>
				</view>
			</view>
			
		</view>
		<view class="u-m-t-50 text-center">
			<button class="cu-btn round bg-blue min-650"> 保存 </button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				remarks:'',
				tagList:[
					{id:0,title:'标签1'},
					{id:1,title:'标签2'},
					{id:2,title:'标签3'},
					{id:3,title:'标签4'},
					{id:4,title:'标签5'}
				],
				salesId:20,
			}
		},
		methods: {
			deleteTagClick(index){
				this.tagList.splice(index,1)
			}
		}
	}
</script>

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
}
.min-650{
	min-width: 650rpx;
}
</style>
