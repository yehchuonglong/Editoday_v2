Template.request.helpers({

	'isAdmin': function() {
		var isAdmin = admins.findOne({userId: Meteor.userId()});
		if(isAdmin) {
			return true;
		} else {
			return false;
		}
	},

	'hasAttachment': function () {
		var hasAttachment = this.attachmentId;
		if(hasAttachment) { 
			return true;
		} else {
			return false;
		}

	},

	'isDone': function () {
		if(this.finalDocNote) {
			return true;
		} else {
			return false;
		}
	},

	'link': function () {
		var isAdmin = admins.findOne({userId: Meteor.userId()});
		if(isAdmin) {
			return "/admin";
		} else {
			return "/app";
		}
	},

	'info': function () {
		var isAdmin = admins.findOne({userId: Meteor.userId()});
		var token = tokens.findOne({userId: this.userId});

		if (isAdmin) {
			return "用戶名: " + this.userName + ", " + "餘額: $" + token.amount;
		} else {
			if (this.stage == 0) {
				return "請稍等,我們會有專人跟您聯絡:)";
			} else if (this.stage == 1) {
				return "提問處理中,完成後我們會Email提醒您:)";
			} else {
				return "您的提問已經處理完成!";
			}
		}
	},

	'adminResize': function () {
		var isAdmin = admins.findOne({userId: Meteor.userId()});
		if(isAdmin) {
			return "col-md-8";
		} else {
			return "col-md-12";
		}
	},

	'currentStageColor': function () {

		var isAdmin = admins.findOne({userId: Meteor.userId()});
		if(isAdmin) {

			if (this.stage == 0) {
				return "panel panel-danger";
			} else if (this.stage == 1) {
				return "panel panel-warning";
			} else {
				return "panel panel-success";
			}

		} else {
			if (this.stage == 0) {
				return "panel panel-danger";
			} else if (this.stage == 1) {
				return "panel panel-warning";
			} else {
				return "panel panel-success";
			}
		}
	},

	'currentStageText': function () {

		var isAdmin = admins.findOne({userId: Meteor.userId()});
		if(isAdmin) {

			if (this.stage == 0) {
				return "未處理";
			} else if (this.stage == 1) {
				return "處理中";
			} else {
				return "已完成";
			}

		} else {
			if (this.stage == 0) {
				return "未處理";
			} else if (this.stage == 1) {
				return "處理中";
			} else {
				return "已完成";
			}
		}
	},

	'requestType': function () {
		if (this.service == 1) {
			return "英文校對";
		} else {
			return "中英翻譯";
		}

	}

});

Template.request.events({

});

