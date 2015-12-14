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

  updateUserItem: async({LikeId,ItemArray}) => {
    try {
      let user = await Item.findById(LikeId);
      let userLike = await user.setLikes(ItemArray);
      return userLike;
    } catch (e) {
      throw e;
    }
  },

  updateUserSearch: async({LikeId,userSearch}) => {
    try {
      let user = await Item.findById(LikeId);
      user.search = userSearch;
      user = await user.save();
      return user;
    } catch (e) {
      throw e;
    }
  }
}
