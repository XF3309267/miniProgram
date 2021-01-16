<template>
	<view class="person-contain">
		<!-- :bgImage="getApp().globalData.navBgImg" -->
		<cu-custom  bgColor="bg-gradual-blue" id="customNav">
			<block slot="content"> <text class="text-bold"> 家园里 </text> </block>
		</cu-custom>
		<view class="person-head" id="personHead">
			<view class="flex align-center">
				<view class="avatar" @click="toPersonEdit">
					<open-data type="userAvatarUrl"></open-data>
				</view>
				<view class="content padding-sm text-xl">
					<view class="limit-text  padding-left-sm" style="max-width: 8em">
						<open-data  type="userNickName"></open-data>
					</view>
					<!-- <view class="padding-xs text-xs">
						<view class='cu-tag round bg-gradual-blue'>访客</view>
					</view> -->
				</view>
			</view>
			
			<view class="right">
				<u-icon name="arrow-right" color="#000000" size="80rpx" ></u-icon>
				<!-- <button class="cu-btn block bg-gradual-green"   bindgetphonenumber='getPhoneNum' open-type='getPhoneNumber' > 去注册 <text class="cuIcon-right padding-xs"></text>  </button> -->
			</view>
		</view>
		<!--  用户应该显示的画面 -->
		<view >
			<view v-if="userType === 0" class=" flex justify-between align-center  u-p-l-50 u-p-r-50">
				<text class="  text-lg text-bold"> 我的销售经理 </text> 
			</view>
			<view v-if="userType === 1"  id="personCardTitle " class="  u-p-l-50 u-p-r-50">
				<view class=" flex justify-between align-center"  style="height: 100rpx;">
					<text class="  text-lg text-bold"> 我的名片 </text> 
					<text class="u-type-info" @click="toMangaerInfoEdit" > 修改 <text class="cuIcon-right"> </text> </text>
				</view>
			</view>
			<view class="" @click="toCardDetail">
				<SalesManagerCard :salesManagerInfo="salesManagerInfo"  :companyInfo="companyInfo" @onMailList="onMailList" />
			</view>
		</view>
		
		<view  v-if="userType === 1" class="u-relative">
			
			<!-- <view class=" flex justify-between padding bg-white align-center" style="height: 100rpx;" id="personHead">
				<text class="text-lg text-bold"> 我的客户 </text>
				<view class="padding-xs  round solids  flex align-center">
					<text class="cuIcon-search padding-xs"></text>
					<input type="text" value="" class="bg-white text-sm" :disabled="true"  @click="toUserListDetail" placeholder="搜索" />
				</view>
			</view> -->
			<view class="sm-bar-container">
				<view class="main">
					<u-tabs-swiper ref="tabs" :list="smTablist" active-color="#ff5500" inactive-color="#606266" font-size="26" @change="smTabChange" :current="smTabCurrent"></u-tabs-swiper>
					<!-- <view class=""  v-show="smTabCurrent===0" style="position: absolute;left: 0; width: 100%;">
						<u-dropdown ref="uDropdown" @open="open" @close="close">
							<u-dropdown-item :title="fliterDateStr" class="" style="position: relative;" >
								<view class="slot-content bg-white" >
									<view class=" u-p-20  u-m-b-20 flex justify-around">
										<u-tag v-for="(item,index) in filterActiveList" :kye="index" :text="item.label" shape="circle" />
									</view>
								</view>
							</u-dropdown-item>
						</u-dropdown>
					</view> -->
					
				</view>
				<view  v-show="smTabCurrent===0" class="right-icon" @click="filterClick">
					<text class="u-p-r-20"> {{fliterDateStr}} </text>
					<u-icon  :name="isFilter?'arrow-up':'arrow-down' " size="40"></u-icon>
				</view>
				<view v-show="smTabCurrent===1 "  @click="toUserListDetail" class="right-icon">
					<u-icon  name="search" size="40"></u-icon>
				</view>
			</view>
			<view :class="['filter-list',isFilter?'filter-list-active':'' ]">
				<u-tag 
					v-for="(item,index) in filterActiveList" 
					:key="index" 
					:text="item.label" 
					:mode="filterActiveIndex===index?'dark':'light' " 
					@click="selectFilter(index)"
					shape="circle" />
			</view>
			<view v-show="smTabCurrent===0" class="">
				<view class="cu-list menu-avatar no-padding">
					<view class="cu-item flex u-p-t-20 u-p-b-20 u-p-l-40 u-p-r-40" v-for="(userItem,sub) in userActiveList"   :key="sub">
						<view class="cu-avatar self-avatar" style="width: 2em;height: 2em;">
							<image :src="userItem.avatar"  mode="aspectFill"></image>
						</view>
						<view class="content">
							<view class=" flex align-center">
								<text class="text-bold text-black"> {{userItem.clientName}}  </text>
								<!-- <text class="u-p-l-20 u-font-20 text-grey"> {{userItem.clientBz}}  </text> -->
							</view>
							<view class="text-gray text-sm">
								{{userItem.activeContent}}
							</view>
						</view>
						<view class="right-container" @click="customerClick(userItem.clientId)">
							<view class="right-title">
								{{ showTimeStr(userItem.createTime)}}
							</view>
							<view class="chat-icon u-m-r-20">
								<image src="@/static/img/personImg/news.png"></image>
							</view>
						</view>
					
					</view>
				</view>
			</view>
			
			
			<view v-show="smTabCurrent===1" class="">
				<block v-for="(item,index) in userList" :key="index" >
				
					<view :class="'indexItem-' + item.indexName" :id="'indexes-' + item.indexName" :data-index="item.indexName"  @click="customerClick(item.id)" >
						<view class="padding u-p-l-40">{{item.indexName}}</view>
						<view class="cu-list menu-avatar no-padding">
							<view class="cu-item flex u-p-b-20 u-p-l-40 u-p-r-40" v-for="(userItem,sub) in item.list"   :key="sub">
								<view class="cu-avatar self-avatar" style="width: 2em;height: 2em;">
									<image :src="userItem.avatar" style="width: 100%; height: 100%;" mode="aspectFill"></image>
								</view>
								<view class="content">
									<view class=" flex align-center">
										<text class="text-bold"> {{userItem.clientName}}  </text>
										<text class="u-p-l-20 u-font-20 text-grey"> {{userItem.clientBz}}  </text>
									</view>
									<view class="text-gray text-sm">
										{{userItem.clientPhone}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
			
			
			
			
			
			
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
	import SalesManagerCard from '@/components/SalesManagerCard.vue'
	
	import {uniBadge} from '@dcloudio/uni-ui'
	import {previewImg,getSalesInfo,getCompanyInfo,userAction} from '@/static/js/common.js'
	
	import {getClientInfosByCardSalesId,getCardClientActiverecordByWeek} from '@/services/services.js'
	
	export default {
		data() {
			return {
				scrollTop: 0,
				indexList: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U","V", "W", "X", "Y", "Z"],
				// userType 区分用户 与销售
				userType:-1,
				companyInfo:'',
				salesManagerInfo:{},
				searchResList:[],
				
				isFilter:false,
				filterActiveIndex: 0,   // 筛选日期被选中的  数组索引
				filterActiveList: [
					{
						label: '全部',
						value: 0,
					},
					{
						label: '一周',
						value: 1,
					},
					{
						label: '半个月',
						value: 2,
					},
					{
						label: '一个月',
						value: 3,
					}
				],
				
				smTabCurrent:0,
				smTablist:[
					{
						name: '用户访问'
					}, {
						name: '我的客户'
					},
				],
				
				
				clientId:2,
				salesId:20,
				
				
				// 所有索引列表
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				hidden: true,
				sourceUserList:[],
				userList:[],
				userActiveList:[],
				
				

				list: [],
				listCur: '',
			}
		},
		computed:{
			fliterDateStr(){
				return this.filterActiveList[this.filterActiveIndex].label
			},
			filterStyle(){
				if(this.isFilter){
					return {top:'100rpx',opacity:1 }
				}else{
					return '{opacity:0}'
				}
			},
			showTimeStr(){
				return (data) => {
					return this.timeDistance(data)
				}
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
		async created() {
			// this.initIndexList()
			const getSalesInfoRes = await this.initSalesInfo(this.salesId)
			this.initSalesBinds(this.salesId)
			this.getUserActive(this.salesId)
			if(getSalesInfoRes){
				this.initCompanyInfo(this.salesManagerInfo.companyId)
			}
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
			// 初始化 销售的信息
			initSalesInfo(salesId){
				return new Promise(async (resolve,reject)=>{
					uni.showLoading({
						title:'您的专属销售正在赶路的路上...',
						mask:true
					})
					
					let data = {id:salesId}
					const getSalesInfoRes = await getSalesInfo(data)
					if(getSalesInfoRes.statu===200){
						this.salesManagerInfo = Object.assign({},getSalesInfoRes.value)
						resolve(true)
					}else{
						uni.showToast({
							title: getSalesInfoRes.msg,
							icon:'none'
						})
						resolve(false)
					}
					uni.hideLoading()
				})
				
			},
			// 初始化  公司信息
			
			async initCompanyInfo(companyId){
				uni.showLoading({
					title:'公司信息资源获取中....',
					mask:true
				})
				
				let data = {id:companyId}
				const getCompanyInfoRes = await getCompanyInfo(data)
				if(getCompanyInfoRes.statu===200){
					this.companyInfo = getCompanyInfoRes.value
					console.log('----- company  ---')
					console.log(getCompanyInfoRes.value)
				}else{
					uni.showToast({
						title: getCompanyInfoRes.msg,
						icon:'none'
					})
				}
				uni.hideLoading()
			},
			//  初始化 销售所绑定的 用户的信息
			async initSalesBinds(salesId){
				let argObj = {}
				
				//*********！！！！！！！！！！！！
				// 这里 暂时更改 salesId
				salesId = 1
				argObj.id = salesId
				
				console.log('argObj')
				console.log(argObj)
				
				let getRes = await getClientInfosByCardSalesId(argObj)
				if(getRes.statusCode === 200){
					this.searchResList = getRes.data.data
					this.arrangeUserList(this.searchResList)
				}
			},
			// 获取该销售 所绑定的用户的 活跃记录
			async getUserActive(){
				let dataObj = {saleId:this.salesId}
				const res = await getCardClientActiverecordByWeek(dataObj)
				console.log('&&&&&&&&&&&&&')
				console.log(res)
				if(res.statusCode === 200){
					this.userActiveList = res.data.data
				}
			},
			// 
			
			
			// 用户访问 我的客户  tabbar
			smTabChange(index){
				this.smTabCurrent = index
				this.closeFliterList()
			},
			
			// 跳转至 销售编辑页面
			toMangaerInfoEdit(){
				uni.navigateTo({
					url:'/pages/salesManagerInfoEdit/salesManagerInfoEdit'
				})
			},
			
			// 时间差
			//	参数：时间戳
			timeDistance(oldTime,newTime){
				if(!newTime){
					newTime = this.moment()
				}
				
				if(!oldTime){
					oldTime = this.moment(1610767485276)
				}
				
				const timeType = typeof oldTime
				if(timeType==='String'){
					oldTime = this.moment(oldTime).unix() * 1000
				}
				
				
				let oldMoment = this.moment(oldTime)
				let newMoment = this.moment(newTime)
				let tempTimeDay = newMoment.diff(oldMoment, 'day')
			
				let resStr = oldMoment.format('YYYY年MM月DD日')

				
				if(tempTimeDay<=7){
					resStr = oldMoment.format('dddd')
				}
				
				if(tempTimeDay===1){
					resStr = '昨天' + oldMoment.format('a h:mm')
				}
				
				if(tempTimeDay===0){
					resStr = oldMoment.format('a h:mm')
				}
				return resStr
			},
			selectFilter(index){
				this.filterActiveIndex = index
				this.closeFliterList()
			},
			filterClick(){
				this.isFilter = ! this.isFilter
			},
			// 打开下拉菜单
			openFliterList(){
				this.isFilter = true
			},
			closeFliterList(){
				this.isFilter = false
			},
			
			// 对 用户信息 根据名字的拼音首字母 分组
			arrangeUserList(sourceUserList){
				const resArr = []
				const initialArr = this.returnInitObjList()
				const list = sourceUserList
				list.forEach(item=>{
					// 名字首字母
					let nameInitial = this.returnCapWord(item.clientName)
					// 名字首字母的索引
					let initIndex = nameInitial.charCodeAt() - 'A'.charCodeAt()
					initialArr[initIndex].list.push(item)
				})
				let flitObj = this.flitUserList(initialArr)
				this.userList = flitObj.userArr
				console.log(this.userList)
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
				if(!wordStr){
					return 'A'
				}
				
				
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
			
			
			// 保存通讯录的 额外操作
			// 因为只是单方面的对 销售的信息操作，不涉及后台
			onMailList(){
				userAction(this.clientId,this.salesId,3)
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
			// 前往用户资料中心
			toPersonEdit(){
				uni.navigateTo({
					url:'/pages/personInfoEdit/personInfoEdit'
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
			SalesManagerCard
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
		background-color: #F8F8F9;
	}
	.person-head{
		display: flex;
		justify-content: space-between;
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
		padding-right: 36rpx;
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
	.sm-bar-container{
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #FFFFFF;
		padding: 20rpx 50rpx ;
		.main{
			z-index:1000;
			flex-basis: 1;
			flex-grow: 1;
		}
		.right-icon{
			z-index:1000;
			padding: 20rpx 30rpx;
			background-color: #FFFFFF;
		}
		
	}
	.filter-list{
		position: absolute;
		z-index: 10;
		left: 0;
		
		top: 0rpx;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-around;
		width: 100%;			
		height: 100rpx;
		padding: 20rpx;
		background-color: #FFFFFF;
		transition: all .5s;
		opacity: 0;
	}
	.filter-list-active{
		top: 100rpx;
		opacity: 1;
	}
	
	
	image{
		width: 100%;
		height: 100%;
	}
	.right-container{
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
		
		min-width: 6em;
		padding: 10rpx;
		text-align: center;
		.chat-icon{
			width: 2em;
			height: 2em;
			padding: .2em;
		}
		.right-title{
			color: #999999;
		}
	}

</style>
