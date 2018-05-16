module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/next/node_modules/webpack/buildin/harmony-module.js":
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if(!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true,
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./pages/_document.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BGDocument; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styled_jsx_style__ = __webpack_require__("styled-jsx/style");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styled_jsx_style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_styled_jsx_style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_next_document__ = __webpack_require__("next/document");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_next_document___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_next_document__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_styled_jsx_server__ = __webpack_require__("styled-jsx/server");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_styled_jsx_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_styled_jsx_server__);
var _jsxFileName = "/Users/shain/repositories/bitguild/PortalClient/pages/_document.js";



(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();



function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/react-in-jsx-scope */



var BGDocument =
/*#__PURE__*/
function (_Document) {
  _inherits(BGDocument, _Document);

  function BGDocument() {
    _classCallCheck(this, BGDocument);

    return _possibleConstructorReturn(this, (BGDocument.__proto__ || Object.getPrototypeOf(BGDocument)).apply(this, arguments));
  }

  _createClass(BGDocument, [{
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("html", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 13
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_next_document__["Head"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 14
        }
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("meta", {
        charSet: "utf-8",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        },
        className: "jsx-1193338074" + " " + "jsx-1193338074"
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("meta", {
        httpEquiv: "X-UA-Compatible",
        content: "IE=edge",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        },
        className: "jsx-1193338074" + " " + "jsx-1193338074"
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("meta", {
        httpEquiv: "Content-Type",
        content: "text/html; charset=utf-8",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        },
        className: "jsx-1193338074" + " " + "jsx-1193338074"
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("meta", {
        name: "description",
        content: "BitGuild is a decentralized gaming platform designed to eliminate burdensome fees, fraud, and regulations while creating a tokenized gaming marketplace.",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        },
        className: "jsx-1193338074" + " " + "jsx-1193338074"
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("meta", {
        name: "keywords",
        content: "keywords",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        },
        className: "jsx-1193338074" + " " + "jsx-1193338074"
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("meta", {
        name: "robots",
        content: "all",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        },
        className: "jsx-1193338074" + " " + "jsx-1193338074"
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1, user-scalable=no",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        },
        className: "jsx-1193338074" + " " + "jsx-1193338074"
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("title", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        },
        className: "jsx-1193338074" + " " + "jsx-1193338074"
      }, "BitGuild"), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("link", {
        rel: "shortcut icon",
        href: "/favicon.png",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        },
        className: "jsx-1193338074" + " " + "jsx-1193338074"
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("link", {
        rel: "stylesheet",
        href: "https://use.typekit.net/woi6egk.css",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        },
        className: "jsx-1193338074" + " " + "jsx-1193338074"
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("link", {
        rel: "stylesheet",
        type: "text/css",
        href: "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        },
        className: "jsx-1193338074" + " " + "jsx-1193338074"
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("link", {
        rel: "stylesheet",
        href: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css",
        integrity: "sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u",
        crossOrigin: "anonymous",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        },
        className: "jsx-1193338074" + " " + "jsx-1193338074"
      }), this.props.styles, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_styled_jsx_style___default.a, {
        styleId: "2684609453",
        css: ".no-gutter{padding-right:0;padding-left:0;}.no-select{-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-o-user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL19kb2N1bWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE2QjZCLEFBRytCLEFBSVMsZ0JBSFYsU0FJUyxNQUgxQixrQkFJd0Isc0JBQ0Ysb0JBQ0gscUZBQ25CIiwiZmlsZSI6InBhZ2VzL19kb2N1bWVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvc2hhaW4vcmVwb3NpdG9yaWVzL2JpdGd1aWxkL1BvcnRhbENsaWVudCIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3JlYWN0LWluLWpzeC1zY29wZSAqL1xuaW1wb3J0IERvY3VtZW50LCB7SGVhZCwgTWFpbiwgTmV4dFNjcmlwdH0gZnJvbSBcIm5leHQvZG9jdW1lbnRcIjtcbmltcG9ydCBmbHVzaCBmcm9tIFwic3R5bGVkLWpzeC9zZXJ2ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQkdEb2N1bWVudCBleHRlbmRzIERvY3VtZW50IHtcbiAgc3RhdGljIGdldEluaXRpYWxQcm9wcyh7cmVuZGVyUGFnZX0pIHtcbiAgICBjb25zdCB7aHRtbCwgaGVhZCwgZXJyb3JIdG1sLCBjaHVua3N9ID0gcmVuZGVyUGFnZSgpO1xuICAgIGNvbnN0IHN0eWxlcyA9IGZsdXNoKCk7XG4gICAgcmV0dXJuIHtodG1sLCBoZWFkLCBlcnJvckh0bWwsIGNodW5rcywgc3R5bGVzfTtcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxodG1sPlxuICAgICAgICA8SGVhZD5cbiAgICAgICAgICA8bWV0YSBjaGFyU2V0PVwidXRmLThcIiAvPlxuICAgICAgICAgIDxtZXRhIGh0dHBFcXVpdj1cIlgtVUEtQ29tcGF0aWJsZVwiIGNvbnRlbnQ9XCJJRT1lZGdlXCIgLz5cbiAgICAgICAgICA8bWV0YSBodHRwRXF1aXY9XCJDb250ZW50LVR5cGVcIiBjb250ZW50PVwidGV4dC9odG1sOyBjaGFyc2V0PXV0Zi04XCIgLz5cbiAgICAgICAgICA8bWV0YSBuYW1lPVwiZGVzY3JpcHRpb25cIiBjb250ZW50PVwiQml0R3VpbGQgaXMgYSBkZWNlbnRyYWxpemVkIGdhbWluZyBwbGF0Zm9ybSBkZXNpZ25lZCB0byBlbGltaW5hdGUgYnVyZGVuc29tZSBmZWVzLCBmcmF1ZCwgYW5kIHJlZ3VsYXRpb25zIHdoaWxlIGNyZWF0aW5nIGEgdG9rZW5pemVkIGdhbWluZyBtYXJrZXRwbGFjZS5cIiAvPlxuICAgICAgICAgIDxtZXRhIG5hbWU9XCJrZXl3b3Jkc1wiIGNvbnRlbnQ9XCJrZXl3b3Jkc1wiIC8+XG4gICAgICAgICAgPG1ldGEgbmFtZT1cInJvYm90c1wiIGNvbnRlbnQ9XCJhbGxcIiAvPlxuICAgICAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MSwgdXNlci1zY2FsYWJsZT1ub1wiIC8+XG4gICAgICAgICAgPHRpdGxlPkJpdEd1aWxkPC90aXRsZT5cbiAgICAgICAgICA8bGluayByZWw9XCJzaG9ydGN1dCBpY29uXCIgaHJlZj17XCIvZmF2aWNvbi5wbmdcIn0gLz5cbiAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cImh0dHBzOi8vdXNlLnR5cGVraXQubmV0L3dvaTZlZ2suY3NzXCIgLz5cbiAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL25vcm1hbGl6ZS84LjAuMC9ub3JtYWxpemUubWluLmNzc1wiIC8+XG4gICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCJodHRwczovL21heGNkbi5ib290c3RyYXBjZG4uY29tL2Jvb3RzdHJhcC8zLjMuNy9jc3MvYm9vdHN0cmFwLm1pbi5jc3NcIiBpbnRlZ3JpdHk9XCJzaGEzODQtQlZZaWlTSUZlSzFkR21KUkFreWN1SEFIUmczMk9tVWN3dzdvbjNSWWRnNFZhK1BtU1Rzei9LNjh2YmRFamg0dVwiIGNyb3NzT3JpZ2luPVwiYW5vbnltb3VzXCIgLz5cblxuICAgICAgICAgIHt0aGlzLnByb3BzLnN0eWxlc31cblxuICAgICAgICAgIDxzdHlsZSBqc3ggZ2xvYmFsPntgXG4gICAgICAgICAgICAubm8tZ3V0dGVyIHtcbiAgICAgICAgICAgICAgcGFkZGluZy1yaWdodDogMDtcbiAgICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLm5vLXNlbGVjdHtcbiAgICAgICAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgICAgLWtodG1sLXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgICAtby11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgYH08L3N0eWxlPlxuICAgICAgICAgIDxzdHlsZSBnbG9iYWwganN4PntgXG4gICAgICAgICAgICBib2R5IHtcbiAgICAgICAgICAgICAgZm9udC1mYW1pbHk6IFwiZnV0dXJhLXB0XCIsIGZ1dHVyYSwgXCJNeXJpYWQgUHJvXCIsIFwiUHJveGltYSBOb3ZhXCIsIHNhbnMtc2VyaWY7XG4gICAgICAgICAgICAgIGNvbG9yOiAjMTMwMDI5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaDIge1xuICAgICAgICAgICAgICBmb250LXNpemU6IDI0cHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhIHtcbiAgICAgICAgICAgICAgY29sb3I6ICMzMTRCODg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhOmhvdmVyIHtcbiAgICAgICAgICAgICAgY29sb3I6ICM1MzZFQUQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuZ2FwIHtcbiAgICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiA5MHB4O1xuICAgICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiA5MHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmdyYXAge1xuICAgICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgICAgICAgICB3aWR0aDogY2FsYygxMDB2dyAtIDI4NXB4KTtcbiAgICAgICAgICAgICAgbWluLWhlaWdodDogY2FsYygxMDB2aCAtIDYycHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIGB9PC9zdHlsZT5cbiAgICAgICAgICA8c3R5bGUganN4IGdsb2JhbD57YFxuICAgICAgICAgICAgLm1vZGFsLmluIHtcbiAgICAgICAgICAgICAgZGlzcGxheTogZmxleCAhaW1wb3J0YW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLm1vZGFsIC5tb2RhbC1kaWFsb2cge1xuICAgICAgICAgICAgICBtYXJnaW46IGF1dG87XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAubW9kYWwgLm1vZGFsLWNvbnRlbnQge1xuICAgICAgICAgICAgICBib3gtc2hhZG93OiBub25lO1xuICAgICAgICAgICAgICBib3JkZXI6IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAubW9kYWwgLm1vZGFsLWNvbnRlbnQgLm1vZGFsLWhlYWRlciBidXR0b24ge1xuICAgICAgICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLm1vZGFsIC5tb2RhbC1jb250ZW50IC5tb2RhbC1oZWFkZXIgYnV0dG9uIHNwYW46Zmlyc3QtY2hpbGQge1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB1cmwoXCIvc3RhdGljL2ltYWdlcy9idXR0b25zL2Nsb3NlL2Nsb3NlLnBuZ1wiKTtcbiAgICAgICAgICAgICAgd2lkdGg6IDE2cHg7XG4gICAgICAgICAgICAgIGhlaWdodDogMTZweDtcbiAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICAgIHRleHQtaW5kZW50OiAxMDAlO1xuICAgICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLm1vZGFsIC5tb2RhbC1jb250ZW50IC5tb2RhbC1oZWFkZXIgYnV0dG9uIHNwYW46Zmlyc3QtY2hpbGQ6aG92ZXIge1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB1cmwoXCIvc3RhdGljL2ltYWdlcy9idXR0b25zL2Nsb3NlL2Nsb3NlX2NsaWNrZWQucG5nXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLm1vZGFsIC5tb2RhbC1jb250ZW50IC5tb2RhbC1ib2R5IHtcbiAgICAgICAgICAgICAgcGFkZGluZzogNTBweCAyNXB4O1xuICAgICAgICAgICAgICBtaW4taGVpZ2h0OiAzMTBweDtcbiAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5tb2RhbCAubW9kYWwtY29udGVudCBoMiB7XG4gICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICAgICAgICAgIGZvbnQtc2l6ZTogMzVweDtcbiAgICAgICAgICAgICAgbWFyZ2luLXRvcDogMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5tb2RhbCAubW9kYWwtY29udGVudCBwIHtcbiAgICAgICAgICAgICAgZm9udC1zaXplOiAxNXB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLm1vZGFsIC5tb2RhbC1jb250ZW50IC5ub3RlIHtcbiAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICAgICAgICBtYXJnaW4tdG9wOiAxNXB4O1xuICAgICAgICAgICAgICBvcGFjaXR5OiAuNTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5tb2RhbCAubW9kYWwtY29udGVudCAubm90ZSBhIHtcbiAgICAgICAgICAgICAgY29sb3I6ICMxMzAwMjk7XG4gICAgICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLm1vZGFsLWJhY2tkcm9wIHtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgIzk4QjlFNSAwJSwgI0NCQ0FFMSAxMDAlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5tb2RhbC1iYWNrZHJvcC5pbiB7XG4gICAgICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAubW9kYWwtYmFja2Ryb3Auc2VtaSB7XG4gICAgICAgICAgICAgIG9wYWNpdHk6IC45O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLnJlZ2lzdGVyIC5kdXAtZXJyb3Ige1xuICAgICAgICAgICAgICBjb2xvcjogI2QwMDIxYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBgfTwvc3R5bGU+XG4gICAgICAgICAgPHN0eWxlIGpzeCBnbG9iYWw+e2BcbiAgICAgICAgICAgIGZvcm0ge1xuICAgICAgICAgICAgICB3aWR0aDogMzQwcHg7XG4gICAgICAgICAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9ybSAuZm9ybS1ncm91cCB7XG4gICAgICAgICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3JtIC5mb3JtLWdyb3VwIC5jb250cm9sLWxhYmVsIHtcbiAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgICAgICAgICAgZm9udC1zaXplOiAxMXB4O1xuICAgICAgICAgICAgICBvcGFjaXR5OiAuMzU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3JtIC5mb3JtLWdyb3VwIC5mb3JtLWNvbnRyb2xbdHlwZT10ZXh0XSxcbiAgICAgICAgICAgIGZvcm0gLmZvcm0tZ3JvdXAgLmZvcm0tY29udHJvbFt0eXBlPWVtYWlsXSxcbiAgICAgICAgICAgIGZvcm0gLmZvcm0tZ3JvdXAgLmZvcm0tY29udHJvbFt0eXBlPW51bWJlcl0ge1xuICAgICAgICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICAgICAgICBmb250LXNpemU6IDEzcHg7XG4gICAgICAgICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgICAgICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMxMzAwMjk7XG4gICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0YzRjRGQTtcbiAgICAgICAgICAgICAgcGFkZGluZzogMTBweCAxMnB4O1xuICAgICAgICAgICAgICBoZWlnaHQ6IDQwcHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3JtIC5mb3JtLWdyb3VwIC5mb3JtLWNvbnRyb2xbdHlwZT10ZXh0XVtyZWFkb25seV0sXG4gICAgICAgICAgICBmb3JtIC5mb3JtLWdyb3VwIC5mb3JtLWNvbnRyb2xbdHlwZT1lbWFpbF1bcmVhZG9ubHldLFxuICAgICAgICAgICAgZm9ybSAuZm9ybS1ncm91cCAuZm9ybS1jb250cm9sW3R5cGU9bnVtYmVyXVtyZWFkb25seV0ge1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjREZERkYwO1xuICAgICAgICAgICAgICBib3JkZXItYm90dG9tOiAwO1xuICAgICAgICAgICAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3JtIC5mb3JtLWdyb3VwLmhhcy1lcnJvciAuY29udHJvbC1sYWJlbCB7XG4gICAgICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgICAgICAgIGNvbG9yOiAjRDAwMjFCO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9ybSAuZm9ybS1ncm91cC5oYXMtZXJyb3IgLmZvcm0tY29udHJvbFt0eXBlPXRleHRdLFxuICAgICAgICAgICAgZm9ybSAuZm9ybS1ncm91cC5oYXMtZXJyb3IgLmZvcm0tY29udHJvbFt0eXBlPWVtYWlsXSxcbiAgICAgICAgICAgIGZvcm0gLmZvcm0tZ3JvdXAuaGFzLWVycm9yIC5mb3JtLWNvbnRyb2xbdHlwZT1udW1iZXJdIHtcbiAgICAgICAgICAgICAgY29sb3I6ICMwZDA4MjY7XG4gICAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjRDAwMjFCO1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkJERkU0O1xuICAgICAgICAgICAgICBvcGFjaXR5OiAuNzE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3JtIC5idG4ge1xuICAgICAgICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMTRCODg7XG4gICAgICAgICAgICAgIGNvbG9yOiAjZmZmZmZmO1xuICAgICAgICAgICAgICBib3JkZXI6IDA7XG4gICAgICAgICAgICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcm0gLmJ0bjpob3ZlcixcbiAgICAgICAgICAgIGZvcm0gLmJ0bjpmb2N1cyxcbiAgICAgICAgICAgIGZvcm0gLmJ0bjphY3RpdmUsXG4gICAgICAgICAgICBmb3JtIC5idG46Zm9jdXM6YWN0aXZlIHtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzUzNkVBRDtcbiAgICAgICAgICAgICAgY29sb3I6ICNmZmZmZmY7XG4gICAgICAgICAgICAgIG91dGxpbmU6IDA7XG4gICAgICAgICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgYH08L3N0eWxlPlxuICAgICAgICA8L0hlYWQ+XG4gICAgICAgIDxib2R5PlxuICAgICAgICAgIDxNYWluIC8+XG4gICAgICAgICAgPE5leHRTY3JpcHQgLz5cbiAgICAgICAgPC9ib2R5PlxuICAgICAgPC9odG1sPlxuICAgICk7XG4gIH1cbn1cbiJdfQ== */\n/*@ sourceURL=pages/_document.js */"
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_styled_jsx_style___default.a, {
        styleId: "4275433244",
        css: "body{font-family:\"futura-pt\",futura,\"Myriad Pro\",\"Proxima Nova\",sans-serif;color:#130029;}h2{font-size:24px;}a{color:#314B88;}a:hover{color:#536EAD;}.gap{padding-left:90px;padding-right:90px;}.grap{position:relative;float:left;width:calc(100vw - 285px);min-height:calc(100vh - 62px);}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL19kb2N1bWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEwQzZCLEFBR3lGLEFBSTNELEFBR0QsQUFHQSxBQUdJLEFBSUEsY0FUcEIsQUFHQSxDQU5BLEdBU3FCLEFBSVIsV0FDZSxRQUo1QixrQkFLZ0MsZUFuQmhCLGNBQ2hCLENBbUJBIiwiZmlsZSI6InBhZ2VzL19kb2N1bWVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvc2hhaW4vcmVwb3NpdG9yaWVzL2JpdGd1aWxkL1BvcnRhbENsaWVudCIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3JlYWN0LWluLWpzeC1zY29wZSAqL1xuaW1wb3J0IERvY3VtZW50LCB7SGVhZCwgTWFpbiwgTmV4dFNjcmlwdH0gZnJvbSBcIm5leHQvZG9jdW1lbnRcIjtcbmltcG9ydCBmbHVzaCBmcm9tIFwic3R5bGVkLWpzeC9zZXJ2ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQkdEb2N1bWVudCBleHRlbmRzIERvY3VtZW50IHtcbiAgc3RhdGljIGdldEluaXRpYWxQcm9wcyh7cmVuZGVyUGFnZX0pIHtcbiAgICBjb25zdCB7aHRtbCwgaGVhZCwgZXJyb3JIdG1sLCBjaHVua3N9ID0gcmVuZGVyUGFnZSgpO1xuICAgIGNvbnN0IHN0eWxlcyA9IGZsdXNoKCk7XG4gICAgcmV0dXJuIHtodG1sLCBoZWFkLCBlcnJvckh0bWwsIGNodW5rcywgc3R5bGVzfTtcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxodG1sPlxuICAgICAgICA8SGVhZD5cbiAgICAgICAgICA8bWV0YSBjaGFyU2V0PVwidXRmLThcIiAvPlxuICAgICAgICAgIDxtZXRhIGh0dHBFcXVpdj1cIlgtVUEtQ29tcGF0aWJsZVwiIGNvbnRlbnQ9XCJJRT1lZGdlXCIgLz5cbiAgICAgICAgICA8bWV0YSBodHRwRXF1aXY9XCJDb250ZW50LVR5cGVcIiBjb250ZW50PVwidGV4dC9odG1sOyBjaGFyc2V0PXV0Zi04XCIgLz5cbiAgICAgICAgICA8bWV0YSBuYW1lPVwiZGVzY3JpcHRpb25cIiBjb250ZW50PVwiQml0R3VpbGQgaXMgYSBkZWNlbnRyYWxpemVkIGdhbWluZyBwbGF0Zm9ybSBkZXNpZ25lZCB0byBlbGltaW5hdGUgYnVyZGVuc29tZSBmZWVzLCBmcmF1ZCwgYW5kIHJlZ3VsYXRpb25zIHdoaWxlIGNyZWF0aW5nIGEgdG9rZW5pemVkIGdhbWluZyBtYXJrZXRwbGFjZS5cIiAvPlxuICAgICAgICAgIDxtZXRhIG5hbWU9XCJrZXl3b3Jkc1wiIGNvbnRlbnQ9XCJrZXl3b3Jkc1wiIC8+XG4gICAgICAgICAgPG1ldGEgbmFtZT1cInJvYm90c1wiIGNvbnRlbnQ9XCJhbGxcIiAvPlxuICAgICAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MSwgdXNlci1zY2FsYWJsZT1ub1wiIC8+XG4gICAgICAgICAgPHRpdGxlPkJpdEd1aWxkPC90aXRsZT5cbiAgICAgICAgICA8bGluayByZWw9XCJzaG9ydGN1dCBpY29uXCIgaHJlZj17XCIvZmF2aWNvbi5wbmdcIn0gLz5cbiAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cImh0dHBzOi8vdXNlLnR5cGVraXQubmV0L3dvaTZlZ2suY3NzXCIgLz5cbiAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL25vcm1hbGl6ZS84LjAuMC9ub3JtYWxpemUubWluLmNzc1wiIC8+XG4gICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCJodHRwczovL21heGNkbi5ib290c3RyYXBjZG4uY29tL2Jvb3RzdHJhcC8zLjMuNy9jc3MvYm9vdHN0cmFwLm1pbi5jc3NcIiBpbnRlZ3JpdHk9XCJzaGEzODQtQlZZaWlTSUZlSzFkR21KUkFreWN1SEFIUmczMk9tVWN3dzdvbjNSWWRnNFZhK1BtU1Rzei9LNjh2YmRFamg0dVwiIGNyb3NzT3JpZ2luPVwiYW5vbnltb3VzXCIgLz5cblxuICAgICAgICAgIHt0aGlzLnByb3BzLnN0eWxlc31cblxuICAgICAgICAgIDxzdHlsZSBqc3ggZ2xvYmFsPntgXG4gICAgICAgICAgICAubm8tZ3V0dGVyIHtcbiAgICAgICAgICAgICAgcGFkZGluZy1yaWdodDogMDtcbiAgICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLm5vLXNlbGVjdHtcbiAgICAgICAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgICAgLWtodG1sLXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgICAtby11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgYH08L3N0eWxlPlxuICAgICAgICAgIDxzdHlsZSBnbG9iYWwganN4PntgXG4gICAgICAgICAgICBib2R5IHtcbiAgICAgICAgICAgICAgZm9udC1mYW1pbHk6IFwiZnV0dXJhLXB0XCIsIGZ1dHVyYSwgXCJNeXJpYWQgUHJvXCIsIFwiUHJveGltYSBOb3ZhXCIsIHNhbnMtc2VyaWY7XG4gICAgICAgICAgICAgIGNvbG9yOiAjMTMwMDI5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaDIge1xuICAgICAgICAgICAgICBmb250LXNpemU6IDI0cHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhIHtcbiAgICAgICAgICAgICAgY29sb3I6ICMzMTRCODg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhOmhvdmVyIHtcbiAgICAgICAgICAgICAgY29sb3I6ICM1MzZFQUQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuZ2FwIHtcbiAgICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiA5MHB4O1xuICAgICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiA5MHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmdyYXAge1xuICAgICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgICAgICAgICB3aWR0aDogY2FsYygxMDB2dyAtIDI4NXB4KTtcbiAgICAgICAgICAgICAgbWluLWhlaWdodDogY2FsYygxMDB2aCAtIDYycHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIGB9PC9zdHlsZT5cbiAgICAgICAgICA8c3R5bGUganN4IGdsb2JhbD57YFxuICAgICAgICAgICAgLm1vZGFsLmluIHtcbiAgICAgICAgICAgICAgZGlzcGxheTogZmxleCAhaW1wb3J0YW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLm1vZGFsIC5tb2RhbC1kaWFsb2cge1xuICAgICAgICAgICAgICBtYXJnaW46IGF1dG87XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAubW9kYWwgLm1vZGFsLWNvbnRlbnQge1xuICAgICAgICAgICAgICBib3gtc2hhZG93OiBub25lO1xuICAgICAgICAgICAgICBib3JkZXI6IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAubW9kYWwgLm1vZGFsLWNvbnRlbnQgLm1vZGFsLWhlYWRlciBidXR0b24ge1xuICAgICAgICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLm1vZGFsIC5tb2RhbC1jb250ZW50IC5tb2RhbC1oZWFkZXIgYnV0dG9uIHNwYW46Zmlyc3QtY2hpbGQge1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB1cmwoXCIvc3RhdGljL2ltYWdlcy9idXR0b25zL2Nsb3NlL2Nsb3NlLnBuZ1wiKTtcbiAgICAgICAgICAgICAgd2lkdGg6IDE2cHg7XG4gICAgICAgICAgICAgIGhlaWdodDogMTZweDtcbiAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICAgIHRleHQtaW5kZW50OiAxMDAlO1xuICAgICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLm1vZGFsIC5tb2RhbC1jb250ZW50IC5tb2RhbC1oZWFkZXIgYnV0dG9uIHNwYW46Zmlyc3QtY2hpbGQ6aG92ZXIge1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB1cmwoXCIvc3RhdGljL2ltYWdlcy9idXR0b25zL2Nsb3NlL2Nsb3NlX2NsaWNrZWQucG5nXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLm1vZGFsIC5tb2RhbC1jb250ZW50IC5tb2RhbC1ib2R5IHtcbiAgICAgICAgICAgICAgcGFkZGluZzogNTBweCAyNXB4O1xuICAgICAgICAgICAgICBtaW4taGVpZ2h0OiAzMTBweDtcbiAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5tb2RhbCAubW9kYWwtY29udGVudCBoMiB7XG4gICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICAgICAgICAgIGZvbnQtc2l6ZTogMzVweDtcbiAgICAgICAgICAgICAgbWFyZ2luLXRvcDogMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5tb2RhbCAubW9kYWwtY29udGVudCBwIHtcbiAgICAgICAgICAgICAgZm9udC1zaXplOiAxNXB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLm1vZGFsIC5tb2RhbC1jb250ZW50IC5ub3RlIHtcbiAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICAgICAgICBtYXJnaW4tdG9wOiAxNXB4O1xuICAgICAgICAgICAgICBvcGFjaXR5OiAuNTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5tb2RhbCAubW9kYWwtY29udGVudCAubm90ZSBhIHtcbiAgICAgICAgICAgICAgY29sb3I6ICMxMzAwMjk7XG4gICAgICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLm1vZGFsLWJhY2tkcm9wIHtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgIzk4QjlFNSAwJSwgI0NCQ0FFMSAxMDAlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5tb2RhbC1iYWNrZHJvcC5pbiB7XG4gICAgICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAubW9kYWwtYmFja2Ryb3Auc2VtaSB7XG4gICAgICAgICAgICAgIG9wYWNpdHk6IC45O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLnJlZ2lzdGVyIC5kdXAtZXJyb3Ige1xuICAgICAgICAgICAgICBjb2xvcjogI2QwMDIxYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBgfTwvc3R5bGU+XG4gICAgICAgICAgPHN0eWxlIGpzeCBnbG9iYWw+e2BcbiAgICAgICAgICAgIGZvcm0ge1xuICAgICAgICAgICAgICB3aWR0aDogMzQwcHg7XG4gICAgICAgICAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9ybSAuZm9ybS1ncm91cCB7XG4gICAgICAgICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3JtIC5mb3JtLWdyb3VwIC5jb250cm9sLWxhYmVsIHtcbiAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgICAgICAgICAgZm9udC1zaXplOiAxMXB4O1xuICAgICAgICAgICAgICBvcGFjaXR5OiAuMzU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3JtIC5mb3JtLWdyb3VwIC5mb3JtLWNvbnRyb2xbdHlwZT10ZXh0XSxcbiAgICAgICAgICAgIGZvcm0gLmZvcm0tZ3JvdXAgLmZvcm0tY29udHJvbFt0eXBlPWVtYWlsXSxcbiAgICAgICAgICAgIGZvcm0gLmZvcm0tZ3JvdXAgLmZvcm0tY29udHJvbFt0eXBlPW51bWJlcl0ge1xuICAgICAgICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICAgICAgICBmb250LXNpemU6IDEzcHg7XG4gICAgICAgICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgICAgICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMxMzAwMjk7XG4gICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0YzRjRGQTtcbiAgICAgICAgICAgICAgcGFkZGluZzogMTBweCAxMnB4O1xuICAgICAgICAgICAgICBoZWlnaHQ6IDQwcHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3JtIC5mb3JtLWdyb3VwIC5mb3JtLWNvbnRyb2xbdHlwZT10ZXh0XVtyZWFkb25seV0sXG4gICAgICAgICAgICBmb3JtIC5mb3JtLWdyb3VwIC5mb3JtLWNvbnRyb2xbdHlwZT1lbWFpbF1bcmVhZG9ubHldLFxuICAgICAgICAgICAgZm9ybSAuZm9ybS1ncm91cCAuZm9ybS1jb250cm9sW3R5cGU9bnVtYmVyXVtyZWFkb25seV0ge1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjREZERkYwO1xuICAgICAgICAgICAgICBib3JkZXItYm90dG9tOiAwO1xuICAgICAgICAgICAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3JtIC5mb3JtLWdyb3VwLmhhcy1lcnJvciAuY29udHJvbC1sYWJlbCB7XG4gICAgICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgICAgICAgIGNvbG9yOiAjRDAwMjFCO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9ybSAuZm9ybS1ncm91cC5oYXMtZXJyb3IgLmZvcm0tY29udHJvbFt0eXBlPXRleHRdLFxuICAgICAgICAgICAgZm9ybSAuZm9ybS1ncm91cC5oYXMtZXJyb3IgLmZvcm0tY29udHJvbFt0eXBlPWVtYWlsXSxcbiAgICAgICAgICAgIGZvcm0gLmZvcm0tZ3JvdXAuaGFzLWVycm9yIC5mb3JtLWNvbnRyb2xbdHlwZT1udW1iZXJdIHtcbiAgICAgICAgICAgICAgY29sb3I6ICMwZDA4MjY7XG4gICAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjRDAwMjFCO1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkJERkU0O1xuICAgICAgICAgICAgICBvcGFjaXR5OiAuNzE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3JtIC5idG4ge1xuICAgICAgICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMTRCODg7XG4gICAgICAgICAgICAgIGNvbG9yOiAjZmZmZmZmO1xuICAgICAgICAgICAgICBib3JkZXI6IDA7XG4gICAgICAgICAgICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcm0gLmJ0bjpob3ZlcixcbiAgICAgICAgICAgIGZvcm0gLmJ0bjpmb2N1cyxcbiAgICAgICAgICAgIGZvcm0gLmJ0bjphY3RpdmUsXG4gICAgICAgICAgICBmb3JtIC5idG46Zm9jdXM6YWN0aXZlIHtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzUzNkVBRDtcbiAgICAgICAgICAgICAgY29sb3I6ICNmZmZmZmY7XG4gICAgICAgICAgICAgIG91dGxpbmU6IDA7XG4gICAgICAgICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgYH08L3N0eWxlPlxuICAgICAgICA8L0hlYWQ+XG4gICAgICAgIDxib2R5PlxuICAgICAgICAgIDxNYWluIC8+XG4gICAgICAgICAgPE5leHRTY3JpcHQgLz5cbiAgICAgICAgPC9ib2R5PlxuICAgICAgPC9odG1sPlxuICAgICk7XG4gIH1cbn1cbiJdfQ== */\n/*@ sourceURL=pages/_document.js */"
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_styled_jsx_style___default.a, {
        styleId: "1762769153",
        css: ".modal.in{display:-webkit-box !important;display:-webkit-flex !important;display:-ms-flexbox !important;display:flex !important;}.modal .modal-dialog{margin:auto;}.modal .modal-content{box-shadow:none;border:0;}.modal .modal-content .modal-header button{opacity:1;}.modal .modal-content .modal-header button span:first-child{background:url(\"/static/images/buttons/close/close.png\");width:16px;height:16px;display:block;text-indent:100%;overflow:hidden;}.modal .modal-content .modal-header button span:first-child:hover{background:url(\"/static/images/buttons/close/close_clicked.png\");}.modal .modal-content .modal-body{padding:50px 25px;min-height:310px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;text-align:center;}.modal .modal-content h2{font-weight:500;font-size:35px;margin-top:0;}.modal .modal-content p{font-size:15px;}.modal .modal-content .note{font-weight:400;font-size:12px;margin-top:15px;opacity:.5;}.modal .modal-content .note a{color:#130029;-webkit-text-decoration:underline;text-decoration:underline;}.modal-backdrop{background:linear-gradient(to bottom,#98B9E5 0%,#CBCAE1 100%);}.modal-backdrop.in{opacity:1;}.modal-backdrop.semi{opacity:.9;}.register .dup-error{color:#d0021b;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL19kb2N1bWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFtRTZCLEFBR3VDLEFBR1osQUFHSSxBQUlOLEFBRytDLEFBUVEsQUFHL0MsQUFRRixBQUtELEFBR0MsQUFNRixBQUlrRCxBQUd0RCxBQUdDLEFBR0csVUFoRGhCLEFBMkNBLENBR0EsQ0FyREEsRUEyQzRCLEFBYTVCLENBdEJBLENBL0JXLEFBMEJNLEFBUUEsRUFoQkUsT0FqQm5CLE1BMEJlLEFBUUcsSUFoQkgsU0FTZixHQVFhLFVBN0JBLENBOEJiLElBT0EsR0E3QkEsR0FQYyxNQWlDZCxNQWhDZ0IsY0FDRyxlQVVNLEVBVFAsT0FqQmxCLFNBa0JBLGlGQVNxQiw2RkFDRCxrQkFDcEIiLCJmaWxlIjoicGFnZXMvX2RvY3VtZW50LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9zaGFpbi9yZXBvc2l0b3JpZXMvYml0Z3VpbGQvUG9ydGFsQ2xpZW50Iiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcmVhY3QtaW4tanN4LXNjb3BlICovXG5pbXBvcnQgRG9jdW1lbnQsIHtIZWFkLCBNYWluLCBOZXh0U2NyaXB0fSBmcm9tIFwibmV4dC9kb2N1bWVudFwiO1xuaW1wb3J0IGZsdXNoIGZyb20gXCJzdHlsZWQtanN4L3NlcnZlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCR0RvY3VtZW50IGV4dGVuZHMgRG9jdW1lbnQge1xuICBzdGF0aWMgZ2V0SW5pdGlhbFByb3BzKHtyZW5kZXJQYWdlfSkge1xuICAgIGNvbnN0IHtodG1sLCBoZWFkLCBlcnJvckh0bWwsIGNodW5rc30gPSByZW5kZXJQYWdlKCk7XG4gICAgY29uc3Qgc3R5bGVzID0gZmx1c2goKTtcbiAgICByZXR1cm4ge2h0bWwsIGhlYWQsIGVycm9ySHRtbCwgY2h1bmtzLCBzdHlsZXN9O1xuICB9XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGh0bWw+XG4gICAgICAgIDxIZWFkPlxuICAgICAgICAgIDxtZXRhIGNoYXJTZXQ9XCJ1dGYtOFwiIC8+XG4gICAgICAgICAgPG1ldGEgaHR0cEVxdWl2PVwiWC1VQS1Db21wYXRpYmxlXCIgY29udGVudD1cIklFPWVkZ2VcIiAvPlxuICAgICAgICAgIDxtZXRhIGh0dHBFcXVpdj1cIkNvbnRlbnQtVHlwZVwiIGNvbnRlbnQ9XCJ0ZXh0L2h0bWw7IGNoYXJzZXQ9dXRmLThcIiAvPlxuICAgICAgICAgIDxtZXRhIG5hbWU9XCJkZXNjcmlwdGlvblwiIGNvbnRlbnQ9XCJCaXRHdWlsZCBpcyBhIGRlY2VudHJhbGl6ZWQgZ2FtaW5nIHBsYXRmb3JtIGRlc2lnbmVkIHRvIGVsaW1pbmF0ZSBidXJkZW5zb21lIGZlZXMsIGZyYXVkLCBhbmQgcmVndWxhdGlvbnMgd2hpbGUgY3JlYXRpbmcgYSB0b2tlbml6ZWQgZ2FtaW5nIG1hcmtldHBsYWNlLlwiIC8+XG4gICAgICAgICAgPG1ldGEgbmFtZT1cImtleXdvcmRzXCIgY29udGVudD1cImtleXdvcmRzXCIgLz5cbiAgICAgICAgICA8bWV0YSBuYW1lPVwicm9ib3RzXCIgY29udGVudD1cImFsbFwiIC8+XG4gICAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLCB1c2VyLXNjYWxhYmxlPW5vXCIgLz5cbiAgICAgICAgICA8dGl0bGU+Qml0R3VpbGQ8L3RpdGxlPlxuICAgICAgICAgIDxsaW5rIHJlbD1cInNob3J0Y3V0IGljb25cIiBocmVmPXtcIi9mYXZpY29uLnBuZ1wifSAvPlxuICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiaHR0cHM6Ly91c2UudHlwZWtpdC5uZXQvd29pNmVnay5jc3NcIiAvPlxuICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvbm9ybWFsaXplLzguMC4wL25vcm1hbGl6ZS5taW4uY3NzXCIgLz5cbiAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cImh0dHBzOi8vbWF4Y2RuLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN0cmFwLzMuMy43L2Nzcy9ib290c3RyYXAubWluLmNzc1wiIGludGVncml0eT1cInNoYTM4NC1CVllpaVNJRmVLMWRHbUpSQWt5Y3VIQUhSZzMyT21VY3d3N29uM1JZZGc0VmErUG1TVHN6L0s2OHZiZEVqaDR1XCIgY3Jvc3NPcmlnaW49XCJhbm9ueW1vdXNcIiAvPlxuXG4gICAgICAgICAge3RoaXMucHJvcHMuc3R5bGVzfVxuXG4gICAgICAgICAgPHN0eWxlIGpzeCBnbG9iYWw+e2BcbiAgICAgICAgICAgIC5uby1ndXR0ZXIge1xuICAgICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiAwO1xuICAgICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAubm8tc2VsZWN0e1xuICAgICAgICAgICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICAgIC1vLXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBgfTwvc3R5bGU+XG4gICAgICAgICAgPHN0eWxlIGdsb2JhbCBqc3g+e2BcbiAgICAgICAgICAgIGJvZHkge1xuICAgICAgICAgICAgICBmb250LWZhbWlseTogXCJmdXR1cmEtcHRcIiwgZnV0dXJhLCBcIk15cmlhZCBQcm9cIiwgXCJQcm94aW1hIE5vdmFcIiwgc2Fucy1zZXJpZjtcbiAgICAgICAgICAgICAgY29sb3I6ICMxMzAwMjk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBoMiB7XG4gICAgICAgICAgICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGEge1xuICAgICAgICAgICAgICBjb2xvcjogIzMxNEI4ODtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGE6aG92ZXIge1xuICAgICAgICAgICAgICBjb2xvcjogIzUzNkVBRDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5nYXAge1xuICAgICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDkwcHg7XG4gICAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDkwcHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuZ3JhcCB7XG4gICAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICAgICAgZmxvYXQ6IGxlZnQ7XG4gICAgICAgICAgICAgIHdpZHRoOiBjYWxjKDEwMHZ3IC0gMjg1cHgpO1xuICAgICAgICAgICAgICBtaW4taGVpZ2h0OiBjYWxjKDEwMHZoIC0gNjJweCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgYH08L3N0eWxlPlxuICAgICAgICAgIDxzdHlsZSBqc3ggZ2xvYmFsPntgXG4gICAgICAgICAgICAubW9kYWwuaW4ge1xuICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4ICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAubW9kYWwgLm1vZGFsLWRpYWxvZyB7XG4gICAgICAgICAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5tb2RhbCAubW9kYWwtY29udGVudCB7XG4gICAgICAgICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgICAgICAgICAgIGJvcmRlcjogMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5tb2RhbCAubW9kYWwtY29udGVudCAubW9kYWwtaGVhZGVyIGJ1dHRvbiB7XG4gICAgICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAubW9kYWwgLm1vZGFsLWNvbnRlbnQgLm1vZGFsLWhlYWRlciBidXR0b24gc3BhbjpmaXJzdC1jaGlsZCB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHVybChcIi9zdGF0aWMvaW1hZ2VzL2J1dHRvbnMvY2xvc2UvY2xvc2UucG5nXCIpO1xuICAgICAgICAgICAgICB3aWR0aDogMTZweDtcbiAgICAgICAgICAgICAgaGVpZ2h0OiAxNnB4O1xuICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgICAgdGV4dC1pbmRlbnQ6IDEwMCU7XG4gICAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAubW9kYWwgLm1vZGFsLWNvbnRlbnQgLm1vZGFsLWhlYWRlciBidXR0b24gc3BhbjpmaXJzdC1jaGlsZDpob3ZlciB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHVybChcIi9zdGF0aWMvaW1hZ2VzL2J1dHRvbnMvY2xvc2UvY2xvc2VfY2xpY2tlZC5wbmdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAubW9kYWwgLm1vZGFsLWNvbnRlbnQgLm1vZGFsLWJvZHkge1xuICAgICAgICAgICAgICBwYWRkaW5nOiA1MHB4IDI1cHg7XG4gICAgICAgICAgICAgIG1pbi1oZWlnaHQ6IDMxMHB4O1xuICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLm1vZGFsIC5tb2RhbC1jb250ZW50IGgyIHtcbiAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgICAgICAgICAgZm9udC1zaXplOiAzNXB4O1xuICAgICAgICAgICAgICBtYXJnaW4tdG9wOiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLm1vZGFsIC5tb2RhbC1jb250ZW50IHAge1xuICAgICAgICAgICAgICBmb250LXNpemU6IDE1cHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAubW9kYWwgLm1vZGFsLWNvbnRlbnQgLm5vdGUge1xuICAgICAgICAgICAgICBmb250LXdlaWdodDogNDAwO1xuICAgICAgICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgICAgICAgIG1hcmdpbi10b3A6IDE1cHg7XG4gICAgICAgICAgICAgIG9wYWNpdHk6IC41O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLm1vZGFsIC5tb2RhbC1jb250ZW50IC5ub3RlIGEge1xuICAgICAgICAgICAgICBjb2xvcjogIzEzMDAyOTtcbiAgICAgICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAubW9kYWwtYmFja2Ryb3Age1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCAjOThCOUU1IDAlLCAjQ0JDQUUxIDEwMCUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLm1vZGFsLWJhY2tkcm9wLmluIHtcbiAgICAgICAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5tb2RhbC1iYWNrZHJvcC5zZW1pIHtcbiAgICAgICAgICAgICAgb3BhY2l0eTogLjk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAucmVnaXN0ZXIgLmR1cC1lcnJvciB7XG4gICAgICAgICAgICAgIGNvbG9yOiAjZDAwMjFiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIGB9PC9zdHlsZT5cbiAgICAgICAgICA8c3R5bGUganN4IGdsb2JhbD57YFxuICAgICAgICAgICAgZm9ybSB7XG4gICAgICAgICAgICAgIHdpZHRoOiAzNDBweDtcbiAgICAgICAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3JtIC5mb3JtLWdyb3VwIHtcbiAgICAgICAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcm0gLmZvcm0tZ3JvdXAgLmNvbnRyb2wtbGFiZWwge1xuICAgICAgICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICAgICAgICBmb250LXNpemU6IDExcHg7XG4gICAgICAgICAgICAgIG9wYWNpdHk6IC4zNTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcm0gLmZvcm0tZ3JvdXAgLmZvcm0tY29udHJvbFt0eXBlPXRleHRdLFxuICAgICAgICAgICAgZm9ybSAuZm9ybS1ncm91cCAuZm9ybS1jb250cm9sW3R5cGU9ZW1haWxdLFxuICAgICAgICAgICAgZm9ybSAuZm9ybS1ncm91cCAuZm9ybS1jb250cm9sW3R5cGU9bnVtYmVyXSB7XG4gICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgICAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICAgICAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzEzMDAyOTtcbiAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjNGNEZBO1xuICAgICAgICAgICAgICBwYWRkaW5nOiAxMHB4IDEycHg7XG4gICAgICAgICAgICAgIGhlaWdodDogNDBweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcm0gLmZvcm0tZ3JvdXAgLmZvcm0tY29udHJvbFt0eXBlPXRleHRdW3JlYWRvbmx5XSxcbiAgICAgICAgICAgIGZvcm0gLmZvcm0tZ3JvdXAgLmZvcm0tY29udHJvbFt0eXBlPWVtYWlsXVtyZWFkb25seV0sXG4gICAgICAgICAgICBmb3JtIC5mb3JtLWdyb3VwIC5mb3JtLWNvbnRyb2xbdHlwZT1udW1iZXJdW3JlYWRvbmx5XSB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNERkRGRjA7XG4gICAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDA7XG4gICAgICAgICAgICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcm0gLmZvcm0tZ3JvdXAuaGFzLWVycm9yIC5jb250cm9sLWxhYmVsIHtcbiAgICAgICAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgICAgICAgY29sb3I6ICNEMDAyMUI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3JtIC5mb3JtLWdyb3VwLmhhcy1lcnJvciAuZm9ybS1jb250cm9sW3R5cGU9dGV4dF0sXG4gICAgICAgICAgICBmb3JtIC5mb3JtLWdyb3VwLmhhcy1lcnJvciAuZm9ybS1jb250cm9sW3R5cGU9ZW1haWxdLFxuICAgICAgICAgICAgZm9ybSAuZm9ybS1ncm91cC5oYXMtZXJyb3IgLmZvcm0tY29udHJvbFt0eXBlPW51bWJlcl0ge1xuICAgICAgICAgICAgICBjb2xvcjogIzBkMDgyNjtcbiAgICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNEMDAyMUI7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNGQkRGRTQ7XG4gICAgICAgICAgICAgIG9wYWNpdHk6IC43MTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcm0gLmJ0biB7XG4gICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzMxNEI4ODtcbiAgICAgICAgICAgICAgY29sb3I6ICNmZmZmZmY7XG4gICAgICAgICAgICAgIGJvcmRlcjogMDtcbiAgICAgICAgICAgICAgcGFkZGluZzogMTBweDtcbiAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9ybSAuYnRuOmhvdmVyLFxuICAgICAgICAgICAgZm9ybSAuYnRuOmZvY3VzLFxuICAgICAgICAgICAgZm9ybSAuYnRuOmFjdGl2ZSxcbiAgICAgICAgICAgIGZvcm0gLmJ0bjpmb2N1czphY3RpdmUge1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTM2RUFEO1xuICAgICAgICAgICAgICBjb2xvcjogI2ZmZmZmZjtcbiAgICAgICAgICAgICAgb3V0bGluZTogMDtcbiAgICAgICAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBgfTwvc3R5bGU+XG4gICAgICAgIDwvSGVhZD5cbiAgICAgICAgPGJvZHk+XG4gICAgICAgICAgPE1haW4gLz5cbiAgICAgICAgICA8TmV4dFNjcmlwdCAvPlxuICAgICAgICA8L2JvZHk+XG4gICAgICA8L2h0bWw+XG4gICAgKTtcbiAgfVxufVxuIl19 */\n/*@ sourceURL=pages/_document.js */"
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_styled_jsx_style___default.a, {
        styleId: "1797082563",
        css: "form{width:340px;margin:0 auto;}form .form-group{text-align:left;}form .form-group .control-label{font-weight:500;font-size:11px;opacity:.35;}form .form-group .form-control[type=text],form .form-group .form-control[type=email],form .form-group .form-control[type=number]{font-weight:500;font-size:13px;box-shadow:none;border:none;border-bottom:1px solid #130029;border-radius:4px;background-color:#F3F4FA;padding:10px 12px;height:40px;}form .form-group .form-control[type=text][readonly],form .form-group .form-control[type=email][readonly],form .form-group .form-control[type=number][readonly]{background-color:#DFDFF0;border-bottom:0;cursor:default;}form .form-group.has-error .control-label{opacity:1;color:#D0021B;}form .form-group.has-error .form-control[type=text],form .form-group.has-error .form-control[type=email],form .form-group.has-error .form-control[type=number]{color:#0d0826;border-bottom:1px solid #D0021B;background-color:#FBDFE4;opacity:.71;}form .btn{font-size:14px;background-color:#314B88;color:#ffffff;border:0;padding:10px;border-radius:2px;}form .btn:hover,form .btn:focus,form .btn:active,form .btn:focus:active{background-color:#536EAD;color:#ffffff;outline:0;box-shadow:none;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL19kb2N1bWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFtSTZCLEFBRzJCLEFBSUksQUFHQSxBQU9BLEFBYVMsQUFLZixBQU1JLEFBTUMsQUFXVSxVQXRCWCxFQWhDQSxFQXNDa0IsQ0FNUCxDQXhDM0IsQUFHaUIsQUFPQSxRQW1CakIsQ0FOa0IsQUE0QkYsQ0F0RGhCLEtBT2MsQUFPSSxRQXlDTixDQVhJLENBakJDLEVBbkJqQixHQThCMkIsQ0F2QmIsRUF5Q0ksS0FYUCxFQWpCWCxHQVprQyxJQThCbkIsRUFXZixNQWxCYyxLQVFNLE9BUHBCLFFBdkJvQixHQStCcEIsZUE5QjJCLHlCQUNQLGtCQUNOLFlBQ2QiLCJmaWxlIjoicGFnZXMvX2RvY3VtZW50LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9zaGFpbi9yZXBvc2l0b3JpZXMvYml0Z3VpbGQvUG9ydGFsQ2xpZW50Iiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcmVhY3QtaW4tanN4LXNjb3BlICovXG5pbXBvcnQgRG9jdW1lbnQsIHtIZWFkLCBNYWluLCBOZXh0U2NyaXB0fSBmcm9tIFwibmV4dC9kb2N1bWVudFwiO1xuaW1wb3J0IGZsdXNoIGZyb20gXCJzdHlsZWQtanN4L3NlcnZlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCR0RvY3VtZW50IGV4dGVuZHMgRG9jdW1lbnQge1xuICBzdGF0aWMgZ2V0SW5pdGlhbFByb3BzKHtyZW5kZXJQYWdlfSkge1xuICAgIGNvbnN0IHtodG1sLCBoZWFkLCBlcnJvckh0bWwsIGNodW5rc30gPSByZW5kZXJQYWdlKCk7XG4gICAgY29uc3Qgc3R5bGVzID0gZmx1c2goKTtcbiAgICByZXR1cm4ge2h0bWwsIGhlYWQsIGVycm9ySHRtbCwgY2h1bmtzLCBzdHlsZXN9O1xuICB9XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGh0bWw+XG4gICAgICAgIDxIZWFkPlxuICAgICAgICAgIDxtZXRhIGNoYXJTZXQ9XCJ1dGYtOFwiIC8+XG4gICAgICAgICAgPG1ldGEgaHR0cEVxdWl2PVwiWC1VQS1Db21wYXRpYmxlXCIgY29udGVudD1cIklFPWVkZ2VcIiAvPlxuICAgICAgICAgIDxtZXRhIGh0dHBFcXVpdj1cIkNvbnRlbnQtVHlwZVwiIGNvbnRlbnQ9XCJ0ZXh0L2h0bWw7IGNoYXJzZXQ9dXRmLThcIiAvPlxuICAgICAgICAgIDxtZXRhIG5hbWU9XCJkZXNjcmlwdGlvblwiIGNvbnRlbnQ9XCJCaXRHdWlsZCBpcyBhIGRlY2VudHJhbGl6ZWQgZ2FtaW5nIHBsYXRmb3JtIGRlc2lnbmVkIHRvIGVsaW1pbmF0ZSBidXJkZW5zb21lIGZlZXMsIGZyYXVkLCBhbmQgcmVndWxhdGlvbnMgd2hpbGUgY3JlYXRpbmcgYSB0b2tlbml6ZWQgZ2FtaW5nIG1hcmtldHBsYWNlLlwiIC8+XG4gICAgICAgICAgPG1ldGEgbmFtZT1cImtleXdvcmRzXCIgY29udGVudD1cImtleXdvcmRzXCIgLz5cbiAgICAgICAgICA8bWV0YSBuYW1lPVwicm9ib3RzXCIgY29udGVudD1cImFsbFwiIC8+XG4gICAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLCB1c2VyLXNjYWxhYmxlPW5vXCIgLz5cbiAgICAgICAgICA8dGl0bGU+Qml0R3VpbGQ8L3RpdGxlPlxuICAgICAgICAgIDxsaW5rIHJlbD1cInNob3J0Y3V0IGljb25cIiBocmVmPXtcIi9mYXZpY29uLnBuZ1wifSAvPlxuICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiaHR0cHM6Ly91c2UudHlwZWtpdC5uZXQvd29pNmVnay5jc3NcIiAvPlxuICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvbm9ybWFsaXplLzguMC4wL25vcm1hbGl6ZS5taW4uY3NzXCIgLz5cbiAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cImh0dHBzOi8vbWF4Y2RuLmJvb3RzdHJhcGNkbi5jb20vYm9vdHN0cmFwLzMuMy43L2Nzcy9ib290c3RyYXAubWluLmNzc1wiIGludGVncml0eT1cInNoYTM4NC1CVllpaVNJRmVLMWRHbUpSQWt5Y3VIQUhSZzMyT21VY3d3N29uM1JZZGc0VmErUG1TVHN6L0s2OHZiZEVqaDR1XCIgY3Jvc3NPcmlnaW49XCJhbm9ueW1vdXNcIiAvPlxuXG4gICAgICAgICAge3RoaXMucHJvcHMuc3R5bGVzfVxuXG4gICAgICAgICAgPHN0eWxlIGpzeCBnbG9iYWw+e2BcbiAgICAgICAgICAgIC5uby1ndXR0ZXIge1xuICAgICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiAwO1xuICAgICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAubm8tc2VsZWN0e1xuICAgICAgICAgICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICAgIC1vLXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBgfTwvc3R5bGU+XG4gICAgICAgICAgPHN0eWxlIGdsb2JhbCBqc3g+e2BcbiAgICAgICAgICAgIGJvZHkge1xuICAgICAgICAgICAgICBmb250LWZhbWlseTogXCJmdXR1cmEtcHRcIiwgZnV0dXJhLCBcIk15cmlhZCBQcm9cIiwgXCJQcm94aW1hIE5vdmFcIiwgc2Fucy1zZXJpZjtcbiAgICAgICAgICAgICAgY29sb3I6ICMxMzAwMjk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBoMiB7XG4gICAgICAgICAgICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGEge1xuICAgICAgICAgICAgICBjb2xvcjogIzMxNEI4ODtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGE6aG92ZXIge1xuICAgICAgICAgICAgICBjb2xvcjogIzUzNkVBRDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5nYXAge1xuICAgICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDkwcHg7XG4gICAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDkwcHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuZ3JhcCB7XG4gICAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICAgICAgZmxvYXQ6IGxlZnQ7XG4gICAgICAgICAgICAgIHdpZHRoOiBjYWxjKDEwMHZ3IC0gMjg1cHgpO1xuICAgICAgICAgICAgICBtaW4taGVpZ2h0OiBjYWxjKDEwMHZoIC0gNjJweCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgYH08L3N0eWxlPlxuICAgICAgICAgIDxzdHlsZSBqc3ggZ2xvYmFsPntgXG4gICAgICAgICAgICAubW9kYWwuaW4ge1xuICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4ICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAubW9kYWwgLm1vZGFsLWRpYWxvZyB7XG4gICAgICAgICAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5tb2RhbCAubW9kYWwtY29udGVudCB7XG4gICAgICAgICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgICAgICAgICAgIGJvcmRlcjogMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5tb2RhbCAubW9kYWwtY29udGVudCAubW9kYWwtaGVhZGVyIGJ1dHRvbiB7XG4gICAgICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAubW9kYWwgLm1vZGFsLWNvbnRlbnQgLm1vZGFsLWhlYWRlciBidXR0b24gc3BhbjpmaXJzdC1jaGlsZCB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHVybChcIi9zdGF0aWMvaW1hZ2VzL2J1dHRvbnMvY2xvc2UvY2xvc2UucG5nXCIpO1xuICAgICAgICAgICAgICB3aWR0aDogMTZweDtcbiAgICAgICAgICAgICAgaGVpZ2h0OiAxNnB4O1xuICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgICAgdGV4dC1pbmRlbnQ6IDEwMCU7XG4gICAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAubW9kYWwgLm1vZGFsLWNvbnRlbnQgLm1vZGFsLWhlYWRlciBidXR0b24gc3BhbjpmaXJzdC1jaGlsZDpob3ZlciB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHVybChcIi9zdGF0aWMvaW1hZ2VzL2J1dHRvbnMvY2xvc2UvY2xvc2VfY2xpY2tlZC5wbmdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAubW9kYWwgLm1vZGFsLWNvbnRlbnQgLm1vZGFsLWJvZHkge1xuICAgICAgICAgICAgICBwYWRkaW5nOiA1MHB4IDI1cHg7XG4gICAgICAgICAgICAgIG1pbi1oZWlnaHQ6IDMxMHB4O1xuICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLm1vZGFsIC5tb2RhbC1jb250ZW50IGgyIHtcbiAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgICAgICAgICAgZm9udC1zaXplOiAzNXB4O1xuICAgICAgICAgICAgICBtYXJnaW4tdG9wOiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLm1vZGFsIC5tb2RhbC1jb250ZW50IHAge1xuICAgICAgICAgICAgICBmb250LXNpemU6IDE1cHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAubW9kYWwgLm1vZGFsLWNvbnRlbnQgLm5vdGUge1xuICAgICAgICAgICAgICBmb250LXdlaWdodDogNDAwO1xuICAgICAgICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgICAgICAgIG1hcmdpbi10b3A6IDE1cHg7XG4gICAgICAgICAgICAgIG9wYWNpdHk6IC41O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLm1vZGFsIC5tb2RhbC1jb250ZW50IC5ub3RlIGEge1xuICAgICAgICAgICAgICBjb2xvcjogIzEzMDAyOTtcbiAgICAgICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAubW9kYWwtYmFja2Ryb3Age1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCAjOThCOUU1IDAlLCAjQ0JDQUUxIDEwMCUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLm1vZGFsLWJhY2tkcm9wLmluIHtcbiAgICAgICAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5tb2RhbC1iYWNrZHJvcC5zZW1pIHtcbiAgICAgICAgICAgICAgb3BhY2l0eTogLjk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAucmVnaXN0ZXIgLmR1cC1lcnJvciB7XG4gICAgICAgICAgICAgIGNvbG9yOiAjZDAwMjFiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIGB9PC9zdHlsZT5cbiAgICAgICAgICA8c3R5bGUganN4IGdsb2JhbD57YFxuICAgICAgICAgICAgZm9ybSB7XG4gICAgICAgICAgICAgIHdpZHRoOiAzNDBweDtcbiAgICAgICAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3JtIC5mb3JtLWdyb3VwIHtcbiAgICAgICAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcm0gLmZvcm0tZ3JvdXAgLmNvbnRyb2wtbGFiZWwge1xuICAgICAgICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICAgICAgICBmb250LXNpemU6IDExcHg7XG4gICAgICAgICAgICAgIG9wYWNpdHk6IC4zNTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcm0gLmZvcm0tZ3JvdXAgLmZvcm0tY29udHJvbFt0eXBlPXRleHRdLFxuICAgICAgICAgICAgZm9ybSAuZm9ybS1ncm91cCAuZm9ybS1jb250cm9sW3R5cGU9ZW1haWxdLFxuICAgICAgICAgICAgZm9ybSAuZm9ybS1ncm91cCAuZm9ybS1jb250cm9sW3R5cGU9bnVtYmVyXSB7XG4gICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgICAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICAgICAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzEzMDAyOTtcbiAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjNGNEZBO1xuICAgICAgICAgICAgICBwYWRkaW5nOiAxMHB4IDEycHg7XG4gICAgICAgICAgICAgIGhlaWdodDogNDBweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcm0gLmZvcm0tZ3JvdXAgLmZvcm0tY29udHJvbFt0eXBlPXRleHRdW3JlYWRvbmx5XSxcbiAgICAgICAgICAgIGZvcm0gLmZvcm0tZ3JvdXAgLmZvcm0tY29udHJvbFt0eXBlPWVtYWlsXVtyZWFkb25seV0sXG4gICAgICAgICAgICBmb3JtIC5mb3JtLWdyb3VwIC5mb3JtLWNvbnRyb2xbdHlwZT1udW1iZXJdW3JlYWRvbmx5XSB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNERkRGRjA7XG4gICAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDA7XG4gICAgICAgICAgICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcm0gLmZvcm0tZ3JvdXAuaGFzLWVycm9yIC5jb250cm9sLWxhYmVsIHtcbiAgICAgICAgICAgICAgb3BhY2l0eTogMTtcbiAgICAgICAgICAgICAgY29sb3I6ICNEMDAyMUI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3JtIC5mb3JtLWdyb3VwLmhhcy1lcnJvciAuZm9ybS1jb250cm9sW3R5cGU9dGV4dF0sXG4gICAgICAgICAgICBmb3JtIC5mb3JtLWdyb3VwLmhhcy1lcnJvciAuZm9ybS1jb250cm9sW3R5cGU9ZW1haWxdLFxuICAgICAgICAgICAgZm9ybSAuZm9ybS1ncm91cC5oYXMtZXJyb3IgLmZvcm0tY29udHJvbFt0eXBlPW51bWJlcl0ge1xuICAgICAgICAgICAgICBjb2xvcjogIzBkMDgyNjtcbiAgICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNEMDAyMUI7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNGQkRGRTQ7XG4gICAgICAgICAgICAgIG9wYWNpdHk6IC43MTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcm0gLmJ0biB7XG4gICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzMxNEI4ODtcbiAgICAgICAgICAgICAgY29sb3I6ICNmZmZmZmY7XG4gICAgICAgICAgICAgIGJvcmRlcjogMDtcbiAgICAgICAgICAgICAgcGFkZGluZzogMTBweDtcbiAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9ybSAuYnRuOmhvdmVyLFxuICAgICAgICAgICAgZm9ybSAuYnRuOmZvY3VzLFxuICAgICAgICAgICAgZm9ybSAuYnRuOmFjdGl2ZSxcbiAgICAgICAgICAgIGZvcm0gLmJ0bjpmb2N1czphY3RpdmUge1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTM2RUFEO1xuICAgICAgICAgICAgICBjb2xvcjogI2ZmZmZmZjtcbiAgICAgICAgICAgICAgb3V0bGluZTogMDtcbiAgICAgICAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBgfTwvc3R5bGU+XG4gICAgICAgIDwvSGVhZD5cbiAgICAgICAgPGJvZHk+XG4gICAgICAgICAgPE1haW4gLz5cbiAgICAgICAgICA8TmV4dFNjcmlwdCAvPlxuICAgICAgICA8L2JvZHk+XG4gICAgICA8L2h0bWw+XG4gICAgKTtcbiAgfVxufVxuIl19 */\n/*@ sourceURL=pages/_document.js */"
      })), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("body", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 196
        },
        className: "jsx-1193338074"
      }, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_next_document__["Main"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 197
        }
      }), __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_next_document__["NextScript"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 198
        }
      })));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }], [{
    key: "getInitialProps",
    value: function getInitialProps(_ref) {
      var renderPage = _ref.renderPage;

      var _renderPage = renderPage(),
          html = _renderPage.html,
          head = _renderPage.head,
          errorHtml = _renderPage.errorHtml,
          chunks = _renderPage.chunks;

      var styles = __WEBPACK_IMPORTED_MODULE_3_styled_jsx_server___default()();
      return {
        html: html,
        head: head,
        errorHtml: errorHtml,
        chunks: chunks,
        styles: styles
      };
    }
  }]);

  return BGDocument;
}(__WEBPACK_IMPORTED_MODULE_2_next_document___default.a);


;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(BGDocument, "BGDocument", "/Users/shain/repositories/bitguild/PortalClient/pages/_document.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./pages/_document.js");


/***/ }),

/***/ "next/document":
/***/ (function(module, exports) {

module.exports = require("next/document");

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-hot-loader":
/***/ (function(module, exports) {

module.exports = require("react-hot-loader");

/***/ }),

/***/ "styled-jsx/server":
/***/ (function(module, exports) {

module.exports = require("styled-jsx/server");

/***/ }),

/***/ "styled-jsx/style":
/***/ (function(module, exports) {

module.exports = require("styled-jsx/style");

/***/ })

/******/ });
//# sourceMappingURL=_document.js.map