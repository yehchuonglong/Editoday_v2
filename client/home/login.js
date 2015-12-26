Template.login.events({
	'click #login': function(event) {
		Meteor.loginWithFacebook({}, function(err){
			if (err) {
				throw new Meteor.Error("Facebook login failed");
			}
		});
	}
});