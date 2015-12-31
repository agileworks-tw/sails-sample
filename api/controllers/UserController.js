module.exports = {
  index: async(req, res) => {
    try {
      // let userLogin = await UserService.getLoginState(req);
      let loginedUser = await UserService.getLoginUser(req);
      let favorites;
      if(loginedUser){
        favorites = await UserService.getUserFavorites({userId:loginedUser.id});
      }
      res.view('main', {
        favorites: favorites
      });
    } catch (e) {
      res.serverError(e);
    }
  },

  find: async(req, res) => {
    try {
      let users = await UserService.findAll();
      res.ok({
        users
      });
    } catch (e) {
      res.serverError(e);
    }
  },

  updateHobbyAndMail: async(req, res) => {
    console.log("====updateHobbyAndMail===", req.body);
    try {
      let data = req.body;
      let user = AuthService.getLoginUser(req);

      if (data.email) {
        await UserService.updateUserMail({
          userId: user.id,
          userMail: data.email
        });
      }
      await UserService.updateUserLocation({
        userId: user.id,
        userLocation: data.location
      });
      await UserService.updateUserLike({
        userId: user.id,
        likeArray: data.hobby
      });
      res.ok('ok');
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  hobbyView: async(req, res) => {
    try {
      let isHasMail = req.query.hasMail;
      if (!isHasMail)
        res.redirect('/')

      let categorys = await PostService.getAllCategory();
      res.view('hobby', {
        isHasMail,
        categorys
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  addUserFavorite: async(req, res) => {
    try {
      sails.log.info("=== addUserFavorite ===", req.param('id'));
      let user = await UserService.getLoginUser(req);
      let data = {
        userId: user.id,
        postId: req.param('id')
      };
      let result = await UserService.addUserFavorite(data);
      res.ok(result);
    }catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  getUserFavorites: async(req, res) => {
    try {
      console.log("==== getUserFavorites ===");
      let user = await UserService.getLoginUser(req);
      let userFavorites = await UserService.getUserFavorites({userId: user.id});
      res.ok(userFavorites);
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  }
}
