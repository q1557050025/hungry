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
				v-model="loading"
				:finished="finished"
				finished-text="没有更多了"
				@load="onLoad">
				<router-link 
					to="/cityList"
					v-for="(item, index) in placeListAsync" :key="index"
					class="city_place">
					<h4>{{item.name}}</h4>
					<h6>{{item.address}}</h6>
				</router-link>
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
			this.onLoad()
		},
    onLoad() {
			let list = []
			searchPlace(this.cityId, this.place).then(res => {
				if(res.length) {
					list = res
				}else{
					list = []
				}
			}).then(() => {for(let i = 0; i < 6; i++) {
						let len =  this.placeListAsync.length - 0
						console.log('len',len)
						this.placeListAsync = list.slice(0,len + 1)
					console.log('list', list)
					console.log('this.placeListAsync', this.placeListAsync)
					}
				}
			)
			console.log('ref',this.$refs.list.check)
			this.loading = false
			// 异步更新数据
      // setTimeout(() => {
			// 	if(this.placeList.length) {
			// 		for (let i = 0; i < 7; i++) {
			// 			if(this.placeList[this.placeListAsync.length]){
			// 				this.placeListAsync = this.placeList.slice(this.placeListAsync.length)
			// 			}
			// 		}
			// 	}else {
			// 		this.placeListAsync = []
			// 	}
      //   // 加载状态结束
      //   this.loading = false;
      //   // 数据全部加载完成
      //   if (this.placeListAsync.length >= this.placeList.length) {
      //     this.finished = true;
      //   }
      // }, 500);
    }
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
			@include wh(375px, 100px);
			border: solid 1px $bdc;
		}
	}
</style>