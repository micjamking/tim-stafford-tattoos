/**
 * Form controller
 */

const formSelector = '[tst-form]';
const iframeSelector = '[tst-form-iframe]';

export default class FormController {
  static get $inject() {
    return ['$element', '$scope', '$window'];
  }

  constructor($element, $scope, $window) {
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
  submit(e) {
    e.preventDefault();

    let iframeEl = this._$el.querySelector(iframeSelector);
    let formEl = this._$el.querySelector(formSelector);

    iframeEl.addEventListener('load', () => {
      this.loading = false;
      this.submitted = true;

      console.log('iframe loadeded!');

      if (!this._$scope.$$phase) {
        this._$scope.$apply();
      }

    }, {'once': true});

    this.loading = true;
    this.submitted = false;

    formEl.submit();

    console.log('form submitted...');
  }

}
