<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" color="#ffffff" title="消息提醒" fixed>
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<!-- 列表 -->
		<view class="message-list">
			<view class="message-list-time"><text>10月26日 11:27</text></view>
			<view class="message-list-container" @click="detail">
				<view class="message-list-container-content">
					<view class="title">积分变动提醒</view>
					<view class="content">
						您的积分于2020-10-26 11:27发生变化
					</view>
				</view>
				<view class="message-list-container-detail">
					<text>详情</text>
					<uniIcon type="arrowright" size="16" color="#999999"></uniIcon>
				</view>
			</view>
		</view>
		<view class="message-list">
			<view class="message-list-time"><text>10月26日 11:27</text></view>
			<view class="message-list-container" @click="detail">
				<view class="message-list-container-content">
					<view class="title">积分变动提醒</view>
					<view class="content">
						您的积分于2020-10-26 11:27发生变化
					</view>
				</view>
				<view class="message-list-container-detail">
					<text>详情</text>
					<uniIcon type="arrowright" size="16" color="#999999"></uniIcon>
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
					url:'../index/index'
				})
			},
			detail () {
				uni.redirectTo({
					url:'../integral/integral'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.return{
		width: 40rpx;
	}
	.message-list{
		margin-top:34rpx;
		padding: 0 30rpx;
		.message-list-time{
			text-align: center;
			text{
				background-color: #E8E8E8;
				border-radius:30rpx;
				font-size: 24rpx;
				color: #999;
				padding: 8rpx 20rpx;
			}
		}
		.message-list-container{
			margin: 24rpx 0;
			background-color: #ffffff;
			border-radius: 10rpx;
			.message-list-container-content{
				padding:30rpx;
				line-height:50rpx;
				.title{
					font-size:32rpx;
					font-weight:600;
				}
				.content{
					font-size:28rpx;
					color:#999999;
				}
			}
			.message-list-container-detail{
				padding:10rpx 30rpx;
				background:#F6FAFF;
				border-bottom-left-radius: 10rpx;
				border-bottom-right-radius:10rpx;
				font-size:28rpx;
				color:#999999;
				display:flex;
				justify-content: space-between;
				.icon{
					color:#999999;
				}
			}
		}
	}
</style>
