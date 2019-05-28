<template>
	<div class="shop-list">
		<aside class="shop-list-aside" ref="aside">
			<li :class="{'active':selectedMenuIndex === index}" v-for="(menu, index) in menuList" @click="onClickOfNav(index)"
				:key="index">
				<img :src="getImgPath(menu.icon_url)" alt="" class="icon" v-if="menu.icon_url !== ''">
				{{menu.name}}
			</li>
		</aside>
		<main class="shop-list-main" ref="main" @scroll="onScrollOfMain()">
			<ul class="menu" v-for="(menu, index) in menuList" :key="index">
				<h1 :ref="`menu${index}`" class="menu-name">{{menu.name}}</h1>
				<li v-for="(food, index) in menu.foods" :key="index">
					<img :src="imgBaseUrl + food.image_path" alt="" class="img">
					<div class="detailes">
						<h1 class="food-name">{{food.name}}</h1>
						<p class="food-description">{{food.description}}</p>
						<h4 class="food-tips">{{food.tips}}</h4>
						<h4 class="food-footer">
							<span class="food-price">
								<span>¥</span>
								<span>{{food.specfoods[0].price}}</span>
								<span v-if="food.specifications.length">起</span>
							</span>
							<span v-if="foodList[''+shopId][food._id + ''] 
								&& foodList[''+shopId][food._id + ''].isShow">
								<icon-base width="20" height="20" class="food-icon" >
									<icon-reduce></icon-reduce>
								</icon-base>
							</span>
							<span class="food-num" 
								v-if="foodList[''+shopId][food._id + '']">
									{{foodList[''+shopId][food._id + ''].num}}
							</span>
							<span @click="onClickAdd(food._id + '')">
								<icon-base width="20" height="20" class="food-icon" >
									<icon-add></icon-add>
								</icon-base>
							</span>
						</h4>
					</div>
				</li>
			</ul>
		</main>
	</div>
</template>

<script>
	import {
		getImgPath
	} from '../../../components/common/mixin.js'


	import {
		setInterval,
		clearInterval
	} from 'timers';

	import iconBase from '@/components/IconBase.vue'
	import iconAdd from '@/components/icons/IconAdd'
	import iconReduce from '@/components/icons/IconReduce'
	import {imgBaseUrl} from '@/config/env.js'
	import {getStore,setStore,removeStore} from '@/config/mUtils.js'

	export default {
		components: {
			iconBase,
			iconAdd,
			iconReduce,
		},
		data() {
			return {
				shopId: 3269,
				menuList: [],
				selectedMenuIndex: 0,
				scrollTopList: null,
				scrollInterval: null,
				imgBaseUrl,
				foodList:{},
			}
		},
		methods: {
			async initData() {
				//获取商铺食品列表
				this.menuList = await this.$api.foodMenu(this.shopId);
			},
			onClickOfNav(index) {
				let ulScrollTop = this.scrollTopList[index]
				//main滚动到对应的位置
				this.scrollTo(this.$refs.main, 0, ulScrollTop)
			},
			//模拟easeOut滚动
			scrollTo(element, x, y) {
				let _y = element.scrollTop
				let distance = y - _y
				let i = 1
				clearInterval(this.scrollInterval)
				this.scrollInterval = setInterval(() => {
					i++
					if (i > 60) clearInterval(this.scrollInterval)
					let position = this.easeOut(i / 60)
					let y = position * distance + _y
					element.scrollTo(0, y)
				}, 16)
			},
			onScrollOfMain() {
				this.lightLatestedMenu()
			},
			initScrollTopList() {
				if (this.scrollTopList) return
				let scrollTopList = []
				for (let i = 0; i < this.menuList.length; i++) {
					let menu = `menu${i}`
					let ulScrollTop = this.$refs[menu][0].offsetTop - this.$refs.main.offsetTop;
					scrollTopList.push(ulScrollTop)
				}
				this.scrollTopList = scrollTopList
			},
			//高亮最近的tag
			lightLatestedMenu() {
				let mainScrollTop = this.$refs.main.scrollTop
				for (var i = 0; i < this.scrollTopList.length; i++) {
					if (this.scrollTopList[i] > mainScrollTop) {
						let index = i - 1
						if (index < 0) index = 0
						this.selectedMenuIndex = index
						break
					}
				}
			},
			// 参考tween.js缓动算法
			easeOut(k) {
				return --k * k * k  + 1;
			},
			// 节流函数
			throttle(fn, delay = 100) {
				let last = 0;
				return function () {
					let curr = +new Date();
					if (curr - last > delay) {
						fn.apply(this, arguments);
						last = curr;
					}
				}
			},
			turnScrollOff(element) {
				element.style.overflowY = "hidden"
			},
			turnScrollOn(element) {
				element.style.overflowY = "scroll"
			},
			initFoodList() {
				let foodList = getStore("foodList")
				let shopId = this.shopId
				if(!foodList) {
					foodList = {}
					foodList[shopId] = {}
				}
				this.foodList = foodList
			},
			onClickAdd(id) {
				let shopId = '' + this.shopId
				if(!this.foodList[shopId][''+id]) this.foodList[shopId][''+id] = {num:0}
				this.foodList[shopId][''+id]['num'] += 1
				this.foodList[shopId][''+id]['isShow'] = this.foodList[shopId][''+id]['num'] > 0
				console.log(this.foodList)
			},
		},
		mounted() {
			this.initData()
			this.initFoodList()
			console.log(this.foodList)
		},
		updated() {
			this.initScrollTopList()
		},
		computed: {
			canShopListScroll() {
				return this.$store.state.canShopListScroll
			},
		},
		watch: {
			canShopListScroll() {
				if(this.canShopListScroll) {
					this.turnScrollOn(this.$refs.main)
					this.turnScrollOn(this.$refs.aside)
				}else {
					this.turnScrollOff(this.$refs.main)
					this.turnScrollOff(this.$refs.aside)
				}
			}
		},
		mixins: [getImgPath, ]
	}
</script>

<style lang="scss" scoped>
	@import '../../../style/mixin.scss';

	.shop-list {
		@include flex-stretch;
		height: 634px;
		overflow-y: hidden;

		&-aside {
			width: 90px;
			overflow-y: hidden;
			-webkit-overflow-scrolling: touch;


			li {
				@include text12;
				height: 50px;
				@include flex-center;
				background-color: rgba($color: #e6e6e6, $alpha: .2);

				.icon {
					@include wh(12px, 12px);
					margin-right: 5px;
				}

			}

			.active {
				color: #000;
				font-weight: 500;
				background: #fff;
			}
		}

		&-main {
			flex-grow: 1;
			-webkit-overflow-scrolling: touch;
			overflow-y: hidden;
			overflow-x: hidden;
			.menu {
				margin-top: 5px;
				margin-bottom: 10px;
				margin-left: 10px;
				&-name {
					@include title16;
					color : gray;
				}

				
				li {
					margin-top: 10px;
					margin-right: 10px;
					height: 85px;
					@include flex-stretch;
					.img {
						@include wh(85px,85px);
					}
					.detailes {
						flex-grow: 1;
						margin-left: 8px;
						@include flex-stretch;
						flex-direction: column;
						overflow: hidden;
						.food {

							&-name {
								@include title16;
								@include text-ellipsis;
							}
							&-description, &-tips {
								@include text12;
							}
							&-tips {
								flex-grow: 1;
							}

							&-footer {
								line-height: 24px;
								@include flex-center;
								.food-price {
									flex-grow: 1;
								}
 
								.food-num {
									padding: 0 10px;
								}
							}
						}
					}
				}
			}
		}
	}
</style>