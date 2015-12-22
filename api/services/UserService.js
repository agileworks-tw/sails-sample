module.exports = {
  findAll: async () => {
    try {
      return await User.findAll();
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
      let user = await User.findById(userId);
      let userLike = await user.setLikes(likeArray);
      user.isFirstLogin = false;
      await user.save();
      return userLike;
    } catch (e) {
      throw e;
    }
  },

  updateUserMail: async({userId,userMail}) => {
    try {
      sails.log.info(userId,userMail);
      let user = await User.findById(userId);
      user.email = userMail;
      user = await user.save();
      return user;
    } catch (e) {
      throw e;
    }
  },

  addUserFavorite: async({userId,postId}) => {
    try {
      sails.log.info(userId,postId);
      let user = await User.findById(userId);
      let favorites =  await user.addPost(postId);
      return favorites;
    } catch (e) {
      throw e;
    }
  },

  getUserFavorite: async({userId}) => {
    try {
      sails.log.info(userId);
      let user = await User.findById(userId);
      let favoritePost = await user.getPosts();
      return favoritePost;
    } catch (e) {
      throw e;
    }
  },
}
