describe.only('對 User Model 進行 Login 相關操作', function() {

  let prepareUser = null;

  before(async (done) => {
    // 建立測試的 user 資料
    // 在進行 Login 驗證前需要 User 事先存在
    try {
      prepareUser = await User.create({
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
      let where = {
        email: prepareUser.email,
        username: prepareUser.username,
        password: prepareUser.password
      }
      let userExist = await User.findOne({where});
      console.log('=== userExist.email ===', userExist.toJSON());
      userExist.email.should.be.equal(prepareUser.email);
      userExist.username.should.be.equal(prepareUser.username);
      userExist.password.should.be.equal(prepareUser.password);
      done();
    } catch (e) {
      done(e);
    }
  });
});
