describe.skip('about User Controller operation.', function() {
  it('create User should success.', async (done) => {
    done(new Error('no implement'));
  });

  describe('find user', () => {

    it('should success.', async (done) => {
      try {
        let res = await request(sails.hooks.http.app).get(`/user/find`);
        let {users} = res.body;
        users.should.be.Array;
        done();
      } catch (e) {
        done(e);
      }
    });

  });

  describe('delete user', () => {
    before(async (done) => {
      done();
    });

    it('should success.', async (done) => {
      done(new Error('no implement'));
    });
  });

  describe('update user', () => {
    before(async (done) => {
      done();
    });

    it('should success.', async (done) => {
      done(new Error('no implement'));
    });
  });

});
