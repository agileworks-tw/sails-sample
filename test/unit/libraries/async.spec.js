describe('about flow operation.', () => {

  it('use promise function', (done) => {
    User.findAll()
    .then((users) => {
      users.should.be.Array;
      done();
    })
    .error((error) => {
      done(error);
    });
  });


  it('use async/await function', async (done) => {
    try {
      let users = await User.findAll();
      users.should.be.Array;
      done();
    } catch (e) {
      done(e);
    }
  });

  it('findAll post use promise function', (done) => {
    done();
  });

  it('findAll post use async/await function', async (done) => {
    try {

      done();
    } catch (e) {
      done(e);
    }
  });



});
