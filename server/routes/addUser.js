module.exports = function(app, db) {

    app.post('/api/add', (req, res) => {

        if (!req.body) {
            return res.sendStatus(400);
        }

        user = req.body;
        const collection = db.collection('users');
        //Find how many users share this id number
        collection.find({'id':user.id}).count((err, count) => {
            if (count == 0){
                //If none, then add new User
                collection.insertOne(user,(err,dbres) => {
                    if (err) throw err;
                    let num = dbres.insertedCount;
                    res.send({'num':num,err:null});
                });
            } else {
                //If more than 0, send error
                res.send({num:0,err:"duplicate item"});
            }
        });
    });
}