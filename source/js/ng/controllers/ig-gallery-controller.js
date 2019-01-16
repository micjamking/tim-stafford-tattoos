/**
 * Instagram Gallery controller
 */

import utils from './../../lib/utils';

export default class IGGalleryController {
  static get $inject() {
    return ['$element', '$scope', '$window'];
  }

  constructor($element, $scope, $window) {
    this._$scope = $scope;
    this._$el = $element[0];
    this._$w = $window;

    this._utils = new utils();

    this.init();
  }

  /**
   * Initializes Instagram gallery
   */
  init() {
    console.log('instagram gallery initialized.')
  }

}
