<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" color="#ffffff" title="我的积分" fixed>
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<view class="integral-container">
			<view class="integral-container-header">
				<text class="available-integral">{{existingIntegral==null?'0':existingIntegral}}</text>
				<text class="all-integral">累计积分：{{aggregateScore==null?'0':aggregateScore}}</text>
			</view>
		</view>
		<view class="integral-list-empty" v-if="integralList.length==0">
			暂无数据
		</view>
		<view class="integral-content" v-else>
			<view class="integral-content-title">
				<text>时间</text>
				<text>明细</text>
			</view>
			<uniList v-for="item in integralList" :key="item.id">
				<uni-list-item title="采纳建议" :note="timeFormat(item.createTime)" :rightText="item.pointChange.toString()" />
			</uniList>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcon from "../../components/uni-icons/uni-icons.vue"
	import uniList from "../../components/uni-list/uni-list.vue"
	import uniListItem from '../../components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniNavBar,
			uniIcon,
			uniList,
			uniListItem
		},
		data() {
			return {
				integralId: '',
				integralList: [],
				aggregateScore:'', //总积分
				existingIntegral:'',//现有积分
			};
		},
		onLoad(option) {
			// console.log(option)
			this.token = uni.getStorageSync('token')
			this.integralId = option.integralId
			this.getData()
		},
		methods: {
			back() {
				if (this.integralId == 0) {
					uni.redirectTo({
						url: "../index/index"
					})
				} else if (this.integralId == 1) {
					uni.navigateBack({
						url: "../message/message"
					})
				}

			},
			//获取数据
			getData() {
				uni.request({
					url: "/api/pointDetail/list",
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
						console.log(res)
						this.aggregateScore=res.data.obj.allpoint //总积分
						this.existingIntegral=res.data.obj.point
						this.integralList = res.data.obj.jyyPage.records
					},
					fail: (error) => {
						console.log(error)
					}
				})
			},
			timeFormat(time) {
				let date = new Date(time)
				let newTime = `${date.getMonth()+1}月${date.getDate()}日  ${date.getHours()}:${date.getMinutes()}`
				return newTime
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .uni-navbar--border {
		border: none;
	}
	/deep/ .uni-list--border-bottom{
		height: 0;
	}
	/deep/ .uni-list--border-top{
		background:#f2f2f2
	}
	/deep/ .uni-list-item__container{
		padding: 14rpx 30rpx;
	}
	.integral-container {
		.integral-container-header {
			padding: 60rpx 0;
			background: #4378BE;
			color: #fff;
			text-align: center;

			text {
				display: block;
			}

			.available-integral {
				font-size: 80rpx;
				margin-bottom: 10rpx;
			}

			.all-integral {
				font-size: 28rpx;
				color: rgba($color: #fff, $alpha: 0.8);
			}
		}
	}

	.integral-list-empty {
		font-size: 40rpx;
		color: #C0C4CC;
		text-align: center;
		margin-top: 300rpx;
	}

	.integral-content {
		background: #fff;
		margin-top: 10rpx;

		.integral-content-title {
			padding: 30rpx;
			display: flex;
			justify-content: space-between;

			text {
				font-size: 28rpx;
				color: #999;
			}

		}

		/deep/ .uni-list-item__content-title {
			font-size: 28rpx;
			color: #333;
		}

		/deep/ .uni-list-item__extra-text {
			font-size: 32rpx;
			color: #4378BE;
		}
	}
</style>
