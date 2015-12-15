module.exports = {
  attributes: {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.STRING,
    },
    mode: {
      type: Sequelize.ENUM('get', 'give'),
      allowNull: false
    },
    geometry: {
      type: Sequelize.GEOMETRY
    }
  },
  associations: function() {
    Post.belongsTo(Item);
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
