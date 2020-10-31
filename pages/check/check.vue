<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" color="#ffffff" title="审核" right-text="确定" fixed @clickRight="checkConfirm">
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<view class="check-container">
			<view class="check-container-radio">
				<text class="check-container-radio-title">支持部门/指派员工</text>
				<radio-group @change="radioChange">
					<label>
						<radio value="0" color="#007aff" :checked="true" /><text class="name">支持部门</text>
					</label>
					<label>
						<radio value="1" color="#007aff" /><text class="name">指派员工</text>
					</label>
				</radio-group>
			</view>
			<view class="check-container-select" v-if="current==0 ? !selected:selected">
				<view class="title">
					<text class="title-name">支持部门</text>
					<uniIcon type="plus-filled" size="26" color="#007aff" @click="selectDepartment"></uniIcon>
				</view>
				<view class="list" v-if="display">
					<label class="tag" @click="removeDepartment">
						<text>{{departmentName}}</text>
						<uni-icons type="closeempty" size="20" color="#BEC2D5"></uni-icons>
					</label>
				</view>
			</view>
			<view class="check-container-select" v-if="current==1 ? !selected:selected">
				<view class="title">
					<text class="title-name">指派员工</text>
					<uniIcon type="plus-filled" size="26" color="#007aff" @click="selectMember"></uniIcon>
				</view>
				<view class="list" v-if="display">
					<label class="tag" @click="removeMember">
						<text>{{memberName}}</text>
						<uni-icons type="closeempty" size="20" color="#BEC2D5"></uni-icons>
					</label>
				</view>
			</view>
			<view class="check-container-time">
				<uniList>
					<uniListItem title="期望时间" :rightText="time.length==0?'请选择期望时间':time" link clickable @click="selectTime"></uniListItem>
				</uniList>
				<uniCalendar ref="calendar" :insert="false" :lunar="true" :start-date="'2000-1-1'" :end-date="'2050-1-1'" @confirm="confirmTime" />
			</view>
			<view class="check-container-remark">
				<text>备注</text>
				<textarea placeholder-style="color:#BCC1D4;font-size:28rpx" placeholder="请输入备注信息" />
				</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcon from "../../components/uni-icons/uni-icons.vue"
	import uniList from "../../components/uni-list/uni-list.vue"
	import uniListItem from '../../components/uni-list-item/uni-list-item.vue'
	import uniCalendar from '../../components/uni-calendar/uni-calendar.vue'
	export default {
		components: {
			uniNavBar,
			uniIcon,
			uniList,
			uniListItem,
			uniCalendar
		},
		data() {
			return {
				items: [{
					value: '0',
					name: '支持部门',
					checked: 'true'
				}, {
					value: '1',
					name: '指派人员'
				}],
				current: 0,
				departmentName: '',
				memberName: '',
				display: false,
				selected: false,
				time:''
			}
		},
		onLoad(option) {
			console.log(option.departmentName)
			if(this.current == 0){
				if (option.departmentName == undefined) {
					return
				}
				this.departmentName = option.departmentName;
				this.display = true
			}else{
				if (option.memberName == undefined) {
					return
				}
				this.memberName = option.memberName;
				this.display = true
			}
			
		},
		methods: {
			back() {
				uni.redirectTo({
					url: "../proposal-detail/proposal-detail"
				})
			},
			checkConfirm () {
				console.log('审核通过')
			},
			radioChange(e) {
				// console.log(e)
				this.current = e.detail.value;
				console.log(this.current)
			},
			selectDepartment() {
				uni.redirectTo({
					url: "../department/department"
				})
			},
			removeDepartment() {
				console.log('点击删除')
				this.display = false
			},
			selectMember() {
				uni.redirectTo({
					url: "../member/member"
				})
			},
			removeMember() {
				console.log('点击删除')
				this.display = false
			},
			selectTime () {
				this.$refs.calendar.open();
			},
			//日历事件
			confirmTime (e) {
				// console.log(e)
				this.time = e.fulldate;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.check-container {
		margin-top: 20rpx;
		.check-container-radio {
			background: #fff;
			padding: 30rpx;
			.check-container-radio-title {
				font-size: 32rpx;
				color: #333;
				font-weight: bold;
			}
			radio-group {
				display: flex;
				margin-top: 20rpx;
				padding: 20rpx 0;
				label {
					flex: 1;
				}
				radio{
					transform: scale(0.8);
				}
				.name{
					font-size:32rpx;
					color: #666;
				}
			}
		}
		.check-container-select {
			background: #fff;
			padding: 30rpx;
			margin-top: 20rpx;
			.title {
				display: flex;
				justify-content: space-between;

				.title-name {
					font-size: 32rpx;
					color: #333;
					font-weight: bold;
				}
			}
			.list {
				padding: 20rpx 0;

				.tag {
					background: #eee;
					padding: 10rpx 20rpx;
					box-sizing: border-box;
					border-radius: 30rpx;
				}
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
				font-size: 32rpx;
				color: #333;
				font-weight: bold;
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
				cont-size:32rpx;
				color: #333;
				font-weight: bold;
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
