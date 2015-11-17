describe('about User model operation.', function() {
  it('create User with admin', async (done) => {
    try {
      let newUser = {
        name: 'TestUser01'
      };
      let createdUser = await User.create(newUser);

      done();
    } catch (e) {
      sails.log.info(e.stack);
      done(e);
    }
  });

});
