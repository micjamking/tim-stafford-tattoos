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
    this.captchaError = false;

    // Tattoo-themed captcha questions
    this.captchaQuestions = [
      { question: 'Tim specializes in bold colors and dynamic compositions. If a sleeve takes 3 sessions and each session is 4 hours, how many total hours? (just the number)', answer: '12' },
      { question: 'A traditional rose tattoo has 8 petals and you want 3 roses. How many petals total? (just the number)', answer: '24' },
      { question: 'New school style adds vibrant energy to classic designs. If a piece takes 5 hours at $150/hour, what\'s the cost? (just the number)', answer: '750' },
      { question: 'Bold line work is a signature of Tim\'s style. If you have 2 tattoos on each arm, how many tattoos? (just the number)', answer: '4' },
      { question: 'Tattoo healing takes dedication. If you need to moisturize 3 times daily for 7 days, how many total applications? (just the number)', answer: '21' },
      { question: 'Custom illustration brings your vision to life. If a back piece covers 15 inches wide and 10 inches tall, what\'s the area? (just the number)', answer: '150' }
    ];

    // Initialize captcha
    this.generateCaptcha();

  }

  /**
   * Generates a random captcha question
   */
  generateCaptcha() {
    const randomIndex = Math.floor(Math.random() * this.captchaQuestions.length);
    const selected = this.captchaQuestions[randomIndex];
    this.captchaQuestion = selected.question;
    this._correctAnswer = selected.answer.toLowerCase().trim();
    this.captchaAnswer = '';
    this.captchaError = false;
  }

  /**
   * Validates the captcha answer
   * @returns {boolean} - Whether the captcha is valid
   */
  validateCaptcha() {
    const userAnswer = (this.captchaAnswer || '').toLowerCase().trim();
    return userAnswer === this._correctAnswer;
  }

  /**
   * Submits the form data by POST'ing to an iframe.
   * @param {Event} e - Event Object
   */
  submit(e) {
    e.preventDefault();

    // Validate captcha first
    if (!this.validateCaptcha()) {
      this.captchaError = true;
      this.generateCaptcha(); // Generate a new question

      if (!this._$scope.$$phase) {
        this._$scope.$apply();
      }

      return;
    }

    let iframeEl = this._$el.querySelector(iframeSelector);
    let formEl = this._$el.querySelector(formSelector);

    iframeEl.addEventListener('load', () => {
      this.loading = false;
      this.submitted = true;

      if (!this._$scope.$$phase) {
        this._$scope.$apply();
      }

    }, {'once': true});

    this.loading = true;
    this.submitted = false;
    this.captchaError = false;

    formEl.submit();
  }

}
