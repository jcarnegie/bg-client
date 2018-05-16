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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/reducers/account.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (immutable) */ __webpack_exports__["a"] = accountReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__ = __webpack_require__("./shared/constants/actions.js");
(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();


var account = {
  isLoading: true,
  // TODO should be false, but popup is showing in the beginning
  success: false,
  wallet: null
};
function accountReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : account;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["a" /* ACCOUNT_CHANGED */]:
      return Object.assign({}, state, {
        wallet: action.payload.wallet,
        isLoading: false,
        success: true
      });

    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["b" /* ACCOUNT_ERROR */]:
      return Object.assign({}, state, {
        wallet: null,
        isLoading: false,
        success: false
      });

    default:
      return state;
  }
}
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(account, "account", "/Users/shain/repositories/bitguild/PortalClient/client/reducers/account.js");
  reactHotLoader.register(accountReducer, "accountReducer", "/Users/shain/repositories/bitguild/PortalClient/client/reducers/account.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./client/reducers/balanceETH.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (immutable) */ __webpack_exports__["a"] = updateBalanceETH;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__ = __webpack_require__("./shared/constants/actions.js");
(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();


var balance = {
  isLoading: false,
  success: false,
  data: 0
};
function updateBalanceETH() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : balance;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["e" /* BALANCE_ETH_LOADING */]:
      return Object.assign({}, state, {
        isLoading: true,
        success: false
      });

    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["c" /* BALANCE_ETH_CHANGED */]:
      return Object.assign({}, state, {
        data: action.payload,
        isLoading: false,
        success: true
      });

    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["d" /* BALANCE_ETH_ERROR */]:
      return Object.assign({}, state, {
        isLoading: false,
        success: false
      });

    default:
      return state;
  }
}
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(balance, "balance", "/Users/shain/repositories/bitguild/PortalClient/client/reducers/balanceETH.js");
  reactHotLoader.register(updateBalanceETH, "updateBalanceETH", "/Users/shain/repositories/bitguild/PortalClient/client/reducers/balanceETH.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./client/reducers/balancePLAT.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (immutable) */ __webpack_exports__["a"] = updateBalancePLAT;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__ = __webpack_require__("./shared/constants/actions.js");
(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();


var balance = {
  isLoading: false,
  success: false,
  data: 0
};
function updateBalancePLAT() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : balance;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["h" /* BALANCE_PLAT_LOADING */]:
      return Object.assign({}, state, {
        isLoading: true,
        success: false
      });

    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["f" /* BALANCE_PLAT_CHANGED */]:
      return Object.assign({}, state, {
        data: action.payload,
        isLoading: false,
        success: true
      });

    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["g" /* BALANCE_PLAT_ERROR */]:
      return Object.assign({}, state, {
        isLoading: false,
        success: false
      });

    default:
      return state;
  }
}
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(balance, "balance", "/Users/shain/repositories/bitguild/PortalClient/client/reducers/balancePLAT.js");
  reactHotLoader.register(updateBalancePLAT, "updateBalancePLAT", "/Users/shain/repositories/bitguild/PortalClient/client/reducers/balancePLAT.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./client/reducers/chat.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (immutable) */ __webpack_exports__["a"] = chatReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda__ = __webpack_require__("ramda");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_constants_actions__ = __webpack_require__("./shared/constants/actions.js");
(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var chat = {
  sb: null,
  channels: [],
  currentChannel: null,
  messages: [],
  user: null
};
function chatReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : chat;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_1__shared_constants_actions__["i" /* CHAT_INIT */]:
      return _objectSpread({}, state, {
        sb: action.payload.sb,
        user: action.payload.user
      });

    case __WEBPACK_IMPORTED_MODULE_1__shared_constants_actions__["j" /* CHAT_LOAD_MESSAGES */]:
      return _objectSpread({}, state, {
        messages: action.payload
      });

    case __WEBPACK_IMPORTED_MODULE_1__shared_constants_actions__["k" /* CHAT_MESSAGE_RECEIVED */]:
      var messages = action.payload.channel.url === state.currentChannel.url ? Object(__WEBPACK_IMPORTED_MODULE_0_ramda__["append"])(action.payload.message, state.messages) : state.messages;
      return _objectSpread({}, state, {
        messages: messages
      });

    case __WEBPACK_IMPORTED_MODULE_1__shared_constants_actions__["m" /* CHAT_MESSAGE_SENT */]:
      return _objectSpread({}, state, {
        messages: Object(__WEBPACK_IMPORTED_MODULE_0_ramda__["append"])(action.payload, state.messages)
      });

    case __WEBPACK_IMPORTED_MODULE_1__shared_constants_actions__["n" /* CHAT_SET_CHANNEL */]:
      return _objectSpread({}, state, {
        currentChannel: action.payload
      });

    default:
      return state;
  }
}
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(chat, "chat", "/Users/shain/repositories/bitguild/PortalClient/client/reducers/chat.js");
  reactHotLoader.register(chatReducer, "chatReducer", "/Users/shain/repositories/bitguild/PortalClient/client/reducers/chat.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./client/reducers/game.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (immutable) */ __webpack_exports__["a"] = gameReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__ = __webpack_require__("./shared/constants/actions.js");
(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();


var game = {
  isLoading: false,
  success: false,
  data: null
};
function gameReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : game;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["r" /* GAME_LOADING */]:
      return Object.assign({}, state, {
        data: null,
        isLoading: true,
        success: false
      });

    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["p" /* GAME_CHANGED */]:
      return Object.assign({}, state, {
        data: action.payload,
        isLoading: false,
        success: true
      });

    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["q" /* GAME_ERROR */]:
      return Object.assign({}, state, {
        data: null,
        isLoading: false,
        success: false
      });

    default:
      return state;
  }
}
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(game, "game", "/Users/shain/repositories/bitguild/PortalClient/client/reducers/game.js");
  reactHotLoader.register(gameReducer, "gameReducer", "/Users/shain/repositories/bitguild/PortalClient/client/reducers/game.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./client/reducers/games.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (immutable) */ __webpack_exports__["a"] = gameReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__ = __webpack_require__("./shared/constants/actions.js");
(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();


var games = {
  isLoading: false,
  success: false,
  data: null
};
function gameReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : games;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["E" /* INVENTORY_GAMES_LOADING */]:
      return Object.assign({}, state, {
        data: null,
        isLoading: true,
        success: false
      });

    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["C" /* INVENTORY_GAMES_CHANGED */]:
      return Object.assign({}, state, {
        data: action.payload,
        isLoading: false,
        success: true
      });

    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["D" /* INVENTORY_GAMES_ERROR */]:
      return Object.assign({}, state, {
        data: null,
        isLoading: false,
        success: false
      });

    default:
      return state;
  }
}
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(games, "games", "/Users/shain/repositories/bitguild/PortalClient/client/reducers/games.js");
  reactHotLoader.register(gameReducer, "gameReducer", "/Users/shain/repositories/bitguild/PortalClient/client/reducers/games.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./client/reducers/gas.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (immutable) */ __webpack_exports__["a"] = gameReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__ = __webpack_require__("./shared/constants/actions.js");
(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();


var gas = {
  isLoading: false,
  success: false,
  data: null
};
function gameReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : gas;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["v" /* GAS_LOADING */]:
      return Object.assign({}, state, {
        data: null,
        isLoading: true,
        success: false
      });

    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["t" /* GAS_CHANGED */]:
      return Object.assign({}, state, {
        data: action.payload,
        isLoading: false,
        success: true
      });

    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["u" /* GAS_ERROR */]:
      return Object.assign({}, state, {
        data: null,
        isLoading: false,
        success: false
      });

    default:
      return state;
  }
}
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(gas, "gas", "/Users/shain/repositories/bitguild/PortalClient/client/reducers/gas.js");
  reactHotLoader.register(gameReducer, "gameReducer", "/Users/shain/repositories/bitguild/PortalClient/client/reducers/gas.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./client/reducers/gifts.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (immutable) */ __webpack_exports__["a"] = giftReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__ = __webpack_require__("./shared/constants/actions.js");
(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();


var gift = {
  isLoading: false,
  success: true,
  data: []
};
function giftReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : gift;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["x" /* GIFT_ADD_LOADING */]:
    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["A" /* GIFT_REMOVE_LOADING */]:
      return Object.assign({}, state, {
        isLoading: true,
        success: false
      });

    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["y" /* GIFT_ADD_SUCCESS */]:
      return Object.assign({}, state, {
        data: state.data.concat(action.payload),
        isLoading: false,
        success: true
      });

    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["B" /* GIFT_REMOVE_SUCCESS */]:
      return Object.assign({}, state, {
        data: state.data.filter(function (gift) {
          return !action.payload.includes(gift.tx);
        }),
        isLoading: false,
        success: true
      });

    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["w" /* GIFT_ADD_ERROR */]:
    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["z" /* GIFT_REMOVE_ERROR */]:
      return Object.assign({}, state, {
        isLoading: false,
        success: false
      });

    default:
      return state;
  }
}
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(gift, "gift", "/Users/shain/repositories/bitguild/PortalClient/client/reducers/gifts.js");
  reactHotLoader.register(giftReducer, "giftReducer", "/Users/shain/repositories/bitguild/PortalClient/client/reducers/gifts.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./client/reducers/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__("redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_redux__ = __webpack_require__("react-router-redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_intl_redux__ = __webpack_require__("react-intl-redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_intl_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_intl_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__account__ = __webpack_require__("./client/reducers/account.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__balanceETH__ = __webpack_require__("./client/reducers/balanceETH.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__balancePLAT__ = __webpack_require__("./client/reducers/balancePLAT.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__chat__ = __webpack_require__("./client/reducers/chat.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__game__ = __webpack_require__("./client/reducers/game.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__games__ = __webpack_require__("./client/reducers/games.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__gas__ = __webpack_require__("./client/reducers/gas.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__gifts__ = __webpack_require__("./client/reducers/gifts.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__items__ = __webpack_require__("./client/reducers/items.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__rate__ = __webpack_require__("./client/reducers/rate.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__network__ = __webpack_require__("./client/reducers/network.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__messages__ = __webpack_require__("./client/reducers/messages.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__user__ = __webpack_require__("./client/reducers/user.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__validations__ = __webpack_require__("./client/reducers/validations.js");
(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();



















var _default = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
  routing: __WEBPACK_IMPORTED_MODULE_1_react_router_redux__["routerReducer"],
  account: __WEBPACK_IMPORTED_MODULE_3__account__["a" /* default */],
  balanceETH: __WEBPACK_IMPORTED_MODULE_4__balanceETH__["a" /* default */],
  balancePLAT: __WEBPACK_IMPORTED_MODULE_5__balancePLAT__["a" /* default */],
  chat: __WEBPACK_IMPORTED_MODULE_6__chat__["a" /* default */],
  game: __WEBPACK_IMPORTED_MODULE_7__game__["a" /* default */],
  games: __WEBPACK_IMPORTED_MODULE_8__games__["a" /* default */],
  gas: __WEBPACK_IMPORTED_MODULE_9__gas__["a" /* default */],
  gifts: __WEBPACK_IMPORTED_MODULE_10__gifts__["a" /* default */],
  intl: __WEBPACK_IMPORTED_MODULE_2_react_intl_redux__["intlReducer"],
  items: __WEBPACK_IMPORTED_MODULE_11__items__["a" /* default */],
  messages: __WEBPACK_IMPORTED_MODULE_14__messages__["a" /* default */],
  network: __WEBPACK_IMPORTED_MODULE_13__network__["a" /* default */],
  rate: __WEBPACK_IMPORTED_MODULE_12__rate__["a" /* default */],
  user: __WEBPACK_IMPORTED_MODULE_15__user__["a" /* default */],
  validations: __WEBPACK_IMPORTED_MODULE_16__validations__["a" /* default */]
});

/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/Users/shain/repositories/bitguild/PortalClient/client/reducers/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./client/reducers/items.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (immutable) */ __webpack_exports__["a"] = itemsReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__ = __webpack_require__("./shared/constants/actions.js");
(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();


var balance = {
  isLoading: false,
  success: false,
  data: null
};
function itemsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : balance;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["I" /* INVENTORY_ITEMS_LOADING */]:
      return Object.assign({}, balance, {
        data: null,
        isLoading: true,
        success: false
      });

    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["G" /* INVENTORY_ITEMS_CHANGED */]:
      return Object.assign({}, balance, {
        data: action.payload,
        isLoading: false,
        success: true
      });

    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["H" /* INVENTORY_ITEMS_ERROR */]:
      return Object.assign({}, balance, {
        data: null,
        isLoading: false,
        success: false
      });

    default:
      return state;
  }
}
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(balance, "balance", "/Users/shain/repositories/bitguild/PortalClient/client/reducers/items.js");
  reactHotLoader.register(itemsReducer, "itemsReducer", "/Users/shain/repositories/bitguild/PortalClient/client/reducers/items.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./client/reducers/messages.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (immutable) */ __webpack_exports__["a"] = messagesReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__ = __webpack_require__("./shared/constants/actions.js");
(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }


var messages = [];
function messagesReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : messages;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["K" /* MESSAGE_ADD */]:
      console.error(action);
      return _toConsumableArray(state).concat([action.payload]);

    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["L" /* MESSAGE_ADD_ALL */]:
      console.error(action.payload);
      return _toConsumableArray(state).concat(_toConsumableArray(action.payload));

    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["M" /* MESSAGE_REMOVE */]:
      return state.filter(function (message) {
        return message !== action.payload;
      });

    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["N" /* MESSAGE_REMOVE_ALL */]:
      return [];

    default:
      return state;
  }
}
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(messages, "messages", "/Users/shain/repositories/bitguild/PortalClient/client/reducers/messages.js");
  reactHotLoader.register(messagesReducer, "messagesReducer", "/Users/shain/repositories/bitguild/PortalClient/client/reducers/messages.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./client/reducers/network.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (immutable) */ __webpack_exports__["a"] = rateReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__ = __webpack_require__("./shared/constants/actions.js");
(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();


var network = {
  isLoading: false,
  success: false,
  data: null
};
function rateReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : network;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["Q" /* NETWORK_LOADING */]:
      return Object.assign({}, network, {
        data: null,
        isLoading: true,
        success: false
      });

    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["O" /* NETWORK_CHANGED */]:
      return Object.assign({}, network, {
        data: action.payload,
        isLoading: false,
        success: true
      });

    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["P" /* NETWORK_ERROR */]:
      return Object.assign({}, network, {
        data: null,
        isLoading: false,
        success: false
      });

    default:
      return state;
  }
}
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(network, "network", "/Users/shain/repositories/bitguild/PortalClient/client/reducers/network.js");
  reactHotLoader.register(rateReducer, "rateReducer", "/Users/shain/repositories/bitguild/PortalClient/client/reducers/network.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./client/reducers/rate.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (immutable) */ __webpack_exports__["a"] = rateReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__ = __webpack_require__("./shared/constants/actions.js");
(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();


var rate = {
  isLoading: false,
  success: false,
  data: null
};
function rateReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : rate;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["U" /* RATE_LOADING */]:
      return Object.assign({}, rate, {
        data: null,
        isLoading: true,
        success: false
      });

    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["S" /* RATE_CHANGED */]:
      return Object.assign({}, rate, {
        data: action.payload,
        isLoading: false,
        success: true
      });

    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["T" /* RATE_ERROR */]:
      return Object.assign({}, rate, {
        data: null,
        isLoading: false,
        success: false
      });

    default:
      return state;
  }
}
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(rate, "rate", "/Users/shain/repositories/bitguild/PortalClient/client/reducers/rate.js");
  reactHotLoader.register(rateReducer, "rateReducer", "/Users/shain/repositories/bitguild/PortalClient/client/reducers/rate.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./client/reducers/user.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (immutable) */ __webpack_exports__["a"] = userReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__ = __webpack_require__("./shared/constants/actions.js");
(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();


var user = {
  isLoading: false,
  success: false,
  data: null
};
function userReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : user;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["Z" /* USER_LOADING */]:
      return Object.assign({}, state, {
        data: null,
        isLoading: true,
        success: false
      });

    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["X" /* USER_CHANGED */]:
      return Object.assign({}, state, {
        data: action.payload,
        isLoading: false,
        success: true
      });

    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["Y" /* USER_ERROR */]:
      return Object.assign({}, state, {
        data: null,
        isLoading: false,
        success: false
      });

    default:
      return state;
  }
}
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(user, "user", "/Users/shain/repositories/bitguild/PortalClient/client/reducers/user.js");
  reactHotLoader.register(userReducer, "userReducer", "/Users/shain/repositories/bitguild/PortalClient/client/reducers/user.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./client/reducers/validations.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (immutable) */ __webpack_exports__["a"] = update;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__ = __webpack_require__("./shared/constants/actions.js");
(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }


var validations = [];
function update() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : validations;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["_0" /* VALIDATION_ADD */]:
      console.error(action.payload);
      return _toConsumableArray(state).concat([action.payload]);

    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["_1" /* VALIDATION_ADD_ALL */]:
      console.error(action.payload);
      return _toConsumableArray(state).concat(_toConsumableArray(action.payload));

    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["_2" /* VALIDATION_REMOVE */]:
      return state.filter(function (message) {
        return message !== action.payload;
      });

    case __WEBPACK_IMPORTED_MODULE_0__shared_constants_actions__["_3" /* VALIDATION_REMOVE_ALL */]:
      return [];

    default:
      return state;
  }
}
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(validations, "validations", "/Users/shain/repositories/bitguild/PortalClient/client/reducers/validations.js");
  reactHotLoader.register(update, "update", "/Users/shain/repositories/bitguild/PortalClient/client/reducers/validations.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./client/sagas/chat.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (immutable) */ __webpack_exports__["a"] = chatSaga;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__("@babel/runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__ = __webpack_require__("redux-saga/effects");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_saga_effects___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_chat__ = __webpack_require__("./client/utils/chat.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__ = __webpack_require__("./shared/constants/actions.js");


(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _marked =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(sendChatMessage),
    _marked2 =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(initChat),
    _marked3 =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(chatSaga);





function sendChatMessage(action) {
  var state, currentChannel, message, sentMessage;
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function sendChatMessage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["select"])();

        case 3:
          state = _context.sent;
          currentChannel = state.chat.currentChannel;
          message = action.payload;
          _context.next = 8;
          return Object(__WEBPACK_IMPORTED_MODULE_2__utils_chat__["g" /* sendMessage */])(message, currentChannel);

        case 8:
          sentMessage = _context.sent;
          _context.next = 11;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__["m" /* CHAT_MESSAGE_SENT */],
            payload: sentMessage
          });

        case 11:
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.log("sendChatMessage error:", _context.t0);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[0, 13]]);
}

function initChat(action) {
  var _action$payload, wallet, nickName, _ref, _ref2, sb, user, channels, locale, channelName, channelOperators, channel, messages;

  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function initChat$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _action$payload = action.payload, wallet = _action$payload.wallet, nickName = _action$payload.nickName;
          _context2.next = 3;
          return Object(__WEBPACK_IMPORTED_MODULE_2__utils_chat__["e" /* init */])(wallet, nickName);

        case 3:
          _ref = _context2.sent;
          _ref2 = _slicedToArray(_ref, 2);
          sb = _ref2[0];
          user = _ref2[1];
          _context2.next = 9;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__["i" /* CHAT_INIT */],
            payload: {
              sb: sb,
              user: user
            }
          });

        case 9:
          _context2.next = 11;
          return Object(__WEBPACK_IMPORTED_MODULE_2__utils_chat__["b" /* channels */])(sb);

        case 11:
          channels = _context2.sent;
          _context2.next = 14;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["select"])(function (state) {
            return state.intl.locale;
          });

        case 14:
          locale = _context2.sent;
          channelName = Object(__WEBPACK_IMPORTED_MODULE_2__utils_chat__["a" /* channelNameForLocale */])(locale);
          channelOperators = ["0xc40cD464ad0895571bB396071A4FaA81935353A5", // Jeff
          "0xa9Af3D88E5167cA6E9413CBB9b946EC95FE469ee" // Shain
          ];

          if (Object(__WEBPACK_IMPORTED_MODULE_2__utils_chat__["d" /* findChannelByName */])(channelName, channels)) {
            _context2.next = 22;
            break;
          }

          _context2.next = 20;
          return Object(__WEBPACK_IMPORTED_MODULE_2__utils_chat__["c" /* createChannelWithName */])(channelName, channelOperators);

        case 20:
          channel = _context2.sent;
          channels.push(channel);

        case 22:
          _context2.next = 24;
          return Object(__WEBPACK_IMPORTED_MODULE_2__utils_chat__["h" /* setChannelByName */])(channelName, channels);

        case 24:
          channel = _context2.sent;
          _context2.next = 27;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__["n" /* CHAT_SET_CHANNEL */],
            payload: channel
          });

        case 27:
          _context2.next = 29;
          return Object(__WEBPACK_IMPORTED_MODULE_2__utils_chat__["f" /* messages */])(channel);

        case 29:
          messages = _context2.sent;
          _context2.next = 32;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__["j" /* CHAT_LOAD_MESSAGES */],
            payload: messages
          });

        case 32:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

function chatSaga() {
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function chatSaga$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["takeEvery"])(__WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__["l" /* CHAT_MESSAGE_SEND */], sendChatMessage);

        case 2:
          _context3.next = 4;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["takeEvery"])(__WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__["X" /* USER_CHANGED */], initChat);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this);
}
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(sendChatMessage, "sendChatMessage", "/Users/shain/repositories/bitguild/PortalClient/client/sagas/chat.js");
  reactHotLoader.register(initChat, "initChat", "/Users/shain/repositories/bitguild/PortalClient/client/sagas/chat.js");
  reactHotLoader.register(chatSaga, "chatSaga", "/Users/shain/repositories/bitguild/PortalClient/client/sagas/chat.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./client/sagas/game.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (immutable) */ __webpack_exports__["a"] = userSaga;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__("@babel/runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__ = __webpack_require__("redux-saga/effects");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_saga_effects___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_api__ = __webpack_require__("./client/utils/api.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__ = __webpack_require__("./shared/constants/actions.js");


(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

var _marked =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(fetchGame),
    _marked2 =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(userSaga);





function fetchGame(action) {
  var game;
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function fetchGame$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__["r" /* GAME_LOADING */]
          });

        case 3:
          _context.next = 5;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["call"])(__WEBPACK_IMPORTED_MODULE_2__utils_api__["a" /* default */], "/game/".concat(action.payload._id));

        case 5:
          game = _context.sent;

          if (!game) {
            _context.next = 11;
            break;
          }

          _context.next = 9;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__["p" /* GAME_CHANGED */],
            payload: game
          });

        case 9:
          _context.next = 13;
          break;

        case 11:
          _context.next = 13;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__["q" /* GAME_ERROR */]
          });

        case 13:
          _context.next = 21;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          _context.next = 19;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__["q" /* GAME_ERROR */]
          });

        case 19:
          _context.next = 21;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__["K" /* MESSAGE_ADD */],
            payload: _context.t0
          });

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[0, 15]]);
}

function userSaga() {
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function userSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["takeEvery"])(__WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__["s" /* GAME_REQUEST */], fetchGame);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(fetchGame, "fetchGame", "/Users/shain/repositories/bitguild/PortalClient/client/sagas/game.js");
  reactHotLoader.register(userSaga, "userSaga", "/Users/shain/repositories/bitguild/PortalClient/client/sagas/game.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./client/sagas/gas.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (immutable) */ __webpack_exports__["a"] = gasSaga;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__("@babel/runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__ = __webpack_require__("redux-saga/effects");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_saga_effects___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_constants_actions__ = __webpack_require__("./shared/constants/actions.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_fetch__ = __webpack_require__("isomorphic-fetch");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_isomorphic_fetch__);


(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

var _marked =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(fetchGas),
    _marked2 =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(gasSaga);

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var defaultData = {
  average: 8,
  fast: 16,
  fastest: 30
};

function callAPI() {
  return __WEBPACK_IMPORTED_MODULE_3_isomorphic_fetch___default()("https://ethgasstation.info/json/ethgasAPI.json").then(function (response) {
    return response.json();
  });
}

function fetchGas() {
  var json, newData;
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function fetchGas$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_2__shared_constants_actions__["v" /* GAS_LOADING */]
          });

        case 3:
          _context.next = 5;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["call"])(callAPI);

        case 5:
          json = _context.sent;
          newData = Object.keys(defaultData).reduce(function (memo, key) {
            return _objectSpread({}, memo, _defineProperty({}, key, Number(window.web3.toWei(json[key] / 10, "shannon")) + 1000000000));
          }, {});
          _context.next = 9;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_2__shared_constants_actions__["t" /* GAS_CHANGED */],
            payload: newData
          });

        case 9:
          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          _context.next = 15;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_2__shared_constants_actions__["t" /* GAS_CHANGED */],
            payload: defaultData
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[0, 11]]);
}

function gasSaga() {
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function gasSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["takeEvery"])(__WEBPACK_IMPORTED_MODULE_2__shared_constants_actions__["O" /* NETWORK_CHANGED */], fetchGas);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(defaultData, "defaultData", "/Users/shain/repositories/bitguild/PortalClient/client/sagas/gas.js");
  reactHotLoader.register(callAPI, "callAPI", "/Users/shain/repositories/bitguild/PortalClient/client/sagas/gas.js");
  reactHotLoader.register(fetchGas, "fetchGas", "/Users/shain/repositories/bitguild/PortalClient/client/sagas/gas.js");
  reactHotLoader.register(gasSaga, "gasSaga", "/Users/shain/repositories/bitguild/PortalClient/client/sagas/gas.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./client/sagas/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (immutable) */ __webpack_exports__["a"] = rootSaga;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__("@babel/runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__ = __webpack_require__("redux-saga/effects");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_saga_effects___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chat__ = __webpack_require__("./client/sagas/chat.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__metamask__ = __webpack_require__("./client/sagas/metamask.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sendbird__ = __webpack_require__("./client/sagas/sendbird.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__user__ = __webpack_require__("./client/sagas/user.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__game__ = __webpack_require__("./client/sagas/game.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__inventory__ = __webpack_require__("./client/sagas/inventory.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__gas__ = __webpack_require__("./client/sagas/gas.js");


(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

var _marked =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(rootSaga);









function rootSaga() {
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function rootSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["all"])([Object(__WEBPACK_IMPORTED_MODULE_2__chat__["a" /* default */])(), Object(__WEBPACK_IMPORTED_MODULE_6__game__["a" /* default */])(), Object(__WEBPACK_IMPORTED_MODULE_8__gas__["a" /* default */])(), Object(__WEBPACK_IMPORTED_MODULE_7__inventory__["a" /* default */])(), Object(__WEBPACK_IMPORTED_MODULE_3__metamask__["a" /* default */])(), Object(__WEBPACK_IMPORTED_MODULE_4__sendbird__["a" /* default */])(), Object(__WEBPACK_IMPORTED_MODULE_5__user__["a" /* default */])()]);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(rootSaga, "rootSaga", "/Users/shain/repositories/bitguild/PortalClient/client/sagas/index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./client/sagas/inventory.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (immutable) */ __webpack_exports__["a"] = inventorySaga;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__("@babel/runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bluebird__ = __webpack_require__("bluebird");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__ = __webpack_require__("redux-saga/effects");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_saga_effects___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__ = __webpack_require__("./shared/constants/actions.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_location__ = __webpack_require__("./client/utils/location.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_api__ = __webpack_require__("./client/utils/api.js");


(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

var _marked =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(getItems),
    _marked2 =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(getGames),
    _marked3 =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(checkGifts),
    _marked4 =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(inventorySaga);







function getItems(action) {
  var testItems, itemsUrl, items;
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function getItems$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__["I" /* INVENTORY_ITEMS_LOADING */]
          });

        case 3:
          testItems = Object(__WEBPACK_IMPORTED_MODULE_4__utils_location__["a" /* readFromQueryString */])("testItems") === "true" ? "?testItems=true" : "";
          itemsUrl = "/items/".concat(action.payload.wallet).concat(testItems);
          _context.next = 7;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["call"])(__WEBPACK_IMPORTED_MODULE_5__utils_api__["a" /* default */], itemsUrl, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json; charset=utf-8"
            }
          });

        case 7:
          items = _context.sent;
          _context.next = 10;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__["G" /* INVENTORY_ITEMS_CHANGED */],
            payload: items.list
          });

        case 10:
          _context.next = 18;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          _context.next = 16;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__["H" /* INVENTORY_ITEMS_ERROR */]
          });

        case 16:
          _context.next = 18;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__["K" /* MESSAGE_ADD */],
            payload: _context.t0
          });

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[0, 12]]);
}

function getGames(action) {
  var games;
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function getGames$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__["E" /* INVENTORY_GAMES_LOADING */]
          });

        case 3:
          _context2.next = 5;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["call"])(__WEBPACK_IMPORTED_MODULE_5__utils_api__["a" /* default */], "/games", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json; charset=utf-8"
            }
          });

        case 5:
          games = _context2.sent;
          _context2.next = 8;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__["C" /* INVENTORY_GAMES_CHANGED */],
            payload: games
          });

        case 8:
          _context2.next = 16;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          _context2.next = 14;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__["D" /* INVENTORY_GAMES_ERROR */]
          });

        case 14:
          _context2.next = 16;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__["K" /* MESSAGE_ADD */],
            payload: _context2.t0
          });

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this, [[0, 10]]);
}

function checkGifts() {
  var gifts, result, hashes;
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function checkGifts$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["select"])(function (state) {
            return state.gifts;
          });

        case 3:
          gifts = _context3.sent;
          gifts.data = gifts.data || []; // TODO - following unsafe operations, ex: map

          _context3.next = 7;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__["A" /* GIFT_REMOVE_LOADING */]
          });

        case 7:
          _context3.next = 9;
          return Promise.all(gifts.data.map(function (gift) {
            return (// will return null while transaction is in process
              __WEBPACK_IMPORTED_MODULE_1_bluebird___default.a.promisify(window.web3.eth.getTransactionReceipt)(gift.tx)
            );
          }));

        case 9:
          result = _context3.sent;
          hashes = result.filter(function (tx) {
            return tx;
          }).map(function (tx) {
            return tx.transactionHash;
          });
          _context3.next = 13;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__["B" /* GIFT_REMOVE_SUCCESS */],
            payload: hashes // doesn't matter if tx succeed or failed

          });

        case 13:
          _context3.next = 21;
          break;

        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](0);
          _context3.next = 19;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__["z" /* GIFT_REMOVE_ERROR */]
          });

        case 19:
          _context3.next = 21;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__["K" /* MESSAGE_ADD */],
            payload: _context3.t0
          });

        case 21:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this, [[0, 15]]);
}

function inventorySaga() {
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function inventorySaga$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["takeEvery"])(__WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__["X" /* USER_CHANGED */], getItems);

        case 2:
          _context4.next = 4;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["takeEvery"])(__WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__["F" /* INVENTORY_GAMES_REQUEST */], getGames);

        case 4:
          _context4.next = 6;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["takeEvery"])(__WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__["X" /* USER_CHANGED */], getGames);

        case 6:
          _context4.next = 8;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["takeEvery"])(__WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__["J" /* INVENTORY_ITEMS_REQUEST */], getItems);

        case 8:
          _context4.next = 10;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["takeEvery"])(__WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__["R" /* NEW_BLOCK */], checkGifts);

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, this);
}
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(getItems, "getItems", "/Users/shain/repositories/bitguild/PortalClient/client/sagas/inventory.js");
  reactHotLoader.register(getGames, "getGames", "/Users/shain/repositories/bitguild/PortalClient/client/sagas/inventory.js");
  reactHotLoader.register(checkGifts, "checkGifts", "/Users/shain/repositories/bitguild/PortalClient/client/sagas/inventory.js");
  reactHotLoader.register(inventorySaga, "inventorySaga", "/Users/shain/repositories/bitguild/PortalClient/client/sagas/inventory.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./client/sagas/metamask.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (immutable) */ __webpack_exports__["a"] = metaMaskSaga;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__("@babel/runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bluebird__ = __webpack_require__("bluebird");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__ = __webpack_require__("redux-saga/effects");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_saga_effects___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_contracts_token__ = __webpack_require__("./shared/contracts/token.json");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_contracts_token___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__shared_contracts_token__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_contracts_oracle__ = __webpack_require__("./shared/contracts/oracle.json");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_contracts_oracle___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__shared_contracts_oracle__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_network__ = __webpack_require__("./client/utils/network.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_constants_actions__ = __webpack_require__("./shared/constants/actions.js");


(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

var _marked =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(getRate),
    _marked2 =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(getBalanceETH),
    _marked3 =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(getBalancePLAT),
    _marked4 =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(getNetwork),
    _marked5 =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(metaMaskSaga);








function getRate() {
  var network, contract, ETHPrice;
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function getRate$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["select"])(function (state) {
            return state.network;
          });

        case 3:
          network = _context.sent;

          if (!Object.keys(__WEBPACK_IMPORTED_MODULE_5__utils_network__["a" /* default */]).includes(network.data.id)) {
            _context.next = 13;
            break;
          }

          _context.next = 7;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_6__shared_constants_actions__["U" /* RATE_LOADING */]
          });

        case 7:
          contract = window.web3.eth.contract(__WEBPACK_IMPORTED_MODULE_4__shared_contracts_oracle___default.a).at(__WEBPACK_IMPORTED_MODULE_5__utils_network__["a" /* default */][network.data.id].oracle);
          _context.next = 10;
          return __WEBPACK_IMPORTED_MODULE_1_bluebird___default.a.promisify(contract.ETHPrice)();

        case 10:
          ETHPrice = _context.sent;
          _context.next = 13;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_6__shared_constants_actions__["S" /* RATE_CHANGED */],
            payload: window.web3.fromWei(ETHPrice, "ether").toNumber()
          });

        case 13:
          _context.next = 21;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          _context.next = 19;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_6__shared_constants_actions__["T" /* RATE_ERROR */]
          });

        case 19:
          _context.next = 21;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_6__shared_constants_actions__["K" /* MESSAGE_ADD */],
            payload: _context.t0
          });

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[0, 15]]);
}

function getBalanceETH() {
  var user, network, balance;
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function getBalanceETH$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["select"])(function (state) {
            return state.user;
          });

        case 2:
          user = _context2.sent;

          if (!(!user.isLoading && user.success)) {
            _context2.next = 24;
            break;
          }

          _context2.prev = 4;
          _context2.next = 7;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["select"])(function (state) {
            return state.network;
          });

        case 7:
          network = _context2.sent;

          if (!Object.keys(__WEBPACK_IMPORTED_MODULE_5__utils_network__["a" /* default */]).includes(network.data.id)) {
            _context2.next = 16;
            break;
          }

          _context2.next = 11;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_6__shared_constants_actions__["e" /* BALANCE_ETH_LOADING */]
          });

        case 11:
          _context2.next = 13;
          return __WEBPACK_IMPORTED_MODULE_1_bluebird___default.a.promisify(window.web3.eth.getBalance)(user.data.wallet);

        case 13:
          balance = _context2.sent;
          _context2.next = 16;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_6__shared_constants_actions__["c" /* BALANCE_ETH_CHANGED */],
            payload: window.web3.fromWei(balance, "ether").toNumber()
          });

        case 16:
          _context2.next = 24;
          break;

        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](4);
          _context2.next = 22;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_6__shared_constants_actions__["d" /* BALANCE_ETH_ERROR */]
          });

        case 22:
          _context2.next = 24;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_6__shared_constants_actions__["K" /* MESSAGE_ADD */],
            payload: _context2.t0
          });

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this, [[4, 18]]);
}

function getBalancePLAT() {
  var user, network, contract, balance;
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function getBalancePLAT$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["select"])(function (state) {
            return state.user;
          });

        case 2:
          user = _context3.sent;

          if (!(!user.isLoading && user.success)) {
            _context3.next = 25;
            break;
          }

          _context3.prev = 4;
          _context3.next = 7;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["select"])(function (state) {
            return state.network;
          });

        case 7:
          network = _context3.sent;

          if (!Object.keys(__WEBPACK_IMPORTED_MODULE_5__utils_network__["a" /* default */]).includes(network.data.id)) {
            _context3.next = 17;
            break;
          }

          _context3.next = 11;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_6__shared_constants_actions__["h" /* BALANCE_PLAT_LOADING */]
          });

        case 11:
          contract = window.web3.eth.contract(__WEBPACK_IMPORTED_MODULE_3__shared_contracts_token___default.a).at(__WEBPACK_IMPORTED_MODULE_5__utils_network__["a" /* default */][network.data.id].token);
          _context3.next = 14;
          return __WEBPACK_IMPORTED_MODULE_1_bluebird___default.a.promisify(contract.balanceOf)(user.data.wallet);

        case 14:
          balance = _context3.sent;
          _context3.next = 17;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_6__shared_constants_actions__["f" /* BALANCE_PLAT_CHANGED */],
            payload: window.web3.fromWei(balance, "ether").toNumber()
          });

        case 17:
          _context3.next = 25;
          break;

        case 19:
          _context3.prev = 19;
          _context3.t0 = _context3["catch"](4);
          _context3.next = 23;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_6__shared_constants_actions__["g" /* BALANCE_PLAT_ERROR */]
          });

        case 23:
          _context3.next = 25;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_6__shared_constants_actions__["K" /* MESSAGE_ADD */],
            payload: _context3.t0
          });

        case 25:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this, [[4, 19]]);
}

function getNetwork() {
  var netId;
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function getNetwork$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          console.log("saga: getNetwork");
          _context4.prev = 1;
          _context4.next = 4;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_6__shared_constants_actions__["Q" /* NETWORK_LOADING */]
          });

        case 4:
          _context4.next = 6;
          return __WEBPACK_IMPORTED_MODULE_1_bluebird___default.a.promisify(window.web3.version.getNetwork)();

        case 6:
          netId = _context4.sent;
          _context4.next = 9;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_6__shared_constants_actions__["O" /* NETWORK_CHANGED */],
            payload: {
              id: netId
            }
          });

        case 9:
          _context4.next = 11;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_6__shared_constants_actions__["V" /* RATE_REQUEST */]
          });

        case 11:
          _context4.next = 17;
          break;

        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](1);
          _context4.next = 17;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_6__shared_constants_actions__["K" /* MESSAGE_ADD */],
            payload: _context4.t0
          });

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, this, [[1, 13]]);
}

function metaMaskSaga() {
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function metaMaskSaga$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["takeEvery"])(__WEBPACK_IMPORTED_MODULE_6__shared_constants_actions__["a" /* ACCOUNT_CHANGED */], getNetwork);

        case 2:
          _context5.next = 4;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["takeEvery"])(__WEBPACK_IMPORTED_MODULE_6__shared_constants_actions__["X" /* USER_CHANGED */], getBalanceETH);

        case 4:
          _context5.next = 6;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["takeEvery"])(__WEBPACK_IMPORTED_MODULE_6__shared_constants_actions__["R" /* NEW_BLOCK */], getBalanceETH);

        case 6:
          _context5.next = 8;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["takeEvery"])(__WEBPACK_IMPORTED_MODULE_6__shared_constants_actions__["X" /* USER_CHANGED */], getBalancePLAT);

        case 8:
          _context5.next = 10;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["takeEvery"])(__WEBPACK_IMPORTED_MODULE_6__shared_constants_actions__["R" /* NEW_BLOCK */], getBalancePLAT);

        case 10:
          _context5.next = 12;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["takeEvery"])(__WEBPACK_IMPORTED_MODULE_6__shared_constants_actions__["V" /* RATE_REQUEST */], getRate);

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5, this);
}
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(getRate, "getRate", "/Users/shain/repositories/bitguild/PortalClient/client/sagas/metamask.js");
  reactHotLoader.register(getBalanceETH, "getBalanceETH", "/Users/shain/repositories/bitguild/PortalClient/client/sagas/metamask.js");
  reactHotLoader.register(getBalancePLAT, "getBalancePLAT", "/Users/shain/repositories/bitguild/PortalClient/client/sagas/metamask.js");
  reactHotLoader.register(getNetwork, "getNetwork", "/Users/shain/repositories/bitguild/PortalClient/client/sagas/metamask.js");
  reactHotLoader.register(metaMaskSaga, "metaMaskSaga", "/Users/shain/repositories/bitguild/PortalClient/client/sagas/metamask.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./client/sagas/sendbird.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (immutable) */ __webpack_exports__["a"] = sendBirdSaga;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__("@babel/runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_saga__ = __webpack_require__("redux-saga");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_saga___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_saga__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__ = __webpack_require__("redux-saga/effects");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_saga_effects___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__ = __webpack_require__("./shared/constants/actions.js");


(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

var _marked =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(initSendBird),
    _marked2 =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(sendBirdSaga);




var GLOBAL_HANDLER = "GLOBAL_HANDLER";

function sendBirdListen(state) {
  return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga__["eventChannel"])(function (emit) {
    var sb = state.chat.sb;
    var channelHandler = new sb.ChannelHandler();

    channelHandler.onMessageReceived = function (channel, message) {
      emit({
        type: __WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__["k" /* CHAT_MESSAGE_RECEIVED */],
        payload: {
          channel: channel,
          message: message
        }
      });
    };

    sb.addChannelHandler(GLOBAL_HANDLER, channelHandler); // unsubscribe function

    return function () {};
  });
}

function initSendBird() {
  var state, channel, action;
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function initSendBird$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["select"])();

        case 2:
          state = _context.sent;
          _context.next = 5;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["call"])(sendBirdListen, state);

        case 5:
          channel = _context.sent;

        case 6:
          if (false) {
            _context.next = 14;
            break;
          }

          _context.next = 9;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["take"])(channel);

        case 9:
          action = _context.sent;
          _context.next = 12;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["put"])(action);

        case 12:
          _context.next = 6;
          break;

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

function sendBirdSaga() {
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function sendBirdSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Object(__WEBPACK_IMPORTED_MODULE_2_redux_saga_effects__["takeEvery"])(__WEBPACK_IMPORTED_MODULE_3__shared_constants_actions__["i" /* CHAT_INIT */], initSendBird);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}
;
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(GLOBAL_HANDLER, "GLOBAL_HANDLER", "/Users/shain/repositories/bitguild/PortalClient/client/sagas/sendbird.js");
  reactHotLoader.register(sendBirdListen, "sendBirdListen", "/Users/shain/repositories/bitguild/PortalClient/client/sagas/sendbird.js");
  reactHotLoader.register(initSendBird, "initSendBird", "/Users/shain/repositories/bitguild/PortalClient/client/sagas/sendbird.js");
  reactHotLoader.register(sendBirdSaga, "sendBirdSaga", "/Users/shain/repositories/bitguild/PortalClient/client/sagas/sendbird.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./client/sagas/user.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (immutable) */ __webpack_exports__["a"] = userSaga;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__("@babel/runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__ = __webpack_require__("redux-saga/effects");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_saga_effects___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_api__ = __webpack_require__("./client/utils/api.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_intl_setup__ = __webpack_require__("./shared/intl/setup.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_intl_redux__ = __webpack_require__("react-intl-redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_intl_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_intl_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_constants_actions__ = __webpack_require__("./shared/constants/actions.js");


(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

var _marked =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(fetchUser),
    _marked2 =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(createUser),
    _marked3 =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(updateUser),
    _marked4 =
/*#__PURE__*/
__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(userSaga);







function fetchUser() {
  var account, user;
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function fetchUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_5__shared_constants_actions__["Z" /* USER_LOADING */]
          });

        case 3:
          _context.next = 5;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["select"])(function (state) {
            return state.account;
          });

        case 5:
          account = _context.sent;

          if (account.wallet) {
            _context.next = 16;
            break;
          }

          _context.next = 9;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_5__shared_constants_actions__["c" /* BALANCE_ETH_CHANGED */],
            payload: 0
          });

        case 9:
          _context.next = 11;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_5__shared_constants_actions__["f" /* BALANCE_PLAT_CHANGED */],
            payload: 0
          });

        case 11:
          _context.next = 13;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_5__shared_constants_actions__["H" /* INVENTORY_ITEMS_ERROR */]
          });

        case 13:
          _context.next = 15;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_5__shared_constants_actions__["D" /* INVENTORY_GAMES_ERROR */]
          });

        case 15:
          return _context.abrupt("return");

        case 16:
          _context.next = 18;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["call"])(__WEBPACK_IMPORTED_MODULE_2__utils_api__["a" /* default */], "/user/".concat(account.wallet));

        case 18:
          user = _context.sent;

          if (!user) {
            _context.next = 26;
            break;
          }

          _context.next = 22;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_5__shared_constants_actions__["X" /* USER_CHANGED */],
            payload: user
          });

        case 22:
          _context.next = 24;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])(Object(__WEBPACK_IMPORTED_MODULE_4_react_intl_redux__["updateIntl"])(__WEBPACK_IMPORTED_MODULE_3__shared_intl_setup__["a" /* localization */][user.language]));

        case 24:
          _context.next = 32;
          break;

        case 26:
          _context.next = 28;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_5__shared_constants_actions__["Y" /* USER_ERROR */]
          });

        case 28:
          _context.next = 30;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_5__shared_constants_actions__["c" /* BALANCE_ETH_CHANGED */],
            payload: 0
          });

        case 30:
          _context.next = 32;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_5__shared_constants_actions__["f" /* BALANCE_PLAT_CHANGED */],
            payload: 0
          });

        case 32:
          _context.next = 40;
          break;

        case 34:
          _context.prev = 34;
          _context.t0 = _context["catch"](0);
          _context.next = 38;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_5__shared_constants_actions__["Y" /* USER_ERROR */]
          });

        case 38:
          _context.next = 40;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_5__shared_constants_actions__["K" /* MESSAGE_ADD */],
            payload: _context.t0
          });

        case 40:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[0, 34]]);
}

function createUser(action) {
  var user, errors;
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function createUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_5__shared_constants_actions__["Z" /* USER_LOADING */]
          });

        case 3:
          _context2.next = 5;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["call"])(__WEBPACK_IMPORTED_MODULE_2__utils_api__["a" /* default */], "/users", {
            method: "POST",
            body: JSON.stringify(action.payload),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json; charset=utf-8"
            }
          });

        case 5:
          user = _context2.sent;
          _context2.next = 8;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_5__shared_constants_actions__["X" /* USER_CHANGED */],
            payload: user
          });

        case 8:
          _context2.next = 22;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          _context2.next = 14;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_5__shared_constants_actions__["Y" /* USER_ERROR */]
          });

        case 14:
          errors = [].concat(_context2.t0);

          if (![400, 409].includes(errors[0].status)) {
            _context2.next = 20;
            break;
          }

          _context2.next = 18;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_5__shared_constants_actions__["_1" /* VALIDATION_ADD_ALL */],
            payload: errors
          });

        case 18:
          _context2.next = 22;
          break;

        case 20:
          _context2.next = 22;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_5__shared_constants_actions__["L" /* MESSAGE_ADD_ALL */],
            payload: errors
          });

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this, [[0, 10]]);
}

function updateUser(action) {
  var user, _user, errors;

  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function updateUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["select"])(function (state) {
            return state.user;
          });

        case 2:
          user = _context3.sent;

          if (!(!user.isLoading && user.success)) {
            _context3.next = 22;
            break;
          }

          _context3.prev = 4;
          _context3.next = 7;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["call"])(__WEBPACK_IMPORTED_MODULE_2__utils_api__["a" /* default */], "/user/".concat(user.data.wallet), {
            method: "PUT",
            body: JSON.stringify(action.payload),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json; charset=utf-8"
            }
          });

        case 7:
          _user = _context3.sent;
          _context3.next = 10;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_5__shared_constants_actions__["X" /* USER_CHANGED */],
            payload: _user
          });

        case 10:
          _context3.next = 22;
          break;

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](4);
          errors = [].concat(_context3.t0);

          if (![400, 409].includes(errors[0].status)) {
            _context3.next = 20;
            break;
          }

          _context3.next = 18;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_5__shared_constants_actions__["_1" /* VALIDATION_ADD_ALL */],
            payload: errors
          });

        case 18:
          _context3.next = 22;
          break;

        case 20:
          _context3.next = 22;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["put"])({
            type: __WEBPACK_IMPORTED_MODULE_5__shared_constants_actions__["L" /* MESSAGE_ADD_ALL */],
            payload: errors
          });

        case 22:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this, [[4, 12]]);
}

function userSaga() {
  return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function userSaga$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["takeEvery"])(__WEBPACK_IMPORTED_MODULE_5__shared_constants_actions__["O" /* NETWORK_CHANGED */], fetchUser);

        case 2:
          _context4.next = 4;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["takeEvery"])(__WEBPACK_IMPORTED_MODULE_5__shared_constants_actions__["o" /* CREATE_USER */], createUser);

        case 4:
          _context4.next = 6;
          return Object(__WEBPACK_IMPORTED_MODULE_1_redux_saga_effects__["takeEvery"])(__WEBPACK_IMPORTED_MODULE_5__shared_constants_actions__["W" /* UPDATE_USER */], updateUser);

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, this);
}
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(fetchUser, "fetchUser", "/Users/shain/repositories/bitguild/PortalClient/client/sagas/user.js");
  reactHotLoader.register(createUser, "createUser", "/Users/shain/repositories/bitguild/PortalClient/client/sagas/user.js");
  reactHotLoader.register(updateUser, "updateUser", "/Users/shain/repositories/bitguild/PortalClient/client/sagas/user.js");
  reactHotLoader.register(userSaga, "userSaga", "/Users/shain/repositories/bitguild/PortalClient/client/sagas/user.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./client/store.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__("redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_saga__ = __webpack_require__("redux-saga");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_saga___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_saga__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_devtools_extension__ = __webpack_require__("redux-devtools-extension");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_devtools_extension___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux_devtools_extension__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_localstorage__ = __webpack_require__("redux-localstorage");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_localstorage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_redux_localstorage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_redux_localstorage_lib_adapters_localStorage__ = __webpack_require__("redux-localstorage/lib/adapters/localStorage");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_redux_localstorage_lib_adapters_localStorage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_redux_localstorage_lib_adapters_localStorage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_redux_thunk__ = __webpack_require__("redux-thunk");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_redux_logger__ = __webpack_require__("redux-logger");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_redux_logger___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_redux_logger__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__reducers_index__ = __webpack_require__("./client/reducers/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sagas__ = __webpack_require__("./client/sagas/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_constants_language__ = __webpack_require__("./shared/constants/language.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_intl_setup__ = __webpack_require__("./shared/intl/setup.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_redux_localstorage_filter__ = __webpack_require__("redux-localstorage-filter");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_redux_localstorage_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_redux_localstorage_filter__);
(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













var defaultState = {
  intl: _objectSpread({
    locale: __WEBPACK_IMPORTED_MODULE_9__shared_constants_language__["a" /* defaultLanguage */],
    defaultLocale: __WEBPACK_IMPORTED_MODULE_9__shared_constants_language__["a" /* defaultLanguage */],
    enabledLanguages: __WEBPACK_IMPORTED_MODULE_9__shared_constants_language__["b" /* enabledLanguages */]
  }, __WEBPACK_IMPORTED_MODULE_10__shared_intl_setup__["a" /* localization */][__WEBPACK_IMPORTED_MODULE_9__shared_constants_language__["a" /* defaultLanguage */]] || {})
};

function configureStore() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var sagaMiddleware = __WEBPACK_IMPORTED_MODULE_1_redux_saga___default()();
  var middlewares = [__WEBPACK_IMPORTED_MODULE_5_redux_thunk___default.a, sagaMiddleware];

  if ("development" === "development" && !process.env.PORT) {// middlewares.push(createLogger()); // TODO - noise on server, perhaps use process.release.name
  }

  var composeEnhancers = __WEBPACK_IMPORTED_MODULE_0_redux__["compose"];

  if (true) {
    composeEnhancers = __WEBPACK_IMPORTED_MODULE_2_redux_devtools_extension__["composeWithDevTools"];
  }

  var storage = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["compose"])(__WEBPACK_IMPORTED_MODULE_11_redux_localstorage_filter___default()(["gifts"]))(__WEBPACK_IMPORTED_MODULE_4_redux_localstorage_lib_adapters_localStorage___default()(typeof window !== "undefined" ? window.localStorage : {})); // this fixes bug with SSR

  var reducers = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["compose"])(Object(__WEBPACK_IMPORTED_MODULE_3_redux_localstorage__["mergePersistedState"])())(__WEBPACK_IMPORTED_MODULE_7__reducers_index__["a" /* default */]);
  var store = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["createStore"])(reducers, initialState, composeEnhancers(__WEBPACK_IMPORTED_MODULE_0_redux__["applyMiddleware"].apply(void 0, middlewares), __WEBPACK_IMPORTED_MODULE_3_redux_localstorage___default()(storage, "gitbuild"))); // sagaMiddleware.run(rootSaga);

  store.runSagaTask = function () {
    store.sagaTask = sagaMiddleware.run(__WEBPACK_IMPORTED_MODULE_8__sagas__["a" /* default */]);
  }; // run the rootSaga initially


  store.runSagaTask();

  if (false) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(require.resolve("./reducers"), function () {
      store.replaceReducer(rootReducers);
    });
  }

  return store;
}

var _default = configureStore;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(defaultState, "defaultState", "/Users/shain/repositories/bitguild/PortalClient/client/store.js");
  reactHotLoader.register(configureStore, "configureStore", "/Users/shain/repositories/bitguild/PortalClient/client/store.js");
  reactHotLoader.register(_default, "default", "/Users/shain/repositories/bitguild/PortalClient/client/store.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./client/utils/api.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (immutable) */ __webpack_exports__["a"] = callAPI;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch__ = __webpack_require__("isomorphic-fetch");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch__);
(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();


function callAPI(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var prefix = ( true ? "http://localhost:7000" : "") + "/api";
  return __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch___default()(prefix + url, options).then(function (response) {
    return response.json().then(function (json) {
      return {
        json: json,
        response: response
      };
    });
  }).then(function (_ref) {
    var json = _ref.json,
        response = _ref.response;

    if (!response.ok) {
      return Promise.reject(json.errors);
    }

    return json;
  });
}
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(callAPI, "callAPI", "/Users/shain/repositories/bitguild/PortalClient/client/utils/api.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./client/utils/chat.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export _sb */
/* unused harmony export _user */
/* unused harmony export sbp */
/* unused harmony export firstNameLastInitial */
/* unused harmony export chatNickName */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return channels; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return findChannelByName; });
/* unused harmony export getChannelByName */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return createChannelWithName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return setChannelByName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return messages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return sendMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return channelNameForLocale; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__("@babel/runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bluebird__ = __webpack_require__("bluebird");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sendbird__ = __webpack_require__("sendbird");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_sendbird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_sendbird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_constants_language__ = __webpack_require__("./shared/constants/language.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ramda__ = __webpack_require__("ramda");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ramda__);


(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }





var _sb = null;
var _user = null;
/**
 * Simple utility function to promisify SendBird calls
 * @param {*} fn
 */

var sbp = function sbp(fn) {
  return new __WEBPACK_IMPORTED_MODULE_1_bluebird___default.a(function (resolve, reject) {
    return fn(function (res, err) {
      return err ? reject(err) : resolve(res);
    });
  });
};
var firstNameLastInitial = function firstNameLastInitial(name) {
  var parts = Object(__WEBPACK_IMPORTED_MODULE_4_ramda__["split"])(/\s+/, name);
  var firstName = Object(__WEBPACK_IMPORTED_MODULE_4_ramda__["head"])(parts);
  var lastName = "";
  if (Object(__WEBPACK_IMPORTED_MODULE_4_ramda__["length"])(parts) > 1) lastName = Object(__WEBPACK_IMPORTED_MODULE_4_ramda__["last"])(parts);
  var lastInitial = Object(__WEBPACK_IMPORTED_MODULE_4_ramda__["isEmpty"])(lastName) ? "" : " ".concat(Object(__WEBPACK_IMPORTED_MODULE_4_ramda__["toUpper"])(Object(__WEBPACK_IMPORTED_MODULE_4_ramda__["head"])(lastName)), ".");
  return "".concat(firstName).concat(lastInitial);
};
var chatNickName = function chatNickName(nickname) {
  return firstNameLastInitial(nickname);
};
var init =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee(wallet, nickname) {
    return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _sb = new __WEBPACK_IMPORTED_MODULE_2_sendbird___default.a({
              appId: "BB1E0777-B8CE-44DF-BA37-63EBA2E858F1"
            });
            _context.next = 3;
            return sbp(function (cb) {
              return _sb.connect(wallet, cb);
            });

          case 3:
            _user = _context.sent;
            _context.next = 6;
            return sbp(function (cb) {
              return _sb.updateCurrentUserInfo(chatNickName(nickname), null, cb);
            });

          case 6:
            _user = _context.sent;
            return _context.abrupt("return", [_sb, _user]);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function init(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var channels =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee2() {
    var sb,
        query,
        _args2 = arguments;
    return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            sb = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : _sb;
            query = sb.OpenChannel.createOpenChannelListQuery();
            return _context2.abrupt("return", sbp(function (cb) {
              return query.next(cb);
            }));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function channels() {
    return _ref2.apply(this, arguments);
  };
}();
var findChannelByName = function findChannelByName(name, channels) {
  var sb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _sb;
  return Object(__WEBPACK_IMPORTED_MODULE_4_ramda__["find"])(Object(__WEBPACK_IMPORTED_MODULE_4_ramda__["propEq"])("name", name), channels);
};
var getChannelByName =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee3(name, channel) {
    var sb,
        _args3 = arguments;
    return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            sb = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : _sb;
            return _context3.abrupt("return", sbp(function (cb) {
              return sb.OpenChannel.getChannel(channel.url, cb);
            }));

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getChannelByName(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();
var createChannelWithName =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee4(name) {
    var operators,
        sb,
        _args4 = arguments;
    return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            operators = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : null;
            sb = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : _sb;
            return _context4.abrupt("return", sbp(function (cb) {
              return sb.OpenChannel.createChannel(name, null, null, operators, null, cb);
            }));

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function createChannelWithName(_x5) {
    return _ref4.apply(this, arguments);
  };
}();
var setChannelByName =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee5(name, channels) {
    var channel;
    return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            channel = findChannelByName(name, channels);

            if (channel) {
              _context5.next = 3;
              break;
            }

            return _context5.abrupt("return");

          case 3:
            _context5.next = 5;
            return sbp(function (cb) {
              return channel.enter(cb);
            });

          case 5:
            return _context5.abrupt("return", channel);

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function setChannelByName(_x6, _x7) {
    return _ref5.apply(this, arguments);
  };
}();
var messages =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee6(channel) {
    var query, messages;
    return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            query = channel.createPreviousMessageListQuery();
            _context6.next = 3;
            return sbp(function (cb) {
              return query.load(30, true, cb);
            });

          case 3:
            messages = _context6.sent;
            return _context6.abrupt("return", Object(__WEBPACK_IMPORTED_MODULE_4_ramda__["reverse"])(messages));

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function messages(_x8) {
    return _ref6.apply(this, arguments);
  };
}();
var sendMessage =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee7(msg, channel) {
    return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", sbp(function (cb) {
              return channel.sendUserMessage(msg, null, null, cb);
            }));

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function sendMessage(_x9, _x10) {
    return _ref7.apply(this, arguments);
  };
}();
var channelNameForLocale = function channelNameForLocale(locale) {
  /* Channel locale is always -en, unless the environment is 'production' */
  var channelLocale =  false ? locale : __WEBPACK_IMPORTED_MODULE_3__shared_constants_language__["a" /* defaultLanguage */];
  /* Channel names follow this scheme: BitGuild-${env}-${locale}, ex: BitGuild-production-en */

  return "BitGuild-".concat("development", "-").concat(channelLocale);
};
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_sb, "_sb", "/Users/shain/repositories/bitguild/PortalClient/client/utils/chat.js");
  reactHotLoader.register(_user, "_user", "/Users/shain/repositories/bitguild/PortalClient/client/utils/chat.js");
  reactHotLoader.register(sbp, "sbp", "/Users/shain/repositories/bitguild/PortalClient/client/utils/chat.js");
  reactHotLoader.register(firstNameLastInitial, "firstNameLastInitial", "/Users/shain/repositories/bitguild/PortalClient/client/utils/chat.js");
  reactHotLoader.register(chatNickName, "chatNickName", "/Users/shain/repositories/bitguild/PortalClient/client/utils/chat.js");
  reactHotLoader.register(init, "init", "/Users/shain/repositories/bitguild/PortalClient/client/utils/chat.js");
  reactHotLoader.register(channels, "channels", "/Users/shain/repositories/bitguild/PortalClient/client/utils/chat.js");
  reactHotLoader.register(findChannelByName, "findChannelByName", "/Users/shain/repositories/bitguild/PortalClient/client/utils/chat.js");
  reactHotLoader.register(getChannelByName, "getChannelByName", "/Users/shain/repositories/bitguild/PortalClient/client/utils/chat.js");
  reactHotLoader.register(createChannelWithName, "createChannelWithName", "/Users/shain/repositories/bitguild/PortalClient/client/utils/chat.js");
  reactHotLoader.register(setChannelByName, "setChannelByName", "/Users/shain/repositories/bitguild/PortalClient/client/utils/chat.js");
  reactHotLoader.register(messages, "messages", "/Users/shain/repositories/bitguild/PortalClient/client/utils/chat.js");
  reactHotLoader.register(sendMessage, "sendMessage", "/Users/shain/repositories/bitguild/PortalClient/client/utils/chat.js");
  reactHotLoader.register(channelNameForLocale, "channelNameForLocale", "/Users/shain/repositories/bitguild/PortalClient/client/utils/chat.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./client/utils/location.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export readFromString */
/* harmony export (immutable) */ __webpack_exports__["a"] = readFromQueryString;
(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function readFromString(name, string, delimeter) {
  var parts = string.split(delimeter);

  for (var i = parts.length - 1; i >= 0; i--) {
    var _parts$i$split = parts[i].split("="),
        _parts$i$split2 = _slicedToArray(_parts$i$split, 2),
        key = _parts$i$split2[0],
        value = _parts$i$split2[1];

    if (name === key) {
      return decodeURIComponent(value);
    }
  }

  return "";
}
function readFromQueryString(name) {
  var search = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.location.search;
  var delimeter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "&";
  return readFromString(name, search.slice(1), delimeter);
}
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(readFromString, "readFromString", "/Users/shain/repositories/bitguild/PortalClient/client/utils/location.js");
  reactHotLoader.register(readFromQueryString, "readFromQueryString", "/Users/shain/repositories/bitguild/PortalClient/client/utils/location.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./client/utils/network.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

var _default = {
  "1": {
    token: process.env.MAINNET_TOKEN_CONTRACT_ADDR,
    topup: process.env.MAINNET_TOPUP_CONTRACT_ADDR,
    oracle: process.env.MAINNET_ORACLE_CONTRACT_ADDR
  },
  "4": {
    token: process.env.RINKEBY_TOKEN_CONTRACT_ADDR,
    topup: process.env.RINKEBY_TOPUP_CONTRACT_ADDR,
    oracle: process.env.RINKEBY_ORACLE_CONTRACT_ADDR
  }
};
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/Users/shain/repositories/bitguild/PortalClient/client/utils/network.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./components/common/galistener.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GAListener; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_ga__ = __webpack_require__("react-ga");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_ga___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_ga__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
var _class, _temp;

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




var GAListener = (_temp = _class =
/*#__PURE__*/
function (_Component) {
  _inherits(GAListener, _Component);

  function GAListener() {
    _classCallCheck(this, GAListener);

    return _possibleConstructorReturn(this, (GAListener.__proto__ || Object.getPrototypeOf(GAListener)).apply(this, arguments));
  }

  _createClass(GAListener, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!process.browser) return;
      __WEBPACK_IMPORTED_MODULE_1_react_ga___default.a.initialize(this.props.trackingId);
      GAListener.sendPageView(this.context.router.pathname);
      this.context.router.beforePopState(function (pathname) {
        return GAListener.sendPageView(pathname);
      });
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children || null;
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
    value: function getInitialProps(ctx) {
      return {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID
      };
    }
  }, {
    key: "sendPageView",
    value: function sendPageView(pathname) {
      if (pathname) {
        __WEBPACK_IMPORTED_MODULE_1_react_ga___default.a.set({
          page: pathname
        });
        __WEBPACK_IMPORTED_MODULE_1_react_ga___default.a.pageview(pathname);
      }
    }
  }]);

  return GAListener;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]), _class.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node), __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node]),
  trackingId: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string
}, _class.contextTypes = {
  router: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object
}, _temp);

;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(GAListener, "GAListener", "/Users/shain/repositories/bitguild/PortalClient/components/common/galistener.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./components/common/metamask.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MetaMask; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__popups_metamask_install__ = __webpack_require__("./components/popups/metamask.install.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__popups_metamask_login__ = __webpack_require__("./components/popups/metamask.login.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__popups_metamask_network__ = __webpack_require__("./components/popups/metamask.network.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__popups_register__ = __webpack_require__("./components/popups/register.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_redux__ = __webpack_require__("react-redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_constants_actions__ = __webpack_require__("./shared/constants/actions.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__client_utils_network__ = __webpack_require__("./client/utils/network.js");
var _dec,
    _class,
    _class2,
    _temp2,
    _jsxFileName = "/Users/shain/repositories/bitguild/PortalClient/components/common/metamask.jsx";

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










var MetaMask = (_dec = Object(__WEBPACK_IMPORTED_MODULE_6_react_redux__["connect"])(function (state) {
  return {
    account: state.account,
    network: state.network,
    user: state.user
  };
}), _dec(_class = (_temp2 = _class2 =
/*#__PURE__*/
function (_Component) {
  _inherits(MetaMask, _Component);

  function MetaMask() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, MetaMask);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = MetaMask.__proto__ || Object.getPrototypeOf(MetaMask)).call.apply(_ref, [this].concat(args))), _this.state = {
      interval: null
    }, _temp));
  }

  _createClass(MetaMask, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (MetaMask.isInstalled()) {
        this.setState({
          interval: setInterval(function () {
            if (window.web3.eth.accounts[0] !== _this2.props.account.wallet) {
              if (window.web3.eth.accounts.length) {
                _this2.props.dispatch({
                  type: __WEBPACK_IMPORTED_MODULE_7__shared_constants_actions__["a" /* ACCOUNT_CHANGED */],
                  payload: {
                    wallet: window.web3.eth.accounts[0]
                  }
                });
              } else if (_this2.props.account.isLoading || _this2.props.account.success) {
                _this2.props.dispatch({
                  type: __WEBPACK_IMPORTED_MODULE_7__shared_constants_actions__["b" /* ACCOUNT_ERROR */]
                });
              }
            }
          }, 100)
        });
        window.web3.eth.filter("latest").watch(function (error, result) {
          if (error) {
            _this2.props.dispatch({
              type: __WEBPACK_IMPORTED_MODULE_7__shared_constants_actions__["K" /* MESSAGE_ADD */],
              payload: error
            });
          } else {
            _this2.props.dispatch({
              type: __WEBPACK_IMPORTED_MODULE_7__shared_constants_actions__["R" /* NEW_BLOCK */],
              payload: result
            });
          }
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.state.interval);
    }
  }, {
    key: "render",
    value: function render() {
      console.log("metamask: this.props: ", this.props);
      var _props = this.props,
          network = _props.network,
          account = _props.account,
          pathname = _props.pathname,
          user = _props.user;
      var whitelist = ["/faq", "/airdrop"];

      if (!pathname || whitelist.includes(pathname)) {
        return null;
      }

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Fragment, null, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__popups_metamask_install__["a" /* default */], {
        show: !MetaMask.isInstalled(),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 96
        }
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__popups_metamask_login__["a" /* default */], {
        show: !account.isLoading && !account.success,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 97
        }
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__popups_metamask_network__["a" /* default */], {
        show: !network.isLoading && network.success && !Object.keys(__WEBPACK_IMPORTED_MODULE_8__client_utils_network__["a" /* default */]).includes(network.data.id),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 98
        }
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__popups_register__["a" /* default */], {
        show: !network.isLoading && network.success && Object.keys(__WEBPACK_IMPORTED_MODULE_8__client_utils_network__["a" /* default */]).includes(network.data.id) && !user.isLoading && !user.success,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 99
        }
      }));
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
    value: function getInitialProps(ctx) {
      return {
        pathname: ctx.req.originalUrl
      };
    }
  }, {
    key: "isInstalled",
    value: function isInstalled() {
      return typeof window !== "undefined" && window.web3;
    }
  }]);

  return MetaMask;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]), _class2.propTypes = {
  account: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.object,
  network: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.object,
  user: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.object,
  dispatch: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  pathname: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string
}, _temp2)) || _class);

;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(MetaMask, "MetaMask", "/Users/shain/repositories/bitguild/PortalClient/components/common/metamask.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./components/inputs/input.group.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__input__ = __webpack_require__("./components/inputs/input.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__withGroup__ = __webpack_require__("./components/inputs/withGroup.jsx");
(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();




var _default = Object(__WEBPACK_IMPORTED_MODULE_1__withGroup__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_0__input__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/Users/shain/repositories/bitguild/PortalClient/components/inputs/input.group.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./components/inputs/input.group.validation.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__input_group__ = __webpack_require__("./components/inputs/input.group.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__withValidation__ = __webpack_require__("./components/inputs/withValidation.jsx");
(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();




var _default = Object(__WEBPACK_IMPORTED_MODULE_1__withValidation__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_0__input_group__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "/Users/shain/repositories/bitguild/PortalClient/components/inputs/input.group.validation.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./components/inputs/input.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Input; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_bootstrap__ = __webpack_require__("react-bootstrap");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_bootstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_bootstrap__);
var _class,
    _temp,
    _jsxFileName = "/Users/shain/repositories/bitguild/PortalClient/components/inputs/input.jsx";

(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var Input = (_temp = _class =
/*#__PURE__*/
function (_Component) {
  _inherits(Input, _Component);

  function Input() {
    _classCallCheck(this, Input);

    return _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).apply(this, arguments));
  }

  _createClass(Input, [{
    key: "render",
    value: function render() {
      var children = this.props.children;
      var props = this.props;
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_bootstrap__["FormControl"], _extends({}, props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 47
        }
      }), children);
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return Input;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]), _class.propTypes = {
  componentClass: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  type: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  placeholder: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number]),
  value: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool]),
  defaultValue: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool]),
  name: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  disabled: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  multiple: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  onChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node,
  autoComplete: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
}, _class.defaultProps = {
  // value: "",
  // defaultValue: "",
  componentClass: "input",
  type: "text",
  multiple: false,
  disabled: false,
  autoComplete: null,
  onChange: Function.prototype
}, _temp);

;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Input, "Input", "/Users/shain/repositories/bitguild/PortalClient/components/inputs/input.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./components/inputs/withGroup.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (immutable) */ __webpack_exports__["a"] = withGroup;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__("lodash");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_bootstrap__ = __webpack_require__("react-bootstrap");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_bootstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_bootstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_intl__ = __webpack_require__("react-intl");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_intl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_intl__);
var _jsxFileName = "/Users/shain/repositories/bitguild/PortalClient/components/inputs/withGroup.jsx";

(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






function withGroup(Input) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    _inherits(InputWithGroup, _Component);

    function InputWithGroup() {
      _classCallCheck(this, InputWithGroup);

      return _possibleConstructorReturn(this, (InputWithGroup.__proto__ || Object.getPrototypeOf(InputWithGroup)).apply(this, arguments));
    }

    _createClass(InputWithGroup, [{
      key: "render",
      value: function render() {
        var _props = this.props,
            required = _props.required,
            validation = _props.validation;
        var props = Object(__WEBPACK_IMPORTED_MODULE_2_lodash__["omit"])(this.props, ["validation"]);
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_bootstrap__["FormGroup"], {
          controlId: this.props.name,
          validationState: validation ? "error" : null,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 24
          }
        }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_bootstrap__["Col"], {
          componentClass: __WEBPACK_IMPORTED_MODULE_3_react_bootstrap__["ControlLabel"],
          __source: {
            fileName: _jsxFileName,
            lineNumber: 25
          }
        }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_intl__["FormattedMessage"], {
          id: "fields.".concat(this.props.name, ".label"),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 26
          }
        }), required ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("sup", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 27
          }
        }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_bootstrap__["Glyphicon"], {
          glyph: "asterisk",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 27
          }
        })) : null), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_bootstrap__["Col"], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 29
          }
        }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Input, _extends({}, props, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 30
          }
        })), validation ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_bootstrap__["HelpBlock"], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 31
          }
        }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_intl__["FormattedMessage"], {
          id: "fields.".concat(validation.name, ".").concat(validation.reason),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 31
          }
        })) : null));
      }
    }, {
      key: "__reactstandin__regenerateByEval",
      // @ts-ignore
      value: function __reactstandin__regenerateByEval(key, code) {
        // @ts-ignore
        this[key] = eval(code);
      }
    }]);

    return InputWithGroup;
  }(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]), _class.propTypes = {
    name: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    required: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
    validation: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      name: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
      reason: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
    }),
    children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node
  }, _temp;
}
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(withGroup, "withGroup", "/Users/shain/repositories/bitguild/PortalClient/components/inputs/withGroup.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./components/inputs/withValidation.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (immutable) */ __webpack_exports__["a"] = withValidation;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__("react-redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__("lodash");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_constants_actions__ = __webpack_require__("./shared/constants/actions.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_intl__ = __webpack_require__("react-intl");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_intl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_intl__);
var _jsxFileName = "/Users/shain/repositories/bitguild/PortalClient/components/inputs/withValidation.jsx";

(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







function withValidation(Input) {
  var _dec, _class, _class2, _temp;

  var InputWithValidation = (_dec = Object(__WEBPACK_IMPORTED_MODULE_2_react_redux__["connect"])(function (state) {
    return {
      validations: state.validations
    };
  }), Object(__WEBPACK_IMPORTED_MODULE_5_react_intl__["injectIntl"])(_class = _dec(_class = (_temp = _class2 =
  /*#__PURE__*/
  function (_Component) {
    _inherits(InputWithValidation, _Component);

    function InputWithValidation() {
      _classCallCheck(this, InputWithValidation);

      return _possibleConstructorReturn(this, (InputWithValidation.__proto__ || Object.getPrototypeOf(InputWithValidation)).apply(this, arguments));
    }

    _createClass(InputWithValidation, [{
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var dispatch = this.props.dispatch;
        var validation = this.getValidation(this.props.name);

        if (validation) {
          dispatch({
            type: __WEBPACK_IMPORTED_MODULE_4__shared_constants_actions__["_2" /* VALIDATION_REMOVE */],
            payload: validation
          });
        }
      }
    }, {
      key: "onChange",
      value: function onChange(e) {
        var _props = this.props,
            name = _props.name,
            dispatch = _props.dispatch,
            onChange = _props.onChange;
        var validation = this.getValidation(name);

        if (validation) {
          dispatch({
            type: __WEBPACK_IMPORTED_MODULE_4__shared_constants_actions__["_2" /* VALIDATION_REMOVE */],
            payload: validation
          });
        }

        onChange(e);
      }
    }, {
      key: "getValidation",
      value: function getValidation(name) {
        var validations = this.props.validations;
        return validations.find(function (validation) {
          return validation.name === name;
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _props2 = this.props,
            name = _props2.name,
            intl = _props2.intl;
        var props = Object(__WEBPACK_IMPORTED_MODULE_3_lodash__["omit"])(this.props, ["validations", "dispatch", "intl"]);
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Input, _extends({}, props, {
          onChange: this.onChange.bind(this),
          validation: this.getValidation(name),
          onInvalid: function onInvalid(e) {
            e.target.parentNode.parentNode.classList.add("has-error");

            if (e.target.validity.valueMissing) {
              e.target.setCustomValidity(intl.formatMessage({
                id: "fields.".concat(name, ".required")
              }));
            } else if (e.target.validity.typeMismatch) {
              e.target.setCustomValidity(intl.formatMessage({
                id: "fields.".concat(name, ".invalid")
              }));
            } else if (e.target.validity.tooShort) {
              e.target.setCustomValidity(intl.formatMessage({
                id: "fields.".concat(name, ".minlength")
              }));
            } else if (e.target.validity.tooLong) {
              e.target.setCustomValidity(intl.formatMessage({
                id: "fields.".concat(name, ".maxlength")
              }));
            }
          },
          onInput: function onInput(e) {
            e.target.parentNode.parentNode.classList.remove("has-error");
            e.target.setCustomValidity("");
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 63
          }
        }));
      }
    }, {
      key: "__reactstandin__regenerateByEval",
      // @ts-ignore
      value: function __reactstandin__regenerateByEval(key, code) {
        // @ts-ignore
        this[key] = eval(code);
      }
    }]);

    return InputWithValidation;
  }(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]), _class2.propTypes = {
    validations: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array,
    onChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
    dispatch: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
    removeValidation: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
    name: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    intl: __WEBPACK_IMPORTED_MODULE_5_react_intl__["intlShape"]
  }, _class2.defaultProps = {
    validations: [],
    onChange: Function.prototype
  }, _temp)) || _class) || _class);
  return InputWithValidation;
}
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(withValidation, "withValidation", "/Users/shain/repositories/bitguild/PortalClient/components/inputs/withValidation.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./components/popups/metamask.install.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MetaMaskInstallPopup; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_bootstrap__ = __webpack_require__("react-bootstrap");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_bootstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_bootstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_intl__ = __webpack_require__("react-intl");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_intl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_intl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_prop_types__);
var _class,
    _temp,
    _jsxFileName = "/Users/shain/repositories/bitguild/PortalClient/components/popups/metamask.install.jsx";

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





var MetaMaskInstallPopup = (_temp = _class =
/*#__PURE__*/
function (_Component) {
  _inherits(MetaMaskInstallPopup, _Component);

  function MetaMaskInstallPopup() {
    _classCallCheck(this, MetaMaskInstallPopup);

    return _possibleConstructorReturn(this, (MetaMaskInstallPopup.__proto__ || Object.getPrototypeOf(MetaMaskInstallPopup)).apply(this, arguments));
  }

  _createClass(MetaMaskInstallPopup, [{
    key: "render",
    value: function render() {
      var show = this.props.show;
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_bootstrap__["Modal"], {
        show: show,
        className: "metamask-install",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_bootstrap__["Modal"].Body, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h2", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_intl__["FormattedMessage"], {
        id: "modals.metamask-install.title",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        }
      })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        }
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_intl__["FormattedMessage"], {
        id: "modals.metamask-install.p1",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        }
      })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_intl__["FormattedMessage"], {
        id: "modals.metamask-install.p2",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        }
      })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        }
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_bootstrap__["Form"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_bootstrap__["Button"], {
        className: "btn-block text-uppercase",
        href: "https://metamask.io/",
        target: "_blank",
        rel: "noopener noreferrer",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_intl__["FormattedMessage"], {
        id: "buttons.install",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        }
      }))), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p", {
        className: "note",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_intl__["FormattedHTMLMessage"], {
        id: "modals.metamask-install.faq",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        }
      })))));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return MetaMaskInstallPopup;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]), _class.propTypes = {
  show: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.bool
}, _temp);

;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(MetaMaskInstallPopup, "MetaMaskInstallPopup", "/Users/shain/repositories/bitguild/PortalClient/components/popups/metamask.install.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./components/popups/metamask.login.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MetaMaskLoginPopup; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_bootstrap__ = __webpack_require__("react-bootstrap");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_bootstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_bootstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_intl__ = __webpack_require__("react-intl");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_intl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_intl__);
var _class,
    _temp,
    _jsxFileName = "/Users/shain/repositories/bitguild/PortalClient/components/popups/metamask.login.jsx";

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





var MetaMaskLoginPopup = (_temp = _class =
/*#__PURE__*/
function (_Component) {
  _inherits(MetaMaskLoginPopup, _Component);

  function MetaMaskLoginPopup() {
    _classCallCheck(this, MetaMaskLoginPopup);

    return _possibleConstructorReturn(this, (MetaMaskLoginPopup.__proto__ || Object.getPrototypeOf(MetaMaskLoginPopup)).apply(this, arguments));
  }

  _createClass(MetaMaskLoginPopup, [{
    key: "render",
    value: function render() {
      var show = this.props.show;
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_bootstrap__["Modal"], {
        show: show,
        className: "metamask-login",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_bootstrap__["Modal"].Body, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h2", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_intl__["FormattedMessage"], {
        id: "modals.metamask-login.title",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        }
      })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        }
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_intl__["FormattedMessage"], {
        id: "modals.metamask-login.p1",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        }
      })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p", {
        className: "note",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_intl__["FormattedHTMLMessage"], {
        id: "modals.metamask-login.faq",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        }
      })))));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return MetaMaskLoginPopup;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]), _class.propTypes = {
  show: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool
}, _temp);

;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(MetaMaskLoginPopup, "MetaMaskLoginPopup", "/Users/shain/repositories/bitguild/PortalClient/components/popups/metamask.login.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./components/popups/metamask.network.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MetaMaskNetworkPopup; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_bootstrap__ = __webpack_require__("react-bootstrap");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_bootstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_bootstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_intl__ = __webpack_require__("react-intl");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_intl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_intl__);
var _class,
    _temp,
    _jsxFileName = "/Users/shain/repositories/bitguild/PortalClient/components/popups/metamask.network.jsx";

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





var MetaMaskNetworkPopup = (_temp = _class =
/*#__PURE__*/
function (_Component) {
  _inherits(MetaMaskNetworkPopup, _Component);

  function MetaMaskNetworkPopup() {
    _classCallCheck(this, MetaMaskNetworkPopup);

    return _possibleConstructorReturn(this, (MetaMaskNetworkPopup.__proto__ || Object.getPrototypeOf(MetaMaskNetworkPopup)).apply(this, arguments));
  }

  _createClass(MetaMaskNetworkPopup, [{
    key: "render",
    value: function render() {
      var show = this.props.show;
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_bootstrap__["Modal"], {
        show: show,
        className: "metamask-network",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_bootstrap__["Modal"].Body, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h2", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_intl__["FormattedMessage"], {
        id: "modals.metamask-network.title",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        }
      })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        }
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_intl__["FormattedMessage"], {
        id: "modals.metamask-network.p1",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        }
      })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p", {
        className: "note",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_intl__["FormattedHTMLMessage"], {
        id: "modals.metamask-network.faq",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        }
      })))));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return MetaMaskNetworkPopup;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]), _class.propTypes = {
  show: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool
}, _temp);

;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(MetaMaskNetworkPopup, "MetaMaskNetworkPopup", "/Users/shain/repositories/bitguild/PortalClient/components/popups/metamask.network.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./components/popups/register.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPopup; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__("classnames");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_bootstrap__ = __webpack_require__("react-bootstrap");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_bootstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_bootstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux__ = __webpack_require__("react-redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_intl__ = __webpack_require__("react-intl");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_intl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_intl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_constants_placeholder__ = __webpack_require__("./shared/constants/placeholder.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_constants_regexp__ = __webpack_require__("./shared/constants/regexp.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_constants_actions__ = __webpack_require__("./shared/constants/actions.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_constants_language__ = __webpack_require__("./shared/constants/language.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__inputs_input_group_validation__ = __webpack_require__("./components/inputs/input.group.validation.jsx");
var _dec,
    _class,
    _class2,
    _temp2,
    _jsxFileName = "/Users/shain/repositories/bitguild/PortalClient/components/popups/register.jsx";

(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }












var RegisterPopup = (_dec = Object(__WEBPACK_IMPORTED_MODULE_4_react_redux__["connect"])(function (state) {
  return {
    account: state.account,
    messages: state.messages
  };
}), Object(__WEBPACK_IMPORTED_MODULE_5_react_intl__["injectIntl"])(_class = _dec(_class = (_temp2 = _class2 =
/*#__PURE__*/
function (_Component) {
  _inherits(RegisterPopup, _Component);

  function RegisterPopup() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, RegisterPopup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = RegisterPopup.__proto__ || Object.getPrototypeOf(RegisterPopup)).call.apply(_ref, [this].concat(args))), _this.state = {
      formData: {
        get: function get(key) {
          return this[key];
        },
        wallet: _this.props.account.wallet,
        language: _this.props.intl.locale
      }
    }, _temp));
  }

  _createClass(RegisterPopup, [{
    key: "onSubmit",
    value: function onSubmit(e) {
      e.preventDefault();

      if (!this.isValid(Array.from(e.target.elements))) {
        return false;
      }

      this.setState({
        formData: new FormData(e.target)
      }, this.sign);
    }
  }, {
    key: "isValid",
    value: function isValid(a) {
      var intl = this.props.intl;
      var isValid = true;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = a[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _e = _step.value;

          switch (_e.name) {
            case "wallet":
              if (!window.web3.isAddress(_e.value)) {
                _e.parentNode.parentNode.classList.add("has-error");

                _e.setCustomValidity(intl.formatMessage({
                  id: "fields.wallet.invalid"
                }));

                isValid = false;
              }

              break;

            default:
              break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return isValid;
    }
  }, {
    key: "sign",
    value: function sign() {
      var _this2 = this;

      var _props = this.props,
          dispatch = _props.dispatch,
          intl = _props.intl;
      var message = window.web3.toHex(intl.formatMessage({
        id: "modals.register.text"
      }));
      var from = this.state.formData.get("wallet");
      window.web3.currentProvider.sendAsync({
        method: "personal_sign",
        params: [message, from],
        from: from
      }, function (err, result) {
        if (err || result.error) {
          dispatch({
            type: __WEBPACK_IMPORTED_MODULE_8__shared_constants_actions__["K" /* MESSAGE_ADD */],
            payload: err || result.error
          });
          return;
        }

        window.web3.currentProvider.sendAsync({
          method: "personal_ecRecover",
          params: [message, result.result],
          from: from
        }, function (err, recovered) {
          if (err || result.error) {
            dispatch({
              type: __WEBPACK_IMPORTED_MODULE_8__shared_constants_actions__["K" /* MESSAGE_ADD */],
              payload: err || result.error
            });
            return;
          }

          if (recovered.result === from) {
            dispatch({
              type: __WEBPACK_IMPORTED_MODULE_8__shared_constants_actions__["o" /* CREATE_USER */],
              payload: Array.from(_this2.state.formData.entries()).reduce(function (memo, pair) {
                return _objectSpread({}, memo, _defineProperty({}, pair[0], pair[1]));
              }, {})
            });
          } else {
            dispatch({
              type: __WEBPACK_IMPORTED_MODULE_8__shared_constants_actions__["K" /* MESSAGE_ADD */],
              payload: new Error(intl.formatMessage({
                id: "errors.spoofing-attempt"
              }, {
                wallet1: recovered.result,
                wallet2: from
              }))
            });
          }
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var show = this.props.show;
      var _props2 = this.props,
          user = _props2.user,
          intl = _props2.intl,
          network = _props2.network;
      var networkSuccess = network && !network.isLoading && network.success;
      var userSuccess = user && !user.isLoading && user.success;
      show = show || networkSuccess && userSuccess;
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_bootstrap__["Modal"], {
        show: show,
        className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()("register", {
          show: show
        }),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 153
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_bootstrap__["Modal"].Body, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 154
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_bootstrap__["Form"], {
        onSubmit: this.onSubmit.bind(this),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 155
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h2", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 156
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_intl__["FormattedMessage"], {
        id: "modals.register.title",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 157
        }
      })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10__inputs_input_group_validation__["a" /* default */], {
        name: "language",
        componentClass: "select",
        value: this.state.formData.get("language"),
        required: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 159
        }
      }, __WEBPACK_IMPORTED_MODULE_9__shared_constants_language__["b" /* enabledLanguages */].map(function (language) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_intl__["FormattedMessage"], {
          key: language,
          id: "components.language.".concat(language),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 166
          }
        }, function (formattedMessage) {
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("option", {
            key: language,
            value: language,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 167
            }
          }, formattedMessage);
        });
      })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10__inputs_input_group_validation__["a" /* default */], {
        name: "wallet",
        defaultValue: this.state.formData.get("wallet"),
        placeholder: __WEBPACK_IMPORTED_MODULE_6__shared_constants_placeholder__["c" /* wallet */],
        maxLength: "42",
        minLength: "42",
        required: true,
        readOnly: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 171
        }
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10__inputs_input_group_validation__["a" /* default */], {
        type: "email",
        name: "email",
        pattern: __WEBPACK_IMPORTED_MODULE_7__shared_constants_regexp__["a" /* reEmail */].source.replace("a-z", "a-zA-Z") // there is no `i` flag
        ,
        defaultValue: this.state.formData.get("email"),
        placeholder: __WEBPACK_IMPORTED_MODULE_6__shared_constants_placeholder__["a" /* email */],
        required: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 180
        }
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10__inputs_input_group_validation__["a" /* default */], {
        type: "text",
        name: "nickName",
        defaultValue: this.state.formData.get("nickName"),
        placeholder: __WEBPACK_IMPORTED_MODULE_6__shared_constants_placeholder__["b" /* nickName */],
        required: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 188
        }
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p", {
        className: "note",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 196
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_intl__["FormattedMessage"], {
        id: "modals.register.n1",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 196
        }
      })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p", {
        className: "note",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 197
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_intl__["FormattedMessage"], {
        id: "modals.register.n2",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 197
        }
      })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 199
        }
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_bootstrap__["Button"], {
        type: "submit",
        className: "btn-block text-uppercase",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 201
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_intl__["FormattedMessage"], {
        id: "buttons.register",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 202
        }
      })))));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps) {
      return {
        formData: {
          get: function get(key) {
            return this[key];
          },
          wallet: nextProps.account.wallet,
          language: nextProps.intl.locale
        }
      };
    }
  }]);

  return RegisterPopup;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]), _class2.propTypes = {
  account: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  dispatch: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  show: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  intl: __WEBPACK_IMPORTED_MODULE_5_react_intl__["intlShape"],
  messages: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array
}, _temp2)) || _class) || _class);

;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(RegisterPopup, "RegisterPopup", "/Users/shain/repositories/bitguild/PortalClient/components/popups/register.jsx");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

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

/***/ "./pages/_app.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__("@babel/runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_next_app__ = __webpack_require__("next/app");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_next_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_next_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_intl_redux__ = __webpack_require__("react-intl-redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_intl_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_intl_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_next_redux_wrapper__ = __webpack_require__("next-redux-wrapper");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_next_redux_wrapper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_next_redux_wrapper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_next_redux_saga__ = __webpack_require__("next-redux-saga");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_next_redux_saga___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_next_redux_saga__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__client_store__ = __webpack_require__("./client/store.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_common_galistener__ = __webpack_require__("./components/common/galistener.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_common_metamask__ = __webpack_require__("./components/common/metamask.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_popups_register__ = __webpack_require__("./components/popups/register.jsx");

var _jsxFileName = "/Users/shain/repositories/bitguild/PortalClient/pages/_app.js";

(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











var BGApp =
/*#__PURE__*/
function (_App) {
  _inherits(BGApp, _App);

  function BGApp() {
    _classCallCheck(this, BGApp);

    return _possibleConstructorReturn(this, (BGApp.__proto__ || Object.getPrototypeOf(BGApp)).apply(this, arguments));
  }

  _createClass(BGApp, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          Component = _props.Component,
          pageProps = _props.pageProps,
          metaMaskProps = _props.metaMaskProps,
          gaListenerProps = _props.gaListenerProps,
          store = _props.store;
      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_next_app__["Container"], {
        warnings: false,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 37
        }
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_intl_redux__["Provider"], {
        store: store,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 38
        }
      }, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react___default.a.Fragment, null, __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__components_common_metamask__["a" /* default */], _extends({}, metaMaskProps, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 40
        }
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__components_popups_register__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 41
        }
      }), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__components_common_galistener__["a" /* default */], _extends({}, gaListenerProps, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 42
        }
      })), __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(Component, _extends({}, pageProps, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 43
        }
      })))));
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
    value: function () {
      var _getInitialProps = _asyncToGenerator(
      /*#__PURE__*/
      __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee(_ref) {
        var Component, router, ctx, pageProps, gaListenerProps, metaMaskProps;
        return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                Component = _ref.Component, router = _ref.router, ctx = _ref.ctx;
                pageProps = {};

                if (!Component.getInitialProps) {
                  _context.next = 6;
                  break;
                }

                _context.next = 5;
                return Component.getInitialProps(ctx);

              case 5:
                pageProps = _context.sent;

              case 6:
                gaListenerProps = __WEBPACK_IMPORTED_MODULE_7__components_common_galistener__["a" /* default */].getInitialProps(ctx);
                metaMaskProps = __WEBPACK_IMPORTED_MODULE_8__components_common_metamask__["a" /* default */].getInitialProps(ctx);
                return _context.abrupt("return", {
                  pageProps: pageProps,
                  metaMaskProps: metaMaskProps,
                  gaListenerProps: gaListenerProps
                });

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function getInitialProps(_x) {
        return _getInitialProps.apply(this, arguments);
      };
    }()
  }]);

  return BGApp;
}(__WEBPACK_IMPORTED_MODULE_1_next_app___default.a);

var _default = __WEBPACK_IMPORTED_MODULE_4_next_redux_wrapper___default()(__WEBPACK_IMPORTED_MODULE_6__client_store__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_5_next_redux_saga___default()({
  async: true
})(BGApp));

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(BGApp, "BGApp", "/Users/shain/repositories/bitguild/PortalClient/pages/_app.js");
  reactHotLoader.register(_default, "default", "/Users/shain/repositories/bitguild/PortalClient/pages/_app.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./shared/constants/actions.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "K", function() { return MESSAGE_ADD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "L", function() { return MESSAGE_ADD_ALL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "M", function() { return MESSAGE_REMOVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "N", function() { return MESSAGE_REMOVE_ALL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_0", function() { return VALIDATION_ADD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_1", function() { return VALIDATION_ADD_ALL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_2", function() { return VALIDATION_REMOVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_3", function() { return VALIDATION_REMOVE_ALL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Z", function() { return USER_LOADING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "X", function() { return USER_CHANGED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Y", function() { return USER_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return CREATE_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "W", function() { return UPDATE_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ACCOUNT_CHANGED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ACCOUNT_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "R", function() { return NEW_BLOCK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "O", function() { return NETWORK_CHANGED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Q", function() { return NETWORK_LOADING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "P", function() { return NETWORK_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return BALANCE_ETH_LOADING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return BALANCE_ETH_CHANGED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return BALANCE_ETH_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return BALANCE_PLAT_LOADING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return BALANCE_PLAT_CHANGED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return BALANCE_PLAT_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "F", function() { return INVENTORY_GAMES_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "E", function() { return INVENTORY_GAMES_LOADING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C", function() { return INVENTORY_GAMES_CHANGED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "D", function() { return INVENTORY_GAMES_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "J", function() { return INVENTORY_ITEMS_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "I", function() { return INVENTORY_ITEMS_LOADING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "G", function() { return INVENTORY_ITEMS_CHANGED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H", function() { return INVENTORY_ITEMS_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V", function() { return RATE_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "S", function() { return RATE_CHANGED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "T", function() { return RATE_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "U", function() { return RATE_LOADING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return CHAT_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return CHAT_LOAD_MESSAGES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return CHAT_MESSAGE_RECEIVED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return CHAT_MESSAGE_SEND; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return CHAT_MESSAGE_SENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return CHAT_SET_CHANNEL; });
/* unused harmony export CHAT_RECEIVE_MESSAGE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return GAME_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return GAME_LOADING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return GAME_CHANGED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return GAME_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return GIFT_ADD_LOADING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return GIFT_ADD_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return GIFT_ADD_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return GIFT_REMOVE_LOADING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "B", function() { return GIFT_REMOVE_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return GIFT_REMOVE_ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return GAS_LOADING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return GAS_CHANGED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return GAS_ERROR; });
(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

var MESSAGE_ADD = "MESSAGE_ADD";
var MESSAGE_ADD_ALL = "MESSAGE_ADD_ALL";
var MESSAGE_REMOVE = "MESSAGE_REMOVE";
var MESSAGE_REMOVE_ALL = "MESSAGE_REMOVE_ALL";
var VALIDATION_ADD = "VALIDATION_ADD";
var VALIDATION_ADD_ALL = "VALIDATION_ADD_ALL";
var VALIDATION_REMOVE = "VALIDATION_REMOVE";
var VALIDATION_REMOVE_ALL = "VALIDATION_REMOVE_ALL";
var USER_LOADING = "USER_LOADING";
var USER_CHANGED = "USER_CHANGED";
var USER_ERROR = "USER_ERROR";
var CREATE_USER = "CREATE_USER";
var UPDATE_USER = "UPDATE_USER";
var ACCOUNT_CHANGED = "ACCOUNT_CHANGED";
var ACCOUNT_ERROR = "ACCOUNT_ERROR";
var NEW_BLOCK = "NEW_BLOCK";
var NETWORK_CHANGED = "NETWORK_CHANGED";
var NETWORK_LOADING = "NETWORK_LOADING";
var NETWORK_ERROR = "NETWORK_ERROR";
var BALANCE_ETH_LOADING = "BALANCE_ETH_LOADING";
var BALANCE_ETH_CHANGED = "BALANCE_ETH_CHANGED";
var BALANCE_ETH_ERROR = "BALANCE_ETH_ERROR";
var BALANCE_PLAT_LOADING = "BALANCE_PLAT_LOADING";
var BALANCE_PLAT_CHANGED = "BALANCE_PLAT_CHANGED";
var BALANCE_PLAT_ERROR = "BALANCE_PLAT_ERROR";
var INVENTORY_GAMES_REQUEST = "INVENTORY_GAMES_REQUEST";
var INVENTORY_GAMES_LOADING = "INVENTORY_GAMES_LOADING";
var INVENTORY_GAMES_CHANGED = "INVENTORY_GAMES_CHANGED";
var INVENTORY_GAMES_ERROR = "INVENTORY_GAMES_ERROR";
var INVENTORY_ITEMS_REQUEST = "INVENTORY_ITEMS_REQUEST";
var INVENTORY_ITEMS_LOADING = "INVENTORY_ITEMS_LOADING";
var INVENTORY_ITEMS_CHANGED = "INVENTORY_ITEMS_CHANGED";
var INVENTORY_ITEMS_ERROR = "INVENTORY_ITEMS_ERROR";
var RATE_REQUEST = "RATE_REQUEST";
var RATE_CHANGED = "RATE_CHANGED";
var RATE_ERROR = "RATE_ERROR";
var RATE_LOADING = "RATE_LOADING";
var CHAT_INIT = "CHAT_INIT";
var CHAT_LOAD_MESSAGES = "CHAT_LOAD_MESSAGES";
var CHAT_MESSAGE_RECEIVED = "CHAT_MESSAGE_RECEIVED";
var CHAT_MESSAGE_SEND = "CHAT_MESSAGE_SEND";
var CHAT_MESSAGE_SENT = "CHAT_MESSAGE_SENT";
var CHAT_SET_CHANNEL = "CHAT_SET_CHANNEL";
var CHAT_RECEIVE_MESSAGE = "CHAT_RECEIVE_MESSAGE";
var GAME_REQUEST = "GAME_REQUEST";
var GAME_LOADING = "GAME_LOADING";
var GAME_CHANGED = "GAME_CHANGED";
var GAME_ERROR = "GAME_ERROR";
var GIFT_ADD_LOADING = "GIFT_ADD_LOADING";
var GIFT_ADD_SUCCESS = "GIFT_ADD_SUCCESS";
var GIFT_ADD_ERROR = "GIFT_ADD_ERROR";
var GIFT_REMOVE_LOADING = "GIFT_REMOVE_LOADING";
var GIFT_REMOVE_SUCCESS = "GIFT_REMOVE_SUCCESS";
var GIFT_REMOVE_ERROR = "GIFT_REMOVE_ERROR";
var GAS_LOADING = "GAS_LOADING";
var GAS_CHANGED = "GAS_CHANGED";
var GAS_ERROR = "GAS_ERROR";
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(MESSAGE_ADD, "MESSAGE_ADD", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(MESSAGE_ADD_ALL, "MESSAGE_ADD_ALL", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(MESSAGE_REMOVE, "MESSAGE_REMOVE", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(MESSAGE_REMOVE_ALL, "MESSAGE_REMOVE_ALL", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(VALIDATION_ADD, "VALIDATION_ADD", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(VALIDATION_ADD_ALL, "VALIDATION_ADD_ALL", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(VALIDATION_REMOVE, "VALIDATION_REMOVE", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(VALIDATION_REMOVE_ALL, "VALIDATION_REMOVE_ALL", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(USER_LOADING, "USER_LOADING", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(USER_CHANGED, "USER_CHANGED", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(USER_ERROR, "USER_ERROR", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(CREATE_USER, "CREATE_USER", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(UPDATE_USER, "UPDATE_USER", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(ACCOUNT_CHANGED, "ACCOUNT_CHANGED", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(ACCOUNT_ERROR, "ACCOUNT_ERROR", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(NEW_BLOCK, "NEW_BLOCK", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(NETWORK_CHANGED, "NETWORK_CHANGED", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(NETWORK_LOADING, "NETWORK_LOADING", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(NETWORK_ERROR, "NETWORK_ERROR", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(BALANCE_ETH_LOADING, "BALANCE_ETH_LOADING", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(BALANCE_ETH_CHANGED, "BALANCE_ETH_CHANGED", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(BALANCE_ETH_ERROR, "BALANCE_ETH_ERROR", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(BALANCE_PLAT_LOADING, "BALANCE_PLAT_LOADING", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(BALANCE_PLAT_CHANGED, "BALANCE_PLAT_CHANGED", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(BALANCE_PLAT_ERROR, "BALANCE_PLAT_ERROR", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(INVENTORY_GAMES_REQUEST, "INVENTORY_GAMES_REQUEST", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(INVENTORY_GAMES_LOADING, "INVENTORY_GAMES_LOADING", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(INVENTORY_GAMES_CHANGED, "INVENTORY_GAMES_CHANGED", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(INVENTORY_GAMES_ERROR, "INVENTORY_GAMES_ERROR", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(INVENTORY_ITEMS_REQUEST, "INVENTORY_ITEMS_REQUEST", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(INVENTORY_ITEMS_LOADING, "INVENTORY_ITEMS_LOADING", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(INVENTORY_ITEMS_CHANGED, "INVENTORY_ITEMS_CHANGED", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(INVENTORY_ITEMS_ERROR, "INVENTORY_ITEMS_ERROR", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(RATE_REQUEST, "RATE_REQUEST", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(RATE_CHANGED, "RATE_CHANGED", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(RATE_ERROR, "RATE_ERROR", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(RATE_LOADING, "RATE_LOADING", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(CHAT_INIT, "CHAT_INIT", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(CHAT_LOAD_MESSAGES, "CHAT_LOAD_MESSAGES", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(CHAT_MESSAGE_RECEIVED, "CHAT_MESSAGE_RECEIVED", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(CHAT_MESSAGE_SEND, "CHAT_MESSAGE_SEND", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(CHAT_MESSAGE_SENT, "CHAT_MESSAGE_SENT", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(CHAT_SET_CHANNEL, "CHAT_SET_CHANNEL", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(CHAT_RECEIVE_MESSAGE, "CHAT_RECEIVE_MESSAGE", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(GAME_REQUEST, "GAME_REQUEST", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(GAME_LOADING, "GAME_LOADING", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(GAME_CHANGED, "GAME_CHANGED", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(GAME_ERROR, "GAME_ERROR", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(GIFT_ADD_LOADING, "GIFT_ADD_LOADING", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(GIFT_ADD_SUCCESS, "GIFT_ADD_SUCCESS", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(GIFT_ADD_ERROR, "GIFT_ADD_ERROR", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(GIFT_REMOVE_LOADING, "GIFT_REMOVE_LOADING", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(GIFT_REMOVE_SUCCESS, "GIFT_REMOVE_SUCCESS", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(GIFT_REMOVE_ERROR, "GIFT_REMOVE_ERROR", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(GAS_LOADING, "GAS_LOADING", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(GAS_CHANGED, "GAS_CHANGED", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  reactHotLoader.register(GAS_ERROR, "GAS_ERROR", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/actions.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./shared/constants/language.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return defaultLanguage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return enabledLanguages; });
(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

var defaultLanguage = "en";
var enabledLanguages = ["en", "zh", "pt", "ja", "fr", "es", "ru"];
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(defaultLanguage, "defaultLanguage", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/language.js");
  reactHotLoader.register(enabledLanguages, "enabledLanguages", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/language.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./shared/constants/placeholder.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return nickName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return email; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return wallet; });
(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

var nickName = "Gordon Freeman";
var email = "me@example.com";
var wallet = "0x1a2c3d…";
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(nickName, "nickName", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/placeholder.js");
  reactHotLoader.register(email, "email", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/placeholder.js");
  reactHotLoader.register(wallet, "wallet", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/placeholder.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./shared/constants/regexp.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return reEmail; });
(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

var reEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(reEmail, "reEmail", "/Users/shain/repositories/bitguild/PortalClient/shared/constants/regexp.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./shared/contracts/oracle.json":
/***/ (function(module, exports) {

module.exports = [{"anonymous":false,"inputs":[{"indexed":false,"name":"newPrice","type":"uint256"}],"name":"PriceChanged","type":"event"},{"constant":false,"inputs":[{"name":"_newAdmin","type":"address"},{"name":"_value","type":"bool"}],"name":"setAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"name":"_newPrice","type":"uint256"}],"name":"updatePrice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"ETHPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]

/***/ }),

/***/ "./shared/contracts/token.json":
/***/ (function(module, exports) {

module.exports = [{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"},{"name":"extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]

/***/ }),

/***/ "./shared/intl/localization/en.json":
/***/ (function(module, exports) {

module.exports = {"components":{"switchLanguage":"Switch Language","language":{"en":"English","zh":"简体中文","ja":"日本語","fr":"Français","pt":"Português","es":"Español","ru":"Русский"},"menu":{"inventory":"My Items","exchange":"Exchange","community":"Community"},"loader":{"loading":"loading"},"title":"BitGuild","colon":": "},"fields":{"language":{"label":"Language","required":"Language is required."},"nickName":{"label":"Display Name","required":"Please enter your nick name.","duplicate":"Display Name already taken"},"email":{"label":"Email Address","required":"Please enter your email address.","duplicate":"Email Address already taken","invalid":"Please enter a valid email address format such as yourname@email.com.","conflict":"This email already exists"},"wallet":{"label":"Wallet Address","required":"Please enter your wallet address.","duplicate":"Wallet Address already taken","minlength":"The wallet address you entered is incomplete, please check this field and try again.","maxlength":"Wallet address is too long.","invalid":"The wallet address you entered is invalid. Please make sure you are using only alphanumeric characters."},"eth":{"label":"Ethereum (ETH)"},"plat":{"label":"Platinum (PLAT)"}},"buttons":{"submit":"Submit","register":"Register","sell":"Sell","gift":"Gift","convert":"Purchase","install":"Install MetaMask","send":"Send"},"errors":{"method-not-allowed":"Method not allowed","page-not-found":"Page Not Found","invalid-param":"Invalid param `{name}`, {reason}","required-param":"Required param `{name}` missing","access-denied":"Access denied","not-found":"`{name}` not found","conflict":"This {name} already exists in db","server-error":"Internal Server Error","spoofing-attempt":"Failed to verify signer when comparing {wallet1} to {wallet2}"},"modals":{"metamask-install":{"title":"Hello!","p1":"To enter BitGuild, you must install MetaMask - a digital wallet for your browser.","p2":"This will also act as your login to the BitGuild Portal (no extra passwords!).","faq":"Questions? Check our <a href='/faq'>FAQ</a>"},"metamask-login":{"title":"You are not logged into MetaMask","p1":"Please open MetaMask and follow the instructions to log in.","faq":"Questions? Check our <a href='/faq'>FAQ</a>"},"metamask-network":{"title":"Sorry!","p1":"This network is not supported by BitGuild portal. For actual experience please switch to main net. For testing purposes please use Rinkeby","faq":"Questions? Check our <a href='/faq'>FAQ</a>"},"register":{"title":"Welcome to BitGuild","n1":"Make sure you save your MetaMask login information and account recovery details!","n2":"We can’t help you recover it if you lose access.","text":"BitGuild requires all users to sign with their private key in order to safeguard against spoofing attempts.\n\nOur mission is to revolutionize the global gaming industry by creating a platform for a brand new class of games that live on the blockchain. Blockchain games completely redefine the relationship between players and developers by facilitating full and true ownership of in-game assets, cheap & safe item trading, cross-game compatibility of items & currency, and more. BitGuild’s team consists of cryptocurrency and gaming veterans with decades of experience building international large-scale gaming platforms and communities. BitGuild aims to host the best blockchain games and the largest blockchain gamer community online."},"sell":{"title":"Stay tuned!","p1":"We will let you know as soon as you are able to sell items.","faq":"Questions? Check our <a href='/faq'>FAQ</a>"}},"pages":{"inventory":{"title":"My Items","all":"All","all-items":"All Items","back-to-game":"Back to game","tx":"Transaction in progress","empty":"You have no items yet!","faq":"Learn more about items in <a href='/faq'>FAQ</a>"},"faq":{"title":"FAQ","metamask":{"title":"Metamask","q1":"What is Metamask?","a1":"It’s a browser plug-in that connects your digital ethereum wallet to the Portal.","q2":"Do I really need to use metamask?","a2":"For now, the only supported way of using the BitGuild Portal involves MetaMask. We are open to integrating functionality for other Ethereum-enabled browser wallets in the future.","q3":"I can’t see my PLAT in my wallet! Where is it?","a3":"If you’re using MetaMask, you need enable the BETA UI, and manually add the PLAT token to your token list. Use this address when configuring: 0x7E43581b19ab509BCF9397a2eFd1ab10233f27dE (specify 18 for digits).","q4":"Does registering with my private key on the BitGuild Portal have a transaction fee?","a4":"No, only transactions sent through your MetaMask Wallet will have a gas fee."},"plat":{"title":"PLAT Tokens","q1":"What is PLAT?","a1":"PLAT is the official BitGuild Token, used within the BitGuild ecosystem to play games, trade items, and more! It’s the driving currency on the BitGuild portal, usable in all current and future games on BitGuild.","q2":"How do I buy PLAT?","a2":"Registered BitGuild users can buy PLAT via the converter on the top right bar of the BitGuild Portal.","q3":"Are there any games that I can play without PLAT?","a3":"Most games will accept only PLAT, though some may accept ETH as well. In this event, using PLAT will always garner a discount for the player. However, some titles may also present users with a free-to-play model, offering players a way to try the game without buying anything.","q4":"What is the ETH to PLAT exchange rate?","a4":"The most up to date exchange rate will be shown in the converter."},"games":{"title":"BitGuild Games","q1":"Can I play any of these games on mobile?","a1":"If the game supports mobile play, you can use any of the mobile wallets with Ethereum-enabled browsers, such as <a href='https://trustwalletapp.com/' target='_blank' rel='noopener noreferrer'>Trust Wallet</a> to play the games on the BitGuild Portal.","q2":"I’ve played a 3rd party game outside of BitGuild.com, and now I want to play it through the BitGuild portal. Is that possible?","a2":"Yes. If the game is available on BitGuild.com, but you’ve played it elsewhere before, all your items and progress will be preserved as long as you sign up to BitGuild.com with the same wallet address you used to play the game previously."},"items":{"title":"Game Items","q1":"How can I trade and sell my items?","a1":"The BitGuild Marketplace is under development. In the meantime, you are free to use any existing marketplace for the ERC721 tokens.","q2":"Can I trade outside the portal?","a2":"Yes, you are free to use any existing marketplace for the ERC721 tokens.","q3":"How can I report an issue with the Portal or a game?","a3":"You can email us at <a href='mailto:support@bitguild.com'>support@bitguild.com</a>, or you can reach the BitGuild Team and Player community on <a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>!","q4":"How can I see the items that I have so far?","a4":"You can see the items for all the games that live on the BitGuild Portal on the “My Items” section, found on the top menu bar.","q5":"I have an item that is missing. Who can I report this to?","a5":"Send us an email at <a href='mailto:support@bitguild.com'>support@bitguild.com</a>, or find us on <a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>, and we’ll do our best to sort the situation out.","q6":"I’d like to report a scammer","a6":"Contact <a href='mailto:support@bitguild.com'>support@bitguild.com</a>, and please include as much supporting information as you can, including screenshots.","q7":"I’d like to report an item bug.","a7":"Contact <a href='mailto:support@bitguild.com'>support@bitguild.com</a>, and please include as much supporting information as you can, including screenshots.","q8":"How long does a purchase transaction take?","a8":"Each transaction, either purchasing or gifting, can take from 30 seconds up to a few minutes, depending on the gas price you selected in MetaMask.","q9":"What if my transaction is not going through?","a9":"If a transaction is not going through, MetaMask allows you to increase the gas price for the pending transactions. Transactions get queued, so if one of the previous transactions is stuck, all of the following will be stuck as well.","q10":"How much does each transaction cost (gas price)?","a10":"You can set your gas price through MetaMask. Actual gas spend varies depending on the game and type of transaction."},"account":{"title":"My Account","q1":"What is my BitGuild login information?","a1":"Users sign into BitGuild.com using their MetaMask credentials.","q2":"I’m having trouble signing in. What can I do?","a2":"Double check your MetaMask login info, and ensure there are no conflicting issues. If you are still having trouble, contact us at <a href='mailto:support@bitguild.com'>support@bitguild.com</a>, or find us directly on <a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>.","q3":"I forgot my BitGuild name and password. How can I retrieve it?","a3":"BitGuild doesn’t use traditional login info - everything is tied to MetaMask. If you’ve lost your MetaMask credentials, we unfortunately can’t help you. :("},"community":{"title":"BitGuild Community","q1":"How can I engage with other players?","a1":"While BitGuild features an integrated chat system, you can also find the BitGuild community on <a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>. There, you can chat with other players, as well as keep up with news from the BitGuild team and 3rd party developers.","q2":"Where can I find BitGuild on social media?","a2":"You can find us on <a href='https://twitter.com/BitGuildPLAT' target='_blank' rel='noopener noreferrer'>Twitter</a>, <a href='https://www.facebook.com/bitguildplat/' target='_blank' rel='noopener noreferrer'>Facebook</a>, <a href='https://t.me/joinchat/HtbMeE8YtEEDQExesDQgPg' target='_blank' rel='noopener noreferrer'>Telegram</a>, <a href='https://www.reddit.com/r/BitGuild/' target='_blank' rel='noopener noreferrer'>Reddit</a>, and of course, <a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>!"},"developers":{"title":"Game Developers","q1":"I’m interested in developing a game for BitGuild. Who can I contact?","a1":"Reach out to us via email at: partnerships@bitguild.com"}},"games":{"banner":{"play":"play"},"airdrop":{"countdown":"Airdrop in","days":"Days","hours":"Hours","minutes":"Minutes","seconds":"Seconds","giveaway":"Ether Online Free Item Giveaway","giveaway-over":"Ether Online Free Item Giveaway Winners!","learn-more":"Learn more"},"announce":{"coming-soon":"Coming soon","in-development":"In development"},"explore":{"questions":"Have questions?","faq":"FAQ","discord":"DISCORD"}},"airdrop":{"title":"Giveaway is over!","p1":"Thank you to everyone who participated in the Ether Online BitGuild giveaway event!","p2":"Within 72 hours, the item chest for all users who met the event criterias, as well as the grand prize, will be sent to your in-game inventory. If you won, see up to 51 shiny item chests just waiting for you to open, revealing your awesome loot!","p3":"If you didn’t win, sorry! But don’t worry, you’ll have plenty of chances to get cool free stuff on BitGuild.com in the future! Stay tuned to our <a href='https://twitter.com/BitGuildPLAT' target='_blank' rel='noopener noreferrer'>Twitter</a>, <a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>, <a href='https://www.facebook.com/bitguildplat/' target='_blank' rel='noopener noreferrer'>Facebook</a>, and <a href='https://medium.com/the-notice-board' target='_blank' rel='noopener noreferrer'>official Blog</a> to never miss a beat.","p4":"In the meantime, we encourage you to try our latest playable title, Magic Academy, or simply go have a look at what’s available on BitGuild for yourself!","p5":"See you online!"}},"chat":{"chat":"Chat","send":"Send"}}

/***/ }),

/***/ "./shared/intl/localization/es.json":
/***/ (function(module, exports) {

module.exports = {"components":{"switchLanguage":"Switch Language","language":{"en":"English","zh":"简体中文","ja":"日本語","fr":"Français","pt":"Português","es":"Español","ru":"Русский"},"menu":{"inventory":"Mis Cosas","exchange":"Exchange","community":"Comunidad"},"loader":{"loading":"cargando"},"title":"BitGuild"},"fields":{"language":{"label":"Idioma","required":"Se requiere idioma."},"nickName":{"label":"Usuario","required":"Introduzca su usuario."},"email":{"label":"Dirección de correo electrónico","required":"Ingrese su dirección de correo electrónico.","invalid":"Ingrese un formato de dirección de correo electrónico válido como yourname@email.com.","conflict":"Este correo electrónico ya existe"},"wallet":{"label":"Dirección de Wallet","required":"Por favor ingrese su dirección de wallet.","minlength":"La dirección de el wallet que ingresó está incompleta, verifique este campo e intente de nuevo.","maxlength":"La dirección de el wallet es demasiado larga.","invalid":"La dirección de el wallet que ingresó no es válida. Por favor, asegúrese de estar utilizando solo caracteres alfanuméricos."},"eth":{"label":"Ethereum (ETH)"},"plat":{"label":"Platinum (PLAT)"}},"buttons":{"submit":"Enviar","register":"Inscribirse","sell":"Vender","gift":"Regalo","convert":"Comprar","install":"Instalar MetaMask","send":"Enviar"},"errors":{"method-not-allowed":"Método no permitido","page-not-found":"Página no encontrada","invalid-param":"Invalid param `{name}`, {reason}","required-param":"Required param `{name}` missing","access-denied":"Acceso denegado","not-found":"`{name}` extraviado","conflict":"Este {name} ya existe en la base de datos","server-error":"Internal Server Error","spoofing-attempt":"Error al verificar el firmante al comparar {wallet1} a {wallet2}"},"modals":{"metamask-install":{"title":"Holà!","p1":"Para ingresar BitGuild, debe instalar MetaMask, un wallet digital para su navegador.","p2":"Esto también actuará como su inicio de sesión en el Portal BitGuild (¡sin contraseñas adicionales!).","faq":"¿Preguntas? Mira nuestra <a href='/faq'>FAQ</a>"},"metamask-login":{"title":"Usted no ha iniciado sesión en MetaMask","p1":"Abra MetaMask y siga las instrucciones para iniciar sesión.","faq":"¿Preguntas? Mira nuestra <a href='/faq'>FAQ</a>"},"metamask-network":{"title":"Sorry!","p1":"This network is not supported by BitGuild portal. For actual experience please switch to main net. For testing purposes please use Rinkeby","faq":"¿Preguntas? Mira nuestra  <a href='/faq'>FAQ</a>"},"register":{"title":"Bienvenido en BitGuild","n1":"Asegúrese de guardar su información de inicio de sesión de MetaMask y los detalles de recuperación de la cuenta!","n2":"No podemos ayudarlo a recuperarlo si pierde el acceso.","text":"BitGuild requiere que todos los usuarios firmen con su clave privada para protegerse contra los intentos de falsificación.\n\nNuestra misión es revolucionar la industria del juego global mediante la creación de una plataforma para una nueva clase de juegos que viven en la cadena de bloques. Los juegos de Blockchain redefinen por completo la relación entre jugadores y desarrolladores al facilitar la propiedad plena y verdadera de los recursos en el juego, el intercambio de artículos baratos y seguros, la compatibilidad de elementos y divisas entre los juegos, y más. El equipo de BitGuild está formado por criptomonedas y veteranos del juego con décadas de experiencia en la construcción de plataformas y comunidades de juego internacionales a gran escala. BitGuild tiene como objetivo alojar los mejores juegos de blockchain y la comunidad de jugadores de blockchain más grande en línea."},"sell":{"title":"¡Manténganse al tanto!","p1":"Le avisaremos tan pronto como pueda vender artículos.","faq":"¿Preguntas? Mira nuestra <a href='/faq'>FAQ</a>"}},"pages":{"inventory":{"title":"Mis cosas","all":"Todo","all-items":"Todos los articulos","back-to-game":"Volver al juego","empty":"No tienes articulos!","faq":"Aprenda más sobre los artículos en <a href='/faq'>FAQ</a>"},"faq":{"title":"FAQ","metamask":{"title":"Metamask","q1":"Que es Metamask?","a1":"Es un complemento del navegador que conecta su wallet ethereum digital al Portal.","q2":"Necesito metamask?","a2":"Por ahora, la única forma admitida dpara usar el BitGuild Portal es MetaMask. Estamos abiertos a la integración de funcionalidades para otras carteras de navegador compatibles con Ethereum en el futuro.","q3":"No puedo veer mis PLAT en mi wallet! Donde estan?","a3":"Si está utilizando MetaMask, necesita habilitar la IU BETA y agregar manualmente el token PLAT a su lista de tokens. Use esta dirección cuando configure: 0x7E43581b19ab509BCF9397a2eFd1ab10233f27dE (especifique 18 para los dígitos).","q4":"¿El registro con mi clave privada en el Portal BitGuild tiene una tarifa de transacción?","a4":"No, solo las transacciones enviadas a través de su MetaMask Wallet tendrán una tarifa de gas."},"plat":{"title":"PLAT Tokens","q1":"Que es PLAT?","a1":"¡PLAT es el token oficial de BitGuild, utilizado en el ecosistema BitGuild para jugar juegos, intercambiar objetos y más! Es la divisa impulsora en el portal BitGuild, utilizable en todos los juegos actuales y futuros en BitGuild ","q2":"Como puedo comprar PLAT?","a2":"Los usuarios registrados de BitGuild pueden comprar PLAT a través del convertidor en la barra superior derecha del Portal de BitGuild.","q3":"¿Hay algún juego que pueda jugar sin PLAT?","a3":"La mayoría de los juegos solo aceptará PLAT, aunque algunos también pueden aceptar ETH. En este caso, usar PLAT siempre obtendrá un descuento para el jugador. Sin embargo, algunos títulos también pueden presentar a los usuarios un modelo de juego gratuito, que ofrece a los jugadores una forma de probar el juego sin comprar nada.","q4":"¿Cuál es la tasa de cambio ETH a PLAT?","a4":"La tasa de cambio más actualizada se mostrará en el convertidor."},"games":{"title":"Juegos BitGuild","q1":"¿Puedo jugar cualquiera de estos juegos en un dispositivo móvil?","a1":"Si el juego es compatible con el juego móvil, puede usar cualquiera de los monederos móviles con navegadores compatibles con Ethereum, como <a href='https://trustwalletapp.com/' target='_blank' rel='noopener noreferrer'>Trust Wallet</a> para jugar en BitGuild Portal.","q2":"He jugado un juego de terceros fuera de BitGuild.com, y ahora quiero jugarlo a través del portal de BitGuild. ¿Eso es posible?","a2":"Sí. Si el juego está disponible en BitGuild.com, pero ya lo jugaste en otro lugar, todos tus elementos y progresos se conservarán siempre que te registres en BitGuild.com con la misma dirección de wallet que antes."},"items":{"title":"Artículos del juego","q1":"¿Cómo puedo comerciar y vender mis artículos?","a1":"El mercado de BitGuild está en desarrollo. Mientras tanto, puede usar cualquier mercado existente para los tokens ERC721.","q2":"¿Puedo comerciar fuera del portal?","a2":"Sí, puede usar cualquier mercado existente para los tokens ERC721","q3":"¿Cómo puedo informar un problema con el Portal o un juego?","a3":"Puede enviarnos un correo electrónico a <a href='mailto:support@bitguild.com'>support@bitguild.com</a>, o puede comunicar con la comunidad de BitGuild en <a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>!","q4":"¿Cómo puedo ver los elementos que tengo hasta ahora?","a4":"Puedes ver los artículos para todos los juegos que tiene en BitGuild Portal en la sección 'Mis Cosas', que se encuentra en la barra de menú superior.","q5":"Tengo un elemento que falta. ¿A quién puedo informarle esto?","a5":"Envíenos un correo electrónico a <a href='mailto:support@bitguild.com'>support@bitguild.com</a>, o encuéntrenos en <a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>, y haremos nuestro mejor esfuerzo para solucionar la situación","q6":"Me gustaría informar un estafador","a6":"Póngase en contacto con <a href='mailto:support@bitguild.com'>support@bitguild.com</a> e incluya toda la información de respaldo que pueda, incluidas capturas de pantalla.","q7":"Me gustaría informar un error de elemento","a7":"Póngase en contacto con <a href='mailto:support@bitguild.com'>support@bitguild.com</a> e incluya toda la información de respaldo que pueda, incluidas capturas de pantalla.","q8":"¿Cuánto tiempo tarda una transacción de compra?","a8":"Cada transacción, ya sea de compras o regalos, puede tomar desde 30 segundos hasta unos minutos, dependiendo del precio del gas que seleccionó en MetaMask","q9":"¿Qué pasa si mi transacción no se está procesando?","a9":"Si una transacción no se realiza, MetaMask le permite aumentar el precio del gas para las transacciones pendientes. Las transacciones se ponen en cola, por lo que si una de las transacciones anteriores se bloquea, también se bloqueará todo lo siguiente. ","q10":"¿Cuánto cuesta cada transacción (precio del gas)?","a10":"Puede establecer el precio del gas a través de MetaMask. El gasto real en gas varía según el juego y el tipo de transacción"},"account":{"title":"Mi cuenta","q1":"¿Cuál es mi información de inicio de sesión de BitGuild?","a1":"Los usuarios inician sesión en BitGuild.com usando sus credenciales de MetaMask","q2":"Tengo problemas para iniciar sesión. ¿Qué puedo hacer?","a2":"Verifique la información de inicio de sesión de MetaMask y asegúrese de que no haya problemas conflictivos. Si aún tiene problemas, póngase en contacto con nosotros en <a href='mailto:support@bitguild.com'>support@bitguild.com</a> o encuéntrenos directamente en <a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>.","q3":"Olvidé mi nombre y contraseña de BitGuild. ¿Cómo puedo recuperarlo?","a3":"BitGuild no utiliza la información de inicio de sesión tradicional, todo está vinculado a MetaMask. Si ha perdido sus credenciales de MetaMask, desafortunadamente no podemos ayudarle"},"community":{"title":"Comunidad BitGuild","q1":"¿Cómo puedo relacionarme con otros jugadores?","a1":"Si bien BitGuild presenta un sistema de chat integrado, también puedes encontrar la comunidad BitGuild en <a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>. Allí puedes chatear con otros jugadores y mantenerte al día con las novedades del equipo de BitGuild y desarrolladores de terceros","q2":"¿Dónde puedo encontrar BitGuild en las redes sociales?","a2":"Puedes encontrarnos en <a href='https://twitter.com/BitGuildPLAT' target='_blank' rel='noopener noreferrer'>Twitter</a>, <a href='https://www.facebook.com/bitguildplat/' target='_blank' rel='noopener noreferrer'>Facebook</a>, <a href='https://t.me/joinchat/HtbMeE8YtEEDQExesDQgPg' target='_blank' rel='noopener noreferrer'>Telegram</a>, <a href='https://www.reddit.com/r/BitGuild/' target='_blank' rel='noopener noreferrer'>Reddit</a> y, por supuesto, ¡<a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>!"},"developers":{"title":"Desarrolladores de juegos","q1":"Estoy interesado en desarrollar un juego para BitGuild. ¿A quién puedo contactar?","a1":"Comuníquese con nosotros por correo electrónico a: partnerships@bitguild.com"}},"games":{"banner":{"play":"Jugar"},"airdrop":{"countdown":"Airdrop en","days":"Dias","hours":"Horas","minutes":"Minutos","seconds":"Segundos","giveaway":"Ether Online - Regalo de Artículos Gratuitos","giveaway-over":"Ether Online - Ganadores de los Regalo de Artículos Gratuitos","learn-more":"Aprende más"},"announce":{"coming-soon":"Próximamente","in-development":"En desarrollo"},"explore":{"questions":"¿Tienes preguntas?","faq":"FAQ","discord":"DISCORD"}},"airdrop":{"title":"<strong> ¡El sorteo terminó!</strong>","p1":"¡Gracias a todos los que participaron en el evento de regalo Ether Online BitGuild!","p2":"¡Una felicitación especial para los ganadores del gran premio! Si aún no lo has hecho, revisa tu inventario en el juego ahora. ¡Si ganaste, verás 51 cofres de objetos brillantes esperando a que abras, revelando tu increíble loot!","p3":"Si no ganaste, ¡lo sentimos!. Pero no se preocupe, ¡tendrá muchas oportunidades de obtener material gratis en BitGuild.com en el futuro! Manténgase en sintonía con nuestro <a href='https://twitter.com/BitGuildPLAT' target='_blank' rel='noopener noreferrer'>Twitter</a>, <a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>, <a href='https://www.facebook.com/bitguildplat/' target='_blank' rel='noopener noreferrer'>Facebook</a> y el <a href='https://medium.com/the-notice-board'>Blog oficial</a> para no perderse nunca el ritmo.","p4":"Mientras tanto, te animamos a probar nuestro último título jugable ______, ¡o simplemente mira a lo que está disponible en BitGuild para ti!","p5":"¡Nos vemos en línea!"}},"chat":{"chat":"Chat","send":"Enviar"}}

/***/ }),

/***/ "./shared/intl/localization/fr.json":
/***/ (function(module, exports) {

module.exports = {"components":{"switchLanguage":"Choix de la Langue","language":{"en":"English","zh":"简体中文","ja":"日本語","fr":"Français","pt":"Português","es":"Español","ru":"Русский"},"menu":{"inventory":"Mes Objets","exchange":"Échanges","community":"Communauté"},"loader":{"loading":"Chargement..."},"title":"BitGuild","colon":" : "},"fields":{"language":{"label":"Langue","required":"Veuillez choisir la langue d'affichage."},"nickName":{"label":"Pseudonyme","required":"Veuillez saisir votre pseudonyme."},"email":{"label":"Adresse e-mail","required":"Veuillez saisir votre adresse e-mail.","invalid":"Assurez-vous que le format de l'adresse e-mail est correct. Exemple : votrenom@email.com.","conflict":"Un compte existe déjà avec cette adresse e-mail."},"wallet":{"label":"Adresse du porte-monnaie","required":"Veuillez saisir l'adresse de votre porte-monnaie.","minlength":"L'adresse saisie est incomplète. Veuillez vérifier ce champ puis réessayez.","maxlength":"L'adresse saisie est trop longue.","invalid":"L'adresse saisie est invalide. Assurez-vous de n'utiliser que des caractères alphanumériques."},"eth":{"label":"Ethereum (ETH)"},"plat":{"label":"Platinum (PLAT)"}},"buttons":{"submit":"Soumettre","register":"S'inscrire","sell":"Vendre","gift":"Offrir","convert":"Convertir","install":"Installer MetaMask","send":"Envoyer"},"errors":{"method-not-allowed":"Méthode non-autorisée","page-not-found":"Page introuvable","invalid-param":"Paramètre invalide `{name}`, {reason}","required-param":"Paramètre requis `{name}` manquant","access-denied":"Accès refusé","not-found":"`{name}` introuvable","conflict":"Ce {name} existe déjà dans la base de données","server-error":"Erreur de serveur interne","spoofing-attempt":"Échec lors de la vérification du signataire de {wallet1} à {wallet2}"},"modals":{"metamask-install":{"title":"Bonjour !","p1":"Afin d'accéder à BitGuild, vous devez avoir au préalable installé MetaMask - une porte-monnaie numérique pour votre navigateur.","p2":"MetaMask agira également comme votre identifiant sur le portail BitGuild (aucun autre mot de passe requis !)","faq":"Des questions ? Jetez donc un œil à notre <a href='/faq'>FAQ</a> !"},"metamask-login":{"title":"Vous n'êtes pas connecté(e) à MetaMask.","p1":"Veuillez ouvrir MetaMask et suivez les instructions pour vous connecter.","faq":"Des questions ? Jetez donc un œil à notre <a href='/faq'>FAQ</a> !"},"metamask-network":{"title":"Toutes nos excuses !","p1":"Ce réseau n'est pas supporté par le portail BitGuild. Pour l'expérience réelle, veuillez basculer vers le réseau principal. Afin d'effectuer des tests, veuillez utiliser Rinkeby.","faq":"Des questions ? Jetez donc un œil à notre <a href='/faq'>FAQ</a> !"},"register":{"title":"Bienvenue sur BitGuild !","n1":"Assurez-vous de bien conserver vos informations de connexion à MetaMask ainsi que les détails de récupération du compte !","n2":"En cas de perte, nous ne serons pas en mesure de vous aider à récupérer votre compte.","text":"BitGuild demande à tous ses utilisateurs de se connecter avec leur clef privée afin de prévenir des tentatives d'usurpation.\n\nNotre mission est de révolutionner l'industrie du jeu vidéo et créant une plateforme d'un tout nouveau genre de jeux vivant sur la blockchain. Les jeux blockchain redéfinissent la relation entre les joueurs et les développeurs en simplifiant la propriété des éléments de jeux, l'échange d'objets sécurisé, la compatibilité d'objets et de monnaie à travers différents jeux, et bien plus encore. L'équipe de BitGuild est constituée de vétérans du jeu vidéo et des cybermonnaies avec des dizaines d'années d'expérience dans l'établissement de plateformes de jeux et de communautés internationales. BitGuild aspire à héberger les meilleurs jeux blockchain ainsi que la plus vaste communauté en ligne de joueurs."},"sell":{"title":"Restez à l'écoute !","p1":"Nous vous informerons aussitôt qu'il sera possible de vendre des objets.","faq":"Des questions ? Jetez donc un œil à notre <a href='/faq'>FAQ</a> !"}},"pages":{"inventory":{"title":"Mes objets","all":"Tout","all-items":"Tous mes objets","back-to-game":"Retour au jeu","empty":"Vous ne possédez pas encore d'objets !","faq":"Apprenez-en plus sur les objets grâce à notre <a href='/faq'>FAQ</a> !"},"faq":{"title":"FAQ","metamask":{"title":"Metamask","q1":"Qu'est-ce que MetaMask ?","a1":"Il s'agit d'une extension de navigateur qui connecte votre porte-monnaie numérique à notre portail.","q2":"Ai-je réellement besoin d'utiliser MetaMask ?","a2":"Pour le moment, le seul moyen d'utiliser le portail BitGuild est via MetaMask. Il n'est pas impossible que nous ajoutions d'autres porte-monnaie d'Ethereum à l'avenir.","q3":"Je ne vois pas mes PLAT dans mon porte-monnaie ! Où sont-ils ?","a3":"Vous devez utiliser l'UI de la version Bêta de MetaMask et ajouter manuellement le jeton PLAT à votre liste. Lors de la configuration du jeton, utilisez l'adresse suivante : 0x7E43581b19ab509BCF9397a2eFd1ab10233f27dE","q4":"Est-ce que l'inscription au portail BitGuild avec ma clef privée requiert des frais de transaction ?","a4":"Non ! Seules les transactions envoyées vers votre porte-monnaie MetaMask requerront des frais de GAS."},"plat":{"title":"Les Jetons PLAT","q1":"Qu'est-ce que PLAT signifie ?","a1":"Platinum (PLAT) est le nom du jeton officiel de BitGuild, utilisé au sein de cet écosystème afin de jouer aux jeux, d'échanger des objets, et bien plus encore ! Il s'agit de la principale monnaie du portail, utilisable sur tous les jeux actuels et à venir de BitGuild !","q2":"Comment acheter des PLAT ?","a2":"Les utilisateurs de BitGuild inscrits peuvent acheter des PLAT via le convertisseur de monnaie dans la barre supérieure du portail.","q3":"Existe-t-il des jeux auxquels je puisse jouer sans PLAT ?","a3":"La plupart des jeux n'accepteront que les PLAT, mais il n'est pas impossible que certains d'entre eux acceptent également des ETH. Dans ce cas, l'utilisation de PLAT vous offrira toujours l'avantage d'une réduction. Cependant, certains titres peuvent aussi offrir un modèle free-to-play, vous permettant d'essayer le jeu sans avoir à payer quoi que ce soit.","q4":"Quel est le taux de change entre les PLAT et les ETH ?","a4":"Le taux de change le plus récent sera toujours indiqué dans le convertisseur de monnaie."},"games":{"title":"Les Jeux BitGuild","q1":"Puis-je jouer à ces jeux sur mobile ?","a1":"Si le jeu choisi supporte le mode mobile, vous pouvez utiliser n'importe lequel des navigateurs mobile supportant les porte-monnaie d'Ethereum, tel que <a href='https://trustwalletapp.com/' target='_blank' rel='noopener noreferrer'>Trust Wallet</a>.","q2":"J'ai joué un un jeu tiers en dehors de BitGuild.com, et maintenant j'aimerais y jouer sur le portail BitGuild. Est-ce possible ?","a2":"Oui. Si le jeu est disponible sur BitGuild.com mais que vous y avez joué ailleurs auparavant, tous vos objets et votre progression seront conservés à partir du moment où vous vous connectez avec la même adresse MetaMask."},"items":{"title":"Les Objets de Jeux","q1":"Comment échanger et vendre mes objets ?","a1":"Le marché de BitGuild est encore en cours de développement. En attendant, vous pouvez tout à fait passer par n'importe quel marché utilisant des jetons ERC-721.","q2":"Puis-je faire des échanges en dehors du portail BitGuild ?","a2":"Oui, vous pouvez tout à fait passer par n'importe quel marché utilisant des jetons ERC-721.","q3":"Comment rapporter un problème avec le portail ou un jeu ?","a3":"Vous pouvez nous envoyer un e-mail à <a href='mailto:support@bitguild.com'>support@bitguild.com</a>, ou vous pouvez aussi contacter l'équipe BitGuild ou la communauté des joueurs sur <a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a> !","q4":"Comment voir les objets que je possède ?","a4":"Vous pouvez consulter tous vos objets pour tous les jeux du portail BitGuild dans la section « Mes Objets » dans la barre supérieure.","q5":"Il me manque un objet. À qui dois-je rapporter ce problème ?","a5":"Envoyez-nous un e-mail à <a href='mailto:support@bitguild.com'>support@bitguild.com</a>, ou trouvez-nous sur <a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a> et nous ferons de notre mieux pour éclaircir la situation.","q6":"J'aimerais rapporter un scammer.","a6":"Contactez-nous à <a href='mailto:support@bitguild.com'>support@bitguild.com</a>, et incluez autant d'informations que possible, y compris (et surtout !) des captures d'écran.","q7":"J'aimerais rapporter un bug d'objet.","a7":"Contactez-nous à <a href='mailto:support@bitguild.com'>support@bitguild.com</a>, et incluez autant d'informations que possible, y compris (et surtout !) des captures d'écran.","q8":"Combien de temps prend une transaction ?","a8":"Chaque transaction, qu'il s'agisse d'un achat ou d'un cadeau offert, peut prendre de 30 secondes à quelques minutes en fonction du prix du GAS choisi dans MetaMask.","q9":"Que faire si ma transaction n'aboutit pas ?","a9":"Si une transaction n'aboutit pas, MetaMask vous autorise à modifier le prix du GAS des transactions prenant du temps. Les transactions fonctionnent sur une file d'attente, donc si une transaction est bloquée, alors les transactions suivantes seront bloquées également.","q10":"Combien coûte chaque transaction ?","a10":"Vous pouvez définir vous-même le prix du GAS via MetaMask. Le véritable coût final dépend du jeu et du type de transaction réalisée."},"account":{"title":"Mon Compte","q1":"Quelles sont les informations de connexion de BitGuild ?","a1":"Il suffit de se connecter à MetaMask pour accéder à son compte sur BitGuild.","q2":"J'ai du mal à me connecter. Que faire ?","a2":"Vérifiez vos informations de connexion MetaMask et assurez-vous qu'il n'y a aucun conflit. Si vous ne parvenez toujours pas à vous connecter, contactez-nous à <a href='mailto:support@bitguild.com'>support@bitguild.com</a> ou joignez-nous directement sur <a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>.","q3":"J'ai oublié mon nom et mon mot de passe BitGuild. Comment les retrouver ?","a3":"BitGuild n'utilise pas les informations de connexion traditionnelles ; tout se passe sur MetaMask. Si vous avez perdu vos informations de connexion MetaMask, nous ne pouvons malheureusement rien pour vous :("},"community":{"title":"La Communauté BitGuild","q1":"Comment entrer en contact avec d'autres joueurs ?","a1":"Bien que BitGuild possède un tchat intégré, vous pouvez rejoindre la communauté BitGuild sur <a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>. Vous pouvez de là discuter avec d'autres joueurs mais aussi vous tenir informé(e) des dernières nouvelles de l'équipe de BitGuild et des développeurs tiers.","q2":"Où trouver BitGuild sur les réseaux Sociaux ?","a2":"Vous pouvez nous trouver sur <a href='https://twitter.com/BitGuildPLAT' target='_blank' rel='noopener noreferrer'>Twitter</a>, <a href='https://www.facebook.com/bitguildplat/' target='_blank' rel='noopener noreferrer'>Facebook</a>, <a href='https://t.me/joinchat/HtbMeE8YtEEDQExesDQgPg' target='_blank' rel='noopener noreferrer'>Telegram</a>, <a href='https://www.reddit.com/r/BitGuild/' target='_blank' rel='noopener noreferrer'>Reddit</a>, et bien sûr <a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a> !"},"developers":{"title":"Les Développeurs de Jeux","q1":"Je souhaite développer un jeu pour BitGuild. Qui contacter ?","a1":"Joignez-nous par e-mail à : partnerships@bitguild.com"}},"games":{"banner":{"play":"JOUER"},"airdrop":{"countdown":"Airdrop dans","days":"Journées","hours":"Heures","minutes":"Minutes","seconds":"Secondes","giveaway":"Ether Online - Distribution d’Objets Gratuits","giveaway-over":"Gagnants de la remise d'items Ether Online!","learn-more":"Learn more"},"announce":{"coming-soon":"Bientôt disponible","in-development":"En développement"},"explore":{"questions":"Des questions ?","faq":"FAQ","discord":"DISCORD"}},"airdrop":{"title":"<strong>Giveaway est fini!</strong>","p1":"Merci à tous ceux qui ont participé à l'événement Ether Online BitGuild giveaway!","p2":"Félicitations spéciales aux gagnants du grand prix! Si vous ne l'avez pas encore fait, vérifiez votre inventaire dans le jeu maintenant. Si vous avez gagné, vous verrez 51 coffres brillants qui n'attendent que vous pour ouvrir, révélant votre incroyable butin!","p3":"Si vous n'avez pas gagné, désolé! Mais ne vous inquiétez pas, vous aurez beaucoup de chances d'obtenir des trucs cool sur BitGuild.com à l'avenir! Restez à l'écoute de notre <a href='https://twitter.com/BitGuildPLAT' target='_blank' rel='noopener noreferrer'>Twitter</a>, <a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>, <a href='https://www.facebook.com/bitguildplat/' target='_blank' rel='noopener noreferrer'>Facebook</a> et <a href='https://medium.com/the-notice-board' target='_blank' rel='noopener noreferrer'>Blog officiel</a> pour ne jamais manquer un battement.","p4":"En attendant, nous vous encourageons à essayer notre dernier titre jouable ______, ou tout simplement à regarder ce qui est disponible sur BitGuild!","p5":"À bientôt en ligne!"}},"chat":{"chat":"Tchat","send":"Envoyer"}}

/***/ }),

/***/ "./shared/intl/localization/ja.json":
/***/ (function(module, exports) {

module.exports = {"components":{"switchLanguage":"言語","language":{"en":"English","zh":"简体中文","ja":"日本語","fr":"Français","pt":"Português","es":"Español","ru":"Русский"},"menu":{"inventory":"インベントリ","exchange":"交換","community":"コミュニティ"},"loader":{"loading":"ロード中"},"title":"BitGuild"},"fields":{"language":{"label":"言語","required":"言語を選択してください。"},"nickName":{"label":"ニックネーム","required":"ニックネームを入力してください。"},"email":{"label":"メールアドレス","required":"メールアドレスを入力してください。","invalid":"入力されたメールアドレスの形式が正しくありません。ご確認の上,もう一度お試しください。","conflict":"メールアドレスがすでに登録されています。"},"wallet":{"label":"ウォレット","required":"ウォレットアドレスを入力してください。","minlength":"入力されたウォレットアドレスの形式が正しくありません。ご確認の上,もう一度お試しください。","maxlength":"ウォレットアドレスが長すぎて登録できません。","invalid":"入力されたウォレットアドレスが正しくありません。ウォレットアドレスが半角英数字で正しく入力されているかの確認の上,もう一度お試しください。"},"eth":{"label":"イザーリウム (ETH)"},"plat":{"label":"プラット (PLAT)"}},"buttons":{"submit":"提出する","register":"登録","sell":"販売","gift":"ギフト","convert":"購入","install":"MetaMaskをインストール","send":"送信する"},"errors":{"method-not-allowed":"メソッドは許可されていません","page-not-found":"ページを見つかりません","invalid-param":"パラメーターが無効です。`{name}`, {reason}","required-param":"必要なパラメーター `{name}` がありません。","access-denied":"アクセスが拒否されました。","not-found":"`{name}` が見つかりません。","conflict":" {name} はすでにサーバーに登録されています。","server-error":"Internal Server Error","spoofing-attempt":"{wallet1} と {wallet2}の情報が異なるため,確認することができません。"},"modals":{"metamask-install":{"title":"こんにちは！","p1":"BitGuildを利用するためには,MetaMaskをインストールする必要があります。","p2":"MetaMaskを使うとBitGuildポタールへのログインにも認められます。（パスワード不要！）。","n1":"質問がある方は下段のよくあるご質問をご覧ください。","faq":"<a href='/faq'>よくあるご質問</a>"},"metamask-login":{"title":"MetaMaskにログインされていません。","p1":"MetaMaskを起動して,画面の指示に従ってログインしてください。","faq":"<a href='/faq'>よくあるご質問</a>"},"register":{"title":"BitGuildへようこそ","n1":"ログイン情報を忘れないでください。","n2":"ログイン情報を忘れてしまうと回復することができません。","text":"BitGuildは不正アクセスを防止するために,すべてのユーザーがプライベートキーで署名する必要があります。 \n\n私たちのミッションは,ブロックチェーンに存在する新しいレベルのゲームのためのプラットフォームを構築し,グローバルゲーム産業に革命を起こすことです。Blockchainゲームは,ゲーム内の資産の完全かつ実際な所有権,安価で安全な商品取引,アイテム,および通貨のゲーム間の互換性などを促進してプレイヤーと開発者との間の関係を完全に上書きします。 BitGuildのチームは,国際大規模のゲームプラットフォームとコミュニティを構築した経験がある数十年の復号化とゲームのベテランで構成されます。 BitGuildは最高のブロックチェーンゲームと最大ブロックチェーンゲーマーコミュニティをオンラインで提供することを目的とします。"},"sell":{"title":"お知らせをお楽しみに!","p1":"アイテムが販売するとお知らせします","n1":"質問がある方はよくある質問をご覧ください","faq":"<a href='/faq'>よくある質問</a>"}},"pages":{"inventory":{"title":"インベントリ","all":"すべて","all-items":"全てのアイテム","back-to-game":"ゲームに戻る","empty":"まだアイテムがありません","faq":"<a href='/faq'>よくある質問</a>"},"faq":{"title":"よくある質問","metamask":{"title":"Metamask","q1":"Metamaskとは?","a1":"ポータルにデジタルイザーリウムウォレットを接続するブラウザープラグインです。","q2":"Metamaskを使用する必要がありますか？","a2":"現在BitGuildポータルサイトを使用するための唯一方法はMetamaskです。将来的に他のイザーリウム対応ブラウザウォレットの機能を追加する予定です。","q3":"私のウォレットにPLATは見えません。どこを確認すればいいですか。","a3":"Metamaskを使用している場合は,BETA UIを有効にして,手動でPLATトークンをトークンリストに追加する必要があります:0x7E43581b19ab509BCF9397a2eFd1ab10233f27dE（数字に18を指定）","q4":"私の秘密鍵をBitGuildポータルサイトに登録したいのですが,取引手数料がかかりますか？","a4":"いいえ,Metamaskウォレットを通じて送信された取引のみガス手数料が発生します。"},"plat":{"title":"PLATトークン","q1":"PLATとは何ですか？","a1":"PLATは,BitGuildエコシステム内でゲームや取引やアイテムなどをプレイするために使用される公式のBitGuildトークンです！これはBitGuildのフラットフォーム,すべてのゲームで使用できるBitGuildポータルサイトの通貨です。","q2":"PLATを買うにはどうすればよいですか？","a2":"登録されたBitGuildユーザーは,BitGuildポータルサイトの右上のバーにあるコンバータを使用してPLATを購入できます。","q3":"PLATなしでプレーできるゲームはありますか？","a3":"ほとんどのゲームはPLATのみですが,一部のプレイヤーはETHも受け入れますが,この場合PLATを使用すると常にプレーヤーの割引が得られますが,一部のタイトルでは,プレイヤーに何も買わずにゲームを試す方法を提供する","q4":"ETHとPLATの為替レートは何ですか？","a4":"最新の為替レートがコンバータに表示されます。"},"games":{"title":"BitGuildゲーム","q1":"私はこれらのゲームのどれをモバイルでもプレイできますか？","a1":"ゲームでモバイルプレイがサポートされている場合,トラートウォレットなどのEthereum対応ブラウザでモバイルウォレットを使用すると,BitGuildポータルでゲームをプレイできます。","q2":"私はBitGuild.comの外でサードパーティのゲームをプレイしましたが,今はBitGuildポータルでプレイしたいと思います。","a2":"はい,BitGuild.comでゲームを利用できますが,それ以前に他の場所でプレイした場合,同じWalletアドレスでBitGuild.comにサインアップする限り,アイテムや進行状況はすべて保持されます以前はゲームをプレイしていました。"},"items":{"title":"ゲームアイテム","q1":"私の商品を売買するには？","a1":"BitGuild マーケットプレイスが開発中ですが,その間にERC721トークン用の既存のマーケットプレイスで自由に使用できます。","q2":"私はポータルの外で取引できますか？","a2":"はい,ERC721トークン用に既存のマーケットプレイスで自由に使用できます。","q3":"ポータルやゲームで問題を報告する方法は？","a3":"<a href='mailto:support@bitguild.com'>support@bitguild.com</a>までメールを送っていただけるか,あるいは<a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>でBitGuildチームとコミュニティで連絡することもできます！","q4":"これまで持っていたアイテムはどうやって見ることができますか？","a4":"トップメニューバーにある'マイアイテム 'セクションでBitGuildポータルにあるすべてのゲームのアイテムを見ることができます。","q5":"アイテムがありません。とごに問い合わせしますか？","a5":"<a href='mailto:support@bitguild.com'>support@bitguild.com</a>にメールを送ってください。速やかに対応させていただきます","q6":"チーターを報告したい","a6":"<a href='mailto:support@bitguild.com'>support@bitguild.com</a>までにスクリーンショットを含めた情報を送ってください。","q7":"アイテム不具合を報告したい。","a7":"<a href='mailto:support@bitguild.com'>support@bitguild.com</a>までにスクリーンショットを含めた情報を送ってください。","q8":"購入取引にはどのくらいの期間かかりますか？","a8":"MetaMaskで選択したガス価格に応じて,購入または贈与の各取引に30秒から数分かかることがあります。","q9":"取引が進まない場合はどうすればいいですか？","a9":"トランザクションが出来ない場合,MetaMaskは保留中のトランザクションのガソリン価格を上げることができます。トランザクションはキューに入れられ,前のトランザクションの1つがスタックされていれば, ","q10":"各取引費用はいくらですか（ガス価格）？","a10":"MetaMaskを通じてガス価格を設定することができます。実際のガス使用量は,ゲームや取引のタイプによって異なります。"},"account":{"title":"My Account","q1":"私のBitGuildログイン情報は何ですか？","a1":"ユーザーは,Metamask資格情報を使ってBitGuild.comにサインインします。","q2":"ログインに問題があります。どうすればよいですか","a2":"Metamaskのログイン情報を再度確認してください。それでも問題が解決しない場合は<a href='mailto:support@bitguild.com'>support@bitguild.com</a>までご連絡いただくか,<a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>に直接お問い合わせください。","q3":"BitGuildのIDとパスワードを忘れました。","a3":"ポータルにデジタルethereumウォレットを接続するブラウザプラグインです。","q4":"本当にメタマスクを使用する必要がありますか？","a4":"現在BitGuildポータルサイトを使用するための唯一方法はMetamaskです。将来的に他のイザーリウム対応ブラウザウォレットの機能を追加する予定です。","q5":"私のウォレットにPLATは見えません。どこを確認すればいいですか。","a5":"BitGuildではポータル独自のログイン情報を使用していません - すべてMetaMaskに連携されているためMetaMaskの資格情報をなくした場合,こちらからサポートすることはできません。"},"community":{"title":"BitGuildコミュニティ","q1":"他のプレイヤーとのやりとりはどうすればいいですか？","a1":"BitGuildは統合されたチャットシステムを備えていますが,<a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>のコミュニティでBitGuildコミュニティに参加することもできます。他のプレイヤーとチャットしたり,BitGuildチームやサードパーティの開発者からの最新情報を手にすることができます。","q2":"BitGuildのソシャールメディアはありますか","a2":"<a href='https://twitter.com/BitGuildPLAT' target='_blank' rel='noopener noreferrer'>Twitter</a>,<a href='https://www.facebook.com/bitguildplat/' target='_blank' rel='noopener noreferrer'>Facebook</a>,<a href='https://t.me/joinchat/HtbMeE8YtEEDQExesDQgPg' target='_blank' rel='noopener noreferrer'>Telegram</a>,<a href='https://www.reddit.com/r/BitGuild/' target='_blank' rel='noopener noreferrer'>Reddit</a>,<a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>で公式アカウントを運営しております！"},"developers":{"title":"ゲーム開発会社","q1":"BitGuildのゲーム開発やタイアップにに興味を持ってます。どこに連絡しますか","a1":"partnerships@bitguild.comまでメールにしてご連絡ください。"}},"games":{"banner":{"play":"プレーイ"},"airdrop":{"countdown":"Airdrop(エアドロップ）","days":"日","hours":"時間","minutes":"分","seconds":"秒","giveaway":"Ether Onlineリリース記念イベント実施！","giveaway-over":"EtherInlineアイテムボックスイベント当選者","learn-more":"詳細はこちら"},"announce":{"coming-soon":"近日公開","in-development":"In development"},"explore":{"questions":"質問ある方はどうぞ","faq":"よくある質問","discord":"DISCORD"}},"airdrop":{"title":"リリース記念終了！","p1":"Ether Online BitGuildリリース記念イベントに参加していただいた皆様、だくさんの応募ありがとうございます！","p2":"大賞の方おめでとうございます！まだ確認されてない方ゲーム内のインベントリを今すぐ確認してください。対象になってる方にはアイテムの箱を最大51個まで受け取ることができます。","p3":"またBitGuild.comでは様々なアイテムが獲得できるチャンスがたくさん。是非公式Twitter、Discord、Facebook、公式ブログをチェックしてください。","p4":"また最新のゲームMagic Academyもお楽しんでください。","p5":"今すぐオンラインで！"}},"chat":{"chat":"チャート","send":"送信"}}

/***/ }),

/***/ "./shared/intl/localization/pt.json":
/***/ (function(module, exports) {

module.exports = {"components":{"switchLanguage":"Alterar Idioma","language":{"en":"English","zh":"简体中文","ja":"日本語","fr":"Français","pt":"Português","es":"Español","ru":"Русский"},"menu":{"inventory":"Meus Itens","exchange":"Exchange","community":"Comunidade"},"loader":{"loading":"carregando"},"title":"BitGuild"},"fields":{"language":{"label":"Idioma","required":"Idioma é obrigatório."},"nickName":{"label":"Nome","required":"Crie um nome de usuário"},"email":{"label":"Endereço de email","required":"Por favor informar seu email","invalid":"Por favor informal um endereço de email em formato válido, por exemplo seunome@email.com","conflict":"Este email já existe"},"wallet":{"label":"Endereço da Carteira Digital","required":"Favor informar o endereço de sua carteira digital","minlength":"O endereço da Carteira Digital que você informou está incompleto. For favor verifique e tente novamente.","maxlength":"Endereço muito longo","invalid":"O endereço da Carteira Digital é inválido. Por favor certifique-se que você está usando apenas dígitos alfanuméricos."},"eth":{"label":"Ethereum (ETH)"},"plat":{"label":"Platinum (PLAT)"}},"buttons":{"submit":"Submeter","register":"Registrar","sell":"Vender","gift":"Presentear","convert":"Converter","install":"Instalar MetaMask","send":"Enviar"},"errors":{"method-not-allowed":"Método não permitido","page-not-found":"Página não encontrada.","invalid-param":"Parâmetro inválido `{name}`, {reason}","required-param":"Parâmetro necessário `{name}` não encontrado","access-denied":"Acesso negado","not-found":"`{name}` não encontrado","conflict":"Este {name} já existe na base de dados","server-error":"Erro de servidor interno","spoofing-attempt":"Falha em verificar usuário ao comparar {wallet1} à {wallet2}"},"modals":{"metamask-install":{"title":"Olá!","p1":"Para acessar BitGuild, você necessita instalar MetaMask - uma carteira digital para seu browser.","p2":"Este também servirá como seu acesso ao BitGuild Portal (sem senhas extras!).","faq":"Perguntas? Cheque nossa <a href='/faq'>FAQ</a>"},"metamask-login":{"title":"Você não está conectado ao MetaMask","p1":"Por favor abrir MetaMask e seguir as instruções para obter acesso.","faq":"Perguntas? Cheque nossa <a href='/faq'>FAQ</a>"},"metamask-network":{"title":"Foi mal!","p1":"O Portal BitGuild não pode suportar esta rede. For favor altere para 'main net' para uma experiência real. Para testes, favor utilizar use Rinkeby","faq":"Perguntas? Cheque nossa <a href='/faq'>FAQ</a>"},"register":{"title":"Bem-vindo à BitGuild","n1":"Por favor certifique-se de salvar suas informações de acesso ao MetaMask, assim como detalhes para recuperar sua conta!","n2":"Não podemos ajudá-lo a recuperar sua conta se voice perder acesso.","text":"BitGuild exige que todos os usuários assinem com sua chave privada para proteger contra tentativas de falsificação.\n\nNossa missão é revolucionar a indústria global de jogos criando uma plataforma para uma nova classe de jogos que vivem no blockchain. Os jogos na blockchain redefinem completamente a relação entre os jogadores e os desenvolvedores, pois facilitam o controle total e real de todos os itens em um jogo, a troca, compra e venda de ativos de maneira rápida e fácil, compatibilidade entre items em diferentes jogos, e muito mais. A equipe da BitGuild consiste em veteranos de jogos com décadas de experiência na construção de plataformas e comunidades internacionais de jogos de grande porte. BitGuild tem como objetivo hospedar os melhores jogos de blockchain e a maior comunidade de jogadores de blockchain online."},"sell":{"title":"Pique ligado!","p1":"Nós iremos lhe informar quando for possível realizar venda de itens","faq":"Perguntas? Cheque nossa <a href='/faq'>FAQ</a>"}},"pages":{"inventory":{"title":"Meus itens","all":"Todos","all-items":"Todos Itens","back-to-game":"Voltar ao jogo","empty":"Você não tem nenhum item ainda","faq":"Perguntas? Cheque nossa <a href='/faq'>FAQ</a>"},"faq":{"title":"FAQ","metamask":{"title":"Metamask","q1":"O que é Metamask?","a1":"É um plug-in do navegador que conecta sua carteira ethereum digital ao Portal.","q2":"Eu realmente preciso usar metamask?","a2":"Por enquanto, a única forma de usar o BitGuild Portal envolve a MetaMask. Estamos abertos para integrar a funcionalidade de outras carteiras de navegador ativadas para Ethereum no futuro.","q3":"Não consigo ver meu PLAT na minha carteira! Onde está?","a3":"Se você estiver usando o MetaMask, será necessário ativar a interface BETA e adicionar manualmente o token PLAT à sua lista de tokens. Use este endereço ao configurar: 0x7E43581b19ab509BCF9397a2eFd1ab10233f27dE (especifique 18 para dígitos).","q4":"O registro com minha chave privada no Portal BitGuild tem uma taxa de transação?","a4":"Não, apenas as transações enviadas através da sua MetaMask Wallet terão uma taxa de combustível."},"plat":{"title":"Tokens PLAT","q1":"O que é o PLAT?","a1":"PLAT é o Token oficial da BitGuild, usado no ecossistema BitGuild para jogar, trocar itens e muito mais! É a moeda motriz no portal BitGuild, utilizável em todos os jogos atuais e futuros.","q2":"Como eu compro o PLAT?","a2":"Usuários BitGuild registrados podem comprar PLAT através do conversor na barra superior direita do Portal BitGuild.","q3":"Existe algum jogo que eu possa jogar sem o PLAT?","a3":"A maioria dos jogos aceita apenas o PLAT, embora alguns possam aceitar ETH. Nesse caso, o uso do PLAT sempre trará um desconto para o jogador. No entanto, alguns títulos também podem apresentar aos usuários um modelo, oferecendo aos jogadores uma maneira de experimentar o jogo sem comprar nada.","q4":"Qual é a taxa de câmbio ETH to PLAT?","a4":"A taxa de câmbio mais atualizada será mostrada no conversor."},"games":{"title":"BitGuild Games","q1":"Posso jogar algum desses jogos no celular?","a1":"Se o jogo suporta jogos para celular, você pode usar qualquer uma das carteiras móveis com navegadores habilitados para Ethereum, como o <a href='https://trustwalletapp.com/' target='_blank' rel='noopener noreferrer'>Trust Wallet</a>, para jogar os jogos no BitGuild Portal.","q2":"Eu joguei um jogo fora do BitGuild.com e agora quero jogá-lo pelo portal do BitGuild. Isso é possível?","a2":"Sim. Se o jogo estiver disponível no BitGuild.com, mas você já jogou em outro lugar antes, todos os seus itens e seu progresso serão preservados, contanto que você se inscreva no BitGuild.com com o mesmo endereço de carteira que você costumava jogar o jogo anteriormente."},"items":{"title":"Game Items","q1":"Como posso negociar e vender meus itens?","a1":"O BitGuild Marketplace está em desenvolvimento. Enquanto isso, você está livre para usar qualquer mercado existente para os tokens ERC721.","q2":"Posso negociar fora do portal?","a2":"Sim, você está livre para usar qualquer mercado existente para os tokens ERC721","q3":"Como posso relatar um problema com o Portal ou com um jogo?","a3":"Você pode nos enviar um email para <a href='mailto:support@bitguild.com'>support@bitguild.com</a>, ou você pode entrar em contato com a comunidade do BitGuild no <a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>!","q4":"Como posso ver os itens que tenho até agora?","a4":"Você pode ver os itens de todos os jogos que vivem no Portal BitGuild na seção 'Meus itens', localizada na barra de menu superior.","q5":"Eu tenho um item que está faltando. Para quem posso relatar isso?","a5":"Envie-nos um e-mail para <a href='mailto:support@bitguild.com'>support@bitguild.com</a>, ou encontre-nos no <a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>, e faremos o nosso melhor para resolver a situação.","q6":"Gostaria de denunciar um scammer","a6":"Entre em contato com <a href='mailto:support@bitguild.com'>support@bitguild.com</a> e inclua o máximo possível de informações, incluindo screenshots.","q7":"Gostaria de reportar um bug","a7":"Entre em contato com <a href='mailto:support@bitguild.com'>support@bitguild.com</a> e inclua o máximo possível de informações de apoio, incluindo screenshots.","q8":"Quanto tempo demora uma transação de compra?","a8":"Cada transação, seja compra ou gifting (presente), pode levar de 30 segundos a alguns minutos, dependendo do preço do gás selecionado no MetaMask.","q9":"E se a minha transação não estiver passando?","a9":"Se uma transação não está ocorrendo, a MetaMask permite que você aumente o preço do gás para as transações pendentes. As transações são enfileiradas, portanto, se uma das transações anteriores estiver paralisada, todas as seguintes serão paralisadas também. ","q10":"Quanto custa cada transação (preço do gás)?","a10":"Você pode definir seu preço do gás através do MetaMask. O gasto real de gás varia dependendo do jogo e do tipo de transação."},"account":{"title":"Minha conta","q1":"Qual é a minha informação de login do BitGuild?","a1":"Usuários fazem login no BitGuild.com usando suas credenciais MetaMask.","q2":"Estou com problemas para fazer login. O que posso fazer?","a2":"Verifique suas informações de login no MetaMask e garanta que não haja problemas conflitantes. Se você ainda tiver problemas, entre em contato conosco pelo <a href='mailto:support@bitguild.com'>support@bitguild.com</a>, ou nos encontre diretamente no <a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>.","q3":"Esqueci meu nome e senha do BitGuild. Como posso recuperá-lo?","a3":"O BitGuild não usa as informações de login tradicionais - tudo está conectado ao MetaMask. Se você perdeu suas credenciais da MetaMask, infelizmente não podemos ajudá-lo. :("},"community":{"title":"Comunidade BitGuild","q1":"Como posso me envolver com outros jogadores?","a1":"Além do sistema de bate-papo integrado, você também pode encontrar a comunidade do BitGuild no <a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>. Lá, você pode conversar com outros jogadores, assim como acompanhar as novidades da equipe do BitGuild e desenvolvedores de jogos.","q2":"Onde posso encontrar o BitGuild nas redes sociais?","a2":"Você pode nos encontrar no <a href='https://twitter.com/BitGuildPLAT' target='_blank' rel='noopener noreferrer'>Twitter</a>, <a href='https://www.facebook.com/bitguildplat/' target='_blank' rel='noopener noreferrer'>Facebook</a>, <a href='https://t.me/joinchat/HtbMeE8YtEEDQExesDQgPg' target='_blank' rel='noopener noreferrer'>Telegram</a>, <a href='https://www.reddit.com/r/BitGuild/' target='_blank' rel='noopener noreferrer'>Reddit</a> e claro, <a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>!"},"developers":{"title":"Game Developers","q1":"Estou interessado em desenvolver um jogo para o BitGuild. Quem posso contactar?","a1":"Entre em contato conosco pelo e-mail: partners@bitguild.com"}},"games":{"banner":{"play":"jogar"},"announce":{"coming-soon":"Em breve","in-development":"Em desenvolvimento"},"airdrop":{"countdown":"Airdrop em","days":"Dias","hours":"Horas","minutes":"Minutos","seconds":"Segundos","giveaway":"Ether Online - Distribuição de Itens Grátis","giveaway-over":"Ether Online - Vencedores do Distribuição de Itens Grátis","learn-more":"Detalhes"},"explore":{"questions":"Perguntas?","faq":"FAQ","discord":"DISCORD"}},"airdrop":{"title":"<strong>Evento encerrado!</strong>","p1":"Obrigado a todos que participaram do evento Ether Online na BitGuild!","p2":"Um parabéns especial para os vencedores do grande prêmio! Se você ainda não o fez, verifique seu inventário no jogo agora. Se você ganhou, você verá 51 baús novinhos esperando por você para abrir, revelando sua recompensa incrível!","p3":"Se você não ganhou, desculpe! Mas não se preocupe, você terá muitas chances de receber itens gratuitos com BitGuild.com no futuro! Fique atento ao nosso <a href='https://twitter.com/BitGuildPLAT' target='_blank' rel='noopener noreferrer'>Twitter</a>, <a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>, <a href='https://www.facebook.com/bitguildplat/' target='_blank' rel='noopener noreferrer'>Facebook</a> e <a href='https://medium.com/the-notice-board' target='_blank' rel='noopener noreferrer'>Blog oficial</a> para nunca perder nada.","p4":"Enquanto isso, recomendamos que você experimente nosso mais recente jogo ______ ou simplesmente dê uma olhada no que está disponível em BitGuild por você mesmo!","p5":"Vejo você online!"}},"chat":{"chat":"Chat","send":"Enviar"}}

/***/ }),

/***/ "./shared/intl/localization/ru.json":
/***/ (function(module, exports) {

module.exports = {"components":{"switchLanguage":"Изменить язык","language":{"en":"English","zh":"简体中文","ja":"日本語","fr":"Français","pt":"Português","es":"Español","ru":"Русский"},"menu":{"inventory":"Мои предметы","exchange":"Биржа","community":"Сообщество"},"loader":{"loading":"Загрузка"},"title":"BitGuild"},"fields":{"language":{"label":"Язык","required":"Необходимо выбрать язык."},"nickName":{"label":"Отображаемое имя","required":"Напишите своё имя."},"email":{"label":"Адрес Email","required":"Напишите свою электронную почту.","invalid":"Напишите свою электронную почту в формате yourname@email.com.","conflict":"Этот почтовый ящик уже зарегистрирован."},"wallet":{"label":"Адрес кошелька","required":"Укажите адрес своего кошелька.","minlength":"Адрес кошелька не заполнен до конца, проверьте это поле и попробуйте ещё раз.","maxlength":"Адрес кошелька слишком длинный.","invalid":"Адрес кошелька некорректный. Используйте только буквы и цифры."},"eth":{"label":"Ethereum (ETH)"},"plat":{"label":"Platinum (PLAT)"}},"buttons":{"submit":"Отправить","register":"Зарегистрироваться","sell":"Продать","gift":"Подарить","convert":"Купить","install":"Установить MetaMask","send":"Отправить"},"errors":{"method-not-allowed":"Метод запрещён","page-not-found":"Страница не найдена","invalid-param":"Неверное значение `{name}`, {reason}","required-param":"Небходимое значение `{name}` не указано","access-denied":"Доступ запрещён","not-found":"`{name}` не найден","conflict":"Пользователь {name} уже существует в Базе Данных","server-error":"Внутренняя Ошибка Сервера","spoofing-attempt":"Не удалось подтвердить подписавшего при сравнении {wallet1} с {wallet2}"},"modals":{"metamask-install":{"title":"Привет!","p1":"Чтобы попасть в BitGuild, установите MetaMask - цифровой кошелёк для браузера.","p2":"Он также будет использоваться, как логин к порталу BitGuild (без дополнительных паролей!).","faq":"Остались вопросы? Смотрите раздел <a href='/faq'>FAQ</a>"},"metamask-login":{"title":"Вы не вошли в MetaMask","p1":"Пожалуйста, откройте MetaMask и следуйте инструкциям для входа.","faq":"Остались вопросы? Смотрите раздел <a href='/faq'>FAQ</a>"},"metamask-network":{"title":"Извините!","p1":"Эта сеть не поддерживается порталом BitGuild. Для корректной работы переключитесь на основную сеть. Для возможности тестирования, используйте Rinkeby","faq":"Остались вопросы? Смотрите раздел <a href='/faq'>FAQ</a>"},"register":{"title":"Добро пожаловать в BitGuild","n1":"Убедитесь в том, что сохранили информацию для входа в MetaMask и информацию для восстановлении учетной записи!","n2":"Мы не сможем помочь в восстановлении, если вы потеряете доступ.","text":"BitGuild требует от всех пользователей подписи их закрытым ключом, чтобы защитить учетные записи от попыток стороннего проникновения. \n\nНаша миссия в том, чтобы совершить революцию в глобальной игровой индустрии, создав платформу для абсолютно нового класса игр, реализованных на блокчейне. Игры на блокчейне навсегда пересмотрят отношения между игроками и разработчиками, обеспечивая полноценное владение игровыми активами, дешевые и безопасные сделки с предметами, совместимость предметов и валют между играми и т.д. Команда BitGuild состоит из профессионалов, давно работающих в крипто и игровой индустрии, имеющих огромный опыт построения международных крупномасштабных игровых платформ и сообществ. BitGuild стремиться к созданию лучших блокчейн игр и самого большого онлайн сообщества блокчейн игроков."},"sell":{"title":"Оставайтесь с нами!","p1":"Мы сообщим вам, как только появится возможность продавать предметы.","faq":"Остались вопросы? Смотрите раздел <a href='/faq'>FAQ</a>"}},"pages":{"inventory":{"title":"Мои предметы","all":"Всё","all-items":"Все предметы","back-to-game":"Вернуться к игре","empty":"У вас пока нет предметов!","faq":"Узнайте больше про предметы в разделе <a href='/faq'>FAQ</a>"},"faq":{"title":"FAQ","metamask":{"title":"Metamask","q1":"Что такое Metamask?","a1":"Это плагин для браузера, соединяющий ваш электронный кошелек с Порталом.","q2":"Мне действительно нужно использовать MetaMask?","a2":"На данный момент, единственный возможный вариант использования Портала BitGuild через подключение MetaMask. Мы нацелены на интеграцию функционала других браузерных кошельков, поддерживающих Ethereum в будущем.","q3":"Я не вижу моих токенов PLAT в кошельке. Где они?","a3":"Если вы используете MetaMask, вам нужно включить BETA UI и самостоятельно добавить токены PLAT в ваш список токенов. Используйте этот адрес при добавлении: 0x7E43581b19ab509BCF9397a2eFd1ab10233f27dE (Напишите число 18 цифрами).","q4":"Будет ли регистрация с моим закрытым ключом на Портале BitGuild облагается комиссией за перевод?","a4":"Нет, только переводы, отправленные через ваш MetaMask будут облагаться GAS комиссией."},"plat":{"title":"Токены PLAT","q1":"Что такое токены PLAT?","a1":"PLAT является официальным токеном BitGuild, используемым внутри экосистемы BitGuild для участия в играх, торговле предметами и не только! Это основная валют портала BitGuild, используемая в существующих и будущих играх BitGuild.","q2":"Как купить токены PLAT?","a2":"Зарегистрированные пользователи портала BitGuild могут купить токены PLAT с помощью конвертера в правом верхнем углу портала BitGuild.","q3":"Есть ли игры, в которые я могу играть без использования токенов PLAT?","a3":"Большинство игр будут принимать только токены PLAT, хотя некоторые смогут принимать и ETH. В основном, использование токенов PLAT будет всегда давать дополнительную скидку для игрока. Тем не менее, в некоторых случаях игрокам может быть предложена модель бесплатных игр, которая даст возможность попробовать игру ничего не оплачивая.","q4":"Какой курс обмена ETH на PLAT?","a4":"Самый актуальный обменный курс будет отображаться в конвертере."},"games":{"title":"BitGuild Игры","q1":"Могу ли я играть в какие-то из этих игр на смартфоне?","a1":"Если игра поддерживает мобильную версию, вы можете использовать любой браузер с мобильный кошельком, поддерживающим Ethereum, например <a href='https://trustwalletapp.com/' target='_blank' rel='noopener noreferrer'>Trust Wallet</a>, чтобы играть на Портале BitGuild.","q2":"Допустим, я играл в одну игру не на сайте BitGuild.com, а теперь хочу играть в нее с помощью портала BitGuild. Это возможно?","a2":"Да! Если игра доступна на сайте BitGuild.com, но вы играли в нее где-то ранее, все ваши предметы и игровой прогресс будут сохранены до момента, как вы зарегистрировались на сайте BitGuild.com с тем же адресом кошелька, который вы использовали для игры до этого."},"items":{"title":"Игровые Предметы","q1":"Как я могу могу торговать предметами и продавать мои?","a1":"Торговая Площадка BitGuild сейчас в разработке. Несмотря на это, вы вправе использовать любую торговую площадку для токенов ERC721.","q2":"Могу ли я заниматься торговлей за пределами портала?","a2":"Да, вы спокойно можете использовать любую торговую площадку для токенов ERC721.","q3":"Как я могу сообщить о проблеме на Портале или в игре?","a3":"Можете написать нам письмо на адрес <a href='mailto:support@bitguild.com'>support@bitguild.com</a> или можете обратиться к Команде BitGuild и Сообществу игроков через <a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>!","q4":"Где я могу увидеть предметы, которые у меня есть?","a4":"Вы можете увидеть предметы для всех игр, существующих на Портале BitGuild, войдя в раздел «Мои Предметы» в верхнем меню.","q5":"У меня пропал предмет. Кому об этом написать?","a5":"Напишите на адрес <a href='mailto:support@bitguild.com'>support@bitguild.com</a> или найдите нас на <a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>, а мы приложим все усилия, чтобы исправить ситуацию.","q6":"Я бы хотел сообщить в мошеннике.","a6":"Напишите на адрес <a href='mailto:support@bitguild.com'>support@bitguild.com</a>, приложив максимальное количество подтверждающей информации, которая у вас есть, включая скриншоты.","q7":"Я бы хотел сообщить об ошибке в предмете.","a7":"Напишите на адрес <a href='mailto:support@bitguild.com'>support@bitguild.com</a>, приложив максимальное количество подтверждающей информации, которая у вас есть, включая скриншоты.","q8":"Сколько времени занимает транзакция покупки?","a8":"Любая транзакция, как покупка или дарение, может занимать от 30 секунд до нескольких минут. Всё зависит от того, какую стоимость gas вы указали в MetaMask.","q9":"Что делать, если моя транзакция не проходит?","a9":"Если транзакция не проходит, MetaMask дает возможность увеличить стоимость gas для отложенных транзакций. Транзакции ставятся в очередь, поэтому если какая-то из предыдущих транзакций застряла, то и все последующие проходить не будут.","q10":"Сколько стоит каждая транзакция? (Цена gas)?","a10":"Вы можете установить собственную цену gas через MetaMask. Фактическая стоимость gas меняется в зависимости от игры и типа транзакции."},"account":{"title":"Моя Учётная Запись","q1":"Что является моим логином для входа в BitGuild?","a1":"Пользователи регистрируются на портале BitGuild.com, используя учетную запись MetaMask.","q2":"У меня проблемы с регистрацией. Что делать?","a2":"Дважды проверьте свои данные для входа в MetaMask и убедитесь в отсутствии противоречий. Если проблему не удалось решить, напишите нам на адрес <a href='mailto:support@bitguild.com'>support@bitguild.com</a> или обращайтесь к нам через <a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>.","q3":"Я забыл логин и пароль на портале BitGuild. Как мне получить их?","a3":"Портал BitGuild не использует стандартный метод входа – всё завязано на MetaMask. Если вы потеряли доступ к своей учетной записи в MetaMask, мы не сможем вам помочь, к сожалению. :("},"community":{"title":"Сообщество BitGuild","q1":"Как я могу взаимодействовать с другими игроками?","a1":"Пока Портал BitGuild поддерживает встроенный чат, но вы также можете взимодействовать с сообществом BitGuild через <a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>. Там вы можете переписываться с другими игроками, а также читать свежие новости Команды BitGuild и сторонних разработчиков.","q2":"В каких социальных сетях я могу найти BitGuild?","a2":"Нас можно найти в <a href='https://twitter.com/BitGuildPLAT' target='_blank' rel='noopener noreferrer'>Twitter</a>, <a href='https://www.facebook.com/bitguildplat/' target='_blank' rel='noopener noreferrer'>Facebook</a>, <a href='https://t.me/joinchat/HtbMeE8YtEEDQExesDQgPg' target='_blank' rel='noopener noreferrer'>Telegram</a>, <a href='https://www.reddit.com/r/BitGuild/' target='_blank' rel='noopener noreferrer'>Reddit</a> и <a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>!"},"developers":{"title":"Разработчики Игр","q1":"Мне интересно разработать игру для BitGuild. Кому мне нужно написать?","a1":"Напишите нам на адрес: partnerships@bitguild.com"}},"games":{"banner":{"play":"Играть"},"airdrop":{"countdown":"Начало через","days":"Дней","hours":"Часов","minutes":"Минут","seconds":"Секунд","giveaway":"Pаздача Cлонов в Ether Online","giveaway-over":"Победители в Бесплатной Раздаче Предметов в игре Ether Online","learn-more":"Узнать больше"},"announce":{"coming-soon":"Совсем скоро","in-development":"В разработке"},"explore":{"questions":"Остались вопросы?","faq":"FAQ","discord":"DISCORD"}},"airdrop":{"title":"Лотерея закончена!","p1":"Мы хотели бы поблагодарить всех, кто принял участие в раздаче призов Ether.Online на Платформе BitGuild!","p2":"С начала, наши поздравления тем, кто выиграл главный приз! Если вы пока не знаете результат, пожалуйста зайдите в список своих предметов и проверьте их. Если вы выиграли, обнаружите там 51 ящик с предметами, которые только и ждут, чтобы их открыли. Там найдете много интересного!","p3":"Если вы не оказались в числе победителей, ничего страшного! Не переживайте, у вас есть куча возможностей получить крутые предметы от портала BitGuild в будущем. Подпишитесь на наши аккаунты в Twitter, Discord, Facebook и официальный блог, чтобы первыми узнавать о новых рзыгрышах!","p4":"А пока, мы рекомендуем вам попробовать наш последний игровой блок Magic Academy или просто увидеть то, что доступно на портале BitGuild для тебя!","p5":"До встречи в игре!"}},"chat":{"chat":"Начать чат","send":"Отправить"}}

/***/ }),

/***/ "./shared/intl/localization/zh.json":
/***/ (function(module, exports) {

module.exports = {"components":{"switchLanguage":"语言","language":{"en":"English","zh":"简体中文","ja":"日本語","fr":"Français","pt":"Português","es":"Español","ru":"Русский"},"menu":{"inventory":"我的物品","exchange":"拍卖行","community":"社区"},"loader":{"loading":"加载中"},"title":"BitGuild","colon":"："},"fields":{"language":{"label":"语言","required":"请选择语言."},"nickName":{"label":"昵称","required":"请输入昵称"},"email":{"label":"邮箱","required":"请输入邮箱","invalid":"邮箱格式不对。请输入一个有效的邮箱，如：yourname@email.com","conflict":"此邮箱已被注册！"},"wallet":{"label":"钱包地址","required":"请输入你的数字钱包地址","minlength":"钱包地址有误！（过短） 请重新填写","maxlength":"钱包地址有误！（过长） 请重新填写","invalid":"钱包地址有误！钱包地址应该只包含数字和英文字母"},"eth":{"label":"以太坊(ETH)"},"plat":{"label":"Platinum (PLAT)"}},"buttons":{"submit":"确认","register":"注册","sell":"出售","gift":"赠送","convert":"转换","install":"安装MetaMask","send":"发送"},"errors":{"method-not-allowed":"方法不被允许","page-not-found":"未找到页面","invalid-param":" `参数{name}`, {reason}有误","required-param":"必要参数 `{name}` 未找到","access-denied":"拒绝访问","not-found":"`{name}` 未找到","conflict":"名字{name}已存在","server-error":"服务器错误","spoofing-attempt":"对比{wallet1}和{wallet2}时，核实发起人签名失败"},"modals":{"metamask-install":{"title":"嗨！","p1":"注册BitGuild平台账号需安装MetaMask数字钱包","p2":"以后登录BitGuild，用MetaMask即可（不需要平台密码）！","faq":"有任何问题请查看<a href='/faq'>FAQ</a>"},"metamask-login":{"title":"您未登陆MetaMask","p1":"请打开MetaMask再登录","faq":"有任何问题请查看<a href='/faq'>FAQ</a>"},"metamask-network":{"title":"对不起！","p1":"BitGuild不支持该网络， 请切换至主网。测试的话请使用Rinkeby","faq":"有任何问题请查看<a href='/faq'>FAQ</a>"},"register":{"title":"欢迎加入BitGuild","n1":"请务必保存您的MetaMask登陆信息，以及恢复账户所需的资料","n2":"若您的MetaMask资料丢失，我们将无法帮您恢复账户.","text":"BitGuild要求所有用户使用秘钥签名来注册账号，以防止欺诈。\n\n我们的使命是通过区块链来改革全球游戏行业。区块链游戏会改变玩家和开发商之间的基本关系，提高玩家的参与感和说话权，允许玩家真正拥有自己的数字资产并且可随心交易。未来的区块链游戏币和游戏装备也可以跨游戏化。BitGuild核心团队成员均为有成功创业经验的区块链和游戏行业专家。BitGuild希望给玩家提供全球最好玩的区块链游戏，做出全世界最大的区块链游戏社区。"},"sell":{"title":"请持续关注!","p1":"物品拍卖开启后，我们将马上通知您","faq":"有任何问题请查看<a href='/faq'>FAQ</a>"}},"pages":{"inventory":{"title":"我的物品","all":"全部","all-items":"全部物品","back-to-game":"回到游戏","empty":"您还没任何物品，请加油","faq":"了解更多请查看<a href='/faq'>FAQ</a>"},"faq":{"title":"FAQ","metamask":{"title":"Metamask","q1":"什么是Metamask?","a1":"MetaMask是一款在谷歌浏览器Chrome上使用的插件类型的以太坊钱包，可以让您在平台上使用您的以太坊","q2":"我必须使用metamask吗？","a2":"目前是的，现在使用BitGuild平台的唯一方式就是用Metamask。我们不排除以后会整合其他网页版的以太坊钱包的功能。","q3":"我在钱包里看不到PLAT。我的PLAT到哪去了？","a3":"如果您在使用MetaMask，你需要启用BETA UI并手动添加PLAT到你的货币列表中。设置时请使用这个地址：0x7E43581b19ab509BCF9397a2eFd1ab10233f27dE （保留18位数）","q4":"用我的私钥注册BitGuild平台会有交易费用吗？","a4":"没有费用，只有从您的MetaMask钱包往外转的时候才会有Gas费用。"},"plat":{"title":"PLAT ","q1":"什么是PLAT?","a1":"官方使用的数字货币，用来在BitGuild的生态系统里玩游戏、交易物品等。PLAT是驱动整个BitGuild平台的数字货币，用于所有已发行及将要发行在BitGuild平台的游戏里","q2":"我该如何购买PLAT?","a2":"已经注册BitGuild的用户，可以点击BitGuild平台右上角转换器买","q3":"有可以不使用PLAT就能玩的游戏吗？","a3":"小部分游戏可以使用ETH，但绝大部分游戏都只能使用PLAT。在此次的活动里，使用PLAT将可以享有折扣。有些游戏会提供免费试玩模式，玩家不用购买任何东西就能玩。","q4":" ETH与PLAT的兑换率是都少？","a4":"最新的兑换比率会在转换器里显现。"},"games":{"title":"BitGuild游戏","q1":"我可以在手机上玩吗？","a1":"只要游戏支持在手机上玩，那您就可以在手机上使用任何支持以太坊钱包的浏览器玩，例如您可以使用<a href='https://trustwalletapp.com/' target='_blank' rel='noopener noreferrer'>Trust Wallet</a> ","q2":"我之前已经在第三方平台玩某款游戏，现在我可以在BitGuild上玩这款游戏吗？","a2":"可以的，只要我们平台上有相同的游戏。您只需要使用相同的钱包地址注册BitGuild.com，那么您在该游戏里的物品和游戏进度都将保留下来。"},"items":{"title":"游戏物品","q1":"我要怎么交易我的物品？","a1":"拍卖行目前还在开发中，不过您可以使用现存的任何第三方市场进行交易，只要该市场支持ERC721数字货币","q2":"我可以在其他地方交易吗？","a2":"可以，您可以使用任何支持ERC721的市场进行交易。","q3":"我要怎么提交关于平台或者游戏的问题?","a3":"您可以发邮件到<a href='mailto:support@bitguild.com'>support@bitguild.com</a> ，也可以到<a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>上留言。","q4":"我怎么查看我已拥有的物品？","a4":"您可以点击顶部菜单栏'我的物品'，在里面您可以看到您的所有物品。","q5":"我有物品丢失了，我要找谁？","a5":"您可以发邮件到<a href='mailto:support@bitguild.com'>support@bitguild.com</a> ，或者到<a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>留言，我们会尽全力帮您决问题","q6":"我要举报骗子！","a6":"请联系<a href='mailto:support@bitguild.com'>support@bitguild.com</a> ，并附上尽可能多的信息，例如截图或者聊天记录。","q7":"我想提交Bug","a7":"请联系<a href='mailto:support@bitguild.com'>support@bitguild.com</a> ，并附上尽可能多的信息，例如截图。","q8":"交易通常多久可以完成？","a8":"无论是买卖还是赠送，一个交易少则30秒，多则几分钟可以完成，取决于您在MetaMask里设定的Gas价格","q9":"我的交易不成功怎么办？","a9":"如果交易不成功，MetaMask允许您增加该交易的Gas价格。交易是排队进行的，所以如果您有一个交易在卡住了，那么您接下来的所有交易都会被卡住。","q10":"每笔交易要多少手续费（Gas价格）","a10":"您可以自行在MetaMask里设定Gas价格，实际的手续费因应不同游戏和不同交易类型而不同。"},"account":{"title":"我的账户","q1":"我的BitGuild登陆信息是什么？","a1":"请使用MetaMask来登陆BitGuild.com.","q2":"我无法登陆时怎么办？","a2":"请检查您的MetaMask登陆信息，确保没有错误。如有问题一直无法解决，请联系<a href='mailto:support@bitguild.com'>support@bitguild.com</a> ，或者直接在<a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>联系我们。","q3":"我忘了我的BitGuild用户名和密码，我要怎么取回？","a3":" BitGuild不使用传统的登陆方式，所有信息都是绑定MetaMask的。假如您丢失了MetaMask的登陆信息，那很遗憾我们也无能为力:("},"community":{"title":"BitGuild社区","q1":"我怎么与其他玩家互动？","a1":" BitGuild有聊天系统，在<a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>上也有社区，您可以直接与其他玩家聊天，也可以在社区里与玩家、和第三方开发者、以及BitGuild团队互动，并获取最新的信息。","q2":"我可以在哪里查看BitGuild的最新信息？","a2":"您可以关注我们的<a href='https://twitter.com/BitGuildPLAT' target='_blank' rel='noopener noreferrer'>Twitter</a>、<a href='https://www.facebook.com/bitguildplat/' target='_blank' rel='noopener noreferrer'>Facebook</a>、<a href='https://t.me/joinchat/HtbMeE8YtEEDQExesDQgPg' target='_blank' rel='noopener noreferrer'>Telegram</a>、<a href='https://www.reddit.com/r/BitGuild/' target='_blank' rel='noopener noreferrer'>Reddit</a>，当然您也可以在<a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>里找到我们。"},"developers":{"title":"游戏开发商","q1":"我想为BitGuild开发游戏，我应该联系谁？","a1":"请联系partnerships@bitguild.com"}},"games":{"banner":{"play":"开始游戏"},"airdrop":{"countdown":"宝箱空投倒计时","giveaway-over":"宝箱空投倒计时 - 获奖者","giveaway":"Ether Online宝箱大赠送！","learn-more":"更多信息","days":"天","hours":"小时","minutes":"分钟","seconds":"秒"},"announce":{"coming-soon":"敬请期待","in-development":"开发中"},"explore":{"questions":"有任何问题，请查看","faq":"FAQ","discord":"DISCORD"}},"airdrop":{"title":"<strong>大派送完结啦！</strong>","p1":"我们想要特别的感谢所有参与Ether Online在BitGuild上的大派送活动的用户！","p2":"首先，恭喜所有获得超级大奖的赢家们！如果你幸运赢得大奖，你会看到最多51个亮锃锃的宝箱等你开启，里面会有属于你的奖品哦！","p3":"如果你没有赢得超级大奖，你仍然有机会得到一个宝箱。别灰心，未来你仍有机会在BitGuild.com上获得各种免费物品。关注我们的<a href='https://twitter.com/BitGuildPLAT' target='_blank' rel='noopener noreferrer'>Twitter</a>，<a href='https://discordapp.com/invite/pPC2frB' target='_blank' rel='noopener noreferrer'>Discord</a>，<a href='https://www.facebook.com/bitguildplat/' target='_blank' rel='noopener noreferrer'>Facebook</a>，<a href='https://medium.com/the-notice-board' target='_blank' rel='noopener noreferrer'>和我们的官方博客</a>，千万别错过！","p4":"还有，请查看我们最新的游戏, Magic Academy，或者直接前去BitGuild看看吧！","p5":"别走开，下次见！"}},"chat":{"chat":"聊天","send":"发送"}}

/***/ }),

/***/ "./shared/intl/setup.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return localization; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_language__ = __webpack_require__("./shared/constants/language.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_intl__ = __webpack_require__("react-intl");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_intl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_intl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_intl__ = __webpack_require__("intl");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_intl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_intl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_intl_locales_supported__ = __webpack_require__("intl-locales-supported");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_intl_locales_supported___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_intl_locales_supported__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_intl_locale_data_jsonp_en__ = __webpack_require__("intl/locale-data/jsonp/en");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_intl_locale_data_jsonp_en___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_intl_locale_data_jsonp_en__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_intl_locale_data_en__ = __webpack_require__("react-intl/locale-data/en");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_intl_locale_data_en___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_intl_locale_data_en__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__localization_en__ = __webpack_require__("./shared/intl/localization/en.json");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__localization_en___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__localization_en__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_intl_locale_data_jsonp_zh__ = __webpack_require__("intl/locale-data/jsonp/zh");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_intl_locale_data_jsonp_zh___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_intl_locale_data_jsonp_zh__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_intl_locale_data_zh__ = __webpack_require__("react-intl/locale-data/zh");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_intl_locale_data_zh___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react_intl_locale_data_zh__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__localization_zh__ = __webpack_require__("./shared/intl/localization/zh.json");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__localization_zh___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__localization_zh__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_intl_locale_data_jsonp_fr__ = __webpack_require__("intl/locale-data/jsonp/fr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_intl_locale_data_jsonp_fr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_intl_locale_data_jsonp_fr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_react_intl_locale_data_fr__ = __webpack_require__("react-intl/locale-data/fr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_react_intl_locale_data_fr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_react_intl_locale_data_fr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__localization_fr__ = __webpack_require__("./shared/intl/localization/fr.json");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__localization_fr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__localization_fr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_intl_locale_data_jsonp_pt__ = __webpack_require__("intl/locale-data/jsonp/pt");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_intl_locale_data_jsonp_pt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_intl_locale_data_jsonp_pt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_react_intl_locale_data_pt__ = __webpack_require__("react-intl/locale-data/pt");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_react_intl_locale_data_pt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_react_intl_locale_data_pt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__localization_pt__ = __webpack_require__("./shared/intl/localization/pt.json");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__localization_pt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15__localization_pt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_intl_locale_data_jsonp_ja__ = __webpack_require__("intl/locale-data/jsonp/ja");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_intl_locale_data_jsonp_ja___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_intl_locale_data_jsonp_ja__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_react_intl_locale_data_ja__ = __webpack_require__("react-intl/locale-data/ja");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_react_intl_locale_data_ja___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_react_intl_locale_data_ja__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__localization_ja__ = __webpack_require__("./shared/intl/localization/ja.json");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__localization_ja___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18__localization_ja__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_intl_locale_data_jsonp_ru__ = __webpack_require__("intl/locale-data/jsonp/ru");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_intl_locale_data_jsonp_ru___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19_intl_locale_data_jsonp_ru__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_react_intl_locale_data_ru__ = __webpack_require__("react-intl/locale-data/ru");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_react_intl_locale_data_ru___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20_react_intl_locale_data_ru__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__localization_ru__ = __webpack_require__("./shared/intl/localization/ru.json");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__localization_ru___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_21__localization_ru__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_intl_locale_data_jsonp_es__ = __webpack_require__("intl/locale-data/jsonp/es");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_intl_locale_data_jsonp_es___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_22_intl_locale_data_jsonp_es__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_react_intl_locale_data_es__ = __webpack_require__("react-intl/locale-data/es");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_react_intl_locale_data_es___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_23_react_intl_locale_data_es__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__localization_es__ = __webpack_require__("./shared/intl/localization/es.json");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__localization_es___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_24__localization_es__);
(function () {
  var enterModule = __webpack_require__("react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

 // this object will have language-specific data added to it which will be placed in the state when that language is active
// if localization data get to big, stop importing in all languages and switch to using API requests to load upon switching languages

var localization = {}; // here you bring in "intl" browser polyfill and language-specific polyfills
// (needed as safari doesn't have native intl: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
// as well as react-intl"s language-specific data
// be sure to use static imports for language or else every language will be included in your build (adds ~800 kb)

 // need Intl polyfill, Intl not supported in Safari




if (global.Intl) {
  // Determine if the built-in `Intl` has the locale data we need.
  if (!__WEBPACK_IMPORTED_MODULE_3_intl_locales_supported___default()(__WEBPACK_IMPORTED_MODULE_0__constants_language__["b" /* enabledLanguages */])) {
    // `Intl` exists, but it doesn't have the data we need, so load the
    // polyfill and patch the constructors we need with the polyfill"s.
    global.Intl.NumberFormat = __WEBPACK_IMPORTED_MODULE_2_intl___default.a.NumberFormat;
    global.Intl.DateTimeFormat = __WEBPACK_IMPORTED_MODULE_2_intl___default.a.DateTimeFormat;
  }
} else {
  // No `Intl`, so use and load the polyfill.
  global.Intl = __WEBPACK_IMPORTED_MODULE_2_intl___default.a;
} // use this to allow nested messages, taken from docs:
// https://github.com/yahoo/react-intl/wiki/Upgrade-Guide#flatten-messages-object


function flattenMessages() {
  var nestedMessages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  return Object.keys(nestedMessages).reduce(function (messages, key) {
    var value = nestedMessages[key];
    var prefixedKey = prefix ? "".concat(prefix, ".").concat(key) : key;

    if (typeof value === "string") {
      messages[prefixedKey] = value; // eslint-disable-line no-param-reassign
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
} // bring in intl polyfill, react-intl, and app-specific language data





Object(__WEBPACK_IMPORTED_MODULE_1_react_intl__["addLocaleData"])(__WEBPACK_IMPORTED_MODULE_5_react_intl_locale_data_en___default.a);
var defaultMessages = flattenMessages(__WEBPACK_IMPORTED_MODULE_6__localization_en___default.a);
localization.en = {
  locale: "en",
  messages: defaultMessages
};



Object(__WEBPACK_IMPORTED_MODULE_1_react_intl__["addLocaleData"])(__WEBPACK_IMPORTED_MODULE_8_react_intl_locale_data_zh___default.a);
localization.zh = {
  locale: "zh",
  messages: Object.assign({}, defaultMessages, flattenMessages(__WEBPACK_IMPORTED_MODULE_9__localization_zh___default.a))
};



Object(__WEBPACK_IMPORTED_MODULE_1_react_intl__["addLocaleData"])(__WEBPACK_IMPORTED_MODULE_11_react_intl_locale_data_fr___default.a);
localization.fr = {
  locale: "fr",
  messages: Object.assign({}, defaultMessages, flattenMessages(__WEBPACK_IMPORTED_MODULE_12__localization_fr___default.a))
};



Object(__WEBPACK_IMPORTED_MODULE_1_react_intl__["addLocaleData"])(__WEBPACK_IMPORTED_MODULE_14_react_intl_locale_data_pt___default.a);
localization.pt = {
  locale: "pt",
  messages: Object.assign({}, defaultMessages, flattenMessages(__WEBPACK_IMPORTED_MODULE_15__localization_pt___default.a))
};



Object(__WEBPACK_IMPORTED_MODULE_1_react_intl__["addLocaleData"])(__WEBPACK_IMPORTED_MODULE_17_react_intl_locale_data_ja___default.a);
localization.ja = {
  locale: "ja",
  messages: Object.assign({}, defaultMessages, flattenMessages(__WEBPACK_IMPORTED_MODULE_18__localization_ja___default.a))
};



Object(__WEBPACK_IMPORTED_MODULE_1_react_intl__["addLocaleData"])(__WEBPACK_IMPORTED_MODULE_20_react_intl_locale_data_ru___default.a);
localization.ru = {
  locale: "ru",
  messages: Object.assign({}, defaultMessages, flattenMessages(__WEBPACK_IMPORTED_MODULE_21__localization_ru___default.a))
};



Object(__WEBPACK_IMPORTED_MODULE_1_react_intl__["addLocaleData"])(__WEBPACK_IMPORTED_MODULE_23_react_intl_locale_data_es___default.a);
localization.es = {
  locale: "es",
  messages: Object.assign({}, defaultMessages, flattenMessages(__WEBPACK_IMPORTED_MODULE_24__localization_es___default.a))
};
;

(function () {
  var reactHotLoader = __webpack_require__("react-hot-loader").default;

  var leaveModule = __webpack_require__("react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(localization, "localization", "/Users/shain/repositories/bitguild/PortalClient/shared/intl/setup.js");
  reactHotLoader.register(flattenMessages, "flattenMessages", "/Users/shain/repositories/bitguild/PortalClient/shared/intl/setup.js");
  reactHotLoader.register(defaultMessages, "defaultMessages", "/Users/shain/repositories/bitguild/PortalClient/shared/intl/setup.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/next/node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./pages/_app.js");


/***/ }),

/***/ "@babel/runtime/regenerator":
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),

/***/ "bluebird":
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),

/***/ "classnames":
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),

/***/ "intl":
/***/ (function(module, exports) {

module.exports = require("intl");

/***/ }),

/***/ "intl-locales-supported":
/***/ (function(module, exports) {

module.exports = require("intl-locales-supported");

/***/ }),

/***/ "intl/locale-data/jsonp/en":
/***/ (function(module, exports) {

module.exports = require("intl/locale-data/jsonp/en");

/***/ }),

/***/ "intl/locale-data/jsonp/es":
/***/ (function(module, exports) {

module.exports = require("intl/locale-data/jsonp/es");

/***/ }),

/***/ "intl/locale-data/jsonp/fr":
/***/ (function(module, exports) {

module.exports = require("intl/locale-data/jsonp/fr");

/***/ }),

/***/ "intl/locale-data/jsonp/ja":
/***/ (function(module, exports) {

module.exports = require("intl/locale-data/jsonp/ja");

/***/ }),

/***/ "intl/locale-data/jsonp/pt":
/***/ (function(module, exports) {

module.exports = require("intl/locale-data/jsonp/pt");

/***/ }),

/***/ "intl/locale-data/jsonp/ru":
/***/ (function(module, exports) {

module.exports = require("intl/locale-data/jsonp/ru");

/***/ }),

/***/ "intl/locale-data/jsonp/zh":
/***/ (function(module, exports) {

module.exports = require("intl/locale-data/jsonp/zh");

/***/ }),

/***/ "isomorphic-fetch":
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),

/***/ "lodash":
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "next-redux-saga":
/***/ (function(module, exports) {

module.exports = require("next-redux-saga");

/***/ }),

/***/ "next-redux-wrapper":
/***/ (function(module, exports) {

module.exports = require("next-redux-wrapper");

/***/ }),

/***/ "next/app":
/***/ (function(module, exports) {

module.exports = require("next/app");

/***/ }),

/***/ "prop-types":
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "ramda":
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-bootstrap":
/***/ (function(module, exports) {

module.exports = require("react-bootstrap");

/***/ }),

/***/ "react-ga":
/***/ (function(module, exports) {

module.exports = require("react-ga");

/***/ }),

/***/ "react-hot-loader":
/***/ (function(module, exports) {

module.exports = require("react-hot-loader");

/***/ }),

/***/ "react-intl":
/***/ (function(module, exports) {

module.exports = require("react-intl");

/***/ }),

/***/ "react-intl-redux":
/***/ (function(module, exports) {

module.exports = require("react-intl-redux");

/***/ }),

/***/ "react-intl/locale-data/en":
/***/ (function(module, exports) {

module.exports = require("react-intl/locale-data/en");

/***/ }),

/***/ "react-intl/locale-data/es":
/***/ (function(module, exports) {

module.exports = require("react-intl/locale-data/es");

/***/ }),

/***/ "react-intl/locale-data/fr":
/***/ (function(module, exports) {

module.exports = require("react-intl/locale-data/fr");

/***/ }),

/***/ "react-intl/locale-data/ja":
/***/ (function(module, exports) {

module.exports = require("react-intl/locale-data/ja");

/***/ }),

/***/ "react-intl/locale-data/pt":
/***/ (function(module, exports) {

module.exports = require("react-intl/locale-data/pt");

/***/ }),

/***/ "react-intl/locale-data/ru":
/***/ (function(module, exports) {

module.exports = require("react-intl/locale-data/ru");

/***/ }),

/***/ "react-intl/locale-data/zh":
/***/ (function(module, exports) {

module.exports = require("react-intl/locale-data/zh");

/***/ }),

/***/ "react-redux":
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "react-router-redux":
/***/ (function(module, exports) {

module.exports = require("react-router-redux");

/***/ }),

/***/ "redux":
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "redux-devtools-extension":
/***/ (function(module, exports) {

module.exports = require("redux-devtools-extension");

/***/ }),

/***/ "redux-localstorage":
/***/ (function(module, exports) {

module.exports = require("redux-localstorage");

/***/ }),

/***/ "redux-localstorage-filter":
/***/ (function(module, exports) {

module.exports = require("redux-localstorage-filter");

/***/ }),

/***/ "redux-localstorage/lib/adapters/localStorage":
/***/ (function(module, exports) {

module.exports = require("redux-localstorage/lib/adapters/localStorage");

/***/ }),

/***/ "redux-logger":
/***/ (function(module, exports) {

module.exports = require("redux-logger");

/***/ }),

/***/ "redux-saga":
/***/ (function(module, exports) {

module.exports = require("redux-saga");

/***/ }),

/***/ "redux-saga/effects":
/***/ (function(module, exports) {

module.exports = require("redux-saga/effects");

/***/ }),

/***/ "redux-thunk":
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),

/***/ "sendbird":
/***/ (function(module, exports) {

module.exports = require("sendbird");

/***/ })

/******/ });
//# sourceMappingURL=_app.js.map