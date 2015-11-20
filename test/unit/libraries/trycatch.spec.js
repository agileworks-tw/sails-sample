describe('about try/catch operation.', () => {

  it('use try function', (done) => {

    try {
      throw new Error('Hello Error!');
    } catch (e) {

      e.message.should.be.equal('Hello Error!');
      done();
    }
  });

  describe('service mock throw error, then controller output error message.', () => {
    before(async (done) => {
      sinon.stub(UserService, 'findAll', () => {
        throw new Error('mock error!');
      });
      done();
    });

    it('UserService findAll function', async (done) => {

      try {
        let res = await request(sails.hooks.http.app).get(`/user/find`);
        res.status.should.be.equal(500);

        done();
      } catch (e) {
        done(e);
      }
    });

    after((done) => {
      UserService.findAll.restore();
      done();
    });
  });
});
