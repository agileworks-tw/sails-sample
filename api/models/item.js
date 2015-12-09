module.exports = {
  attributes: {
    itemname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    sort: {
      type: Sequelize.STRING,
      allowNull: false
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
