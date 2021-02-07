// JavaScript Document
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
exports.mongo_delete = async function (options, name) {
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
    const inboundtype = this.parse(options.inboundtype);
    if (options.query) {
        const iq = this.parse(options.query);
        console.log('iq', iq);
        if (iq !== undefined) {
            if (inboundtype == 'Form') {
                q = JSON.parse(iq);
            } else {
                q = iq;
            }
            if (q._id) {
                q._id = ObjectID(q._id);
            }
            console.log('q', q);
        }
    }

    try {
        client = await MongoClient.connect(url, { useNewUrlParser: true });
        db = client.db(dbName);
        let dCollection = db.collection(collection);
        result = await dCollection.deleteOne(q);
        return result;
    }
    catch (err) { console.error(err); } // catch any mongo error
    finally { client.close(); } // Close the connection
};
