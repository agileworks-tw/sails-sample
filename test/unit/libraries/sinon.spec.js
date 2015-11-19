describe('about Sinon operation.', () => {
  it('use origin UserService findAll function', async (done) => {
    let users = await UserService.findAll();
    users.should.be.Array;
    done();
  });


  describe('use mock', () => {
    before(async (done) => {
      sinon.stub(UserService, 'findAll', () => {
        return 'UserService.findAll() is mocked';
      });
      done();
    });

    it('UserService findAll function', (done) => {
      UserService.findAll().should.be.equal('UserService.findAll() is mocked');
      done();
    });

    after((done) => {
      UserService.findAll.restore();
      done();
    });
  });
});
