module.exports = {
  attributes: {
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    age: {
      type: Sequelize.INTEGER
    }
  },
  associations: function() {
    User.hasMany(Post);
    User.hasMany(Passport);
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
