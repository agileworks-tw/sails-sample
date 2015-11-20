module.exports = {
  index: async (req, res) => {
    try {
      let users = await UserService.findAll();
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
  }
}
