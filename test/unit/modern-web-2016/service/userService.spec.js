describe('對 User Service 進行使用者驗證', function() {

  let user = null;

  before(async (done) => {

    try {
      // 建立測試的 user 資料
      // 在進行 Login 驗證前需要 User 事先存在

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
      // 開啟 api/services/UserService.js
      // 將在 model 所撰寫的使用者查詢驗證，透過 service 實作
      // 在此測試不需新增程式碼，只需要實作 api/services/UserService.js 讓此測試通過
      let userExist = {email: "", password: ""}
      // userExist = await UserService.checkUser({user});
      userExist.email.should.be.equal(user.email);
      userExist.password.should.be.equal(user.password);
      done();
    } catch (e) {
      done(e);
    }
  });
});
