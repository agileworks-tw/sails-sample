describe.skip('about User Controller operation.', function() {
  it('create User should success.', async (done) => {
    done(new Error('no implement'));
  });

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

  describe('delete user', () => {
    before(async (done) => {
      done();
    });

    it('should success.', async (done) => {
      done(new Error('no implement'));
    });
  });

  describe('update user', () => {
    before(async (done) => {
      done();
    });

    it('should success.', async (done) => {
      done(new Error('no implement'));
    });
  });

  describe.only('UserController Favorite', () => {

    let testUser, post, item, createPost;
    before(async (done) => {

      testUser = await User.create({
  			"username": "testuser",
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
    });

    it('add favorite should success.', async (done) => {
      try {

        let send = {
          userId: testUser.id,
          postId: createPost.id
        }

        let before = await testUser.getPosts();
        let result = await UserService.addUserFavorite(send);
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

        let send = {
          userId: testUser.id,
        }
        let result = await UserService.getUserFavorites(send);
        result.should.be.an.Array;
        done();

      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

  });

});
