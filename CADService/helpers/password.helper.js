var bcrypt = require('bcrypt');

function PasswordHelper() {
    this.HashPassword = function(password) {
        return bcrypt.hashSync(password, 10);
    }

    this.CheckHash = function(password, hash) {
        return bcrypt.compareSync(password, hash)
    }
}

module.exports = new PasswordHelper();