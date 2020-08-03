import Vue from 'vue'
import {
    MdButton,
    MdContent,
    MdDrawer,
    MdIcon,
    MdBadge,
    MdMenu,
    MdList,
    // MdTextarea,
    MdField,
    // MdInput
} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

// @include md-register-theme("default", (
//   primary: md-get-palette-color(white, A200), // The primary color of your application
//   accent: md-get-palette-color(red, A200), // The accent or secondary color
//   theme: dark // This can be dark or light
// ));

Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdDrawer)
Vue.use(MdIcon)
Vue.use(MdBadge)
Vue.use(MdMenu)
Vue.use(MdList)
// Vue.use(MdTextarea)
Vue.use(MdField)
// Vue.use(MdInput)
