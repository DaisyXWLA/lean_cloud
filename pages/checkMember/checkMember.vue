<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" color="#ffffff" title="指定人员" right-text="确定" fixed
		 @clickRight="checkConfirm">
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<view class="check-container">
			<view class="check-container-department">
				<uniList>
					<!-- <uniListItem title="指定人员" :rightText="member.length==0?'请选择人员':member" link clickable @click="selectMember"></uniListItem> -->
					<uniListItem title="指定人员" :rightText="memberName==null?'请选择指派人员':memberName" link clickable @click="selectMember"></uniListItem>
				</uniList>
			</view>
			<view class="check-container-integral">
				<uniList>
					<uniListItem title="奖励积分">
						<template slot="footer">
							<input type="number" placeholder="请输入积分" :value="bonusPoints" @blur="getBonusPoints" />
						</template>
					</uniListItem>
				</uniList>
			</view>
			<view class="check-container-expenditure">
				<uniListItem title="预计投入(元)">
					<template slot="footer">
						<input type="number" placeholder="请输入预计投入金额" :value="expenditure" @blur="getExpenditure" />
					</template>
				</uniListItem>
			</view>
			<view class="check-container-time">
				<uniList>
					<uniListItem :class="time.length==0?'placeholder':'default'" title="期望时间" :rightText="time.length==0?'请选择期望时间':time"
					 link clickable @click="selectTime"></uniListItem>
				</uniList>
				<!-- <uniCalendar ref="calendar" :insert="false" :lunar="true" :start-date="'2000-1-1'" :end-date="'2050-1-1'" @confirm="confirmTime" /> -->
				 <DateTimePicker ref='dateTime' type='datetime' :startYear='2000' :endYear='2030' @change='confirmTime'></DateTimePicker>
			</view>
			<view class="check-container-remark">
				<text>描述</text>
				<textarea placeholder-style="color:#BCC1D4;font-size:28rpx" placeholder="请输入描述内容" :value="content" @blur="getContent" />
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
				memberName: '',
				memberId:'',
				time:'',
				content:'',
				proposalId:'',
				processId:'',
				userId:'',
				flowId:'',
				departmentId:'',
				departmentName:'',
				moduleFlagId:'',
				bonusPoints:'',
				expenditure:''
			}
		},
		onLoad(option) {
			// console.log(option.processId)
			this.token = uni.getStorageSync('token')
			this.proposalId=option.proposalId
			this.processId=option.processId
			this.userId=option.userId
			this.departmentId=option.departmentId
			this.departmentName=option.departmentName
			this.flowId=option.flowId
			this.moduleFlagId=option.moduleFlagId
			// console.log(this.departmentId)
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
						buttonType:2,
						content:this.content,
						endTime:this.time,
						point:this.bonusPoints,
						cost:this.expenditure,
						acceptUserId:this.memberId
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
						if(res.data.status=='SUCCESS'){
							uni.showToast({
								icon: 'success',
								title: '同意！'
							});
							this.back()
						}
					},
					fail: (error) => {
						console.log(error)
					}
				})
			},
			selectMember() {
				uni.navigateTo({
					url: `../check-member-list/check-member-list?departmentId=${this.departmentId}&proposalId=${this.proposalId}&departmentName=${this.departmentName}&moduleId=2&moduleFlagId=${this.moduleFlagId}`
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
			},
			getBonusPoints(e){
				this.bonusPoints=e.detail.value
			},
			getExpenditure(e){
				this.expenditure=e.detail.value
			}
		}
	}
</script>

<style lang="scss" scoped>
	.check-container {
		margin-top: 10rpx;
		.check-container-department{
			margin-bottom: 10rpx;
			/deep/ .uni-list--border-top{
				height: 0;
			}
			/deep/ .uni-list--border-bottom{
				height: 0;
			}
			/deep/ .uni-list-item__content-title{
				font-size: 32rpx;
				color: #333;
			}
			/deep/ .uni-list-item__extra-text{
				font-size: 28rpx;
			}
		}
		.check-container-integral,.check-container-expenditure{
			margin-bottom: 10rpx;
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
				color: #666;
			}
		}
		.check-container-time{
			.placeholder{
				/deep/ .uni-list-item__extra-text{
					font-size: 28rpx;
					color: ddd;
				}
			}	
			.default{
				/deep/ .uni-list-item__extra-text{
					font-size: 28rpx;
					color: #666;
				}
			}
			/deep/ .uni-list--border-top{
				height: 0;
			}
			/deep/ .uni-list--border-bottom{
				height: 0;
			}
			/deep/ .uni-list-item__content-title{
				font-size: 32rpx;
				color: #333;
			}
			
		}
		.check-container-remark{
			margin-top: 10rpx;
			background: #fff;
			padding: 30rpx 0;
			box-sizing: border-box;
			text{
				padding:0 30rpx;
				cont-size:32rpx;
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
