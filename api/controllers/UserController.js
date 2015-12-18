module.exports = {
  index: async (req, res) => {
    try {
      let users = await UserService.findAll();
      sails.log.info('=== users ===', users);
      res.ok({users});
    } catch (e) {
      res.serverError(e);
    }
  },

  find: async (req, res) => {
    try {
      let users = await UserService.findAll();
      res.ok({users});
    } catch (e) {
      res.serverError(e);
    }
  },

  updateHobbyAndMail: async (req, res) => {
    try {
      console.log("====updateHobbyAndMail===",req.body);
      let data = req.body;
      let user = AuthService.getLoginUser(req);

      if( !data.hasOwnProperty('eamil') ){
        await UserService.updateUserMail({
          userId: user.id,
          userMail: data.email
        });
      }
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

  hobbyView: async (req, res) => {
    try {
      let isHasMail = req.query.hasMail;
      if(!isHasMail)
        res.redirect('/')

      console.log("!!")
      let categorys =  await PostService.getAllCategory();
      res.view('hobby',{
        isHasMail,
        categorys
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  }


}
