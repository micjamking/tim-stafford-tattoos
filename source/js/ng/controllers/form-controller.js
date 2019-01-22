/**
 * Form controller
 */

import utils from './../../lib/utils';

export default class FormController {
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
   * Initializes form
   */
  init() {
    console.log('form controller initialized.')
  }

}
