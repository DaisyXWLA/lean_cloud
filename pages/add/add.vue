<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" right-text="确定" color="#ffffff" title="小想法" fixed
		 @clickRight="addConfirm">
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<view class="add-container">
			<view class="title">
				<text>提案标题</text>
				<textarea placeholder-style="color:#BCC1D4;font-size:28rpx" placeholder="请输入标题信息" :maxlength="50" :auto-height="true" />
				</view>
			<view class="category">
				<view class="title">
					提案类别
				</view>
				<view class="picker">
					<!-- <picker @change="categoryChange" :value="categoryIndex" :range="categoryArray" range-key="name">
						<view>{{categoryArray[categoryIndex].name}}</view>
					</picker> -->
					<input type="text" placeholder="请选择提案类别" value="" disabled @click="selectCategory"/>
				</view>
				<view class="icon">
					<uniIcon type="arrowright" size="20" color="#999" ></uniIcon>
				</view>
			</view>
			<view class="category">
				<view class="title">
					区域
				</view>
				<view class="picker">
					<!-- <picker @change="areaChange" :value="areaIndex" :range="areaArray" range-key="name">
						<view>{{areaArray[areaIndex].name}}</view>
					</picker> -->
					<input type="text" placeholder="请选择区域" value="" disabled @click="selectArea"/>
				</view>
				<view class="icon">
					<uniIcon type="arrowright" size="20" color="#999" ></uniIcon>
				</view>
			</view>
			<view class="section">
				<text>现状</text>
				<textarea placeholder-style="color:#BCC1D4;font-size:28rpx" placeholder="请输入现状信息" :auto-height="true"/>
			</view>
			<view class="section">
				<text>建议</text>
				<textarea placeholder-style="color:#BCC1D4;font-size:28rpx" placeholder="请输入建议信息" :auto-height="true"/>
			</view>
			<view class="accessory">
				<text>上传照片</text>
				<!-- <view class="upload-btn">
					<image src="../../static/icon/plus-gray@2x.png" mode="scaleToFit" @click="upload"></image>
				</view> -->
				<upload v-model="imageData" @delete="deleteImage" @add="addImage" ></upload>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcon from "../../components/uni-icons/uni-icons.vue"
	import upload from '../../components/robby-image-upload/robby-image-upload.vue'
	export default {
		components: {
			uniNavBar,
			uniIcon,
			upload
		},
		data() {
			return {
				 imageData : [],
			}
		},
		methods: {
			back(){
				uni.redirectTo({
					url:"../index/index"
				})
			},
			addConfirm(){},
			deleteImage () {},
			addImage (e) {
				console.log(e)
			},
			selectCategory(){
				uni.redirectTo({
					url:"proposal-category/proposal-category"
				})
			},
			selectArea(){
				uni.redirectTo({
					url:"area/area"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add-container{
		.title{
			padding: 30rpx;
			background: #fff;
			text{
				font-size: 32rpx;
				color: #333;
			}
			textarea{
				font-size: 28rpx;
				color: #333;
				margin-top: 30rpx;
			}
		}
		.category{
			background: #fff;
			padding:30rpx;
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.title{
				padding: 0;
				font-size: 32rpx;
				color: #333;
			}
			.picker{
				flex: 1;
				text-align: right;
				color: #999;
				font-size: 28rpx;
				input {
					text-align: right;
					font-size: 28rpx;
					color: #999;
				}
			}
		}
		.section{
			margin-top: 20rpx;
			background: #fff;
			padding: 30rpx 0;
			box-sizing: border-box;
			text{
				padding:0 30rpx;
				cont-size:32rpx;
				color: #333;
				box-sizing: border-box;
			}
			textarea{
				padding: 30rpx;
				/deep/ .uni-textarea-textarea{
					font-size: 28rpx;
					color: #333;
				}
			}
		}
		.accessory{
			margin-top: 20rpx;
			background: #fff;
			padding: 30rpx;
			text{
				font-size: 32rpx;
				color: #333;
			}
			.upload-btn{
				margin-top: 20rpx;
				image{
					background: #f2f2f2;
					width: 60rpx;
					height: 60rpx;
					padding: 30rpx;
				}
			}	
			/deep/ .imageUpload{
				margin: 0 10rpx 10rpx 0;
			}
			/deep/ .imageItem{
				margin: 0 10rpx 10rpx 0;
			}
			/deep/ .imageUploadContainer{
				padding: 0;
				margin: 20rpx 0;
			}
		}
	}
</style>
