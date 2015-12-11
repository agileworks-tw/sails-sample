module.exports = {
  attributes: {
    title: {
      type: Sequelize.STRING,
    }
  },
  associations: function() {
    Like.hasMany(Item);
    Like.belongsToMany(User, {through: 'UserLike'});
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
