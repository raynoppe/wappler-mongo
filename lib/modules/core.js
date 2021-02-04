const fs = require('fs-extra');
const { clone } = require('../core/util');

module.exports = {

    wait: function(options) {
        let delay = this.parseOptional(options.delay, 'number', 0);
        return new Promise(resolve => setTimeout(resolve, delay))
    },

    log: function(options) {
        let message = this.parse(options.message);
        console.log(message);
        return message;
    },

    repeat: async function(options) {
        let repeater = this.parse(options.repeat);
        let index = 0, data = [], parentData = this.data;

        switch (typeof repeater) {
            case 'boolean':
                repeater = repeater ? [0] : [];
                break;
            
            case 'string':
                repeater = repeater.split(',');
                break;

            case 'number':
                repeater = (n => {
                    let a = [], i = 0;
                    while (i < n) a.push(i++);
                    return a;
                })(repeater);
                break;
        }

        if (!(Array.isArray(repeater) || repeater instanceof Object)) {
            throw new Error('Repeater data is not an array or object');
        }

        for (let key in repeater) {
            if (repeater.hasOwnProperty(key)) {
                let scope = {};
                this.data = {};

                if (repeater[key] instanceof Object) {
                    for (var prop in repeater[key]) {
                        if (repeater[key].hasOwnProperty(prop)) {
                            scope[prop] = repeater[key][prop];

                            if (options.outputFields && options.outputFields.includes(prop)) {
                                this.data[prop] = repeater[key][prop];
                            }
                        }
                    }
                }

                scope.$key = key;
                scope.$name = key;
                scope.$value = clone(repeater[key]);
                scope.$index = index;
                scope.$number = index + 1;
                scope.$oddeven = index % 2;

                if (repeater[key] == null) {
                    repeater[key] = {};
                }

                this.scope = this.scope.create(scope, clone(repeater[key]));
                await this.exec(options.exec, true);
                this.scope = this.scope.parent;

                data.push({ ...this.data });

                index++;
            }
        }

        this.data = parentData;

        return data;
    },

    while: async function(options) {
        while (this.parse(options.while)) {
            await this.exec(options.exec, true);
        }
    },
    
    condition: async function(options) {
        let condition = this.parse(options.if);
        
        if (!!condition) {
            if (options.then) {
                await this.exec(options.then, true);
            }
        } else if (options.else) {
            await this.exec(options.else, true);
        }
    },

    setvalue: function(options) {
        let key = this.parseOptional(options.key, 'string', '');
        let value = this.parse(options.value);
        if (key) this.set(key, value);
        return value;
    },

    setsession: function(options, name) {
        let value = this.parse(options.value);
        this.req.session[name] = value;
        return value;
    },

    removesession: function(options, name) {
        delete this.req.session[name];
    },

    setcookie: function(options, name) {
        this.setcookie(name, options);
    },

    removecookie: function(options, name) {
        this.removecookie(name, options);
    },

    response: function(options) {
        let data = this.parseOptional(options.data, '*', null);
        let status = this.parseOptional(options.status, 'number', 200);
        let contentType = this.parseOptional(options.contentType, 'string', 'application/json');
        if (contentType != 'application/json') {
            this.res.set('Content-Type', contentType);
            this.res.status(status).send(data);
        } else {
            this.res.status(status).json(data);
        }
    },

    error: function(options) {
        let message = this.parseRequired(options.message, 'string', 'core.error: message is required.');
        throw new Error(message);
    },

    redirect: function(options) {
        this.res.redirect(this.parse(options.url));
    },

    trycatch: async function(options) {
        try {
            await this.exec(options.try, true);
        } catch (error) {
            this.scope.set('$_ERROR', error.message || error);
            this.error = false;
            if (options.catch) {
                await this.exec(options.catch, true);
            }
        }
    },

    exec: async function(options) {
        var data = {};

        if (options.exec && fs.existsSync(`app/modules/lib/${options.exec}.json`)) {
            let parentData = this.data;
            this.data = {};
            this.scope = this.scope.create({ $_PARAM: this.parse(options.params) });
            await this.exec(await fs.readJSON(`app/modules/lib/${options.exec}.json`), true);
            data = this.data;
            this.scope = this.scope.parent;
            this.data = parentData;
        } else {
            throw new Error(`There is no action called '${options.exec}' found in the library.`);
        }

        return data;
    },

};