module.exports = {
  environment: 'development',
  models:{
    connection: 'mysql',
  },
  connections:{
    mysql: {
      'user': process.env.MYSQL_ENV_MYSQL_USER_NAME || "admin",
      'password': process.env.MYSQL_ENV_MYSQL_ADMIN_PASS || "root",
      'database': process.env.MYSQL_ENV_MYSQL_USER_DB ||'trademuch',
      'dialect': 'mysql',
      options: {
        'host': process.env.MYSQL_PORT_3306_TCP_ADDR || "127.0.0.1",
        'port': process.env.MYSQL_PORT_3306_TCP_PORT || 3306,
        'dialect': 'mysql',
        'timezone': '+08:00'
      }
    }
  },
  passport:{
    facebook:{
      name: 'Facebook',
      protocol: 'oauth2',
      strategy: require('passport-facebook').Strategy,
      options:{
        clientID: '',
        clientSecret: '',
        profileFields: [ 'id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified', 'displayName' ],
        callbackURL: "http://localhost:1337/auth/facebook/callback"
      }
    }
  },
  getty: {
    ConnectSDK_ApiKey: '',
    ConnectSDK_ApiSecret: '',
  },
  uploadImage: {
    dirname: '../public/images/upload'
  }
}
