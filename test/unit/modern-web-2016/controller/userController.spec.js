describe('對 User Controller 進行使用者驗證', function() {
  let user = null;
  before(async (done) => {
    // 建立測試的 user 資料
    // 在進行 Login 驗證前需要 User 事先存在
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

  it('透過 email 以及 password 確認使用者確實存在', async (done) => {
    try {

      let newUser = {
        email: user.email,
        password: user.password
      }

      // 實作 controller 呼叫 service 完成 login 動作
      // 檔案位置：api/controllers/UserController.js
      let result = await request(sails.hooks.http.app)
      .post('/signin')
      .send(newUser);
      (result.text.indexOf(user.email) >=0 ).should.be.true

      done();
    } catch (e) {
      done(e);
    }
  });
});
