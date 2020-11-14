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
			<uniList v-for="item in areaList" :key="item.id">
				<uniListItem :title="item.name" clickable @click="selectArea(item.name,item.id)"></uniListItem>
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
				areaList:[],
			}
		},
		onLoad() {
			this.token = uni.getStorageSync('token')
			this.getData()
		},
		methods: {
			getData(){
				uni.request({
					url: "/api/area/list",
					header: {
						"Content-Type": "application/x-www-form-urlencoded;application/json;charset=UTF-8",
						"token": this.token
					},
					success: (res) => {
						this.areaList=res.data.obj
					},
					fail: (error) => {
						console.log(error)
					}
				})
			},
			back(){
				uni.switchTab({
					url:"../add"
				})
			},
			search(){},
			selectArea(name,id){
				uni.switchTab({
					url:`../add`,
					success:()=>{
						uni.setStorageSync('areaInfo',{
							areaName:name,
							areaId:id
						})
					}
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
	.area-list{
		margin-top: 10rpx;
		/deep/ .uni-list-item__content-title{
			color: #333;
		}
		/deep/ .uni-list--border-top {
			height: 0;
		}
		
		/deep/ .uni-list--border-bottom {
			background:#f2f2f2;
		}
	}
</style>
