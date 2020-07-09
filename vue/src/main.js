import Vue from 'vue'
import App from './App.vue';
import vuetify from './plugins/vuetify';
import Vuex from 'vuex';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css'

import store from './store';

Vue.config.productionTip = false

Vue.use(Vuex)

Vue.use(VuetifyDialog, {
  context: {
    vuetify
  }
})

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
