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
    latitude: {
      type: Sequelize.DOUBLE,
      allowNull: true,
      defaultValue: null,
      validate: { min: -90, max: 90 }
    },
    longitude: {
      type: Sequelize.DOUBLE,
      allowNull: true,
      defaultValue: null,
      validate: { min: -180, max: 180 }
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
    User.belongsToMany(Post, {through: 'UserFavorite'});
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
