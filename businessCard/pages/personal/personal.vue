<template>
	<view class="person-contain">
		<!-- :bgImage="getApp().globalData.navBgImg" -->
		<cu-custom  bgColor="bg-gradual-blue" id="customNav" >
			<block slot="content"> <text class="text-bold"> 家园里 </text> </block>
		</cu-custom>
		<view class="person-head" id="personHead">
			<view class="avatar" @click="toPersonCenter">
				<open-data type="userAvatarUrl"></open-data>
			</view>
			<view class="content padding-sm text-xl">
				<view class="limit-text  padding-left-sm" style="max-width: 8em">
					<open-data  type="userNickName"></open-data>
				</view>
				<view class="padding-xs text-xs">
					<view class='cu-tag round bg-gradual-blue'>访客</view>
				</view>
			</view>
			<view class="right">
				<button class="cu-btn block bg-gradual-green"   bindgetphonenumber='getPhoneNum' open-type='getPhoneNumber' > 去注册 <text class="cuIcon-right padding-xs"></text>  </button>
			</view>
		</view>
		<!--  用户应该显示的画面 -->
		<view  class="" >
			<view v-if="userType === 0" class=" flex justify-between padding-sm">
				<text class="  text-lg text-bold"> 我的销售经理 </text> 
			</view>
			<view v-if="userType === 1"  id="personCardTitle">
				<view class=" flex justify-between padding-sm" style="height: 100rpx;">
					<text class="  text-lg text-bold"> 我的名片 </text> 
					<text @click="toMangaerInfoEdit" > 修改 <text class="cuIcon-right"> </text> </text>
				</view>
			</view>
			<view class="" @click="toCardDetail">
				<salesManagerCard/>
			</view>
		</view>
		
		<view  v-if="userType === 1" class="">
			
			<view class=" flex justify-between padding bg-white align-center" style="height: 100rpx;" id="personHead">
				<text class="text-lg text-bold"> 我的客户 </text>
				<view class="padding-xs  round solids  flex align-center">
					<text class="cuIcon-search padding-xs"></text>
					<input type="text" value="" class="bg-white text-sm" :disabled="true"  @click="toUserListDetail" placeholder="搜索" />
				</view>
			</view>
			<block v-for="(item,index) in userList" :key="index" >
				<view :class="'indexItem-' + item.indexName" :id="'indexes-' + item.indexName" :data-index="item.indexName"  @click="customerClick(item.id)" >
					<view class="padding">{{item.indexName}}</view>
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
			<view class="indexBar" :style="[{zIndex:'1000',bottom: (26-list.length)*15+'rpx' }]">
				<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
					<view class="indexBar-item" v-for="(item,index) in list" :key="index" :id="index" @touchstart="getCur" @touchend="setCur"> {{item.name}}</view>
				</view>
			</view>
			<view v-show="!hidden" class="indexToast">
				{{listCur}}
			</view>
			
		</view>
		
		
		
		
	</view>
</template>

<script>
	import {pinyin} from '@/static/js/pinyin.js'
	import salesManagerCard from '@/components/SalesManagerCard.vue'
	
	import {uniBadge} from '@dcloudio/uni-ui'
	export default {
		data() {
			return {
				scrollTop: 0,
				indexList: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U","V", "W", "X", "Y", "Z"],
				// userType 区分用户 与销售
				userType:-1,
				salesManagerInfo:{
					avatar:'',
					name:'王珞丹',
					phone:'13970853937',
					company:'江西省家院里科技江西省家院里科技',
					mail:'123123222@gmail.com'
				},
				demoList:[
					{id:1,name:'A总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'},
					{id:1,name:'张总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'},
					{id:1,name:'章总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'},
					{id:1,name:'史总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'},
					{id:1,name:'B总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'},
					{id:1,name:'b总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'},
					{id:1,name:'波总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'},
					{id:1,name:'董总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'},
					{id:1,name:'柴总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'},
					{id:1,name:'江总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'},
					{id:1,name:'Z总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'},
					{id:1,name:'z总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'},
				],
				// 所有索引列表
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				hidden: true,
				sourceUserList:[],
				userList:[
					// {
					// 	indexName:'A',
					// 	list:[
					// 		{name:'A总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'},
					// 		{name:'A1总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'}
					// 	],
					// },
					// {
					// 	indexName:'B',
					// 	list:[
					// 		{name:'B总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'},
					// 		{name:'B1总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'}
					// 	],
					// },
					// {
					// 	indexName:'C',
					// 	list:[
					// 		{name:'C总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'},
					// 		{name:'C1总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'}
					// 	],
					// },
					// {
					// 	indexName:'D',
					// 	list:[
					// 		{name:'D总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'},
					// 		{name:'D1总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'}
					// 	],
					// },
					// {
					// 	indexName:'E',
					// 	list:[
					// 		{name:'E总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'},
					// 		{name:'E1总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'}
					// 	],
					// },
					// {
					// 	indexName:'F',
					// 	list:[
					// 		{name:'F总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'},
					// 		{name:'F1总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'}
					// 	],
					// },
					// {
					// 	indexName:'G',
					// 	list:[
					// 		{name:'G总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'},
					// 		{name:'G1总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'}
					// 	],
					// },
					// {
					// 	indexName:'H',
					// 	list:[
					// 		{name:'H总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'},
					// 		{name:'H1总',avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',phone:'15938279383',addInfo:'有意向'}
					// 	],
					// }
					
				],
				list: [],
				listCur: '',
			}
		},
		watch:{
			
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onLoad() {
			
		},
		onReady() {
			let that = this;
			uni.createSelectorQuery().select('.indexBar-box').boundingClientRect(function(res) {
				that.boxTop = res.top 
			}).exec();
		},
		onShow() {
			if(this.userType===-1){
				this.initUserType()
			}
		},
		created() {
			// this.initIndexList()
			this.arrangeUserList(this.demoList)
			
		},
		mounted() {
			
		},
		methods: {
			customerClick(customerId){
				uni.navigateTo({
					url:'/pages/chatSalesManager/chatSalesManager?customerId=customerId'+customerId
				})
			},
			// 初始化 userType
			initUserType(){
				this.userType = getApp().globalData.userType
			},
			toMangaerInfoEdit(){
				uni.navigateTo({
					url:'/pages/salesManagerInfoEdit/salesManagerInfoEdit'
				})
			},
			// 对 用户信息 根据名字的拼音首字母 分组
			arrangeUserList(sourceUserList){
				const resArr = []
				const initialArr = this.returnInitObjList()
				const list = sourceUserList
				list.forEach(item=>{
					// 名字首字母
					let nameInitial = this.returnCapWord(item.name)
					// 名字首字母的索引
					let initIndex = nameInitial.charCodeAt() - 'A'.charCodeAt()
					initialArr[initIndex].list.push(item)
				})
				let flitObj = this.flitUserList(initialArr)
				this.userList = flitObj.userArr
				this.list = flitObj.wordArr
			},
			// 返回 首字母的 列表  （纯函数）
			returnInitObjList(){
				const arr = []
				// 用以存放要展示的 用户列表
				for (let i=0 ; i < 26;i++) {
					const num = 65 + i 
					const word = String.fromCharCode(num)
					const obj = {indexName:word,list:[]}
					arr.push(obj)
				}
				return arr
			},
			// 过滤掉 首字母数组中没有数据的那一项
			// 
			flitUserList(list){
				const wordArr = []
				const userArr = list.filter(item=>{
					//	用以存放 通讯录左边的导航栏
					if(item.list.length!==0){
						const obj = {}
						obj.name = item.indexName
						wordArr.push(obj)
						return true
					}
				})
				return {userArr,wordArr}
			},
			// 返回汉字的拼音 首字母
			returnCapWord(wordStr){
				wordStr = wordStr.trim()
				let pinyinStr = pinyin(wordStr)
				let initial = pinyinStr.slice(0,1).toUpperCase()
				return initial
			},
			// 通讯录 页面的跳转
			scrollPage(indexName){
				let me = this;
				var query = wx.createSelectorQuery().in(me);
				query.selectViewport().scrollOffset()
				query.select("#customNav").boundingClientRect();
				query.select("#indexes-"+ indexName ).boundingClientRect();
				query.exec(function (res) {
				 var miss =  res[2].top + res[0].scrollTop - res[1].height;
				 uni.pageScrollTo({
				  scrollTop: miss,
				  duration: 300
				 });
				});
			},
			// 初始化 左边的导航栏 list
			initIndexList(){
				let list = [{}];
				for (let i = 0; i < this.userList.length; i++) {
					list[i] = {};
					list[i].name = this.userList[i].indexName
				}
				this.list = list;
				this.listCur = list[0];
			},
			
			// 获取用户手机号码
			getPhoneNum(e){
				console.log(e)
			},
			// 拨打电话
			phoneCall(){
				uni.makePhoneCall({
					phoneNumber: this.salesManagerInfo.phone,
					success(res) {
						console.log('makePhoneCall success')
						console.log(res)
					},
					fail(res){
						console.log('makePhoneCall fail')
						console.log(res)
					}
				})
			},
			// 添加联系人
			addPhonePerson(){
				uni.addPhoneContact({
				    nickName: this.salesManagerInfo.name,
				    mobilePhoneNumber: this.salesManagerInfo.phone, //手机号
					email:this.salesManagerInfo.mail,
				    success(res) {
				        console.log('success addPhoneContact');
						console.log(res)
				    },
				    fail(res) {
				        console.log('fail addPhoneContact');
						console.log(res)
				    }
				});
			},
			// 前往用户列表详情
			toUserListDetail(){
				uni.navigateTo({
					url:'/pages/contactUserList/contactUserList'
				})
			},
			
			// 前往名片详情
			toCardDetail(){
				console.log('------------------')
				uni.navigateTo({
					url:'/pages/salesManager/salesManager'
				})
			},
			// 索引列表
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
					let num = parseInt((y - offsettop) / 14);
					if(num<this.userList.length){
						this.listCur = that.list[num].name
					
					}
				};
			},
			//触发全部开始选择
			tStart() {
				this.hidden = false
			},
			//触发结束选择
			tEnd() {
				this.hidden = true;
			    this.scrollPage(this.listCur)
			},
		},
		components:{
			salesManagerCard
		}
	}
</script>

<style lang="scss" scoped>
	/*  全局CSS */
	.underLine{
		text-decoration: underline;
	}
	.padding-left{
		padding-right: 10rpx;
	}
	.person-contain{
		padding: 20rpx 0;
	}
	.person-head{
		display: flex;
		align-items: center;
		width: 700rpx;
		height: 200rpx;
		margin: auto;
		border-radius: 10rpx;
		background-color: #FFF;
		padding: 20rpx;
		
	}
	.person-head .content{
		display: flex;
		flex-flow: column nowrap;
		align-items: flex-start;
	}
	.person-head .right{
		height: 100%;
		display: flex;
		align-items: center;
	}
	.avatar{
		width: 4em;
		height: 4em;
		border-radius: 50%;
		overflow: hidden;
		background-color: #FFF;
	}
	.avatar image{
		width: 100%;
		height: 100%;
	}
	.sale-card{
		position: relative;
		display: flex;
		width: 700rpx;
		height: 370rpx;
		margin: auto;
		border-radius: 20rpx;
		background-color: #FFF;
	}
	.sale-card .left{
		width: 250rpx;
		height: 100%;
		border-radius: 20rpx 0 0 20rpx ;
		overflow: hidden;
	}
	.sale-card .absolute-right-icon{
		position: absolute;
		left: 300rpx;
		top: 0;
		font-size: 5em;
	}
	.sale-card .right{
		flex-basis: 1;
		flex-grow: 1;
		padding: 20rpx;
	}
	
	/* 索引列表 */
	.page {
		padding-top: 100upx;
	}

	.indexes {
		position: relative;
	}

	.indexBar {
		position: fixed;
		right: 0px;
		bottom: 50rpx;
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
	
	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
	}
	
	
</style>
