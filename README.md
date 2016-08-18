# modern web 2016：15 分鐘快速體驗 TDD，以使用者登入功能為例

## 使用者登入需求描述

使用者可以透過電子郵件，並且需要輸入密碼，完成登入的功能，確保個人資料能被保護


## 練習目標

期望透過此練習，讓大家體驗 TDD 實施的要領，經由單純的使用者登入功能實作引領大家完成第一個 TDD。

## 練習方式

使用 [Sails.js (MVC Framework for Node.js)](http://sailsjs.org/) 作為此次練習的框架，Sails 為 MVCS（Model, View, Controller, Service）架構，是 MVC 的延伸，分層的好處除了程式碼責任清楚之外，也利於分工，在 test 撰寫上，也較能清楚切分驗證範圍。

![](./mvcs.png)

在這次練習中各自所扮演的角色如下：

* Model: 資料庫的結構，將定義 User 所擁有的欄位
* Service: 一旦定義好 Model 我們可以將 Model 的操作，包成一個個 Service 方便重覆使用，主要商業邏輯實作上也會在這一層
* Controller: 作為 API 或是 view 的接口，專職接收資料後，將 Input 傳入 Service 處理，再將 Service 處理過後的 Output 回傳給 API 呼叫者。
* View: 作為前端呈現，在 UI 部分將根據 Controller 回傳的資料進行顯示，專職於畫面呈現。


根據上面的 MVCS 我們要進行練習的步驟如下，在最後的驗證步驟前，請試著只用

`npm test`

進行相關程式碼的驗證，在一開始運行 `npm test` 將會看到所有測試將會 fail 如下

```
對 User Controller 進行使用者驗證
  1) 透過 email 以及 password 確認使用者確實存在

對 User Model 進行使用者驗證
  2) 透過 email 以及 password 確認使用者確實存在

對 User Service 進行使用者驗證
  3) 透過 email 以及 password 確認使用者確實存在


0 passing (2s)
3 failing
```

## 1. 使用 Model 進行 Login 使用者驗證

### 1.1 User 欄位定義

開啟 `api/models/User.js` 定義下面的程式

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

### 1.2 開始測試之前，進行 set up: 建立測試 User Model

開啟 `test/unit/modern-web-2016/model/user.spec.js`

```
before(async (done) => {
  try {
    user = await User.create({
      email: 'test@gmail.com',
      password: 'test'
    });

    done();
  } catch (e) {
    done(e);
  }
});

```

### 1.3 完成透過 Model 的操作完成預計要做的使用者驗證邏輯

單純的狀況，只要 email 與 password 符合就視為驗證成功

```
try {
  let where = {
    email: user.email,
    password: user.password
  }
  let userExist = {email: "", password: ""}
  userExist = await User.findOne({where});

  userExist.email.should.be.equal(user.email);
  userExist.password.should.be.equal(user.password);
  done();
} catch (e) {
  done(e);
}
```

### 1.4 確認 User Model 操作的方式確實可行

在此步驟完成，我們將可以在 Service 進行 Model 操作，且已確認 Model 的使用方式

## 2. 將 Model 所完成的 Login 邏輯，用 Service 包裝


### 2.2 開始測試之前，進行 set up: 建立測試 User Model

開啟 `test/unit/modern-web-2016/service/userService.spec.js`

與 Model 步驟一樣，在開始測試前必須先把測試資料準備好

```
before(async (done) => {
  try {
    user = await User.create({
      email: 'test@gmail.com',
      password: 'test'
    });

    done();
  } catch (e) {
    done(e);
  }
});

```

### 2.3 測試先行，先把預計要驗證的測試撰寫完成

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

### 2.4 運行 `npm test` 預期測試會失敗

### 2.5 實作 `api/services/UserService.js`

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

### 2.6 再次運行 `npm test` 通過測試

在這步驟我們已有驗證通過的 Service 可以讓 Controller 使用。


## 3. 使用 Controller 呼叫 Service 所完成的 Login 驗證函式，並且將驗證結果回傳

* 實作 `api/controllers/UserController.js`


### 3.1 定義透過 http 進行登入的參數與網址

* http method: POST
* URL: `/signin`
* 輸入欄位:
  * name: email
  * name: password

html 部分，根據上述內容進行 form 表單製作

```
form(action='POST', method='/signin')
  input(name='email', type='email')
  input(name='password', type='password')
  button(type='submit') Sign in
```


### 3.2 測試先行，先定義測試案例

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
### 3.3 測試先行，先定義測試案例

### 3.4 運行 `npm test` 預期測試會失敗

### 3.5 實作 `api/controllers/UserController.js`

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
### 3.6 再次運行 `npm test` 通過測試

在這步驟我們已確認 Controller 可以使用，可以透過此網址 `/signin` 來進行登入。


## 最後驗證

運行 `npm test` 將會看到

```
對 User Controller 進行使用者驗證
  ✓ 透過 email 以及 password 確認使用者確實存在 (346ms)

對 User Model 進行使用者驗證
  ✓ 透過 email 以及 password 確認使用者確實存在

對 User Service 進行使用者驗證
  ✓ 透過 email 以及 password 確認使用者確實存在


3 passing (1s)
```

接著

`npm start`

開啟瀏覽器進入網站 `http://localhost:1337/login`

輸入：

* email: user@gmail.com
* password: user

可以正確完成登入，透過 TDD 完成 Login 功能
