'use strict';

angular.module('zoobirdApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        template: '<main></main>'
      });
  });
