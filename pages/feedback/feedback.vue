<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" right-text="确定" color="#ffffff" title="意见反馈" fixed @clickRight="confirm">
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<view class="feedback">
			<textarea placeholder-style="color:#BCC1D4;font-size:28rpx" placeholder="请输入反馈意见" :value="content" @blur="getContent"/>
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
				content:''
			}
		},
		onLoad() {
			this.token = uni.getStorageSync('token')
		},
		methods: {
			back(){
				uni.redirectTo({
					url: '../index/index'
				})
			},
			getContent(e){
				this.content=e.detail.value
			},
			confirm(){
				uni.request({
					url:"/api/opinion/addOpinion",
					data:{
						content:this.content
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
						if (res.data.status == 'SUCCESS') {
							uni.showToast({
								icon: 'success',
								title: '反馈意见提交成功！'
							});
						}
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
	.feedback{
		background: #fff;
		padding: 30rpx;
		textarea{
			font-size: 28rpx;
			color: #333;
		}
	}
</style>
