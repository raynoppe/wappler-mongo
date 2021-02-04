module.exports = {

    insert: async function(options) {
        const connection = this.parseRequired(options.connection, 'string', 'dbconnector.insert: connection is required.');
        const sql = this.parseSQL(options.sql);
        const db = this.getDbConnection(connection);

        if (!db) throw new Error(`Connection "${connection}" doesn't exist.`);
        if (!sql) throw new Error('dbconnector.insert: sql is required.');
        if (!sql.table) throw new Error('dbconnector.insert: sql.table is required.');

        sql.type = 'insert';

        if (options.test) {
            return {
                options: options,
                query: sql.toString()
            };
        }

        let identity = await db.fromJSON(sql);

        if (identity) {
            if (Array.isArray(identity)) {
                identity = identity[0];
            }
    
            if (typeof identity == 'object') {
                identity = identity[Object.keys(identity)[0]];
            }
        }

        return { affected: 1, identity };
    },

    update: async function(options) {
        const connection = this.parseRequired(options.connection, 'string', 'dbconnector.update: connection is required.');
        const sql = this.parseSQL(options.sql);
        const db = this.getDbConnection(connection);

        if (!db) throw new Error(`Connection "${connection}" doesn't exist.`);
        if (!sql) throw new Error('dbconnector.update: sql is required.');
        if (!sql.table) throw new Error('dbconnector.update: sql.table is required.');

        sql.type = 'update';

        if (options.test) {
            return {
                options: options,
                query: sql.toString()
            };
        }

        let affected = await db.fromJSON(sql);

        return { affected };
    },

    delete: async function(options) {
        const connection = this.parseRequired(options.connection, 'string', 'dbconnector.delete: connection is required.');
        const sql = this.parseSQL(options.sql);
        const db = this.getDbConnection(connection);

        if (!db) throw new Error(`Connection "${connection}" doesn't exist.`);
        if (!sql) throw new Error('dbconnector.delete: sql is required.');
        if (!sql.table) throw new Error('dbconnector.delete: sql.table is required.');

        sql.type = 'del';

        if (options.test) {
            return {
                options: options,
                query: sql.toString()
            };
        }

        let affected = await db.fromJSON(sql);

        return { affected };
    },

    custom: async function(options) {
        const connection = this.parseRequired(options.connection, 'string', 'dbupdater.custom: connection is required.');
        const sql = this.parseSQL(options.sql);
        const db = this.getDbConnection(connection);

        if (!db) throw new Error(`Connection "${connection}" doesn't exist.`);
        if (!sql) throw new Error('dbconnector.custom: sql is required.');
        if (typeof sql.query != 'string') throw new Error('dbupdater.custom: sql.query is required.');
        if (!Array.isArray(sql.params)) throw new Error('dbupdater.custom: sql.params is required.');

        const params = [];
        const query = sql.query.replace(/([:@][a-zA-Z_]\w*|\?)/g, param => {
            if (param == '?') {
                params.push(sql.params[params.length].value);
                return '?';
            }

            let p = sql.params.find(p => p.name == param);
            if (p) {
                params.push(p.value);
                return '?';
            }

            return param;
        });

        let results = await db.raw(query, params);

        if (db.client.config.client == 'mysql' || db.client.config.client == 'mysql2') {
            results = results[0];
        } else if (db.client.config.client == 'postgres' || db.client.config.client == 'redshift') {
            results = results.rows;
        }

        return results;
    },

    execute: async function(options) {
        const connection = this.parseRequired(options.connection, 'string', 'dbupdater.execute: connection is required.');
        const query = this.parseRequired(options.query, 'string', 'dbupdater.execute: query is required.');
        const params = this.parseOptional(options.params, 'object', []);
        const db = this.getDbConnection(connection);
        
        if (!db) throw new Error(`Connection "${connection}" doesn't exist.`);

        let results = await db.raw(query, params);

        if (db.client.config.client == 'mysql' || db.client.config.client == 'mysql2') {
            results = results[0];
        } else if (db.client.config.client == 'postgres' || db.client.config.client == 'redshift') {
            results = results.rows;
        }

        return results;
    },

};