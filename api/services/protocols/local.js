var validator = require('validator');

exports.register = async function(req, res, next) {
  var email, password, username;
  email = req.param('email');
  username = req.param('username');
  password = req.param('password');

  try {

    if (!email) {
      throw new Error('No email was entered.');
    }

    if (!password) {
      throw new Error('No password was entered.');
    }

    let newUserParams = req.body;

    let newUser = {
      username: newUserParams.username || email,
      email: email
    }

    let user = await User.create(newUser);

    let passport = await Passport.create({
      protocol: 'local',
      password: password,
      UserId: user.id
    });

    sails.log.info("=== local register success ===");

    return next(null, user);

  } catch (err) {
    console.error(err.stack);
    req.flash('error', err.message);
    return next(err);

  }
};



exports.connect = function(req, res, next) {
  var password, user;
  user = req.user;
  password = req.param('password');
  Passport.find({
    protocol: 'local',
    UserId: user.id
  }, function(err, passport) {
    if (err) {
      return next(err);
    }
    if (!passport) {
      Passport.create({
        protocol: 'local',
        password: password,
        UserId: user.id
      }, function(err, passport) {
        next(err, user);
      });
    } else {
      next(null, user);
    }
  });
};


exports.login = function(req, identifier, password, next) {

  try {
    var isEmail, query;
    isEmail = validator.isEmail(identifier);
    query = {
      where: {}
    };
    if (isEmail) {
      query.where.email = identifier;
    } else {
      query.where.username = identifier;
    }
    User.findOne(query).then(function(user) {
      if (!user) {
        if (isEmail) {
          throw new Error('Error.Passport.Email.NotFound');
        } else {
          throw new Error('Error.Passport.Username.NotFound');
        }
      }

      Passport.findOne({
        where: {
          UserId: user.id
        }
      }).then(function(passport) {
        if (passport) {
          passport.validatePassword(password, function(err, res) {
            if (err) throw err;
            if (!res) {
              throw new Error('Error.Passport.Password.Wrong');
            } else {
              return next(null, user);
            }
          });
        } else {
          throw new Error('Error.Passport.Password.NotSet');
        }
      });
    });

  } catch (e) {
    sails.log.info(e.stack);
    next(err);
  }
};
