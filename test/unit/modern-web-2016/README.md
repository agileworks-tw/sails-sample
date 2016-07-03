# modern web 2016：15 分鐘快速體驗 TDD，已使用者登入功能為例

## 使用者登入 Story

使用者可以透過電子郵件，並且需要輸入密碼，完成登入的功能，確保個人資料能被保護

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


## API Endpoint

### request

* http method: POST
* url: `/auth/login`
* input:
  * email
  * password

### response
