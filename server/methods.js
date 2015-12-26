Meteor.methods({

	'initUserToken': function() {
		var userId = this.userId;
		var hasToken = tokens.findOne({userId: userId});
		if(!hasToken) {
			tokens.insert({userId: userId, amount: 0});
		}
	},

	'chargeCard': function(stripeToken, amount) {

		check(stripeToken, String);
		var Stripe = StripeAPI('sk_test_QCUlGcYxa65KM5GFaezKdU8g');
		var userId = this.userId;

		Stripe.charges.create({
			source: stripeToken,
			amount: amount,
			currency: 'usd'
		}, Meteor.bindEnvironment(function (error, result) {
			if(error) {
				console.log(error);
			} else {
				var subStringRange = result.amount.toString().length - 2;
				var amount = Number(result.amount.toString().substring(0, subStringRange));
				console.log("amount is " + amount);
				tokens.update({userId: userId},{$inc: {amount: amount}});
			}
		}));

	},

	'spendToken': function(requestId, clientId, amount){
		var adminId = this.userId;
		var userName = Meteor.user().profile.name;
		var time = new Date();
		var amount = Number(amount);
		var minusAmount = amount * -1;

		tokens.update({userId: clientId},{$inc: {amount: minusAmount}});
		tokenLogs.insert({adminId: adminId, clientId: clientId, amountChanged: amount, type: "spend", time: time});
		chats.insert({time: time, content: "*系統從您的帳戶扣除了" + amount + "元(" + time + ")*", userName: userName, userId: adminId, requestId: requestId});
	},

	'refundToken': function(requestId, clientId, amount){
		var userName = Meteor.user().profile.name;
		var adminId = this.userId;
		var time = new Date();
		var amount = Number(amount);

		tokens.update({userId: clientId},{$inc: {amount: amount}});
		tokenLogs.insert({adminId: adminId, clientId: clientId, amountChanged: amount, type: "refund", time: time});
		chats.insert({time: time, content: "*系統加值了" + amount + "元到了您的帳戶(" + time + ")*", userName: userName, userId: adminId, requestId: requestId});
	},

	'changeRequestStage': function(requestId, stage) {
		requests.update(requestId, {$set: {stage: stage}});
	},

	'finishUpRequest': function(requestId, finalDocNote, finalDocId) {
		if(finalDocId){
			requests.update(requestId, {$set: {stage: "3", finalDocNote: finalDocNote, finalDocURL: "/cfs/files/attachments/" + finalDocId}});
		} else {
			requests.update(requestId, {$set: {stage: "3", finalDocNote: finalDocNote}});
		}
	},

	'sendEmail': function (clientEmail, text) {
		this.unblock();

		Email.send({
			to: clientEmail,
			from: "yehchuonglong@hotmail.com",
			subject: "英文小意思",
			text: text
		});
    },




});