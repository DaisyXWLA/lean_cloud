<template>
	<view class="login">
		<!-- <view class="login">
			<view class="login-container">
				<view class="login-container-content">
					<view class="content">
						<view class="username account">
							<image src="../../static/icon/personal@2x.png" mode="aspectFit"></image>
							<input focus placeholder="请输入账号" placeholder-style="color:#BBC0D4;font-size:32rpx" />
						</view>
						<view class="password  account">
							<image src="../../static/icon/password@2x.png" mode="aspectFit"></image>
							<input focus placeholder="请输入密码" placeholder-style="color:#BBC0D4;font-size:32rpx" />
						</view>

					</view>
					<view class="button">
						<button :loading="loading">登录</button>
					</view>
				</view>
			</view>
		</view> -->

		<view class="login-container">
			<view class="login-container-pic">
				<image src="../../static/icon/login-bg.png"></image>
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
					url: this.apiServer + '/login/login',
					data: {
						username: this.username,
						password: this.password
					},
					success: (res) => {
						console.log(res)
						// let list = JSON.stringify(res.data);
						// // console.log("返回数据状态:" + list);
						// if (list == "[]") {
						// 	uni.showToast({
						// 		icon: 'none',
						// 		title: '用户名或密码错误'
						// 	});
						// 	return;
						// } else {
						// 	uni.showToast({
						// 		icon: 'none',
						// 		title: '登录成功'
						// 	});
						// 	uni.redirectTo({
						// 		url: "../index/index"
						// 	})
						// }

					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '网络异常,请稍后重试'
						});
					},
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
			.login-container-pic {
				image {
					width: 100%;
					height: 356rpx;
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
							width: 50rpx;
							height: 50rpx;
							margin-right: 10rpx;
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
					}
				}
			}
		}

		// .login-container {
		// 	background: url(../../static/icon/login-bg.png) no-repeat;
		// 	background-size: cover;
		// 	width: 100%;
		// 	height: 100vh;
		// 	position: relative;

		// 	.login-container-content {
		// 		position: absolute;
		// 		top: 50%;
		// 		left: 0;
		// 		right: 0;
		// 		transform: translateY(-50%);
		// 		display: flex;
		// 		justify-content: center;
		// 		align-items: center;
		// 		flex-wrap: wrap;

		// 		.content {
		// 			.account {
		// 				display: flex;
		// 				align-items: center;

		// 				image {
		// 					width: 50rpx;
		// 					height: 50rpx;
		// 					margin-right: 10rpx;
		// 				}

		// 				input {
		// 					flex: 1;
		// 				}

		// 				padding-bottom: 10rpx;
		// 				border-bottom: 1px solid #f2f2f2;
		// 			}

		// 			.username {
		// 				margin-bottom: 30rpx;
		// 			}
		// 		}

		// 		.button {
		// 			width: 60%;
		// 			margin-top: 100rpx;

		// 			uni-button {
		// 				background: #4378BE;
		// 				color: #fff;
		// 			}
		// 		}

		// 	}

		// }
	}
</style>
