'use strict';

angular.module('zoobirdApp.auth', [
  'zoobirdApp.constants',
  'zoobirdApp.util',
  'ngCookies',
  'ngRoute'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
