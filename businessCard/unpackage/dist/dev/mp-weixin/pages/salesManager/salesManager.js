(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/salesManager/salesManager"],{

/***/ 53:
/*!**************************************************************************************!*\
  !*** D:/project/businessCard/main.js?{"page":"pages%2FsalesManager%2FsalesManager"} ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _salesManager = _interopRequireDefault(__webpack_require__(/*! ./pages/salesManager/salesManager.vue */ 54));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_salesManager.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 54:
/*!*******************************************************************!*\
  !*** D:/project/businessCard/pages/salesManager/salesManager.vue ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _salesManager_vue_vue_type_template_id_33855cb4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./salesManager.vue?vue&type=template&id=33855cb4&scoped=true& */ 55);
/* harmony import */ var _salesManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./salesManager.vue?vue&type=script&lang=js& */ 57);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _salesManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _salesManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _salesManager_vue_vue_type_style_index_0_id_33855cb4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./salesManager.vue?vue&type=style&index=0&id=33855cb4&lang=scss&scoped=true& */ 59);
/* harmony import */ var _chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../chromeDownLoads/HBuilderX.2.9.8.20201110/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 10);

var renderjs





/* normalize component */

var component = Object(_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _salesManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _salesManager_vue_vue_type_template_id_33855cb4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _salesManager_vue_vue_type_template_id_33855cb4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "33855cb4",
  null,
  false,
  _salesManager_vue_vue_type_template_id_33855cb4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/salesManager/salesManager.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 55:
/*!**************************************************************************************************************!*\
  !*** D:/project/businessCard/pages/salesManager/salesManager.vue?vue&type=template&id=33855cb4&scoped=true& ***!
  \**************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_salesManager_vue_vue_type_template_id_33855cb4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../chromeDownLoads/HBuilderX.2.9.8.20201110/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../chromeDownLoads/HBuilderX.2.9.8.20201110/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../chromeDownLoads/HBuilderX.2.9.8.20201110/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../chromeDownLoads/HBuilderX.2.9.8.20201110/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../chromeDownLoads/HBuilderX.2.9.8.20201110/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../chromeDownLoads/HBuilderX.2.9.8.20201110/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./salesManager.vue?vue&type=template&id=33855cb4&scoped=true& */ 56);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_salesManager_vue_vue_type_template_id_33855cb4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_salesManager_vue_vue_type_template_id_33855cb4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_salesManager_vue_vue_type_template_id_33855cb4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_salesManager_vue_vue_type_template_id_33855cb4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 56:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/project/businessCard/pages/salesManager/salesManager.vue?vue&type=template&id=33855cb4&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    uImage: function() {
      return __webpack_require__.e(/*! import() | uview-ui/components/u-image/u-image */ "uview-ui/components/u-image/u-image").then(__webpack_require__.bind(null, /*! @/uview-ui/components/u-image/u-image.vue */ 223))
    },
    uIcon: function() {
      return __webpack_require__.e(/*! import() | uview-ui/components/u-icon/u-icon */ "uview-ui/components/u-icon/u-icon").then(__webpack_require__.bind(null, /*! @/uview-ui/components/u-icon/u-icon.vue */ 230))
    },
    uPopup: function() {
      return __webpack_require__.e(/*! import() | uview-ui/components/u-popup/u-popup */ "uview-ui/components/u-popup/u-popup").then(__webpack_require__.bind(null, /*! @/uview-ui/components/u-popup/u-popup.vue */ 193))
    }
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var s0 = _vm.__get_style([_vm.ctxWStr, _vm.ctxHStr])

  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        s0: s0
      }
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 57:
/*!********************************************************************************************!*\
  !*** D:/project/businessCard/pages/salesManager/salesManager.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_salesManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../chromeDownLoads/HBuilderX.2.9.8.20201110/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../chromeDownLoads/HBuilderX.2.9.8.20201110/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../chromeDownLoads/HBuilderX.2.9.8.20201110/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../chromeDownLoads/HBuilderX.2.9.8.20201110/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../chromeDownLoads/HBuilderX.2.9.8.20201110/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./salesManager.vue?vue&type=script&lang=js& */ 58);
/* harmony import */ var _chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_salesManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_salesManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_salesManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_salesManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_salesManager_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 58:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/project/businessCard/pages/salesManager/salesManager.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 19));


















































































































































































var _services = __webpack_require__(/*! @/services/services.js */ 49);

var _common = __webpack_require__(/*! @/static/js/common.js */ 50);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var SalesManagerCard = function SalesManagerCard() {__webpack_require__.e(/*! require.ensure | components/SalesManagerCard */ "components/SalesManagerCard").then((function () {return resolve(__webpack_require__(/*! @/components/SalesManagerCard */ 237));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var PersonalIcon = function PersonalIcon() {__webpack_require__.e(/*! require.ensure | components/PersonalIcon */ "components/PersonalIcon").then((function () {return resolve(__webpack_require__(/*! @/components/PersonalIcon */ 244));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var FixedChat = function FixedChat() {__webpack_require__.e(/*! require.ensure | components/FixedChat */ "components/FixedChat").then((function () {return resolve(__webpack_require__(/*! @/components/FixedChat.vue */ 251));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var _default =
{
  data: function data() {
    return {
      userType: -1,
      newsCount: 12,
      avatarList: [
      'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
      'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
      'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
      'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg',
      'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg'],


      userIsAppreciate: false,

      clientId: 2,
      salesId: 20,

      salesManagerInfo: {
        companyId: -1,
        createTime: "",
        deleted: -1,
        headPortrait: "",
        id: -1,
        jobTitle: "",
        likeNum: -1,
        readNum: -1,
        resignStatus: -1,
        salesLoginPhone: "",
        salesMailbox: "",
        salesName: "",
        salesOpenId: "",
        salesPhone: "",
        salesVoiceIntroduce: "",
        salesWordIntroduce: "",
        salesWx: "",
        updateTime: "" },

      companyInfo: {
        "companyAddress": "",
        "companyImagesIntroduce": "",
        "companyLogo": "",
        "companyMailbox": "",
        "companyManifesto": "",
        "companyName": "",
        "companyPhone": "",
        "companyVoiceIntroduce": "",
        "companyWordIntroduce": "",
        "createTime": "",
        "deleted": 0,
        "id": 0,
        "updateTime": "" },

      altas: [{
        id: 0,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg' },
      {
        id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg' },
      {
        id: 2,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg' },
      {
        id: 3,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg' },
      {
        id: 4,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg' },
      {
        id: 5,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg' },
      {
        id: 6,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg' }],

      // 音频
      audioIsPlay: false,
      audioObj: '',
      audioSrc: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
      allTime: 0,
      audioCurrentTime: 0,
      // type  区分 销售 和 普通用户, 0: 普通用户， 1: 销售
      type: 0,

      bottomPoup: false,

      // 画布所需
      myCanvasId: 'myCanvas',
      avatar: '',
      tempFilePath: '',
      smCtxW: 0,
      smCtxH: 0,
      ctx: null,
      pixeRatio: 0,
      getalbum: false,
      initCanvasRes: false,

      paintArr: [] };

  },






  watch: {},


  computed: {
    showAudioTime: function showAudioTime() {
      if (!this.audioIsPlay) {return parseInt(this.allTime) + 's';}
      if (this.allTime === 0) {return '0s';}
      return parseInt(this.allTime - this.audioCurrentTime) + 's';
    },
    // 画布的 宽度
    ctxWStr: function ctxWStr() {
      if (this.smCtxW) {
        return { 'width': this.smCtxW * this.pixeRatio + 'px' };
      }
    },
    ctxHStr: function ctxHStr() {
      if (this.smCtxH) {
        return { 'height': this.smCtxH * this.pixeRatio + 'px' };
      }
    } },

  onShareAppMessage: function onShareAppMessage() {
    return {
      title: '您好，我是' + this.salesManagerInfo.salesName + ',一键保存，了解更多...',
      success: function success(res) {
        console.log('分享 success');
        console.log(res);
      },
      fail: function fail(res) {
        console.log('分享 fail');
        console.log(res);
      } };

  },
  onShow: function onShow() {
    if (this.userType === -1) {
      this.initUserType();
    }
    this.sayHello(10000);
    (0, _common.getImgInfo)('@/static/img/salecPersonImg/home.png');
  },
  onLoad: function onLoad() {

  },
  created: function created() {var _this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var initCanvasRes, getSalesInfoRes;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              // 进入页面 首次 就算 浏览名片一次
              (0, _common.userAction)(_this.clientId, _this.salesId, 0);_context.next = 3;return (

                _this.initCanvas(_this.myCanvasId));case 3:initCanvasRes = _context.sent;
              _this.initCanvasRes = initCanvasRes;_context.next = 7;return (
                _this.initSalesInfo(_this.salesId));case 7:getSalesInfoRes = _context.sent;
              if (getSalesInfoRes) {
                _this.initCompanyInfo(_this.salesManagerInfo.companyId);
              }


              // 对于异步的处理  
              // 建议 不要用在 for 循环中（特别是 使用 async await )
            case 9:case "end":return _context.stop();}}}, _callee);}))();
  },
  mounted: function mounted() {

  },
  methods: {
    initUserType: function initUserType() {
      this.userType = getApp().globalData.userType;
    },

    // 进入页面打招呼
    sayHello: function sayHello() {var durationTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2000;var title = arguments.length > 1 ? arguments[1] : undefined;
      if (!title) {
        title = '您好，我是您的销售经理。有什么问题可以随时咨询我哦！';
      }
      uni.showToast({
        title: title,
        icon: 'none',
        duration: durationTime });

    },
    // 初始化 画布图片信息
    inintPaintImgArr: function inintPaintImgArr() {
      this.paintArr.push(this.salesManagerInfo.headPortrait);
      this.paintArr.push('https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg');
      this.paintArr.push('https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg');
      console.log('push finally');
      console.log(this.paintArr);
    },
    // 初始化 销售的信息
    initSalesInfo: function initSalesInfo(salesId) {var _this2 = this;
      return new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(resolve, reject) {var data, getSalesInfoRes;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
                  uni.showLoading({
                    title: '您的专属销售正在赶路的路上...',
                    mask: true });


                  data = { id: salesId };_context2.next = 4;return (
                    (0, _common.getSalesInfo)(data));case 4:getSalesInfoRes = _context2.sent;
                  if (getSalesInfoRes.statu === 200) {
                    _this2.salesManagerInfo = Object.assign({}, getSalesInfoRes.value);
                    resolve(true);
                  } else {
                    uni.showToast({
                      title: getSalesInfoRes.msg,
                      icon: 'none' });

                    resolve(false);
                  }
                  uni.hideLoading();case 7:case "end":return _context2.stop();}}}, _callee2);}));return function (_x, _x2) {return _ref.apply(this, arguments);};}());


    },

    // 初始化  公司信息

    initCompanyInfo: function initCompanyInfo(companyId) {var _this3 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {var data, getCompanyInfoRes;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
                uni.showLoading({
                  title: '公司信息资源获取中....',
                  mask: true });


                data = { id: companyId };_context3.next = 4;return (
                  (0, _common.getCompanyInfo)(data));case 4:getCompanyInfoRes = _context3.sent;
                if (getCompanyInfoRes.statu === 200) {
                  _this3.companyInfo = getCompanyInfoRes.value;
                  console.log('----- company  ---');
                  console.log(getCompanyInfoRes.value);

                  _this3.inintPaintImgArr();


                } else {
                  uni.showToast({
                    title: getCompanyInfoRes.msg,
                    icon: 'none' });

                }
                uni.hideLoading();case 7:case "end":return _context3.stop();}}}, _callee3);}))();
    },
    // 用户浏览 名片
    userAppreciate: function userAppreciate() {
      var res = (0, _common.userAction)(this.clientId, this.salesId, 0);
      console.log('res');
      console.log(res);

    },



    // 播放音频
    playAudio: function playAudio() {var _this4 = this;
      if (this.audioIsPlay) {
        console.log('音乐播放中');
        this.startTime = 0;
        this.audioIsPlay = false;
        this.audioObj.pause();
        this.audioObj.destroy();
        return;
      }
      var innerAudioContext = uni.createInnerAudioContext();
      console.log('音频文件');
      console.log(this.salesManagerInfo.salesVoiceIntroduce);

      innerAudioContext.src = this.salesManagerInfo.salesVoiceIntroduce;

      innerAudioContext.onCanplay(function () {
        _this4.audioCurrentTime = innerAudioContext.currentTime;
        innerAudioContext.play();
        _this4.audioIsPlay = true;

        innerAudioContext.onPlay(function () {
          _this4.audioCurrentTime = innerAudioContext.currentTime;
          _this4.audioObj = innerAudioContext;
          innerAudioContext.onTimeUpdate(function () {
            _this4.allTime = innerAudioContext.duration;
            _this4.audioCurrentTime = innerAudioContext.currentTime;
            var restTime = parseInt(_this4.allTime - _this4.audioCurrentTime);
            if (!restTime) {
              innerAudioContext.destroy();
              _this4.audioIsPlay = false;
            }
          });
        });
      });
      innerAudioContext.onError(function () {
        uni.showToast({
          title: '音频播放错误',
          icon: 'none' });

        _this4.audioIsPlay = false;
        innerAudioContext.destroy();
      });
    },

    // 点赞
    appreciate: function appreciate() {
      if (this.userIsAppreciate) {
        console.log('用户已经点赞');
        this.salesManagerInfo.likeNum--;
        this.userIsAppreciate = false;
        return;
      }
      var res = (0, _common.userAction)(this.clientId, this.salesId, 2);
      this.salesManagerInfo.likeNum++;
      this.userIsAppreciate = true;
    },


    confirmCallPhone: function confirmCallPhone() {var _this5 = this;
      uni.showModal({
        title: '拨号提示',
        content: '您确认拨打电话：' + this.salesManagerInfo.salesPhone + ' 吗？',
        success: function success(res) {
          if (res.confirm) {
            console.log('用户点击了 确认');
            _this5.phoneCall();
          }
        } });

    },

    // 保存通讯录的 额外操作
    // 因为只是单方面的对 销售的信息操作，不涉及后台
    onMailList: function onMailList() {
      (0, _common.userAction)(this.clientId, this.salesId, 3);
    },

    // 拨打电话
    phoneCall: function phoneCall() {

      uni.makePhoneCall({
        phoneNumber: this.salesManagerInfo.salesPhone,
        success: function success(res) {
          console.log('makePhoneCall success');
          console.log(res);
        },
        fail: function fail(res) {
          console.log('makePhoneCall fail');
          console.log(res);
        } });

    },


    // 复制微信号
    copyWxId: function copyWxId() {var _this6 = this;
      uni.setClipboardData({
        data: this.salesManagerInfo.salesWx,
        success: function success() {
          uni.showToast({
            title: '成功复制微信号' });

          (0, _common.userAction)(_this6.clientId, _this6.salesId, 4);
        },
        fail: function fail() {
          console.log('复制失败');
        } });

    },
    // 弹出 弹出框
    showBottomPoup: function showBottomPoup() {
      this.bottomPoup = true;
    },

    // 将要绘制的元素加入 绘制 数组
    addEleToList: function addEleToList(ele, type, x, y) {
      if (type === 'img') {

      }
    },
    // 生成名片海报
    createPostCard: function createPostCard() {
      (0, _common.userAction)(this.clientId, this.salesId, 1);
      if (this.initCanvasRes) {
        this.canvansTodo(this.ctx, this.myCanvasId, this.pixeRatio, this.paintArr, this.smCtxW * this.pixeRatio, this.smCtxH * this.pixeRatio);
      }
    },
    // 点击分享名片
    shareCard: function shareCard() {
      (0, _common.userAction)(this.clientId, this.salesId, 1);
    },
    // 画布所需
    initCanvas: function initCanvas(canvansId) {var _this7 = this;
      return new Promise(function (resolve, reject) {
        _this7.ctx = uni.createCanvasContext(canvansId);
        uni.getSystemInfo({
          success: function success(res) {
            console.log(res);

            _this7.smCtxH = res.screenHeight * 0.5;
            _this7.smCtxW = _this7.smCtxH * 0.8;
            if (res.screenWidth < _this7.smCtxW) {
              _this7.smCtxW = res.screenWidth;
            }
            _this7.pixeRatio = res.pixelRatio;
            resolve(true);
          } });

      });
    },

    // 绘制文字
    paintText: function paintText(ctx, pixelRatio, text, color, fontSize, x, y) {
      ctx.setFillStyle(color);
      ctx.setFontSize(fontSize * pixelRatio);
      ctx.fillText(text, x * pixelRatio, y * pixelRatio);
    },
    // 绘制 换行文字
    paintLogText: function paintLogText(ctx, text, color, fontSize, x, y, lineStep, limitLength) {
      if (!limitLength) {
        limitLength = 8;
      }
      if (!lineStep) {
        lineStep = 17;
      }
      var textLengthArr = [];
      textLengthArr.length = Math.ceil(textLength / limitLength);

      var textLength = text.length;
      if (textLength > limitLength) {
        for (var i = 0; i < textLengthArr.length; i++) {
          var str2 = text.subString(limitLength * i, limitLength * (i + 1));
          textLengthArr[i] = str2;
          this.paintText(ctx, str2, color, fontSize, x, y + addStep * i * this.pixeRatio);
        }
      } else {
        this.paintText(ctx, text, color, fontSize, x, y);
      }
    },

    // 绘制 纯色背景
    paintBgColor: function paintBgColor(ctx, color, canvansW, canvansH) {
      ctx.rect(0, 0, canvansW, canvansH);
      ctx.fillStyle = color;
      ctx.fill();
    },



    /**该方法用来绘制一个有填充色的圆角矩形 
       *@param cxt:canvas的上下文环境 
       *@param x:左上角x轴坐标 
       *@param y:左上角y轴坐标 
       *@param width:矩形的宽度 
       *@param height:矩形的高度 
       *@param radius:圆的半径 
       *@param fillColor:填充颜色 
       **/
    fillRoundRect: function fillRoundRect(cxt, x, y, width, height, radius, fillColor) {
      //圆的直径必然要小于矩形的宽高          
      if (2 * radius > width || 2 * radius > height) {return false;}

      cxt.save();
      cxt.translate(x, y);
      //绘制圆角矩形的各个边  
      this.drawRoundRectPath(cxt, width, height, radius);
      cxt.fillStyle = fillColor || "#000"; //若是给定了值就用给定的值否则给予默认值  
      cxt.fill();
      cxt.restore();
    },


    // 绘制 圆角矩形
    drawRoundRectPath: function drawRoundRectPath(cxt, width, height, radius) {
      cxt.beginPath(0);
      //从右下角顺时针绘制，弧度从0到1/2PI  
      cxt.arc(width - radius, height - radius, radius, 0, Math.PI / 2);

      //矩形下边线  
      cxt.lineTo(radius, height);

      //左下角圆弧，弧度从1/2PI到PI  
      cxt.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);

      //矩形左边线  
      cxt.lineTo(0, radius);

      //左上角圆弧，弧度从PI到3/2PI  
      cxt.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2);

      //上边线  
      cxt.lineTo(width - radius, 0);

      //右上角圆弧  
      cxt.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2);

      //右边线  
      cxt.lineTo(width, height - radius);
      cxt.closePath();
    },


    // 过滤 绘制数组，将图片转为本地图片
    arrangPaintList: function arrangPaintList(paintArr) {var _this8 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {var i, res, obj;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:if (!





                _this8.paintArr[0].hasOwnProperty('content')) {_context4.next = 2;break;}return _context4.abrupt("return",
                _this8.paintArr);case 2:



                i = 0;case 3:if (!(i < paintArr.length)) {_context4.next = 19;break;}_context4.next = 6;return (
                  (0, _common.getImgInfo)(paintArr[i]));case 6:res = _context4.sent;
                obj = {};
                obj.content = res.path;
                obj.width = res.width;
                obj.height = res.height;
                paintArr[i] = obj;if (!(
                i === paintArr.length - 1)) {_context4.next = 16;break;}
                console.log('finally');
                console.log(paintArr);return _context4.abrupt("return",
                paintArr);case 16:i++;_context4.next = 3;break;case 19:case "end":return _context4.stop();}}}, _callee4);}))();


    },

    // 画布绘制图像
    canvasDrawImage: function canvasDrawImage(ctx, pixelRatio, imgObj, dx, dy, dWidth, dHeight) {var lager = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1;
      // if(!sWidth){
      // 	sWidth = imgObj.width
      // }
      // if(!sHeight){
      // 	sHeight = imgObj.height
      // }


      dx = parseInt(dx * pixelRatio);
      dy = parseInt(dy * pixelRatio);

      dWidth = parseInt(dWidth * pixelRatio);
      dHeight = parseInt(dHeight * pixelRatio);

      var sx = 0;
      var sy = 0;
      var sWidth = dWidth;
      var sHeight = dHeight;


      ctx.drawImage(imgObj.content, dx, dy, dWidth, dHeight);
    },


    canvansTodo: function canvansTodo(ctx, canvasId, pixelRatio, paintArr, finalW, finalH) {var _this9 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6() {var readyArr, startX, startY, addYStep, addYStepsm, addXStep, addXStepsm, fontSize, iconWidth, iconHeight, HraceW, dWidth, dHeight;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:
                _this9.paintBgColor(ctx, '#FFFFFF', finalW, finalH);

                uni.showLoading({
                  title: '名片海报生成中',
                  mask: true });_context6.next = 4;return (


                  _this9.arrangPaintList(paintArr));case 4:readyArr = _context6.sent;
                startX = _this9.smCtxW / 10;
                startY = _this9.smCtxH / 10;
                addYStep = _this9.smCtxW / 7;
                addYStepsm = _this9.smCtxH / 24;
                addXStep = 10;
                addXStepsm = 10;
                fontSize = _this9.smCtxW / 750 * 20;
                iconWidth = 15;
                iconHeight = 15;

                HraceW = readyArr[0].height / readyArr[0].width;
                dWidth = _this9.smCtxW / 10 * 3;
                dHeight = HraceW * dWidth;
                _this9.fillRoundRect(ctx, (startX - 10) * pixelRatio, (startY - 10) * pixelRatio, (_this9.smCtxW / 10 * 8 + 20) * pixelRatio, (dHeight + 20) * pixelRatio, 10 * pixelRatio, '#efefef');
                _this9.canvasDrawImage(ctx, pixelRatio, readyArr[0], startX, startY - 0.5, dWidth, dHeight);



                _this9.paintText(ctx, pixelRatio, _this9.salesManagerInfo.salesName, '#000', fontSize, startX + dWidth + addXStep, startY + addYStepsm);
                _this9.paintText(ctx, pixelRatio, _this9.salesManagerInfo.jobTitle, '#000', fontSize, startX + dWidth + addXStep, startY + addYStepsm * 2);

                _this9.canvasDrawImage(ctx, pixelRatio, readyArr[1], startX + dWidth + addXStep + fontSize * 12, startY + addYStepsm - iconHeight / 2, iconWidth, iconHeight);


                _this9.paintText(ctx, pixelRatio, '电话：', '#000', fontSize, startX + dWidth + addXStep, startY + addYStepsm * 3);
                _this9.paintText(ctx, pixelRatio, _this9.salesManagerInfo.salesPhone, '#000', fontSize, startX + dWidth + addXStep + fontSize * 3, startY + addYStepsm * 3);

                _this9.paintText(ctx, pixelRatio, '公司：', '#000', fontSize, startX + dWidth + addXStep, startY + addYStepsm * 4);
                _this9.paintText(ctx, pixelRatio, _this9.companyInfo.companyName, '#000', fontSize, startX + dWidth + addXStep + fontSize * 3, startY + addYStepsm * 4);

                _this9.paintText(ctx, pixelRatio, '邮箱：', '#000', fontSize, startX + dWidth + addXStep, startY + addYStepsm * 5);
                _this9.paintText(ctx, pixelRatio, _this9.salesManagerInfo.salesMailbox, '#000', fontSize, startX + dWidth + addXStep + fontSize * 3, startY + addYStepsm * 5);

                _this9.paintText(ctx, pixelRatio, '您好', '#000', fontSize * 1.2, startX, startY + addYStep + dHeight);
                _this9.paintText(ctx, pixelRatio, '我是' + _this9.companyInfo.companyName + '的销售经理' + _this9.salesManagerInfo.salesName, '#000', fontSize * 1.2, startX, startY + addYStep * 1.5 + dHeight);
                _this9.paintText(ctx, pixelRatio, '这是我的名片，请保存', '#000', fontSize * 1.2, startX, startY + addYStep * 2 + dHeight);
                _this9.paintText(ctx, pixelRatio, '谢谢！', '#000', fontSize * 1.2, startX, startY + addYStep * 2.5 + dHeight);

                _this9.paintText(ctx, pixelRatio, '长按识别二维码收下名片', '#000', fontSize, startX, _this9.smCtxH - 60);
                _this9.canvasDrawImage(ctx, pixelRatio, readyArr[2], _this9.smCtxW - iconWidth * 8, _this9.smCtxH - 60 - iconWidth * 2.5, iconWidth * 5, iconHeight * 5);
                // ctx.drawImage(readyArr[1].content,)

                ctx.draw();
                setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5() {var resTempFile;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:
                          uni.hideLoading();_context5.next = 3;return (
                            _this9.canvansToFile(canvasId, finalW, finalH));case 3:resTempFile = _context5.sent;
                          _this9.saveToAlbum(resTempFile);
                          (0, _common.previewImg)(resTempFile);
                          console.log(resTempFile);case 7:case "end":return _context5.stop();}}}, _callee5);})),
                1000);case 36:case "end":return _context6.stop();}}}, _callee6);}))();
    },



    // 图片存入 本地相册
    saveToAlbum: function saveToAlbum(tempFilePath) {
      uni.saveImageToPhotosAlbum({
        filePath: tempFilePath,
        success: function success(res) {
          uni.showToast({
            title: '存入相册成功' });

        },
        fail: function fail(res) {
          uni.showToast({
            title: '存入相册失败',
            icon: 'none' });

        } });

    },


    // 画布生成本地路径

    canvansToFile: function canvansToFile(canvansId, clipW, clipH) {
      return new Promise(function (resolve, reject) {
        uni.canvasToTempFilePath({
          x: 0,
          y: 0,
          destWidth: clipW,
          destHeight: clipH,
          canvasId: canvansId,
          success: function success(res) {
            resolve(res.tempFilePath);
          },
          fail: function fail(res) {
            resolve(res.tempFilePath);
          } });

      });
    } },

  components: {
    SalesManagerCard: SalesManagerCard,
    PersonalIcon: PersonalIcon,
    FixedChat: FixedChat } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 59:
/*!*****************************************************************************************************************************!*\
  !*** D:/project/businessCard/pages/salesManager/salesManager.vue?vue&type=style&index=0&id=33855cb4&lang=scss&scoped=true& ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_salesManager_vue_vue_type_style_index_0_id_33855cb4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../chromeDownLoads/HBuilderX.2.9.8.20201110/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../chromeDownLoads/HBuilderX.2.9.8.20201110/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../chromeDownLoads/HBuilderX.2.9.8.20201110/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../chromeDownLoads/HBuilderX.2.9.8.20201110/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../chromeDownLoads/HBuilderX.2.9.8.20201110/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../chromeDownLoads/HBuilderX.2.9.8.20201110/HBuilderX/plugins/uniapp-cli/node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../chromeDownLoads/HBuilderX.2.9.8.20201110/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../chromeDownLoads/HBuilderX.2.9.8.20201110/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../chromeDownLoads/HBuilderX.2.9.8.20201110/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./salesManager.vue?vue&type=style&index=0&id=33855cb4&lang=scss&scoped=true& */ 60);
/* harmony import */ var _chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_salesManager_vue_vue_type_style_index_0_id_33855cb4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_salesManager_vue_vue_type_style_index_0_id_33855cb4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_salesManager_vue_vue_type_style_index_0_id_33855cb4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_salesManager_vue_vue_type_style_index_0_id_33855cb4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_chromeDownLoads_HBuilderX_2_9_8_20201110_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_salesManager_vue_vue_type_style_index_0_id_33855cb4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 60:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/project/businessCard/pages/salesManager/salesManager.vue?vue&type=style&index=0&id=33855cb4&lang=scss&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[53,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/salesManager/salesManager.js.map