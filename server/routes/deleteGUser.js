module.exports = function(app, db) {

    app.post('/api/deleteGUser', (req, res) => {

        if (!req.body) {
            return res.sendStatus(400);
        }

        user = req.body.user;
        parent = req.body.parent;
        const collection = db.collection('groups');
        collection.update({'name':parent},{$pull:{'users':user}},(err,docs) => {
            collection.find({}).toArray((err,data)=>{
                res.send(data);
            })
        });
    });
}