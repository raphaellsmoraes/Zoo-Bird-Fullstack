'use strict';

angular.module('zoobirdApp', [
    'zoobirdApp.auth',
    'zoobirdApp.admin',
    'zoobirdApp.aboutus',
    'zoobirdApp.noticias',
    'zoobirdApp.diferencial',
    'zoobirdApp.contact',
    'zoobirdApp.viveiro',
    'zoobirdApp.produtos',
    'zoobirdApp.constants',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngFileUpload',
    'btford.socket-io',
    'ui.bootstrap',
    'validation.match'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
