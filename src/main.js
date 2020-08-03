import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import MultiFiltersPlugin from './plugins/MultiFilters'
import VuetifyTable from "vuetify-datatable-extended";
Vue.use(VuetifyTable);
Vue.use(MultiFiltersPlugin);
Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')