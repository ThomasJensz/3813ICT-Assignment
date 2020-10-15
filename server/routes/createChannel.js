module.exports = function(app, db) {

    app.post('/api/createChannel', (req, res) => {

        if (!req.body) {
            return res.sendStatus(400);
        }

        statement = req.body.statement;
        parent = req.body.parent;
        const collection = db.collection('groups');
        collection.update({'name':parent},{$push:{'channels':statement}},(err,docs) => {
            collection.find({}).toArray((err,data)=>{
                res.send(data);
            })
        });
    });
}