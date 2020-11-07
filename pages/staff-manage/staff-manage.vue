<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" color="#ffffff" title="员工管理" fixed>
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<view class="staff-search">
			<uniSearchBar placeholder="请输入部门名称" radius="20" bgColor="#fff" @confirm="search"></uniSearchBar>
		</view>
		<view class="department-list">
			<uniList v-for="item in departmentList" :key="item.id">
				<uniListItem :title="item.name" showArrow clickable @click="selectMember(item.id,item.name)"></uniListItem>
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
				departmentList: []
			}
		},
		onLoad() {
			this.token = uni.getStorageSync('token')
			this.getData()
		},
		methods: {
			getData() {
				uni.request({
					url: `/api/dept/list`,
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
						// console.log(res)
						this.departmentList = res.data.obj
					},
					fail: (error) => {
						console.log(error)
					}
				})
			},
			back() {
				uni.redirectTo({
					url: "../index/index"
				})
			},
			search() {
				console.log('点击了搜索')
			},
			selectMember(id,name) {
				uni.redirectTo({
					url: `../member-list/member-list?moduleId=0&departmentId=${id}&departmentName=${name}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .uni-navbar--border {
		border: none;
	}

	.staff-search {
		background: #4378BE;

		/deep/ .uni-searchbar {
			background: none;
		}

		/deep/ .uni-searchbar__cancel {
			color: #fff;
		}
	}

	.department-list {
		margin-top: 20rpx;

		/deep/ .uni-list--border-top {
			height: 0;
		}
		/deep/ .uni-list--border-bottom{
			background: #f2f2f2;
		}
	}
</style>
