module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/Header.js":
/*!******************************!*\
  !*** ./components/Header.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! semantic-ui-react */ "semantic-ui-react");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../routes */ "./routes.js");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_routes__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_cookie__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-cookie */ "react-cookie");
/* harmony import */ var react_cookie__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_cookie__WEBPACK_IMPORTED_MODULE_3__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const cookies = new react_cookie__WEBPACK_IMPORTED_MODULE_3__["Cookies"]();

class Header extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      token: ""
    });
  }

  componentDidMount() {
    this.setState({
      token: cookies.get("token")
    });
  }

  render() {
    if (this.state.token) {
      return __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Menu"], {
        style: {
          marginTop: "10px"
        }
      }, __jsx(_routes__WEBPACK_IMPORTED_MODULE_2__["Link"], {
        route: "/"
      }, __jsx("a", {
        className: "item"
      }, "Ideas Portal")), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Menu"].Menu, {
        position: "right"
      }, __jsx(_routes__WEBPACK_IMPORTED_MODULE_2__["Link"], {
        route: "/ideas/new-idea"
      }, __jsx("a", {
        className: "item"
      }, "Submit Idea")), __jsx(_routes__WEBPACK_IMPORTED_MODULE_2__["Link"], {
        route: "/logout"
      }, __jsx("a", {
        className: "item"
      }, "Logout"))));
    }

    return __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Menu"], {
      style: {
        marginTop: "10px"
      }
    }, __jsx(_routes__WEBPACK_IMPORTED_MODULE_2__["Link"], {
      route: "/"
    }, __jsx("a", {
      className: "item"
    }, "Ideas Portal")), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Menu"].Menu, {
      position: "right"
    }, __jsx(_routes__WEBPACK_IMPORTED_MODULE_2__["Link"], {
      route: "/login"
    }, __jsx("a", {
      className: "item"
    }, "Login"))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Header);

/***/ }),

/***/ "./components/Layout.js":
/*!******************************!*\
  !*** ./components/Layout.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ "next/head");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Header */ "./components/Header.js");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! semantic-ui-react */ "semantic-ui-react");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




/* harmony default export */ __webpack_exports__["default"] = (props => {
  return __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_3__["Container"], null, __jsx(next_head__WEBPACK_IMPORTED_MODULE_1___default.a, null, __jsx("link", {
    rel: "stylesheet",
    href: "//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
  })), __jsx(_Header__WEBPACK_IMPORTED_MODULE_2__["default"], null), props.children);
});

/***/ }),

/***/ "./pages/login.js":
/*!************************!*\
  !*** ./pages/login.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! semantic-ui-react */ "semantic-ui-react");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_cookie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-cookie */ "react-cookie");
/* harmony import */ var react_cookie__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_cookie__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../routes */ "./routes.js");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_routes__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Layout */ "./components/Layout.js");
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







const cookies = new react_cookie__WEBPACK_IMPORTED_MODULE_2__["Cookies"]();

class LoginForm extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      email: "",
      password: ""
    });

    _defineProperty(this, "handleEmailChange", event => {
      this.setState({
        email: event.target.value
      });
    });

    _defineProperty(this, "handlePasswordChange", event => {
      this.setState({
        password: event.target.value
      });
    });

    _defineProperty(this, "loginHandler", async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        const obj = {
          email: this.state.email,
          password: this.state.password
        };
        const res = await axios__WEBPACK_IMPORTED_MODULE_3___default.a.post("http://localhost:5000/api/auth/login/", obj, config);
        cookies.set("token", res.data.token);
        console.log("token:" + res.data.token);
        _routes__WEBPACK_IMPORTED_MODULE_4__["Router"].pushRoute("/");
      } catch (err) {
        console.log(err);
      }
    });
  }

  render() {
    return __jsx(_components_Layout__WEBPACK_IMPORTED_MODULE_5__["default"], null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Grid"], {
      textAlign: "center",
      style: {
        height: "100vh"
      },
      verticalAlign: "top"
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Grid"].Column, {
      style: {
        maxWidth: 450
      }
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Header"], {
      as: "h2",
      color: "teal",
      textAlign: "center"
    }, "Log-in to your account"), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Form"], {
      size: "large",
      onSubmit: this.loginHandler
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Segment"], {
      stacked: true
    }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Form"].Input, {
      required: true,
      fluid: true,
      icon: "user",
      iconPosition: "left",
      placeholder: "E-mail address",
      type: "email",
      onChange: this.handleEmailChange,
      value: this.state.email
    }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Form"].Input, {
      required: true,
      fluid: true,
      icon: "lock",
      iconPosition: "left",
      placeholder: "Password",
      type: "password",
      onChange: this.handlePasswordChange,
      value: this.state.password
    }), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      color: "teal",
      fluid: true,
      size: "large"
    }, "Login"))), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_1__["Message"], null, "New to us? ", __jsx("a", {
      href: "/signup"
    }, "Sign Up")))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (LoginForm);

/***/ }),

/***/ "./routes.js":
/*!*******************!*\
  !*** ./routes.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const routes = __webpack_require__(/*! next-routes */ "next-routes")(); // routes
//   .add("/elections/new-election", "/elections/new-election")
//   .add("/elections/:address", "/elections/election-status")
//   .add("/elections/:address/add-vote", "/elections/add-vote")
//   .add("/elections/:address/add-candidate", "/elections/add-candidate");


module.exports = routes;

/***/ }),

/***/ 5:
/*!******************************!*\
  !*** multi ./pages/login.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/gabriel/Downloads/UniversityWebDev/client/pages/login.js */"./pages/login.js");


/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "next-routes":
/*!******************************!*\
  !*** external "next-routes" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next-routes");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-cookie":
/*!*******************************!*\
  !*** external "react-cookie" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-cookie");

/***/ }),

/***/ "semantic-ui-react":
/*!************************************!*\
  !*** external "semantic-ui-react" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("semantic-ui-react");

/***/ })

/******/ });
//# sourceMappingURL=login.js.map