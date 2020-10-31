<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" color="#ffffff" title="我的任务" fixed>
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<view class="task-container">
			<view class="task-container-content">
				<view class="tab">
					<uniSegmentedControl :current="current" :values="items" @clickItem="clickItem" style-type="text" active-color="#4378BE"></uniSegmentedControl>

				</view>
				<view class="content">
					<view v-if="current === 0">
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
								<view class="section">
									<text class="txt">现状：</text>
									<text class="content">施工现场对一项项目工程来说，是工程建设的起点，也是工程建设最为直接的场所。所有施工人员运用相关技术手段，结合人力物力以及财力完成某项工程的场地。而施工现场管理是工程项目管理的关键部分，只有加强施工现场管理，才能保证工程质量、降低成本、缩短工期，提高建筑企业在市场中的竞争力，对建筑企业生存和发展起着重要作用。</text>
								</view>
								<view class="section">
									<text class="txt">建议：</text>
									<text class="content">施工现场对一项项目工程来说，是工程建设的起点，也是工程建设最为直接的场所。所有施工人员运用相关技术手段，结合人力物力以及财力完成某项工程的场地。而施工现场管理是工程项目管理的关键部分，只有加强施工现场管理，才能保证工程质量、降低成本、缩短工期，提高建筑企业在市场中的竞争力，对建筑企业生存和发展起着重要作用。</text>
								</view>
								<view class="img">
									<image src="../../static/scenery-1.jpg" mode="aspectFill"></image>
									<image src="../../static/scenery-2.jpg" mode="aspectFill"></image>
									<image src="../../static/scenery-3.jpg" mode="aspectFill"></image>
									<image src="../../static/scenery-4.jpg" mode="aspectFill"></image>
								</view>
							</view>
						</view>

					</view>
					<view v-if="current === 1">
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
								<view class="section">
									<text class="txt">现状：</text>
									<text class="content">施工现场对一项项目工程来说，是工程建设的起点，也是工程建设最为直接的场所。所有施工人员运用相关技术手段，结合人力物力以及财力完成某项工程的场地。而施工现场管理是工程项目管理的关键部分，只有加强施工现场管理，才能保证工程质量、降低成本、缩短工期，提高建筑企业在市场中的竞争力，对建筑企业生存和发展起着重要作用。</text>
								</view>
								<view class="section">
									<text class="txt">建议：</text>
									<text class="content">施工现场对一项项目工程来说，是工程建设的起点，也是工程建设最为直接的场所。所有施工人员运用相关技术手段，结合人力物力以及财力完成某项工程的场地。而施工现场管理是工程项目管理的关键部分，只有加强施工现场管理，才能保证工程质量、降低成本、缩短工期，提高建筑企业在市场中的竞争力，对建筑企业生存和发展起着重要作用。</text>
								</view>
								<view class="img">
									<image src="../../static/scenery-1.jpg" mode="aspectFill"></image>
									<image src="../../static/scenery-2.jpg" mode="aspectFill"></image>
									<image src="../../static/scenery-3.jpg" mode="aspectFill"></image>
									<image src="../../static/scenery-4.jpg" mode="aspectFill"></image>
								</view>
							</view>
						</view>
					</view>
				</view>

			</view>

		</view>
	</view>
</template>

<script>
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcon from "../../components/uni-icons/uni-icons.vue"
	import uniSegmentedControl from "../../components/uni-segmented-control/uni-segmented-control.vue"
	export default {
		components: {
			uniNavBar,
			uniIcon,
			uniSegmentedControl
		},
		data() {
			return {
				items: ["待处理", "已处理"],
				current: 0
			}
		},
		methods: {
			back() {
				uni.redirectTo({
					url:"../index/index"
				})
			},
			clickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.task-container {
		.task-container-content {
			.tab {
				background: #fff;
				border-bottom: 1px solid #f2f2f2;
				position: fixed;
				top: 88rpx;
				width: 100%;
				z-index: 9999;

				/deep/ .segmented-control {
					padding: 0 30rpx;

					/deep/ .segmented-control__text {
						font-size: 28rpx;
						font-weight: bold;
					}
				}
			}

			.content {
				margin-top: 72rpx;

				.proposal-container {
					padding: 30rpx;
					background: #fff;
					margin-bottom: 20rpx;

					.proposal-container-header {
						display: flex;
						align-items: center;
						padding: 10rpx 0;
						// border-bottom: 1px solid #f2f2f2;

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
						padding: 10rpx 0;

						.section {
							background: #f8f8f8;
							border-radius: 10rpx;
							padding: 8rpx 20rpx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
							margin-bottom: 10rpx;
							line-height: 42rpx;

							.txt {
								color: #333;
								font-size: 28rpx;
								font-weight: bold;
							}

							.content {
								color: #666;
								font-size: 28rpx;
							}
						}

						.img {
							display: flex;
							justify-content: space-around;

							image {
								width: 140rpx;
								height: 140rpx;
								border-radius: 10rpx;
								border: 1px solid #f2f2f2;
							}
						}
					}
				}
			}

		}
	}
</style>
