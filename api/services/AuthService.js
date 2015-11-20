module.exports = {

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
  }

}
