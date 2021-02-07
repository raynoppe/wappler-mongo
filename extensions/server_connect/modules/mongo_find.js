// JavaScript Document
MongoClient = require('mongodb').MongoClient;
ObjectID = require('mongodb').ObjectID;
assert = require('assert'); // .sha256('dev2021')
exports.mongo_find = async function (options, name) {
    let client, db, result;
    let q = {};
    let opts = {};
    let limit = 10;
    let skip = 0;
    let url = 'mongodb://127.0.0.1:27017/';
    if (options.conurl) {
        url = this.parse(options.conurl);
    }
    const dbName = this.parse(options.database);
    const collection = this.parse(options.collection);
    const pagination = this.parse(options.pagination);
    const inboundtype = this.parse(options.inboundtype);
    const qtype = this.parse(options.querytype);
    const encodepassfield = this.parse(options.encodepassfield);
    if (options.query) {
        const iq = this.parse(options.query);
        console.log('iq', iq);
        if (iq !== undefined) {
            console.log('iq', iq)
            if (inboundtype == 'Form') {
                q = JSON.parse(iq);
            } else {
                q = iq;
            }
            if (q._id) {
                q._id = ObjectID(q._id);
            }
            if (encodepassfield) {
                q.password = this.parse(options.newpass);
            }

            console.log('q', q)
        }
    }
    if (pagination == 'Yes') {
        limit = this.parse(options.limit);
        skip = this.parse(options.skip);
        opts = {
            limit: limit,
            skip: skip
        }
    }
    if (options.projection) {
        const ip = this.parse(options.projection);
        if (ip !== undefined) {
            p = JSON.parse(ip);
            opts.projection = p;
        }
    }
    try {
        client = await MongoClient.connect(url, { useNewUrlParser: true });
        db = client.db(dbName);
        let dCollection = db.collection(collection);
        if (qtype == 'find') {
            result = await dCollection.find(q, opts).toArray();
        }
        if (qtype == 'findOne') {
            result = await dCollection.findOne(q, opts);
        }
        if (qtype == 'count') {
            result = await dCollection.find(q, opts).count();
        }
        return result;
    }
    catch (err) { console.error(err); } // catch any mongo error
    finally { client.close(); } // Close the connection

};
