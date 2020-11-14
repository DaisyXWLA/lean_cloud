<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" color="#ffffff" title="上级用户列表" fixed>
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<view class="leader-search">
			<uniSearchBar placeholder="请输入用户名称" radius="20" bgColor="#fff" @confirm="search"></uniSearchBar>
		</view>
		<view class="leader-list">
			<uniList v-for="item in leaderList" :key="item.id">
				<uniListItem :title="item.realname" clickable @click="selectDuty(item.realname,item.id)"></uniListItem>
			</uniList>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcon from "../../components/uni-icons/uni-icons.vue"
	import uniSearchBar from '../../components/uni-search-bar/uni-search-bar.vue'
	import uniList from "../../components/uni-list/uni-list.vue"
	import uniListItem from '../../components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniNavBar,
			uniIcon,
			uniSearchBar,
			uniList,
			uniListItem
		},
		data() {
			return {
				moduleId: '',
				leaderList: [],
				dutyId: ''
			}
		},
		onLoad(option) {
			this.token = uni.getStorageSync('token')
			// console.log(option)
			this.dutyId = option.dutyId
			this.moduleId = option.moduleId
			this.getData()
		},
		methods: {
			back() {
				uni.navigateBack({
					url: "../personal/personal"
				})
			},
			search() {
				console.log('点击了搜索')
			},
			selectDuty(name, id) {
				// uni.navigateBack({
				// 	url: `../personal/personal?leaderName=${name}&leaderId=${id}`
				// })
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2]; //上一个页面
				prevPage.$vm.leaderName = name
				prevPage.$vm.leaderId = id
				uni.navigateBack({}) //返回
			},
			//获取人员列表数据
			getData() {
				console.log(this.dutyId)
				uni.request({
					url: "/api/user/getPidByPostId",
					data: {
						postId: this.dutyId
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
						console.log(res)
						this.leaderList=res.data.obj
					},
					fail: (error) => {
						console.log(error)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .uni-navbar--border {
		border: none;
	}

	.leader-search {
		background: #4378BE;

		/deep/ .uni-searchbar {
			background: none;
		}

		/deep/ .uni-searchbar__cancel {
			color: #fff;
		}
	}

	.leader-list {
		margin-top: 20rpx;

		/deep/ .uni-list--border-top {
			height: 0;
		}

		/deep/ .uni-list--border-bottom {
			background: #f2f2f2;
		}
	}
</style>
