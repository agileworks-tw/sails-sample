describe('about Flickr Service operation.', function() {

  describe('update lile item', () => {

    let like3c;
    before(async (done) => {

      like3c = await Like.create({
        title: '測試用生活3C'
      });
      await Item.create({
        itemname: "Server",
        LikeId: like3c.id
      })
      done();
    });

    it.only('flickr search', async (done) => {
      try {

        let url = await FlickrService.search();

        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

  });

});
