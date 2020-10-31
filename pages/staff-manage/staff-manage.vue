<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" right-text="新增" color="#ffffff" title="员工管理" fixed
		 @clickRight="add">
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<view class="staff-search">
			<uniSearchBar placeholder="请输入部门名称" radius="20" bgColor="#fff" @confirm="search"></uniSearchBar>
		</view>
		<view class="staff-list">
			<ly-tree :tree-data="treeData" :ready="ready" node-key="id" @node-click="handleNodeClick">
			</ly-tree>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcon from "../../components/uni-icons/uni-icons.vue"
	import uniSearchBar from '../../components/uni-search-bar/uni-search-bar.vue'
	import tree from '../../components/ly-tree/ly-tree.vue'
	export default {
		components: {
			uniNavBar,
			uniIcon,
			uniSearchBar,
			tree
		},
		data() {
			return {
				ready: false, // 这里用于自主控制loading加载状态，避免异步正在加载数据的空档显示“暂无数据”
				treeData: [],
			}
		},
		onLoad() {
			// 模拟异步请求
			setTimeout(() => {
				this.treeData = [{
					id: 1,
					label: '技术部',
					children: [{
						id: 11,
						label: 'Andy',
					}]
				}, {
					id: 2,
					label: '企划部',
					children: [{
						id: 21,
						label: 'Julie',
					}]
				}, {
					id: 3,
					label: '财务部',
					children: [{
						id: 31,
						label: 'Maria',
					}]
				}];
				this.ready = true;
			}, 2000);
		},
		methods: {
			back() {
				uni.redirectTo({
					url: "../index/index"
				})
			},
			add(){
				uni.redirectTo({
					url:"../staff-add/staff-add"
				})
			},
			search() {
				console.log('点击了搜索')
			},
			handleNodeClick() {}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .uni-navbar--border {
		border: none;
	}

	.staff-search {
		background: #4378BE;

		/deep/ .uni-searchbar {
			background: none;
		}

		/deep/ .uni-searchbar__cancel {
			color: #fff;
		}
	}

	.staff-list {
		margin-top: 20rpx;

		/deep/ .ly-tree {
			padding: 0 30rpx;
			/deep/ .ly-tree-node__content {
				border-bottom: 1px solid #f2f2f2;
				padding: 10rpx 0;
			}
		}

	}
</style>
