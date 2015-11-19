module.exports = {
  attributes: {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.STRING,
    }
  },
  associations: function() {

  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
