<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" right-text="确定" color="#ffffff" title="完成" fixed @clickRight="finishConfirm">
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<view class="finish-container">
			<!-- <view class="earnings">
				<label>预计收益（元）</label>
				<input type="number" placeholder="请输入预计收益金额" />
			</view> -->
			<view class="description">
				<text>描述</text>
				<textarea placeholder-style="color:#BCC1D4;font-size:28rpx" placeholder="请输入描述内容" :value="content" @blur="getContent"/>
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
		components:{uniNavBar,uniIcon,upload},
		data() {
			return {
				 imageData : [],
				 proposalId:'',
				 processId:'',
				 userId:'',
				 flowId:'',
				 content:'',
				 moduleFlagId:''
			}
		},
		onLoad(option){
			this.token = uni.getStorageSync('token')
			this.proposalId=option.proposalId
			this.processId=option.processId
			this.userId=option.userId
			this.flowId=option.flowId
			this.moduleFlagId=option.moduleFlagId
		},
		methods: {
			back () {
				uni.redirectTo({
					url: `../my-proposal/my-proposal?id=${this.proposalId}&moduleFlagId=${this.moduleFlagId}`
				})
			},
			finishConfirm () {
				uni.request({
					url: "/api/flowProcess/addFlowProcess",
					data: {
						proposalId: this.proposalId,
						prevFlowProcessId:this.processId,
						prevSponsorUserId:this.userId,
						flowId:this.flowId,
						buttonType:4,
						content:this.content
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
						if (res.data.status == 'SUCCESS') {
							uni.showToast({
								icon: 'success',
								title: '完成！'
							});	
							this.content=''
							this.back()
						}
				
					},
					fail: (error) => {
						console.log(error)
					}
				})
			},
			upload () {
				console.log("上传照片")
			},
			deleteImage () {},
			addImage (e) {
				console.log(e)
			},
			getContent(e){
				this.content=e.detail.value
			}
		}
	}
</script>

<style lang="scss" scoped>
	.finish-container{
		.earnings{
			padding: 30rpx;
			display: flex;
			background: #fff;
			margin-bottom: 20rpx;;
			label{
				flex: 1;
				font-size: 32rpx;
				color: #333;
				
			}
			input{
				flex: 2;
				text-align: right;
				/deep/ .uni-input-placeholder{
					font-size: 28rpx;
					color: #BCC1D4;
				}
			}
		}
		.description{
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
