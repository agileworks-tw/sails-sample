module.exports = {
  attributes: {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    startDate: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    endDate: {
      type: Sequelize.DATEONLY
    },
    content: {
      type: Sequelize.STRING
    },
    mode: {
      type: Sequelize.ENUM('get', 'give'),
      allowNull: false
    },
    // geometry: {
    //   type: Sequelize.GEOMETRY
    // },
    latitude: {
      type: Sequelize.DOUBLE,
      allowNull: true,
      defaultValue: null,
      validate: { min: -90, max: 90 }
    },
    longitude: {
      type: Sequelize.DOUBLE,
      allowNull: true,
      defaultValue: null,
      validate: { min: -180, max: 180 }
    }
  },
  associations: function() {
    Post.belongsTo(Item);
    Post.belongsTo(User);
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
