'use strict';

var crypto = require('crypto');

angular.module('phonecatApp', []).controller('PhoneListCtrl', function ($scope) {

	encript("something");

	function encript (data, type, digest) {
		type = type || 'sha256';
		digest = digest || 'base64';
		$scope.key = crypto.createHash(type).update(data.string).digest(digest);
		console.log($scope.key);
	}
});