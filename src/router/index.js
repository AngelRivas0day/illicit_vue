import Vue from "vue";
import VueRouter from "vue-router";
import User from "@/views/User/Index.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: () =>
            import(/* webpackChunkName: "Home" */ "../views/Home/Index.vue"),
    },
    {
        path: "/registro",
        name: "Register",
        component: () =>
            import(
                /* webpackChunkName: "Register" */ "../views/Auth/Register/Index.vue"
            ),
    },
    {
        path: "/inicio-sesion",
        name: "Login",
        component: () =>
            import(
                /* webpackChunkName: "Login" */ "../views/Auth/Login/Index.vue"
            ),
    },
    {
        path: "/verificar-correo-electronico",
        name: "VerifyEmail",
        component: () =>
            import(
                /* webpackChunkName: "VerifyEmail" */ "../views/Auth/VerifyEmail/Index.vue"
            ),
    },
    {
        path: "/cuenta",
        name: "Account",
        component: User,
        meta: { requiresAuth: true },
    },
    {
        path: "/todas-las-categorias",
        name: "Categories",
        component: () =>
            import(
                /* webpackChunkName: "Categorias" */ "../views/Categories/Index.vue"
            ),
    },
    {
        path: "/productos",
        name: "Products",
        component: () =>
            import(
                /* webpackChunkName: "Productos" */ "../views/Products/Index.vue"
            ),
    },

    {
        path: "/productos/:id",
        name: "Product",
        component: () =>
            import(
                /* webpackChunkName: "Product" */ "../views/Product/Index.vue"
            ),
    },
    {
        path: "/productos/:id/pedido",
        name: "Checkout",
        component: () =>
            import(
                /* webpackChunkName: "Checkout" */ "../views/Checkout/Index.vue"
            ),
    },
    {
        path: "/productos/payment/:id",
        name: "Payment",
        component: () =>
            import(
                /* webpackChunkName: "Payment" */ "../views/Payment/Index.vue"
            ),
    },
    {
        path: "/payment/success",
        name: "PaymentSuccess",
        component: () =>
            import(
                /* webpackChunkName: "PaymentSuccess" */ "../views/Payment/PaymentSuccess/Index.vue"
            ),
    },
    {
        path: "/payment/cancel",
        name: "PaymentSuccess",
        component: () =>
            import(
                /* webpackChunkName: "PaymentSuccess" */ "../views/Payment/PaymentCancel/Index.vue"
            ),
    },
    {
        path: "/payment/error",
        name: "PaymentError",
        component: () =>
            import(
                /* webpackChunkName: "PaymentError" */ "../views/Payment/Error.vue"
            ),
    },

    {
        path: "/ubicaciones",
        name: "Locations",
        component: () =>
            import(/* webpackChunkName: "Maps" */ "../views/Maps/Index.vue"),
    },
    {
        path: "/contacto",
        name: "Contact",
        component: () =>
            import(
                /* webpackChunkName: "Contact" */ "../views/Contact/Index.vue"
            ),
    },
    {
        path: "*",
        name: "Error404",
        component: () =>
            import(/* webpackChunkName: "Error" */ "../views/Error/Index.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
});

export default router;
