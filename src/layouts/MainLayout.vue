<template>
    <div class="main-layout">
        <md-drawer
            class="md-drawer__ md-right md-fixed"
            :md-active.sync="showNavigation"
            md-swipeable
        >
            <div class="sidenav__menu-content">
                <div class="group">
                    <img
                        src="@/assets/img/v2/large_logo.png"
                        alt="Illicit logo letters"
                        class="menu-content__logo"
                    />
                    <sidebar-options
                        :options="filterMenuOptions(menuOptions)"
                        @optionSelected="showNavigation = false"
                    />
                </div>
                <ul class="menu-content__social">
                    <template v-for="sm in socialMedia">
                        <li :key="sm.label">
                            <router-link :to="sm.url"
                                ><i :class="sm.icon"></i
                            ></router-link>
                        </li>
                    </template>
                </ul>
            </div>
        </md-drawer>
        <md-content class="white-content">
            <div class="navbar">
                <div class="navbar__container">
                    <router-link to="/" class="navbar__logo">
                        <img
                            width="30"
                            height="30"
                            :src="
                                require(
                                    whiteIcons
                                        ? '@/assets/img/v2/white_small_logo.png'
                                        : '@/assets/img/v2/small_logo.png',
                                )
                            "
                            :alt="
                                whiteIcons
                                    ? 'Small white ILLICIT logo'
                                    : 'Small black ILLICIT logo'
                            "
                        />
                    </router-link>
                    <div
                        class="navbar__actions d-flex flex-row justify-content-center align-items-center"
                    >
                        <navbar-account
                            :white-icons="whiteIcons"
                            :is-logged-in="isLoggedIn"
                        />
                        <navbar-favorites
                            :white-icons="whiteIcons"
                            :favorites="favorites"
                        />
                        <div class="navbar__button">
                            <div
                                class="menu"
                                :style="{
                                    color: whiteIcons ? 'white' : '#333333',
                                }"
                                @click="showNavigation = true"
                            >
                                <div
                                    :style="{
                                        background: whiteIcons
                                            ? 'white'
                                            : '#333333',
                                    }"
                                    class="bar"
                                ></div>
                                <div
                                    :style="{
                                        background: whiteIcons
                                            ? 'white'
                                            : '#333333',
                                    }"
                                    class="bar"
                                ></div>
                                <div
                                    :style="{
                                        background: whiteIcons
                                            ? 'white'
                                            : '#333333',
                                    }"
                                    class="bar"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <EventSnackBar />
            <transition name="panels" mode="out-in">
                <router-view></router-view>
            </transition>
        </md-content>
        <Footer />
    </div>
</template>

<script>
import Footer from "@/components/Footer";
import EventSnackBar from "@/components/EventSnackBar";
import { mapState } from "vuex";
import NavbarAccount from "@/components/NavbarAccount.vue";
import NavbarFavorites from "@/components/NavbarFavorites.vue";
import { getAuth } from "firebase/auth";
import { Get } from "@/api/api";
import SidebarOptions from "@/components/SidebarOptions.vue";

export default {
    name: "MainLayout",
    components: {
        SidebarOptions,
        NavbarFavorites,
        NavbarAccount,
        Footer,
        EventSnackBar,
    },
    async mounted() {
        this.watchAuthState();
        this.initializeOptions();
        await this.fetchEvents();
        await this.fetchCategories();
        this.isLoggedIn
            ? await this.fetchFavorites()
            : this.getFavoritesFromLocalStorage();
    },
    beforeDestroy() {
        if (this.unsubscribeAuth) this.unsubscribeAuth();
    },
    data: () => ({
        favorites: [],
        isLoggedIn: false,
        showNavigation: false,
        unsubscribeAuth: null,
        menuOptions: [],
        socialMedia: [],
    }),
    computed: {
        ...mapState("background", {
            whiteIcons: "whiteIcons",
        }),
    },
    methods: {
        async fetchFavorites() {
            try {
                const { data: favorites } = await Get({
                    endpoint: "clients/favorites",
                    useToken: true,
                });
                this.favorites = favorites;
            } catch (error) {
                this.favorites = [];
                this.$notify({
                    title: "Error al obtener favoritos",
                    message:
                        "Ha ocurrido un error al obtener tus favoritos. Por favor, intenta más tarde.",
                    type: "error",
                });
            }
        },
        async fetchCategories() {
            try {
                const { data = [] } = await Get({
                    endpoint: "categories",
                    useToken: false,
                });
                if (data.length === 0) return;
                this.addCategoriesToMenuOptions(data);
            } catch (error) {
                this.$notify({
                    title: "Error al obtener categorías",
                    message:
                        "Ha ocurrido un error al obtener las categorías. Por favor, intenta más tarde.",
                    type: "error",
                });
            }
        },
        async fetchEvents() {
            try {
                const { data = [] } = await Get({
                    endpoint: "events/active",
                    useToken: false,
                });
                if (data.length === 0) return;
                this.addEventsToMenuOptions(data);
            } catch (error) {
                this.$notify({
                    title: "Error al obtener eventos",
                    message:
                        "Ha ocurrido un error al obtener los eventos. Por favor, intenta más tarde.",
                    type: "error",
                });
            }
        },
        addEventsToMenuOptions(events) {
            events = events.map((event) => ({
                id: event.id,
                label: event.name,
                routeData: { name: "Products", query: { event_id: event.id } },
                children: [],
            }));
            const option = this.menuOptions.find(
                (option) => option.label === "eventos",
            );
            if (!option) return;
            // ?: Refresh the ID to trigger the reactivity
            option.id = 55;
            option.children = events;
            this.menuOptions = [...this.menuOptions];
        },
        addCategoriesToMenuOptions(categories) {
            categories = categories.map((category) => ({
                id: category.id,
                label: category.name,
                routeData: {
                    name: "Products",
                    query: { category_id: category.id },
                },
                children: [],
            }));
            const option = this.menuOptions.find(
                (option) => option.label === "categorias",
            );
            if (!option) return;
            // ?: Refresh the ID to trigger the reactivity
            option.id = 66;
            option.children = categories;
            this.menuOptions = [...this.menuOptions];
        },
        getFavoritesFromLocalStorage() {
            const favorites = JSON.parse(localStorage.getItem("favorites"));
            if (favorites) this.favorites = favorites;
        },
        initializeOptions() {
            this.menuOptions = [
                {
                    id: 1,
                    label: "inicio",
                    routeData: { name: "Home" },
                    children: [],
                },
                {
                    id: 2,
                    condition: (option) => option.children.length > 0,
                    label: "categorias",
                    routeData: null,
                    children: [],
                },
                {
                    id: 3,
                    condition: (option) => option.children.length > 0,
                    label: "eventos",
                    routeData: null,
                    children: [],
                },
                {
                    id: 4,
                    label: "ubicaciones",
                    routeData: { name: "Locations" },
                    children: [],
                },
                {
                    id: 5,
                    label: "contacto",
                    routeData: { name: "Contact" },
                    children: [],
                },
            ];
            this.socialMedia = [
                { label: "facebook", url: "/", icon: "fab fa-facebook-f" },
                { label: "instagram", url: "/", icon: "fab fa-instagram" },
                { label: "twitter", url: "/", icon: "fab fa-twitter" },
            ];
        },
        watchAuthState() {
            const auth = getAuth();
            this.unsubscribeAuth = auth.onAuthStateChanged(
                (user) => (this.isLoggedIn = !!user),
            );
        },
        filterMenuOptions(options) {
            return options.filter((option) =>
                option?.condition ? option.condition(option) : true,
            );
        },
    },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Josefin+Sans:300");
@import "../assets/css/vars";

.md-drawer__ {
    z-index: 300 !important;
    width: 50vw;
    min-width: 300px;

    .sidenav__menu-content {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        padding: 35px;
        @include flex("column", "flex-end", "space-between");

        img.menu-content__logo {
            width: 200px;
            height: 65px;
            object-fit: contain;
            display: block;
            margin: 0 0 70px auto;
        }

        .menu-content__social {
            @include flex("row", "center", "center");
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
}

.menu {
    display: inline-block;
    position: relative;
    width: 30px;
    top: 3px;
    left: 20px;
    //   transform: translate(-50%, -50%);
    font-size: 30px;
    font-family: "Josefin Sans", sans-serif;
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
            content: "M \00a0 \00a0 \00a0 \00a0 \00a0U";
            top: 0px;
            left: -100%;
            width: 215px;
        }
        &:after {
            content: "N";
            top: 50px;
            left: 96%;
        }
        &:hover:after,
        &:hover:before {
            top: 4px;
            opacity: 1;
            transition:
                0.2s ease,
                opacity 0.17s 0.03s ease-in;
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
$animation-timing-function: "ease-in";

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
        content: "";
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
        content: "";
    }
}

.panels-enter,
.panels-leave-to {
    &::after {
        width: 50%;
        content: "";
    }

    &::before {
        width: 50%;
        content: "";
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
