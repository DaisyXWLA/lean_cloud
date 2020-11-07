<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" color="#ffffff" title="任务提醒" fixed>
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<!-- 列表 -->
		<view class="task-list-empty" v-if="taskList.length==0">
			暂无数据
		</view>
		<view class="task-list" v-for="item in taskList" :key="item.id">
			<view class="task-list-time"><text>{{timeFormat(item.createTime)}}</text></view>
			<view class="task-list-container" @click="detail(item.worksId,item.worksType)">
				<view class="task-list-container-header">
					<view class="task-list-container-header-tag">{{item.worksType==1?'合理化建议':''}}</view>
					<view class="task-list-container-header-content">
						<view class="title">{{item.title}}</view>
						<view class="proposer">
							<text>{{item.userName}}</text>
							<text class="status-before" v-if="item.status==0">未处理</text>
						</view>
					</view>
				</view>
				<view class="task-list-container-content">
					<view class="section">
						<text class="content">{{item.content}}</text>
					</view>
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
				isRead: '',
				taskList: []
			}
		},
		onLoad(option) {
			this.token = uni.getStorageSync('token')
			this.isRead = option.isRead
			this.getData()
		},
		methods: {
			back() {
				uni.redirectTo({
					url: "../index/index"
				})
			},
			detail(id, worksType) {
				if (worksType == 1) {
					uni.redirectTo({
						url: `../my-proposal/my-proposal?id=${id}`
					})
				}

			},
			//获取列表数据
			getData() {
				// console.log(this.isRead)
				uni.request({
					url: `/api/task/list`,
					data: {
						isRead: this.isRead
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
			timeFormat(time) {
				let date = new Date(time)
				let newTime = `${date.getFullYear()}-${this.addZero(date.getMonth()+1)}-${this.addZero(date.getDate())}  ${this.addZero(date.getHours())}:${this.addZero(date.getMinutes())}`
				return newTime
			},
			addZero(time) {
				return time < 10 ? `0${time}` : time
			}
		}
	}
</script>

<style lang="scss" scoped>
	.task-list-empty{
		font-size: 40rpx;
		color: #C0C4CC;
		text-align: center;
		margin-top: 500rpx;
	}
	.task-list {
		margin-top: 34rpx;
		padding: 0 30rpx;

		.task-list-time {
			text-align: center;

			text {
				background-color: #E8E8E8;
				border-radius: 30rpx;
				font-size: 24rpx;
				color: #999;
				padding: 8rpx 20rpx;
			}
		}

		.task-list-container {
			margin: 24rpx 0;
			background-color: #ffffff;
			border-radius: 10rpx;

			.task-list-container-header {
				border-bottom: 1px solid #f2f2f2;

				.task-list-container-header-tag {
					background: linear-gradient(-45deg, transparent 380rpx, #2DB755 0) bottom right;
					color: #fff;
					border-top-left-radius: 10rpx;
					border-top-right-radius: 10rpx;
					padding: 4rpx 20rpx;
					box-sizing: border-box;
					font-size: 24rpx;
				}

				.task-list-container-header-content {
					padding: 10rpx 30rpx 20rpx;

					.title {
						font-size: 32rpx;
						padding-bottom: 10rpx;
					}

					.proposer {
						font-size: 28rpx;
						color: #999999;
						display: flex;
						justify-content: space-between;

						.status-before {
							color: #ffb142;
							background: #FFF0DB;
							padding: 4rpx 20rpx;
							border-radius: 10rpx;
						}

						.status {
							color: #35BA5B;
							background: #DBFFE6;
							padding: 4rpx 20rpx;
							border-radius: 10rpx;
						}
					}
				}
			}

			.task-list-container-content {
				padding: 20rpx 30rpx;
				font-size: 28rpx;

				.section {
					// background:#f8f8f8;
					border-radius: 10rpx;
					// padding:8rpx 20rpx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					margin-bottom: 10rpx;
					line-height: 42rpx;

					.content {
						color: #666;
					}
				}
			}
		}
	}
</style>
