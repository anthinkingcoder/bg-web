// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import iView from 'iview'
import moment from 'moment'
import vueMoment from 'vue-moment'
import './style/iview.less'
import './style/common.styl'
import './style/base.styl'
import vueCookie from 'vue-cookies'
import Filters from './filter/index'

window.moment = moment.lang('zh-cn')
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(iView)
Vue.use(vueMoment)
Vue.use(vueCookie)
Filters.register()

axios.interceptors.response.use(
  response => {
    let inviteKey = router.currentRoute.query.inviteKey,query;
    if (inviteKey && inviteKey == 1) {
      query = {
        inviteKey,
        goTo:decodeURIComponent(router.currentRoute.path)
      }
    }
    if (response.data.code === '0006') {
      router.replace({
        path: '/login',
        query:query
      })
    }
    return response
  },
  error => {
    return Promise.reject('系统异常')
  })

function csrfSaveMethod (method) {
  return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method)
}

axios.interceptors.request.use(
  config => {
    const csrfToken = vueCookie.get('csrfToken')
    if (!csrfSaveMethod(config.method)) {
      config.headers['x-csrf-token'] = csrfToken
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  next()
})

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
