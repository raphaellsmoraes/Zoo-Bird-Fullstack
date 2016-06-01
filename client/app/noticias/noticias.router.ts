'use strict';

angular.module('zoobirdApp.noticias')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/noticias', {
        templateUrl: 'app/noticias/noticias.html',
        controller: 'NoticiasController',
        controllerAs: 'noticias'
      });
  });
