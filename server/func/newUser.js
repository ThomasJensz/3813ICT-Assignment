const fs = require('fs');

module.exports = function(req, res) {
    let newUser = { 
        "id": req.body.id,
        "username": req.body.username,
        "email": req.body.email,
        "role": req.body.role
      };
    let userArray = [];
    let oldData = fs.readFileSync('../assets/data/users.json');
    userArray = JSON.parse(oldData);
    userArray.push(newUser);
    userJSON = JSON.stringify(userArray, null, 2);
    fs.writeFileSync('../assets/data/users.json', userJSON);
    res.send(userArray);
}

