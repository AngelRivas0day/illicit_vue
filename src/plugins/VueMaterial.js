import Vue from 'vue'
import {
    MdButton,
    MdContent,
    MdDrawer,
    MdIcon,
    MdBadge,
    MdMenu,
    MdList,
    MdField,
    MdCard,
    MdTabs,
    MdSwitch,
    MdDialog,
    MdEmptyState,
    MdChips
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
Vue.use(MdField)
Vue.use(MdCard)
Vue.use(MdTabs)
Vue.use(MdSwitch)
Vue.use(MdDialog)
Vue.use(MdEmptyState)
Vue.use(MdChips)
