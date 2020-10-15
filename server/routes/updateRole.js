module.exports = function(app,db,ObjectID){

    app.post('/api/updateRole', (req,res) => {
        if (!req.body) {
            return res.sendStatus(400);
        }
        //Seperate object into varables
        userID = req.body.id;
        role = req.body.role;
        //Convert regular id value into ObjectID
        var objectID = new ObjectID(userID);
        const collection = db.collection('users');
        //Using ObjectID, find mathcing user, set role attribute to new value
        collection.updateOne({'_id':objectID},{$set:{'role':role}},(err,docs)=>{
            collection.find({}).toArray((err,data)=>{
                res.send(data);
            })
        })
    })
}