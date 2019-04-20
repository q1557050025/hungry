<template>
	<div>
		<Header 
			class="home_header" 
			:headerItem="headerItem"></Header>
	</div>
</template>

<script>
import Header from '../components/header/header'

export default {
	components: {
		Header,
	},
	data() {
		return {
			geohash: this.$route.params.geohash,
			headerItem: {logo:{goBack:true},title:'你能看的清楚这些字么你能看的清楚这些字么?',changeCity:true}, //header组件数据
		}
	},
	mounted() {

	}
}
</script>
