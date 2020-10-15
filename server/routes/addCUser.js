module.exports = function(app, db) {

    app.post('/api/createCUser', (req, res) => {

        if (!req.body) {
            return res.sendStatus(400);
        }
        //Seperate object into variables
        user = req.body.user;
        group = req.body.group;
        channel = req.body.channel;

        const collection = db.collection('groups');
        //Find user within matching channel and group, using channel index to push new user in 
        collection.update({'name':group, 'channels.name': channel},{$push:{'channels.$.users':user}},(err,docs) => {
            collection.find({}).toArray((err,data)=>{
                res.send(data);
            })
        });
    });
}