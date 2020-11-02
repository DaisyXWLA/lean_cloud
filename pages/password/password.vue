<template>
	<view>
		<uniNavBar :status-bar="true" background-color="#4378BE" color="#ffffff" right-text="确定" title="修改密码" @clickLeft="back"
		 @clickRight="clickRight">
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<view class="password">
			<uniList>
				<uniListItem title="原密码">
					<template slot="footer">
						<input placeholder="请输入原密码" value="" />
					</template>
				</uniListItem>
				<uniListItem title="新密码">
					<template slot="footer">
						<input placeholder="请输入新密码" value="" />
					</template>
				</uniListItem>
				<uniListItem title="确认密码">
					<template slot="footer">
						<input placeholder="再次输入确认密码" value="" />
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

			}
		},
		methods: {
			back() {
				uni.redirectTo({
					url: '../index/index'
				})
			},
			clickRight(){
				console.log('修改密码')
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
</style>
