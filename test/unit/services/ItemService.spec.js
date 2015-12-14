describe('about Item Service operation.', function() {

  describe('update item itemname & search', () => {

    let testItem,FindList;
    before(async (done) => {

      testItem = await Item.create({
  			"Itemname": "testItem",
      });

      let search = [
        {itemname: 'a'},
        {itemname: 'b'},
        {itemname: 'c'}
      ];
      searchList = await* search.map(async(item) => {
          return await search.create(item);
      });

      done();
    });

    it('update Item search should success.', async (done) => {
      try {

        let search = "1"
        let send = {
          ItemId: testItem.id,
          ItemSearch: Search
        }
        let result = await ItemService.updateItemSearch(send);
        result.Search.should.be.equal(Search);
        done();

      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

    it('update Item find  should success.', async (done) => {
      try {
        let send = {
          ItemId: testItem.id,
          FindArray: [
            FindList[0].id,
            FindList[1].id,
            FindList[2].id
          ]
        }
        let result = await ItemService.updateItemFind(send);
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
