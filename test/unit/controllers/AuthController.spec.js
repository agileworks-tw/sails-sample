describe('about Auth Controller operation.', function() {
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

  describe('login user use eamil', () => {

    before(async (done) => {
      try {
        let testuser = {
          email: 'testuser@gmail.com',
          username: 'testuser'
        }

        let user = await User.create(testuser);
        await Passport.create({provider: 'local', password: 'testuser', UserId: user.id});
        done();

      } catch (e) {
        done(e);
      }
    });


    it('should success.', async (done) => {

      try {
        let loginInfo = {
          identifier: 'testuser@gmail.com',
          password: 'testuser'
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

});
