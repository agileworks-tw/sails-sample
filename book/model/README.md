## 使用 Model 進行 Login 使用者驗證

### 1 User 欄位定義

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

### 2 開始測試之前，進行 set up: 建立測試 User Model

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

### 3 完成透過 Model 的操作完成預計要做的使用者驗證邏輯

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

### 4 確認 User Model 操作的方式確實可行

在此步驟完成，我們將可以在 Service 進行 Model 操作，且已確認 Model 的使用方式
