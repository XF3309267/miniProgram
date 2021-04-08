<template>
	<view class="padding-bottom bg-white">
		<cu-custom :isBack="true" :selfBack="true" bgColor="bg-white" id="customNav">
			<block slot="backText"> 返回 </block>
			<block slot="content"> <text class="text-bold"> 修改名片 </text> </block>
		</cu-custom>
		<view class="text-center u-p-30" @click="chooseAvatar">
			<view class="avatar-container">
				<image :src="salesManagerInfo.headPortrait" mode="aspectFit"></image>
			</view>
			<view class="u-p-20">
				个人形象照
			</view>
		</view>
		<view class="bg-white padding">
			<u-form :model="salesManagerInfo" :label-style="formItemStyle" :label-width="150" ref="uForm">
				<u-form-item label="姓名" prop="salesName">
					<u-input :trim="true" v-model="salesManagerInfo.salesName" />
				</u-form-item>
				<u-form-item :label-style="{color:'#c0c0c0'}" label="职位" prop="jobTitle">
					<u-input :custom-style="{color:'#c0c0c0'}" :disabled="true" :trim="true"
						v-model="salesManagerInfo.jobTitle" />
				</u-form-item>
				<u-form-item :label-style="{color:'#c0c0c0'}" label="公司名" prop="companyName">
					<u-input :custom-style="{color:'#c0c0c0'}" :disabled="true" :trim="true"
						v-model="companyInfo.companyName" />
				</u-form-item>
				<!-- <u-gap height="20" bg-color="#eee"></u-gap> -->
				<view class="gap-container">
					<view class="gap-box">
						<u-gap height="20" bg-color="#eee"></u-gap>
					</view>
				</view>
				<view class="card-head u-p-l-20" style="background-color: #FFFFFF;">
					<view class="icon-container">
						<image src="@/static/img/salesPersonImg/card-introduce.png"></image>
					</view>
					<text class="text-bold u-font-34"> 个人简介 </text>
				</view>
				<u-form-item prop="salesWordIntroduce">
					<u-input :trim="true" type="textarea" :custom-style="{'min-height':'200rpx',padding:'10rpx 20rpx' }"
						:autoHeight="true" v-model="salesManagerInfo.salesWordIntroduce" />
				</u-form-item>
				<!-- 	<view class="cu-item padding" >
					<textarea class="self-area" :value="salesManagerInfo.brief" @input="areaChange" placeholder="输入您的个人简介" adjust-position="false"  ></textarea>
				</view>
				<view class="text-gray padding-sm text-xs padding-top u-border-bottom">
					注：个人简介限制 50个汉字
				</view> -->
				<!-- <u-gap height="20" bg-color="#eee"></u-gap> -->
				<view class="padding">
					<view class=" round voice-container play-line padding solids flex justify-between">
						<view class="flex-main">
							<view class="self-voice" @touchstart="recordVoiceStart" @touchend="recordVoiceEnd">
								<text :class="[voiceTouced?'text-green':'text-gray','cuIcon-voicefill   text-xl play ']"
									@touchStart=""></text>
							</view>
							<text class="text-green"> {{showAudioTime}} </text>
						</view>

						<view class="flex-right">
							<view class="self-round" @click="playAudio">
								<text class="cuIcon-playfill text-green text-xl play" v-show="!audioIsPlay"></text>
								<text class="cuIcon-stop text-gray text-xl play" v-show="audioIsPlay"></text>
							</view>
						</view>
					</view>
				</view>
				<view class="gap-container">
					<view class="gap-box">
						<u-gap height="20" bg-color="#eee"></u-gap>
					</view>
				</view>
				<u-form-item label="联系方式">
				</u-form-item>
				<u-form-item label="手机" prop="salesPhone">
					<u-input :trim="true" maxlength="11" v-model="salesManagerInfo.salesPhone" />
				</u-form-item>
				<u-form-item label="微信" prop="salesWx">
					<u-input :trim="true" v-model="salesManagerInfo.salesWx" />
				</u-form-item>
				<u-form-item label="邮箱" prop="salesMailbox">
					<u-input :trim="true" v-model="salesManagerInfo.salesMailbox" />
				</u-form-item>
				
				<view class="gap-container">
					<view class="gap-box">
						<u-gap height="20" bg-color="#eee"></u-gap>
					</view>
				</view>
				
				<view class="card-head u-p-l-20" style="background-color: #FFFFFF;">
					<view class="icon-container ">
						<image src="@/static/img/salesPersonImg/album.png"></image>
					</view>
					<text class="text-bold u-font-34"> 图册 </text>
				</view>

				<view class=" flex justify-between">
					<u-upload ref="uUpload" action="https://upload-z2.qiniup.com" name="file" width="210" height="210"
						:form-data="formData" :show-tips="true" :show-progress="true" :auto-upload="true"
						:file-list="uploadImgList" @on-success="onImgSuccess" @on-remove="onImgListRemove"
						@on-change="onImgUploaded" @on-choose-complete="comImgUploadChoose"
						@on-list-change="onImgListChange" @on-choose-fail="chooseImgFail"></u-upload>
				</view>

			</u-form>

		</view>
		<view class="padding">
			<u-button type="default" @click="submit">保存</u-button>
		</view>

		<!-- 		<view class="cu-list menu sm-border  margin-top" >
			<view class="cu-item " >
				<view class="flex align-center">
					<text class="item-label "> 姓名 </text>
				</view>
				<input class="item-conten"  type="text" v-model="salesManagerInfo.name" placeholder="您的昵称" />
			</view>
			<view class="cu-item  " >
				<view class="flex align-center">
					<text class="item-label "> 职位 </text>
				</view>
				<input class="item-conten" v-model="salesManagerInfo.position" type="text" placeholder="输入您的职位" />
			</view>
			<view class="cu-item " >
				<view class="flex align-center">
					<text class="item-label"> 公司名 </text>
				</view>
				<input class="item-conten"  v-model="salesManagerInfo.company" type="text" placeholder="企业员工专用" />
			</view>
			<view class="cu-item">
				<view class="flex align-center">
					<text class="item-label"> 个人简介 </text>
				</view>
			</view>
			<view class="cu-item padding" >
				<textarea class="self-area" :value="salesManagerInfo.brief" @input="areaChange" placeholder="输入您的个人简介" adjust-position="false"  ></textarea>
			</view>
			<view class="text-gray padding-left text-xs padding-top">
				注：个人简介限制 50个汉字
			</view>
			
			<view class="padding">
				<view class=" round voice-container play-line padding solids flex justify-between">
					<view class="flex-main">
						<view class="self-voice" @touchstart="recordVoiceStart" @touchend="recordVoiceEnd" >
							<text :class="[voiceTouced?'text-green':'text-gray','cuIcon-voicefill   text-xl play ']" @touchStart="" ></text>
						</view>
						<text class="text-green"> {{showRecordText}} </text>
					</view>

					<view class="flex-right">
						<view class="self-round" @click="playAudio">
							<text class="cuIcon-playfill text-green text-xl play"  v-show="!audioIsPlay" ></text>
							<text class="cuIcon-stop text-gray text-xl play" v-show="audioIsPlay"></text>
						</view>
					</view>
				</view>
			</view>
			
			
			<view class="cu-item padding" >
				<text class="item-label"> 联系方式 </text>
			</view>
			<view class="cu-item  " >
				<view class="flex align-center">
					<text class="item-label "> 手机 </text>
				</view>
				<input class="item-conten" v-model="salesManagerInfo.phone" type="text" placeholder="输入您的手机号" />
			</view>
			<view class="cu-item  " >
				<view class="flex align-center">
					<text class="item-label "> 微信 </text>
				</view>
				<input class="item-conten" v-model="salesManagerInfo.wxId" type="text" placeholder="输入您的微信号" />
			</view>
			<view class="cu-item  " >
				<view class="flex align-center">
					<text class="item-label "> 邮箱 </text>
				</view>
				<input class="item-conten" v-model="salesManagerInfo.mail"  type="text" placeholder="输入您的邮箱" />
			</view>
			<view class="cu-item" >
				<view class="flex align-center">
					<text class="item-label "> 图册 </text>
				</view>
			</view>
			
			<view class="cu-item">
				<u-upload 
					ref="uUpload"
					width="200"
					height="200"
					:auto-upload="true"
					:action="action" 
					:max-size="1 * 1024 * 1024"
					:file-list="uploadImgList" 
					@on-change="imgUploadFinal"
				></u-upload>
			</view>
			
		</view>
		 -->
		<!--
			请求录音权限弹出框
		  -->
		<u-popup v-model="poupShow" mode="center" z-index="10075" border-radius="14">
			<view class="padding bg-white" style="border-radius: 10rpx;">
				<view class="padding">
					为了您更好的使用小程序，请打开录音权限
				</view>
				<view class="padding flex justify-around">
					<button class="cu-btn  " open-type="openSetting" @opensetting="openSettingcallback"> 设置 </button>
					<button class="cu-btn  text-red" @click="poupClose()"> 取消 </button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'

	import {
		getCardSalesInfoById,
		updateCardSalesInfo,
		getQiNiuToken,
		qiniuUpload
	} from '@/services/services.js'
	import {
		getSalesInfo,
		getCompanyInfo,
		selfChooseImg,
		judgeImg,
		uploadComplete,
		modifySalesInfo,
		initBaseInfo,
		getAudioTime
	} from '@/static/js/common.js'
	export default {
		data() {
			return {
				qiNiuToken: '',
				upImgMaxSiz: 2 * 1024 * 1024,
				compressPer: 50,

				isSave: false,
				companyInfo: null,
				salesManagerInfo: {},
				formItemStyle: {
					padding: '0 10rpx'
				},
				formInputStyle: {
					backgroundColor: '#ffffff'
				},
				rules: {
					salesName: [{
						required: true,
						message: '请输入姓名',
						trigger: ['blur', 'change']
					}],
					jobTitle: [{
						required: true,
						message: '请输入职位',
						trigger: ['blur', 'change']
					}],
					company: [{
						required: true,
						message: '请输入公司名',
						trigger: ['blur', 'change']
					}],
					salesWordIntroduce: [{
						required: true,
						message: '请输入个人简介',
						trigger: ['blur', 'change']
					}],
					salesPhone: [{
							required: true,
							message: '请输入手机号',
							trigger: ['blur', 'change']
						},
						{
							pattern: /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/i,
							transform(value) {
								return String(value);
							},

							message: '请输入正确的手机号',
							trigger: ['blur', 'change']
						},
					],
					salesWx: [{
							required: true,
							message: '请输入微信号',

							trigger: ['blur', 'change']
						},

					],
					salesMailbox: [{
							required: false,
							message: '请输入邮箱',
							trigger: ['blur', 'change']
						},
						{
							pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
							message: '请输入正确的邮箱',
							trigger: ['blur', 'change']
						},
					],
				},
				salesId: -1,
				clientId: -1,
				companyId: -1,
				userType: -1,
				openId: -1,
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
				}],
				inputV: '',

				voicePath: '',
				voiceTouced: 0,
				recordVoiceStartTime: 0,
				recordVoiceEndTime: 0,
				recordDuraTime: 0,


				recorderManager: '',
				innerAudioContext: '',
				audioObj: '',
				audioIsPlay: false,
				initAllTime: 0,
				allTime: 0,
				audioCurrentTime: 0,

				newUploadImgList: [],
				uploadImgList: [
					// {
					// 	id: 3,
					// 	type: 'image',
					// 	url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
					// }, {
					// 	id: 4,
					// 	type: 'image',
					// 	url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
					// },
				],
				action: 'http://www.example.com/upload',
				recordPower: false,
				poupShow: false,
			}
		},
		watch: {

		},
		computed: {
			showAudioTime() {
				if (this.recordDuraTime && this.audioIsPlay) {
					return parseInt((this.recordDuraTime / 1000) - this.audioCurrentTime)
				}
				if (this.recordDuraTime && !this.audioIsPlay) {
					return parseInt(this.recordDuraTime / 1000)
				}
				if (!this.audioIsPlay || this.allTime === 0) {
					return parseInt(this.initAllTime)
				}

				return parseInt(this.allTime - this.audioCurrentTime)
			},

			formData() {
				return {
					key: Date.parse(new Date()) + '_' + parseInt(Math.random() * 10000) + '.jpg',
					token: this.qiNiuToken
				}
			},
			// salesImgList(){
			// 	let salesImgList = []
			// 	if(!this.salesManagerInfo.photoAlbum){
			// 		this.salesManagerInfo.photoAlbum = ''
			// 	}
			// 	salesImgList = this.salesManagerInfo.photoAlbum.split(',')
			// 	return salesImgList 
			// }
		},
		onshow() {
			this.isSave = false
		},
		async onLoad() {
			uni.showLoading({
				title: '资源加载中...',
				mask: true
			})
			let self = this;
			let recorderManager = null

			recorderManager = uni.getRecorderManager();
			recorderManager.onStop((res) => {
				console.log('recorder stop' + JSON.stringify(res));
				this.salesManagerInfo.salesVoiceIntroduce = res.tempFilePath;
				this.recordDuraTime = res.duration
				this.initAllTime = Math.ceil(res.duration / 1000)
				// this.voicePath = res.tempFilePath;
				console.log(res.tempFilePath)
			});

			this.recorderManager = recorderManager
			this.initAudioObj()
			this.judgeLuYinPower()
			uni.hideLoading()
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		mounted() {

		},
		async created() {
			this.initQiniuToken()
			const getBaseInfo = await initBaseInfo(this)
			if (getBaseInfo) {
				const getSalesInfoRes = await this.initSalesInfo(this.salesId)
				if (getSalesInfoRes) {
					this.initCompanyInfo(this.companyId)
				}
			}

		},
		methods: {
			// 获取七牛云token
			async initQiniuToken() {
				const res = await getQiNiuToken()
				if (res.statusCode === 200) {
					this.qiNiuToken = res.data.data
				}
			},

			// 初始化 销售的信息
			initSalesInfo(salesId) {
				return new Promise(async (resolve, reject) => {


					let data = {
						id: salesId
					}
					const getSalesInfoRes = await getSalesInfo(data)
					if (getSalesInfoRes.statu === 200) {
						this.salesManagerInfo = Object.assign({}, getSalesInfoRes.value)
						let imgList = this.salesManagerInfo.photoAlbum.split(',')
						this.initAllTime = getAudioTime(this.salesManagerInfo.salesVoiceIntroduce)
						if (!imgList[0]) {
							imgList = []
						}

						if (imgList) {
							imgList.forEach((item, index) => {
								let obj = {}
								obj.url = item
								obj.progress = 100
								this.uploadImgList[index] = obj
							})
							console.log('初始化 newUploadImgList')
							console.log(this.newUploadImgList)

							this.newUploadImgList = imgList
						}
						// this.voicePath = this.salesManagerInfo.salesVoiceIntroduce
						resolve(true)
					} else {
						uni.showToast({
							title: getSalesInfoRes.msg,
							icon: 'none'
						})
						resolve(false)
					}
				})

			},

			// 初始化  公司信息
			async initCompanyInfo(companyId) {
				let data = {
					id: companyId
				}
				const getCompanyInfoRes = await getCompanyInfo(data)
				if (getCompanyInfoRes.statu === 200) {
					this.companyInfo = getCompanyInfoRes.value
					console.log('----- company  ---')
					console.log(getCompanyInfoRes.value)
				} else {
					uni.showToast({
						title: getCompanyInfoRes.msg,
						icon: 'none'
					})
				}
			},



			//个人简介 text-area
			areaChange(e) {
				console.log(e)
				this.salesManagerInfo.brief = e.detail.value
			},
			// 录音 按钮 touchStart
			recordVoiceStart() {

				if (!this.recordPower) {
					this.poupOpen()
					return
				}
				uni.vibrateShort({
					success: function() {
						console.log('success');
					}
				});
				this.recorderManager.start({
					format: 'mp3'
				});
				console.log('start')
				this.recorderManager.start()
				this.voiceTouced = true
			},
			recordVoiceEnd() {

				if (!this.recordPower) {
					this.poupOpen()
					return
				}


				this.recorderManager.stop()
				this.voiceTouced = false
				console.log('----------')
				console.log(this.recorderManager)
			},
			playVoice() {
				console.log('播放录音');
				if (this.this.salesManagerInfo.salesVoiceIntroduce && !this.audioIsPlay) {
					console.log('play voice true')
					// this.innerAudioContext.src = this.voicePath;
					this.innerAudioContext.src = this.salesManagerInfo.salesVoiceIntroduce
					this.innerAudioContext.play();
					this.audioIsPlay = true
				} else {
					this.innerAudioContext.stop();
					this.audioIsPlay = false
				}
			},
			// 初始化 audio 对象
			initAudioObj() {
				const innerAudioContext = uni.createInnerAudioContext();
				this.audioObj = innerAudioContext

				innerAudioContext.onError(() => {
					uni.showToast({
						title: '音频播放错误',
						icon: 'none'
					})
					this.audioIsPlay = false
					innerAudioContext.destroy()
				})

			},
			// 播放录音
			playAudio() {
				if (this.audioIsPlay) {
					console.log('音乐播放中')
					this.startTime = 0
					this.audioIsPlay = false
					this.audioObj.pause()
					this.audioObj.destroy()
					return
				}
				const innerAudioContext = uni.createInnerAudioContext();
				// innerAudioContext.src =  this.voicePath
				innerAudioContext.src = this.salesManagerInfo.salesVoiceIntroduce
				innerAudioContext.onCanplay(() => {
					this.audioCurrentTime = innerAudioContext.currentTime
					innerAudioContext.play()
					this.audioIsPlay = true


					console.log('已经在播放')

					innerAudioContext.onPlay(() => {
						this.audioCurrentTime = innerAudioContext.currentTime
						this.audioObj = innerAudioContext

						innerAudioContext.onTimeUpdate(() => {
							this.allTime = innerAudioContext.duration
							this.audioCurrentTime = innerAudioContext.currentTime

							console.log('allTime')
							console.log(this.allTime)
							console.log(this.audioCurrentTime)
							const restTime = parseInt(this.allTime - this.audioCurrentTime)
							if ((this.allTime - this.audioCurrentTime) <= 0.25) {
								console.log(' 时间 结束 ')
								innerAudioContext.destroy()
								this.audioIsPlay = false
							}
						})
					});
				})
			},
			//



			// 设置权限返回值
			openSettingcallback(res) {
				this.judgeLuYinPower()
			},

			// 判断用户 录音权限是否开启
			judgeLuYinPower() {
				uni.authorize({
					scope: 'scope.record',
					success: (res) => {
						console.log('成功开启 录音权限')
						this.recordPower = true
						this.poupClose()
					},
					fail: (res) => {
						this.poupOpen()
						this.recordPower = false
					}
				})
			},
			onImgListChange(lists, name) {
				console.log('图片列表有所改变时 触发')
				console.log(lists)
				console.log(name)
			},
			getSuffix(sourceName) {
				let lastIndex = sourceName.lastIndexOf('.')
				let strSuffix = sourceName.substring(lastIndex)
				return strSuffix
			},
			// 选择图片后 失败
			chooseImgFail(res) {
				console.log('fail')
				console.log(res)
				uni.showToast({
					title: res,
					icon: 'none'
				})
			},
			onImgListRemove(index, lists, name) {
				this.newUploadImgList.splice(index, 1)
				console.log('remove img ')
				console.log(index)
				console.log(lists)
				console.log(name)

				console.log('this.newUploadImgList')
				console.log(this.newUploadImgList)

			},
			onImgSuccess(data, index) {
				console.log('data')
				console.log(data)

				const completeImgUrl = this.baseQiniuyunUrl + data.key

				this.newUploadImgList[index] = completeImgUrl

				console.log('this.newUploadImgList')
				console.log(this.newUploadImgList)
			},
			// 图片 无论是否成功或 失败
			onImgUploaded(res, lists) {
				console.log('无论 success 或 fail')
				console.log(res)
				console.log(lists)
			},

			// 选择图片后
			comImgUploadChoose(lists, name) {
				console.log('图片选择后')
				console.log(lists)
				console.log(name)

				uni.showLoading({
					title: '图片上传中...',
					mask: true
				})


				// uni.showLoading({
				// 	title:'图片上传中...',
				// 	mask:true
				// })
				// console.log('选择图片后  lists')

				// let readyUpImgList = []
				// for (let i = 0; i < lists.length; i++) {
				// 	const ele = lists[i];
				// 	if(ele.progress === 0){
				// 		(async ()=>{
				// 			const upImgRes = await uploadComplete(ele,this.baseQiniuyunUrl)

				// 			this.newUploadImgList.push(upImgRes)
				// 			console.log('this.newUploadImgList')
				// 			console.log(this.newUploadImgList)
				// 		})()
				// 	}

				// }				
				// uni.hideLoading()
				// console.log('this.newUploadImgList')
				// console.log(this.newUploadImgList)
			},

			// 封装图片上传
			// 返回一个对象
			// {url:   error:   progress:  }
			// async uploadComplete(ele){
			// 	let compressEle = await judgeImg(ele)
			// 	let dataObj = {}
			// 	dataObj.filePath = ele.url
			// 	const uploadRes = await qiniuUpload(dataObj)
			// 	if(uploadRes.statusCode === 200){
			// 		const finaData = JSON.parse(uploadRes.data)
			// 		const finaUrl = this.baseQiniuyunUrl + finaData.key
			// 		console.log(finaData.key)	
			// 		let finaObj = {}
			// 		finaObj.error = false
			// 		finaObj.progress = 100
			// 		finaObj.url = finaUrl
			// 		return {...finaObj,statusCode:200}
			// 	}else{
			// 		return {...ele,statusCode:500}
			// 	}

			// },

			async chooseAvatar() {
				const selectImgList = await selfChooseImg()
				if (selectImgList.length === 0) {
					return
				}
				uni.showLoading({
					title: '头像上传中',
					mask: true
				})
				const uploadRes = await uploadComplete(selectImgList[0], this.baseQiniuyunUrl)
				if (uploadRes.statusCode === 200) {
					this.salesManagerInfo.headPortrait = uploadRes.url
				}
				uni.hideLoading()
			},

			// 获取文件临时路径后缀名
			getSuffix(sourceName) {
				let lastIndex = sourceName.lastIndexOf('.')
				let strSuffix = sourceName.substring(lastIndex)
				return strSuffix
			},
			// 上传录音文件
			submit() {
				this.isSave = true

				console.log('点击发送')
				this.$refs.uForm.validate(async valid => {
					if (valid) {
						uni.showLoading({
							title: '数据上传中',
							mask: true
						})
						const delteArr = [
							'createTime', 'deleted', 'resignStatus', 'jobTitle', 'companyId', 'readNum',
							' likeNum', 'updateTime'
						]
						const addInfo = Math.ceil(this.recordDuraTime / 1000)
						const audioObj = {
							url: this.salesManagerInfo.salesVoiceIntroduce,
							addInfo
						}
						const audioRes = await uploadComplete(audioObj, this.baseQiniuyunUrl)
						const salesImgList = this.newUploadImgList.join(',')
						console.log('newUploadImgList')
						console.log(this.newUploadImgList)
						console.log('salesImgList')
						console.log(salesImgList)

						console.log('音频返回 -----audioRes')
						console.log(audioRes)

						this.salesManagerInfo.photoAlbum = salesImgList
						this.salesManagerInfo.salesVoiceIntroduce = audioRes.url

						let readySubInfo = this.deleteAttObj(delteArr, this.salesManagerInfo)

						let modifySalesRes = await modifySalesInfo(readySubInfo)

						if (modifySalesRes.statusCode === 200) {
							uni.hideLoading()
							uni.showToast({
								title: '修改成功',
								duration: 10000
							})
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								})
							}, 1000)

						}

						console.log('验证通过');
						console.log('>>>>>>> this.salesManagerInfo <<<<<<')
						console.log(modifySalesRes)
						console.log(this.salesManagerInfo)
						console.log('this.newUploadImgList')
						console.log(this.newUploadImgList)
						console.log('readySubInfo')
						console.log(readySubInfo)
					} else {
						console.log('验证失败');
					}
				});

			},



			// 清除对象中不要的属性
			deleteAttObj(deleteArr, obj) {
				let newObj = {}
				for (let key in obj) {
					let isDelete = false
					isDelete = deleteArr.some(item => {
						if (item == key) {
							return true
						}
					})
					if (!isDelete) {
						newObj[key] = obj[key]
					}

				}
				return newObj
			},

			poupOpen() {
				this.poupShow = true
			},
			poupClose() {
				this.poupShow = false
			},
		},
		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		}
	}
</script>

<style lang="scss" scoped>
	.avatar-container {
		width: 300rpx;
		height: 260rpx;
		overflow: hidden;

		image {
			width: 100%;
			height: 100%;
		}

		margin: auto;
	}

	.item {}

	.item-label {
		min-width: 4em;
		text-align: center;
		font-size: 1.1em;
		padding: 0 20rpx;

	}

	.item-conten {
		flex-basis: 1;
		flex-grow: 1;
	}

	.self-area {
		height: 140rpx;
		padding: 20rpx;
	}

	.voice-container {
		position: relative;
		padding: 20rpx;
	}

	.self-round,
	.delete {
		width: 50rpx;
		height: 50rpx;
		border: 4rpx solid #4CD964;
		border-radius: 50%;
		text-align: center;

		.play {
			line-height: 42rpx;
			margin: auto;
		}
	}

	.delete {
		border: 4rpx solid #ff0000;
	}

	.flex-main {
		flex-basis: 1;
		flex-grow: 1;
		text-align: center;
		padding-left: 200rpx;
	}

	.self-voice {
		position: absolute;
		left: 100rpx;
		top: 8rpx;
		height: 40rpx;
		font-size: 60rpx;

	}


	.flex-right {
		display: flex;
		justify-content: space-around;
		min-width: 200rpx;

	}
	.gap-container{
		position: relative;
		min-height: 20rpx;
		.gap-box{
			position: absolute;
			top: 0;
			left:-30rpx;
			width: 750rpx;
		}
	}
</style>

