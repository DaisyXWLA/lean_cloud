<script>
	import Vue from 'vue'
	export default {
		//App.vue
		onLaunch: function(option) {
				uni.getSystemInfo({
					success: function(e) {
						Vue.prototype.statusBar = e.statusBarHeight
						// console.log(e.statusBarHeight)
						// #ifndef MP
						if (e.platform == 'android') {
								Vue.prototype.customBar = e.statusBarHeight + 50
						   } else {
								Vue.prototype.customBar = e.statusBarHeight + 45
							}
							// #endif
		
							// #ifdef MP-WEIXIN
							let custom = wx.getMenuButtonBoundingClientRect()
							// console.log(custom)
							Vue.prototype.customBar = custom.bottom + custom.top - e.statusBarHeight
							// #endif
		
							// #ifdef MP-ALIPAY
							Vue.prototype.customBar = e.statusBarHeight + e.titleBarHeight
							// #endif
						}
					})
					
					
				},

		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	body{
		background: #f2f2f2;
	}
</style>
