# Model


## User 欄位定義

```
module.exports = {
  attributes: {
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

## 相關程式碼


### User query

```
let where = {
  email: user.email,
  password: user.password
}
let userExist = await User.findOne({where});

```
