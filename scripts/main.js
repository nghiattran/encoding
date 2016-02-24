'use strict';

var crypto = require('crypto');

angular.module('phonecatApp', []).controller('PhoneListCtrl', function ($scope) {

  $scope.types = ['hash', 'cipher'];

  $scope.hashTypes = [
    'md5',
    'sha',
    'sha1',
    'sha224',
    'sha256',
    'sha384',
    'sha512'];

  $scope.encodingTypes = [
    'hex',
    'base64'];

	$scope.encrypt = function (data) {
		data.hashAlg = data.hashAlg || 'sha256';
		data.digest = data.digest || 'base64';
		$scope.key = crypto.createHash(data.hashAlg).update(data.string).digest(data.digest);
  }
});