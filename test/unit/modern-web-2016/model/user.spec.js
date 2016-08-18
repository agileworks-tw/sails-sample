describe('對 User Model 進行使用者驗證', function() {

  let user = null;

  before(async (done) => {
    try {
      // 建立測試的 user 資料
      // 在進行 Login 驗證前需要先有 User 存在

      // 撰寫使用者建立程式碼
      // user = await User.create({
      //   email: 'test@gmail.com',
      //   password: 'test'
      // });

      done();
    } catch (e) {
      done(e);
    }
  });

  it('透過 email 以及 password 確認使用者確實存在', async (done) => {
    try {

      //process and Output，在此實作查詢出在 before 建立的使用者。
      let where = {
        email: user.email,
        password: user.password
      }
      let userExist = {email: "", password: ""}
      // userExist = await User.findOne({where});

      //check Output
      userExist.email.should.be.equal(user.email);
      userExist.password.should.be.equal(user.password);
      done();
    } catch (e) {
      done(e);
    }
  });
});
