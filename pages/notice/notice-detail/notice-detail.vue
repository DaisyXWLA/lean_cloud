<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" color="#ffffff" title="公告详情" fixed>
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<view class="notice-detail-container">
			<view class="notice-detail-container-header">
				<text class="title">{{data.title}}</text>
				<view class="time">
					<text>{{data.createName}}</text>
					<text>{{timeFormat(data.createTime)}}</text>
				</view>
			</view>
			<view class="notice-detail-container-content">
				{{data.content}}
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "../../../components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcon from "../../../components/uni-icons/uni-icons.vue"
	export default {
		components:{uniNavBar,uniIcon},
		data() {
			return {
				reportId:'',
				data:{}
			}
		},
		onLoad(option) {
			this.token = uni.getStorageSync('token')
			this.reportId=option.reportId
			this.getData()
		},
		methods: {
			back () {
				uni.redirectTo({
					url:'../notice'
				})
			},
			getData(){
				uni.request({
					url: `/api/report/detail`,
					data:{
						reportId:this.reportId
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
						this.data=res.data.obj
						console.log(this.data)
					},
					fail: (error) => {
						console.log(error)
					}
				})
			},
			timeFormat(time){
				let date=new Date(time)
				let newTime=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}  ${date.getHours()}:${date.getMinutes()}`
				return newTime
			}
		}
	}
</script>

<style lang="scss" scoped>
	.notice-detail-container{
		background-color:#ffffff;
		margin-top:34rpx;
		.notice-detail-container-header{
			padding:30rpx;
			border-bottom:1px solid #f2f2f2;
			.title{
				font-size: 32rpx;
				color: #333;
			}
			.time{
				font-size:28rpx;
				color:#999;
				margin-top:20rpx;
				text{
					padding-right:20rpx;
				}
			}
		}
		.notice-detail-container-content{
			padding:30rpx;
			font-size:28rpx;
			line-height:42rpx;
			color:#666;
		}
	}
</style>
