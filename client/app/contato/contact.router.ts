'use strict';

angular.module('zoobirdApp.contact')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/contato', {
        templateUrl: 'app/contato/contact.html',
        controller: 'ContactController',
        controllerAs: 'contact'
      });
  });
