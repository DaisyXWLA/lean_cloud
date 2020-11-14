<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" right-text="确定" color="#ffffff" title="拒绝" fixed @clickRight="refuseConfirm">
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<view class="refuse-container">
			<text>拒绝原因</text>
			<textarea placeholder-style="color:#BCC1D4;font-size:28rpx" placeholder="请输入拒绝原因" :value="content" @blur="getContent"/>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcon from "../../components/uni-icons/uni-icons.vue"
	export default {
		components:{uniNavBar,uniIcon},
		data() {
			return {
				proposalId:'',
				processId:'',
				userId:'',
				content:'',
				moduleFlagId:''
			}
		},
		onLoad(option){
			this.token = uni.getStorageSync('token')
			this.proposalId=option.proposalId
			this.processId=option.processId
			this.userId=option.userId
			this.moduleFlagId=option.moduleFlagId
		},
		methods: {
			back () {
				uni.redirectTo({
					url: `../my-proposal/my-proposal?id=${this.proposalId}&moduleFlagId=${this.moduleFlagId}`
				})
			},
			refuseConfirm () {
				uni.request({
					url: "/api/proposal/getProposal",
					data: {
						proposalId: this.proposalId,
						flowId:this.processId,
						prevSponsorUserId:this.userId,
						buttonType:0,
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
								title: '已拒绝！'
							});	
							this.content=''
						}
					},
					fail: (error) => {
						console.log(error)
					}
				})
			},
			getContent(e){
				this.content=e.detail.value
			}
		}
	}
</script>

<style lang="scss" scoped>
	.refuse-container{
		background: #fff;
		padding: 30rpx;
		text{
			font-size:28rpx;
			color: #333;
		}
		textarea{
			font-size: 28rpx;
			color: #333;
			margin-top: 30rpx;
		}
	}
</style>
