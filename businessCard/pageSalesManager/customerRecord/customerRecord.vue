<template>
	<view >
		<!-- <cu-custom  bgColor="bg-gradual-blue" :isBack="true" >
			<block slot="content"> <text class="text-bold"> 用户追踪 </text> </block>
		</cu-custom> -->
		<u-navbar  title="用户追踪" :is-fixed="true" height="44"></u-navbar>
			<u-picker mode="time" v-model="datePickerShow" :params="dateParams" @confirm="selectTimeConfirm"></u-picker>
			<view class="bg-white u-m-b-20" @click="datePickerShow = true">
				<u-cell-item icon="clock" :title="toTimeStr(selectTimeNum)" :arrow="true" arrow-direction="right"></u-cell-item>
				<view class="u-p-10 u-p-l-20 u-font-12 u-type-info">
					注：选择的时间不能小于追踪记录中最新的一条记录的时间
				</view>
			</view>
			<view class="padding bg-white flex">
				<view class="text-center min-5em">
					跟进方式
				</view>
				<view class="u-p-l-20">
					<u-radio-group v-model="radioValue" @change="radioGroupChange">
						<view  class="radio-group" style="display: flex;flex-flow: row wrap; " >
							<view v-for="(item, index) in radioList" :key="index"  class="min-9em">
								<u-radio
									:name="item.value"
									:disabled="item.disabled"
								>
									<text style="font-size: .8em;"> {{item.name}} </text>	
								</u-radio>
							</view>
							
						</view>
						
					</u-radio-group>
				</view>
			</view>
			<view class=" flex u-p-20 bg-white margin-top u-font-34 ">
				<text class="u-p-r-20"> 跟进进度 </text>
				<view class="flex-aloneHold">
					<!-- hold-keyboard -->
					<input type="text" v-model="recordInputV" hold-keyboard  placeholder="请输入跟进进度"  :adjust-position="false"  maxlength="300"></input>
				</view>
			</view>
			<!-- <view class="bg-white margin-top">
				<u-field
					v-model="recordInputV"
					:trim="true"
					label="跟进进度"
					placeholder="请输入跟进记录"
					placeholder-style="color: #c7c7c7"
					required
				>
				</u-field>
			</view> -->
			<view class="u-p-30 text-center">
				<button class="cu-btn round  min-650 bg-blue"    @click="inputConfirm"  > 保存 </button>
			</view>
			<view class="u-p-20 bg-white">
				<u-time-line >
					<u-time-line-item  v-for="(item,index) in salesDefineRecordList" :key="index"  bg-color="#0055ff" nodeTop="2" >
						<template  v-slot:content>
							<view >
								<view class="u-order-time">{{item.followUpTime}} </view>
								<view class="u-p-t-14"> {{item.followUpSchedule}} </view>
								<view class="u-order-time u-font-14">{{ followType(item.followupWay)}} </view>
							</view>
						</template>
					</u-time-line-item>
				</u-time-line >
			</view>
		
<!-- 		<view>
			<view>
				<u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper :style="{height:scrollViewHeight}" class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item"  >
					<scroll-view class="scrollClass" :style="{height:scrollViewHeight}" scroll-y  @scrolltolower="onreachBottom">
						<u-time-line >
							<u-time-line-item  v-for="(item,index) in customerRecordList" :key="index"  bg-color="#0055ff" nodeTop="2" >
								<template  v-slot:content>
									<view >
										<view class="u-order-time">{{toTimeStr(item.time)}} </view>
										<view class="u-p-t-14"> {{item.content}} </view>
									</view>
								</template>
							</u-time-line-item>
						</u-time-line>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view  class="bg-gray u-p-t-20" :style="{height:scrollViewHeight}"  scroll-y  @scrolltolower="onreachBottom">
						<u-picker mode="time" v-model="datePickerShow" :params="dateParams" @confirm="selectTimeConfirm"></u-picker>
						<view class="bg-white u-m-b-20" @click="datePickerShow = true">
							<u-cell-item icon="clock" :title="toTimeStr(selectTimeNum)" :arrow="true" arrow-direction="right"></u-cell-item>
						</view>
						<view class="padding bg-white flex" >
							<view class="text-center min-5em">
								跟进方式
							</view>
							<view class="u-p-l-20">
								<u-radio-group v-model="radioValue" @change="radioGroupChange">
									<view  class="radio-group" style="display: flex;flex-flow: row wrap; " >
										<view v-for="(item, index) in radioList" :key="index"  class="min-9em">
											<u-radio
												:name="item.value"
												:disabled="item.disabled"
											>
												<text style="font-size: .8em;"> {{item.name}} </text>	
											</u-radio>
										</view>
										
									</view>
									
								</u-radio-group>
							</view>
			 			</view>
						<view class=" flex u-p-20 bg-white margin-top u-font-34 ">
							<text class="u-p-r-20"> 跟进进度 </text>
							<view class="flex-aloneHold">
								<input type="text" v-model="recordInputV"  placeholder="请输入跟进进度"  :adjust-position="false"  maxlength="300" ></input>
							</view>
						</view>
						<view class="u-p-30 text-center">
							<button class="cu-btn round  min-650 bg-blue"   @click="submit"> 保存 </button>
						</view>
						<view class="u-p-20 bg-white">
							<u-time-line >
								<u-time-line-item  v-for="(item,index) in salesDefineRecordList" :key="index"  bg-color="#0055ff" nodeTop="2" >
									<template  v-slot:content>
										<view >
											<view class="u-order-time">{{toTimeStr(item.time)}} </view>
											<view class="u-p-t-14"> {{item.content}} </view>
											<view class="u-order-time">{{ item.type }} </view>
										</view>
									</template>
								</u-time-line-item>
							</u-time-line >
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view> -->
		
	</view>
</template>

<script>
	import { getActiveTypeList,addFollowupType,getUserInfoByClientId,getListByClientId } from '@/services/services.js'
	import { initBaseInfo } from '@/static/js/common.js'
	
	
	let systemInfo = uni.getSystemInfoSync();
	
	export default {
		data() {
			return {
				statusBarHeight: systemInfo.statusBarHeight,
				
				salesId:-1,
				clientId:-1,
				userId:-1,
				list: [],
				tabs:[
					{content:'111'},
					{content:'222'},
				],
				
				datePickerShow: false,
				dateParams:{
						year: true,
						month: true,
						day: true,
						hour: true,
						minute: true,
						second: true,
				},
				
				radioValue:'',
				radioList:[],
				customerRecordList:[
					{time: 1610184630000,content:'发起了即时聊天'},
					{time: 1610184630000,content:'分享了您的名片'},
					{time: 1610184630000,content:'查看了您的名片'},
					{time: 1610184630000,content:'保留了您的微信号'}
				],
				salesDefineRecordList:[
						{
							"id": 6,
							"followupWay": 6,
							"clientId": 43,
							"followUpSchedule": "已拉黑",
							"followUpTime": "2021-01-11 19:25:34",
							"createTime": "2021-01-11 19:25:34",
							"updateTime": "2021-01-15 10:40:59",
							"deleted": 0,
						},
						
						
						
					// {time: 1610184630000,content:'需要再和公司聊一下',type:'微信沟通'},
					// {time: 1610184630000,content:'未回复推个案例看看',type:'小程序即时沟通'},
					// {time: 1610184630000,content:'需要再和公司聊一下',type:'微信沟通'},
					// {time: 1610184630000,content:'未回复推个案例看看',type:'小程序即时沟通'},
					// {time: 1610184630000,content:'需要再和公司聊一下',type:'微信沟通'},
					// {time: 1610184630000,content:'未回复推个案例看看',type:'小程序即时沟通'},
				],
				// 跟进记录输入框
				recordInputV:'',
				selectTimeNum:'',
				swiperList: [{
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
				
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
			};
		},
		computed:{
			scrollViewHeight(){
				// 44px 	导航栏高度
				// 80rpx 	全屏选项卡 导航栏高度
				let str = `calc(100vh - ${this.statusBarHeight + 'px'} - 44px - 80rpx)`
				console.log('scorllview height')
				console.log(str)
				return str 
			},
			followType(){
				return (id)=> {
					 let finalTypeStr = ""
					 if(this.radioList){
						this.radioList.some(item=>{
							if(item.value === id){
								finalTypeStr = item.name
								return true
							}
						}) 
						return  finalTypeStr 
					 }

				}
			}
		},
		
		async onLoad(options) {
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
					this.initFollowType()
					this.initUserActiveList()
				}
				
				
			}else{
				uni.showToast({
					title:"未获取到用户id",
					icon:'none'
				})
			}
			this.initSelectTime()
		},
		created() {
			
		},
		
		methods: {
			// 初始化 radioGroup 的初始值
			initRadioValue(){
				console.log(this.radioList)
				
				this.radioValue = this.radioList[0].value
			},
			initSelectTime(){
				this.selectTimeStr = this.moment().unix()
			},
			async initUserInfo(){
			
				const getUserRes = await getUserInfoByClientId({clientId:this.userId})
				
				
				if(getUserRes.statusCode === 200){
					let data = getUserRes.data.data
					this.userInfo = data
				}
			},
			async initUserActiveList(){
				console.log('this.userId')
				console.log(this.userId)
				
				const userActiveListRes = await getListByClientId({clientId:this.userId})
				console.log('userActiveListRes')
				console.log(userActiveListRes)
				
				if(userActiveListRes.statusCode!==200){
					uni.showToast({
						title:'网络出错，请稍后重试',
						icon:'none'
					})
					return
				}
				if(userActiveListRes.data.code ===0){
					this.salesDefineRecordList = userActiveListRes.data.data
				}else{
					uni.showToast({
						title:userActiveListRes.data.msg,
						icon:'none'
					})
					return
				}
			},
			
			// 初始化 跟进类型
			async initFollowType(){
				let followTypeRes = await getActiveTypeList()
				if(followTypeRes.statusCode===200){
					const tagList = followTypeRes.data.data
					let resTagList = []
					tagList.forEach((item,index)=>{
						let tempObj = {}
						tempObj.name = item.followUpType
						tempObj.value = item.id
						resTagList[index] = tempObj
					})
					this.radioList = resTagList
					this.initRadioValue()
				}else{
					uni.showToast({
						title:followTypeRes.data.msg,
						icon:'none'
					})
				}
			},

			
			// 添加用户记录
			async addUserRecord(){
				
				let dataObj = {clientId:this.userId,salesId:this.salesId,followUpSchedule:this.recordInputV,followupWay:this.radioValue,followUpTime:this.toTimeStr(this.selectTimeNum)}
				let show
				console.log('提交后的数据')
				console.log(dataObj)
				
				this.salesDefineRecordList.unshift(dataObj)
				const addRecordRes = await addFollowupType(dataObj)
				console.log('提交跟进记录 返回数据')
				console.log(addRecordRes)
				
				if(addRecordRes.statusCode===200){
					uni.showToast({
						title:'记录添加成功'
					})
				}else{
					uni.showToast({
						title:addRecordRes.data.msg,
						icon:'none'
					})
					this.salesDefineRecordList.shift()
				}
			},
			// 选择时间后的 this.selectTimeNum  会得到相应的时间戳
			selectTimeConfirm(e){
				console.log('时间选择返回的值')
				console.log(e)
				let timeStr = `${e.year}-${e.month}-${e.day}-${e.hour}-${e.minute}-${e.second}`
				let timeNum = this.moment(timeStr,"YYYY-MM-DD-HH-mm-ss")
				let currentTimeNum = this.moment(this.salesDefineRecordList[0].followUpTime)
				
				this.selectTimeNum = timeNum
				if(timeNum<currentTimeNum){
					uni.showToast({
						title:'选择的时间不能小于最近的跟踪记录时间',
						icon:'none',
						duration:1500,
					})
					this.selectTimeNum = currentTimeNum + 1000
					console.log('使用的时间小于 最近的记录的时间,修正后的时间')
					console.log(this.moment(this.selectTimeNum).format("YYYY-MM-DD-HH-mm-ss"))
				}
				
				
			},
			// moment 转换成时间
			toTimeStr(timeNum){
				if(!timeNum){
					let str = this.moment().format('YYYY-MM-DD HH:mm:ss')
					return str
				}
				let str = this.moment(timeNum).format('YYYY-MM-DD HH:mm:ss')
				return str
			},
			
			
			
			// 增加 进度记录
			// addSalesDefineRecord(typeIndex,content){
			// 	let time = Date.parse(new Date())
			// 	if(this.selectTimeNum){
			// 		time = this.toTimeStr(this.selectTimeNum)
			// 	}
			// 	const type = this.radioList[typeIndex].name
			// 	const obj = {time,type,content}
			// 	this.salesDefineRecordList.unshift(obj)
			// },
			
			
			
			// 保存 销售定义的跟进记录
			inputConfirm(){
				if(!this.recordInputV){
					uni.showToast({
						title:'请输入有效内容',
						icon:'none'
					})
					return 
				}
				this.addUserRecord()
				this.successSubmitAfter()
				// this.addSalesDefineRecord(this.radioValue,subValue)
				// this.successSubmitAfter()
			},
			successSubmitAfter(){
				this.recordInputV = ''
			},
		
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				
			},
			radioGroupChange(e){
				this.radioValue = e
				console.log('radioGroup')
				console.log(e)
			}
		}
	};
</script>

<style lang="scss" scoped>
	
.swiper-box{
	overflow: hidden;
}
	
.img-container{
	width: 100%;
	height: 400rpx;
	border-radius: 10rpx;
	padding: 20rpx;
	background-color: #FFFFFF;
	image{
		width: 100%;
		height: 100%;
	}
}
.scrollClass{
	padding: 20rpx 30rpx;
	background-color: #FFFFFF;
	border-top: 20rpx solid #efefef;
	font-size: 1.2em;
}

.u-order-title {
	color: #333333;
	font-weight: bold;
	font-size: 32rpx;
}

.u-order-desc {
	color: rgb(150, 150, 150);
	font-size: 28rpx;
	margin-bottom: 6rpx;
}

.u-order-time {
	color: rgb(200, 200, 200);
	font-size: 22rpx;
}





// 跟进记录
.min-5em{
	min-width: 4em;
}
.min-9em{
	min-width: 9em;
}
.min-650{
	min-width: 650rpx;
}
.flex-aloneHold{
	flex-basis: 1;
	flex-grow: 1;
}
.radio-group{
	display: flex;
	flex-flow: row wrap;
}




</style>
