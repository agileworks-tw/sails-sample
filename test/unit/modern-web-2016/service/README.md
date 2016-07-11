# Service


## 實作 checkUser

編輯 `api/services/UserService.js`

## 相關程式碼

### User Create

`let user = await User.create({username: 'user', email: 'user@gmail.com'});`

### User query

```
let where = {
  email: 'user@gmail.com',
  password: 'user'
}
let userExist = await User.findOne({where});

```
