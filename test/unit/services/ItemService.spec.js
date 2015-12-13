describe('about Item Service operation.', function() {

  describe('update item itemname & search', () => {

    let testItem,SearchList;
    before(async (done) => {

      testItem = await Item.create({
  			"Itemname": "testItem",
      });

      let search = [
        {Itemname: 'a'},
        {Itemname: 'b'},
        {Itemname: 'c'}
      ];
      searchList = await* search.map(async(item) => {
          return await search.create(item);
      });

      done();
    });

    it('update user search should success.', async (done) => {
      try {

        let search = "123@gmail.com"
        let send = {
          userId: testItem.id,
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
          userId: testItem.id,
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
