import Vue from 'vue'

Vue.directive('title', {
    bind(el){
        // Enfoca el elemento
        el.style.fontFamily = 'Raleway, serif';
        el.style.fontSize = '70px';
    }
});

// Vue.directive('paragraph', {
//
// });
