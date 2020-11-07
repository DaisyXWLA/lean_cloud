<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" right-text="确定" color="#ffffff" title="新增员工" fixed
		 @clickRight="addConfirm">
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<view class="staff-list">
			<uniList>
				<uniListItem title="账号">
					<template slot="footer">
						<input placeholder="请输入账号" :value="account" @blur="getAccount" />
					</template>
				</uniListItem>
				<uniListItem title="工号">
					<template slot="footer">
						<input placeholder="请输入工号" :value="jobNumber" @blur="getJobNumber" />
					</template>
				</uniListItem>
				<uniListItem title="姓名">
					<template slot="footer">
						<input placeholder="请输入姓名" :value="userName" @blur="getUserName" />
					</template>
				</uniListItem>
				<uniListItem title="手机">
					<template slot="footer">
						<input placeholder="请输入手机号" :value="phoneNumber" @blur="getPhoneNumber" />
					</template>
				</uniListItem>
				<uniListItem title="身份证">
					<template slot="footer">
						<input placeholder="请输入身份证号" :value="IDNumber" @blur="getIDNumber" />
					</template>
				</uniListItem>
				<uniListItem title="邮箱">
					<template slot="footer">
						<input placeholder="请输入邮箱" :value="mail" @blur="getMail" />
					</template>
				</uniListItem>
				<uniListItem :class="departmentName.length=='0'?'placeholder':'default'" title="所属部门" :rightText="departmentName.length=='0'?'请选择所属部门':departmentName"
				 clickable @click="selectDepartment">
				</uniListItem>
				<uniListItem :class="dutyName.length=='0'?'placeholder':'default'" title="职务" :rightText="dutyName.length=='0'?'请选择职务':dutyName" clickable @click="selectDuty">
				</uniListItem>
				<uniListItem :class="leaderName.length=='0'?'placeholder':'default'" title="上级用户" :rightText="leaderName.length=='0'?'请选择上级用户':leaderName" clickable @click="selectLeader">
				</uniListItem>
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
				deptId: '',
				deptName: '',
				account: '',
				jobNumber: '',
				userName: '',
				phoneNumber: '',
				IDNumber: '',
				mail: '',
				departmentName: '',
				departmentId: '',
				dutyName: '',
				dutyId: '',
				leaderName: '',
				leaderId: ''
			}
		},
		onLoad(option) {
			this.token = uni.getStorageSync('token')
			this.deptId = option.deptId
			this.deptName = option.deptName
		},
		methods: {
			back() {
				uni.redirectTo({
					url: `../member-list/member-list?moduleId=0&deptId=${this.deptId}&departmentName=${this.deptName}`
				})
			},
			addConfirm() {
				console.log('添加用户')
				uni.request({
					url: `/api/user/saveOrUpdateUser`,
					data: {
						account: this.account,
						job: this.jobNumber,
						realname: this.userName,
						phone: this.phoneNumber,
						number: this.IDnumber,
						email: this.mail,
						deptId: this.departmentId,
						postId: this.dutyId,
						pid: this.leaderId
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
						if (res.data.status == 'SUCCESS') {
							uni.showToast({
								icon: 'success',
								title: '新增用户成功！'
							});
						}
					},
					fail: (error) => {
						console.log(error)
					}
				})
			},
			getAccount(e) {
				this.account = e.detail.value
			},
			getJobNumber(e) {
				this.jobNumber = e.detail.value
			},
			getUserName(e) {
				this.userName = e.detail.value
			},
			getPhoneNumber(e) {
				this.phoneNumber = e.detail.value
			},
			getIDNumber(e) {
				this.IDNumber = e.detail.value
			},
			getMail(e) {
				this.mail = e.detail.value
			},
			//选择部门
			selectDepartment() {
				uni.navigateTo({
					url: '../checkDept/department/department?moduleId=1'
				})
			},
			//选择职务
			selectDuty() {
				uni.navigateTo({
					url: '../duty/duty?moduleId=1'
				})
			},
			//选择上级用户
			selectLeader() {
				uni.navigateTo({
					url: `../leader/leader?dutyId=${this.dutyId}`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.staff-list {
		margin-top: 20rpx;

		/deep/ .uni-list--border-top {
			height: 0;
		}

		/deep/ .uni-list--border-bottom {
			height: 0;
		}

		/deep/ .uni-list--border:after {
			background: #f2f2f2;
		}

		/deep/ .uni-input-placeholder {
			color: #ddd;
		}

		.placeholder {
			/deep/ .uni-list-item__extra-text {
				color: #ddd;
			}
		}

		.default {
			/deep/ .uni-list-item__extra-text {
				color: #999;
			}
		}


		input {
			text-align: right;
			font-size: 24rpx;
			color: #999;
		}
	}
</style>
