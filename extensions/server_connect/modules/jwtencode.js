var jwt = require('jsonwebtoken');
exports.jwtset = function (options) {
    var secret = this.parse(options.secret);
    console.log('secret', secret);
    var payload = {
        sub: this.parse(options.sub).toString(),
        firstname: this.parse(options.firstname),
        email: this.parse(options.email),
        role: this.parse(options.privs),
    };
    console.log('payload', payload);
    token = jwt.sign(JSON.stringify(payload), secret);
    var retobj = {
        jwt: token,
        firstname: this.parse(options.firstname),
        email: this.parse(options.email),
        role: this.parse(options.role),
    }
    return retobj;
};