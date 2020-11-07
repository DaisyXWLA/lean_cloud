<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" color="#ffffff" title="合理化建议" fixed @clickRight="filtrate">
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
			<template slot="right">
				<image class="select" src="../../static/icon/select@2x.png" mode="widthFix"></image>
			</template>
		</uniNavBar>
		<view class="proposal-container" v-for="item in proposalList" :key="item.id">
			<view @click="proposalDetail(item.id)">
				<view class="proposal-container-header">
					<view class="portrait">
						<image src="../../static/portrait.png" mode="aspectFit"></image>
					</view>
					<view class="info">
						<view class="title">{{item.title}}</view>
						<view class="name-time">
							<text class="name">{{item.realName}}</text>
							<text class="time">{{timeFormat(item.createTime)}}</text>
						</view>
					</view>
					<view class="status" v-if="item.status==0">待审核</view>
				</view>
				<view class="proposal-container-content">
					<view class="proposal-container-content-box">
						<view class="section">
							<text class="txt">现状：</text>
							<text class="content">{{item.state}}</text>
						</view>
						<view class="section">
							<text class="txt">建议：</text>
							<text class="content">{{item.proposal}}</text>
						</view>
					</view>
					<view class="img">
						<image src="../../static/scenery-1.jpg" mode="aspectFill"></image>
						<image src="../../static/scenery-2.jpg" mode="aspectFill"></image>
						<image src="../../static/scenery-3.jpg" mode="aspectFill"></image>
						<!-- <image src="../../static/scenery-4.jpg" mode="aspectFill"></image> -->
					</view>
				</view>
			</view>
			<view class="proposal-container-footer">
				<view class="content">
					<view class="icon" @click="viewComments(item.id)">
						<image src="../../static/icon/note@2x.png" mode=""></image>
						<text>留言（{{item.messageCount}}）</text>
					</view>
					<view class="icon" @click="changeLike(item.id,item.isLike)">
						<view :class="item.isLike&&likeSelected?'selected':''">
							<image :src="item.isLike&&likeSelected?likeIcon:dislikeIcon" mode="aspectFill"></image>
							<text>点赞（{{likeCount}}）</text>
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
	import uniList from "../../components/uni-list/uni-list.vue"
	import uniListItem from "../../components/uni-list-item/uni-list-item.vue"
	export default {
		components: {
			uniNavBar,
			uniIcon,
			uniList,
			uniListItem
		},
		data() {
			return {
				likeSelected: true,
				proposalList: [],
				likeIcon: '../../static/icon/like-selected@2x.png',
				dislikeIcon: '../../static/icon/like@2x.png',
				likeType: '',
				ids:[],
				likeDatas:[],
				likeCount:''
			}
		},
		onLoad() {
			this.token = uni.getStorageSync('token')
			this.getData()
		},
		methods: {
			back() {
				uni.redirectTo({
					url: "../index/index"
				})
			},
			filtrate() {
				uni.redirectTo({
					url: "../search/search"
				})
			},
			viewComments(id) {
				uni.redirectTo({
					url: `../proposal-detail/proposal-detail?flag=1&proposalId=${id}`
				})
			},
			changeLike(id, isLike) {
				this.likeSelected = !this.likeSelected
				if (this.likeSelected) {
					this.likeType = 1
				} else {
					this.likeType = 0
				}
				uni.request({
					url: `/api/like/toLike`,
					data: {
						worksId: id,
						worksType: 1,
						likeType: this.likeType
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
						// console.log(res)
						if(this.likeSelected){
							this.likeCount++
						}else{
							this.likeCount--
						}
					},
					fail: (error) => {
						console.log(error)
					}
				})
			},
			proposalDetail(id) {
				uni.redirectTo({
					url: `../proposal-detail/proposal-detail?proposalId=${id}`
				})
			},
			getData() {
				if (this.isLike) {
					this.likeType = 1
				} else {
					this.likeType = 0
				}
				uni.request({
					url: `/api/proposal/list`,
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
						console.log(res)
						let likeNumber=''//缓存中点赞数
						let number=''//总点赞数
						this.proposalList = res.data.obj.records
						for(let i=0;i<res.data.obj.records.length;i++){
							this.ids.push(res.data.obj.records[i].id)
							this.likeCount=res.data.obj.records[i].likeCount
						}
						this.getAllLike()
						// console.log(this.likeDatas)
						// for(let i=0;i<this.likeDatas.length;i++){
						// 	// likeNumber=this.likeDatas[i].number
						// 	for(let j=0;j<res.data.obj.records.length;j++){
						// 		res.data.obj.records[j].likeCount+=this.likeDatas[i].number
						// 	}
						// }
					},
					fail: (error) => {
						console.log(error)
					}
				})
			},
			//获取列表数据的点赞数与状态
			getAllLike(){
				uni.request({
					url: `/api/like/getLikeToIndex`,
					data:{
						ids:this.ids.join(','),
						worksType:1
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
						// console.log(res)
						let likeObj={}
						for(let i=0;i<res.data.obj.length;i++){
							likeObj.status=res.data.obj[i].substr(0,res.data.obj[i].indexOf('::'))
							likeObj.number=res.data.obj[i].substr(res.data.obj[i].lastIndexOf('::')+2)
							this.likeDatas.push(likeObj)
						}
					},
					fail: (error) => {
						console.log(error)
					}
				})
			},
			timeFormat(time) {
				let date = new Date(time)
				let newTime = `${this.addZero(date.getMonth()+1)}月${this.addZero(date.getDate())}日  ${this.addZero(date.getHours())}:${this.addZero(date.getMinutes())}`
				return newTime
			},
			//时间补零
			addZero(time) {
				return time < 10 ? `0${time}` : time
			}
		}
	}
</script>

<style lang="scss" scoped>
	.select {
		width: 44rpx;
	}

	.proposal-container {
		background: #fff;
		margin-bottom: 20rpx;

		.proposal-container-header {
			display: flex;
			align-items: center;
			padding: 30rpx;
			border-bottom: 1px solid #f2f2f2;

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
				flex: 1;

				.title {
					font-size: 32rpx;
					color: #333;
				}

				.name-time {
					font-size: 28rpx;
					color: #999;

					.name {
						padding-right: 20rpx;
					}
				}
			}

			.status {
				font-size: 28rpx;
				color: #FDB205;
				background: #FFF1D1;
				padding: 2px 10px;
				border-radius: 5px;
				height: 40rpx;

			}
		}

		.proposal-container-content {
			padding: 30rpx;

			.proposal-container-content-box {
				// background: #f8f8f8;
				border-radius: 10rpx;
				padding: 8rpx 20rpx;
				margin-bottom: 20rpx;
			}

			.section {
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				// margin-bottom: 10rpx;
				line-height: 42rpx;

				.txt {
					color: #333;
					font-size: 28rpx;
				}

				.content {
					color: #888;
					font-size: 28rpx;
				}
			}

			.img {
				display: flex;
				justify-content: space-around;

				image {
					width: 180rpx;
					height: 180rpx;
					border-radius: 10rpx;
					border: 1px solid #f2f2f2;
				}
			}
		}

		.proposal-container-footer {
			border-top: 1px solid #f2f2f2;

			.content {
				padding: 10rpx 30rpx;
				display: flex;
				justify-content: space-around;

				.icon {
					image {
						width: 48rpx;
						height: 48rpx;
						vertical-align: middle;
					}

					text {
						font-size: 24rpx;
						color: #BBC0D4;
						vertical-align: middle;
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
