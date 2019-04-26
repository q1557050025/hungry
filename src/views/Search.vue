<template>
	<div id="search" class="search">
		<div class="search_input_wrap">
			<span class="search_input_icon">
				<svg t="1556266593130"
					style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2105"
					xmlns:xlink="http://www.w3.org/1999/xlink">
					<path
						d="M952.2 911.2L753 712c57.3-68.6 91.8-156.7 91.8-252.9 0-225-189.1-406.7-416.7-394.6-200.3 10.7-362.3 172.8-373 373.2C43 665.3 224.7 854.3 449.7 854.3c18.4 0 36.5-1.3 54.3-3.8 17.9-2.5 28.6-21.3 21.3-37.9-4.9-11.2-16.7-17.6-28.9-15.9-15.3 2.1-30.8 3.2-46.7 3.2-193.3 0-349.6-161.8-340.4-357.1 8.2-174.4 149.7-316 324.2-324.1 195.3-9.1 357.1 147.1 357.1 340.4 0 118.9-61.3 223.8-153.9 284.7-10.9 7.2-14.8 21.4-9.6 33.4v0.1c6.7 15.3 25.7 21.1 39.7 11.9 17.2-11.4 33.5-24.1 48.7-37.9l198.3 198.4c5.3 5.3 12.3 8 19.2 8 7 0 13.9-2.7 19.2-8 10.6-10.7 10.6-27.9 0-38.5z"
						p-id="2106" fill="#cdcdcd"></path>
				</svg>
			</span>
			<input type="text" class="search_input_text" v-model="searchValue">
			<span class="search_input_cancel" v-if="searchValue" @click="onCancel">
				<svg t="1556267945083" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3217"
					xmlns:xlink="http://www.w3.org/1999/xlink" >
					<path
						d="M513.43007 1019.262092c-280.20375 0-507.388982-227.207745-507.388982-507.410472 0-280.224216 227.185232-507.409448 507.388982-507.409448 280.247752 0 507.391029 227.185232 507.391029 507.409448C1020.821099 792.054347 793.678846 1019.262092 513.43007 1019.262092zM746.107387 363.903034c9.540284-9.53926 9.540284-25.021883 0-34.539654l-51.822272-51.800783c-9.535167-9.558703-24.977881-9.558703-34.518165 0L512.976746 424.334381 366.184495 277.562597c-9.53619-9.558703-24.977881-9.558703-34.518165 0l-51.822272 51.800783c-9.538237 9.517771-9.538237 25.001417 0 34.539654l146.793274 146.770761-146.793274 146.790204c-9.538237 9.518794-9.538237 25.004487 0 34.540677l51.822272 51.79976c9.540284 9.538237 24.981974 9.538237 34.518165 0L512.976746 597.014232l146.790204 146.790204c9.540284 9.538237 24.982998 9.538237 34.518165 0l51.822272-51.79976c9.540284-9.53619 9.540284-25.021883 0-34.540677L599.317183 510.674818 746.107387 363.903034z"
						p-id="3218" fill="#cdcdcd"></path>
				</svg>
			</span>
		</div>
		<section class="search_history" v-if="!searchValue">
			<h4 class="search_history_text">
				<span>历史搜索</span>
				<span class="search_history_cancel">
					<svg t="1556270767771"
						style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1991"
						xmlns:xlink="http://www.w3.org/1999/xlink">
						<path
							d="M790.864 318.096c0.72 8.832 1.136 17.808 1.136 26.896v444.16c0 73.04-35.824 138.8-112 138.8h-336c-76.176 0-112-65.776-112-138.8v-444.16a235.104 235.104 0 0 1 1.68-26.896H176v-111.04l168-0.128V185.6c0-49.472 45.84-89.6 102.4-89.6h131.2c56.56 0 102.4 40.112 102.4 89.6v20.592l168 0.736v111.168h-57.136zM624 185.6c0-18.464-21.248-34.064-46.4-34.064h-131.2c-25.152 0-46.4 15.6-46.4 34.064v21.344h224V185.6z m112 159.408a190.4 190.4 0 0 0-1.872-26.896H289.888a188.544 188.544 0 0 0-1.888 26.88v444.16c0 42.592 10.72 83.28 56 83.28h336c45.344 0 56-40.704 56-83.28v-444.16z m-112 28.336h56v443.728H624V373.328z m-140 0h56v443.728h-56V373.328z m-140 0H400v443.728h-56V373.328z"
							p-id="1992" fill="#dbdbdb"></path>
					</svg>
				</span>
			</h4>
		</section>
		<section class="search_list" v-if="shopList.length">
			<ul class="search_list_shop_wrap">
				<li class="search_list_shop" v-for="(item, index) in shopList" :key="index">
						<img :src="'//elm.cangdu.org/img/' + item.image_path">
					<!-- <section class="search_list_shop_details">
						<h1 class="search_list_shop_details_name">{{item.name}}</h1>
						<h4 class="search_list_shop_details_supports"></h4>
					</section> -->
				</li>
			</ul>
		</section>
	</div>
</template>

<script>
import Vue from 'vue'
import {mapState} from 'vuex'
import {searchRestaurant} from '../serviece/getData.js'
import {Lazyload} from 'vant'

Vue.use(Lazyload, {
	lazyComponent: true,
	loading: require('../assets/logo.png')
})

export default {
	data() {
		return {
			searchValue: '',
			shopList: [],
		}
	},
	mounted() {
		this.init()
	},
	computed: {
		...mapState(['geohash'])
	},
	methods: {
		init() {

		},
		onCancel() {
			this.searchValue = ''
		}
	},
	watch: {
		async searchValue() {
			this.shopList = await searchRestaurant(this.geohash, this.searchValue)
			if(this.shopList.type === 'ERROR_PARAMS') {
				this.shopList = []
			}
			console.log(this.shopList)
		}
	}
}
</script>

<style lang="scss" scoped>
	@import '../style/mixin.scss';

	#search {
		.search{

			&_input_wrap {
				@include fj(flex-start);
				align-items: center;
				height: 30px;
				background-color: $bdc;
				border-radius: 15px;
				margin: 5px 5px;
			}
			
			&_input {

				&_text {
					margin-left: 15px;
					background-color: $bdc;
					height: 14px;
					font-size: 16px;
					flex-grow: 1;
				}

				&_icon {
					margin-left: 15px;
					@include wh(25px, 25px);
				}

				&_cancel {
					@include wh(16px, 16px);
					margin-right: 15px;
				}
			}

			&_history {
				&_text {
					@include fj;
					font-weight: 700;
					font-size: 16px;
					margin-top: 10px;
					margin-left: 15px;
					margin-right: 15px;
				}
				&_cancel {
					@include wh(20px, 20px);
				}
			}
			&_list {
				&_shop {
					@include fj(flex-start);
					align-items: center;
				}
			}
		}
	}
</style>
