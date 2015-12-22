describe('about User Service operation.', function() {

  describe('update user mail & like', () => {

    let testUser,likeList;
    before(async (done) => {

      testUser = await User.create({
  			"username": "testuser",
      });

      let like = [
        {title: 'a'},
        {title: 'b'},
        {title: 'c'}
      ];
      likeList = await* like.map(async(item) => {
          return await Like.create(item);
      });

      done();
    });

    it('update user Email should success.', async (done) => {
      try {

        let mail = "123@gmail.com"
        let send = {
          userId: testUser.id,
          userMail: mail
        }
        let result = await UserService.updateUserMail(send);
        result.email.should.be.equal(mail);
        done();

      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

    it('update user Like should success.', async (done) => {
      try {
        let send = {
          userId: testUser.id,
          likeArray: [
            likeList[0].id,
            likeList[1].id,
            likeList[2].id
          ]
        }
        let result = await UserService.updateUserLike(send);
        sails.log.info("!!!!",JSON.stringify(result,null,2));
        result.should.be.an.Array;
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

  });

  describe.only('User Favorite', () => {

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

        let result = await UserService.getUserFavorite(send);
        result.should.be.an.Array;
        done();

      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

  });

});
