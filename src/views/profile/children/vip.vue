<template>
	<div class="vip">
		<header class="vip-header">
			<section class="goback">
				<icon-base :width="'20px'" :height="'20px'"><icon-back></icon-back></icon-base>
			</section>
			<section class="title">购买会员</section>
		</header>
		<main class="vip-main">
			<div class="vip-main-wrap">
				<section class="vip-main-user">
					<section class="photo">
						<img :src="userInfo.avator" alt="">
					</section>
					<section class="detailes">
						<h2><span class="username">{{userInfo.userName}}</span><span class="phone-number">暂未绑定手机号</span></h2>
						<p><span>您还不是超级会员</span></p>
					</section>
				</section>
				<ul class="vip-main-price">
					<li>
						<h1 class="title"></h1>
						
					</li>
				</ul>
			</div>
		</main>
	</div>
</template>

<script>
import IconBack from '../../../components/icons/IconBack'
import IconBase from '../../../components/IconBase'

export default {
	data() {
		return {
			userInfo: {
				userName: '布可',
				avator: require('../../../assets/avator.jpg')
			}
		}
	},
	components: {
		IconBack,
		IconBase,
	}
}
</script>

<style lang="scss" scoped>
	@import '../../../style/mixin.scss';

	.vip {
		@include flex(flex-start, stretch);
		flex-direction: column;
		&-header {
			background-color: #000;
			height: 40px;
			@include flex(space-around,center);
			.goback {
				flex-basis: 0px;
			}
			.title {
				flex-grow: 1;
				color: #fff;
				text-align: center;
				font-size: 20px;
			}
		}

		&-main {			
			&-user {
				height: 80px;
				background-color: #000;
				@include flex(flex-start, center);
				.photo {
					margin-left: 10px;
					img {
						@include wh(60px, 60px);
						border-radius: 50%;
					}
					
				}

				.detailes {
					margin-left: 10px;
					.username {
						color: #fff;
						font-size: 20px;
					}
					.phone-number {
						color: #fff;
						font-size: 12px;
						margin-left: 5px;
					}

					p span {
						font-size: 12px;
						color: gray;
					}
				}
			}
		}
	}
</style>
