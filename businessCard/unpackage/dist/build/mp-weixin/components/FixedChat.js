(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/FixedChat"],{"022d":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return a}));var r=function(){var t=this,e=t.$createElement;t._self._c},u=[]},"04ce":function(t,e,n){"use strict";n.r(e);var a=n("022d"),r=n("09ce");for(var u in r)"default"!==u&&function(t){n.d(e,t,(function(){return r[t]}))}(u);n("b872");var c,o=n("f0c5"),s=Object(o["a"])(r["default"],a["b"],a["c"],!1,null,"c49ee3d0",null,!1,a["a"],c);e["default"]=s.exports},"06c1":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"FixedChat",data:function(){return{salesAvatar:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",normalAvatar:"https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg"}},props:{userType:{type:Number,default:0}},methods:{toChat:function(){this.userType?t.navigateTo({url:"/pages/chatSalesManager/chatSalesManager"}):t.navigateTo({url:"/pages/chatPerson/chatPerson"})}}};e.default=n}).call(this,n("543d")["default"])},"09ce":function(t,e,n){"use strict";n.r(e);var a=n("06c1"),r=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,(function(){return a[t]}))}(u);e["default"]=r.a},"1d6b":function(t,e,n){},b872:function(t,e,n){"use strict";var a=n("1d6b"),r=n.n(a);r.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/FixedChat-create-component',
    {
        'components/FixedChat-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("04ce"))
        })
    },
    [['components/FixedChat-create-component']]
]);
