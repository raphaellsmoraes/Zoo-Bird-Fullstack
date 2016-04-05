'use strict';

angular.module('zoobirdApp', [
    'zoobirdApp.auth',
    'zoobirdApp.admin',
    'zoobirdApp.aboutus',
    'zoobirdApp.diferencial',
    'zoobirdApp.contact',
    'zoobirdApp.viveiro',
    'zoobirdApp.constants',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'btford.socket-io',
    'ui.bootstrap',
    'validation.match'
  ])
  .service('RevManifest', function ($http) {
    this.getManifest = function () {
      return $http.get('/assets/rev-manifest-test.json').then(function (response) {
        return response.data;
      });
    };

    this.imgPath = '/assets/images/';
  })
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
