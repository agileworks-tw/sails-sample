describe.only('Hack', function() {

  it('get', async (done) => {
    try {
      await HackService.addPostItem('https://carousell.com/categories/for-her',1);
      done();
    } catch (e) {
      sails.log.error(e);
      done(e);
    }
  });
  it('get', async (done) => {
    try {
      await HackService.addPostItem('https://carousell.com/categories/beauty-products/',2);
      done();
    } catch (e) {
      sails.log.error(e);
      done(e);
    }
  });
  it('get', async (done) => {
    try {
      await HackService.addPostItem('https://carousell.com/categories/design-craft/',3);
      done();
    } catch (e) {
      sails.log.error(e);
      done(e);
    }
  });
  it('get', async (done) => {
    try {
      await HackService.addPostItem('https://carousell.com/categories/lifestyle-gadgets/',4);
      done();
    } catch (e) {
      sails.log.error(e);
      done(e);
    }
  });
  it('get', async (done) => {
    try {
      await HackService.addPostItem('https://carousell.com/categories/sporting-gear/',5);
      done();
    } catch (e) {
      sails.log.error(e);
      done(e);
    }
  });

});
