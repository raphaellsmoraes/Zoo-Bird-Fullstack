'use strict';

angular.module('zoobirdApp.produtos')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/produtos', {
        templateUrl: 'app/produtos/produtos.html',
        controller: 'ProdutosController',
        controllerAs: 'produtos'
      });
  });
