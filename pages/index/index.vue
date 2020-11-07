<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" color="#ffffff" title="安腾云" fixed @clickLeft="clickLeft"
		 @clickRight="clickRight">
			<template slot="left">
				<image class="user" src="../../static/icon/user.png" mode="widthFix"></image>
			</template>
			<template slot="right">
				<image class="plus" src="../../static/icon/plus.png" mode="widthFix"></image>
			</template>
		</uniNavBar>
		<!-- 抽屉 -->
		<uniDrawer mode="left" ref="drawer">
			<view style="padding:30rpx;" class="drawer-container">
				<view class="portrait">
					<image src="../../static/portrait-a.png" lazy-load="true" mode="aspectFit"></image>
				</view>
				<view class="list">
					<uniList>
						<uniListItem title="个人资料" clickable to="/pages/personal/personal">
							<template slot="header">
								<image class="slot-image" src="../../static/icon/personal.png" mode="widthFix"></image>
							</template>
						</uniListItem>
					</uniList>
					<uniList>
						<uniListItem title="我的积分" clickable to="/pages/integral/integral?integralId=0">
							<!-- <uniListItem title="我的积分" clickable @click="gotoIntergral"> -->
							<template slot="header">
								<image class="slot-image" src="../../static/icon/integral.png" mode="widthFix"></image>
							</template>
						</uniListItem>
					</uniList>
					<uniList>
						<uniListItem title="修改密码" clickable to="/pages/password/password">
							<template slot="header">
								<image class="slot-image" src="../../static/icon/password.png" mode="widthFix"></image>
							</template>
						</uniListItem>
					</uniList>
					<uniList>
						<uniListItem title="意见反馈" clickable to="/pages/feedback/feedback">
							<template slot="header">
								<image class="slot-image" src="../../static/icon/opinion.png" mode="widthFix"></image>
							</template>
						</uniListItem>
					</uniList>
					<uniList>
						<uniListItem title="员工管理" clickable to="/pages/staff-manage/staff-manage">
							<template slot="header">
								<image class="slot-image" src="../../static/icon/staff.png" mode="widthFix"></image>
							</template>
						</uniListItem>
					</uniList>
				</view>
				<button type="warn" size="mini" class="btn" @click="exit">退出</button>
			</view>
		</uniDrawer>
		<!-- 首页内容 -->
		<view class="container">
			<view class="container-message">
				<uniList>
					<uniListChat title="消息提醒" :note="isReadMessage==0?'您有未读消息':'暂无未读消息'" :badgeText="isReadMessage==0?'dot':''"
					 badgePositon="left" avatar="../../static/icon/message@2x.png" :time="timeMessage" clickable @click="messageList"></uniListChat>
				</uniList>
				<uniList>
					<uniListChat title="企业公告" :note="isReadNotice==0?'您有未读公告':'暂无未读公告'" :badgeText="isReadNotice==0?'dot':''"
					 badgePositon="left" avatar="../../static/icon/notice@2x.png" :time="timeNotice" clickable @click="noticeList"></uniListChat>
				</uniList>
				<uniList>
					<uniListChat title="任务提醒" :note="isReadTask==0?'您有未读任务提醒':'暂无未读任务提醒'" :badgeText="isReadTask==0?'dot':''"
					 badgePositon="left" avatar="../../static/icon/task@2x.png" :time="timeTask" clickable @click="taskList"></uniListChat>
				</uniList>
			</view>
			<view class="contianer-workspace">
				<view class="title">
					<text>工作区</text>
				</view>
				<view class="grid">
					<uni-grid :column="3" :square="false" :showBorder="false" @change="goto">
						<!-- <uni-grid-item v-for="(item,index) in workspaceData" :key="index">
							<image :src="item.src" mode="aspectFit" class="pic"></image>
							<text class="text">{{item.text}}</text>
						</uni-grid-item> -->
						<uni-grid-item :index="0">
							<image src="../../static/icon/email@2x.png" mode="aspectFit" class="pic"></image>
							<uniBadge class="uni-badge-left-margin" :text="proposalBadge==0?' ':''" type="error" size="small" />
							<text class="text">合理化建议</text>
						</uni-grid-item>
						<uni-grid-item :index="1" class="border">
							<image src="../../static/icon/manage@2x.png" mode="aspectFit" class="pic"></image>
							<text class="text">5S管理</text>
						</uni-grid-item>
						<uni-grid-item :index="2">
							<image src="../../static/icon/safety@2x.png" mode="aspectFit" class="pic"></image>
							<text class="text">安全检查</text>
						</uni-grid-item>
						<uni-grid-item :index="3">
							<image src="../../static/icon/response@2x.png" mode="aspectFit" class="pic"></image>
							<text class="text">快速响应</text>
						</uni-grid-item>
						<uni-grid-item :index="4" class="border">
							<image src="../../static/icon/preserve@2x.png" mode="aspectFit" class="pic"></image>
							<text class="text">全员生产维护</text>
						</uni-grid-item>
						<uni-grid-item :index="5">
							<image src="../../static/icon/check@2x.png" mode="aspectFit" class="pic"></image>
							<text class="text">分层审核</text>
						</uni-grid-item>
						<uni-grid-item :index="6">
							<image src="../../static/icon/eye@2x.png" mode="aspectFit" class="pic"></image>
							<text class="text">安灯</text>
						</uni-grid-item>
						<uni-grid-item :index="7" class="border">
							<image src="../../static/icon/stimulate@2x.png" mode="aspectFit" class="pic"></image>
							<text class="text">云激励</text>
						</uni-grid-item>
						<uni-grid-item :index="8">
							<image src="../../static/icon/store@2x.png" mode="aspectFit" class="pic"></image>
							<text class="text">积分商城</text>
						</uni-grid-item>
					</uni-grid>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 导航
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue"
	// 抽屉
	import uniDrawer from '../../components/uni-drawer/uni-drawer.vue'
	// 列表
	import uniList from '../../components/uni-list/uni-list.vue'
	import uniListItem from '../../components/uni-list-item/uni-list-item.vue'
	import uniListChat from '../../components/uni-list-chat/uni-list-chat.vue'
	import uniListBadge from '../../components/uni-badge/uni-badge.vue'
	// Grid宫格
	import uniGrid from "../../components/uni-grid/uni-grid.vue"
	import uniGridItem from "../../components/uni-grid-item/uni-grid-item.vue"
	//角标
	import uniBadge from "../../components/uni-badge/uni-badge.vue"
	export default {
		components: {
			uniNavBar,
			uniDrawer,
			uniList,
			uniListItem,
			uniListChat,
			uniListBadge,
			uniGrid,
			uniGridItem,
			uniBadge
		},
		data() {
			return {
				token: '',
				isReadMessage: '',
				timeMessage: '',
				isReadNotice: '',
				timeNotice: '',
				isReadTask: '',
				timeTask: '',
				proposalBadge: ''
			}
		},
		onLoad() {
			this.token = uni.getStorageSync('token')
			this.getData()
		},
		methods: {
			clickLeft() {
				this.$refs.drawer.open()
			},
			clickRight() {
				console.log('点击了右侧按钮')
			},
			exit() {
				this.$refs.drawer.close()
				uni.redirectTo({
					url: "../login/login"
				})
			},
			goto(obj) {
				if (obj.detail.index == 0) {
					uni.switchTab({
						url: "../proposal/proposal"
					})
				}
			},
			// gotoIntergral(){
			// 	console.log('返回首页')
			// 	uni.redirectTo({
			// 		url:"../integral/integral?integralId=0",
			// 		// success:(res)=>{
			// 		// 	this.$refs.drawer.close()
			// 		// }
			// 	})
			// },
			// 获取首页数据
			getData() {
				// 系统消息
				uni.request({
					url: `/api/news/index`,
					method: 'get', //请求方式
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
						console.log(res)
						this.isReadMessage = res.data.obj.isRead
						if (res.data.obj.time === null) {
							return
						}
						this.timeMessage = this.getTime(res.data.obj.time)
						// console.log(this.timeMessage)
					},
					fail: (error) => {
						console.log(error)
					}
				})
				//获取未读公告
				uni.request({
					url: `/api/report/index`,
					method: 'get', //请求方式
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
						// console.log(res)
						this.isReadNotice = res.data.obj.isRead
						this.timeNotice = this.getTime(res.data.obj.time)
					},
					fail: (error) => {
						console.log(error)
						console.log('---------------------------')
					}
				})
				// 获取未读任务
				uni.request({
					url: `/api/task/index`,
					method: 'get', //请求方式
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
						// console.log(res)
						this.isReadTask = res.data.obj.isRead
						this.timeTask = this.getTime(res.data.obj.time)
					},
					fail: (error) => {
						console.log(error)
						console.log('---------------------------')
					}
				})
				//获取九宫格未处理数据
				uni.request({
					url: `/api/index/getIndexMenu`,
					method: 'get', //请求方式
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
						// console.log(res)
						for (let i = 0; i < res.data.obj.length; i++) {
							if (res.data.obj[i].id == 1) {
								this.proposalBadge = res.data.obj[i].tasks
							}
						}
					},
					fail: (error) => {
						console.log(error)
						console.log('---------------------------')
					}
				})
			},
			//获取当天时间
			getTime(time) {
				let date = new Date();
				if (new Date(time).getMonth() == date.getMonth() && new Date(time).getDate() == date.getDate() - 1) {
					time = '昨天'
					return time
				} else if (new Date(time).getMonth() == date.getMonth() && new Date(time).getDate() == date.getDate()) {
					time = `${this.addZero(new Date(time).getHours())}:${this.addZero(new Date(time).getMinutes())}`
					return time
				} else {
					time = `${this.addZero(new Date(time).getMonth()+1)}月${this.addZero(new Date(time).getDate())}日`
					return time
				}
			},
			//时间补零
			addZero(time) {
				return time < 10 ? `0${time}` : time
			},
			//获取列表数据
			messageList() {
				uni.redirectTo({
					url: `../message/message?isRead=${this.isReadMessage}`
				})
			},
			noticeList() {
				uni.redirectTo({
					url: `../notice/notice?isRead=${this.isReadNotice}`
				})
			},
			taskList() {
				uni.redirectTo({
					url: `../task-manage/task-manage?isRead=${this.isReadTask}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	uni-page-wrapper {
		background-color: #f2f2f2 !important;
	}

	.user {
		width: 44rpx;
	}

	.plus {
		width: 44rpx;
	}

	.drawer-container {
		margin-top: 88rpx;
		display: flex;
		flex-direction: column;

		.portrait {
			align-self: center;
			width: 140rpx;
			height: 140rpx;
			border: 1px solid #BBC0D4;
			border-radius: 50%;
			padding: 2rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.list {
			margin-top: 60rpx;

			.slot-image {
				width: 36rpx;
				margin-right: 20rpx;
			}

			/deep/ .uni-list--border-top {
				height: 0;
			}

			/deep/ .uni-list--border-bottom {
				background: #f2f2f2;
			}

			/deep/ .uni-list-item__content-title {
				color: #666;
			}
		}

		.btn {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			margin-top: 60rpx;
		}
	}

	.container {
		.container-message {
			/deep/ .uni-list--border-bottom {
				height: 0;
			}

			/deep/ .uni-list--border-top {
				background: #f2f2f2;
			}

			/deep/ .uni-list-chat__header {
				width: 80rpx;
				height: 80rpx;
				border: none;
			}

			/deep/ .uni-list-chat__content-title {
				font-size: 28rpx;
			}

			/deep/ .uni-badge--dot {
				left: calc(90rpx + 30rpx - 20rpx/ 2 + 2rpx + -10rpx);
			}
		}

		.contianer-workspace {
			background-color: #FFFFFF;
			margin-top: 20rpx;

			.title {
				padding: 20rpx 30rpx;
				font-size: 28rpx;
				color: #999999;
			}

			.grid {
				.pic {
					width: 80rpx;
					height: 80rpx;

				}

				.text {
					font-size: 26rpx;
					padding-top: 20rpx;
					color: #333;
				}

				/deep/ .uni-grid-item {
					padding: 15px 20px;
					box-sizing: border-box;
					border-top: 1px solid #f2f2f2;

				}

				.border {
					border-left: 1px solid #f2f2f2;
					border-right: 1px solid #f2f2f2;
				}

				/deep/ .uni-grid-item__box {
					align-items: center;
					position: relative;
				}

				/deep/ .uni-badge {
					width: 24rpx !important;
					height: 24rpx;
					position: absolute;
					top: -8rpx;
					right: 30rpx;
					padding: 0;
				}
			}

		}
	}
</style>
