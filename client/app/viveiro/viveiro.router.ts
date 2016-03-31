'use strict';

angular.module('zoobirdApp.viveiro')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/viveiro', {
        templateUrl: 'app/viveiro/viveiro.html',
        controller: 'ViveiroController',
        controllerAs: 'viveiro'
      });
  });
