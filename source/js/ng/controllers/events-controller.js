/**
 * Events controller
 */

import utils from './../../lib/utils';

export default class EventsController {
  static get $inject() {
    return ['$element', '$scope', '$window'];
  }

  constructor($element, $scope, $window) {
    this._$scope = $scope;
    this._$el = $element[0];
    this._$w = $window;

    this._utils = new utils();
  }

  /**
   * Initializes Events
   */
  init() {
    // console.log('events initialized.')
  }

}
