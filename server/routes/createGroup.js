module.exports = function(app, db) {

    app.post('/api/createGroup', (req, res) => {

        if (!req.body) {
            return res.sendStatus(400);
        }

        group = req.body;
        const collection = db.collection('groups');
        //Insert group object onto the end of Group collection
        collection.insertOne(group,(err,dbres) => {
            collection.find({}).toArray((err,data)=>{
                //Return updated groups
                res.send(data);
            })
        });
    });
}