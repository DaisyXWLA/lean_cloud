<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" color="#ffffff" title="合理化建议" fixed>
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<view class="proposal-container-detail">
			<view class="proposal-container-detail-content">
				<view class="proposal-container-detail-content-header">
					<view class="title">对施工现场油污处理的建议</view>
					<view class="time">2020-10-27 09:23</view>
					<view class="approval-status">
						<view class="user">
							<image src="../../static/portrait.png" mode="aspectFit"></image>
							<text>Julie</text>
						</view>
						<view class="status">已审核</view>
					</view>
				</view>
				<view class="proposal-container-detail-content-box">
					<view class="info">
						<text>编号：INTE202010131520222454</text>
						<text>部门：技术部</text>
						<text>提案类别：设备工艺改进</text>
						<text>现状：现状描述</text>
						<text>建议：期望建议</text>
					</view>
					<!-- <view class="section">
						<text class="txt">现状：</text>
						<text class="content">施工现场对一项项目工程来说，是工程建设的起点，也是工程建设最为直接的场所。所有施工人员运用相关技术手段，结合人力物力以及财力完成某项工程的场地。而施工现场管理是工程项目管理的关键部分，只有加强施工现场管理，才能保证工程质量、降低成本、缩短工期，提高建筑企业在市场中的竞争力，对建筑企业生存和发展起着重要作用。</text>
					</view>
					<view class="section">
						<text class="txt">建议：</text>
						<text class="content">施工现场对一项项目工程来说，是工程建设的起点，也是工程建设最为直接的场所。所有施工人员运用相关技术手段，结合人力物力以及财力完成某项工程的场地。而施工现场管理是工程项目管理的关键部分，只有加强施工现场管理，才能保证工程质量、降低成本、缩短工期，提高建筑企业在市场中的竞争力，对建筑企业生存和发展起着重要作用。</text>
					</view> -->
					<view class="img">
						<image src="../../static/scenery-1.jpg" mode="aspectFill"></image>
						<image src="../../static/scenery-2.jpg" mode="aspectFill"></image>
						<image src="../../static/scenery-3.jpg" mode="aspectFill"></image>
						<!-- <image src="../../static/scenery-4.jpg" mode="aspectFill"></image> -->
					</view>
				</view>
			</view>
			<view class="proposal-container-detail-progress">
				<!-- <view class="proposal-container-detail-progress-title">
					<text>验收进度</text>
				</view> -->
				<view class="proposal-container-detail-progress-steps">
					<uniSteps :options="options" direction="column" :active="active" v-if="active==0&&options[0].title=='新建任务'">
						<template slot="footer">
							<text class="steps-remark">新提案请审核</text>
							<view class="steps-info">
								<view class="steps-info-portrait">
									<image src="../../static/portrait-b.png" mode="aspectFill"></image>
								</view>
								<view class="steps-info-user">
									<text class="name">Julie</text>
									<text class="time">2020-10-27 14:28</text>
								</view>
							</view>
						</template>
						<template slot="left">
							<text class="wait-time">已等待12小时30分钟</text>
						</template>
					</uniSteps>
				</view>
			</view>
		</view>
		<view class="footer">
			<view>
				<button size="mini" class="check-btn" @click="check">审核</button>
				<!-- <button size="mini" class="refuse-btn" @click="refuse">拒绝</button> -->
				<button size="mini" class="finish-btn" @click="finish">完成</button>
				<button size="mini" class="accept-btn" @click="accept">验收</button>
				<uni-popup ref="popup" type="bottom">
					<text @click="selectDepartment">支持部门</text>
					<text @click="selectMemeber">指定员工</text>
					<text @click="close">取消</text>
				</uni-popup>
			</view>
			<view>
				<button size="mini" class="transfer-btn">转移</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcon from "../../components/uni-icons/uni-icons.vue"
	import uniSteps from '../../components/uni-steps/uni-steps.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniNavBar,
			uniIcon,
			uniSteps,
			uniPopup
		},
		data() {
			return {
				active: 0,
				options: [{
					title: '新建任务'
				}, {
					title: '审核通过'
				}, {
					title: '已落实'
				}, {
					title: '验收通过'
				}]
			}
		},
		methods: {
			back() {
				uni.switchTab({
					url: "../task/task"
				})
			},
			check() {
				this.$refs.popup.open()

			},
			refuse() {
				uni.redirectTo({
					url: "../refuse/refuse"
				})
			},
			finish() {
				uni.redirectTo({
					url: "../finish/finish"
				})
			},
			accept() {
				uni.redirectTo({
					url: "../accept/accept"
				})
			},
			selectDepartment(){
				uni.redirectTo({
					url: "../checkDept/checkDept"
				})
			},
			selectMemeber(){
				uni.redirectTo({
					url: "../checkMember/checkMember"
				})
			},
			close(){
				this.$refs.popup.close()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.proposal-container-detail {
		.proposal-container-detail-content {
			background: #fff;
			padding: 30rpx;

			.proposal-container-detail-content-header {
				border-bottom: 1px solid #f2f2f2;
				padding-bottom: 20rpx;
				box-sizing: border-box;
				line-height: 48rpx;

				.title {
					font-size: 32rpx;
					color: #333;
				}

				.time {
					font-size: 28rpx;
					color: #999;
				}

				.approval-status {
					display: flex;
					justify-content: space-between;

					.user {
						image {
							width: 36rpx;
							height: 36rpx;
							border-radius: 10rpx;
							border: 1px solid #fff;
							vertical-align: middle;
						}

						text {
							font-size: 28rpx;
							color: #999;
							vertical-align: middle;
							padding-left: 10rpx;
						}
					}

					.status {
						font-size: 28rpx;
						color: #35BA5B;
						background: #DBFFE6;
						padding: 2px 10px;
						border-radius: 5px;
					}
				}
			}

			.proposal-container-detail-content-box {
				.info {
					margin-top: 20rpx;

					text {
						display: block;
						font-size: 28rpx;
						color: #666;
						line-height: 42rpx;
						// label{
						// 	color: #999;
						// }
					}
				}

				.section {
					font-size: 28rpx;
					background: #f8f8f8;
					border-radius: 16rpx;
					padding: 20rpx;
					line-height: 42rpx;
					margin: 20rpx 0;

					.txt {
						font-weight: 600;
					}

					.content {
						color: #666;
					}
				}

				.img {
					display: flex;
					justify-content: space-around;
					margin-top: 20rpx;

					image {
						width: 180rpx;
						height: 180rpx;
						border-radius: 10rpx;
						border: 1px solid #f2f2f2;
					}
				}
			}
		}

		.proposal-container-detail-progress {
			background: #fff;
			margin-top: 20rpx;
			margin-bottom: 100rpx;

			.proposal-container-detail-progress-title {
				border-bottom: 1px solid #f2f2f2;

				text {
					display: inline-block;
					padding: 20rpx 30rpx;
					font-size: 32rpx;
					font-weight: 600;
					color: #999999;
				}

			}

			.proposal-container-detail-progress-steps {
				padding: 20rpx 30rpx;

				/deep/ .uni-steps__column-text {
					border: none;
				}

				.steps-remark {
					font-size: 28rpx;
					color: #666;
					line-height: 56rpx;
				}

				.steps-info {
					display: flex;

					.steps-info-portrait {
						margin-right: 10rpx;

						image {
							width: 60rpx;
							height: 60rpx;
							border: 1px solid #f2f2f2;
							border-radius: 10rpx;
						}
					}

					.steps-info-user {
						text {
							display: block;
							font-size: 24rpx;
							color: #666;
						}
					}
				}

				.wait-time {
					font-size: 24rpx;
					color: #FDB205;
					background-color: #FFF1D1;
					padding: 2rpx 10rpx;
					border-radius: 6rpx;
					margin-left: 20rpx;
				}
			}
		}
	}

	.footer {
		padding: 10rpx 30rpx;
		box-sizing: border-box;
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		background: #fff;
		position: fixed;
		bottom: 0;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: space-between;

		button {
			color: #fff;
		}

		.check-btn {
			background: #FDB205;
			margin-right: 20rpx;
		}

		.refuse-btn {
			background: #FE6E69;
		}

		.transfer-btn {
			background: #a55eea;
		}

		.finish-btn {
			background: #2DB755;
		}

		.accept-btn {
			background: #539CF8;
		}
		/deep/ .uni-popup__wrapper-box{
			background: #fff;
			text-align: center;
			text{
				font-size: 28rpx;
				color: #666;
				display: block;
				line-height: 70rpx;
			}
		}
	}
</style>
