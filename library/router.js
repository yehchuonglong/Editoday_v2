var appPageHook = function () {
	if (!Meteor.userId()) {
		Router.go('/home');
	} else {
		this.next();
	}
};

var homePageHook = function () {
	if (Meteor.userId()) {
		Router.go('/app');
	} else {
		this.next();
	}
};

Router.onBeforeAction(appPageHook, {
	only: ['app']
});

Router.onBeforeAction(homePageHook, {
	only: ['home']
});

Router.route('/', function(){	
	Router.go('/home');
});

Router.route('/home', function(){	
	this.layout('homeLayout');
	this.render('home');
});

Router.route('/app', function () {	

	this.wait(Meteor.call('initUserToken'));
	this.wait(Meteor.subscribe('userInfo'));
	this.wait(Meteor.subscribe('admins'));
	this.wait(Meteor.subscribe('userRequests'));
	this.wait(Meteor.subscribe('userToken'));

	if (this.ready()) {

		var userId = Meteor.userId();
		var isAdmin = admins.findOne({userId: userId});
		if (isAdmin) {
			Router.go('/admin');
		} else {
			this.layout('appLayout');
			this.render('app', {
				data: function () {
					return tokens.findOne({userId: userId});
				}
			});

		}

	} else {
		//this.render('loading');
	}

});

Router.route('/app/:userId/:requestId', function () {

	var requestId = this.params.requestId;

	this.wait(Meteor.subscribe('admins'));
	this.wait(Meteor.subscribe('allRequests'));
	this.wait(Meteor.subscribe('allAttachments'));
	this.wait(Meteor.subscribe('userChats', requestId));

	if (this.ready()) {

		var userId = Meteor.userId();
		var isAdmin = admins.findOne({userId: userId});

		if (isAdmin) {
			Router.go('/admin/' + userId + '/' + requestId);

		} else if (Meteor.userId() == userId) {
			this.layout('appLayout');
			this.render('request', {
				data: function () {
					return requests.findOne({_id: requestId});
				}
			});

		} else {
			Router.go('/app');
		}

	} else {
		//this.render('loading');
	}

});

Router.route('/admin', function () {

	this.wait(Meteor.subscribe('admins'));
	this.wait(Meteor.subscribe('allRequests'));

	if (this.ready()) {

		var userId = Meteor.userId();
		var isAdmin = admins.findOne({userId: userId});
		if (isAdmin) {
			this.layout('appLayout');
			this.render('admin');
		} else {
			Router.go('/app');
		}

	} else {
		//this.render('loading');
	}

});

Router.route('/admin/:userId/:requestId', function () {

	var requestId = this.params.requestId;

	this.wait(Meteor.subscribe('admins'));
	this.wait(Meteor.subscribe('allRequests'));
	this.wait(Meteor.subscribe('allTokens'));
	this.wait(Meteor.subscribe('allAttachments'));
	this.wait(Meteor.subscribe('userChats', requestId));

	if (this.ready()) {

		var userId = Meteor.userId();
		var isAdmin = admins.findOne({userId: userId});

		if (isAdmin) {
			this.layout('appLayout');
			this.render('request', {
				data: function () {
					return requests.findOne({_id: requestId});
				}
			});
		} else {
			Router.go('/app');
		}

	} else {
		//this.render('loading');
	}

});
