'use strict';

angular.module('zoobirdApp.aboutus')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/aboutus', {
        templateUrl: 'app/aboutus/aboutus.html',
        controller: 'AboutUsController',
        controllerAs: 'aboutus'
      });
  });
