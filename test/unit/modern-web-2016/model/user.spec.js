describe('對 User Model 進行使用者驗證', function() {

  let user = null;

  before(async (done) => {
    // 建立測試的 user 資料
    // 在進行 Login 驗證前需要先有 User 存在

    try {
      // 撰寫使用者建立程式碼
      user = {}

      done();
    } catch (e) {
      done(e);
    }
  });

  it('透過 email 以及 password 確認使用者確實存在', async (done) => {
    try {

      // input
      let where = {
        email: user.email,
        password: user.password
      }

      //process and Output，在此實作查詢出在 before 建立的使用者。
      let userExist = {};

      //check Output
      userExist.email.should.be.equal(user.email);
      userExist.password.should.be.equal(user.password);
      done();
    } catch (e) {
      done(e);
    }
  });
});
