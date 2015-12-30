import sinon from 'sinon';
describe('about User Controller operation.', function() { //skip
  describe('find user', () => {

    it('should success.', async (done) => {
      try {
        let res = await request(sails.hooks.http.app).get(`/user/find`);
        let {users} = res.body;
        users.should.be.Array;
        done();
      } catch (e) {
        done(e);
      }
    });

  });
  describe('UserController Favorite', () => {

    let testUser, post, item, createPost;
    before(async (done) => {
      try {
        testUser = await User.create({
          "username": "testPost",
          "email": "testUserController@gmail.com",
          "age": 18
        });

        sinon.stub(UserService, 'getLoginState', (req) => {
          return true;
        });

        sinon.stub(UserService, 'getLoginUser', (req) => {
          return testUser;
        });

        let like3c = await Like.create({
          title: '測試Ｇet生活3C'
        });

        item = await Item.create({
          itemname: "Server",
          LikeId: like3c.id
        })

        post = {
          title: "testTitle",
          content: 'content',
          startDate: "2015-12-25",
          endDate: "2015-12-31",
          price: "200",
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

        createPost = await Post.create(post);

        done();
      } catch (e) {
        done(e)
      }
    });

    after( (done) => {
      UserService.getLoginState.restore();
      UserService.getLoginUser.restore();
      done();
    });

    it('add favorite should success.', async (done) => {
      try {

        let send = {
          userId: testUser.id,
          postId: createPost.id
        }

        let before = await testUser.getPosts();
        let result = await request(sails.hooks.http.app)
        .post('/addUserFavorite/' + testUser.id);
        // sails.log.info(result);
        result.status.should.be.equal(200);
        let after = await testUser.getPosts();
        result.should.be.an.Array;
        after.length.should.be.above(before.length)
        done();

      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

    it('get favorites should success.', async (done) => {
      try {

        let result = await request(sails.hooks.http.app)
        .get('/getUserFavorites');
        sails.log.info("!!!",result.body);
        result.status.should.be.equal(200);

        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

  });

});
