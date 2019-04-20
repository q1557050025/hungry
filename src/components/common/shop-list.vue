<template>
	<van-list
		v-model="vanListOptions.loading"
		:finished="vanListOptions.finished"
		finished-text="没有更多了"
    :immediate-check="false"
		class="shop"
		@load="vanListLoad">
		<router-link 
			to="/shop/"
			class="shop_item"
			v-for="(item, index) in vanListOptions.list" :key="index">
			<lazy-component  >
				<img  v-lazy="'//elm.cangdu.org/img/' + item.image_path" class="shop_logo">
			</lazy-component>
			<hgroup class="shop_details">
				<header class="shop_details_header">
					<span v-if="item.is_premium" class="shop_details_premium">品牌</span>
					<span class="shop_details_name">{{item.name}}</span>
					<ul class="shop_details_icon">
						<li v-for="(icon, index) in item.supports" :key="index">{{icon.icon_name}}</li>
					</ul>
				</header>
				<h4><el-rate
						class="shop_details_rate"
						v-model="item.rating"
						disabled
						show-score
						text-color="#ff9900">
					</el-rate>
				</h4>
			</hgroup>
		</router-link>	
	</van-list>
</template>

<script>
import {shopList} from '../../serviece/getData.js'
import { mapState } from 'vuex';
import Vue from 'vue'
import {List} from 'vant'
import { Lazyload} from 'vant';
import { Rate } from 'vant';

Vue.use(Rate);
Vue.use(Lazyload, {lazyComponent: true,loading:'../../assets/logo.png'})
Vue.use(List)

export default {
	data() {
		return {
			shopList: [],
			shopListOptions: {
				latitude: null,
				longitude: null,
				offset: 0,
				restaurant_category_id: '', 
				restaurant_category_ids: '', 
				order_by: '', 
				delivery_mode: '', 
				support_ids: []
			},
			vanListOptions: {
				list:[],
				loading: false,
				finished: false
			}
		}
	},
	props: [],
	mounted() {
		this.init()
	},
	computed: {
		...mapState(['address']),
	},
	methods: {
		async init() {
			this.shopListOptions.latitude = this.address.latitude
			this.shopListOptions.longitude = this.address.longitude
			let res = await shopList(this.shopListOptions)
			this.shopList = [...res]
			console.log('a',this.shopList)
			this.vanListLoad()
		},
    vanListLoad() {
			for (let i = 0; i < 10; i++) {
				this.vanListOptions.list = this.shopList.slice(0,this.vanListOptions.list.length+1)
			}
      // 加载状态结束
			this.vanListOptions.loading = false;
			//   // 数据全部加载完成
      if (this.vanListOptions.list.length >= this.shopList.length) {
        this.vanListOptions.finished = true;
			}
		},
	}

}
</script>

<style lang="scss" scoped>
@import '../../style/mixin.scss';

	.shop {
		&_item {
			@include wh(375px, 105px);
			@include fj(center);
		}
		&_logo {
			@include wh(63.28px, 63.28px);
		}
		&_details {
			@include wh(283.6px, 63.28px);
			border: solid 1px red;
			padding-left: 12px;
			&_header {
				@include fj;
				margin-top: 4px;
			}
			&_premium {
				background-color: #ffd930;
				@include wh(28.7px, 14px);
				@include sclh(14px, #333, 14px);
				font-weight: 700;
			}
			&_name {
				flex-grow: 1;
				font-weight: 700;
				@include sclh(15.2px,#333);
				font-family: PingFangSC-Regular;
				margin-left: 3px;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space:nowrap;
			}
			&_icon {
				@include fj;
				@include wh(38.9px, 13.73px);
				margin-right: 5px;
				li {
					@include sclh(12px, #999);
					padding: 1px;
				}
			}
		}
	}
</style>

<style lang="scss">
@import '../../style/mixin.scss';
	.el-rate__icon, .el-icon-star-on{
		@include wh(9.4px, 9.4px);
	}
</style>