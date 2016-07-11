## API Endpoint

### request

* form: http method: POST, action: `/signin`
  * input:
    * name: email
    * name: password

## 相關程式碼

### login 實作 service

```
let userExist = await UserService.checkUser({user});
```
