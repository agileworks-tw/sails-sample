describe.only('about Auth Controller operation.', function() {
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

  it('login user should success.', async (done) => {
    console.log('=== user controller spec ===');
    try {

      let newUser = {
        username: user.username,
        email: user.email,
        password: user.password
      }

      let result = await request(sails.hooks.http.app)
      .post('/user/login')
      .send(newUser);
      console.log('=== result ===', result.body);
      result.loginSuccess.should.be.true;

      done();
    } catch (e) {
      done(e);
    }
  });
});
