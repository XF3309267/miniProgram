import Vue from 'vue'
import App from './App'


// 1777jyl			邮箱密码
// 821515jyl		小程序密码

import cuCustom from './colorui/components/cu-custom.vue'
import uView from "uview-ui";
import moment from '@/static/js/moment.js'
import localLanguageObj from '@/static/js/momentLocal.js'


Vue.use(uView);
Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.moment = moment
moment.locale('zh-cn', localLanguageObj)
const app = new Vue({
    ...App
})
app.$mount()
