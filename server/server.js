const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require("body-parser");
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const ObjectID = require('mongodb').ObjectID;

const io = require('socket.io')(http);
const sockets = require('./socket.js');
const server = require('./listen.js');

const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


client.connect(function(err) {
    console.log("Connected successfully to server");
    const dbName = 'database';
    const colName = "users";
    const db = client.db(dbName);
    const collection = db.collection(colName);
    require('./routes/addUser.js')(app, db);
    require('./routes/getUsers.js')(app, db);
    require('./routes/deleteUser.js')(app, db, ObjectID);
    require('./routes/updateRole.js')(app, db, ObjectID);
    require('./routes/getGroups.js')(app, db);
    require('./routes/createGroup.js')(app, db);
    require('./routes/createChannel.js')(app, db);
    require('./routes/addGUser.js')(app,db);
    require('./routes/deleteGUser.js')(app,db);
    require('./routes/addCUser.js')(app,db);
    require('./routes/deleteCUser.js')(app,db);
    client.close;
    
});

sockets.connect(io,PORT);

server.listen(http,PORT);