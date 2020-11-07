<template>
	<view>
		<uniNavBar :status-bar="true" background-color="#4378BE" color="#ffffff" right-text="确定" title="个人资料" @clickLeft="back"
		 @clickRight="update">
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<view class="personal-portrait">
			<uniList>
				<uniListItem title="头像">
					<template slot="footer">
						<image src="../../static/portrait-a.png" mode="aspectFit" @click="modifyPortrait"></image>
					</template>
				</uniListItem>
			</uniList>
			<uni-popup ref="popup" type="bottom">
				<text @click="selectPhoto">相册</text>
				<text @click="selectCamera">相机</text>
				<text @click="close">取消</text>
			</uni-popup>
		</view>
		<view class="personal-info">
			<uniList>
				<uniListItem title="员工姓名">
					<template slot="footer">
						<input placeholder="请输入员工姓名" :value="userName" @blur="changeUserName" />
					</template>
				</uniListItem>
				<uniListItem title="手机号">
					<template slot="footer">
						<input placeholder="请输入手机号" :value="phone" @blur="changePhone" />
					</template>
				</uniListItem>
				<uniListItem title="员工工号">
					<template slot="footer">
						<input placeholder="请输入员工工号" :value="jobNumber" @blur="changeJobNumber" />
					</template>
				</uniListItem>
				<uniListItem title="登录账号">
					<template slot="footer">
						<input placeholder="请输入登录账号" :value="account" @blur="changeAccount" />
					</template>
				</uniListItem>
				<uniListItem title="所属部门" :rightText="departmentName==null?'请选择所属部门':departmentName" clickable @click="selectDepartment">
				</uniListItem>
				<uniListItem title="职务" :rightText="dutyName==null?'请选择职务':dutyName" clickable @click="selectDuty">
				</uniListItem>
				<uniListItem title="上级用户" :rightText="leaderName==null?'请选择上级用户':leaderName" clickable @click="selectLeader">
				</uniListItem>
			</uniList>
		</view>
		<!-- <uniPopup ref="popup" type="message">
			<uni-popup-dialog type="info" title="提示" content="确定修改用户信息？" :before-close="true" @confirm="confirm" @close="close"></uni-popup-dialog>
		</uniPopup> -->
	</view>
</template>

<script>
	// 导航
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcon from "../../components/uni-icons/uni-icons.vue"
	import uniList from "../../components/uni-list/uni-list.vue"
	import uniListItem from '../../components/uni-list-item/uni-list-item.vue'

	// import uniPopup from '../../components/uni-popup/uni-popup.vue'
	// import uniPopupMessage from '../../components/uni-popup/uni-popup-message.vue'
	// import uniPopupDialog from '../../components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			uniNavBar,
			uniIcon,
			uniList,
			uniListItem,
			// uniPopup,
			// uniPopupMessage,
			// uniPopupDialog
		},
		data() {
			return {
				data: {},
				userId: '',
				userName: '',
				phone: '',
				dutyId: '',
				dutyName: '',
				jobNumber: '',
				account: '',
				departmentId: '',
				departmentName: '',
				account: '',
				leaderName: '',
				leaderId: ''
			};
		},
		onLoad(option) {
			// console.log(option)
			this.token = uni.getStorageSync('token')
			this.departmentId = option.departmentId
			this.departmentName = option.departmentName
			this.dutyId = option.dutyId
			this.dutyName = option.dutyName
			this.getData()
		},
		onShow() {
			// console.log(this.dutyId)
		},
		methods: {
			back() {
				uni.redirectTo({
					url: '../index/index'
				})
			},
			update() {
				// this.$refs.popup.open()
				uni.request({
					url: `/api/user/saveOrUpdateUser`,
					data: {
						account: this.account,
						realname: this.userName,
						phone: this.phone,
						deptId: this.departmentId,
						postId: this.dutyId,
						job: this.jobNumber,
						pid: this.leaderId,
						userId: this.userId
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
						if (res.data.status == 'SUCCESS') {
							uni.showToast({
								icon: 'success',
								title: '用户信息修改成功！'
							});
						}
					},
					fail: (error) => {
						console.log(error)
					}
				})
			},
			// confirm(){},
			// close(){},
			modifyPortrait() {
				this.$refs.popup.open()
			},
			selectPhoto() {
				uni.chooseImage({
					sourceType: ['album'],
					success: function(res) {
						console.log(res);
					},
					fail: function(err) {
						console.log(err)
					}
				});
			},
			selectCamera() {
				uni.chooseImage({
					sourceType: ['camera'],
					success: function(res) {
						console.log(res);
					},
					fail: function(err) {
						console.log(err)
					}
				});
			},
			close() {
				this.$refs.popup.close()
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
			getData() {
				// 系统消息
				uni.request({
					url: `/api/user/getUserDetail`,
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
						// console.log(res)
						this.userId = res.data.obj.id
						this.departmentName = res.data.obj.deptName
						this.userName = res.data.obj.realname
						this.phone = res.data.obj.phone
						this.jobNumber = res.data.obj.job
						this.account = res.data.obj.account
						this.dutyName = res.data.obj.postName
						this.leaderName = res.data.obj.pName
						this.departmentId = res.data.obj.deptId
						this.dutyId = res.data.obj.postId
					},
					fail: (error) => {
						console.log(error)
					}
				})
			},
			changeUserName(e) {
				this.userName = e.detail.value
			},
			changePhone(e) {
				this.phone = e.detail.value
			},
			changeJobNumber(e) {
				this.jobNumber = e.detail.value
			},
			changeAccount(e) {
				this.account = e.detail.value
			}

		}
	}
</script>

<style lang="scss" scoped>
	.personal-portrait {
		image {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			border: 1px solid #f2f2f2;
			vertical-align: middle;
		}

		/deep/ .uni-list-item__content-title {
			line-height: 80rpx;
			color: #666;
		}

		/deep/ .uni-list--border-top {
			height: 0;
		}

		/deep/ .uni-list--border-bottom {
			height: 0;
		}

		/deep/ .uni-popup__wrapper-box {
			background: #fff;
			text-align: center;

			text {
				font-size: 28rpx;
				color: #666;
				display: block;
				line-height: 70rpx;
			}
		}
	}

	/deep/ .uni-input-placeholder {
		color: #ddd;
	}

	.personal-info {
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

		input {
			text-align: right;
			font-size: 24rpx;
			color: #999;
		}
	}
</style>
