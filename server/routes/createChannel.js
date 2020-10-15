module.exports = function(app, db) {

    app.post('/api/createChannel', (req, res) => {

        if (!req.body) {
            return res.sendStatus(400);
        }
        //Seperate object into variables
        statement = req.body.statement;
        parent = req.body.parent;
        const collection = db.collection('groups');
        //Find matching group name, push new channel into array of that group
        collection.update({'name':parent},{$push:{'channels':statement}},(err,docs) => {
            collection.find({}).toArray((err,data)=>{
                res.send(data);
            })
        });
    });
}