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

  updateUserMail: async({userId,userMail,userLocation}) => {
    try {
      sails.log.info("updateUserMail(userId,userMail)=>",userId,userMail);
      let user = await User.findById(userId);
      user.email = userMail;
      user = await user.save();
      return user;
    } catch (e) {
      throw e;
    }
  },

  updateUserLocation: async({userId,userLocation}) => {
    try {
      sails.log.info("updateUserLocation(userId,userLocation)=>",userId,userLocation);
      let user = await User.findById(userId);
      user.latitude = userLocation.latitude;
      user.longitude = userLocation.longitude;
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

  getUserFavorites: async({userId}) => {
    try {
      sails.log.info("getUserFavorites:userId=>",userId);
      let user = await User.findById(userId);
      let favorites = await user.getPosts({
        include: [{
          model: Item,
          include: Like
        }, {
          model: User
        }],
        order: 'createdAt DESC'
      });
      console.log("favorites.length=>",favorites.length);
      if(favorites.length>0){
        favorites.forEach(function(fav){
          if(fav.images==null){
            fav.images = '/img/items/1.jpg';
          }
        });
        // console.log("favorites=>",favorites)
        console.log("favorites[0]=>",favorites[0]);
        // console.log("favorites[0].UserFavorite=>",favorites[0].UserFavorite)
        // console.log("favorites[0].User=>",favorites[0].User)
        // console.log("favorites[0].Item=>",favorites[0].Item)
      }
      return favorites;
    } catch (e) {
      throw e;
    }
  },
}
