Template.askForm.onRendered(function () {

    //default is no attachment
	file = false;
	
	$('#askFormContent').validate({
		submitHandler: function(event){
			var numOfUndoneRequests = requests.find ({"$or":[{"stage": 1}, {"stage": 0}]}).count();
			if(numOfUndoneRequests > 3) {
				$('#tooMuchRequestAlert').show();
			} else {
				if (file) {
					attachments.insert(file[0], function (err, fileObj) {
						if (err){
							console.log(err);
						} else {
							addRequest(fileObj._id);
						}
					});
				} else {
					addRequest();
				}
			}
		}
	});

});

Template.askForm.events({

	'click #close': function(event) {
		event.preventDefault();
	},

	'change #fileInput': function(event, template) {
		//Session.set('file', event.target.files);
		file = event.target.files;
		console.log("files got");
	},

	'click #submit': function(event, template) {
		event.preventDefault();
		$('#askFormContent').submit();

	},
	
});


function addRequest(attachmentId){

	var email = $('#userEmail').val();
	var service = $('#service').val();
	var content = $('#userContent').val().replace(/<br\s*\/?>/mg,"\n");
	var userId = Meteor.userId();
	Session.set('askerName', Meteor.user().profile.name)
	var attachmentId = attachmentId;
	var attachmentURL = "/cfs/files/attachments/" + attachmentId;
	var finalDocNote = "";
	var finalDocURL = "";
	var stage = 0; // 0 = not started , 1 = in proccess, 2 = done

	requests.insert({
		time: new Date(),
		email: email,
		service: service,
		content: content,
		userId: userId,
		userName: Session.get('askerName'),
		attachmentId: attachmentId,
		attachmentURL: attachmentURL, 
		finalDocNote: finalDocNote,
		finalDocURL: finalDocURL,
		stage: stage
	}, function(err, result){
		if (err){
			console.log(err);
		} else {
			//resetting key fields
			$("#content").val("");
			file = false;
			$('#askForm').collapse('hide');
			Meteor.call('sendEmail', "yehchuonglong@hotmail.com", "有新的發問by" + Session.get('askerName'));




		}
	})
}



