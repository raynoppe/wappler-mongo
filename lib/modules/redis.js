const client = global.redisClient;

if (client) {
    const { promisify } = require('util');
    const commands = {};

    ['append', 'decr', 'decrby', 'del', 'exists', 'get', 'getset', 'incr', 'incrby', 'mget', 'set', 'setex', 'setnx', 'strlen'].forEach(command => {
        commands[command] = promisify(client[command]).bind(client);
    });

    exports.append = function(options) {
        options = this.parse(options);
        return commands.append(options.key, options.value);
    };

    exports.decr = function(options) {
        options = this.parse(options);
        return commands.decr(options.key);
    };

    exports.decrby = function(options) {
        options = this.parse(options);
        return commands.decrby(options.key, options.decrement);
    };

    exports.del = function(options) {
        options = this.parse(options);
        return commands.del(options.key);
    };

    exports.exists = function(options) {
        options = this.parse(options);
        return commands.exists(options.key);
    };

    exports.get = function(options) {
        options = this.parse(options);
        return commands.get(options.key);
    };

    exports.getset = function(options) {
        options = this.parse(options);
        return commands.getset(options.key, options.value);
    };

    exports.incr = function(options) {
        options = this.parse(options);
        return commands.incr(options.key);
    };

    exports.incrby = function(options) {
        options = this.parse(options);
        return commands.incrby(options.key, options.increment);
    };

    exports.mget = function(options) {
        options = this.parse(options);
        return commands.mget(options.keys);
    };

    exports.set = function(options) {
        options = this.parse(options);
        return commands.set(options.key, options.value);
    };

    exports.setex = function(options) {
        options = this.parse(options);
        return commands.setex(options.key, options.seconds, options.value);
    };

    exports.setnx = function(options) {
        options = this.parse(options);
        return commands.setnx(options.key, options.value);
    };

    exports.strlen = function(options) {
        options = this.parse(options);
        return commands.strlen(options.key);
    };
}