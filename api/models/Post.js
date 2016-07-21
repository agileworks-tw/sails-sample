module.exports = {
  attributes: {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.STRING,
    },
    auth: {
      type: Sequelize.STRING,
      defaultValue: ""
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
