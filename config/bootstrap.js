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
      { username: 'Deleav', email: 'deleav@gmail.com', age: '22k' },
      { username: 'DMoon', email: 'dmoon@dmoon.com' }
    ]);
    let passport = await Passport.create({provider: 'local', password: 'user', UserId: user.id});
    let post = await Post.bulkCreate([
      { title: 'post 1', authId: '2', content: '今天天氣真好', UserId: user.id },
      { title: 'post 2', content: 'daaaarkness', authId: '1' },
      { title: 'post 3', content: '大顆壽司', authId: '3' }
    ]);
    let dashboard = await Dashboard.bulkCreate([
      { title: "post 1" },
      { title: "post 2" },
      { title: "post 3" }
    ]);
    // await user.setPosts([post]);
    // await user.setPassports([passport]);
    cb();
  } catch (e) {
    cb(e);
  }
};
