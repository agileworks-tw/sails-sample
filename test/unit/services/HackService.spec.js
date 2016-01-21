describe('Hack', function() {

  it.only('get', async (done) => {
    try {
      let url = await HackService.addPostItem('https://carousell.com/categories/for-her',1);
      done();
    } catch (e) {
      sails.log.error(e);
      done(e);
    }
  });

});
