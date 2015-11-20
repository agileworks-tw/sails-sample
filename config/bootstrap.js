/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = async (cb) => {
  try {
    sails.services.passport.loadStrategies();
    let user = await User.create({username: 'user', email: 'user@gmail.com'});
    let passport = await Passport.create({provider: 'local', password: 'user', UserId: user.id});
    let post = await Post.create({title: 'testTitle', UserId: user.id});
    // await user.setPosts([post]);
    // await user.setPassports([passport]);
    cb();
  } catch (e) {
    cb(e);
  }
};
