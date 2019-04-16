<template>
	<div>
		<Header :headerItem="headerItem"></Header>
	</div>
</template>
<script>
import Header from '../components/header/header'
import {currentCity} from '../serviece/getData.js'

export default {
	components: {
		Header,
	},
	data() {
		return {
			cityId: null,
			currentCity: null,
			headerItem: {logo:{goBack:true},title:'出错',changeCity:true},	
		}
	},
	mounted() {
		this.cityId = this.$route.params.cityId
		currentCity(this.cityId).then(res => {
			this.currentCity = res
			console.log(res)
			this.headerItem.title = this.currentCity.name
		})
	},
	computed: {
		
	}
}
</script>