module.exports = {
  environment: '',
  domain: 'http://localhost:1337',
  db: {
    'username': process.env.MYSQL_USER || "root",
    'password': process.env.MYSQL_PASSWORD || "root",
    'host': process.env.MYSQL_1_PORT_3306_TCP_ADDR || "127.0.0.1",
    'port': process.env.MYSQL_1_PORT_3306_TCP_PORT || 3306,
    'database': 'trademuch',
    'dialect': 'mysql',
    'force': true
  }
}
