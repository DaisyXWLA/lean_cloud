<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" :right-text="moduleId==0?'新增':''" color="#ffffff" :title="departmentName" fixed @clickRight="addMember">
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
			<uniList  v-else v-for="item in memberList" :key="item.id">
				<uniListItem :title="item.realname" clickable @click="selectMember"></uniListItem>
			</uniList>
		</view>
		<!-- <uni-swipe-action>
			<uni-swipe-action-item :right-options="operateOption" :show="isOpened" :auto-close="false" @click="deleteMember">
				<view class="content-box">
					<text class="content-text">使用变量控制SwipeAction的开启状态</text>
				</view>
			</uni-swipe-action-item>
		</uni-swipe-action> -->
	</view>
</template>

<script>
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcon from "../../components/uni-icons/uni-icons.vue"
	import uniSearchBar from '../../components/uni-search-bar/uni-search-bar.vue'
	import uniList from "../../components/uni-list/uni-list.vue"
	import uniListItem from '../../components/uni-list-item/uni-list-item.vue'
	import uniSwipeAction from '../../components/uni-swipe-action/uni-swipe-action'
	import uniSwipeActionItem from '../../components/uni-swipe-action-item/uni-swipe-action-item'
	export default {
		components: {
			uniNavBar,
			uniIcon,
			uniSearchBar,
			uniList,
			uniListItem,
			uniSwipeAction,
			uniSwipeActionItem
		},
		data() {
			return {
				moduleId: '',
				departmentId:'',
				departmentName:'',
				memberList:[],
				deptId:'',
				operateOption:[
					{
						text:'取消',
						style:{
							backgroundColor:'#FDB205',
							color:'#fff'
						}
					},
					{
						text:'删除',
						style:{
							backgroundColor:'#FE6E69',
							color:'#fff'
						}
					}
				],
				isOpened:'none'
			}
		},
		onLoad(option) {
			this.token = uni.getStorageSync('token')
			this.moduleId = option.moduleId
			this.departmentId=option.departmentId
			this.departmentName=option.departmentName
			this.deptId=option.deptId
			this.getData()
		},
		methods: {
			getData() {
				if(this.departmentId==undefined){
					this.departmentId=this.deptId
				}
				uni.request({
					url: `/api/user/getListByDept`,
					data:{
						deptId:this.departmentId
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
						// console.log(res)
						this.memberList=res.data.obj
					},
					fail: (error) => {
						console.log(error)
					}
				})
			},
			addMember(){
				uni.redirectTo({
					url:`../staff-add/staff-add?deptId=${this.departmentId}&deptName=${this.departmentName}`
				})
			},
			back() {
				if (this.moduleId == 0) {
					uni.redirectTo({
						url: "../staff-manage/staff-manage"
					})
				} else if (this.moduleId == 1) {
					uni.redirectTo({
						url: "../member"
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
			deleteMember(){
				
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
		margin-top: 20rpx;

		/deep/ .uni-list--border-top {
			height: 0;
		}
		/deep/ .uni-list--border-bottom{
			background: #f2f2f2;
		}
	}
</style>
