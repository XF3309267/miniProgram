(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/SalesManagerCard"],{"286e":function(n,e,o){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={data:function(){return{salesManagerInfo:{name:"王珞丹",avatar:"https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg",position:"",wxId:"wx_id1245343543",phone:"13970853937",company:"江西省家院里科技江西省家院里科技",brief:"",mail:"123123222@gmail.com"}}},methods:{phoneCall:function(){n.makePhoneCall({phoneNumber:this.salesManagerInfo.phone,success:function(n){console.log("makePhoneCall success"),console.log(n)},fail:function(n){console.log("makePhoneCall fail"),console.log(n)}})},addPhonePerson:function(){n.addPhoneContact({firstName:this.salesManagerInfo.name.slice(0,1),nickName:this.salesManagerInfo.name,mobilePhoneNumber:this.salesManagerInfo.phone,email:this.salesManagerInfo.mail,success:function(n){console.log("success addPhoneContact"),console.log(n)},fail:function(n){console.log("fail addPhoneContact"),console.log(n)}})}}};e.default=o}).call(this,o("543d")["default"])},"4a5b":function(n,e,o){"use strict";o.r(e);var a=o("286e"),t=o.n(a);for(var l in a)"default"!==l&&function(n){o.d(e,n,(function(){return a[n]}))}(l);e["default"]=t.a},"541f":function(n,e,o){"use strict";var a=o("66eb"),t=o.n(a);t.a},"66eb":function(n,e,o){},"95a3":function(n,e,o){"use strict";o.r(e);var a=o("e7de"),t=o("4a5b");for(var l in t)"default"!==l&&function(n){o.d(e,n,(function(){return t[n]}))}(l);o("541f");var s,c=o("f0c5"),i=Object(c["a"])(t["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],s);e["default"]=i.exports},e7de:function(n,e,o){"use strict";var a;o.d(e,"b",(function(){return t})),o.d(e,"c",(function(){return l})),o.d(e,"a",(function(){return a}));var t=function(){var n=this,e=n.$createElement;n._self._c},l=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/SalesManagerCard-create-component',
    {
        'components/SalesManagerCard-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("95a3"))
        })
    },
    [['components/SalesManagerCard-create-component']]
]);
