<template>
	<div class="main-layout">
		<md-drawer class="md-drawer__ md-right md-fixed" :md-active.sync="showNavigation" md-swipeable>
			<div class="sidenav__menu-content">
				<div class="group">
					<img src="@/assets/img/v2/large_logo.png" alt="Illicit logo letters" class="menu-content__logo" />
					<ul class="menu-content__menu">
						<template v-for="mo in menuOptions">
							<li :key="mo.name" @click="showNavigation = false">
								<router-link :class="mo.class" :to="mo.url">{{ mo.name.toUpperCase() }}</router-link>
							</li>
						</template>
					</ul>
				</div>
				<ul class="menu-content__social">
					<template v-for="sm in socialMedia">
						<li :key="sm.name">
							<router-link :to="sm.url"><i :class="sm.icon"></i></router-link>
						</li>
					</template>
				</ul>
			</div>
		</md-drawer>
		<md-content class="white-content">
			<div class="navbar" :class="{'active-bg md-elevation-3': navbarBg, 'white-bg': !whiteIcons}">
				<div class="navbar__container">
					<router-link to="/" class="navbar__logo">
						<img v-if="!whiteIcons" src="@/assets/img/v2/small_logo.png" width="30" height="30" alt="Small black ILLICIT logo" />
						<img v-else src="@/assets/img/v2/white_small_logo.png" width="30" height="30" alt="Small white ILLICIT logo" />
					</router-link>
					<div class="navbar__actions d-flex flex-row justify-content-center align-items-center">
						<md-button @click="goToLogin" md-menu-trigger class="mb-0 actions__log md-icon-button md-dense">
							<md-icon :style="'color:' + (whiteIcons ? 'white' : '#333333')" class="icon_">face</md-icon>
						</md-button>
						<md-menu md-size="huge" :md-offset-x="-240" :md-offset-y="1">
							<md-badge class="mr-0 mr-md-3" :md-content="favorites.length">
								<md-button md-menu-trigger class="mb-0 actions__fav md-icon-button md-dense mr-3">
									<md-icon :style="'color:' + (whiteIcons ? 'white' : '#333333')" class="icon_">favorite</md-icon>
								</md-button>
							</md-badge>
							<md-menu-content>
								<Favs />
							</md-menu-content>
						</md-menu>
						<div class="navbar__button">
							<div class="menu" :style="'color:' + (whiteIcons ? 'white' : '#333333')" @click="showNavigation = true">
								<div :style="'background:' + (whiteIcons ? 'white' : '#333333')" class="bar"></div>
								<div :style="'background:' + (whiteIcons ? 'white' : '#333333')" class="bar"></div>
								<div :style="'background:' + (whiteIcons ? 'white' : '#333333')" class="bar"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<EventSnackBar />
            <template v-if="windowWidth >= 840">
                <transition name="panels" mode="out-in">
                    <router-view></router-view>
                </transition>
            </template>
            <template v-else>
                <router-view></router-view>
            </template>
		</md-content>
		<Footer />
	</div>
</template>

<script>
import Footer from '@/components/Footer'
import Favs from '@/components/Favs'
import EventSnackBar from '@/components/EventSnackBar'
import { mapState, mapActions } from 'vuex'

export default {
	name: 'MainLayout',
	components: { Footer, Favs, EventSnackBar },
	async mounted() {
		await this.verifyUserState()
		this.windowWidth = window.innerWidth
        window.addEventListener("resize", this.resizeWindowHandler);
		window.addEventListener('scroll', this.handleScroll);
		this.interval = setInterval(() => {
			if (this.scrolling) {
				this.scrolling = false
				if (window.scrollY > 30)
					this.navbarBg = true
				else
					this.navbarBg = false
			}
		}, 300)
		if (this.token) this.getFavorites()
		await this.getCurrentEvent()
		if (this.event) this.addEventMenuOption()
	},
    destroyed() {
        window.removeEventListener("resize", this.resizeWindowHandler);
		window.removeEventListener('scroll', this.handleScroll);
		clearInterval(this.interval);
    },
	data: () => ({
		showNavigation: false,
		menuOptions: [
			{ name: 'inicio', url: '/', class: '' },
			{ name: 'productos', url: '/productos', class: '' },
			{ name: 'ubicaciones', url: '/ubicaciones', class: '' },
			{ name: 'contacto', url: '/contacto', class: '' },
			{ name: 'faq', url: '/faq', class: '' },
		],
		socialMedia: [
			{ name: 'facebook', url: '/', icon: 'fab fa-facebook-f' },
			{ name: 'instagram', url: '/', icon: 'fab fa-instagram' },
			{ name: 'twitter', url: '/', icon: 'fab fa-twitter' },
		],
        windowWidth: 0,
		scrolling: false,
		interval: null,
		navbarBg: false
	}),
	computed: {
		...mapState('background', {
			whiteIcons: 'whiteIcons',
		}),
		...mapState('user', {
			token: 'token',
			userName: 'userName'
		}),
		...mapState('favorites', {
			favorites: 'favorites',
		}),
		...mapState('events', {
			event: 'event',
		}),
	},
	methods: {
		...mapActions('favorites', {
			getFavorites: 'getFavorites',
		}),
		...mapActions('events', {
			getCurrentEvent: 'getCurrentEvent',
		}),
		...mapActions('user', {
			restoreAccess: 'restoreAccess'
		}),
		goToLogin() {
			if (this.token != '') {
				this.$router.push({ name: 'User' })
			} else {
				this.$router.push({ name: 'Auth' })
			}
		},
		addEventMenuOption() {
			let item = {
				name: this.event.name,
				url: `/evento/productos?event_id=${this.event.id}`,
				class: 'event',
			}
			this.insertAt(this.menuOptions, 2, item)
		},
		insertAt(array, index, ...elementsArray) {
			array.splice(index, 0, ...elementsArray)
		},
        resizeWindowHandler() {
            this.windowWidth = window.innerWidth
        },
		async verifyUserState() {
			console.log('called')
			if (!this.userName)
				await this.restoreAccess()
		},
		handleScroll() {
			this.scrolling = true
		}
	},
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Josefin+Sans:300');
@import '../assets/css/vars';

.md-drawer__ {
	z-index: 300 !important;
	width: 50vw;
	min-width: 300px;
	.sidenav__menu-content {
		height: 100%;
		width: 100%;
		box-sizing: border-box;
		padding: 35px;
		@include flex('column', 'flex-end', 'space-between');
		img.menu-content__logo {
			width: 200px;
			height: 65px;
			object-fit: contain;
			display: block;
			margin: 0 0 70px auto;
		}
		.menu-content__menu {
			list-style: none;
			padding: 0;
			margin: 0;
			li {
				.event {
					color: $main-green !important;
				}
				text-align: right;
				margin-bottom: 25px;
				a {
					color: black;
					font-size: 18px;
					letter-spacing: 0.05rem;
					text-decoration: none !important;
					outline: transparent !important;
				}
			}
		}
		.menu-content__social {
			@include flex('row', 'center', 'center');
			list-style: none;
			padding: 0;
			margin: 0;
			li {
				margin-left: 50px;
				a {
					font-size: 20px;
					color: black;
				}
			}
		}
	}
	@media screen and (min-width: 768px) {
		width: 25vw;
		max-width: 300px;
	}
}
.navbar {
	box-sizing: border-box;
	padding: 0px 50px 0 25px;
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	height: 55px;
	z-index: 200;
	transition: background 0.5s ease-in-out;
	.navbar__container {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		height: 100%;
	}
	@media #{$break-medium} {
		padding: 0px 110px 0 25px;
	}
	&.active-bg {
		background: #333333 !important;
	}
	&.white-bg.active-bg {
		background: white !important;
	}
}

.menu {
	display: inline-block;
	position: relative;
	width: 30px;
	top: 3px;
	left: 20px;
	//   transform: translate(-50%, -50%);
	font-size: 30px;
	font-family: 'Josefin Sans', sans-serif;
	cursor: pointer;
	@media #{$break-medium} {
		&:after,
		&:before {
			position: absolute;
			transition: 0.4s ease;
			opacity: 0;
			pointer-events: none;
		}
		&:before {
			content: 'M \00a0 \00a0 \00a0 \00a0 \00a0U';
			top: 0px;
			left: -100%;
			width: 215px;
		}
		&:after {
			content: 'N';
			top: 50px;
			left: 96%;
		}
		&:hover:after,
		&:hover:before {
			top: 4px;
			opacity: 1;
			transition: 0.2s ease, opacity 0.17s 0.03s ease-in;
		}
	}
	.bar {
		width: 80%;
		height: 3px;
		margin: 0 auto 6px;
		transition: transform 0.4s ease;
	}
}

::v-deep .md-overlay {
	z-index: 250 !important;
}

$animation-time: 0.85s;
$animation-timing-function: 'ease-in';

.panels-enter-active,
.panels-leave-active {
	transition: all $animation-time;
	transition-timing-function: $animation-timing-function;
	&::after {
		transition: width $animation-time;
		transition-timing-function: $animation-timing-function;
		position: absolute;
		z-index: 999;
		background: #fdfdfd;
		top: 0;
		right: 0;
		height: 100%;
		width: 0%;
		content: '';
	}
	&::before {
		transition: width $animation-time;
		transition-timing-function: $animation-timing-function;
		position: absolute;
		z-index: 999;
		background: #222;
		top: 0;
		left: 0;
		height: 100%;
		width: 0%;
		content: '';
	}
}

.panels-enter,
.panels-leave-to {
	&::after {
		width: 50%;
		content: '';
	}
	&::before {
		width: 50%;
		content: '';
	}
}

@keyframes panel-animation {
	0% {
		width: 0%;
	}
	20% {
		width: 20%;
	}
	40% {
		width: 30%;
	}
	60% {
		width: 50%;
	}
	80% {
		width: 80%;
	}
	100% {
		width: 100%;
	}
}
</style>
