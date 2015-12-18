module.exports = {
  attributes: {
    itemname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    quantity:{
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    pic:{
      type: Sequelize.STRING
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
