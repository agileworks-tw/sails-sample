module.exports = {
  findAll: async () => {
    try {
      return await Item.findAll();
    } catch (e) {
      throw e;
    }
  },
  getLoginState: function(req) {
    if (req.session.authenticated) {
      return true;
    } else {
      return false;
    }
  },

  getLoginUser: function(req) {
    if (req.session.passport != undefined && req.session.passport.user) {
      return req.session.passport.user;
    } else {
      return null;
    }
  },

  updateUserLike: async({userId,likeArray}) => {
    try {
      let user = await Item.findById(userId);
      let userLike = await user.setLikes(likeArray);
      return userLike;
    } catch (e) {
      throw e;
    }
  },

  updateUserMail: async({userId,userMail}) => {
    try {
      let user = await User.findById(userId);
      user.email = userMail;
      user = await user.save();
      return user;
    } catch (e) {
      throw e;
    }
  }
}
