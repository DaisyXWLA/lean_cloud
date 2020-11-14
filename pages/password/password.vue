<template>
	<view>
		<uniNavBar :status-bar="true" background-color="#4378BE" color="#ffffff" right-text="确定" title="修改密码" @clickLeft="back"
		 @clickRight="updatePassword">
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<view class="password">
			<uniList>
				<uniListItem title="原密码">
					<template slot="footer">
						<input placeholder="请输入原密码" :value="oldPassword" @blur="changeOldPwd"/>
					</template>
				</uniListItem>
				<uniListItem title="新密码">
					<template slot="footer">
						<input placeholder="请输入新密码" :value="newPassword" @blur="getNewPassword"/>
					</template>
				</uniListItem>
				<uniListItem title="确认密码">
					<template slot="footer">
						<input placeholder="再次输入确认密码" :value="confirmPassword" @blur="getConfirmPassword"/>
					</template>
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
				oldPassword:'',
				newPassword:'',
				confirmPassword:''
			}
		},
		onLoad(option) {
			this.token = uni.getStorageSync('token')
		},
		methods: {
			back() {
				uni.redirectTo({
					url: '../index/index'
				})
			},
			changeOldPwd(e){
				this.oldPassword=e.detail.value
			},
			getNewPassword(e){
				this.newPassword=e.detail.value
			},
			getConfirmPassword(e){
				this.confirmPassword=e.detail.value
			},
			updatePassword(){
				uni.request({
					url: "/api/user/changePwd",
					data:{
						oldPwd:this.oldPassword,
						newPwd:this.newPassword,
						newPwd2:this.confirmPassword
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
						if (res.data.status == 'SUCCESS') {
							uni.showToast({
								icon: 'success',
								title: '密码改成功！'
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
	.password{
		input {
			text-align: right;
			font-size: 24rpx;
			color: #999;
		}
	}
	/deep/ .uni-input-placeholder{
		color: #ddd;
	}
	/deep/ .uni-list--border-top{
		height: 0;
	}
	/deep/ .uni-list--border-bottom{
		background: #f2f2f2;
	}
	/deep/ .uni-list--border:after {
		background: #f2f2f2;
	}
</style>
