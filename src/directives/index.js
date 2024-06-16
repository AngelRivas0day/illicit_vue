import Vue from "vue";

Vue.directive("title", {
    bind(el) {
        el.style.fontFamily = "Raleway, serif";
        el.style.fontSize = "70px";
    },
});
