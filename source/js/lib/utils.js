/**
 *  Utility methods
 */

/** @type {Object} Window */
export const w = window;

/** @type {Function} Query selector */
export const $ = document.querySelectorAll.bind(document);

export default class utils {

  constructor(){
    /**
     * Normalize requestAnimationFrame cross-browser
     */
    if (!w['requestAnimationFrame']) {

      w['requestAnimationFrame'] = ( w['webkitRequestAnimationFrame'] ||
                                     w['mozRequestAnimationFrame'] ||
                                     w['oRequestAnimationFrame'] ||
                                     w['msRequestAnimationFrame'] ||
                                     function(callback) {
                                       return w['setTimeout'](callback, 1000 / 60);
                                     });

    }

    /**
     * Normalize cancelAnimationFrame cross-browser
     */
    if (!w['cancelAnimationFrame']) {

      w['cancelAnimationFrame'] = ( w['cancelRequestAnimationFrame'] ||
                                    w['webkitCancelAnimationFrame'] ||
                                    w['webkitCancelRequestAnimationFrame'] ||
                                    w['mozCancelAnimationFrame'] ||
                                    w['mozCancelRequestAnimationFrame'] ||
                                    w['oCancelAnimationFrame'] ||
                                    w['oCancelRequestAnimationFrame'] ||
                                    w['msCancelAnimationFrame'] ||
                                    w['msCancelRequestAnimationFrame'] ||
                                    w.clearTimeout );

    }

    // console.log('instantiated new utility object');
  }

  /**
   * Get current screen size (width / height)
   *
   * @return {Object} screen - width / height of current screen object
   */
  screenSize () {
    let d = document,
        e = d.documentElement,
        g = d.body,
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;

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
  captureMouse (el) {

    let utils = this;

    let mouse = {
      x: 0,
      y: 0,
      percentageX: 0,
      percentageY: 0
    };

    function mouseListener(e) {

      let offsetLeft = el.offsetLeft || 0;
      let offsetTop = el.offsetTop || 0;

      mouse.x = e.pageX - offsetLeft;
      mouse.y = e.pageY -offsetTop;

      mouse.percentageX = (mouse.x - utils.screenSize().width / 2) / (utils.screenSize().width) * 100;
      mouse.percentageY = (mouse.y - utils.screenSize().height / 2) / (utils.screenSize().height) * 100;

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
  captureTouch (el) {

    let touch = {
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
  captureTilt () {

    let tilt = {
      x: 0,
      y: 0
    };


    /**
     * Handle Device Orientation
     *  - Tilt 90º > 0º to increase gravity on mobile
     */
    function handleOrientation (e) {

      var x = e.gamma;
      var y = e.beta;

      if (x > 90) { x = 90 }
      if (x < 45) { x = 45 }

      if (y > 90) { y = 90 }
      if (y < 0) { y = 0 }

      var rangeX = (90 - Math.floor( Math.abs(x) ) ) / 45;
      var rangeY = (90 - Math.floor( Math.abs(y) ) ) / 90;

      // Do stuff with the new orientation data
      if (Math.floor( rangeY * 10 ) > 0) {
        this.gravity = rangeY;
      }

      if (Math.floor( rangeX * 10 ) > 0) {
        this.speed = rangeX;
      }

    }

    w.addEventListener('deviceorientation', (e) => handleOrientation(e), true);

    return tilt;

  }


  deviceOrientationSupport () {
    return !!w['DeviceOrientationEvent'];
  }


  touchSupport () {
    return ('ontouchstart' in w);
  }


  allowDeviceOrientation () {
    return this.deviceOrientationSupport() && this.touchSupport();
  }


  /**
   * Throttle an event and provide custom event for callback
   * @emits {name} Custom event to dispatch on object
   */
  throttleEvent(type, callback) {
    var running = false;
    var func = () => {
      if (running) {
        return;
      }
      running = true;
      window.requestAnimationFrame(() => {
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
  isElementInViewport(element, percentage) {

    var rect = element.getBoundingClientRect();

    percentage = percentage || 1;

    return (
        rect.bottom >= 0 &&
        rect.right  >= 0 &&
        rect.top  <= ( ( window.innerHeight || document.documentElement.clientHeight ) * percentage ) &&
        rect.left <= ( ( window.innerWidth || document.documentElement.clientWidth ) * percentage )
    );

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
  addClassOnScrollInToView(settings) {

    let inview = this;

    settings.activeClass = settings.activeClass || 'inview';
    settings.callbackClass = settings.callbackClass || 'inview-cb-complete';
    settings.initClass = settings.initClass || 'inview-init';
    settings.threshold = settings.threshold || 0.25;
    settings.removeClassOnExit = settings.removeClassOnExit !== false;

    /** Scroll event callback  */
    function scrollCallback_(){

      function toggleActiveClass(el){
        if (inview.isElementInViewport(el, 1 - settings.threshold)) {
          if (settings.enterCb && !el.classList.contains(settings.callbackClass)){
            settings.enterCb(el, settings.callbackClass);
          }
          el.classList.add(settings.initClass);
          el.classList.add(settings.activeClass);
          el.classList.add(settings.callbackClass);
        }

        if (settings.removeClassOnExit){
          if (!inview.isElementInViewport(el, 1 - settings.threshold)){
            if (settings.exitCb && el.classList.contains(settings.callbackClass)){
              settings.exitCb(el, settings.callbackClass);
            }
            el.classList.remove(settings.activeClass);
            el.classList.remove(settings.callbackClass);
          }
        }
      }

      Array.prototype.forEach.call(settings.elements, (el) => {
        if (el) toggleActiveClass(el);
      });
    }

    /** Throttle default scroll event and listen for optimizedScroll event */
    this.throttleEvent('scroll', scrollCallback_);

  }

}
