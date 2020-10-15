#3813ICT Documentation
##Git
GitHub was used for version control throughout the development of this project, storing versions remotely for backup and for assessment when complete. Commitments were made when multiple related functions were completed and without any major errors that influenced the performance of other previously completed features. There was no use of branching, all commitments were made to the master branch.
The contents of the repository include the angular project for the client-side application, two package.jsons for managing the server-side and client-side app dependencies, and of course all the files and scripts that make up both apps. Like all GitHub repo’s there is also a .git folder for managing version control data and a ReadMe file that contains relevant project information for developers and assessors.
##Data Structures
All data in the program is stored between two collections in MongoDB, named users and groups. 
Users is an array of ‘user’ objects, each object containing the id, name, email, password and role of an individual user. All attributes are string values. Below is an example of what the contents of this collection could be.
[
{id:"001", username:"Superman", password:"Hope", email: "1@email.com", role: "super"},
{id:"002", username: "Batman", password:"Justice", email: "2@email.com", role: "group"},
{id:"003", username: "Joker", password:"Bats", email: "3@email.com", role: "assis"}
]
The Groups collection is much more complicated since it has several layers of nested objects and arrays to stores all information about all groups and their respective channels. At the first layer is an array of Group objects, each object having the attribute of name, users and channels for a group. While name is just a string value, users is an array of strings, and channels is an array of Channel objects. Each channel object contains a name and users attribute, again name is just a string value and users is an array of strings. Below is an example of what the contents of this collection could be.

[
{name:"Heroes",
users: ["Superman","Batman", "Robin", "Nightwing"],
channels: [
{name: "Main Heroes", users: ["Superman", "Batman"]},
{name: "Hero Sidekicks", users: ["Robin", "Nightwing"]}
]},
##REST API
The main server.js file that creates instances of all required module imports (express, cors, body-parser, mongoclient, etc) contains 11 route requirements each with parameters that import the aforementioned instances required for their function. The two main ones are ‘app’ which represents the express server and db which represents the databases connected to the mongoclient. Object ID format is also used for some routes to determine which object within the databases is to be updated or deleted.
require('./routes/addUser.js')(app, db);
This route inputs an object representing a user with a name, id, password, etc attributes. Id is used to determine if any existing users already use that number, if not, a new user is inserted into the User collection. If there is a duplicate already, nothing is inserted. The new updated list of users is returned.
require('./routes/getUsers.js')(app, db);
This is a simple get request with no input parameters, a find with no query conditions is made on the Users collection to get all stored users. This list is retuned in array from.
require('./routes/deleteUser.js')(app, db, ObjectID);
An id value is inputted and converted to ObjectID format, this new id value can now be used to compare against mongo’s own _id values. The lone object in the Users collection with the matching _id value is removed. Updated list of users is returned in array form.
    require('./routes/updateRole.js')(app, db, ObjectID);
ObjectID is used again to identify the right object, this time we also have an input parameter with the new role to replace the old role at the location specified by the id. Updated array of users is returned. 
    require('./routes/getGroups.js')(app, db);
A simple get request with no input parameters, a find with no query conditions is made to get all groups in an array and returned.
    require('./routes/createGroup.js')(app, db);
The input parameter is a group object, structured exactly to match the structure of the MongoDB collection, so that it can be inserted seamlessly without compromising the entire collection. This object is inserted at the end. Updated array of groups is returned
    require('./routes/createChannel.js')(app, db);
Similar to the last route, this input parameter is structured exactly to fit in with the other channels in the Groups collection. This is more complex however since channels are nested within the group objects. $push is used to update the array within the channels attribute for right group which is queried using the name. Updated groups array is returned.
    require('./routes/addGUser.js')(app,db);
This is effectively the same logic as the last route, except using $push to update the array of users within the appropriate group. Input parameters include the group name and the username. Updated group array is returned.
    require('./routes/deleteGUser.js')(app,db);
The reverse of the previous route, using $pull to update the array of users with the appropriate group. Input parameters include the group name and the username. Updated group array is returned
    require('./routes/addCUser.js')(app,db);
Similar to addGUser except more complex since the user array being updated is doubly nested within the group objects and channel objects. In order to get the correct position, $ is used to represent the index found to match the previous query based on the group name and channel name. $push updates the array include the new name. Updated groups array is returned.
    require('./routes/deleteCUser.js')(app,db);
The reverse of the previous route, using $pull to remove the user matching the inputted name in the array that is doubly nested. $ is again used determine the correct index based on query made with group name and channel name. Updated groups array is returned.
##Angular Architecture
###Components
App - The main application component stores the HTML and logic for the navbar that is present on all webpages, that is used to navigate the website and logout if need be, which is the only function it has, that resets all user related information when executed.
Login – Contains a form to enter user credentials, the main function of this component assesses the username and password against the database users, which is fetched upon initialisation. If successful, the user is logged in and all appropriate groups, channels and admin privileges are given. If not successful, the user will be prompted to try again.
Dashboard – This is populated by all groups and channels that the user is a part of, using group data which is fetched upon initialisation. The primary function of this function iterates through all the group data checking for matches, returning them in the form of separate divisions for groups and channels in drop-boxes.
Chat – Upon initialisation, the user is joined to the appropriate channel based on their selection on the dashboard. User can enter messages which is seen by any other user who is also a part of the room. The user can leave the room via the leave room button. Messages are received via subscription to socketService.onMessage().
Super – This is a page containing forms for all Super Admin tasks, including creating new users, deleting users, and changing roles of existing users. This component uses the UserService to communicate to the server for getting and updating user data in the User collection in MongoDB.
Group – This is a page containing forms for all Group Admin tasks, including creating new groups, create new channels, updating group users and updating channel users. This component achieves this via the GroupService which allows the fetching and updating of group/channel data in the Groups collection in MongoDB.
Assis – The final admin component, for the Assistant Admin tasks. Includes creating new channels for their groups, and updating users for those channels. This component also uses the GroupService to fetch and update group/channel data.
###Services
Socket – This is the means of communication with the server for all chat functionality. There is a function that initialises the client socket with the server, a function that sends messages, one that accepts messages with observables, one that joins the user to a room based on channel name, and another that leaves the room.
User – This is the means of communication with the MongoDB collection of users. One function adds a user, one returns all users, one deletes a user based on id value and one updates the role of a user based on id value and an inputted role value.
Groups -  This is the means of communication with the MongoDB collection of groups. One function returns all the groups, one create a new group with at least one channel and user, another creates a channel within an existing group with at least one user. Two functions for creating and deleting users of groups and another two functions for creating and deleting channel users.
###Models 
When passing data between functions and components frequently, its important to structure that data carefully so each link in the chain gets what its expecting. The only dedicated file for a model is the users.js file which defines the constructor of a user object with name, id, email, etc. All other objects are defined within the functions of various components. Given that most of the objects had only 2 or 3 attributes and were simple structures, defining them multiple times amongst the applications logic didn’t negatively impact development.
