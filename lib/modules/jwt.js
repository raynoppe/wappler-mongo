exports.sign = function(options, name) {
    return this.setJSONWebToken(name, options)
};