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

  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
