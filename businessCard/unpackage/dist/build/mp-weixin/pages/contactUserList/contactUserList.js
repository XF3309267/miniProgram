(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/contactUserList/contactUserList"],{"4dae":function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return a}));var i=function(){var t=this,n=t.$createElement;t._self._c},o=[]},"5c06":function(t,n,e){"use strict";var a=e("c5e0"),i=e.n(a);i.a},"708d":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=i(e("a34a"));function i(t){return t&&t.__esModule?t:{default:t}}function o(t,n,e,a,i,o,r){try{var c=t[o](r),s=c.value}catch(u){return void e(u)}c.done?n(s):Promise.resolve(s).then(a,i)}function r(t){return function(){var n=this,e=arguments;return new Promise((function(a,i){var r=t.apply(n,e);function c(t){o(r,a,i,c,s,"next",t)}function s(t){o(r,a,i,c,s,"throw",t)}c(void 0)}))}}var c={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar,tagList:[{id:0,title:"已成交"},{id:1,title:"有意向"},{id:2,title:"周末联系"},{id:3,title:"暂不联系"},{id:4,title:"可推广"}],activeTagIndex:-1,inputV:"",searchResList:[]}},onLoad:function(){},onReady:function(){},created:function(){},mounted:function(){},methods:{moniSearch:function(){return new Promise((function(t,n){setTimeout((function(){var n={code:200,data:{list:[{name:"柴总",avatar:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",phone:"15938279383",addInfo:"有意向"},{name:"江总",avatar:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",phone:"15938279383",addInfo:"有意向"},{name:"Z总",avatar:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",phone:"15938279383",addInfo:"有意向"},{name:"z总",avatar:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",phone:"15938279383",addInfo:"有意向"}]}};t(n)}),500)}))},searchText:function(n){var e=this;return r(a.default.mark((function i(){var o;return a.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(n=n.trim(),n){a.next=4;break}return t.showToast({title:"您还未输入任何内容",icon:"none"}),a.abrupt("return");case 4:return console.log("搜索的 内容"),console.log(n),t.showLoading({title:"搜索中...",mask:!0}),a.next=9,e.moniSearch(n);case 9:o=a.sent,200===o.code?e.searchResList=o.data.list:(console.log(o),t.showToast({title:o.msg,icon:"none"})),t.hideLoading();case 12:case"end":return a.stop()}}),i)})))()},searchChange:function(){this.activeTagIndex=-1,console.log(this.activeTagIndex)},searchConfirm:function(){this.searchText(this.inputV)},tagClick:function(t,n){this.inputV=t.title,this.searchText(t.title),this.activeTagIndex=n}}};n.default=c}).call(this,e("543d")["default"])},"94f9":function(t,n,e){"use strict";(function(t){e("92eb");a(e("66fd"));var n=a(e("a37d"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},a37d:function(t,n,e){"use strict";e.r(n);var a=e("4dae"),i=e("f667");for(var o in i)"default"!==o&&function(t){e.d(n,t,(function(){return i[t]}))}(o);e("5c06");var r,c=e("f0c5"),s=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);n["default"]=s.exports},c5e0:function(t,n,e){},f667:function(t,n,e){"use strict";e.r(n);var a=e("708d"),i=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(n,t,(function(){return a[t]}))}(o);n["default"]=i.a}},[["94f9","common/runtime","common/vendor"]]]);