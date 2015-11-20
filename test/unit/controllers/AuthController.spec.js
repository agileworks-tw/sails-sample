describe.only('about Auth Controller operation.', function() {
  it('register user should success.', async (done) => {

    try {

      let newUser = {
        username: 'newUser',
        email: 'newUser@gmail.com',
        password: 'newUser'
      }

      let result = await request(sails.hooks.http.app)
      .post('/auth/local/register')
      .send(newUser);

      let {email} = newUser;
      let checkUser = await User.findOne({
        where: {email},
        include: Passport
      });

      checkUser.email.should.be.equal(newUser.email);
      checkUser.Passports[0].password.should.be.equal(newUser.password);
      result.status.should.be.equal(302);
      result.headers.location.should.be.equal('/');

      done();
    } catch (e) {
      done(e);
    }
  });

  it('login user use eamil should success.', async (done) => {

    try {
      let loginInfo = {
        identifier: 'newUser@gmail.com',
        password: 'newUser'
      }

      let result = await request(sails.hooks.http.app)
      .post('/auth/local')
      .send(loginInfo);

      result.status.should.be.equal(302);
      result.headers.location.should.be.equal('/');

      done();
    } catch (e) {
      done(e);
    }
  });

});
