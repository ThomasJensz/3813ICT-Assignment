module.exports = function(app,db,ObjectID){

    app.post('/api/deleteUser', (req,res) => {
        if (!req.body) {
            return res.sendStatus(400);
        }
        userID = req.body;
        console.log(userID);
        var objectID = new ObjectID(userID);
        const collection = db.collection('users');
        collection.deleteOne({_id:objectID},(err,docs)=>{
            collection.find({}).toArray((err,data)=>{
                res.send(data);
            })
        })
    })
}