describe('about Flickr Service operation.', function() {

  describe('update lile item', () => {

    it('flickr search', async (done) => {
      try {
        let tags = 'flower';
        let url = await FlickrService.search(tags);
        url.should.be.an.string;
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

  });


  describe('update lile item', () => {

    it.only('flickr search', async (done) => {
      try {
        let tags = 'iphone';
        let url = await FlickrService.searchGetty(tags);
        url.should.be.an.string;
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

  });

});
