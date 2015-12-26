//user's requests
requests = new Mongo.Collection('requests');

//files corresponding with user requests
var fileStore = new FS.Store.GridFS('attachments');
attachments = new FS.Collection('attachments', {
	stores: [fileStore]
});

//conversations between the admin and the users
chats = new Mongo.Collection('chats');

//admins that will reply users' requests
admins = new Mongo.Collection('admins');

//tokens in USD
tokens = new Mongo.Collection('tokens');

//records of editing tokens
tokenLogs = new Mongo.Collection('tokenLogs');



