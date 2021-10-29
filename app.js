window.Vue = require('vue');
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";


Vue.component('configurator', require('./App.vue').default);
import store from './store'

Sentry.init({
  Vue,
  dsn: "https://50fe61e4508e4379aa13eb7ebe85621e@o592597.ingest.sentry.io/5771262",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

const app = new Vue({
  el: '#app',
  store: store
});