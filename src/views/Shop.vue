<template>
	<div>
		<div class="count">
			<!-- <div>{{start}}</div>
			<div>{{distance}}</div>
			<div>{{id}}</div> -->

		</div>
		<!-- <div class="box" ref="box">
			<div>{{distance}}</div>
			<div></div>
		</div> -->
		<div class="test" 	
			@touchend="touchEnd"
			@touchmove="touchMove"
			@touchstart="touchStart">

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
			}
		},
		methods: {
			touchStart(e) {

			},
			touchMove(e) {
				e.preventDefault()
			},
			touchEnd(e) {
				
			}
		},
		async mounted() {
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
		}
	}
</script>


<style lang="scss" scoped>
	@import '../style/mixin.scss';
	.count {
		position: fixed;
		top: 0;
	}
	.test {
		background-color: orange;
		width: 100%;
		height: 400px;
	}
	.box {
		background-color: red;
	}
</style>