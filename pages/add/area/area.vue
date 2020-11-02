<template>
	<view>
		<uniNavBar :status-bar="true" background-color="#4378BE" color="#ffffff" title="选择区域" fixed>
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<view class="area-search">
			<uniSearchBar placeholder="请输入区域名称" radius="20" bgColor="#fff" @confirm="search"></uniSearchBar>
		</view>
		<view class="area-list">
			<uniList>
				<uniListItem title="Julie" clickable @click="selectArea"></uniListItem>
			</uniList>
			<uniList>
				<uniListItem title="Maria" clickable @click="selectArea"></uniListItem>
			</uniList>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "../../../components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcon from "../../../components/uni-icons/uni-icons.vue"
	import uniSearchBar from '../../../components/uni-search-bar/uni-search-bar.vue'
	import uniList from "../../../components/uni-list/uni-list.vue"
	import uniListItem from '../../../components/uni-list-item/uni-list-item.vue'
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
		methods: {
			back(){
				uni.switchTab({
					url:"../add"
				})
			},
			search(){},
			selectArea(){
				console.log('选择区域')
				uni.switchTab({
					url:"../add?areaName=能力提高"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .uni-navbar--border {
		border: none;
	}
	.area-search{
		background: #4378BE;
		/deep/ .uni-searchbar {
			background: none;
		}
		/deep/ .uni-searchbar__cancel {
			color: #fff;
		}
	}
	/deep/ .uni-list--border-top{
		height: 0;
	}
</style>
