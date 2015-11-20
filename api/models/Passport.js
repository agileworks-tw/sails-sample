module.exports = {
  attributes: {
    protocol: Sequelize.STRING,
    password: Sequelize.STRING,
    accessToken: Sequelize.STRING,
    provider: Sequelize.STRING,
    identifier: Sequelize.STRING,
    tokens: {
      type: Sequelize.TEXT,
      get: function() {
        var value;
        if (value = this.getDataValue('tokens')) {
          return JSON.parse(value);
        } else {
          return [];
        }
      },
      set: function(value) {
        console.log('value', value);
        return this.setDataValue('tokens', JSON.stringify(value));
      }
    }
  },
  associations: function() {
    Passport.belongsTo(User);
  },
  options: {
    classMethods: {},
    instanceMethods: {
      validatePassword: function(password, next) {
        if (password === this.getDataValue('password')) {
          return next(null, true);
        }
        return next(null, false);
      }
    },
    hooks: {}
  }
}
