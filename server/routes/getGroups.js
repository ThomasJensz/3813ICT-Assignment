module.exports = function(app, db) {

    app.get('/api/getGroups', function(req, res){

        console.log("getGroups API called")
        
        const collection = db.collection('groups');
        //Find all data
        collection.find({}).toArray((err,data)=>{
            //Return
            res.send(data);
        })
    })
}