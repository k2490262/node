module.exports.insertMember = function(doc){
  const MongoClient = require('mongodb').MongoClient;
    const assert = require('assert');

    // Connection URL
    const url = 'mongodb://localhost:27017';

    // Database Name
    const dbName = 'bit';

    // Create a new MongoClient
    const client = new MongoClient(url);

    // Use connect method to connect to the Server
    client.connect(function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    const db = client.db(dbName);

    // Insert a single document
    db.collection('member').insertOne(doc, function(err, r) {
    //  assert.equal(null, err);
      //assert.equal(1, r.insertedCount);
      client.close();
    });
  });

}
