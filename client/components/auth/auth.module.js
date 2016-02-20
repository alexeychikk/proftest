'use strict';

angular.module('proftestApp.auth', [
  'proftestApp.constants',
  'proftestApp.util',
  'ngCookies',
  'ngRoute'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
