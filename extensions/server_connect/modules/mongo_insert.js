exports.mongo_insert = async function (options, name) {
  var vars = this.parse(options.vars);
  console.log('vars', vars);
  let url = 'mongodb://127.0.0.1:27017/';
  if (options.conurl) {
    url = this.parse(options.conurl);
  }
  const dbName = this.parse(options.database);
  const collection = this.parse(options.collection);
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true });
    db = client.db(dbName);
    let dCollection = db.collection(collection);
    result = await dCollection.insertOne(vars);
    return result.ops[0];
  }
  catch (err) { console.error(err); } // catch any mongo error
  finally { client.close(); } // Close the connection
};