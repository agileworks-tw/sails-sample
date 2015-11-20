/**
 * Authentication Controller
#
 * This is merely meant as an example of how your Authentication controller
 * should look. It currently includes the minimum amount of functionality for
 * the basics of Passport.js to work.
 */

module.exports = {
  login: function(req, res) {
    res.ok({
      errors: req.flash('error')
    });
  },
  logout: function(req, res) {
    req.session.authenticated = false;
    req.logout();
    return res.redirect('/');

  },
  provider: function(req, res) {
    try {
      passport.endpoint(req, res);
    } catch (e) {
      console.log(e);
    }
  },
  register: async (req, res) => {
    try {
      let defaultUser = {
        username: '',
        email: '',
      }

      res.ok({user});

    } catch (e) {
      console.error(e.stack);
    }

  },
  status: (req, res) => {
    let status = {
      loginState: AuthService.getLoginState(req),
      loginUser: AuthService.getLoginUser(req)
    }
    res.ok({status});

  },
  callback: async function(req, res) {
    var tryAgain = function(err) {
      var action, flashError;
      flashError = req.flash('error')[0];
      if (err && !flashError) {
        req.flash('error', 'Error.Passport.Generic');
      } else if (flashError) {
        req.flash('error', flashError);
      }
      req.flash('form', req.body);
      action = req.param('action');
      // console.log("!!!",req);
      switch (action) {
        case 'register':
          res.redirect('/register');
          break;
        case 'disconnect':
          res.redirect('back');
          break;
        default:
          var reference;
          try {
            reference = url.parse(req.headers.referer);
          } catch (e) {
            reference = { path : "" };
          }

          res.redirect('/');

      }
    };
    await passport.callback(req, res, function(err, user, challenges, statuses) {
      if (err || !user) {
        return tryAgain(challenges);
      }

      req.login(user, function(err) {
        if (err) {
          return tryAgain(err);
        }

        req.session.authenticated = true;

        sails.log.info('=== login success ===');

        return res.redirect('/');
      });
    });
  },

  disconnect: function(req, res) {
    passport.disconnect(req, res);
  }

};
