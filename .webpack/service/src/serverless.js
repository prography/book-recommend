(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/serverless.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/api/index.js":
/*!**************************!*\
  !*** ./src/api/index.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _routes_user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./routes/user */ "./src/api/routes/user/index.js");
/* harmony import */ var _routes_user__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_routes_user__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _routes_book__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routes/book */ "./src/api/routes/book/index.js");
/* harmony import */ var _routes_book__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_routes_book__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _routes_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routes/auth */ "./src/api/routes/auth/index.js");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_3__);



//import authCheck from 'lib/middleware/authCheck';


const router = express__WEBPACK_IMPORTED_MODULE_3___default.a.Router();

router.use('/auth', _routes_auth__WEBPACK_IMPORTED_MODULE_2__["default"]);
//router.use('/user', authCheck(), user);
//router.use('/book', authCheck(), book);

/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./src/api/routes/auth/auth.ctrl.js":
/*!******************************************!*\
  !*** ./src/api/routes/auth/auth.ctrl.js ***!
  \******************************************/
/*! exports provided: register, login */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "register", function() { return register; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "login", function() { return login; });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../config */ "./src/config/index.js");


const register = async ctx => {
    console.log('this is register form');
};

const login = async ctx => {
    console.log('this is login form');
};

/***/ }),

/***/ "./src/api/routes/auth/index.js":
/*!**************************************!*\
  !*** ./src/api/routes/auth/index.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _auth_ctrl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.ctrl */ "./src/api/routes/auth/auth.ctrl.js");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);


const router = express__WEBPACK_IMPORTED_MODULE_1___default.a.Router();

router.get('/register', _auth_ctrl__WEBPACK_IMPORTED_MODULE_0__["register"]);
router.get('/login', _auth_ctrl__WEBPACK_IMPORTED_MODULE_0__["login"]);

/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./src/api/routes/book/index.js":
/*!**************************************!*\
  !*** ./src/api/routes/book/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/api/routes/user/index.js":
/*!**************************************!*\
  !*** ./src/api/routes/user/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cors */ "cors");
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api */ "./src/api/index.js");




const app = express__WEBPACK_IMPORTED_MODULE_0___default()();
//import tockenCheck from 'lib/middleware/tockenCheck';


app.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.urlencoded({ extended: false }));

app.use(cors__WEBPACK_IMPORTED_MODULE_1___default()());
app.use(_api__WEBPACK_IMPORTED_MODULE_2__["default"]);
//app.use(tokenCheck())
//    .use(api.routes());

/* harmony default export */ __webpack_exports__["default"] = (app);

/***/ }),

/***/ "./src/config/env/env.json":
/*!*********************************!*\
  !*** ./src/config/env/env.json ***!
  \*********************************/
/*! exports provided: dev, prod, default */
/***/ (function(module) {

module.exports = {"dev":{"port":"3000"},"prod":{}};

/***/ }),

/***/ "./src/config/index.js":
/*!*****************************!*\
  !*** ./src/config/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _env_env_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./env/env.json */ "./src/config/env/env.json");
var _env_env_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./env/env.json */ "./src/config/env/env.json", 1);

const env = "development" || 'dev';
console.log(env);
/* harmony default export */ __webpack_exports__["default"] = (_env_env_json__WEBPACK_IMPORTED_MODULE_0__[env]);

/***/ }),

/***/ "./src/serverless.js":
/*!***************************!*\
  !*** ./src/serverless.js ***!
  \***************************/
/*! exports provided: handler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handler", function() { return handler; });
/* harmony import */ var serverless_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! serverless-http */ "serverless-http");
/* harmony import */ var serverless_http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(serverless_http__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app */ "./src/app.js");



const handler = serverless_http__WEBPACK_IMPORTED_MODULE_0___default()(_app__WEBPACK_IMPORTED_MODULE_1__["default"]);

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "serverless-http":
/*!**********************************!*\
  !*** external "serverless-http" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("serverless-http");

/***/ })

/******/ })));
//# sourceMappingURL=serverless.js.map