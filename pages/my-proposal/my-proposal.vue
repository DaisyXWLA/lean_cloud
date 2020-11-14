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
					<view class="title">{{data.title}}</view>
					<view class="time">{{timeFormat(data.createTime)}}</view>
					<view class="approval-status">
						<view class="user">
							<image src="../../static/portrait.png" mode="aspectFit"></image>
							<text>{{data.realName}}</text>
						</view>
						<view class="status-stand" v-if="checkStatus=='待审核'">待审核</view>
						<view class="status-stand" v-if="checkStatus=='协助部门待审核'">协助部门待审核</view>
						<view class="status-complete" v-if="checkStatus=='协助部门审核通过'">协助部门审核通过</view>
						<view class="status-complete" v-else-if="checkStatus=='审核通过'">审核通过</view>
						<view class="status-stand" v-else-if="checkStatus=='待落实'">待落实</view>
						<view class="status-complete" v-else-if="checkStatus=='已落实'">已落实</view>
						<view class="status-stand" v-else-if="checkStatus=='待验收'">待验收</view>
						<view class="status-complete" v-else-if="checkStatus=='完成验收'">完成验收</view>
						<view class="status-refuse" v-else-if="checkStatus=='拒绝'">拒绝</view>
					</view>
				</view>
				<view class="proposal-container-detail-content-box">
					<view class="info">
						<text>编号：{{data.code}}</text>
						<text>部门：{{data.deptName}}</text>
						<text>提案类别：{{data.typeName}}</text>
						<text>现状：{{data.state}}</text>
						<text>建议：{{data.proposal}}</text>
					</view>
					<view class="img">
						<image src="../../static/scenery-1.jpg" mode="aspectFill"></image>
						<image src="../../static/scenery-2.jpg" mode="aspectFill"></image>
						<image src="../../static/scenery-3.jpg" mode="aspectFill"></image>
						<!-- <image src="../../static/scenery-4.jpg" mode="aspectFill"></image> -->
					</view>
				</view>
			</view>
			<view :class="showBtn==0?'hide-margin':'proposal-container-detail-process'">
				<!-- <view class="proposal-container-detail-process-title">
					<text>验收进度</text>
				</view> -->
				<view class="proposal-container-detail-process-steps">
					<view class="process" v-for="item in processList" :key="item.id">
						<view class="process-icon">
							<uniIcon v-if="item.name=='拒绝'" type="clear" size="18" color="#FE6E69"></uniIcon>
							<uniIcon v-else-if="item.name=='撤销'" type="refresh-filled" size="18" color="#999"></uniIcon>
							<uniIcon v-else :type="item.name.indexOf('待')!=-1?'minus-filled':'checkbox-filled'" size="18" :color="item.name.indexOf('待')!==-1?'#FDB205':'#2DB755'"></uniIcon>
						</view>
						<view class="process-content">
							<view :class="item.name.indexOf('待')!=-1?'title-stand':'title-complete'">
								{{item.name}}
							</view>
							<view class="user-info">
								<view class="portrait">
									<image src="../../static/portrait-b.png" mode=""></image>
								</view>
								<view class="info">
									<text>{{item.sponsorName}}</text>
									<text v-if="item.name.indexOf('待')!=-1">已等待{{waitTime(processTime)}}</text>
									<text v-else>{{processTimeFormat(item.acceptTime)}}</text>
								</view>
							</view>
							<view class="content" v-if="item.content == null">
								<view>
									<text>{{contentFormat(item.content)}}</text>
								</view>
							</view>
							<view class="content" v-else-if="item.content.indexOf('<br/>') == -1">
								<view>
									<text class="steps-content">描述：{{contentFormat(item.content)}}</text>
								</view>
							</view>
							<view class="content" v-else>
								<view>
									<text class="steps-content" v-if="contentFormat(item.content).expense==''"></text>
									<text class="steps-content" v-else>预计投入：{{contentFormat(item.content).expense}} 元</text>
								</view>
								<view>
									<text class="steps-content" v-if="contentFormat(item.content).integral==''"></text>
									<text class="steps-content" v-else>奖励积分：{{contentFormat(item.content).integral}} 分</text>
								</view>
								<view>
									<text class="steps-content" v-if="contentFormat(item.content).finishTime==''"></text>
									<text class="steps-content" v-else>期望时间：{{contentFormat(item.content).finishTime}}</text>
								</view>
								<view>
									<text class="steps-content">描述：{{contentFormat(item.content).content}}</text>
								</view>
							</view>

						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="hide-footer" v-if="showBtn==0||showBtn==null"></view>
		<view class="footer" v-else>
			<view v-if="showBtn==1">
				<view class="btn">
					<button size="mini" class="check-btn" @click="initCheck">审核</button>
				</view>
				<view class="btn">
					<button size="mini" class="refuse-btn" @click="refuse">拒绝</button>
				</view>
			</view>
			<view v-else-if="showBtn==2">
				<view class="btn">
					<button size="mini" class="check-btn" @click="check">审核</button>
				</view>
				<view class="btn">
					<button size="mini" class="refuse-btn" @click="refuse">拒绝</button>
				</view>
				<view class="btn">
					<button size="mini" class="transfer-btn" @click="transfer">转移</button>
				</view>
			</view>
			<view v-else-if="showBtn==3">
				<view class="btn">
					<button size="mini" class="check-btn" @click="confirm">确认</button>
				</view>
				<view class="btn">
					<button size="mini" class="refuse-btn" @click="refuse">拒绝</button>
				</view>
			</view>
			<view v-else-if="showBtn==4">
				<view class="btn">
					<button size="mini" class="finish-btn" @click="finish"> 完成</button>
				</view>
				<view class="btn">
					<button size="mini" class="refuse-btn" @click="refuse">拒绝</button>
				</view>
			</view>
			<view v-else-if="showBtn==5">
				<view class="btn">
					<button size="mini" class="accept-btn" @click="accept">验收</button>
				</view>
				<view class="btn">
					<button size="mini" class="refuse-btn" @click="refuse">拒绝</button>
				</view>
			</view>
			<view v-else-if="showBtn==6">
				<view class="btn">
					<button size="mini" class="accept-btn" @click="modify">修改</button>
				</view>
				<view class="btn">
					<button size="mini" class="refuse-btn" @click="backout">撤销</button>
				</view>
			</view>
			<uni-popup ref="popup" type="bottom">
				<text @click="selectDepartment">支持部门</text>
				<text @click="selectMemeber">指定员工</text>
				<text @click="close">取消</text>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcon from "../../components/uni-icons/uni-icons.vue"
	// import uniSteps from '../../components/uni-steps/uni-steps.vue'
	import uniPopup from '../../components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniNavBar,
			uniIcon,
			// uniSteps,
			uniPopup
		},
		data() {
			return {
				proposalId: '',
				data: {},
				processList: [],
				checkStatus: '',
				processTime: '',
				processId: '',
				userId: '',
				flowId: '',
				departmentId: '',
				departmentName: '',
				showBtn: '',
				moduleFlagId: '',
				contentObj: {}
			}
		},
		onLoad(option) {
			this.token = uni.getStorageSync('token')
			this.proposalId = option.id
			this.moduleFlagId = option.moduleFlagId
			this.getData()
		},
		methods: {
			back() {
				if (this.moduleFlagId == 1) {
					uni.redirectTo({
						url: `../task-manage/task-manage?moduleFlagId=${this.moduleFlagId}`
					})
				} else if (this.moduleFlagId == 2) {
					uni.switchTab({
						url: `../task/task?moduleFlagId=${this.moduleFlagId}`
					})
				}
			},
			initCheck() {
				uni.redirectTo({
					url: `../initCheck/initCheck?proposalId=${this.proposalId}&processId=${this.processId}&userId=${this.userId}&flowId=${this.flowId}&moduleFlagId=${this.moduleFlagId}`
				})
			},
			check() {
				this.$refs.popup.open()
			},
			refuse() {
				uni.redirectTo({
					url: `../refuse/refuse?proposalId=${this.proposalId}&processId=${this.processId}&userId=${this.userId}&moduleFlagId=${this.moduleFlagId}`
				})
			},
			finish() {
				uni.redirectTo({
					url: `../finish/finish?proposalId=${this.proposalId}&processId=${this.processId}&userId=${this.userId}&flowId=${this.flowId}&moduleFlagId=${this.moduleFlagId}`
				})
			},
			accept() {
				uni.redirectTo({
					url: `../accept/accept?proposalId=${this.proposalId}&processId=${this.processId}&userId=${this.userId}&moduleFlagId=${this.moduleFlagId}`
				})
			},
			transfer() {
				uni.redirectTo({
					url: `../transfer/transfer?proposalId=${this.proposalId}&processId=${this.processId}&userId=${this.userId}&moduleFlagId=${this.moduleFlagId}`
				})
			},
			modify() {
				uni.redirectTo({
					url: `../modify/modify?proposalId=${this.proposalId}&moduleFlagId=${this.moduleFlagId}`
				})
			},
			backout() {
				uni.redirectTo({
					url: `../backout/backout?proposalId=${this.proposalId}&processId=${this.processId}&userId=${this.userId}&moduleFlagId=${this.moduleFlagId}`
				})
			},
			confirm() {
				uni.redirectTo({
					url: `../confirm/confirm?proposalId=${this.proposalId}&processId=${this.processId}&userId=${this.userId}&flowId=${this.flowId}&moduleFlagId=${this.moduleFlagId}`
				})
			},
			selectDepartment() {
				uni.redirectTo({
					url: `../checkDept/checkDept?proposalId=${this.proposalId}&processId=${this.processId}&userId=${this.userId}&flowId=${this.flowId}&moduleFlagId=${this.moduleFlagId}`
				})
			},
			selectMemeber() {
				uni.redirectTo({
					url: `../checkMember/checkMember?proposalId=${this.proposalId}&processId=${this.processId}&userId=${this.userId}&flowId=${this.flowId}&departmentId=${this.departmentId}&departmentName=${this.departmentName}&moduleFlagId=${this.moduleFlagId}`
				})
			},
			close() {
				this.$refs.popup.close()
			},
			getData() {
				uni.request({
					url: "/api/proposal/getProposal",
					data: {
						proposalId: this.proposalId
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
						console.log(res)
						this.data = res.data.obj
						this.departmentId = res.data.obj.deptId
						this.departmentName = res.data.obj.deptName
						this.showBtn = res.data.obj.status
					},
					fail: (error) => {
						console.log(error)
					}
				})
				//获取建议流程
				uni.request({
					url: `/api/flowProcess/list`,
					data: {
						worksId: this.proposalId,
						worksType: 1
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
						console.log(res)
						this.processList = res.data.obj
						this.checkStatus = this.processList[this.processList.length - 1].name
						this.processTime = this.processList[this.processList.length - 2].acceptTime
						this.processId = this.processList[this.processList.length - 1].id
						this.userId = this.processList[this.processList.length - 1].sponsorUserId
						this.flowId = this.processList[this.processList.length - 1].flowId
						// for(let i=0;i<this.processList.length;i++){
						// 	console.log(this.processList[i].content)
						// }
					},
					fail: (error) => {
						console.log(error)
					}
				})
			},
			processTimeFormat(time) {
				let date = new Date(time)
				let newTime =
					`${this.addZero(date.getMonth()+1)}月${this.addZero(date.getDate())}日  ${this.addZero(date.getHours())}:${this.addZero(date.getMinutes())}`
				return newTime
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
			//计算等待时间
			waitTime(startTime) {
				let date1 = new Date(startTime);
				let date2 = new Date();
				let date3 = date2.getTime() - date1.getTime();
				let days = Math.floor(date3 / (24 * 3600 * 1000));
				let leave1 = date3 % (24 * 3600 * 1000);
				let hours = Math.floor(leave1 / (3600 * 1000));
				let leave2 = leave1 % (3600 * 1000);
				let minutes = Math.floor(leave2 / (60 * 1000));
				let leave3 = leave2 % (60 * 1000);
				let seconds = Math.round(leave3 / 1000);
				if (days == 0) {
					return `${hours}小时${minutes}分钟${seconds}秒`
				}
				if (days == 0 && hours == 0) {
					return `${minutes}分钟${seconds}秒`
				}
				if (days == 0 && hours == 0 && minutes == 0) {
					return `${seconds}秒`
				}
				return `${days}天${hours}小时${minutes}分钟${seconds}秒`
			},
			contentFormat(str) {
				if (str == null) {
					return ''
				} else if (str.indexOf('<br/>') == -1) {
					return str
				} else {
					// return str.
					// console.log(str.match(new RegExp('<br/>', "g")))
					let indexArr = []
					for (let i = 0; i < str.length; i++) {
						if (str[i] == "<") {
							indexArr.push(i)
						}
					}
					if (indexArr.length == 0) {
						this.contentObj.content = str.slice(0, indexArr[0])
						this.contentObj.finishTime = ''
						this.contentObj.integral = ''
						this.contentObj.expense = ''
					} else if (indexArr.length == 1) {
						this.contentObj.content = str.slice(0, indexArr[0])
						this.contentObj.finishTime = str.slice(indexArr[0] + 12, indexArr[1])
						this.contentObj.integral = ''
						this.contentObj.expense = ''
					} else if (indexArr.length == 2) {
						this.contentObj.content = str.slice(0, indexArr[0])
						this.contentObj.finishTime = str.slice(indexArr[0] + 12, indexArr[1])
						this.contentObj.integral = str.slice(indexArr[2] + 12, str.length - 3)
						this.contentObj.expense = ''
					} else {
						this.contentObj.content = str.slice(0, indexArr[0])
						this.contentObj.finishTime = str.slice(indexArr[0] + 12, indexArr[1])
						this.contentObj.integral = str.slice(indexArr[2] + 12, str.length - 3)
						this.contentObj.expense = str.slice(indexArr[1] + 10, indexArr[2] - 2)
					}
					return this.contentObj
				}
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

					.status-complete {
						font-size: 28rpx;
						color: #35BA5B;
						background: #DBFFE6;
						padding: 2px 10px;
						border-radius: 5px;
					}

					.status-stand {
						font-size: 28rpx;
						color: #FDB205;
						background: #FFF1D1;
						padding: 1px 10px;
						border-radius: 5px;
					}

					.status-refuse {
						font-size: 28rpx;
						color: #FE6E69;
						background: #fbdfde;
						padding: 1px 10px;
						border-radius: 5px;
					}
				}
			}

			.proposal-container-detail-content-box {
				.info {
					margin-top: 20rpx;
					padding: 0 20rpx;

					text {
						display: block;
						font-size: 28rpx;
						color: #666;
						line-height: 42rpx;
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
		.hide-margin {
			background: #fff;
			margin-top: 10rpx;

			.proposal-container-detail-process-title {
				border-bottom: 1px solid #f2f2f2;

				text {
					display: inline-block;
					padding: 20rpx 30rpx;
					font-size: 32rpx;
					font-weight: 600;
					color: #999999;
				}

			}

			.proposal-container-detail-process-steps {
				padding: 20rpx 30rpx;

				.process {
					display: flex;
					margin-bottom: 6rpx;

					.process-icon {
						/deep/ .uni-icons {
							vertical-align: top;
						}
					}

					.transfer-icon {
						/deep/ .uni-icons {
							background: #539CF8;
							width: 36rpx;
							height: 36rpx;
							border-radius: 50%;
							padding: 4rpx;
							vertical-align: middle;
						}

					}

					.process-content {
						flex: 1;
						margin-left: 10rpx;
						padding-bottom: 6rpx;
						border-bottom: 1px solid #f2f2f2;

						.title {
							font-size: 28rpx;
							color: #999;
						}

						.title-complete {
							font-size: 28rpx;
							color: #2DB755;
						}

						.title-refuse {
							font-size: 28rpx;
							color: #FE6E69;
						}

						.title-transfer {
							font-size: 28rpx;
							color: #539CF8;
						}

						.title-stand {
							font-size: 28rpx;
							color: #FDB205;
						}

						.content {
							font-size: 24rpx;
							color: #999;

							// padding: 10rpx 0;
							.steps-content {
								color: #aaa;
							}
						}

						.user-info {
							display: flex;
							margin-top: 6rpx;

							.portrait {
								margin-right: 10rpx;

								image {
									width: 60rpx;
									height: 60rpx;
									border-radius: 10rpx;
									border: 1px solid #f2f2f2;
								}
							}

							.info {
								text {
									display: block;
									font-size: 24rpx;
									color: #999;
								}
							}
						}
					}

				}

			}
		}

		.proposal-container-detail-process {
			background: #fff;
			margin-top: 10rpx;
			margin-bottom: 100rpx;

			.proposal-container-detail-process-title {
				border-bottom: 1px solid #f2f2f2;

				text {
					display: inline-block;
					padding: 20rpx 30rpx;
					font-size: 32rpx;
					font-weight: 600;
					color: #999999;
				}

			}

			.proposal-container-detail-process-steps {
				padding: 20rpx 30rpx;

				.process {
					display: flex;
					margin-bottom: 6rpx;

					.process-icon {
						/deep/ .uni-icons {
							vertical-align: top;
						}
					}

					.transfer-icon {

						/deep/ .uni-icons {
							background: #539CF8;
							width: 36rpx;
							height: 36rpx;
							border-radius: 50%;
							padding: 4rpx;
							vertical-align: middle;
						}

					}

					.process-content {
						flex: 1;
						margin-left: 10rpx;
						padding-bottom: 6rpx;
						border-bottom: 1px solid #f2f2f2;

						.title {
							font-size: 28rpx;
							color: #999;
						}

						.title-complete {
							font-size: 28rpx;
							color: #2DB755;
						}

						.title-refuse {
							font-size: 28rpx;
							color: #FE6E69;
						}

						.title-transfer {
							font-size: 28rpx;
							color: #539CF8;
						}

						.title-stand {
							font-size: 28rpx;
							color: #FDB205;
						}

						.content {
							font-size: 20rpx;
							color: #999;
							// padding: 10rpx 0;
						}

						.user-info {
							display: flex;
							margin-top: 6rpx;

							.portrait {
								margin-right: 10rpx;

								image {
									width: 60rpx;
									height: 60rpx;
									border-radius: 10rpx;
									border: 1px solid #f2f2f2;
								}
							}

							.info {
								text {
									display: block;
									font-size: 24rpx;
									color: #999;
								}
							}
						}
					}

				}

			}
		}
	}

	.hide-footer {
		display: none;
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

		button {
			color: #fff;
		}

		.btn {
			width: 33%;
			height: 100%;
			text-align: center;
			display: inline-block;
		}

		.check-btn {
			background: #FDB205;
			// margin-right: 20rpx;
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

		/deep/ .uni-popup__wrapper-box {
			background: #fff;
			text-align: center;

			text {
				font-size: 28rpx;
				color: #666;
				display: block;
				line-height: 70rpx;
			}
		}
	}
</style>
