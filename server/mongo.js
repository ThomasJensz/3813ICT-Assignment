const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'mydb';
const colName = "products";
const client = new MongoClient(url);
funAdd = require('./add');
funRemove = require('./remove');
funUpdate = require('./update');
funRead = require('./read');

client.connect(function(err) {
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection(colName);
    funAdd(client, collection);
    client.close;
});