<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" color="#ffffff" title="部门" fixed>
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<view class="department-search">
			<uniSearchBar placeholder="请输入部门名称" radius="20" bgColor="#fff" @confirm="search"></uniSearchBar>
		</view>

		<view class="department-list">
			<uniList v-for="item in departmentList" :key="item.id">
				<uniListItem :title="item.name" showArrow clickable @click="selectDepartment(item.name,item.id)"></uniListItem>
			</uniList>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "../../../components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcon from "../../../components/uni-icons/uni-icons.vue"
	import uniSearchBar from '../../../components/uni-search-bar/uni-search-bar.vue'
	import uniList from "../../../components/uni-list/uni-list.vue"
	import uniListItem from '../../../components/uni-list-item/uni-list-item.vue'
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
				departmentList: []
			}
		},
		onLoad(option) {
			this.token = uni.getStorageSync('token')
			this.moduleId = option.moduleId
			this.getData()
		},
		methods: {
			back() {
				if (this.moduleId == 1) {
					uni.navigateBack({
						url: "../../personal/personal"
					})
				} else if (this.moduleId == 2) {
					uni.redirectTo({
						url: "../checkDept"
					})
				}
			},
			search() {
				console.log('点击了搜索')
			},
			selectDepartment(name, id) {
				if (this.moduleId == 1) {
					// uni.navigateBack({
					// 	url: `../../personal/personal?departmentName=${name}&departmentId=${id}`
					// })
					var pages = getCurrentPages();
					var prevPage = pages[pages.length - 2]; //上一个页面
					prevPage.$vm.departmentName = name
					prevPage.$vm.departmentId = id
					uni.navigateBack({}) //返回
				} else if (this.moduleId == 2) {
					uni.redirectTo({
						url: `../checkDept?departmentName=${name}`
					})
				}

			},
			getData() {
				uni.request({
					url: `/api/dept/list`,
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
						this.departmentList = res.data.obj
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

	.department-search {
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

		/deep/ .uni-list--border-bottom {
			background: #f2f2f2;
		}
	}
</style>
