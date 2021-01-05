<template>
	<view class="padding-top padding-bottom bg-white">
		<cu-custom bgImage="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg" bgColor="bg-gradual-blue" id="customNav" >
			<block slot="content"> <text class="text-bold"> 修改名片 </text> </block>
		</cu-custom>
		<view class="text-center">
			<view class="avatar-container">
				<image :src="salesManagerInfo.avatar"  mode="aspectFit"></image>
			</view>
			<view class="">
				个人形象照
			</view>
		</view>
		<view class="cu-list menu sm-border  margin-top" >
			<view class="cu-item " >
				<view class="flex align-center">
					<text class="item-label "> 姓名 </text>
					<input class="item-conten" disabled="true" type="text" v-model="inputV" placeholder="您的昵称" />
				</view>
			</view>
			<view class="cu-item  " >
				<view class="flex align-center">
					<text class="item-label "> 职位 </text>
					<input class="item-conten" disabled="true" type="text" placeholder="绑定手机号" />
				</view>
			</view>
			<view class="cu-item " >
				<view class="flex align-center">
					<text class="item-label"> 公司名 </text>
					<input class="item-conten text-gray" disabled="true" type="text" placeholder="企业员工专用" />
				</view>
			</view>
			<view class="cu-item " >
				<view class="flex align-center">
					<text class="item-label"> 个人简介 </text>
				</view>
			</view>
			<view class="cu-item padding" >
				<editor id="editor" placeholder="请输入个人简介" @ready="onEditorReady" @input="editorInput" ></editor>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				salesManagerInfo:{
					name:'王珞丹',
					avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
					position:'',
					wxId:'wx_id1245343543',
					phone:'13970853937',
					company:'江西省家院里科技江西省家院里科技',
					brief:'',
					mail:'123123222@gmail.com'
				},
				imgList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
				editorCtx:'',
				inputV:'',
			}
		},
		methods: {
			onEditorReady(){
				uni.createSelectorQuery().select('#editor').context((res)=>{
					this.editorCtx = res.context
				}).exec()
			},
			undo(){
				this.editorCtx.undo()
			},
			editorInput(e){
				this.inputV = e.detail.text
			}
		}
	}
</script>

<style lang="scss" scoped>
.avatar-container{
	width: 150rpx;
	height: 130rpx;
	overflow: hidden;
	image{
		width: 100%;
		height: 100%;
	}
	margin: auto;
}
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
