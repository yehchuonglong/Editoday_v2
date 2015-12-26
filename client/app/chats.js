Template.chats.onRendered(function () {

});

Template.chats.helpers({
	'chats':  function(){
		return chats.find({});
	},

	'setproperName': function(){
		var isAdmin = admins.findOne({userId: this.userId});
		if(isAdmin) {
			return "英文小意思: ";
		} else {
			return this.userName + ": ";
		}
	}
});

Template.chats.events({

	'click #ask': function() {
		event.preventDefault();

		Session.set('requestEmail', this.email);
		Session.set('clientName', this.userName);
		Session.set('userId', Meteor.userId());

		var content = $('#chatContent').val().replace(/<br\s*\/?>/mg,"\n");
		var userName = Meteor.user().profile.name;
		var requestId = this._id;

		chats.insert({
			time: new Date(),
			content: content,
			userName: Session.get('clientName'),
			userId: Session.get('userId'),
			requestId: requestId
		}, function(err, result){
			if (err){
				console.log(err);
			} else {
				var isAdmin = admins.findOne({userId: Session.get('userId')});
				if (isAdmin) {
					Meteor.call('sendEmail', Session.get('requestEmail'), "英文小意思傳來了一封新訊息" );
				} else {
					Meteor.call('sendEmail', "yehchuonglong@hotmail.com", Session.get('clientName') + "傳來了一封新訊息" );
				}
				
		}
	});

		$('#chatContent').val("");

	}	
});
