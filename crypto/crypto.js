const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const password = 'aSjlkvS89';
module.exports=function encrypt(text) {
    var cipher = crypto.createCipher(algorithm, password);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}