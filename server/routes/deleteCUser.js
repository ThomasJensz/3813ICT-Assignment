module.exports = function(app, db) {

    app.post('/api/deleteCUser', (req, res) => {

        if (!req.body) {
            return res.sendStatus(400);
        }
        //Seperate object into variables
        user = req.body.user;
        group = req.body.group;
        channel = req.body.channel;

        const collection = db.collection('groups');
        //Find user within mtaching group and channel names, pull from index defined by prior match
        collection.update({'name':group, 'channels.name': channel},{$pull:{'channels.$.users':user}},(err,docs) => {
            collection.find({}).toArray((err,data)=>{
                res.send(data);
            })
        });
    });
}