<template>
	<view class="room_bar">
		<chatSuitMain ref="chatSuitMain" :username="username" @cancelRecord="cancelRecord"
			@setIsAudioShowBottom="setIsAudioShowBottom" @setIsShowBottom="setIsShowBottom" :chatType="chatType"
			@setInputBottom="setInputBottom" @inputFocused="cancelEmoji"></chatSuitMain>
			
		<view :class="'other_func ' + (isIPX? 'other_func_X': '')">
			
			<view class="open_emoji" @tap="openEmoji">
				<image src="/static/images/Emoji.png"  mode="aspectFit"/>
			</view>
			<view class="v-record" @tap="toggleRecordModalOpen">
				<image class="" src="../../../static/images/voice.png" mode="aspectFit" >
				</image>
			</view>
			<view class="open_camera" @tap="openCamera">
				<image src="/static/images/camora.png" mode="aspectFit"></image>
			</view>
			<view class="send_image" @tap="sendImage">
				<image src="/static/images/pic.png" mode="aspectFit"></image>
			</view>
			<!-- <view class="send_image" @tap="sendVideo">
			<image src="/static/images/video.png" style="height:20px; width: 20px"></image>
		</view> -->
			<!-- <view class="send_image" bind:tap="sendLocation">
			<image src="../../../static/images/iconLocation2x.png" style="height:18px;"/>
		</view> -->
			<view class="v-record" @tap="callVideo" v-if="username.groupId">
				<image src="/static/images/call2x.png" style="height:24px; width: 15px" />
			</view>
		</view>
		<chatSuitEmoji ref="chatSuitEmoji" @selfCloseEmoji="selfCloseEmoji" @selfOpenEmoji="selfOpenEmoji" :fixedBottomHeight="fixedBottomHeight" @newEmojiStr="emojiAction">
		</chatSuitEmoji>

		<chatSuitImage ref="chatSuitImage" :username="username" :chatType="chatType"></chatSuitImage>
		<!-- <chat-suit-location id="chat-suit-location" username="{{ username }}"></chat-suit-location> -->
		<!-- <chat-suit-video ref="chatSuitVideo" :username="username"></chat-suit-video> -->
		<chatSuitPtopcall ref="chatSuitPtopcall" :chatType="chatType" @makeVideoCall="onMakeVideoCall">
		</chatSuitPtopcall>
		<view class="u-rela" :style="{height:isBootomHeight}" >
			<chatSuitAudio ref="chatSuitAudio" :isBootomHeight="isBootomHeight" :username="username" :chatType="chatType" @newAudioMsg="newAudioMsg">
			</chatSuitAudio>
		</view>
	</view>
</template>

<script>
	let RecordStatus = require("./suit/audio/record_status").RecordStatus;
	let msgType = require("../msgtype");
	import chatSuitEmoji from "./suit/emoji/emoji";
	import chatSuitImage from "./suit/image/image";
	import chatSuitAudio from "./suit/audio/audio";
	import chatSuitLocation from "./suit/location/location";
	import chatSuitMain from "./suit/main/main";
	import chatSuitPtopcall from "./suit/ptopcall/ptopcall.vue";

	// import chatSuitVideo from "./suit/videoComp/videoComp"
	export default {
		data() {
			return {
				recordStatus: RecordStatus.HIDE,
				RecordStatus,
				__comps__: {
					main: null,
					emoji: null,
					image: null,
					location: null,
					video: null,
				},
				fixedBottomHeight: 0,
				isIPX: false,

			};
		},

		components: {
			chatSuitEmoji,
			chatSuitImage,
			chatSuitLocation,
			chatSuitMain,
			chatSuitPtopcall,
			chatSuitAudio
			// chatSuitVideo
		},
		props: {
			isEmojiShowBottom:{
				type: Boolean,
				default: false
			},
			isShowBottomH: {
				type: Boolean,
				default: true
			},
			isAudioShowBottom: {
				type: Boolean,
				default: false
			},
			InputBottom: {
				type: Number,
				default: 0
			},
			username: {
				type: Object,
				default: () => ({})
			},
			chatType: {
				type: String,
				default: msgType.chatType.SINGLE_CHAT
			}
		},
		computed:{
			isBootomHeight(){
				let bottomHeight = this.isIPX?(this.fixedBottomHeight + 0 ):this.fixedBottomHeight
				
				console.log('_______________')
				console.log(bottomHeight)
				
				return this.isShowBottomH ||this.isAudioShowBottom?(bottomHeight + 'px'):0 
			}
		},
		// lifetimes
		created() {},

		beforeMount() {},

		moved() {},

		destroyed() {},
		
		mounted() {

			if (getApp().globalData.isIPX) {
				this.setData({
					isIPX: true
				});
			}else{
				uni.getSystemInfo({
					success: function(res) {
						console.log('获取 systemInfo')
						console.log(res)
						// 根据 model 进行判断
						if (res.model && res.model.search("iPhone X") != -1) {
							this.setData({
							  isIPX: true
							});
						}
					}
				});
			}
			// let comps = this.$data.__comps__;
			// comps.main = this.selectComponent("#chatSuitMain");
			// comps.emoji = this.selectComponent("#chatSuitEmoji");
			// comps.image = this.selectComponent("#chatSuitImage"); 
		},
		methods: {
			newAudioMsg(){
				this.$emit('newTextMsg')
			},
			RecordModalOpen() {
				this.$refs.chatSuitAudio.toggleRecordModalOpen();
			},
			// 关闭 录音界面
			cancelRecord(){
				this.$refs.chatSuitAudio.toggleRecordModalClose()
			},
			
			
			selfOpenEmoji(){
				this.$emit('setIsEmojiShowBottomH', true)
				this.$emit('setIsShowBottomH', false)
				this.$emit('setIsAudioShowBottom', false)
			},
			selfCloseEmoji(){
				this.$emit('setIsEmojiShowBottomH', false)
			},
			setIsEmojiShowBottomH(boolean) {
				this.$emit('setIsEmojiShowBottomH', boolean)
				// this.isShowBottomH = boolean
			},
			setIsShowBottom(boolean) {
				this.$emit('setIsShowBottomH', boolean)
				// this.isShowBottomH = boolean
			},
			setIsAudioShowBottom(boolean) {
				this.$emit('setIsAudioShowBottom', boolean)
				// this.isAudioShowBottom = boolean
			},
			// 事件有长度限制：仅限 26 字符
			toggleRecordModalOpen() {
				this.cancelEmoji()
				// this.isShowBottomH = false
				// this.isAudioShowBottom = true
				console.log('&&&&&&&&&&&&&&&&&&&&&7')
				console.log(this.isAudioShowBottom)
				console.log(this.isShowBottomH)

				this.$emit('setIsShowBottomH', false)
				this.$emit('setIsAudioShowBottom', true)
				
				this.$refs.chatSuitAudio.toggleRecordModalOpen();
				// this.$emit("tapSendAudio", null, {
				// 	bubbles: true,
				// 	composed: true
				// });
			},
			setInputBottom(num) {
				console.log('inputbar keyboardHeight')
				console.log(num)

				if (!num || num === 0) {
					num = 300
				}

				// this.fixedBottomHeight = 300
				if (num && num > 0) {
					console.log('获取到 键盘高度 ')
					console.log(num)
					// 这里只为了拿到  键盘的高度
					this.fixedBottomHeight = num
				}

				this.$emit('setInputBottom', num)
			},
			// otherSetBottom(){
			// 	this.$emit('setScrollViewTop',this.scrollViewTop+99)
			// 	console.log(this.scrollViewTop)
			// 	if(!this.fixedBottomHeight || this.fixedBottomHeight === 0){
			// 		uni.showToast({
			// 			title:'暂还未获取到键盘高度',
			// 			icon:'none'
			// 		})
			// 		return 
			// 	}
			// },
			// sendVideo(){
			// 	this.$refs.chatSuitVideo.sendVideo();
			// },
			openCamera() {
				// this.otherSetBottom()
				// this.__comps__.image.openCamera()
				this.$refs.chatSuitImage.openCamera();
			},
			// cancelRecord() {
			// 	this.$emit('cancelRecord')
			// },
			openEmoji() {
				// this.isShowBottomH = false
				// this.isAudioShowBottom = false
				this.$emit('setIsEmojiShowBottomH', true)
				this.$emit('setIsShowBottomH', false)
				this.$emit('setIsAudioShowBottom', false)

				this.$refs.chatSuitAudio.toggleRecordModalClose()
				this.$refs.chatSuitEmoji.openEmoji();
			},

			cancelEmoji() {
				this.$emit('setIsEmojiShowBottomH', false)
				this.$refs.chatSuitEmoji.cancelEmoji();
			},

			sendImage() {
				// this.__comps__.image.sendImage();
				this.$refs.chatSuitImage.sendImage();
			},

			sendLocation() { // this.data.__comps__.location.sendLocation();
			},

			emojiAction(evt) {
				this.$refs.chatSuitMain.emojiAction(evt.msg);
			},

			callVideo() {
				//console.log('this.data.__comps__.ptopcall', this.data.__comps__.ptopcall)
				this.$refs.chatSuitPtopcall.show()
			},

			onMakeVideoCall() {
				console.log('onMakeVideoCall -> inputbar')
				this.$emit('makeVideoCall', null, 'single')
			},

		}
	};
</script>
<style>
	@import "./inputbar.css";
</style>
