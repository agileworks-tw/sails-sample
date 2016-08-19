## 將 Model 所完成的 Login 邏輯，用 Service 包裝


### 2 開始測試之前，進行 set up: 建立測試 User Model

開啟 `test/unit/modern-web-2016/service/userService.spec.js`

與 Model 步驟一樣，在開始測試前必須先把測試資料準備好

```
before(async (done) => {
  try {
    user = await User.create({
      email: 'test@gmail.com',
      pa ssword: 'test'
    });

    done();
  } catch (e) {
    done(e);
  }
});

```

### 3 測試先行，先把預計要驗證的測試撰寫完成

```
it('透過 email 以及 password 確認使用者確實存在', async (done) => {
  try {
    let userExist = {email: "", password: ""}
    userExist = await UserService.checkUser({user});
    userExist.email.should.be.equal(user.email);
    userExist.password.should.be.equal(user.password);
    done();
  } catch (e) {
    done(e);
  }
});

```

### 4 運行 `npm test` 預期測試會失敗

### 5 實作 `api/services/UserService.js`

開啟 `api/services/UserService.js`，撰寫下列程式

```
checkUser: async ({user}) => {
  try {

    let userExist = {email: '', password: ''}

    let where = {
      email: user.email,
      password: user.password
    }
    // 下面程式碼已在 user.spec.js 驗證過
    userExist = await User.findOne({where});
    return userExist;

  } catch (e) {
    throw e;
  }
},
```

### 6 再次運行 `npm test` 通過測試

在這步驟我們已有驗證通過的 Service 可以讓 Controller 使用。
