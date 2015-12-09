module.exports = {
  attributes: {
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
    },
    age: {
      type: Sequelize.INTEGER
    },
    gender:{
      type: Sequelize.ENUM('none', 'male', 'female'),
      defaultValue: 'none'
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
