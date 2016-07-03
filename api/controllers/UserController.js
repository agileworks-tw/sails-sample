module.exports = {
  login: async (req, res) => {
    try {
      let user = req.body;
      let userExist = await UserService.checkUser({user});
      res.ok({user: userExist, loginSuccess: true});
    } catch (e) {
      res.serverError(e);
    }
  }
}
