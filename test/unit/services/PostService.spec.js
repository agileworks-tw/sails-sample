describe('about Post Service operation.', function() {

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
        let post = await PostService.create(send);
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
        let post = await PostService.create(send);

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



  describe.only('get post', () => {

    let post;
    before(async (done) => {

      let like3c = await Like.create({
        title: '測試Ｇet生活3C'
      });

      let item = await Item.create({
        itemname: "Server",
        LikeId: like3c.id
      })

      post = {
        title: "testTitle",
        content: 'content',
        mode: "give",
        createdAt: "2015-12-15 10:09:07",
        updatedAt: "2015-12-15 10:09:07",
        ItemId: item.id,
        UserId: 1,
        geometry: {
          type: 'Point',
          coordinates: [24.148657699999998,120.67413979999999]
        }
      }

      let createPost = await Post.create(post);

      done();
    });

    it('should success.', async (done) => {
      try {

        let send = {
          latitude: 24.148657699999998,
          longitude: 120.67413979999999
        }
        // 未實作 PostService.getPost()
        let getData = await PostService.getNearbyPost(send);

        // 返回的Json
        // "data": [
        //   {
        //     "title": "Guilt Trattoria",
        //     "location": "1882 Trainer Avenue",
        //     "latitude": 51.560935,
        //     "longitude": -0.111365,
        //     "url": "item-detail.html",
        //     "type": "Restaurant",
        //     "type_icon": "../icons/store/apparel/bags.png",
        //     "rating": 4,
        //     "gallery": [
        //       "../img/items/5.jpg"
        //     ],
        //     "color": ""
        //   }
        // ]
        getData.data.should.be.an.Array;
        getData.data[0].title = post.title;
        getData.data[0].location = send.latitude;
        getData.data[0].longitude = send.longitude;
        getData.data[0].longitude = send.longitude;

        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

  });

});
