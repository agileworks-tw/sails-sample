describe('對 User Service 進行使用者驗證', function() {

  let user = null;

  before(async (done) => {
    // 建立測試的 user 資料
    // 在進行 Login 驗證前需要 User 事先存在
    try {
      user = await User.create({
        username: 'test',
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

      let userExist = await UserService.checkUser({user});
      console.log('=== service userExist.email ===', userExist.toJSON());
      userExist.email.should.be.equal(user.email);
      userExist.username.should.be.equal(user.username);
      userExist.password.should.be.equal(user.password);
      done();
    } catch (e) {
      done(e);
    }
  });
});
