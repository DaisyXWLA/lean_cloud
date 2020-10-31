<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" color="#ffffff" title="部门" fixed>
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<uniSearchBar placeholder="请输入部门名称" radius="20" bgColor="#fff" @confirm="search"></uniSearchBar>
		<view class="department-list">
			<tree :tree-data="treeData" :ready="ready" node-key="id" @node-click="handleNodeClick">
			</tree>
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
				departmentId:'',
				departmentName:'',
				parentId:''
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
						label: '软件部',
					}]
				}, {
					id: 2,
					label: '企划部',
					children: [{
						id: 21,
						label: '企划部',
					}]
				}, {
					id: 3,
					label: '财务部',
					children: [{
						id: 31,
						label: '财务部',
					}]
				}];
				this.ready = true;
			}, 2000);
		},
		methods: {
			back() {
				uni.redirectTo({
					url: "../check/check"
				})
			},
			search() {
				console.log('点击了搜索')
			},
			handleNodeClick(obj) {
				this.departmentId = obj.key;
				this.departmentName = obj.label;
				// console.log(obj.key,obj.label);
				uni.redirectTo({
					url:`../check/check?id=${this.departmentId}&name=${this.departmentName}&parentId=${this.parentId}`
				})
			}
		}
	}
</script>

<style>

</style>
