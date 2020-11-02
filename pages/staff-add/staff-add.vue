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
			<view class="section">
				<text>账号</text>
				<input focus placeholder="请输入账号" placeholder-style="color:#BBC0D4;font-size:28rpx"/>
			</view>
			<view class="section">
				<text>工号</text>
				<input focus placeholder="请输入工号" placeholder-style="color:#BBC0D4;font-size:28rpx"/>
			</view>
			<view class="section">
				<text>姓名</text>
				<input focus placeholder="请输入姓名" placeholder-style="color:#BBC0D4;font-size:28rpx"/>
			</view>
			<view class="section">
				<text>手机</text>
				<input focus placeholder="请输入手机号" placeholder-style="color:#BBC0D4;font-size:28rpx"/>
			</view>
			<view class="section">
				<text>身份证</text>
				<input focus placeholder="请输入身份证号" placeholder-style="color:#BBC0D4;font-size:28rpx"/>
			</view>
			<view class="section">
				<text>邮箱</text>
				<input focus placeholder="请输入邮箱" placeholder-style="color:#BBC0D4;font-size:28rpx"/>
			</view>
			<view class="section">
				<text>部门</text>
				<input focus placeholder="请输入部门" placeholder-style="color:#BBC0D4;font-size:28rpx"/>
			</view>
			<view class="section">
				<text>职务</text>
				<input focus placeholder="请输入部门" placeholder-style="color:#BBC0D4;font-size:28rpx"/>
			</view>
			<view class="section">
				<text>上级用户</text>
				<input focus placeholder="请输入部门" placeholder-style="color:#BBC0D4;font-size:28rpx"/>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcon from "../../components/uni-icons/uni-icons.vue"
	export default {
		components: {
			uniNavBar,
			uniIcon
		},
		data() {
			return {
				
			}
		},
		methods: {
			back(){
				uni.redirectTo({
					url:"../staff-manage/staff-manage"
				})
			},
			addConfirm(){
				console.log('提交新增员工')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.staff-list{
		margin-top: 20rpx;
		background: #fff;
		padding:0 30rpx;
		.section{
			padding: 24rpx 0;
			border-bottom: 1px solid #f2f2f2;
			display: flex;
			text{
				font-size: 28rpx;
				color: #333;
				font-weight: bold;
			}
			input{
				flex: 1;
				text-align: right;
			}
		}
	}
</style>
