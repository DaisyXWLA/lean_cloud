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
						<view class="content-empty" v-if="taskList.length==0">
							暂无数据
						</view>
						<view v-else v-for="item in taskList" :key="item.id">
							<view class="proposal-container" @click="detail(item.id)">
								<view class="proposal-container-header">
									<view class="portrait">
										<image src="../../static/portrait.png" mode="aspectFit"></image>
									</view>
									<view class="info">
										<view :class="item.auditStatus==0?'long-title':'title'">{{item.title}}</view>
										<view class="name-time">
											<text class="name">{{item.realName}}</text>
											<text class="time">{{timeFormat(item.createTime)}}</text>
										</view>
									</view>
									<view class="status" v-if="item.auditStatus==0">审核未通过</view>
									<view class="status" v-else-if="item.auditStatus==1">审核中</view>
									<view class="status" v-else-if="item.auditStatus==2">落实中</view>
									<view class="status" v-else-if="item.auditStatus==3">已完成</view>
								</view>
								<view class="proposal-container-content">
									<view class="proposal-container-content-box">
										<view class="section">
											<text class="txt">现状：</text>
											<text class="content">{{item.state}}</text>
										</view>
										<view class="section">
											<text class="txt">建议：</text>
											<text class="content">{{item.proposal}}</text>
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
					</view>
					<view v-if="current === 1">
						<view class="content-empty" v-if="taskList.length==0">
							暂无数据
						</view>
						<view v-else v-for="item in taskList" :key="item.id">
							<view class="proposal-container" @click="detail(item.id)">
								<view class="proposal-container-header">
									<view class="portrait">
										<image src="../../static/portrait.png" mode="aspectFit"></image>
									</view>
									<view class="info">
										<view :class="item.auditStatus==0?'long-title':'title'">{{item.title}}</view>
										<view class="name-time">
											<text class="name">{{item.realName}}</text>
											<text class="time">{{timeFormat(item.createTime)}}</text>
										</view>
									</view>
									<view class="status" v-if="item.auditStatus==0">审核未通过</view>
									<view class="status" v-else-if="item.auditStatus==1">审核中</view>
									<view class="status" v-else-if="item.auditStatus==2">落实中</view>
									<view class="status" v-else-if="item.auditStatus==3">已完成</view>
								</view>
								<view class="proposal-container-content">
									<view class="proposal-container-content-box">
										<view class="section">
											<text class="txt">现状：</text>
											<text class="content">{{item.state}}</text>
										</view>
										<view class="section">
											<text class="txt">建议：</text>
											<text class="content">{{item.proposal}}</text>
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
				current: 0,
				taskList: []
			}
		},
		onLoad(option) {
			this.token = uni.getStorageSync('token')
			this.getData(this.current)
		},
		methods: {
			getData(status) {
				// this.taskList=[]
				uni.request({
					url:"/api/proposal/getProposalSponsorUserId",
					data: {
						buttonType: status
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
						console.log(res)
						this.taskList = res.data.obj.records
					},
					fail: (error) => {
						console.log(error)
					}
				})
			},
			back() {
				uni.redirectTo({
					url: "../index/index"
				})
			},
			detail(id) {
				uni.redirectTo({
					url: `../my-proposal/my-proposal?id=${id}&moduleFlagId=2`
				})
			},
			clickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
				this.getData(e.currentIndex)
			},
			timeFormat(time) {
				let date = new Date(time)
				let newTime =
					`${date.getFullYear()}-${this.addZero(date.getMonth()+1)}-${this.addZero(date.getDate())}  ${this.addZero(date.getHours())}:${this.addZero(date.getMinutes())}`
				return newTime
			},
			//时间补零
			addZero(time) {
				return time < 10 ? `0${time}` : time
			},
		}
	}
</script>

<style lang="scss" scoped>
	// #ifdef  MP-WEIXIN
	.tab {
		top: 150rpx;
		/deep/ .segmented-control__text {
			font-size: 32rpx;
		}
	}
	// #endif
	// #ifdef APP-PLUS
	.top{
		top: 144rpx;
	}
	// #endif
	// #ifdef  H5
	.tab {
		top: 88rpx;
	}
	// #endif
	.task-container {
		.task-container-content {
			.tab {
				background: #fff;
				border-bottom: 1px solid #f2f2f2;
				position: fixed;
				// top: 88rpx;
				width: 100%;
				z-index: 9999;

				/deep/ .segmented-control {
					padding: 0 30rpx;

					/deep/ .segmented-control__text {
						font-size: 28rpx;
					}
				}
			}

			.content {
				margin-top: 72rpx;

				.content-empty {
					font-size: 40rpx;
					color: #C0C4CC;
					text-align: center;
					margin-top: 500rpx;
				}

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

							.long-title {
								font-size: 32rpx;
								color: #333;
								width: 420rpx;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
							}

							.title {
								font-size: 32rpx;
								color: #333;
								width: 460rpx;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
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
			}

		}
	}
</style>
