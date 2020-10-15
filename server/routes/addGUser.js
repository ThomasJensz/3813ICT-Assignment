module.exports = function(app, db) {

    app.post('/api/createGUser', (req, res) => {

        if (!req.body) {
            return res.sendStatus(400);
        }

        user = req.body.user;
        parent = req.body.parent;
        const collection = db.collection('groups');
        collection.update({'name':parent},{$push:{'users':user}},(err,docs) => {
            collection.find({}).toArray((err,data)=>{
                res.send(data);
            })
        });
    });
}