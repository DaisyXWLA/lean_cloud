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
			<textarea placeholder-style="color:#BCC1D4;font-size:28rpx" placeholder="请输入拒绝原因" />
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
			refuseConfirm () {
				console.log('拒绝审核')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.refuse-container{
		background: #fff;
		padding: 30rpx;
		text{
			cont-size:32rpx;
			color: #333;
			font-weight: bold;
		}
		textarea{
			font-size: 28rpx;
			color: #333;
			margin-top: 30rpx;
		}
	}
</style>
