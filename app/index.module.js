'use strict';

var IndexRouterConfig = require('./index.route');
var CipherControler = require('./cipher/cipher.controler');

angular.module('phonecatApp', ['ui.router'])
  .config(IndexRouterConfig)
  .controller('CipherControler', CipherControler);