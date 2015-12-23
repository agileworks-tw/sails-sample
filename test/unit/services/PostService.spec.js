import sinon from 'sinon';

describe('about Post Service operation.', function() {

  describe('post new item', () => {

    let like, item;
    before(async (done) => {
      try {
        let user = await User.create({
          "username": "testPost",
    			"email": "testPost@gmail.com",
    			"age": 18
        });

        sinon.stub(UserService, 'getLoginState', (req) => {
          return true;
        });

        sinon.stub(UserService, 'getLoginUser', (req) => {
          return user;
        });

        like = await Like.create({
          title: '測試PO文'
        });

        item = await Item.create({
          itemname: '測試PO文品項',
          LikeId: like.id
        })

        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

    after(async (done) => {
      UserService.getLoginState.restore();
      UserService.getLoginUser.restore();
      done();
    });

    it('should success.', async (done) => {
      try {
        let send = {
          "mode": "give",
          "hobby": like.id,
          "detail": {
            "title": "123",
            "startDate": "2015-12-25",
            "endDate": "2015-12-31",
            "price": "200",
            "radioItem": item.id,
            "item": ""
          },
          "location": {
            "latitude": 24.148657699999998,
            "longitude": 120.67413979999999,
            "accuracy": 30
          }
        }

        let post = await PostService.create(send);
        post.id.should.be.an.INTEGER;

        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

    it('should add new Item success.', async (done) => {
      try {
        let send = {
          "mode": "give",
          "hobby": like.id,
          "detail": {
            "title": "123",
            "startDate": "2015-12-25",
            "endDate": "2015-12-31",
            "price": "200",
            "item": "iphone7s"
          },
          "location": {
            "latitude": 24.148657699999998,
            "longitude": 120.67413979999999,
            "accuracy": 30
          }
        }

        let before = await like.getItems();

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



  describe('get post', () => {

    let post, item;
    before(async (done) => {
      try {
        let like3c = await Like.create({
          title: '測試Ｇet生活3C'
        });

        item = await Item.create({
          itemname: "Server",
          LikeId: like3c.id
        })

        post = {
          title: "testTitle",
          startDate: "2015-12-25",
          endDate: "2015-12-31",
          price: "200",
          content: 'content',
          mode: "give",
          createdAt: "2015-12-15 10:09:07",
          updatedAt: "2015-12-15 10:09:07",
          ItemId: item.id,
          UserId: 1,
          latitude: 24.148657699999998,
          longitude: 120.67413979999999,
          geometry: {
            type: 'Point',
            coordinates: [24.148657699999998,120.67413979999999]
          }
        }

        let createPost = await Post.create(post);

        let itemPost = await Item.create({
          itemname: 'PS4',
          LikeId: like3c.id
        });

        for(let i =0 ;i < 10; i++){

          let latitude = 51.5377994 + Math.random()/100;
          let longitude = -0.1006775 + Math.random()/100;
          let post = {
            title: "testTitle",
            startDate: "2015-12-25",
            endDate: "2015-12-31",
            price: "200",
            content: 'content',
            mode: "give",
            createdAt: "2015-12-15 10:09:07",
            updatedAt: "2015-12-15 10:09:07",
            ItemId: itemPost.id,
            UserId: 1,
            latitude: latitude,
            longitude: longitude,
            geometry: {
              type: 'Point',
              coordinates: [latitude,longitude]
            }
          }
          let createPost = await Post.create(post);
        }
        done();
      } catch (e) {
        done(e)
      }
    });

    it('should success.', async (done) => {
      try {

        let getData = await PostService.getAllPost();

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

        sails.log.info(JSON.stringify(getData.data[0],null,2));
        getData.data.should.be.Array;

        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

  });

});
