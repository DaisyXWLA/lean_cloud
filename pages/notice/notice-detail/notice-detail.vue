<template>
	<view>
		<!-- 导航 -->
		<uniNavBar :status-bar="true" background-color="#4378BE" color="#ffffff" title="公告详情" fixed>
			<template slot="left">
				<uniIcon type="arrowleft" size="28" color="#ffffff" @click="back"></uniIcon>
			</template>
		</uniNavBar>
		<view class="notice-detail-container">
			<view class="notice-detail-container-header">
				<text class="title">美空军轰炸机现身台湾东南海域</text>
				<view class="time">
					<text>Andy</text>
					<text>2020-10-26 14:25</text>
				</view>
			</view>
			<view class="notice-detail-container-content">
				【环球网报道】综合台媒与记录军事飞行器动态的社群媒体“飞机守望”（Aircraft Spots）消息，美国空军两架B-1B枪骑兵战略轰炸机朝台湾东南海域方向飞行，并由空中加油机补给油料。台媒提到，两架轰炸机是今天（25日）现踪有关海域。
				
				“飞机守望”24日晚间在推特上发布消息称，“美国空军B-1B轰炸机HUGE01和HUGE02从关岛安德森空军基地出发前往南海。美国空军（加油机）KC-135R PEARL11提供了加油机支持。”此外该推特还发布了有关飞行路线图，但并未提及此次行动时间。
				B-1B枪骑兵战略轰炸机 资料图
				
				台湾《联合报》则援引“飞机守望”消息称，2架美空军B1B轰炸机今天（25日）现踪台湾东南海域。报道还称，台“空军司令部”发言人陈国华表示，针对民间飞机军事网站的讯息，以及第三方的军事动态，台空军援例不做评论。
				
				报道提及“飞机守望”上月25日也曾在推特上传2架美国空军B-1B轰炸机自关岛的安德森空军基地（Andersen AFB）起飞，朝台湾西北方向飞行。
				
				对于美军机、舰过台海，外交部发言人曾明确表示，台湾问题事关中国的主权和领土完整，是中美关系中最重要、最敏感的问题。我们敦促美方恪守一个中国原则和中美三个联合公报的规定，慎重妥善地处理涉台问题，以免损害中美关系和台海的和平稳定。
				
				对于美军机过南海空域，外交部发言人此前亦曾表示，中国尊重和维护各国依据国际法享有的航行和飞越自由，但坚决反对有关国家打着航行和飞越自由的旗号来损害沿海国的主权和安全，扰乱地区和平与稳定。
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "../../../components/uni-nav-bar/uni-nav-bar.vue"
	import uniIcon from "../../../components/uni-icons/uni-icons.vue"
	export default {
		components:{uniNavBar,uniIcon},
		data() {
			return {
				
			}
		},
		methods: {
			back () {
				uni.redirectTo({
					url:'../notice'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.notice-detail-container{
		background-color:#ffffff;
		margin-top:34rpx;
		.notice-detail-container-header{
			padding:30rpx;
			border-bottom:1px solid #f2f2f2;
			.title{
				font-size: 32rpx;
				font-weight:600;
			}
			.time{
				font-size:28rpx;
				color:#999;
				margin-top:20rpx;
				text{
					padding-right:20rpx;
				}
			}
		}
		.notice-detail-container-content{
			padding:30rpx;
			font-size:28rpx;
			line-height:42rpx;
			color:#333;
		}
	}
</style>
