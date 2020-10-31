<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" color="#ffffff" title="合理化建议" fixed @clickRight="filtrate">
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
			<template slot="right">
				<image class="select" src="../../static/icon/select@2x.png" mode="widthFix"></image>
			</template>
		</uniNavBar>
		<view class="proposal-container">
			<view class="proposal-container-header">
				<view class="portrait">
					<image src="../../static/portrait.png" mode="aspectFit"></image>
				</view>
				<view class="info">
					<view class="title">对施工现场油污处理的建议</view>
					<view class="name-time">
						<text class="name">Julie</text>
						<text class="time">2020-10-28 10:28</text>
					</view>
				</view>
				<view class="status">待审核</view>
			</view>
			<view class="proposal-container-content">
				<view class="proposal-container-content-box">
					<view class="section">
						<text class="txt">现状：</text>
						<text class="content">施工现场对一项项目工程来说，是工程建设的起点，也是工程建设最为直接的场所。所有施工人员运用相关技术手段，结合人力物力以及财力完成某项工程的场地。而施工现场管理是工程项目管理的关键部分，只有加强施工现场管理，才能保证工程质量、降低成本、缩短工期，提高建筑企业在市场中的竞争力，对建筑企业生存和发展起着重要作用。</text>
					</view>
					<view class="section">
						<text class="txt">建议：</text>
						<text class="content">施工现场对一项项目工程来说，是工程建设的起点，也是工程建设最为直接的场所。所有施工人员运用相关技术手段，结合人力物力以及财力完成某项工程的场地。而施工现场管理是工程项目管理的关键部分，只有加强施工现场管理，才能保证工程质量、降低成本、缩短工期，提高建筑企业在市场中的竞争力，对建筑企业生存和发展起着重要作用。</text>
					</view>
				</view>
				<view class="img">
					<image src="../../static/scenery-1.jpg" mode="aspectFill"></image>
					<image src="../../static/scenery-2.jpg" mode="aspectFill"></image>
					<image src="../../static/scenery-3.jpg" mode="aspectFill"></image>
					<!-- <image src="../../static/scenery-4.jpg" mode="aspectFill"></image> -->
				</view>
			</view>
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
			back() {
				uni.redirectTo({
					url: "../index/index"
				})
			},
			filtrate() {
				console.log('点击了筛选按钮')
			},
		}
	}
</script>

<style lang="scss" scoped>
	.select {
		width: 44rpx;
	}

	.proposal-container {
		background: #fff;
		margin-bottom: 20rpx;

		.proposal-container-header {
			display: flex;
			align-items: center;
			padding: 30rpx;
			border-bottom: 1px solid #f2f2f2;

			.portrait {
				margin-right: 10rpx;

				image {
					width: 80rpx;
					height: 80rpx;
					border-radius: 10rpx;
					border: 1px solid #f2f2f2;
					vertical-align: middle;
				}
			}

			.info {
				flex: 1;

				.title {
					font-size: 32rpx;
					color: #333;
				}

				.name-time {
					font-size: 28rpx;
					color: #999;

					.name {
						padding-right: 20rpx;
					}
				}
			}

			.status {
				font-size: 28rpx;
				color: #FDB205;
				background: #FFF1D1;
				padding: 2px 10px;
				border-radius: 5px;
				height: 40rpx;

			}
		}

		.proposal-container-content {
			padding: 30rpx;

			.proposal-container-content-box {
				// background: #f8f8f8;
				border-radius: 10rpx;
				padding: 8rpx 20rpx;
				margin-bottom: 20rpx;
			}

			.section {

				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				// margin-bottom: 10rpx;
				line-height: 42rpx;

				.txt {
					color: #333;
					font-size: 28rpx;
				}

				.content {
					color: #888;
					font-size: 28rpx;
				}
			}

			.img {
				display: flex;
				justify-content: space-around;

				image {
					width: 180rpx;
					height: 180rpx;
					border-radius: 10rpx;
					border: 1px solid #f2f2f2;
				}
			}
		}
	}
</style>
