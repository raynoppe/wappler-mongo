// JavaScript Document
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
exports.mongo_delete = function (options, name) {
    console.log('options', options);
    var url = 'mongodb://127.0.0.1:27017/';
    if (options.conurl) {
        url = this.parse(options.conurl);
    }
    var dbName = this.parse(options.database);

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        var db = client.db(dbName);

        insertDocuments(db, function () {
            findDocuments(db, function () {
                client.close();
            });
        });
    });

    var client = MongoClient.connect(url);
    var mdb = client.db(dbName);
    var retObj = {
        client: client,
        mdb: mdb
    }
    // var postdata = '';
    return retObj;
};
