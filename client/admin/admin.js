Template.panel.onRendered({

});

Template.admin.helpers({
	'requests': function () {
		return requests.find({},{sort: {createdAt: -1}});
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
	'requestType': function () {
		if (this.service == 1) {
			return "英文校對";
		} else {
			return "中英翻譯";
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

	}
});