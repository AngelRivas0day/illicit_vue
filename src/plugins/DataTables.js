import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import lang from "element-ui/lib/locale/lang/es";
import locale from "element-ui/lib/locale";
Vue.use(ElementUI);

// import DataTables and DataTablesServer separately
import { DataTables, DataTablesServer } from "vue-data-tables";
Vue.use(DataTables);
Vue.use(DataTablesServer);

// import DataTables and DataTablesServer together
import VueDataTables from "vue-data-tables";
Vue.use(VueDataTables);

locale.use(lang);
