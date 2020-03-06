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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Layout */ "./components/Layout.js");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! semantic-ui-react */ "semantic-ui-react");
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../routes */ "./routes.js");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_routes__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








class ElectionIndex extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      selectedPage: "",
      numberOfPages: "",
      listOfIdeas: []
    });

    _defineProperty(this, "setPageNum", async (event, {
      activePage
    }) => {
      this.setState({
        selectedPage: activePage
      });
      await this.updateListOfIdeas(activePage);
    });
  }

  async componentDidMount() {
    this.setState({
      selectedPage: 1
    });

    try {
      const res = await axios__WEBPACK_IMPORTED_MODULE_4___default.a.get(`http://localhost:5000/api/ideas?itemsCount=5&pageNo=${this.state.selectedPage}`);
      this.setState({
        listOfIdeas: res.data.ideas
      });
      this.setState({
        numberOfPages: Math.ceil(res.data["totalIdeas"] / 5)
      });
    } catch (err) {
      console.log(err);
    }
  }

  async updateListOfIdeas(activePage) {
    try {
      const res = await axios__WEBPACK_IMPORTED_MODULE_4___default.a.get(`http://localhost:5000/api/ideas?itemsCount=5&pageNo=${activePage}`);
      this.setState({
        listOfIdeas: res.data.ideas
      });
      this.setState({
        numberOfPages: Math.ceil(res.data["totalIdeas"] / 5)
      });
    } catch (err) {
      console.log(err);
    }
  }

  renderIdeas() {
    const items = this.state.listOfIdeas.map((idea, index) => {
      const rightStyle = {
        float: "right",
        textDecoration: "underline"
      };
      const leftStyle = {
        float: "left",
        textDecoration: "underline"
      };

      let header = __jsx("div", null, __jsx("div", {
        style: leftStyle
      }, __jsx("a", null, __jsx("h2", null, idea.Title))), __jsx("div", {
        style: rightStyle
      }, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        color: "red",
        size: "mini"
      }, "Report")));

      let extra = __jsx("div", null, __jsx("div", {
        style: rightStyle
      }, __jsx("p", null, "Posted by: ", __jsx("strong", null, idea.author)), __jsx("p", null, "Date: ", __jsx("strong", null, idea.posted_time.slice(0, 10)))), __jsx("div", {
        style: leftStyle
      }, __jsx("p", null, __jsx(_routes__WEBPACK_IMPORTED_MODULE_3__["Link"], {
        route: `/`
      }, __jsx("a", null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__["Icon"], {
        name: "thumbs up outline"
      }))), __jsx("span", null, idea.positiveVotes), __jsx("span", {
        style: {
          marginRight: "2rem"
        }
      }), __jsx(_routes__WEBPACK_IMPORTED_MODULE_3__["Link"], {
        route: `/`
      }, __jsx("a", null, __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__["Icon"], {
        name: "thumbs down outline"
      }))), __jsx("span", null, idea.negativeVotes)), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        size: "tiny"
      }, "Comments (", idea.commentsCount, ")"), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        size: "tiny"
      }, "Attachments (", idea.uploadsCount, ")")));

      return {
        key: index,
        header: header,
        description: idea.description,
        fluid: true,
        extra: extra
      };
    });
    return __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__["Card"].Group, {
      items: items
    });
  }

  render() {
    const {
      selectedPage,
      numberOfPages
    } = this.state;
    return __jsx(_components_Layout__WEBPACK_IMPORTED_MODULE_1__["default"], null, __jsx("div", null, __jsx("h3", null, "Dashboard Homepage"), this.renderIdeas(), __jsx("br", null), __jsx(semantic_ui_react__WEBPACK_IMPORTED_MODULE_2__["Pagination"], {
      activePage: selectedPage,
      totalPages: numberOfPages,
      siblingRange: 1,
      onPageChange: this.setPageNum
    })));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ElectionIndex);

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

/***/ 4:
/*!******************************!*\
  !*** multi ./pages/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/gabriel/Downloads/UniversityWebDev/client/pages/index.js */"./pages/index.js");


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
//# sourceMappingURL=index.js.map