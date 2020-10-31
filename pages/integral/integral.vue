<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" color="#ffffff" title="我的积分" fixed>
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<view class="integral-container">
			<view class="integral-container-header">
				<text class="available-integral">5999</text>
				<text class="all-integral">累计积分：6000</text>
			</view>
		</view>
		<view class="integral-content">
			<view class="integral-content-title">
				<text>时间</text>
				<text>明细</text>
			</view>
			<uniList>
				<uni-list-item title="采纳建议" note="2020-10-29 16:20" rightText="+10" />
				<uni-list-item title="采纳建议" note="2020-10-29 16:20" rightText="+10" />
				<uni-list-item title="采纳建议" note="2020-10-29 16:20" rightText="+10" />
				<uni-list-item title="采纳建议" note="2020-10-29 16:20" rightText="+10" />
				<uni-list-item title="采纳建议" note="2020-10-29 16:20" rightText="+10" />
				<uni-list-item title="采纳建议" note="2020-10-29 16:20" rightText="+10" />
				<uni-list-item title="采纳建议" note="2020-10-29 16:20" rightText="+10" />
				<uni-list-item title="采纳建议" note="2020-10-29 16:20" rightText="+10" />
				<uni-list-item title="采纳建议" note="2020-10-29 16:20" rightText="+10" />
				<uni-list-item title="采纳建议" note="2020-10-29 16:20" rightText="+10" />
			</uniList>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcon from "../../components/uni-icons/uni-icons.vue"
	import uniList from "../../components/uni-list/uni-list.vue"
	import uniListItem from '../../components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniNavBar,
			uniIcon,
			uniList,
			uniListItem
		},
		data() {
			return {

			};
		},
		methods: {
			back() {
				uni.redirectTo({
					url: "../message/message"
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .uni-navbar--border {
		border: none;
	}

	.integral-container {
		.integral-container-header {
			padding: 60rpx 0;
			background: #4378BE;
			color: #fff;
			text-align: center;

			text {
				display: block;
			}

			.available-integral {
				font-size: 80rpx;
				margin-bottom: 10rpx;
			}

			.all-integral {
				font-size: 28rpx;
				color: rgba($color: #fff, $alpha: 0.8);
			}
		}
	}

	.integral-content {
		background: #fff;
		margin-top: 20rpx;
		.integral-content-title {
			padding: 30rpx;
			display: flex;
			justify-content: space-between;
			text {
				font-size: 32rpx;
				color: #999;
			}

		}
		/deep/ .uni-list-item__content-title{
			font-size: 32rpx;
			color: #333;
		}
		/deep/ .uni-list-item__extra-text{
			font-size: 36rpx;
			color: #4378BE;
		}
	}
</style>
