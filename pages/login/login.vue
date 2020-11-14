<template>
	<view class="login">
		<view class="login-container">
			<view class="login-container-top">
				<view class="login-container-pic">
					<image src="../../static/icon/login-bg.png"></image>
				</view>
				<view class="login-remind" @click="getAddress">
					<image src="../../static/icon/remind.png"></image>
				</view>
			</view>
			<view class="login-container-content">
				<view class="content">
					<view class="username account">
						<image src="../../static/icon/personal@2x.png" mode="aspectFit"></image>
						<input focus placeholder="请输入账号" placeholder-style="color:#BBC0D4;font-size:32rpx" :value="username" @blur="inputUsername" />
					</view>
					<view class="password  account">
						<image src="../../static/icon/password@2x.png" mode="aspectFit"></image>
						<input focus password placeholder="请输入密码" placeholder-style="color:#BBC0D4;font-size:32rpx" :value="password"
						 @blur="inputPassword" />
					</view>
				</view>
				<view class="button">
					<button :loading="loading" @click="login">登录</button>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				username: '',
				password: ''
			}
		},
		onLoad() {
			uni.showToast({
				icon: 'none',
				title: uni.getStorageSync('address')
			})
		},
		methods: {
			inputUsername(e) {
				this.username = e.detail.value
			},
			inputPassword(e) {
				this.password = e.detail.value
			},
			login() {
				if (this.username.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入用户名'
					});
					return;
				}
				if (this.password.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入密码'
					});
					return;
				}
				uni.request({
					url: "/api/login/userLogin",
					data: {
						account: this.username,
						password: this.password
					},
					success: (res) => {
						console.log(res)
						if (res.data.status == 'SUCCESS') {
							// 	uni.showToast({
							// 		icon: 'none',
							// 		title: '登录成功'
							// 	});
							uni.setStorage({
								key: 'token',
								data: res.data.obj,
								success: function() {
									uni.getStorage({
										key: 'token',
										success: function(res) {
											// console.log(res.data);
										}
									});
								}
							});
							uni.redirectTo({
								url: "../index/index"
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '登录失败，请重试！'
							});
							return;
						}
					},
					fail: (err) => {
						uni.showToast({
							icon: 'none',
							title: err
						});
					},
				})
			},
			getAddress(){
				uni.redirectTo({
					url:"../address/address"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login {
		background: #fff;
		height: 100vh;

		.login-container {
			.login-container-top {
				position: relative;
				.login-container-pic {
					image {
						width: 100%;
						height: 356rpx;
					}
				}
				.login-remind{
					position: absolute;
					top: 60rpx;
					right: 40rpx;
					image{
						width: 40rpx;
						height: 40rpx;
						opacity: 0.8;
					}
				}
			}
			.login-container-content {
				margin-top: 200rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: center;

				.content {
					.account {
						display: flex;
						align-items: center;
						border-bottom: 1px solid #f2f2f2;
						padding: 20rpx 0;
						width: 100%;

						image {
							width: 40rpx;
							height: 40rpx;
							margin-right: 10rpx;
						}
						input {
							font-size: 28rpx;
							width: 460rpx;
							color: #666;
							margin-left: 10rpx;

							/deep/ .uni-input-placeholder {
								font-size: 28rpx !important;
							}
						}
					}

					.username {
						margin-bottom: 20rpx;
					}
				}

				.button {
					width: 70%;
					margin-top: 100rpx;

					button {
						background: #4378BE;
						color: #fff;
						line-height: 80rpx;
						font-size: 32rpx;
					}
				}
			}
		}
	}
</style>
