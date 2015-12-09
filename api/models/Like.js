module.exports = {
  attributes: {
    title: {
      type: Sequelize.STRING,
    }
  },
  associations: function() {
    Like.belongsToMany(User, {through: 'UserLike'});
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
