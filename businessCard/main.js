import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;

import uView from "uview-ui";

import cuCustom from './colorui/components/cu-custom.vue'

import moment from '@/static/js/momentLocal.js'


Vue.prototype.moment = moment
Vue.prototype.baseQiniuyunUrl = 'http://jylqndev.kaiwumace.com/'

Vue.use(uView);
Vue.component('cu-custom',cuCustom)

Vue.mixin({
	methods: {
		setData: function(obj, callback) {
			let that = this;
			let keys = [];
			let val, data;
			Object.keys(obj).forEach(function(key) {
				keys = key.split('.');
				val = obj[key];
				data = that.$data;
				keys.forEach(function(key2, index) {
					if (index + 1 == keys.length) {
						that.$set(data, key2, val);
					} else {
						if (!data[key2]) {
							that.$set(data, key2, {});
						}
					}
					data = data[key2];
				})
			});
			callback && callback();
		} 
	}
});

App.mpType = 'app';

const app = new Vue({
    ...App
});
app.$mount();
