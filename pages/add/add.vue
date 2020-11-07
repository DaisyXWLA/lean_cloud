<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" right-text="确定" color="#ffffff" title="合理化建议" fixed
		 @clickRight="addConfirm">
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<view class="add-container">
			<view class="title">
				<text>提案标题</text>
				<textarea placeholder-style="color:#BCC1D4;font-size:28rpx" placeholder="请输入标题信息" :value="title" :maxlength="50"
				 :auto-height="true" @blur="getTitle" />
				</view>
			<view class="category">
				<uniList>
				<uniListItem title="提案类别" :rightText="categoryName==null?'请选择类别':categoryName" showArrow clickable @click="selectCategory">
				</uniListItem>
				<uniListItem title="区域" :rightText="areaName==null?'请选择区域':areaName" showArrow clickable @click="selectArea">
				</uniListItem>
				</uniList>
			</view>
			<view class="section">
				<text>现状</text>
				<textarea placeholder-style="color:#BCC1D4;font-size:28rpx" placeholder="请输入现状信息" :value="actuality" :auto-height="true" @blur="getActuality"/>
			</view>
			<view class="section">
				<text>建议</text>
				<textarea placeholder-style="color:#BCC1D4;font-size:28rpx" placeholder="请输入建议信息" :value="proposal" :auto-height="true" @blur="getProposal"/>
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
	import uniList from "../../components/uni-list/uni-list.vue"
	import uniListItem from '../../components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniNavBar,
			uniIcon,
			upload,
			uniList,
			uniListItem
		},
		data() {
			return {
				 imageData : [],
				 title:'',
				 categoryName:'',
				 categoryId:'',
				 areaName:'',
				 areaId:'',
				 actuality:'',
				 proposal:''
			}
		},
		onLoad(option) {
			this.token = uni.getStorageSync('token')
			this.title=uni.getStorageSync('title')
			this.actuality=uni.getStorageSync('actuality')
			this.proposal=uni.getStorageSync('proposal')
			this.areaName=uni.getStorageSync('areaInfo').areaName
			this.areaId=uni.getStorageSync('areaInfo').areaId
			this.categoryName=uni.getStorageSync('categoryInfo').categoryName
			this.categoryId=uni.getStorageSync('categoryInfo').categoryId
		},
		methods: {
			back(){
				uni.redirectTo({
					url:"../index/index"
				})
			},
			addConfirm(){
				uni.request({
					url: `/api/proposal/addProposal`,
					data:{
						title:this.title,
						type:this.categoryId,
						area:this.areaId,
						state:this.actuality,
						proposal:this.proposal
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
						if (res.data.status == 'SUCCESS') {
							uni.showToast({
								icon: 'success',
								title: '新增建议成功！'
							});	
							uni.removeStorageSync('title')
							uni.removeStorageSync('actuality')
							uni.removeStorageSync('proposal')
							uni.removeStorageSync('areaInfo')
							uni.removeStorageSync('categoryInfo')
							this.title=''
							this.categoryName=''
							this.areaName=''
							this.actuality=''
							this.proposal=''
						}
					},
					fail: (error) => {
						console.log(error)
					}
				})
			},
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
			},
			getTitle(e){
				this.title=e.detail.value
				uni.setStorageSync('title',this.title)
			},
			getActuality(e){
				this.actuality=e.detail.value
				uni.setStorageSync('actuality',this.actuality)
			},
			getProposal(e){
				this.proposal=e.detail.value
				uni.setStorageSync('proposal',this.proposal)
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
				font-size: 28rpx;
				color: #333;
			}
			textarea{
				font-size: 28rpx;
				color: #333;
				margin-top: 30rpx;
			}
		}
		.category{
			/deep/ .uni-list--border-top {
				height: 0;
			}
			
			/deep/ .uni-list--border-bottom {
				height: 0;
			}
			
			/deep/ .uni-list--border:after {
				height: 0;
			}
			/deep/ .uni-list{
				background: none;
			}
			/deep/ .uni-list-item{
				margin-top: 20rpx;
			}
			/deep/ .uni-input-placeholder {
				color: #ddd;
			}
		}
		.section{
			margin-top: 20rpx;
			background: #fff;
			padding: 30rpx 0;
			box-sizing: border-box;
			text{
				padding:0 30rpx;
				font-size:28rpx;
				color: #333;
				box-sizing: border-box;
			}
			textarea{
				padding: 30rpx;
			}
		}
		/deep/ .uni-textarea-textarea{
			font-size: 28rpx;
			color: #666;
		}
		.accessory{
			margin-top: 20rpx;
			background: #fff;
			padding: 30rpx;
			text{
				font-size: 28rpx;
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
