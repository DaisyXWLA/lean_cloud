<template>
	<view>
		<uniNavBar :status-bar="true" background-color="#4378BE" right-text="确定" color="#ffffff" title="评论" fixed @clickRight="addComment">
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<view class="commentContent">
			<textarea placeholder-style="color:#BCC1D4;font-size:28rpx" placeholder="请输入评论内容" :value="commentContent" @blur="getCommentContent" />
			</view>
	</view>
</template>

<script>
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcon from "../../components/uni-icons/uni-icons.vue"
	export default {
		components: {
			uniNavBar,
			uniIcon
		},
		data() {
			return {
				proposalId:'',
				commentContent:''
			}
		},
		onLoad(option) {
			this.token = uni.getStorageSync('token')
			this.proposalId = option.proposalId
		},
		methods: {
			addComment(){
				uni.request({
					url: `/api/message/addMessage`,
					data:{
						content:this.commentContent,
						worksId:this.proposalId,
						worksType:1
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
						if (res.data.status == 'SUCCESS') {
							uni.showToast({
								icon: 'success',
								title: '评论提交成功！'
							});
						}
					},
					fail: (error) => {
						console.log(error)
					}
				})
			},
			getCommentContent(e){
				this.commentContent=e.detail.value
			},
			back(){
				uni.redirectTo({
					url:`../proposal-detail/proposal-detail?proposalId=${this.proposalId}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.commentContent{
			background: #fff;
			padding: 30rpx;
			textarea{
				font-size: 28rpx;
				color: #333;
			}
	}
</style>
