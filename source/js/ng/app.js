/** Libs */
// import ngAnimate from 'angular-animate';
// import ngTouch from 'angular-touch';

/** Controllers */
import CarouselController from './controllers/carousel-controller';
import HeroController from './controllers/hero-controller';
import IGEventsController from './controllers/ig-events-controller';
import IGGalleryController from './controllers/ig-gallery-controller';

/** Directives */

const APP_NAMESPACE = 'tst';
const angular = window.angular;

/** Main application */
export default class App {

  /**
   * Setup variables and initialize application
   */
  constructor(){

    this._ngAppName = APP_NAMESPACE;

    this._ngDependencies = [
      // 'ngAnimate',
      // 'ngTouch'
    ];

    this._ngControllers = [
      {
        name: 'TSTCarouselController',
        class: CarouselController
      },
      {
        name: 'TSTHeroController',
        class: HeroController
      },
      {
        name: 'TSTIGEventsController',
        class: IGEventsController
      },
      {
        name: 'TSTIGGalleryController',
        class: IGGalleryController
      }
    ];

    this._ngServices = [

    ];

    this._ngDirectives = [
      // {
      //   name: 'tstHeaderScroll',
      //   class: headerScrollDirective
      // }
    ];

    this._init();

  }


  /**
   * Manually initialize Angular
   * @see https://docs.angularjs.org/guide/bootstrap#manual-initialization
   */
  _init(){

    let ngApp = angular.module(this._ngAppName, this._ngDependencies);

    // Attach controllers to ngApp
    this._ngControllers.forEach((controller) => {
      ngApp.controller(controller.name, controller.class);
    });

    // Attach services to ngApp
    this._ngServices.forEach((service) => {
      ngApp.service(service.name, service.class);
    });

    // Attach directives to ngApp
    this._ngDirectives.forEach((directive) => {
      ngApp.directive(directive.name, directive.class);
    });

    // Configure & kick-start ngApp
    ngApp
    .config(['$interpolateProvider', ($interpolateProvider) => {
      $interpolateProvider.startSymbol('[[').endSymbol(']]');

      console.log(`bootstrap angular app (v${angular.version.full})`);
    }]);

    // Bootstrap ngApp
    angular.bootstrap(document, [ this._ngAppName ]);

  }

}
