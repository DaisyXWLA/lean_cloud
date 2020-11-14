<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" :right-text="moduleId==0?'新增':''" color="#ffffff" :title="departmentName"
		 fixed @clickRight="addMember">
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<view class="member-search">
			<uniSearchBar placeholder="请输入人员姓名" radius="20" bgColor="#fff" @confirm="search"></uniSearchBar>
		</view>
		<view class="member-list">
			<uniList v-if="moduleId==0" v-for="item in memberList" :key="item.id">
				<uniListItem :title="item.realname"></uniListItem>
			</uniList>
			<uniList v-else v-for="item in memberList" :key="item.id">
				<uniListItem :title="item.realname" clickable @click="selectMember"></uniListItem>
			</uniList>
		</view>
		<!-- <markSlideList :list="memberList" :button="buttonList" :border="true" @click="clickMethod" @change="changeMethod"></markSlideList> -->
	</view>
</template>

<script>
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcon from "../../components/uni-icons/uni-icons.vue"
	import uniSearchBar from '../../components/uni-search-bar/uni-search-bar.vue'
	import uniList from "../../components/uni-list/uni-list.vue"
	import uniListItem from '../../components/uni-list-item/uni-list-item.vue'
	import markSlideList from '../../components/mark-slide-list/mark-slide-list.vue'
	export default {
		components: {
			uniNavBar,
			uniIcon,
			uniSearchBar,
			uniList,
			uniListItem,
			markSlideList
		},
		data() {
			return {
				moduleId: '',
				departmentId: '',
				departmentName: '',
				memberList: [],
				depId: '',
				proposalId: '',
				dpId: '',
				buttonList: [{
						title: '取消',
						background: '#c4c7cd'
					},
					{
						title: '删除',
						background: '#ff3b32'
					}
				]
			}
		},
		onLoad(option) {
			this.token = uni.getStorageSync('token')
			this.moduleId = option.moduleId
			this.departmentId = option.departmentId
			this.departmentName = option.departmentName
			this.deptId = option.deptId
			this.proposalId = option.proposalId
			this.dpId = option.dpId
			this.getData()
		},
		methods: {
			getData() {
				if (this.departmentId == undefined) {
					this.departmentId = this.deptId
				} 
				if(this.departmentId == undefined&&this.deptId==undefined){
					this.departmentId=this.dpId
				}
				uni.request({
					url: "/api/user/getListByDept",
					data: {
						deptId: this.departmentId
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
						console.log(res)
						this.memberList = res.data.obj
						// this.memberList = res.data.obj.map((item, index) => {
						// 	return Object.assign({}, {
						// 		id: item.id,
						// 		title: item.realname,
						// 		slide_x: 0
						// 	})
						// })
					},
					fail: (error) => {
						console.log(error)
					}
				})
			},
			addMember() {
				uni.redirectTo({
					url: `../staff-add/staff-add?deptId=${this.departmentId}&deptName=${this.departmentName}`
				})
			},
			back() {
				if (this.moduleId == 0) {
					uni.redirectTo({
						url: "../staff-manage/staff-manage"
					})
				} else if (this.moduleId == 1) {
					uni.redirectTo({
						url: "../member/member"
					})
				} else if (this.moduleId == 2) {
					uni.redirectTo({
						url: `../checkMember/checkMember?proposalId=${this.proposalId}`
					})
				}

			},
			search() {
				console.log('点击了搜索')
			},
			selectMember() {
				uni.redirectTo({
					url: "../checkMember?memberName=Julie"
				})
			},
			changeMethod(data, button, index) {
				console.log('滑动按钮回调', data)
				console.log('滑动按钮回调', button)
			},
			clickMethod(data) {
				console.log('点击行回调', data)
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .uni-navbar--border {
		border: none;
	}

	.member-search {
		background: #4378BE;

		/deep/ .uni-searchbar {
			background: none;
		}

		/deep/ .uni-searchbar__cancel {
			color: #fff;
		}
	}

	.member-list {
		/deep/ .uni-list--border-top {
			height: 0;
		}

		/deep/ .uni-list--border-bottom {
			background: #f2f2f2;
		}
	}
</style>
