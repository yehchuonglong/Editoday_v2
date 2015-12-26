Template.panel.onRendered({

});

Template.panel.helpers({
	'requests': function () {
		Meteor.subscribe('userRequests');
		return requests.find({}, {sort: {time: -1}});
	},

	'stage': function () {
		if (this.stage == 0) {
			return "panel panel-danger";
		} else if (this.stage == 1) {
			return "panel panel-warning";
		} else {
			return "panel panel-success";
		}
	},

	'currentStageText': function () {
		if (this.stage == 0) {
			return "未處理";
		} else if (this.stage == 1) {
			return "處理中";
		} else {
			return "已完成";
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