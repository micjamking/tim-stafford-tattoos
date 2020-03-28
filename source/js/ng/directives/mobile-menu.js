class MobileMenuController {
  static get $inject() {
    return ['$scope', '$element', '$attrs'];
  }

  constructor ($scope, $element, $attrs){
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

    if (this.$menuButton) this.$menuButton.addEventListener('click', (e) => this.openMenu(e));
    if (this.$closeButton) this.$closeButton.addEventListener('click', (e) => this.closeMenu(e));

    // console.log('mobile menu directive instantiated.')

    this._$scope.$on('$destroy', () => {
      this._dispose();
    });
  }

  /**
   * Open mobile menu
   */
  openMenu() {
    this._$scope.isMenuActive = true;
    this._$el.classList.add(this.activeClass);
    this.$menuWrapper.classList.add(this.activeClass);
    this.$activeEls.forEach((el) => {
      el.classList.add(this.activeElsClass);
    });
  }

  /**
   * Close mobile menu
   */
  closeMenu() {
    this._$scope.isMenuActive = false;
    this._$el.classList.remove(this.activeClass);
    this.$menuWrapper.classList.remove(this.activeClass);
    this.$activeEls.forEach((el) => {
      el.classList.remove(this.activeElsClass);
    });
  }

 /**
  * Cleans up slideshow on $destroy event.
  */
  _dispose() {
    // console.log('$destroy event fired!');
  }

}

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
let mobileMenuDirective = () => {
  return {
    restrict: 'A',
    controller: MobileMenuController
  };
};

export default mobileMenuDirective;
