<template>
	<div>
		<Header :headerItem="headerItem"></Header>
		<form action="/" class="city_form">
			<van-search
				class="city_form_search"
				v-model="place"
				placeholder="请输入地址"
				shape="round"
				@search="onSearch"
				@input="onSearch">
			</van-search>
			<div slot="action" class="city_form_submit" @click="onSearch">提交</div>
			<van-list
				ref="list"
				v-if="this.placeList.length"
				v-model="loading"
				:finished="finished"
				finished-text="没有更多了"
				:immediate-check="false"
				@load="onLoad">
				<li 
					:key="index"	
					class="city_place" 
					v-for="(item, index) in placeListAsync">
					<router-link to="/cityList">
						<h4 class="city_place_name">{{item.name}}</h4>
						<h6 class="city_place_address">{{item.address}}</h6>
					</router-link>
				</li>
			</van-list>
		</form>
	</div>
</template>
<script>
import Header from '../components/header/header'
import {currentCity,searchPlace} from '../serviece/getData.js'
import {getStore, setStore} from '../config/mUtils.js'

export default {
	components: {
		Header,
	},
	data() {
		return {
			promise: null,
			cityId: null,
			place: '',
			placeList: [],
			placeListAsync: [],
			placeHistory: [],
			currentCity: null,
			headerItem: {logo:{goBack:true},title:'出错',changeCity:true},	
			loading: false,
			finished: false,
		}
	},
	mounted() {
		this.cityId = this.$route.params.cityId
		currentCity(this.cityId).then(res => {
			this.currentCity = res
			this.headerItem.title = this.currentCity.name
		})
	},
	methods: {
		onSearch() {
			if(this.palce !== '') {
				searchPlace(this.cityId, this.place).then(res => {
					if(res.name === "ERROR_QUERY_TYPE") {
						this.placeList = []
					}else {
						this.placeList = res
					}
					console.log('res',this.placeList)
					this.onLoad()
				})
			}else {
				this.placeList = []
				this.placeListAsync = []
        this.finished = false;
			}
		},
    onLoad() {
			for (let i = 0; i < 10; i++) {
				this.placeListAsync = this.placeList.slice(0,this.placeListAsync.length+1)
			}
			console.log('list',this.placeList)
			console.log("async",this.placeListAsync)
      // 加载状态结束
			this.loading = false;
			//   // 数据全部加载完成
      if (this.placeListAsync.length >= this.placeList.length) {
        this.finished = true;
			}
		},
	}
}
</script>

<style lang="scss" scoped>
	@import '../style/mixin';
	.city {
		&_form {
			&_search {
				width: 337.5px;
				margin: 0 auto;
				padding-left: 0;
				padding-right: 0;
			}
			.van-search__content {
				border: .5px solid $bdc;
			}
			margin-top: 10px;
			border-top: 2px solid $bdc;
			border-bottom: 2px solid $bdc;
			&_submit {
				background-color: $blue;
				@include wh(337.5px, 33px);
				margin: 0 auto;
				text-align: center;
				line-height: 33px;
				border-radius: 17px 17px;
				margin-bottom: 10px;
				color: #fff;
				font-weight: 700;
			}
		}
		&_place {
			padding-top: 15px;
			@include wh(375px, 73px);
			border-bottom: solid 1px $bdc;
			background-color: #fff;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
			&_name {
				@include sclh(15px,rgb(51,51,51))
			}
			&_address {
				margin-top: 8.3px;
				@include sclh(12px,#999)
			}
		}
	}
</style>