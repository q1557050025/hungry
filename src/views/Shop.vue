<template>
	<div class="wrap">
		<header class="shop-header">
			header
			<button @click="onClick">back</button>
		</header>
		<div class="shop" ref="shop"
			@touchstart="onTouchStart"
			@touchmove="onTouchmove"
			@touchend="onTouchEnd"
			@scroll="onScroll">
			<main class="shop-main">
				<div v-for="(item, index) in 100" :key="index">
					{{item}}
				</div>
			</main>
			<div style="position:fixed;top:0">
				<div>	{{scrollAbout.initScrollValue}}</div>
				<div>{{scrollAbout.shopScrollTop}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				shopId: 1,
				shopDetailData: null,
				latitude: 29.133253,
				longitude: 119.641724,
				menuList: [],
				ratingList: [],
				ratingOffset: 20,
				ratingScoresData: null,
				ratingTagsList: null,

				//
				touchList:{},
				distance: 0,
				scrollAbout: {
					initScrollValue: 667,
					shopScrollTop: 667,
				},
			}
		},
		methods: {
			onScroll(e) {
				let scrollTop = this.$refs.shop.scrollTop
				this.scrollAbout.shopScrollTop = scrollTop
			},
			onTouchmove() {

			},
			onTouchStart() {
				console.log("touchStart")
			},
			onTouchEnd(e) {
				let top = this.scrollAbout.shopScrollTop
				console.log(e)
	
				var event = new TouchEvent('touchmove',{bubbles:true,cancelable:true,composed:true})
				console.log(event)

				if(top < 500 && top > 0) {
					// this.$refs.shop.dispatchEvent(event)
					this.$refs.shop.style.overflowY = "hidden"
					this.$refs.shop.scrollTo(0,0)
					this.scrollAbout.shopScrollTop = 0
					this.$refs.shop.style.overflowY = "scroll"
				}else if(top >= 500 && top < 667) {
					// this.$refs.shop.dispatchEvent(event)
					this.$refs.shop.style.overflowY = "hidden"
					this.$refs.shop.scrollTo(0,667)
					this.scrollAbout.shopScrollTop = 667
					this.$refs.shop.style.overflowY = "scroll"
				}
			},
			onClick() {
					this.$refs.shop.scrollTo(0,667)
					this.scrollAbout.shopScrollTop = 667
			},
			initScroll() {
				console.log(this.$refs)
				this.$refs.shop.scrollTo(0,this.scrollAbout.initScrollValue)
			},
			async initData() {
				//获取商铺信息
				this.shopDetailData = await this.$api.shopDetails(this.shopId, this.latitude, this.longitude);
				//获取商铺食品列表
				this.menuList = await this.$api.foodMenu(this.shopId);
				//评论列表
				this.ratingList = await this.$api.getRatingList(this.shopId, this.ratingOffset);
				//商铺评论详情
				this.ratingScoresData = await this.$api.ratingScores(this.shopId);
				//评论Tag列表
				this.ratingTagsList = await this.$api.ratingTags(this.shopId);
				console.log(this.shopDetailData)
			},
		},
		async mounted() {
			this.initData()
			this.initScroll()
		
		},
		computed: {
		},
	}
</script>


<style lang="scss" scoped>
	@import '../style/mixin.scss';
	.wrap {
		overflow: hidden;
		height: 667px;
	}
	.shop {
		height: 667px;
		overflow-y: scroll;
		scroll-behavior: smooth;
		overflow-x: hidden;
		-webkit-overflow-scrolling: touch;
		background-color: red;
		&-header {
			height: 300px;
			background-color: orange;
		}

		&-main {
			background-color: yellow;
		}
	}
	
	::-webkit-scrollbar {
		display: none;
	}
</style>