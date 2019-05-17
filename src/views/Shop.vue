<template>
	<div id="shop">
		<div 
			class="scroll-wrap"
			@scroll="onScrollWrap">
			<div class="shop-info">
				<div class="test">

				</div>
			</div>
			<main 
				class="shop-main"
				ref="main" 
				@touchstart="onTouchStartOfMain"
				@touchmove="onTouchMoveOfMain"
				@scroll="onScrollMain">
				<div v-for="(item, index) in 100" :key="index">
					{{item}}
				</div>
			</main>
		</div>
		<div class="data">
			<div>wrapScrollTop:{{wrapScrollTop}}</div>
			<div>mainScrollTop:{{mainScrollTop}}</div>
			<div>startTouches:{{startTouches}}</div>
			<div>moveTouches:{{moveTouches}}</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			wrapScrollTop: 0,
			mainScrollTop: 0,
			isMainScroll: true,
			isWrapScroll: true,
			height: "100px",
			startTouches: [],
			moveTouches: [],
		}
	},
	methods: {
		onScrollWrap(e) {
			this.wrapScrollTop = e.target.scrollTop
		},
		onScrollMain(e) {
			this.mainScrollTop = e.target.scrollTop
		},
		onTouchStartOfMain(e) {
			console.log(e)
			let list = Array.from(new Set(e.touches)).map(item => {
				return item.identifier
			})
			console.log(list)
			this.startTouches = list
		},
		onTouchMoveOfMain(e) {
			let list = Array.from(new Set(e.touches)).map(item => {
				return item.identifier
			})
			console.log(list)
			this.moveTouches = list
		}
	},
	mounted() {

	},
	watch: {
		wrapScrollTop() {
			if(this.wrapScrollTop >= 357) {
				this.$refs.main.style.overflowY = "scroll"
			}else {
				this.$refs.main.style.overflowY = "hidden"
			}

			if(this.wrapScrollTop <= 0) {
				
			}
		},
		mainScrollTop() {
			if(this.mainScrollTop <= 0) {
				this.$refs.main.style.overflowY = "hidden"
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	@import '../style/mixin.scss';
	@mixin bdt($color:green){
		border: 10px solid $color;
	}
	.test {
		background-color: orange;
		height:80px;
		width: 80px;
	}
	#shop {
		overflow: hidden;
		width: 375px;
		box-sizing: border-box;
	}

	div {
		overflow-x: hidden;
	}
	.data {
		position: fixed;
		top: 200px;
		right: 100px;
		
		overflow-x: hidden;
	}
	.scroll-wrap {
		-webkit-overflow-scrolling: touch;		
		position: relative;
		height: 650px;
		@include bdt(red);
		overflow-y: scroll;
		overflow-x: hidden;
		@include flex-stretch;
		flex-direction: column;
	}

	.shop {
		&-info {
			height: 300px;
			@include bdt(gray)
		}
		&-main {
			-webkit-overflow-scrolling: touch;
			height: 667px;
			overflow-y: hidden;
			position: absolute;
			top: 300px;
			@include bdt;
			width: 80%;
			
			overflow-x: hidden
		}
	}
</style>

<style lang="scss">
	body {
		overflow: hidden;
	}
</style>