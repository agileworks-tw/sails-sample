module.exports = {
  attributes: {
    itemname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    quantity:{
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  },
  associations: function() {
    Item.belongsTo(Like);
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
