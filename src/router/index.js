import Vue from "vue";
import VueRouter from "vue-router";

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
                /* webpackChunkName: "Register" */ "../views/Register/Index.vue"
            ),
    },
    {
        path: "/inicio-sesion",
        name: "Login",
        component: () =>
            import(/* webpackChunkName: "Login" */ "../views/Login/Index.vue"),
    },
    {
        path: "/verificar-correo-electronico",
        name: "RegisterWelcome",
        component: () =>
            import(
                /* webpackChunkName: "RegisterWelcome" */ "../views/RegisterWelcome/Index.vue"
            ),
    },
    {
        path: "/cuenta",
        name: "Account",
        component: () =>
            import(/* webpackChunkName: "Account" */ "../views/User/Index.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/cuenta/pedidos/:id",
        name: "OrderDetails",
        component: () =>
            import(
                /* webpackChunkName: "OrderDetails" */ "../views/OrderDetails/Index.vue"
            ),
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
        path: "/subir-graduacion",
        name: "UploadGraduation",
        component: () =>
            import(
                /* webpackChunkName: "UploadGraduation" */ "../views/UploadGraduation/Index.vue"
            ),
    },
    {
        path: "/completar-pago",
        name: "CompletePayment",
        component: () =>
            import(
                /* webpackChunkName: "CompletePayment" */ "../views/Payments/Complete/Index.vue"
            ),
    },

    {
        path: "/pago-procesado",
        name: "ProcessedPayment",
        component: () =>
            import(
                /* webpackChunkName: "ProcessedPayment" */ "../views/Payments/Processed/Index.vue"
            ),
    },
    {
        path: "/pago-cancelado",
        name: "CancelledPayment",
        import: () =>
            import(
                /* webpackChunkName: "CancelledPayment" */ "../views/Payments/Cancelled/Index.vue"
            ),
    },
    {
        path: "/ubicaciones",
        name: "Locations",
        component: () =>
            import(
                /* webpackChunkName: "Locations" */ "../views/Maps/Index.vue"
            ),
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
