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

  let porductionInitDb = async () => {
    let {connection} = sails.config.models;
    let {environment} = sails.config;

    if(connection == 'mysql' && environment == 'production'){

      let {database} = sails.config.connections.mysql;

      let tableList = await sequelize.query(`
        select table_name
        from information_schema.tables
        where table_schema='${database}';
      `);

      if(tableList[0].length == 0){
        sails.log.info("=== porduction init database ===");
        await sequelize.sync({ force: 'drop' });
      }
    }
  }

  try {

    sails.log.info("=== start bootstrap ===");
    sails.services.passport.loadStrategies();
    await porductionInitDb();

    let user = await User.bulkCreate([
      { username: 'user', email: 'user@gmail.com' },
      { username: 'Deleav', email: 'deleav@deleav.com' },
      { username: 'DMoon', email: 'dmoon@dmoon.com' }
    ]);
    let passport = await Passport.create({provider: 'local', password: 'user', UserId: user.id});
    let post = await Post.bulkCreate([
      { title: 'Pokemon GOOO', auth: 'user', content: 'piko piko', UserId: user.id },
      { title: 'Dark Souls IIIII', content: 'daaaarkness', auth: 'Deleav' },
      { title: 'Big Sushi III', content: '大顆壽司', auth: 'DMoon' }
    ]);
    let dashboard = await Dashboard.bulkCreate([
      { title: "Pokemon GOOO" },
      { title: "Dark Souls IIIII" },
      { title: "Big Sushi III" }
    ]);
    // await user.setPosts([post]);
    // await user.setPassports([passport]);
    cb();
  } catch (e) {
    cb(e);
  }
};
