<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" color="#ffffff" title="协助" right-text="确定" fixed @clickRight="checkConfirm">
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<view class="check-container">
			<view class="check-container-department">
				<uniList>
					<!-- <uniListItem title="支持部门" :rightText="department.length==0?'请选择部门':department" link clickable @click="selectDepartment"></uniListItem> -->
					<uniListItem title="支持部门" :rightText="departmentName==null?'请选择所属部门':departmentName" link clickable @click="selectDepartment"></uniListItem>
				</uniList>
			</view>
			<view class="check-container-time">
				<uniList>
					<uniListItem title="期望时间" :rightText="time.length==0?'请选择期望时间':time" link clickable @click="selectTime"></uniListItem>
				</uniList>
				<!-- <uniCalendar ref="calendar" :insert="false" :lunar="true" :start-date="'2000-1-1'" :end-date="'2050-1-1'" @confirm="confirmTime" /> -->
				 <DateTimePicker ref='dateTime' type='datetime' :startYear='2000' :endYear='2030' @change='confirmTime'></DateTimePicker>
			</view>
			<view class="check-container-remark">
				<text>备注</text>
				<textarea placeholder-style="color:#BCC1D4;font-size:28rpx" placeholder="请输入备注信息" :value="content" @blur="getContent" />
				</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcon from "../../components/uni-icons/uni-icons.vue"
	import uniList from "../../components/uni-list/uni-list.vue"
	import uniListItem from '../../components/uni-list-item/uni-list-item.vue'
	// import uniCalendar from '../../components/uni-calendar/uni-calendar.vue'
	import DateTimePicker from '../../components/bory-dateTimePicker/bory-dateTimePicker.vue'
	export default {
		components: {
			uniNavBar,
			uniIcon,
			uniList,
			uniListItem,
			// uniCalendar,
			DateTimePicker
		},
		data() {
			return {
				proposalId:'',
				departmentName: '',
				departmentId:'',
				leaderId:'',
				time:'',
				processId:'',
				userId:'',
				flowId:'',
				content:'',
				moduleFlagId:''
			}
		},
		onLoad(option) {
			this.token = uni.getStorageSync('token')
			this.proposalId=option.proposalId
			this.processId=option.processId
			this.userId=option.userId
			this.flowId=option.flowId
			this.moduleFlagId=option.moduleFlagId
		},
		methods: {
			back() {
				uni.redirectTo({
					url: `../my-proposal/my-proposal?id=${this.proposalId}&moduleFlagId=${this.moduleFlagId}`
				})
			},
			checkConfirm () {
				uni.request({
					url: "/api/flowProcess/addFlowProcess",
					data: {
						proposalId: this.proposalId,
						prevFlowProcessId:this.processId,
						prevSponsorUserId:this.userId,
						flowId:this.flowId,
						buttonType:3,
						content:this.content,
						endTime:this.time,
						acceptUserId:this.leaderId
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
						console.log(res)
						if(res.data.status=='SUCCESS'){
							uni.showToast({
								icon: 'success',
								title: '同意协助！'
							});
							this.back()
						}
					},
					fail: (error) => {
						console.log(error)
					}
				})
			},
			selectDepartment() {
				uni.navigateTo({
					url: `../department/department?proposalId=${this.proposalId}&moduleId=2&moduleFlagId=${this.moduleFlagId}`
				})
			},
			selectTime () {
				this.$refs.dateTime.show();
			},
			//日历事件
			confirmTime (e) {
				// console.log(e)
				this.time = e
			},
			getContent(e){
				this.content=e.detail.value
			}
		}
	}
</script>

<style lang="scss" scoped>
	.check-container {
		margin-top: 20rpx;
		.check-container-department{
			margin-top: 20rpx;
			/deep/ .uni-list--border-top{
				height: 0;
			}
			/deep/ .uni-list--border-bottom{
				height: 0;
			}
			/deep/ .uni-list-item__content-title{
				font-size: 28rpx;
				color: #333;
			}
			/deep/ .uni-list-item__extra-text{
				font-size: 28rpx;
			}
		}
		.check-container-time{
			margin-top: 20rpx;
			/deep/ .uni-list--border-top{
				height: 0;
			}
			/deep/ .uni-list--border-bottom{
				height: 0;
			}
			/deep/ .uni-list-item__content-title{
				font-size: 28rpx;
				color: #333;
			}
			/deep/ .uni-list-item__extra-text{
				font-size: 28rpx;
			}
		}
		.check-container-remark{
			margin-top: 20rpx;
			background: #fff;
			padding: 30rpx 0;
			box-sizing: border-box;
			text{
				padding:0 30rpx;
				font-size:28rpx;
				color: #333;
				box-sizing: border-box;
			}
			textarea{
				padding: 30rpx;
				/deep/ .uni-textarea-textarea{
					font-size: 28rpx;
					color: #333;
				}
			}
		}
	}
</style>
