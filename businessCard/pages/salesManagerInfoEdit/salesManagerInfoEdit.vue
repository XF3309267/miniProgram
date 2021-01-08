<template>
	<view class="padding-bottom bg-white">
		<cu-custom bgImage="https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg" :isBack="true" :selfBack="true" bgColor="bg-gradual-blue" id="customNav" >
			<block slot="backText"> 返回 </block>
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
						
						<!-- <view class="delete" @click="">
							<text class="cuIcon-deletefill text-red  text-xl play"  v-show="" ></text>
						</view> -->
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
					:auto-upload="true"
					:action="action" 
					:max-size="1 * 1024 * 1024"
					:file-list="uploadImgList" 
					@on-change="imgUploadFinal"
				></u-upload>
			</view>
			
		</view>
		
		
		
		<!--
			请求录音权限弹出框
		  -->
		<u-popup v-model="poupShow" mode="center" z-index="10075" border-radius="14">
			<view class="padding bg-white" style="border-radius: 10rpx;">
				<view class="padding">
					为了您更好的使用小程序，请打开录音权限
				</view>
				<view class="padding flex justify-around">
					<button class="cu-btn  "  open-type="openSetting" bindopensetting="openSettingcallback"> 设置 </button>
					<button class="cu-btn  text-red" @click="poupClose()" > 取消 </button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	
	
	export default {
		data() {
			return {
				salesManagerInfo:{
					name:'王珞丹',
					avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
					position:'销售经理',
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
				inputV:'',
				
				voicePath: '',
				voiceTouced:0,
				recorderManager:'',
				innerAudioContext:'',
				audioObj:'',
				audioIsPlay: false,
				allTime:0,
				audioCurrentTime:0,
				
				
				uploadImgList:[],
				action: 'http://www.example.com/upload',
				
				recordPower:false,
				poupShow: false,
			}
		},
		watch:{

		},
		computed:{
			showRecordText(){
				if(this.voiceTouced===0){
					return ''
				}
				if(this.voiceTouced){
					return '正在录音...'
				}else{
					return '录音完成'
				}
				
			}
		},
		onLoad() {
			let self = this;
			let recorderManager = null 
			recorderManager = uni.getRecorderManager();
			recorderManager.onStop((res)=>{
				console.log('recorder stop' + JSON.stringify(res));
				this.voicePath = res.tempFilePath;
				console.log(res.tempFilePath)
			});
			
			this.recorderManager = recorderManager
			this.initAudioObj()
			this.judgeLuYinPower()
		},
		mounted() {

		},
		methods: {
			imgUploadFinal(res, index, lists, name){
				console.log(res)
				console.log(index)
				console.log(lists)
				console.log(name)
			},
			
			//个人简介 text-area
			areaChange(e){
				console.log(e)
				this.salesManagerInfo.brief = e.detail.value
			},
			// 录音 按钮 touchStart
			recordVoiceStart(){
				if(!this.recordPower){
					this.poupOpen()
					return 
				}
				uni.vibrateShort({
				    success: function () {
				        console.log('success');
				    }
				});
				 this.recorderManager.start({
					 format:'mp3'
				 });
				console.log('start')
				this.recorderManager.start()
				this.voiceTouced = true
			},
			recordVoiceEnd(){
				if(!this.recordPower){
					this.poupOpen()
					return 
				}
				console.log('end')
				this.recorderManager.stop()
				this.voiceTouced = false
				console.log('----------')
				console.log(this.recorderManager)
			},
			playVoice() {
				console.log('播放录音');
				if (this.voicePath&&!this.audioIsPlay) {
					console.log('play voice true')
					this.innerAudioContext.src = this.voicePath;
					this.innerAudioContext.play();
					this.audioIsPlay = true
				}else{
					this.innerAudioContext.stop();
					this.audioIsPlay = false
				}
			},
			// 初始化 audio 对象
			initAudioObj(){
				const innerAudioContext = uni.createInnerAudioContext();
				this.audioObj = innerAudioContext
				
				innerAudioContext.onError(()=>{
					uni.showToast({
						title:'音频播放错误',
						icon:'none'
					})
					this.audioIsPlay = false
					innerAudioContext.destroy()
				})
				
			},
			// 播放录音
			playAudio(){
				if(this.audioIsPlay){
					console.log('音乐播放中')
					this.startTime = 0
					this.audioIsPlay = false
					this.audioObj.pause()
					this.audioObj.destroy()
					return 
				}
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.src =  this.voicePath
				innerAudioContext.onCanplay(()=>{
					this.audioCurrentTime = innerAudioContext.currentTime
					innerAudioContext.play()
					this.audioIsPlay = true
						
					innerAudioContext.onPlay(() => {
					 this.audioCurrentTime = innerAudioContext.currentTime
					 this.audioObj = innerAudioContext
					 innerAudioContext.onTimeUpdate(()=>{
					 	this.allTime = innerAudioContext.duration
					 	this.audioCurrentTime = innerAudioContext.currentTime
			
					 	const restTime = parseInt(this.allTime - this.audioCurrentTime )
					 	if(!restTime){
					 		innerAudioContext.destroy()
					 		this.audioIsPlay = false
					 	}
					 })
					});
				})
				// innerAudioContext.onError(()=>{
				// 	uni.showToast({
				// 		title:'音频播放错误',
				// 		icon:'none'
				// 	})
				// 	this.audioIsPlay = false
				// 	innerAudioContext.destroy()
				// })
			},
			
			
			// 设置权限返回值
			openSettingcallback(res){
				this.poupClose()
				console.log(res)
			},
			
			// 判断用户 录音权限是否开启
			judgeLuYinPower(){
				uni.authorize({
					scope:'scope.record',
					success:(res)=>{
						console.log('成功开启 录音权限')
						this.recordPower = true
					},
					fail:(res)=>{
						this.poupOpen()
						this.recordPower = false
					}
				})
			},
			poupOpen(){
				this.poupShow = true
			},
			poupClose(){
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
.self-area{
	height: 140rpx;
	padding: 20rpx;
}

.voice-container{
	position: relative;
	padding: 20rpx;
}

.self-round,.delete{
	width: 50rpx;
	height: 50rpx;
	border:4rpx solid #4CD964;
	border-radius: 50%;
	text-align: center;

	.play{
		line-height: 42rpx;
		margin: auto;
	}
}
.delete{
	border:4rpx solid #ff0000;
}
.flex-main{
	flex-basis: 1;
	flex-grow: 1;
	text-align: center;
	padding-left: 200rpx;
}

.self-voice{
	position: absolute;
	left: 100rpx;
	top: 8rpx;
	height: 40rpx;
	font-size: 60rpx;
	
}


.flex-right{
	display: flex;
	justify-content: space-around;
	min-width: 200rpx;
	
}

</style>
