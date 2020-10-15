module.exports = function(app, db) {

    app.post('/api/createCUser', (req, res) => {

        if (!req.body) {
            return res.sendStatus(400);
        }
        user = req.body.user;
        group = req.body.group;
        channel = req.body.channel;

        const collection = db.collection('groups');
        collection.update({'name':group, 'channels.name': channel},{$push:{'channels.$.users':user}},(err,docs) => {
            collection.find({}).toArray((err,data)=>{
                res.send(data);
            })
        });
    });
}