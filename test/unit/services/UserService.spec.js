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

});
