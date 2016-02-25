'use strict';

var indexRouterConfig = exports;

module.exports = function ($stateProvider) {
  'ngInject';
  
  $stateProvider
    .state('cipher', {
      url: '/cipher',
      templateUrl: 'app/cipher/cipher.html',
      controller: 'CipherControler',
      controllerAs: 'cipher',
    })
    .state('key', {
      url: '/key',
      templateUrl: 'app/key/keys.html',
      controller: 'KeyControler',
      controllerAs: 'key',
    })
  }