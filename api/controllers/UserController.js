module.exports = {
  signin: async (req, res) => {
    try {
      let user = req.body;
      let userExist = await UserService.checkUser({user});
      res.view('info.jade', {user: userExist, loginSuccess: true});
    } catch (e) {
      res.serverError(e);
    }
  }
}
