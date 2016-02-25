const crypto = require('crypto');

// const alice = crypto.createECDH('secp521r1');
// const alice_key = alice.generateKeys();

// const bob = crypto.createECDH('secp521r1');
// const bob_key = bob.generateKeys();

// const alice_secret = alice.computeSecret(bob_key);
// const bob_secret = bob.computeSecret(alice_key);

// console.log(alice_key)


// console.log(bob_key)

// console.log(alice_secret)

// console.log(bob_secret)
// 

// var encrypt = crypto.publicEncrypt(alice_key, buffer)
// var options = { key: alice_key};
// var encrypted = crypto.publicEncrypt(options, new Buffer('plaintext'));

// console.log(encrypted)

var alice = crypto.createDiffieHellman(11);
const alice_key = alice.generateKeys();
var publicKey = alice_key.getPublicKey('base64');
var privateKey = alice_key.getPrivateKey('base64');

console.log(publicKey)
console.log(privateKey)