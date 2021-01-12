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
				所有标签  <text class="text-gray u-font-20 u-p-l-20 "> 为您的用户合适的标签 </text>
			</view>
			<view class="tag-list u-p-20">
				<u-tag v-for="(item,index) in tagList" :key="index" class="tag-item " type="info"  mode="light" :text="item.title"  shape="circle" />
			</view>
		</view>

		<view class="bottom-btn ">
			<button class="cu-btn round bg-blue min-650"> 保存 </button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tagValue:'',
				tagList:[
					{id:0,title:'标签1标签'},
					{id:1,title:'标签2'},
					{id:2,title:'标签3'},
					{id:3,title:'标签4标签'},
					{id:4,title:'标签5标签'},
				]
			}
		},
		methods: {
			confirmTag(){
				const tagValue = this.tagValue
				this.tagValue = ''
				this.addTagList(tagValue)
			},
			addTagList(title){
				const obj = {title:title}
				this.tagList.push(obj)
			}
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
