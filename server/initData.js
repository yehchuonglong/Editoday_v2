Meteor.startup(function () {

    //init the owner of the site as the first admin
	if (admins.find().count() === 0) {
		var isOwner = Meteor.users.findOne({"services.facebook.email": "yehchuonglong@hotmail.com"});
		console.log(isOwner);
		if(isOwner) {
			var userId = isOwner._id;
			admins.insert({userId: userId});
		}		
	}

});
