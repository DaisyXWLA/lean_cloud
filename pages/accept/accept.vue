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
				<label>预计收益（元）</label>
				<!-- <input type="number" placeholder="请输入预计收益金额" dir="rtl" /> -->
				<input type="number" placeholder="请输入预计收益金额" />
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
				
			}
		},
		methods: {
			back () {
				uni.redirectTo({
					url: "../proposal-detail/proposal-detail"
				})
			},
			acceptConfirm () {}
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
				font-size: 32rpx;
				color: #333;
				font-weight: bold;
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
				font-size: 32rpx;
				color: #333;
				font-weight: bold;
			}
			textarea{
				font-size: 28rpx;
				color: #333;
				margin-top: 30rpx;
			}
		}
	}
</style>
