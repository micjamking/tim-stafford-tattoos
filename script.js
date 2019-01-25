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
/******/ 	__webpack_require__.p = "./static/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  Utility methods
 */

/** @type {Object} Window */
var w = exports.w = window;

/** @type {Function} Query selector */
var $ = exports.$ = document.querySelectorAll.bind(document);

var utils = function () {
  function utils() {
    _classCallCheck(this, utils);

    /**
     * Normalize requestAnimationFrame cross-browser
     */
    if (!w['requestAnimationFrame']) {

      w['requestAnimationFrame'] = w['webkitRequestAnimationFrame'] || w['mozRequestAnimationFrame'] || w['oRequestAnimationFrame'] || w['msRequestAnimationFrame'] || function (callback) {
        return w['setTimeout'](callback, 1000 / 60);
      };
    }

    /**
     * Normalize cancelAnimationFrame cross-browser
     */
    if (!w['cancelAnimationFrame']) {

      w['cancelAnimationFrame'] = w['cancelRequestAnimationFrame'] || w['webkitCancelAnimationFrame'] || w['webkitCancelRequestAnimationFrame'] || w['mozCancelAnimationFrame'] || w['mozCancelRequestAnimationFrame'] || w['oCancelAnimationFrame'] || w['oCancelRequestAnimationFrame'] || w['msCancelAnimationFrame'] || w['msCancelRequestAnimationFrame'] || w.clearTimeout;
    }

    // console.log('instantiated new utility object');
  }

  /**
   * Get current screen size (width / height)
   *
   * @return {Object} screen - width / height of current screen object
   */


  _createClass(utils, [{
    key: 'screenSize',
    value: function screenSize() {
      var d = document,
          e = d.documentElement,
          g = d.body,
          x = w.innerWidth || e.clientWidth || g.clientWidth,
          y = w.innerHeight || e.clientHeight || g.clientHeight;

      return {
        width: x,
        height: y
      };
    }

    /**
     * Capture mouse movement and coordinates over canvas element
     *
     * @param {HTMLElement} el - Canvas element to listen for events
     *
     * @return {Object} mouse - object containing mouse coordinates
     * @return {Object} mouse.x - x-axis mouse coordinates
     * @return {Object} mouse.y - y-axis mouse coordinates
     */

  }, {
    key: 'captureMouse',
    value: function captureMouse(el) {

      var utils = this;

      var mouse = {
        x: 0,
        y: 0,
        percentageX: 0,
        percentageY: 0
      };

      function mouseListener(e) {

        var offsetLeft = el.offsetLeft || 0;
        var offsetTop = el.offsetTop || 0;

        mouse.x = e.pageX - offsetLeft;
        mouse.y = e.pageY - offsetTop;

        mouse.percentageX = (mouse.x - utils.screenSize().width / 2) / utils.screenSize().width * 100;
        mouse.percentageY = (mouse.y - utils.screenSize().height / 2) / utils.screenSize().height * 100;
      }

      el.addEventListener('mousemove', mouseListener);

      return mouse;
    }

    /**
     * Capture touch movement and coordinates over canvas element
     *
     * @param {HTMLElement} el - Canvas element to listen for events
     *
     * @return {Object} touch - object containing touch coordinates
     * @return {Object} touch.x - x-axis touch coordinates
     * @return {Object} touch.y - y-axis touch coordinates
     * @return {Boolean} touch.isPressed - true|false if user is currently touching screen
     */

  }, {
    key: 'captureTouch',
    value: function captureTouch(el) {

      var touch = {
        x: 0,
        y: 0,
        isPressed: false
      };

      function touchStartListener() {

        touch.isPressed = true;
      }

      function touchEndListener() {

        touch.isPressed = false;
      }

      function touchMoveListener(e) {

        el.offsetLeft = el.offsetLeft || 0;
        el.offsetTop = el.offsetTop || 0;

        touch.x = e.touches[0].pageX - el.offsetLeft;
        touch.y = e.touches[0].pageY - el.offsetTop;
      }

      el.addEventListener('touchstart', touchStartListener);
      el.addEventListener('touchend', touchEndListener);
      el.addEventListener('touchmove', touchMoveListener);

      return touch;
    }

    /**
     * Capture device tilt / roatation movement
     *
     * @return {Object} touch - object containing touch coordinates
     * @return {Object} touch.x - x-axis touch coordinates
     * @return {Object} touch.y - y-axis touch coordinates
     * @return {Boolean} touch.isPressed - true|false if user is currently touching screen
     */

  }, {
    key: 'captureTilt',
    value: function captureTilt() {

      var tilt = {
        x: 0,
        y: 0
      };

      /**
       * Handle Device Orientation
       *  - Tilt 90º > 0º to increase gravity on mobile
       */
      function handleOrientation(e) {

        var x = e.gamma;
        var y = e.beta;

        if (x > 90) {
          x = 90;
        }
        if (x < 45) {
          x = 45;
        }

        if (y > 90) {
          y = 90;
        }
        if (y < 0) {
          y = 0;
        }

        var rangeX = (90 - Math.floor(Math.abs(x))) / 45;
        var rangeY = (90 - Math.floor(Math.abs(y))) / 90;

        // Do stuff with the new orientation data
        if (Math.floor(rangeY * 10) > 0) {
          this.gravity = rangeY;
        }

        if (Math.floor(rangeX * 10) > 0) {
          this.speed = rangeX;
        }
      }

      w.addEventListener('deviceorientation', function (e) {
        return handleOrientation(e);
      }, true);

      return tilt;
    }
  }, {
    key: 'deviceOrientationSupport',
    value: function deviceOrientationSupport() {
      return !!w['DeviceOrientationEvent'];
    }
  }, {
    key: 'touchSupport',
    value: function touchSupport() {
      return 'ontouchstart' in w;
    }
  }, {
    key: 'allowDeviceOrientation',
    value: function allowDeviceOrientation() {
      return this.deviceOrientationSupport() && this.touchSupport();
    }

    /**
     * Throttle an event and provide custom event for callback
     * @emits {name} Custom event to dispatch on object
     */

  }, {
    key: 'throttleEvent',
    value: function throttleEvent(type, callback) {
      var running = false;
      var func = function func() {
        if (running) {
          return;
        }
        running = true;
        window.requestAnimationFrame(function () {
          callback && callback();
          running = false;
        });
      };

      window.addEventListener(type, func);
    }

    /**
     * Check if element is currently visible in viewport
     * @see https://developer.mozilla.org/en-US/docs/Web/Events/scroll
     * @param {HTMLElement} element - DOM element to check if currently visible
     * @param {Number} percentage - The percentage of screen threshold the element must be within
     * @return {Boolean} true|false - Returns true if bottom and right property of element is greater
     * than 0, and top and left property of element is less than the window height and width respectively,
     * taking in to account a threshold percentage of the screen.
     */

  }, {
    key: 'isElementInViewport',
    value: function isElementInViewport(element, percentage) {

      var rect = element.getBoundingClientRect();

      percentage = percentage || 1;

      return rect.bottom >= 0 && rect.right >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight) * percentage && rect.left <= (window.innerWidth || document.documentElement.clientWidth) * percentage;
    }

    /**
     * Add class to element when it is scrolled in to view
     * @param {Object} settings - Settings object
     * @param {String} settings.activeClass - Name of class to add
     * @param {String} settings.callbackClass - Name of class for callback function
     * @param {String} settings.initClass - Name of class for initial inview trigger
     * @param {Array} settings.elements - Array of HTML elements to watch
     * @param {Number} settings.threshold - Percentage threshold the element needs to come into view before class is added
     * @param {Boolean} settings.removeClassOnExit - Whether to remove the active class on exit of viewport
     * @param {Function} settings.enterCb - Callback function to run when element gets inview
     * @param {Function} settings.exitCb - Callback function to run when element gets inview
     *
     * @listens {scroll} Listen for scroll event on window (default)
     * @listens {optimizedScroll} Listen for optimizedScroll event on window and fire callback function
     * @emits {optimizedScroll} Dispatch custom scroll event after throttling default scroll event
     */

  }, {
    key: 'addClassOnScrollInToView',
    value: function addClassOnScrollInToView(settings) {

      var inview = this;

      settings.activeClass = settings.activeClass || 'inview';
      settings.callbackClass = settings.callbackClass || 'inview-cb-complete';
      settings.initClass = settings.initClass || 'inview-init';
      settings.threshold = settings.threshold || 0.25;
      settings.removeClassOnExit = settings.removeClassOnExit !== false;

      /** Scroll event callback  */
      function scrollCallback_() {

        function toggleActiveClass(el) {
          if (inview.isElementInViewport(el, 1 - settings.threshold)) {
            if (settings.enterCb && !el.classList.contains(settings.callbackClass)) {
              settings.enterCb(el, settings.callbackClass);
            }
            el.classList.add(settings.initClass);
            el.classList.add(settings.activeClass);
            el.classList.add(settings.callbackClass);
          }

          if (settings.removeClassOnExit) {
            if (!inview.isElementInViewport(el, 1 - settings.threshold)) {
              if (settings.exitCb && el.classList.contains(settings.callbackClass)) {
                settings.exitCb(el, settings.callbackClass);
              }
              el.classList.remove(settings.activeClass);
              el.classList.remove(settings.callbackClass);
            }
          }
        }

        Array.prototype.forEach.call(settings.elements, function (el) {
          if (el) toggleActiveClass(el);
        });
      }

      /** Throttle default scroll event and listen for optimizedScroll event */
      this.throttleEvent('scroll', scrollCallback_);
    }
  }]);

  return utils;
}();

exports.default = utils;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);

__webpack_require__(3);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /** Libs */

// import LazyLoad from 'vanilla-lazyload';

/** Angular app */


var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _addBrowserClassNames = __webpack_require__(4);

var _addBrowserClassNames2 = _interopRequireDefault(_addBrowserClassNames);

var _app = __webpack_require__(6);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Main entry point */
var Main = function () {

  /**
   * Instantiate global listeners
   */
  function Main() {
    _classCallCheck(this, Main);

    this._utils = new _utils2.default();
    this._registerListeners();
  }

  /**
   * Initialize Angular application
   */


  _createClass(Main, [{
    key: '_initApp',
    value: function _initApp() {
      new _addBrowserClassNames2.default(document.body);
      new _app2.default();
    }

    /**
     * Initialize user interface
     */

  }, {
    key: '_initUI',
    value: function _initUI() {}

    /**
     * Window resize event callback
     */

  }, {
    key: '_onResize',
    value: function _onResize() {}

    /**
     * Setup global event listeners
     * @private
     */

  }, {
    key: '_registerListeners',
    value: function _registerListeners() {
      var _this = this;

      // Initialize Angular on `DOMContentLoaded` event
      _utils.w.addEventListener('DOMContentLoaded', function (e) {
        return _this._initApp(e);
      }, { once: true });

      // Initialize everything else on `load` event
      // w.addEventListener( 'load', (e) => this._initUI(e) );

      // Setup `resize` event callback
      // w.addEventListener( 'resize', (e) => this._onResize(e) );
    }
  }]);

  return Main;
}();

/** hello.universe */


exports.default = Main;
new Main();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var useragent = __webpack_require__(5);

var browserTests = ['isAndroid', 'isChrome', 'isFirefox', 'isIOS', 'isIE', 'isIEorEdge', 'isMobile', 'isSafari'];

var AddBrowserClassNames = function AddBrowserClassNames(element) {
  _classCallCheck(this, AddBrowserClassNames);

  browserTests.forEach(function (browserTest) {
    useragent[browserTest]() && element.classList.add(browserTest);
  });
};

exports.default = AddBrowserClassNames;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @fileoverview Utility functions related to the user agent.
 */

function isMobile() {
  return isIOS() || isAndroid();
}

function isIOS() {
  return (/iPhone|iPad|iPod/i.test(navigator.userAgent)
  );
}

function isAndroid() {
  return (/Android/i.test(navigator.userAgent)
  );
}

function isChrome() {
  return navigator.userAgent.indexOf('Chrome') != -1;
}

function isSafari() {
  return !isChrome() && navigator.userAgent.indexOf('Safari') != -1;
}

function isFirefox() {
  return navigator.userAgent.indexOf('Firefox') != -1;
}

function isIE() {
  return (/MSIE\/\d+/.test(navigator.userAgent)
  );
}

function isIEorEdge() {
  return (/Edge\/\d+/.test(navigator.userAgent) || /MSIE\/\d+/.test(navigator.userAgent) || /Trident\/\d+/.test(navigator.userAgent)
  );
}

module.exports = {
  isAndroid: isAndroid,
  isChrome: isChrome,
  isFirefox: isFirefox,
  isIOS: isIOS,
  isIE: isIE,
  isIEorEdge: isIEorEdge,
  isMobile: isMobile,
  isSafari: isSafari
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /** Libs */
// import ngAnimate from 'angular-animate';
// import ngTouch from 'angular-touch';

/** Controllers */


/** Directives */


var _carouselController = __webpack_require__(7);

var _carouselController2 = _interopRequireDefault(_carouselController);

var _formController = __webpack_require__(8);

var _formController2 = _interopRequireDefault(_formController);

var _heroController = __webpack_require__(9);

var _heroController2 = _interopRequireDefault(_heroController);

var _igEventsController = __webpack_require__(10);

var _igEventsController2 = _interopRequireDefault(_igEventsController);

var _igGalleryController = __webpack_require__(11);

var _igGalleryController2 = _interopRequireDefault(_igGalleryController);

var _mobileMenu = __webpack_require__(12);

var _mobileMenu2 = _interopRequireDefault(_mobileMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var APP_NAMESPACE = 'tst';
var angular = window.angular;

/** Main application */

var App = function () {

  /**
   * Setup variables and initialize application
   */
  function App() {
    _classCallCheck(this, App);

    this._ngAppName = APP_NAMESPACE;

    this._ngDependencies = [
      // 'ngAnimate',
      // 'ngTouch'
    ];

    this._ngControllers = [{
      name: 'TSTCarouselController',
      class: _carouselController2.default
    }, {
      name: 'TSTFormController',
      class: _formController2.default
    }, {
      name: 'TSTHeroController',
      class: _heroController2.default
    }, {
      name: 'TSTIGEventsController',
      class: _igEventsController2.default
    }, {
      name: 'TSTIGGalleryController',
      class: _igGalleryController2.default
    }];

    this._ngServices = [];

    this._ngDirectives = [{
      name: 'tstMobileMenu',
      class: _mobileMenu2.default
    }];

    this._init();
  }

  /**
   * Manually initialize Angular
   * @see https://docs.angularjs.org/guide/bootstrap#manual-initialization
   */


  _createClass(App, [{
    key: '_init',
    value: function _init() {

      var ngApp = angular.module(this._ngAppName, this._ngDependencies);

      // Attach controllers to ngApp
      this._ngControllers.forEach(function (controller) {
        ngApp.controller(controller.name, controller.class);
      });

      // Attach services to ngApp
      this._ngServices.forEach(function (service) {
        ngApp.service(service.name, service.class);
      });

      // Attach directives to ngApp
      this._ngDirectives.forEach(function (directive) {
        ngApp.directive(directive.name, directive.class);
      });

      // Configure & kick-start ngApp
      ngApp.config(['$interpolateProvider', function ($interpolateProvider) {
        $interpolateProvider.startSymbol('[[').endSymbol(']]');

        console.log('bootstrap angular app (v' + angular.version.full + ')');
      }]);

      // Bootstrap ngApp
      angular.bootstrap(document, [this._ngAppName]);
    }
  }]);

  return App;
}();

exports.default = App;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Carousel controller
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CarouselController = function () {
  _createClass(CarouselController, null, [{
    key: '$inject',
    get: function get() {
      return ['$element', '$scope', '$window'];
    }
  }]);

  function CarouselController($element, $scope, $window) {
    _classCallCheck(this, CarouselController);

    this._$scope = $scope;
    this._$el = $element[0];
    this._$w = $window;

    this._utils = new _utils2.default();

    this.init();
  }

  /**
   * Initializes carousel
   */


  _createClass(CarouselController, [{
    key: 'init',
    value: function init() {
      console.log('carousel controller initialized.');
    }
  }]);

  return CarouselController;
}();

exports.default = CarouselController;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Form controller
 */

var formSelector = '[tst-form]';
var iframeSelector = '[tst-form-iframe]';

var FormController = function () {
  _createClass(FormController, null, [{
    key: '$inject',
    get: function get() {
      return ['$element', '$scope', '$window'];
    }
  }]);

  function FormController($element, $scope, $window) {
    _classCallCheck(this, FormController);

    this._$scope = $scope;
    this._$el = $element[0];
    this._$w = $window;

    this.loading = false;
    this.submitted = false;

    console.log('form controller instantiated.');
  }

  /**
   * Submits the form data by POST'ing to an iframe.
   * @param {Event} e - Event Object
   */


  _createClass(FormController, [{
    key: 'submit',
    value: function submit(e) {
      var _this = this;

      e.preventDefault();

      var iframeEl = this._$el.querySelector(iframeSelector);
      var formEl = this._$el.querySelector(formSelector);

      iframeEl.addEventListener('load', function () {
        _this.loading = false;
        _this.submitted = true;

        console.log('iframe loadeded!');

        if (!_this._$scope.$$phase) {
          _this._$scope.$apply();
        }
      }, { 'once': true });

      this.loading = true;
      this.submitted = false;

      formEl.submit();

      console.log('form submitted...');
    }
  }]);

  return FormController;
}();

exports.default = FormController;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Hero controller
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HeroController = function () {
  _createClass(HeroController, null, [{
    key: '$inject',
    get: function get() {
      return ['$element', '$scope', '$window'];
    }
  }]);

  function HeroController($element, $scope, $window) {
    _classCallCheck(this, HeroController);

    this._$scope = $scope;
    this._$el = $element[0];
    this._$w = $window;

    this._utils = new _utils2.default();

    this.init();
  }

  /**
   * Initializes hero animations
   */


  _createClass(HeroController, [{
    key: 'init',
    value: function init() {
      console.log('hero controller initialized.');
    }
  }]);

  return HeroController;
}();

exports.default = HeroController;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Instagram Events controller
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IGEventsController = function () {
  _createClass(IGEventsController, null, [{
    key: '$inject',
    get: function get() {
      return ['$element', '$scope', '$window'];
    }
  }]);

  function IGEventsController($element, $scope, $window) {
    _classCallCheck(this, IGEventsController);

    this._$scope = $scope;
    this._$el = $element[0];
    this._$w = $window;

    this._utils = new _utils2.default();
  }

  /**
   * Initializes Instagram events
   */


  _createClass(IGEventsController, [{
    key: 'init',
    value: function init() {
      console.log('instagram events initialized.');
    }
  }]);

  return IGEventsController;
}();

exports.default = IGEventsController;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Instagram Gallery controller
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IGGalleryController = function () {
  _createClass(IGGalleryController, null, [{
    key: '$inject',
    get: function get() {
      return ['$element', '$scope', '$window'];
    }
  }]);

  function IGGalleryController($element, $scope, $window) {
    _classCallCheck(this, IGGalleryController);

    this._$scope = $scope;
    this._$el = $element[0];
    this._$w = $window;

    this._utils = new _utils2.default();
  }

  /**
   * Initializes Instagram gallery
   */


  _createClass(IGGalleryController, [{
    key: 'init',
    value: function init() {
      console.log('instagram gallery initialized.');
    }
  }]);

  return IGGalleryController;
}();

exports.default = IGGalleryController;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MobileMenuController = function () {
  _createClass(MobileMenuController, null, [{
    key: '$inject',
    get: function get() {
      return ['$scope', '$element', '$attrs'];
    }
  }]);

  function MobileMenuController($scope, $element, $attrs) {
    var _this = this;

    _classCallCheck(this, MobileMenuController);

    this._$scope = $scope;
    this._$el = $element[0];
    this._attrs = $attrs;
    this._w = window;

    this._$scope.isMenuActive = false;
    this.activeClass = this._attrs.tstMobileMenuActiveClass || 'active';
    this.activeElsClass = 'mobile-active';
    this.$activeEls = document.querySelectorAll('[tst-mobile-menu-active-element]');
    this.$menuButton = this._$el.querySelectorAll('[tst-mobile-menu-open-button]')[0];
    this.$menuWrapper = this._$el.querySelectorAll('[tst-mobile-menu-wrapper]')[0];
    this.$closeButton = this._$el.querySelectorAll('[tst-mobile-menu-close-button]')[0];

    if (this.$menuButton) this.$menuButton.addEventListener('click', function (e) {
      return _this.openMenu(e);
    });
    if (this.$closeButton) this.$closeButton.addEventListener('click', function (e) {
      return _this.closeMenu(e);
    });

    console.log('mobile menu directive instantiated.');

    this._$scope.$on('$destroy', function () {
      _this._dispose();
    });
  }

  /**
   * Open mobile menu
   */


  _createClass(MobileMenuController, [{
    key: 'openMenu',
    value: function openMenu() {
      var _this2 = this;

      this._$scope.isMenuActive = true;
      this._$el.classList.add(this.activeClass);
      this.$menuWrapper.classList.add(this.activeClass);
      this.$activeEls.forEach(function (el) {
        el.classList.add(_this2.activeElsClass);
      });
    }

    /**
     * Close mobile menu
     */

  }, {
    key: 'closeMenu',
    value: function closeMenu() {
      var _this3 = this;

      this._$scope.isMenuActive = false;
      this._$el.classList.remove(this.activeClass);
      this.$menuWrapper.classList.remove(this.activeClass);
      this.$activeEls.forEach(function (el) {
        el.classList.remove(_this3.activeElsClass);
      });
    }

    /**
     * Cleans up slideshow on $destroy event.
     */

  }, {
    key: '_dispose',
    value: function _dispose() {
      // console.log('$destroy event fired!');
    }
  }]);

  return MobileMenuController;
}();

/**
 * Mobile navigation menu
 *
 * tst-mobile-menu-active-class (string): Optional name of active class, defaults to 'active'
 *
 * <nav tst-mobile-menu>
 *   <div tst-mobile-menu-open-button></div>
 *   <div tst-mobile-menu-wrapper>
 *     <div tst-mobile-menu-close-button></div>
 *     <ul>...</ul>
 *   </div>
 * </nav>
 *
 */


var mobileMenuDirective = function mobileMenuDirective() {
  return {
    restrict: 'A',
    controller: MobileMenuController
  };
};

exports.default = mobileMenuDirective;

/***/ })
/******/ ]);