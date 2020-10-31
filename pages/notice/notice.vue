<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" color="#ffffff" title="企业公告" fixed>
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<!-- 列表 -->
		<view class="notice-list">
			<view class="notice-list-container" @click="detail">
				<view class="notice-list-container-content">
					<view class="title">美空军轰炸机现身台湾东南海域</view>
					<view class="content">
						“飞机守望”24日晚间在推特上发布消息称，“美国空军B-1B轰炸机HUGE01和HUGE02从关岛安德森空军基地出发前往南海。美国空军（加油机）KC-135R PEARL11提供了加油机支持。”此外该推特还发布了有关飞行路线图，但并未提及此次行动时间。
					</view>
				</view>
				<view class="notice-list-container-detail">
					<text>Andy</text>
					<text>2020-10-26 14:25</text>
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
					url:'./notice-detail/notice-detail'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.notice-list{
		margin-top:34rpx;
		padding: 0 30rpx;
		.notice-list-container{
			margin: 24rpx 0;
			background-color: #ffffff;
			border-radius: 10rpx;
			.notice-list-container-content{
				padding:30rpx;
				.title{
					font-size:32rpx;
					color: #333;
					padding-bottom:20rpx;
				}
				.content{
					font-size:28rpx;
					color:#999999;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
					overflow: hidden;
				}
			}
			.notice-list-container-detail{
				padding:10rpx 30rpx;
				background:#F6FAFF;
				border-bottom-left-radius: 10rpx;
				border-bottom-right-radius:10rpx;
				font-size:28rpx;
				color:#999999;
				display:flex;
				text{
					padding-right:20rpx;
				}
			}
		}
	}
</style>
