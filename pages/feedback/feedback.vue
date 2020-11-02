<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" right-text="确定" color="#ffffff" title="意见反馈" fixed @clickRight="finishConfirm">
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<view class="feedback">
			<textarea placeholder-style="color:#BCC1D4;font-size:28rpx" placeholder="请输入反馈意见" />
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
				
			}
		},
		methods: {
			back(){
				uni.redirectTo({
					url: '../index/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.feedback{
		background: #fff;
		padding: 30rpx;
		textarea{
			font-size: 28rpx;
			color: #333;
		}
	}
</style>
