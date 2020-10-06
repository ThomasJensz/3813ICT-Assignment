# 3813ICT-Assignment

## Git Organisation and Use

During development of the system, commitments were made after significant implementations of similar functions (i.e. Fetching current user name, fitering group/channel datasets with username, prodcuing those results in HTML would all be related to the main 'Dashboard' so it would be in one commit). Theses commitments served as a backup should the local copy of the project become corrupted or deleted.

All commits were made to one Master branch; multiple branches couldve been used but Angular is already very modularby nature and so any conflicts could usually be resolved in the editor.

## Data Strcutures

Only two files were needed to devlelop sufficient data strucures for the project. Users.json and Groups.json which were housed server-side. Users is simply a collection of objects with the properties, ID, Name, Email and Role. The Groups file is more complicated however since it contatins group information, channel informationa and which users belong to each. Each group object has has id, name, an array of users and an array of channels. Each channel object nested in these groups has an id, name, and an array of users.

## Angular Architecture

Components largely represented each type of page on the system alongside all its associated variables and functions require to fulfill that pages role. List of Components:

### Login Component
Is the first page the user sees, has simple form that allows a username, username is checked against users.JSON with HttpClient Get. User is moved to dashboard is succesful

### Dashboard Component
List all the groups and channels that the user belongs to, each channel listing provides a link to the chat page for that channel.

### Chat Component
Has an input for new messages and listing of messages made to that channel. Whilst the chat works, it has yet to filter by channel so everyone on every channel sees the same thing at this stage.

### Super Component
Contains forms and functions for all Super Admin exclusive abilties.

### Group Admin Component
Contains forms and fucnctions for all Group Admin abilties, Super Admins can also access.

### Assis Group Admin Component
Contains forms and functions for all Assis group abilties, all admins can access this.

### Server Architecture
Only one service is in use at this stage, and that is the socket service that facilitates chat functionality.

### Routes
root path or '' sends the login component to the router outlet.
The path 'dashboard' sends the dashboard component to the router outlet.
The path 'chat/:name' sends the chat component to the router outet, with a name paramter to identify which channel to user with socket namespaces.
The path 'super'  send the super component to the router outlet.
the path 'group' sends the group component to the router outlet.
The path 'assis' sends the assis component to the router outlet.

### Models
The only there are 3 models which get their information from 2 files (users.json and groups.json).

User Object: ID(String), Name(String), Email(String), Role(String)
Group Object: ID(String), Name(String), Users(String)[Array]
Channel Object: ID(String), Name(String), Users(String)[Array]

## Client and Server Behaviour
The client and server mostly interact via the HTTPClient which provides the ability to read/write server-side files with GET/POST respectively. 

## Server Details
The server contains various Javascript files that handle the HTTPClient requests for each admin abiltiy.

