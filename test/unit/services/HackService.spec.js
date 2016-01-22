describe.skip('Hack', function() {
  it('get', async (done) => {
    try {
      await HackService.addPostItem('https://carousell.com/categories/for-her',1, 24.9915118,121.2942115);
      done();
    } catch (e) {
      sails.log.error(e);
      done(e);
    }
  });
  it('get', async (done) => {
    try {
      await HackService.addPostItem('https://carousell.com/categories/beauty-products/',2, 25.046649, 121.524972);
      done();
    } catch (e) {
      sails.log.error(e);
      done(e);
    }
  });
  it('get', async (done) => {
    try {
      await HackService.addPostItem('https://carousell.com/categories/design-craft/',3, 25.059090, 121.585912);
      done();
    } catch (e) {
      sails.log.error(e);
      done(e);
    }
  });
  it('get', async (done) => {
    try {
      await HackService.addPostItem('https://carousell.com/categories/lifestyle-gadgets/',4 , 24.148218, 120.6663793);
      done();
    } catch (e) {
      sails.log.error(e);
      done(e);
    }
  });
  it('get', async (done) => {
    try {
      await HackService.addPostItem('https://carousell.com/categories/sporting-gear/',5 , 24.125552,120.662361);
      done();
    } catch (e) {
      sails.log.error(e);
      done(e);
    }
  });
  // it('get', async (done) => {
  //   try {
  //     await HackService.addPostItem('https://carousell.com/categories/photography/',6, 23.7352583,120.4367124);
  //     done();
  //   } catch (e) {
  //     sails.log.error(e);
  //     done(e);
  //   }
  // });
  // it('get', async (done) => {
  //   try {
  //     await HackService.addPostItem('https://carousell.com/categories/luxury/',7, 24.4718658,120.7944095);
  //     done();
  //   } catch (e) {
  //     sails.log.error(e);
  //     done(e);
  //   }
  // });
  // it('get', async (done) => {
  //   try {
  //     await HackService.addPostItem('https://carousell.com/categories/vintage-antiques/',8, 24.4904408,120.801613);
  //     done();
  //   } catch (e) {
  //     sails.log.error(e);
  //     done(e);
  //   }
  // });
  // it('get', async (done) => {
  //   try {
  //     await HackService.addPostItem('https://carousell.com/categories/games-toys/',9, 24.7966141,120.9922002);
  //     done();
  //   } catch (e) {
  //     sails.log.error(e);
  //     done(e);
  //   }
  // });
  // it('get', async (done) => {
  //   try {
  //     await HackService.addPostItem('https://carousell.com/categories/furniture-home/',10, 24.8223574,120.9751582);
  //     done();
  //   } catch (e) {
  //     sails.log.error(e);
  //     done(e);
  //   }
  // });
  // it('get', async (done) => {
  //   try {
  //     await HackService.addPostItem('https://carousell.com/categories/textbooks/',11, 25.0475439,121.5020111);
  //     done();
  //   } catch (e) {
  //     sails.log.error(e);
  //     done(e);
  //   }
  // });
  // it('get', async (done) => {
  //   try {
  //     await HackService.addPostItem('https://carousell.com/categories/books/',12, 25.0757379,121.5609041);
  //     done();
  //   } catch (e) {
  //     sails.log.error(e);
  //     done(e);
  //   }
  // });
  // it('get', async (done) => {
  //   try {
  //     await HackService.addPostItem('https://carousell.com/categories/music-instruments/',13, 25.1328283,121.7530438);
  //     done();
  //   } catch (e) {
  //     sails.log.error(e);
  //     done(e);
  //   }
  // });
  // it('get', async (done) => {
  //   try {
  //     await HackService.addPostItem('https://carousell.com/categories/kitchen-appliances/',14, 25.1294836,121.7669904);
  //     done();
  //   } catch (e) {
  //     sails.log.error(e);
  //     done(e);
  //   }
  // });
  // it('get', async (done) => {
  //   try {
  //     await HackService.addPostItem('https://carousell.com/categories/baby-kids/',15, 25.134194,121.7691455);
  //     done();
  //   } catch (e) {
  //     sails.log.error(e);
  //     done(e);
  //   }
  // });
  // it('get', async (done) => {
  //   try {
  //     await HackService.addPostItem('https://carousell.com/categories/pet-accessories/',16, 24.8579579,121.822688);
  //     done();
  //   } catch (e) {
  //     sails.log.error(e);
  //     done(e);
  //   }
  // });
  // it('get', async (done) => {
  //   try {
  //     await HackService.addPostItem('https://carousell.com/categories/tickets-vouchers/',17, 24.7747923,121.7798219);
  //     done();
  //   } catch (e) {
  //     sails.log.error(e);
  //     done(e);
  //   }
  // });
  // it('get', async (done) => {
  //   try {
  //     await HackService.addPostItem('https://carousell.com/categories/everything-else/',18, 24.6534227,121.7404445);
  //     done();
  //   } catch (e) {
  //     sails.log.error(e);
  //     done(e);
  //   }
  // });
  // it('get', async (done) => {
  //   try {
  //     await HackService.addPostItem('https://carousell.com/categories/preorders/',19, 22.523992,120.5022792);
  //     done();
  //   } catch (e) {
  //     sails.log.error(e);
  //     done(e);
  //   }
  // });
});
