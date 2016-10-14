'use strict';

var crypto = require('crypto');

angular.module('phonecatApp', []).controller('PhoneListCtrl', function ($scope) {
  $scope.isProcessing = false;
  $scope.time = undefined;

  var hashAlgorithms = getHashes();

  var cipherAlgorithms = getCiphers();

  $scope.encodingTypes = [
    'hex',
    'base64'];

  $scope.algorithms = {
    hash: hashAlgorithms,
    cipher: cipherAlgorithms,
    decipher: cipherAlgorithms,
    pbkdf2: hashAlgorithms
  }

	$scope.encrypt = function (data) {
    console.log(data);
    $scope.time = undefined;
    if (data.type === 'hash') {
      hash(data);
    } else if (data.type === 'cipher') {
      cipher(data);
    } else if (data.type === 'decipher') {
      decipher(data);
    }  else if (data.type === 'pbkdf2') {
      pbkdf2(data);
    }
	}

  function hash (data) {
    var start = performance.now();
    $scope.encoded = crypto.createHash(data.algorithm).update(data.string).digest(data.digest);
    var end = performance.now();
    $scope.time = end - start;
  }

  function cipher (data) {
    var start = performance.now();
    var cipher = crypto.createCipher(data.algorithm, data.key);
    $scope.encoded = cipher.update(data.string, 'utf8', data.digest);
    $scope.encoded += cipher.final('hex');
    var end = performance.now();
    $scope.time = end - start;
  }

  function decipher (data) {
    var start = performance.now();
    var decipher = crypto.createDecipher(data.algorithm, data.key);
    $scope.encoded = decipher.update(data.string, data.digest, 'utf8');
    $scope.encoded += decipher.final('utf8');
    var end = performance.now();
    $scope.time = end - start;
  }

  function pbkdf2 (data) {
    console.log(data);
    const crypto = require('crypto');
    $scope.loading = true;
    var start = performance.now();
    crypto.pbkdf2(data.digest, data.salt, data.iter, data.keylen / 2, data.algorithm, (err, key) => {
      $scope.loading = false;
      if (err) throw err;
      $scope.encoded = key.toString(data.digest);
      var end = performance.now();
      $scope.time = end - start;
      $scope.$apply();
    });
  }

  function setProcessing(value) {
    $scope.isProcessing = value;
  }

  function getHashes () {
    var hashAlgorithms = crypto.getHashes();
    var validHashes = [];
    for (var i = 0; i < hashAlgorithms.length; i++) {
      try {
        var encrypted = crypto.createHash(hashAlgorithms[i]).update("data.string a string very long long long long", 'utf8').digest('base64');
        if (encrypted) {
          validHashes.push(hashAlgorithms[i]);
        };
      }catch(err) {}
    };
    return validHashes;
  }

  function getCiphers () {
    var cipherAlgorithms = crypto.getCiphers();
    var validCiphers = [];
    for (var i = 0; i < cipherAlgorithms.length; i++) {
      try {
        var encrypted = crypto.createCipher(cipherAlgorithms[i], 'a password').update("data.string a string", 'utf8', 'hex');
        if (encrypted) {
          validCiphers.push(cipherAlgorithms[i]);
        };
      } catch(err) {}
    };
    return validCiphers;
  }
});