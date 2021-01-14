<template>
	<view class="cu-card case bg-white" :class="isCard?'no-card':''">
		<view class="cu-item shadow ">
			<view class="image">
				<image :src="bgUrl"mode="widthFix" @click="bgClick"></image>
				<view v-if="Boolean(badge)?true:false" class="cu-tag bg-red"> {{badge}}</view>
				<view class="cu-bar bg-shadeBottom"> <text class="text-cut"> {{brief}} </text></view>
			</view>
			<view class="cu-list menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar round lg" :style="{'background-image':'url(' + avatar +')' }"></view>
					<view class="content flex-sub">
						<view class="text-grey">{{title}} </view>
						<view class="text-gray text-sm flex <justify-between></justify-between>">
							{{timeStr}}
							<view class="text-gray text-xl flex">
								<view class=""  @click="browseClick" >
									<text class="cuIcon-attentionfill text-xl margin-lr-xs"  ></text> {{browseCount}}
								</view>
								<!-- <view class="" @click="praiseClick" >
									<text  :class="[praiseActive?'text-blue':'','margin-lr-xs','cuIcon-appreciatefill' ]"  ></text> {{praiseCount}}
								</view> -->
								<!-- <text class="cuIcon-messagefill margin-lr-xs"></text> 30 -->
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:'ItemCard',
		data(){
			return{
				praiseActive:false,
				browseActive:false,
			}
		},
		props:{
			bgUrl:{
				type:String,
				default:'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
			},
			avatar:{
				type:String,
				default:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'
			},
			title:{
				type:String,
				default:'XXXX公司产品名称'
			},
			brief:{
				type:String,
				default:'XXXXX产品简介',
			},
			time:{
				type:String,
				default:'1609566408000'
			},
			browseCount:{
				type:Number,
				default: 11,
			},
			praiseCount:{
				type:Number,
				default:221
			},
			badge:{
				type:String,
				default:''
			}
		},
		computed:{
			timeStr(){
				return this.moment(parseInt(this.time)).format('YYYY.MM.DD')
			}
		},
		methods:{
			bgClick(){
				this.$emit('bgClick')
			},
			praiseClick(){
				console.log('888***88')
				this.praiseActive = !this.praiseActive
				// this.browseActive = !this.browseActive
				this.$emit('praiseClick')
			},
			browseClick(){
				this.$emit('browseClick')
			}
		}
	}
</script>

<style>
</style>
