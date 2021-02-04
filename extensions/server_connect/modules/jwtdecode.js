var jwt = require('jsonwebtoken');
exports.jwtdecode = function (options) {
    var secret = this.parse(options.secret);
    var token = this.parse(options.token);
    console.log(token);
    var decoded = jwt.verify(token, secret);
    var retobj = {
        sub: decoded.sub,
        firstname: decoded.firstname,
        email: decoded.email,
        privs: decoded.privs,
    }
    return retobj;
};