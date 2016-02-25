'use strict';
var crypto = require('../crypto');

module.exports = class controler {
  constructor() {
    var hashAlgorithms = this.getHashes();
    var cipherAlgorithms = this.getCiphers();

    this.encodingTypes = [
      'hex',
      'base64'];

    this.algorithms = {
      hash: hashAlgorithms,
      cipher: cipherAlgorithms,
      decipher: cipherAlgorithms,
      pbkdf2: hashAlgorithms
    }
  }

  encrypt (data) {
    if (data.type === 'hash') {
      this.hash(data);
    } else if (data.type === 'cipher') {
      this.cipher(data);
    } else if (data.type === 'decipher') {
      this.decipher(data);
    }  else if (data.type === 'pbkdf2') {
      this.pbkdf2(data);
    }
  }

  hash (data) {
    this.encoded = crypto.createHash(data.algorithm).update(data.string).digest(data.digest);
  }

  cipher (data) {
    var cipher = crypto.createCipher(data.algorithm, data.key);
    this.encoded = cipher.update(data.string, 'utf8', data.digest);
    this.encoded += cipher.final('hex');
  }

  decipher (data) {
    var decipher = crypto.createDecipher(data.algorithm, data.key);
    this.encoded = decipher.update(data.string, data.digest, 'utf8');
    this.encoded += decipher.final('utf8');
  }

  pbkdf2 (data) {
    this.loading = true;
    crypto.pbkdf2(data.key, data.salt, data.iter, data.keylen, data.algorithm, (err, key) => {
      this.loading = false;
      if (err) throw err;
      this.encoded = key.toString(data.digest);
    });
  }


  /**
   * Get all hash algorithms supported by browser
   */
  getHashes () {
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

  /**
   * Get all cipher algorithms supported by browser
   */
  getCiphers () {
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
}