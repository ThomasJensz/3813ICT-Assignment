module.exports = function(app, db) {

    app.post('/api/createGroup', (req, res) => {

        if (!req.body) {
            return res.sendStatus(400);
        }

        group = req.body;
        const collection = db.collection('groups');
        collection.insertOne(group,(err,dbres) => {
            collection.find({}).toArray((err,data)=>{
                res.send(data);
            })
        });
    });
}