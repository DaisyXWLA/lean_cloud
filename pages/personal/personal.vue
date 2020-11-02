<template>
	<view>
		<uniNavBar :status-bar="true" background-color="#4378BE" color="#ffffff" right-text="确定" title="个人资料" @clickLeft="back"
		 @clickRight="clickRight">
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
						<input placeholder="Maria" value="" />
					</template>
				</uniListItem>
				<uniListItem title="手机号">
					<template slot="footer">
						<input placeholder="18339967512" value="" />
					</template>
				</uniListItem>
				<uniListItem title="员工工号">
					<template slot="footer">
						<input placeholder="20200110" value="" />
					</template>
				</uniListItem>
				<uniListItem title="登录账号">
					<template slot="footer">
						<input placeholder="Maria" value="" />
					</template>
				</uniListItem>
				<uniListItem title="所属部门">
					<template slot="footer">
						<input placeholder="技术部" value="" />
					</template>
				</uniListItem>
			</uniList>
		</view>
	</view>
</template>

<script>
	// 导航
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

			};
		},
		methods: {
			back() {
				uni.redirectTo({
					url: '../index/index'
				})
			},
			clickRight() {
				console.log('用户信息修改成功')
			},
			modifyPortrait() {
				this.$refs.popup.open()
			},
			selectPhoto() {
				uni.chooseImage({
					sourceType: ['album'],
					success: function(res) {
						console.log(res);
						console.log('----------------------------------')
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
						console.log('----------------------------------')
					},
					fail: function(err) {
						console.log(err)
					}
				});
			},
			close() {
				this.$refs.popup.close()
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

	.personal-info {
		margin-top: 20rpx;

		/deep/ .uni-list--border-top {
			height: 0;
		}

		input {
			text-align: right;
			font-size: 24rpx;
			color: #999;
		}
	}
</style>
