Meteor.publish('userInfo', function(){
	var currentUserId = this.userId;
	return Meteor.users.find({_id: currentUserId});
});

Meteor.publish('allTokens', function(){
	return tokens.find({});
});

Meteor.publish('userToken', function(){
	var currentUserId = this.userId;
	return tokens.find({userId: currentUserId});
});

Meteor.publish('allRequests', function(){
	return requests.find({});
});

Meteor.publish('userRequests', function(){
	var currentUserId = this.userId;
	return requests.find({userId: currentUserId});
});

Meteor.publish('userChats', function(requestId){
	return chats.find({requestId: requestId});
});

Meteor.publish('allAttachments', function(){
	return attachments.find({}); 
});

Meteor.publish('admins', function(){
	return admins.find({}); 
});