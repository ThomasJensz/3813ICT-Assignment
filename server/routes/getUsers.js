module.exports = function(app, db) {

    app.get('/api/getUsers', function(req, res){

        console.log("getUser API called")
        
        const collection = db.collection('users');
        //Find all data
        collection.find({}).toArray((err,data)=>{
            //Return
            res.send(data);
        })
    })
}