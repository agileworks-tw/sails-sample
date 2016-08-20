## 使用 Controller 呼叫 Service 所完成的 Login 驗證函式，並且將驗證結果回傳

* 實作 `api/controllers/UserController.js`


### 1 定義透過 http 進行登入的參數與網址

* http method: POST
* URL: `/signin`
* 輸入欄位:
  * name: email
  * name: password

html 部分，根據上述內容進行 form 表單製作

```
form(action='/signin', method='POST')
  input(name='email', type='email')
  input(name='password', type='password')
  button(type='submit') Sign in
```


### 2 測試先行，先定義測試案例

* 開啟 `test/unit/modern-web-2016/controller/userController.spec.js`

```
it('透過 email 以及 password 確認使用者確實存在', async (done) => {
  try {

    let newUser = {
      email: user.email,
      password: user.password
    }

    let result = await request(sails.hooks.http.app)
    .post('/signin')
    .send(newUser);

    // 登入成功後取得的 html 預期會有登入者的 email
    (result.text.indexOf(user.email) >=0 ).should.be.true

    done();
  } catch (e) {
    done(e);
  }
});

```
### 3 測試先行，先定義測試案例

### 4 運行 `npm test` 預期測試會失敗

### 5 實作 `api/controllers/UserController.js`

開啟 `api/controllers/UserController.js`，撰寫下列程式

```
signin: async (req, res) => {
  try {
    let user = req.body;

    let userExist = {}
    // 下面程式碼已在 UserService.spec.js 驗證過
    userExist = await UserService.checkUser({user});

    res.view('info.jade', {user: userExist, loginSuccess: true});
  } catch (e) {
    res.serverError(e);
  }
}
```
### 6 再次運行 `npm test` 通過測試

在這步驟我們已確認 Controller 可以使用，可以透過此網址 `/signin` 來進行登入。
