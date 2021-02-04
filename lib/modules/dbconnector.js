const db = require('../core/db');
const debug = require('debug')('server-connect:db');

module.exports = {

    connect: function(options, name) {
        if (!name) throw new Error('dbconnector.connect has no name.');
        this.setDbConnection(name, options);
    },

    select: async function(options) {
        const connection = this.parseRequired(options.connection, 'string', 'dbconnector.select: connection is required.');
        const sql = this.parseSQL(options.sql);
        const db = this.getDbConnection(connection);

        if (!db) throw new Error(`Connection "${connection}" doesn't exist.`);
        if (!sql) throw new Error('dbconnector.select: sql is required.');
        if (!sql.table) throw new Error('dbconnector.select: sql.table is required.');
        if (typeof sql.sort != 'string') sql.sort = this.parseOptional('{{ $_GET.sort }}', 'string', null);
        if (typeof sql.dir != 'string') sql.dir = this.parseOptional('{{ $_GET.dir }}', 'string', 'asc');

        if (sql.sort && sql.columns) {
            if (!sql.orders) sql.orders = [];

            for (let column of sql.columns) {
                if (column.column == sql.sort || column.alias == sql.sort) {
                    let order = {
                        column: column.alias || column.column,
                        direction: sql.dir.toLowerCase() == 'desc' ? 'desc' : 'asc'
                    };

                    if (column.table) order.table = column.table;

                    sql.orders.unshift(order);

                    break;
                }
            }
        }

        sql.type = 'select';

        if (options.test) {
            return {
                options: options,
                query: sql.toString()
            };
        }

        return db.fromJSON(sql);
    },

    count: async function(options) {
        const connection = this.parseRequired(options.connection, 'string', 'dbconnector.count: connection is required.');
        const sql = this.parseSQL(options.sql);
        const db = this.getDbConnection(connection);

        if (!db) throw new Error(`Connection "${connection}" doesn't exist.`);
        if (!sql) throw new Error('dbconnector.count: sql is required.');
        if (!sql.table) throw new Error('dbconnector.count: sql.table is required.');

        sql.type = 'count';

        if (options.test) {
            return {
                options: options,
                query: sql.toString()
            };
        }

        return (await db.fromJSON(sql)).Total;
    },

    single: async function(options) {
        const connection = this.parseRequired(options.connection, 'string', 'dbconnector.single: connection is required.');
        const sql = this.parseSQL(options.sql);
        const db = this.getDbConnection(connection);

        if (!db) throw new Error(`Connection "${connection}" doesn't exist.`);
        if (!sql) throw new Error('dbconnector.single: sql is required.');
        if (!sql.table) throw new Error('dbconnector.single: sql.table is required.');
        if (typeof sql.sort != 'string') sql.sort = this.parseOptional('{{ $_GET.sort }}', 'string', null);
        if (typeof sql.dir != 'string') sql.dir = this.parseOptional('{{ $_GET.dir }}', 'string', 'asc');

        sql.type = 'first';

        if (options.test) {
            return {
                options: options,
                query: sql.toString()
            };
        }

        return db.fromJSON(sql) || null;
    },

    paged: async function(options) {
        const connection = this.parseRequired(options.connection, 'string', 'dbconnector.paged: connection is required.');
        const sql = this.parseSQL(options.sql);
        const db = this.getDbConnection(connection);

        if (!db) throw new Error(`Connection "${connection}" doesn't exist.`);
        if (!sql) throw new Error('dbconnector.paged: sql is required.');
        if (!sql.table) throw new Error('dbconnector.paged: sql.table is required.');
        if (typeof sql.offset != 'number') sql.offset = Number(this.parseOptional('{{ $_GET.offset }}', '*', 0));
        if (typeof sql.limit != 'number') sql.limit = Number(this.parseOptional('{{ $_GET.limit }}', '*', 25));
        if (typeof sql.sort != 'string') sql.sort = this.parseOptional('{{ $_GET.sort }}', 'string', null);
        if (typeof sql.dir != 'string') sql.dir = this.parseOptional('{{ $_GET.dir }}', 'string', 'asc');

        if (sql.sort && sql.columns) {
            if (!sql.orders) sql.orders = [];

            for (let column of sql.columns) {
                if (column.column == sql.sort || column.alias == sql.sort) {
                    let order = {
                        column: column.alias || column.column,
                        direction: sql.dir.toLowerCase() == 'desc' ? 'desc' : 'asc'
                    };

                    if (column.table) order.table = column.table;

                    sql.orders.unshift(order);
                    
                    break;
                }
            }
        }

        sql.type = 'count';
        let total = +(await db.fromJSON(sql))['Total'];

        sql.type = 'select';
        let data = await db.fromJSON(sql);

        if (options.test) {
            return {
                options: options,
                query: sql.toString()
            };
        }
        return {
            offset: sql.offset,
            limit: sql.limit,
            total,
            page: {
                offset: {
                    first: 0,
                    prev: sql.offset - sql.limit > 0 ? sql.offset - sql.limit : 0,
                    next: sql.offset + sql.limit < total ? sql.offset + sql.limit : sql.offset,
                    last: (Math.ceil(total / sql.limit) - 1) * sql.limit
                },
                current: Math.floor(sql.offset / sql.limit) + 1,
                total: Math.ceil(total / sql.limit)
            },
            data
        }
    },

};