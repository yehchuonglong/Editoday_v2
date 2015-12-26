attachments.allow({

  insert: function (userId, attachment) {
    if (userId) {
      return true;
    } else {
      return false;
    }
  },

  download: function(userId, fileObj) {
    if (userId) {
      return true;
    } else {
      return true;
    }
  }

});

requests.allow({

  insert: function (userId, request) {
    return request.userId === userId;
  },

  remove: function (userId, request) {
    return request.userId === userId;
  },

  update: function (userId, request, fields, modifier) {
    var isAdmin = admins.find({userId: userId});
    if (isAdmin) {
      return true;
    } else {
      return false;
    }
  }

});

chats.allow({

  insert: function (userId, chat) {
    var isAdmin = admins.find({userId: userId});

    if (isAdmin) {
      return true;
    };

    if (chat.userId === userId) {
      return true;
    };

    return false;
  }

});