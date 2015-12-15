describe.only('about Post Service operation.', function() {

  describe('post new item', () => {

    let like, item;
    before(async (done) => {

      like = await Like.create({
        title: '測試PO文'
      });

      item = Item.create({
        itemname: '測試PO文品項',
        LikeId: like.id
      })

      done();
    });

    it('should success.', async (done) => {
      try {
        let send = {
          "mode": "give",
          "hobby": like.id,
          "detail": {
            "title": "123",
            "radioItem": item.id,
            "item": ""
          },
          "location": {
            "latitude": 24.148657699999998,
            "longitude": 120.67413979999999,
            "accuracy": 30
          }
        }

        // 未實作 PostService.create
        let post = PostService.create(send);
        post.id.should.be.an.INTEGER;

        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

    it('should success.', async (done) => {
      try {
        let send = {
          "mode": "give",
          "hobby": like.id,
          "detail": {
            "title": "123",
            "item": "iphone7s"
          },
          "location": {
            "latitude": 24.148657699999998,
            "longitude": 120.67413979999999,
            "accuracy": 30
          }
        }

        let before = await like.getItems();

        // 未實作 PostService.create
        let post = PostService.create(send);

        let after = await like.getItems();

        post.id.should.be.an.INTEGER;
        after.length.should.be.an.above(before.length);

        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

  });

});
