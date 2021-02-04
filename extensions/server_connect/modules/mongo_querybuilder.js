// JavaScript Document
MongoClient = require('mongodb').MongoClient;
ObjectID = require('mongodb').ObjectID;
assert = require('assert');
exports.mongo_querybuilder = async function (options, name) {
    let retq;
    const useAnd = { $and: [] };
    const useNot = { $not: [] };
    const useNor = { $nor: [] };
    const useOr = { $or: [] };
    const vars = Object.entries(options.vars)
    for (const [vk, vv] of vars) {
        var key = vk;
        var val = this.parse(vv);
        var newrow = {}
        newrow[key] = val
        console.log(newrow);
        if (options.qtype == 'and') {
            useAnd['$and'].push(newrow);
            retq = useAnd;
        }
        if (options.qtype == 'not') {
            useNot['$not'].push(newrow);
            retq = useNot;
        }
        if (options.qtype == 'nor') {
            useNor['$nor'].push(newrow);
            retq = useNor;
        }
        if (options.qtype == 'or') {
            useOr['$or'].push(newrow);
            retq = useOr;
        }

    }
    return retq

};
// db.getCollection("contacts").find({ $and : [{"name" : /.*ACME.*/i}, {"client" : true}] })

