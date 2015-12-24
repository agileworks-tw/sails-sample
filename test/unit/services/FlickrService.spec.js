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

    it('flickr search', async (done) => {
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


  describe.only('test appn', () => {

    it('appn', async (done) => {
      try {
        let data = {
          api: 'meeting_create',
          host_id: 'j0smGf5Adb7EBqy2XhVfK3PN5YD0q3',
          topic: 'test',
          type: '1',
          option_host_video: 'false'
        }
        let check = appnService.genCheckMacValue(data);
        sails.log.info("@@@@@@@@@@@",check);

        data.check_value = check;
        data.API_Key =  'VO0CvjP9ld2lJn0hIrHO4lmt6EgWX1KqF8sz';
        console.log(data);

        let result = await request('https://zoomnow.net')
        .post('/API/zntw_api.php')
        .type('form')
        .send(data);

        console.log(result.body);

        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

  });

});
