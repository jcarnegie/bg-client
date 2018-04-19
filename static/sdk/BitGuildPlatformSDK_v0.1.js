(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.sdk = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  var _default = new (
  /*#__PURE__*/
  function () {
    function BitGuildSDK() {
      _classCallCheck(this, BitGuildSDK);

      Object.defineProperty(this, "isBitGuildPortal", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: false
      });
      Object.defineProperty(this, "isInitialized", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: false
      });
      Object.defineProperty(this, "user", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: null
      });
    }

    _createClass(BitGuildSDK, [{
      key: "init",
      value: function init() {
        var _this = this;

        if (this.isInitialized) {
          return Promise.resolve();
        } else {
          return new Promise(function (resolve, reject) {
            setTimeout(function () {
              reject(new Error("timeout!"));
            }, 200);
            window.addEventListener("message", _this.receiveMessage.call(_this, resolve), false);
            window.top.postMessage({
              type: "ping"
            }, "*");
          }).then(function () {
            _this.isInitialized = true;
          }).catch(function () {});
        }
      }
    }, {
      key: "receiveMessage",
      value: function receiveMessage(resolve) {
        var _this2 = this;

        return function (_ref) {
          var data = _ref.data;

          if (data.type === "pong") {
            _this2.isBitGuildPortal = true;
            _this2.user = data.user;
            resolve();
          }
        };
      }
    }, {
      key: "isOnPortal",
      value: function isOnPortal() {
        var _this3 = this;

        return this.init().then(function () {
          return _this3.isBitGuildPortal;
        });
      }
    }, {
      key: "getUser",
      value: function getUser() {
        var _this4 = this;

        return this.init().then(function () {
          return _this4.user;
        });
      }
    }]);

    return BitGuildSDK;
  }())();

  _exports.default = _default;
});