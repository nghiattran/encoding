'use strict';

var crypto = require('crypto');

angular.module('phonecatApp', []).controller('PhoneListCtrl', function ($scope) {

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
    $scope.encoded = crypto.createHash(data.algorithm).update(data.string).digest(data.digest);
  }

  function cipher (data) {
    var cipher = crypto.createCipher(data.algorithm, data.key);
    $scope.encoded = cipher.update(data.string, 'utf8', data.digest);
    $scope.encoded += cipher.final('hex');
  }

  function decipher (data) {
    var decipher = crypto.createDecipher(data.algorithm, data.key);
    $scope.encoded = decipher.update(data.string, data.digest, 'utf8');
    $scope.encoded += decipher.final('utf8');
  }

  function pbkdf2 (data) {
    const crypto = require('crypto');
    $scope.loading = true;
    crypto.pbkdf2(data.key, data.salt, data.iter, data.keylen, data.algorithm, (err, key) => {
      $scope.loading = false;
      if (err) throw err;
      $scope.encoded = key.toString(data.digest);
    });
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