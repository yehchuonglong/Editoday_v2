Template.controlPanel.onRendered(function () {

	file = false;

	$('#adminForm').validate({
		submitHandler: function(event){
			Session.set('amount', $('#tokenAmount').val());
			$('#makeSureModal').modal('show');
		}
	});

});

Template.controlPanel.helpers({
	'chats': function(){
		return chats.find({});
	},

	'setRadio': function(){
		if(this.stage == 0) {
			$('#notStarted').prop('checked', true);

		} else if (this.stage == 1) {
			$('#inProcess').prop('checked', true);

		} else {
			$('#done').prop('checked', true);

		}

	},

	'isAdmin': function() {
		var isAdmin = admins.findOne({userId: Meteor.userId()});
		if(isAdmin) {
			return true;
		} else {
			return false;
		}
	},

	'makeSureMsg': function() {

		var action = Session.get('submitAction');
		var amount = Session.get('amount');
		var userName = this.userName;

		if(action == "refundToken"){
			return "指令: " + "加值" + amount + "元到" + userName + "的帳戶";
		}
		if(action == "spendToken"){
			return "指令: " + "從" + userName + "的帳號收取" + amount + "元";
		}
		return "系統錯誤";
	}


});

Template.controlPanel.events({

	'click #ask': function(event) {
		event.preventDefault();

		var content = $('#chatContent').val();
		var userName = Meteor.user().profile.name;
		var userId = Meteor.userId();
		var requestId = this._id;

		chats.insert({
			time: new Date(),
			content: content,
			userName: userName,
			userId: userId,
			requestId: requestId
		});

		$('#chatContent').val("");

	},

	'change #finalDoc': function(event, template) {
		file = event.target.files;
		console.log("files got");
	},

	'click #notStarted': function(event) {
		var requestId = this._id;
		var stage = $('#notStarted').val();
		Meteor.call("changeRequestStage", requestId, stage);
	},

	'click #inProcess': function(event) {
		var requestId = this._id;
		var stage = $('#inProcess').val();
		Meteor.call("changeRequestStage", requestId, stage);
	},

	'click #done': function(event) {
		Session.set('submitAction', "finishUpRequest");
		$('#finalizeModal').modal('show');
	},

	'click #refundToken': function(event) {
		event.preventDefault();
		Session.set('submitAction', "refundToken");
		$('#adminForm').submit();
	},

	'click #spendToken': function(event) {
		event.preventDefault();
		Session.set('submitAction', "spendToken");
		$('#adminForm').submit();
	},

	'click #doAction': function(event) {
		event.preventDefault();
		var action = Session.get('submitAction');

		if(action == "refundToken") {
			Meteor.call("refundToken", this._id, this.userId, $('#tokenAmount').val());
			$('#makeSureModal').modal('hide');
			$('#tokenAmount').val("");

		}
		if(action == "spendToken") {
			Meteor.call("spendToken", this._id, this.userId, $('#tokenAmount').val());
			$('#makeSureModal').modal('hide');
			$('#tokenAmount').val("");

		}
		if(action == "finishUpRequest") {
			Session.set('requestId', this._id);
			Session.set('requestEmail, this.email');
			if(file){
				attachments.insert(file[0], function (err, fileObj) {
					if (err){
						console.log(err);
					} else {
						var finalDocId = fileObj._id;
						var requestId = Session.get('requestId');
						var finalDocNote = $('#finalDocNote').val().replace(/<br\s*\/?>/mg,"\n");
						Meteor.call("finishUpRequest", requestId, finalDocNote, finalDocId);
						$('#finalizeModal').modal('hide');
					}
				});
			} else {
				var requestId = Session.get('requestId');
				var finalDocNote = $('#finalDocNote').val().replace(/<br\s*\/?>/mg,"\n");
				Meteor.call("finishUpRequest", requestId, finalDocNote);
				Meteor.call('sendEmail', Session.get('requestEmail'), "英文小意思傳來了一封新訊息" );
				$('#finalizeModal').modal('hide');

			}

		}
	}	




});
