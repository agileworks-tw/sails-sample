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
      // let users = await UserService.findAll();
      console.log("!!!!",req.query);
      res.ok('ok');
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  }


}
