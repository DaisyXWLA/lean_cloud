<template>
	<view>
		<uniNavBar :status-bar="true" background-color="#4378BE" right-text="确定" color="#ffffff" title="筛选" fixed @clickRight="searchConfirm">
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<view class="search">
			<uniSearchBar placeholder="请输入搜索内容" radius="20" bgColor="#fff" @confirm="search"></uniSearchBar>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcon from "../../components/uni-icons/uni-icons.vue"
	import uniSearchBar from '../../components/uni-search-bar/uni-search-bar.vue'
	export default {
		components: {
			uniNavBar,
			uniIcon,
			uniSearchBar
		},
		data() {
			return {

			}
		},
		methods: {
			back() {
				uni.switchTab({
					url: "../proposal/proposal"
				})
			},
			searchConfirm() {
				console.log('点击了右侧按钮')
			},
			search() {}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .uni-navbar--border {
		border: none;
	}
	.search {
		background: #4378BE;

		/deep/ .uni-searchbar {
			background: none;
		}

		/deep/ .uni-searchbar__cancel {
			color: #fff;
		}
	}
</style>
