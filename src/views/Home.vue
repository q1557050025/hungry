<template>
	<div>
		<Header 
			class="home_header" 
			:headerOptions="headerOptions"></Header>
		<main class="home_main">
			<van-swipe class="home_nav" :loop="false">
				<van-swipe-item v-for="(foods, index) in this.foodTypes" :key="index">
					<van-row class="home_nav_swipe" type="flex">
						<van-col
							span="6"
							v-for="(item, index) in foods" :key="index">
								<div class="home_nav_swipe_item" @click="linkToShopFilter">
									<img :src="imgBaseUrl + item.image_url" class="home_nav_swipe_img">
									<p class="home_nav_swipe_title">{{item.title}}</p>
								</div>
						</van-col>
					</van-row>
				</van-swipe-item>
			</van-swipe>
			<shop-list :geohash="geohash" v-if="getDataDone"></shop-list>
		</main>
	</div>
</template>

<script>
import Header from '../components/header/header'
import shopList from '../components/common/shop-list.vue'
import {mapMutations} from 'vuex'
import {getFoodTypesByGeohash,cityGuess,getAddressByGeohash} from '../serviece/getData.js'
import {Swipe, SwipeItem, Lazyload} from 'vant'
import Vue from 'vue'

Vue.use(Swipe).use(SwipeItem)
Vue.use(Lazyload)

import { Row, Col } from 'vant'
Vue.use(Row).use(Col)


export default {
	components: {
		Header,shopList,
	},
	data() {
		return {
			geohash: '',	//经纬度
			headerOptions: {logo:{goBack:true},title:'请选择地址...',signUp:true}, //header组件数据
			foodTypes: [], //导航食物分类
			imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
			getDataDone: false,
		}
	},
	async beforeMount() {
		if(!this.$route.params.geohash) {
			const cityAddress = await cityGuess()
			this.geohash = cityAddress.latitude + ',' + cityAddress.longitude
		}else {
			this.geohash = this.$route.params.geohash
		}
		//保存geohash到vuex
		this.saveGeohash(this.geohash)
		let address = await getAddressByGeohash(this.geohash)
		this.headerOptions.title = address.address
		this.saveAddress(address)
		this.getDataDone = true
	},
	mounted() {
		getFoodTypesByGeohash(this.geohash).then(res => {
			console.log(res)
			let resArr = [...res]
			let foodArr = []
			foodArr[0] = resArr.splice(0,8)
			foodArr[1] = resArr.splice(0,8)
			console.log(foodArr)
			this.foodTypes = foodArr
		})
	},
	methods: {
		...mapMutations(['saveGeohash','saveAddress']),
		linkToShopFilter() {
			this.$router.push('/ShopFilter/')
		}
	}
}
</script>

<style lang="scss">
	.home{
		&_nav {
			.van-swipe__indicator {
				background-color: black;
				&--active {
					background-color: #1989fa;
				}
			}
		}
	}
</style>

<style lang="scss" scoped>
	@import '../style/mixin.scss';
	
	.home {
		display: flex;
		flex-direction: column;
		&_header {
			height: 45px;
		}
		&_main {
			overflow: auto;
			height: 577px;
		}
		&_nav {
			border-bottom: solid 2px $bdc;
			margin-bottom: 20px;
			margin-top: 10px;
			&_swipe {
				flex-wrap: wrap;
				&_item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					height: 86.28px;
				}
				&_img{
					@include wh(42.2px, 42.2px)
				}
				&_title {
					@include sclh(12.9px, #666, 40px)
				}
			}
		}
	}
</style>