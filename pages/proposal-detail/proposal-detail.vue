<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" color="#ffffff" title="建议详情" fixed>
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
						<view class="status" v-if="data.auditStatus==0">审核未通过</view>
						<view class="status" v-else-if="data.auditStatus==1">审核中</view>
						<view class="status" v-else-if="data.auditStatus==2">落实中</view>
						<view class="status" v-else-if="data.auditStatus==3">已完成</view>
						<!-- <view class="status-stand" v-if="checkStatus=='待审核'">待审核</view>
						<view class="status-stand" v-if="checkStatus=='协助部门待审核'">协助部门待审核</view>
						<view class="status-complete" v-if="checkStatus=='协助部门审核通过'">协助部门审核通过</view>
						<view class="status-complete" v-else-if="checkStatus=='审核通过'">审核通过</view>
						<view class="status-stand" v-else-if="checkStatus=='待落实'">待落实</view>
						<view class="status-complete" v-else-if="checkStatus=='已落实'">已落实</view>
						<view class="status-stand" v-else-if="checkStatus=='待验收'">待验收</view>
						<view class="status-complete" v-else-if="checkStatus=='完成验收'">完成验收</view>
						<view class="status-refuse" v-else-if="checkStatus=='拒绝'">拒绝</view> -->
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
				<view class="proposal-container-detail-process-steps">
					<view class="process" v-for="item in processList" :key="item.id">
						<view class="process-icon">
							<uniIcon v-if="item.name=='拒绝'" type="clear" size="18" color="#FE6E69"></uniIcon>
							<uniIcon v-else-if="item.name=='撤销'" type="refresh-filled" size="18" color="#999"></uniIcon>
							<uniIcon v-else :type="item.name.indexOf('待')!=-1?'minus-filled':'checkbox-filled'" size="18" :color="item.name.indexOf('待')==0?'#FDB205':'#2DB755'"></uniIcon>
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
									<text v-else>{{item.acceptTime}}</text>
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
			<view class="proposal-container-detail-comment-empty" v-if="commentList.length==0">
				<view class="proposal-container-detail-comment-empty-title">
					<text>评价列表</text>
				</view>
				<view class="proposal-container-detail-comment-empty-content">
					暂无数据
				</view>
			</view>
			<view class="proposal-container-detail-comment" id="commentList" v-else>
				<view class="proposal-container-detail-comment-title">
					<text>评价列表</text>
				</view>
				<view class="proposal-container-detail-comment-list" v-for="item in commentList" :key="item.id">
					<view class="proposal-container-detail-comment-list-content">
						<view class="header">
							<view class="portrait">
								<image src="../../static/portrait.png" mode="aspectFit"></image>
							</view>
							<view class="info">
								<text>{{item.realName}}</text>
								<text>{{timeFormat(item.createTime)}}</text>
							</view>
						</view>
						<view class="content">
							<text>{{item.content}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="footer">
				<view class="content">
					<view class="icon" @click="viewComments">
						<image src="../../static/icon/note@2x.png" mode=""></image>
						<text>留言</text>
					</view>
					<view class="icon" @click="changeLike">
						<view class="uncheck" v-show="likeSelected">
							<image src="../../static/icon/like@2x.png" mode="aspectFill"></image>
							<text>点赞</text>
						</view>
						<view class="selected" v-show="!likeSelected">
							<image src="../../static/icon/like-selected@2x.png" mode="aspectFill"></image>
							<text>点赞</text>
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
	import uniSteps from '../../components/uni-steps/uni-steps.vue'
	export default {
		components: {
			uniNavBar,
			uniIcon,
			uniSteps
		},
		data() {
			return {
				likeSelected: true,
				proposalId: '',
				data: {},
				processList: [],
				checkStatus: '',
				processTime: '',
				commentList: [],
				moduleId: '',
				contentObj: {}
			}
		},
		onLoad(option) {
			this.token = uni.getStorageSync('token')
			this.proposalId = option.proposalId
			this.moduleId = option.moduleId
			this.getData()
			if (option.flag == 1) {
				setTimeout(function() {
					uni.createSelectorQuery().select("#commentList").boundingClientRect(function(res) {
						console.log(res)
						uni.pageScrollTo({
							scrollTop: res.top,
							duration: 100
						});
					}).exec()
				})
			}
		},
		methods: {
			getData() {
				//获取建议详情内容
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
						console.log(res.data.obj)
						this.processList = res.data.obj
						this.checkStatus = this.processList[this.processList.length - 1].name
						this.processTime = this.processList[this.processList.length - 2].acceptTime

					},
					fail: (error) => {
						console.log(error)
					}
				})
				//获取评论列表
				uni.request({
					url: `/api/message/getMessage`,
					data: {
						proposalId: this.proposalId
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
						// console.log(res)
						this.commentList = res.data.obj.records

					},
					fail: (error) => {
						console.log(error)
					}
				})
			},
			back() {
				console.log('建议详情返回')
				if (this.moduleId == 4) {
					uni.switchTab({
						url: `../proposal/proposal?moduleId=${this.moduleId}`
					})
				} else if (this.moduleId == 5) {
					uni.switchTab({
						url: `../idea/idea?moduleId=${this.moduleId}`
					})
				}
			},
			changeLike() {
				this.likeSelected = !this.likeSelected
			},
			viewComments() {
				uni.redirectTo({
					url: `../comment/comment?proposalId=${this.proposalId}&moduleId=${this.moduleId}`
				})
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
				let date1 = new Date(startTime); //开始时间
				let date2 = new Date(); //结束时间
				let date3 = date2.getTime() - date1.getTime(); //时间差的毫秒数

				//计算出相差天数
				let days = Math.floor(date3 / (24 * 3600 * 1000));
				//计算出小时数
				let leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
				let hours = Math.floor(leave1 / (3600 * 1000));
				//计算相差分钟数
				let leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
				let minutes = Math.floor(leave2 / (60 * 1000));

				//计算相差秒数
				let leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
				let seconds = Math.round(leave3 / 1000);
				if (days == 0) {
					return `${hours}小时${minutes}分钟${seconds}秒`
				} else {
					return `${days}天${hours}小时${minutes}分钟${seconds}秒`
				}
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

		.proposal-container-detail-progress {
			background: #fff;
			margin-top: 20rpx;
			padding: 20rpx 0 30rpx;
			// margin-bottom: 100rpx;
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

		.proposal-container-detail-comment-empty {
			margin-top: 10rpx;
			margin-bottom: 100rpx;

			.proposal-container-detail-comment-empty-title {
				border-bottom: 1px solid #f2f2f2;
				background: #fff;
				text {
					display: inline-block;
					padding: 20rpx 30rpx;
					font-size: 28rpx;
					color: #999;
				}
			}

			.proposal-container-detail-comment-empty-content {
				font-size: 32rpx;
				color: #C0C4CC;
				text-align: center;
				margin-top: 20rpx;
			}
		}
		.proposal-container-detail-comment {
			background: #fff;
			margin-top: 20rpx;
			margin-bottom: 100rpx;

			.proposal-container-detail-comment-title {
				border-bottom: 1px solid #f2f2f2;

				text {
					display: inline-block;
					padding: 20rpx 30rpx;
					font-size: 28rpx;
					color: #999999;
				}
			}

			.proposal-container-detail-comment-list {
				padding: 30rpx;
				padding-bottom: 0;

				.proposal-container-detail-comment-list-content {
					border-bottom: 1px solid #f2f2f2;

					.header {
						display: flex;

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
							padding: 10rpx 0;

							text {
								display: block;
								font-size: 28rpx;
								color: #999;
							}
						}

					}

					.content {
						text {
							font-size: 28rpx;
							color: #666;
						}

						padding-bottom:30rpx;
					}
				}

			}
		}

		.footer {
			padding: 10rpx 30rpx;
			box-sizing: border-box;
			width: 100%;
			height: 100rpx;
			background: #fff;
			position: fixed;
			bottom: 0;
			border-top: 1px solid rgba(0, 0, 0, 0.1);

			.content {
				display: flex;
				justify-content: space-around;
				align-items: center;

				.icon {
					image {
						width: 40rpx;
						height: 40rpx;
					}

					text {
						display: block;
						font-size: 24rpx;
						color: #BBC0D4;
					}

					.selected {
						text {
							color: #4378BE;
						}
					}
				}
			}
		}
	}
</style>
