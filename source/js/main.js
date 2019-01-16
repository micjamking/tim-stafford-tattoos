/** Libs */
import utils, { w } from './lib/utils';
import AddBrowserClassNames from './lib/add-browser-class-names';
// import LazyLoad from 'vanilla-lazyload';

/** Angular app */
import App from './ng/app';

/** Main entry point */
export default class Main {


  /**
   * Instantiate global listeners
   */
  constructor(){
    this._utils = new utils();
    this._registerListeners();
  }


  /**
   * Initialize Angular application
   */
   _initApp(){
     new AddBrowserClassNames(document.body);
     new App();
   }


  /**
   * Initialize user interface
   */
   _initUI(){
   }


    /**
     * Window resize event callback
     */
   _onResize () {
   }


  /**
   * Setup global event listeners
   * @private
   */
  _registerListeners(){

    // Initialize Angular on `DOMContentLoaded` event
    w.addEventListener( 'DOMContentLoaded', (e) => this._initApp(e), { once: true } );

    // Initialize everything else on `load` event
    // w.addEventListener( 'load', (e) => this._initUI(e) );

    // Setup `resize` event callback
    // w.addEventListener( 'resize', (e) => this._onResize(e) );

  }


}


/** hello.universe */
new Main();
