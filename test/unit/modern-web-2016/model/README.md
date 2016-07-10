## Model (資料表欄位)

### User 欄位定義
```
module.exports = {
  attributes: {
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }
};
```

### User Create

`let user = await User.create({username: 'user', email: 'user@gmail.com'});`

### User query

```
let where = {
  email: 'user@gmail.com',
  username: user,
  password: 'user'
}
let userExist = await User.findOne({where});

```
