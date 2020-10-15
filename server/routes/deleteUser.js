module.exports = function(app,db,ObjectID){

    app.post('/api/deleteUser', (req,res) => {
        if (!req.body) {
            return res.sendStatus(400);
        }
        userID = req.body;
        console.log(userID);
        //Convert regular id into ObjectID format
        var objectID = new ObjectID(userID);
        const collection = db.collection('users');
        //Using ObjectID, find matching user and delete
        collection.deleteOne({_id:objectID},(err,docs)=>{
            collection.find({}).toArray((err,data)=>{
                res.send(data);
            })
        })
    })
}