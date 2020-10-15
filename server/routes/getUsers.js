module.exports = function(app, db) {

    app.get('/api/getUsers', function(req, res){

        console.log("getUser API called")
        
        const collection = db.collection('users');

        collection.find({}).toArray((err,data)=>{
            res.send(data);
        })
    })
}