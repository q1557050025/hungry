<template>
	<van-row 
		id="header" 
		class="header" 
		tag="header" 
		type="flex" 
		justify="space-between">
		<van-col span="6">
			<span class="header_logo_title" v-if="headerItem.logo.title">饿了么</span>
			<span class="header_logo_goBack"  v-if="headerItem.logo.goBack">
				<svg width="20px" height="20px">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#goBack"></use>	
				</svg>
			</span>
		</van-col>
		<van-col span="12" v-if="headerItem.title" class="header_title_wrap">
			<span class="header_title" v-if="headerItem.title">
				{{headerItem.title}}
			</span>				
		</van-col>
		<van-col span="6" class="header_login_wrap">
			<router-link 
				class="header_login"
				:to="false ? '/profile': '/login'" 
				v-if="headerItem.signUp">
				<span class="header_login_span">登录|注册</span>	
			</router-link>
			<router-link 
				to="/cityList"
				v-if="headerItem.changeCity">
				<span class="header_changeCity">切换城市</span>
			</router-link>		
		</van-col>
	</van-row>
</template>

<script>
import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant);

export default {
	components: {
	},
	props: {
		headerItem: {type:Object},
	},
	mounted() {

	}
}
</script>

<style lang="scss" scoped>
	@import "../../style/mixin.scss";
	#header {
		background-color: $blue;
		@include wh(375px, 45px);
		@include fj;
	}
	.header {
		&_logo{
			@mixin common() {
				margin-left: rem2px(.4);
				font-weight: 400;
				@include sclh(16px, #fff, 45px);
			}
			&_title {
				@include wh(54px, 16.5px);			
				@include common();
			}
			&_goBack {
				@include common();
				@include wh(20px, 20px);
				line-height: 45px;
			}
		}

		&_title {
			&_wrap {
				@include fj(center);
			}
			@include sclh(18.75px,#fff, 45px);
			font-weight: 700;
		}

		&_login {
			&_wrap{
				@include fj(flex-end)
			}
			@include sclh(15px, #fff, 45px);
			margin-right: rem2px(0.55);
			&_span {
				color: #fff;
				@include wh(65px, 20px);
			}	
		}
		&_changeCity {
			@include sclh(14px, #fff, 45px);
			margin-right: 10px;
		}
	}
</style>