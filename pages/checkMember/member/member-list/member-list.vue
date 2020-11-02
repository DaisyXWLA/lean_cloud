<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" color="#ffffff" title="人员列表" fixed>
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<view class="member-search">
			<uniSearchBar placeholder="请输入人员姓名" radius="20" bgColor="#fff" @confirm="search"></uniSearchBar>
		</view>
		
		<view class="member-list">
			<uniList>
				<uniListItem title="Julie" clickable @click="selectMember"></uniListItem>
			</uniList>
			<uniList>
				<uniListItem title="Maria" clickable @click="selectMember"></uniListItem>
			</uniList>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "../../../../components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcon from "../../../../components/uni-icons/uni-icons.vue"
	import uniSearchBar from '../../../../components/uni-search-bar/uni-search-bar.vue'
	import uniList from "../../../../components/uni-list/uni-list.vue"
	import uniListItem from '../../../../components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniNavBar,
			uniIcon,
			uniSearchBar,
			uniList,
			uniListItem
		},
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		methods: {
			back() {
				uni.redirectTo({
					url: "../member"
				})
			},
			search() {
				console.log('点击了搜索')
			},
			selectMember(){
				uni.redirectTo({
					url: "../../checkMember?memberName=Julie"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .uni-navbar--border {
		border: none;
	}
	.member-search{
		background: #4378BE;
		/deep/ .uni-searchbar {
			background: none;
		}
		/deep/ .uni-searchbar__cancel {
			color: #fff;
		}
	}
	.member-list{
		margin-top: 20rpx;
		/deep/ .uni-list--border-top{
			height: 0;
		}
	}
</style>
