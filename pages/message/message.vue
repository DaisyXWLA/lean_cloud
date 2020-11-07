<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" color="#ffffff" title="消息提醒" fixed>
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<!-- 列表 -->
		<view class="message-list-empty" v-if="messageList.length==0">
			暂无数据
		</view>
		<view class="message-list" v-else v-for="item in messageList" :key="item.id">
			<view class="message-list-time"><text>{{timeFormat(item.createTime)}}</text></view>
			<view class="message-list-container" @click="detail">
				<view class="message-list-container-content">
					<view class="title">{{item.title}}</view>
					<view class="content">
						{{item.content}}
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
				isRead:'',
				messageList:[]
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
			detail () {
				uni.navigateTo({
					url:'../integral/integral?integralId=1'
				})
			},
			//获取列表数据
			getData(){
				// console.log(this.isRead)
				uni.request({
					url: `/api/news/list`,
					data:{
						isRead:this.isRead
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
						this.messageList=res.data.obj.records
					},
					fail: (error) => {
						console.log(error)
					}
				})
			},
			timeFormat(time){
				let date=new Date(time)
				let newTime=`${date.getMonth()+1}月${date.getDate()}日  ${date.getHours()}:${date.getMinutes()}`
				return newTime
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.return{
		width: 40rpx;
	}
	.message-list-empty{
		font-size: 40rpx;
		color: #C0C4CC;
		text-align: center;
		margin-top: 500rpx;
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
					color: #333;
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
