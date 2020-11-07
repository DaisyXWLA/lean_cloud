<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" color="#ffffff" title="企业公告" fixed>
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<!-- 列表 -->
		<view class="notice-list-empty" v-if="noticeList.length==0">
			暂无数据
		</view>
		<view class="notice-list" v-for="item in noticeList" :key="item.id">
			<view class="notice-list-container" @click="detail(item.id)">
				<view class="notice-list-container-content">
					<view class="title">{{item.title}}</view>
					<view class="content">
						{{item.content}}
					</view>
				</view>
				<view class="notice-list-container-detail">
					<text>{{item.createName}}</text>
					<text>{{timeFormat(item.createTime)}}</text>
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
				isRead:'',
				noticeList:[]
			}
		},
		onLoad(option) {
			this.token = uni.getStorageSync('token')
			this.isRead=option.isRead
			this.getData()
		},
		methods: {
			back () {
				uni.redirectTo({
					url:'../index/index'
				})
			},
			detail (id) {
				uni.redirectTo({
					url:`./notice-detail/notice-detail?reportId=${id}`
				})
			},
			//获取列表数据
			getData(){
				// console.log(this.isRead)
				uni.request({
					url: `/api/report/list`,
					data:{
						isRead:this.isRead
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
						// console.log(res)
						this.noticeList=res.data.obj.records
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
	.notice-list-empty{
		font-size: 40rpx;
		color: #C0C4CC;
		text-align: center;
		margin-top: 500rpx;
	}
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
					-webkit-line-clamp: 2;
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
