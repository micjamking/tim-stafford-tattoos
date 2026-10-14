const formSelector = '[tst-form]';
const iframeSelector = '[tst-form-iframe]';
const SUBMIT_TIMEOUT_MS = 15000;

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
    this.submitError = false;
    this.captchaError = false;
    this.showOptional = false;
    this.honeypot = '';
    this._formLoadTime = Date.now();

    this.captchaQuestions = [
      { question: 'What is 3 + 7?', answer: '10' },
      { question: 'What is 8 + 5?', answer: '13' },
      { question: 'What is 6 + 9?', answer: '15' },
      { question: 'What is 4 + 8?', answer: '12' },
      { question: 'What is 7 + 6?', answer: '13' },
      { question: 'What is 9 + 3?', answer: '12' },
      { question: 'What is 5 + 7?', answer: '12' },
      { question: 'What is 2 + 9?', answer: '11' }
    ];

    this.generateCaptcha();
  }

  toggleOptional() {
    this.showOptional = !this.showOptional;
  }

  generateCaptcha() {
    const randomIndex = Math.floor(Math.random() * this.captchaQuestions.length);
    const selected = this.captchaQuestions[randomIndex];
    this.captchaQuestion = selected.question;
    this._correctAnswer = selected.answer;
    this.captchaAnswer = '';
  }

  validateCaptcha() {
    return (this.captchaAnswer || '').trim() === this._correctAnswer;
  }

  validateEmail(formEl) {
    const emailInput = formEl.querySelector('input[type="email"]');
    if (!emailInput) return true;
    const value = emailInput.value.trim();
    if (!value) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  submit(e) {
    e.preventDefault();

    this.submitError = false;

    if (this.honeypot) return;
    if (Date.now() - this._formLoadTime < 2000) return;

    if (!this.validateCaptcha()) {
      this.captchaError = true;
      this.generateCaptcha();
      this._applyScope();
      return;
    }

    let formEl = this._$el.querySelector(formSelector);

    if (!this.validateEmail(formEl)) {
      const emailInput = formEl.querySelector('input[type="email"]');
      if (emailInput) emailInput.focus();
      this._applyScope();
      return;
    }

    let iframeEl = this._$el.querySelector(iframeSelector);

    const timeoutId = setTimeout(() => {
      if (this.loading) {
        this.loading = false;
        this.submitError = true;
        this._applyScope();
      }
    }, SUBMIT_TIMEOUT_MS);

    iframeEl.addEventListener('load', () => {
      clearTimeout(timeoutId);
      this.loading = false;
      this.submitted = true;
      this._applyScope();
    }, {'once': true});

    this.loading = true;
    this.captchaError = false;

    formEl.submit();
  }

  _applyScope() {
    if (!this._$scope.$$phase) {
      this._$scope.$apply();
    }
  }
}
