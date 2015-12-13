module.exports = {
  attributes: {
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    age: {
      type: Sequelize.INTEGER
    },
    gender:{
      type: Sequelize.ENUM('none', 'male', 'female'),
      defaultValue: 'none'
    },
    isFirstLogin:{
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }

  },
  associations: function() {
    User.hasMany(Post);
    User.hasMany(Passport);
    User.belongsToMany(Like, {through: 'UserLike'});
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
