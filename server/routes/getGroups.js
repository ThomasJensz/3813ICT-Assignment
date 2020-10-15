module.exports = function(app, db) {

    app.get('/api/getGroups', function(req, res){

        console.log("getGroups API called")
        
        const collection = db.collection('groups');

        collection.find({}).toArray((err,data)=>{
            res.send(data);
        })
    })
}