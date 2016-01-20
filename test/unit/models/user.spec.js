describe.skip('about User model operation.', function() {
  it('create User should success.', async (done) => {
    try {
      // let users;
      let users
      users.id.should.be.INTEGER;
      done();
    } catch (e) {
      done(e);
    }
  });

  describe('find user', () => {
    let testFind;
    before(async (done) => {
      testFind  = await User.create({
        username: 'test',
        email: 'test@gmail.com',
        age: 18
      });
      done();
    });

    it('should success.', async (done) => {
      try {
        // let users;
        let findUser;
        findUser.id.should.be.equal(testFind.id);
        done();
      } catch (e) {
        done(e);
      }
    });

  });

  describe('delete user', () => {

    let testDel;
    before(async (done) => {
      testDel  = await User.create({
        username: 'test',
        email: 'test@gmail.com',
        age: 18
      });
      done();
    });

    it('should success.', async (done) => {
      try {
        // let users;
        let delUser;

        let check = await User.findById(testDel.id);
        should.not.exist(check);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  describe('update user', () => {
    let testUpdate;
    before(async (done) => {
      testUpdate  = await User.create({
        username: 'test',
        email: 'test@gmail.com',
        age: 18
      });
      done();
    });

    it('update user name、email、age should success.', async (done) => {
      try {
        // let users;
        let updateUser;
        updateUser.username.should.be.not.equal(testUpdate.username);
        updateUser.email.should.be.not.equal(testUpdate.email);
        updateUser.age.should.be.not.equal(testUpdate.age);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

});
