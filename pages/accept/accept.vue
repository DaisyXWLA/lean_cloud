<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" right-text="确定" color="#ffffff" title="验收" fixed @clickRight="acceptConfirm">
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<view class="accept-container">
			<view class="earnings">
				<label>预期年收益（元）</label>
				<!-- <input type="number" placeholder="请输入预计收益金额" dir="rtl" /> -->
				<input type="number" placeholder="请输入预期年收益" :value="amount" @blur="getAmount" />
			</view>
			<view class="earnings">
				<label>奖励积分</label>
				<!-- <input type="number" placeholder="请输入预计收益金额" dir="rtl" /> -->
				<input type="number" placeholder="请输入奖励积分" :value="itegral" @blur="getItegral" />
			</view>
			<view class="description">
				<text>描述</text>
				<textarea placeholder-style="color:#BCC1D4;font-size:28rpx" placeholder="请输入描述信息" />
				</view>
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
				amount:'',
				itegral:'',
				proposalId:'',
				processId:'',
				userId:'',
				moduleFlagId:''
			}
		},
		onLoad(option){
			this.token = uni.getStorageSync('token')
			this.proposalId=option.proposalId
			this.processId=option.processId
			this.userId=option.userId
			this.moduleFlagId=optionthis.moduleFlagId
			// console.log(this.proposalId)
		},
		methods: {
			back () {
				uni.redirectTo({
					url: `../my-proposal/my-proposal?id=${this.proposalId}&moduleFlagId=${this.moduleFlagId}`
				})
			},
			acceptConfirm () {
				uni.request({
					url: "/api/flowProcess/reviewOrRevoke",
					data: {
						proposalId: this.proposalId,
						prevFlowProcessId:this.processId,
						prevSponsorUserId:this.userId,
						buttonType:7,
						profit:this.amount,
						point:this.itegral
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
					if (res.data.status == 'SUCCESS') {
						uni.showToast({
							icon: 'success',
							title: '验收成功！'
						});	
						this.amount=''
						this.itegral=''
						this.back()
					}
					},
					fail: (error) => {
						console.log(error)
					}
				})
			},
			getAmount(e){
				this.amount=e.detail.value
			},
			getItegral(e){
				this.itegral=e.detail.value
			}
		}
	}
</script>

<style lang="scss"  scoped>
	.accept-container{
		.earnings{
			padding: 30rpx;
			display: flex;
			background: #fff;
			margin-bottom: 20rpx;;
			label{
				flex: 1;
				font-size: 28rpx;
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
	}
</style>
