Template.jumbotron.onRendered(function () {

	$('#buyTokenForm').validate({
		submitHandler: function(event){

			var input = $('#amountAdd').val();
			var roundedAmount = Math.round(input);
			var amountStripe = Number(roundedAmount)*100;
			$('#amountAdd').val(roundedAmount);

			StripeCheckout.open({
				key: 'pk_test_oiyXL7H3QiScig33hX5ZFakZ',
				currency: 'usd',
				image: 'img/masmall.png',
				amount: amountStripe,
				name: '英文小意思',
				description: '加值' + roundedAmount + '美元',
				panelLabel: '加值',
				token: function(res) {
					Meteor.call('chargeCard', res.id, amountStripe);
					$('#amountAdd').val('');
				}
			});
		}

	});
});


Template.jumbotron.events({

	'click #logout': function(event) {
		Meteor.logout(function(err){
			if (err) {
				throw new Meteor.Error("Logout failed");
			}
		});
	},

	'click #buyToken': function(event) {
		event.preventDefault();
		$('#buyTokenForm').submit();
	}

});

Template.jumbotron.helpers({
	'greeting': function() {
		var isAdmin = admins.findOne({userId: Meteor.userId()});
		if(isAdmin) {
			return "管理員你好:)";
		} else {
			var name = Meteor.user().services.facebook.first_name;
			return "嗨" + name + ",歡迎使用英文小意思:)";
		}
	},

	'notAdmin': function() {
		var isAdmin = admins.findOne({userId: Meteor.userId()});
		if (isAdmin) {
			return false;
		} else {
			return true;
		}

	}

});