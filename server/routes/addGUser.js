module.exports = function(app, db) {

    app.post('/api/createGUser', (req, res) => {

        if (!req.body) {
            return res.sendStatus(400);
        }
        //Seperate object into variables       
        user = req.body.user;
        parent = req.body.parent;
        const collection = db.collection('groups');
        //Find user within matching group name, push new user into array
        collection.update({'name':parent},{$push:{'users':user}},(err,docs) => {
            collection.find({}).toArray((err,data)=>{
                res.send(data);
            })
        });
    });
}