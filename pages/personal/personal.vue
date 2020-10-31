<template>
	<view>
		<uniNavBar :status-bar="true" background-color="#4378BE" color="#ffffff" right-text="确定" title="个人资料" @clickLeft="back" @clickRight="clickRight">
			<template slot="left">
				<image class="return" src="../../static/icon/return.png" mode="widthFix"></image>
			</template>
		</uniNavBar>
	</view>
</template>

<script>
	// 导航
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components:{uniNavBar},
		data() {
			return {
				
			};
		},
		methods:{
			back(){
				uni.redirectTo({
					url:'../index/index'
				})
			},
			clickRight(){}
		}
	}
</script>

<style lang="scss" scoped>
	.return{
		width: 40rpx;
	}
</style>
