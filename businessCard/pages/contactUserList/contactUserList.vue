<template>
	<view style="min-height: 100vh;overflow: hidden;">
		<cu-custom  bgImage="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg" :isBack="true"><block slot="backText">返回</block>
			<block slot="content">索引</block>
		</cu-custom>
		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入搜索的关键词" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round">搜索</button>
			</view>
		</view>
		<view class="indexBar" :style="[{height:'calc(100vh - ' + CustomBar + 'px - 50px)',zIndex:'100'}]">
			<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
				<view  class="indexBar-item" v-for="(item,index) in list" :key="index" :id="index" @touchstart="getCur" @touchend="setCur"> {{item.name}}</view>
			</view>
		</view>
		<!--选择显示-->
		<view v-show="!hidden" class="indexToast">
			{{listCur}}
		</view>
		<scroll-view scroll-y class="indexes" :scroll-into-view="'indexes-'+ listCurID" :style="[{height:'calc(100vh - '+ CustomBar + 'px)'}]"
		 :scroll-with-animation="true" :enable-back-to-top="true">
			<block v-for="(item,index) in userList"   :key="index">
				<view :class="'indexItem-' + item.indexName" :id="'indexes-' + item.indexName" :data-index="item.indexName">
					<view  class="padding">{{item.indexName}}</view>
					<view class="cu-list menu-avatar no-padding">
						<view class="cu-item flex" v-for="(userItem,sub) in item.list"   :key="sub">
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
			</block>
			<view class="text-center padding">
				没有更多了
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				hidden: true,
				listCurID: '',
				list: [],
				userList:[
					{
						indexName:'A',
						list:[
							{name:'A总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'},
							{name:'A1总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'}
						],
					},
					{
						indexName:'B',
						list:[
							{name:'B总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'},
							{name:'B1总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'}
						],
					},
					{
						indexName:'C',
						list:[
							{name:'C总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'},
							{name:'C1总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'}
						],
					},
					{
						indexName:'D',
						list:[
							{name:'D总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'},
							{name:'D1总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'}
						],
					},
					{
						indexName:'E',
						list:[
							{name:'E总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'},
							{name:'E1总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'}
						],
					},
					{
						indexName:'G',
						list:[
							{name:'G总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'},
							{name:'G1总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'}
						],
					}
					
				],
				listCur: '',
			};
		},
		onLoad() {
			
		},
		onReady() {
			let that = this;
			uni.createSelectorQuery().select('.indexBar-box').boundingClientRect(function(res) {
				that.boxTop = res.top
			}).exec();
			uni.createSelectorQuery().select('.indexes').boundingClientRect(function(res) {
				that.barTop = res.top
			}).exec()
		},
		created() {
			this.initIndexList()
		},
		mounted() {
			
		},
		methods: {
			initIndexList(){
				let list = [{}];
				for (let i = 0; i < this.userList.length; i++) {
					list[i] = {};
					list[i].name = this.userList[i].indexName
				}
				this.list = list;
				this.listCur = list[0];
			},
			//获取文字信息
			getCur(e) {
				this.hidden = false;
				this.listCur = this.list[e.target.id].name;
			},
			setCur(e) {
				this.hidden = true;
				this.listCur = this.listCur
			},
			//滑动选择Item
			tMove(e) {
				let y = e.touches[0].clientY,
					offsettop = this.boxTop,
					that = this;
				//判断选择区域,只有在选择区才会生效
				if (y > offsettop) {
					let num = parseInt((y - offsettop) / 20);
					this.listCur = that.list[num].name
				};
			},

			//触发全部开始选择
			tStart() {
				this.hidden = false
			},

			//触发结束选择
			tEnd() {
				this.hidden = true;
				this.listCurID = this.listCur
			},
			indexSelect(e) {
				let that = this;
				let barHeight = this.barHeight;
				let list = this.list;
				let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
				for (let i = 0; i < list.length; i++) {
					if (scrollY < i + 1) {
						that.listCur = list[i].name;
						that.movableY = i * 20
						return false
					}
				}
			}
		}
	}
</script>

<style>
	page {
		padding-top: 100upx;
	}

	.indexes {
		position: relative;
	}

	.indexBar {
		position: fixed;
		right: 0px;
		bottom: 0px;
		padding: 20upx 20upx 20upx 60upx;
		display: flex;
		align-items: center;
	}

	.indexBar .indexBar-box {
		width: 40upx;
		height: auto;
		background: #fff;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
		border-radius: 10upx;
	}

	.indexBar-item {
		flex: 1;
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		color: #888;
	}

	movable-view.indexBar-item {
		width: 40upx;
		height: 40upx;
		z-index: 9;
		position: relative;
	}

	movable-view.indexBar-item::before {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		top: 10upx;
		height: 20upx;
		width: 4upx;
		background-color: #f37b1d;
	}

	.indexToast {
		position: fixed;
		top: 0;
		right: 80upx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
		margin: auto;
		color: #fff;
		line-height: 100upx;
		text-align: center;
		font-size: 48upx;
	}
</style>