module.exports = function(app,db,ObjectID){

    app.post('/api/updateRole', (req,res) => {
        if (!req.body) {
            return res.sendStatus(400);
        }
        userID = req.body.id;
        role = req.body.role;
        var objectID = new ObjectID(userID);
        const collection = db.collection('users');
        collection.updateOne({'_id':objectID},{$set:{'role':role}},(err,docs)=>{
            collection.find({}).toArray((err,data)=>{
                res.send(data);
            })
        })
    })
}