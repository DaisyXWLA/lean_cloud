<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" color="#ffffff" title="任务提醒" fixed>
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<!-- 列表 -->
		<view class="task-list">
			<view class="task-list-time"><text>10月26日 11:27</text></view>
			<view class="task-list-container" @click="detail">
				<view class="task-list-container-header">
					<view class="task-list-container-header-tag">合理化建议</view>
					<view class="task-list-container-header-content">
						<view class="title">对施工现场油污处理的建议</view>
						<view class="proposer">
							<text>Julie</text>
							<text class="status">处理中</text>
						</view>
					</view>
				</view>
				<view class="task-list-container-content">
					<view class="section">
						<text class="content">施工现场对一项项目工程来说，是工程建设的起点，也是工程建设最为直接的场所。所有施工人员运用相关技术手段，结合人力物力以及财力完成某项工程的场地。而施工现场管理是工程项目管理的关键部分，只有加强施工现场管理，才能保证工程质量、降低成本、缩短工期，提高建筑企业在市场中的竞争力，对建筑企业生存和发展起着重要作用。</text>
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
		components:{uniNavBar,uniIcon},
		data() {
			return {
			}
		},
		methods: {
			back () {
				uni.redirectTo({
					url:"../index/index"
				})
			},
			detail () {
				uni.redirectTo({
					url:"../my-proposal/my-proposal"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.task-list{
		margin-top:34rpx;
		padding: 0 30rpx;
		.task-list-time{
			text-align: center;
			text{
				background-color: #E8E8E8;
				border-radius:30rpx;
				font-size: 24rpx;
				color: #999;
				padding: 8rpx 20rpx;
			}
		}
		.task-list-container{
			margin: 24rpx 0;
			background-color: #ffffff;
			border-radius: 10rpx;
			.task-list-container-header{
				border-bottom:1px solid #f2f2f2;
				.task-list-container-header-tag{
					background:linear-gradient(-45deg, transparent 380rpx, #2DB755 0) bottom right;
					color:#fff;
					border-top-left-radius:10rpx;
					border-top-right-radius:10rpx;
					padding:4rpx 20rpx;
					box-sizing:border-box;
					font-size:24rpx;
				}
				.task-list-container-header-content{
					padding:10rpx 30rpx 20rpx;
					.title{
						font-size:32rpx;
						font-weight:600;
						padding-bottom:10rpx;
					}
					.proposer{
						font-size:28rpx;
						color:#999999;
						display:flex;
						justify-content:space-between;
						.status{
							color:#35BA5B;
							background:#DBFFE6;
							padding:4rpx 20rpx;
							border-radius:10rpx;
						}
					}
				}
			}
			.task-list-container-content{
				padding:20rpx 30rpx;
				font-size:28rpx;
				.section{
					background:#f8f8f8;
					border-radius:10rpx;
					padding:8rpx 20rpx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					margin-bottom:10rpx;
					line-height:42rpx;
					.content{
						color:#666;
					}
				}
			}
		}
	}
</style>
