describe.skip('about item.', function() {
  it('create item should success.', async (done) => {
    try {
      let items= await Item.create({
        itemname: 'choose',
        sort: 'eat'
      });
      console.log("!!!!!!",items);
      items.id.should.be.INTEGER;
      done();
    } catch (e) {
      done(e);
    }
  });

  describe('find item', () => {
    let testFind;
    before(async (done) => {
      testFind  = await Item.create({
        itemname: 'choose',
        sort: 'eat'
      });
      done();
    });

    it('should success.', async (done) => {
      try {

        let findItem = await Item.findById(testFind.id);
        findItem.id.should.be.equal(testFind.id);
        done();
        console.log('===testFind===',testFind);
      } catch (e) {
        done(e);
      }
    });

  });

  describe('delete item', () => {

    let testDel;
    before(async (done) => {
      testDel  = await Item.create({
        itemname: 'choose',
        sort: 'eat'
      });
      done();
    });

    it('should success.', async (done) => {
      try {
        // let users;
        let delItem = await Item.findById(testDel.id);
        await delItem.destroy();

        let check = await Item.findById(testDel.id);
        should.not.exist(check);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  describe('update item', () => {
    let testUpdate;
    before(async (done) => {
      testUpdate  = await Item.create({
        itemname: 'choose',
        sort: 'eat'
      });
      done();
    });

    it('update Itemname、sort should success.', async (done) => {
      try {

        let updateItem = await Item.findById(testUpdate.id);
        updateItem.itemname= 'select';
        updateItem.sort= 'live';
        await updateItem.save();
        console.log('===updateItem===',updateItem);
          updateItem. itemname.should.be.not.equal(testUpdate.Itemname);
          updateItem. sort.should.be.not.equal(testUpdate.sort);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

});
