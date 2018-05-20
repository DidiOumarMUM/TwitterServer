const mongoose = require('mongoose');
const moment = require('moment');
const crypto = require('crypto');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: { type: String, required: true, max: 100, index: true },
    last_name: { type: String, required: true, max: 100 },
    username: { type: String },
    password: { type: String },
   date_of_birth: { type: Date }
});

UserSchema.index({ first_name: 1, last_name: -1 });



/*UserSchema
    .virtual('name')
    .get(function () {
        return this.last_name + ', ' + this.first_name;
    });

UserSchema
    .virtual('detail_url')
    .get(function () {
        return '/users/detail/' + this._id;
    });
*/
/*
UserSchema
    .virtual('url')
    .get(function () {
        return '/users/' + this._id;
    });

UserSchema
    .virtual('date_of_birth_formatted')
    .get(function () {
        return moment(this.date_of_birth).utc().format('YYYY-MM-DD');
    });
*/

const algorithm = 'aes-256-ctr';
const password = 'aSjlkvS89';

function encrypt(text) {
    var cipher = crypto.createCipher(algorithm, password);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}
UserSchema.pre('save', function (next) {
    var pwd = this.password;
    console.log("hashing password: " + pwd);
    this.password = encrypt(pwd);
    next();
});

module.exports = mongoose.model('User', UserSchema);