<template>
	<div class="shop-list">
		<aside class="shop-list-aside">
			<li :class="{'active':selectedMenuIndex === index}" v-for="(menu, index) in menuList" @click="onClickOfNav(index)"
				:key="index">
				<img :src="getImgPath(menu.icon_url)" alt="" class="icon" v-if="menu.icon_url !== ''">
				{{menu.name}}
			</li>
		</aside>
		<main class="shop-list-main" ref="main" @scroll="onScrollOfMain()">
			<ul class="menu" v-for="(menu, index) in menuList" :key="index">
				<h1 :ref="`menu${index}`">{{menu.name}}</h1>
				<li v-for="(food, index) in menu.foods" :key="index">
					{{food.name}}
				</li>
			</ul>
		</main>
	</div>
</template>

<script>
	import {
		getImgPath
	} from '../../../components/common/mixin.js'
import { setInterval, clearInterval } from 'timers';

	export default {
		data() {
			return {
				shopId: 3269,
				menuList: [],
				selectedMenuIndex: 0,
				scrollTopList: null,
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
			//模拟easeIn滚动
			scrollTo(element, x, y) {
				let _y = element.scrollTop
				let distance = y - _y
				let i = 1
				var interval = setInterval(() => {
					i ++
					if(i>60) clearInterval(interval)
					let position = this.easeOut(i/60)
					let y = position * distance + _y
					element.scrollTo(0,y)
				}, 16)
			},
			onScrollOfMain() {
				this.getLatestedMenu()
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
			getLatestedMenu() {
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
				return --k * k * k * k * k + 1;
			},
			//节流函数
			throttle(fn, delay = 100) {
				let last = 0;
				return function () {
					let curr = +new Date();
					if (curr - last > delay) {
						fn.apply(this, arguments);
						last = curr;
					}
				}
			}
		},
		mounted() {
			this.initData()
		},
		updated() {
			this.initScrollTopList()
		},
		computed: {

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
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;

			.active {
				background-color: orange;
			}

			li {
				@include text12;
				height: 50px;
				@include flex-center;

				.icon {
					@include wh(12px, 12px);
					margin-right: 5px;
				}

			}

		}

		&-main {
			flex-grow: 1;
			-webkit-overflow-scrolling: touch;
			overflow-y: scroll;

			.menu {
				border: solid 1px red;
				margin-top: 5px;
			}
		}
	}
</style>