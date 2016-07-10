describe('對 User Model 進行使用者驗證', function() {

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
      let where = {
        email: user.email,
        password: user.password
      }
      let userExist = await User.findOne({where});
      userExist.email.should.be.equal(user.email);
      userExist.password.should.be.equal(user.password);
      done();
    } catch (e) {
      done(e);
    }
  });
});
