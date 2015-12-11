import sinon from 'sinon';

describe("about Item service", () => {

  let testItemCode, testFindItemCode, testDeleteItemCode, testUpdateItemCode;

  before(async (done) => {
    try {
      sinon.stub(ItemService, 'getchooseState', (req) => {
        return true;
      });

      var Itemcode = {
          title: '測試',
          code: 'YYYYYYYYYYZZZZZZZZZZ',
          autoRandomCode: 'on',
          startDate: '2015-10-01',
          endDate: '2120-10-10',
          type: 'price',
          description: 99,
          restriction: 999,
          sentType: 'all',
          sentContent: '測試'
        };
      testItemCode = await db.Itemcode.create(Itemcode);

      var Itemcode2 = {
          title: '測試找到項目',
          code: 'AAAAAAAAAABBBBBBBBBB',
          autoRandomCode: 'on',
          startDate: '2015-9-01',
          endDate: '2015-9-30',
          type: 'price',
          description: 99,
          restriction: 999,
          sentType: 'all',
          sentContent: '測試'
        };
      testFindItemCode = await db.Itemcode.create(Itemcode2);

      var Itemcode3 = {
          title: '測試刪除項目',
          code: 'CCCCCCCCCCDDDDDDDDDD',
          autoRandomCode: 'on',
          startDate: '1970-01-01',
          endDate: '1970-01-01',
          type: 'price',
          description: 99,
          restriction: 999,
          sentType: 'all',
          sentContent: '測試',
          restrictionDate: 'on'
        };
      testDeleteItemCode = await db.Itemcode.create(Itemcode3);


      var Itemcode4 = {
          title: '測試修改項目',
          code: 'EEEEEEEEEEFFFFFFFFFF',
          autoRandomCode: 'on',
          startDate: '1970-01-01',
          endDate: '1970-01-01',
          type: 'discount',
          description: 80,
          restriction: 999,
          sentType: 'all',
          sentContent: '測試',
          restrictionDate: 'on'
        };
      testUpdateItemCode = await db.ItemCode.create(Itemcode4);

      done();

    } catch (e) {
      done(e);

    }
  });

  after((done) => {
    // end this simulated login
    ItemService.getchooseState.restore();
    done();
  });

  it('check', async (done) => {
    try {
      let check = await ItemService.checkCode(testItemCode.code);
      check.id.should.be.equal(testItemCode.id);
      done();
    } catch (e) {
      console.log(e);
      done(e);
    }
  });

  it('use ItemCode', async (done) => {
    try {
      var data ={
        code: testItemCode.code,
        price: 999,
      }
      let check = await ItemCodeService.use(data);
      check.price.should.be.equal(900);
      check.discountAmount.shtestItemCodeould.be.equal(99);
      done();
    } catch (e) {
      console.log(e);
      done(e);
    }
  });

  it('use ItemCode Find', async (done) => {
    try {
      var data ={
        code: testFindItemCode.code,
        price: 999,
      }
      let check = await ItemCodeService.use(data);
      check.price.should.be.equal(900);
      check.discountAmount.should.be.equal(99);
      done();
    } catch (e) {
      console.log(e);
      done(e);
    }
  });

  it('use ItemCode Delete', async (done) => {
    try {
      var data ={
        code: testDeleteItemCode.code,
        price: 1000,
      }
      let check = await ItemCodeService.use(data);
      check.price.should.be.equal(800);
      check.discountAmount.should.be.equal(200);
      done();
    } catch (e) {
      console.log(e);
      done(e);
    }
  });

  it('use ItemCode Update', async (done) => {
    try {
      var data ={
        code: testUpdateItemCode.code,
        price: 1234,
      }
      let check = await ItemCodeService.use(data);
      check.price.should.be.equal(988);
      check.discountAmount.should.be.equal(246);
      done();
    } catch (e) {
      console.log(e);
      done(e);
    }
  });

  it('use ItemCode but money not enough', async (done) => {
    try {
      var data ={
        code: testItemCode.code,
        price: 899,
      }
      let check = await ItemCodeService.use(data);
      done(new Error('should not pass!'));
    } catch (e) {
      e.message.should.be.equal('請再次確認折扣碼活動時間、活動金額');
      done();
    }
  });

  it('use ItemCode but time out', async (done) => {
    try {
      var data ={
        code: testTimeOutShopCode.code,
        price: 999,
      }
      let check = await ItemCodeService.use(data);
      done(new Error('should not pass!'));
    } catch (e) {
      e.message.should.be.equal('請再次確認折扣碼活動時間、活動金額');
      done();
    }
  });

  it('send ItemCode to all sort', async (done) => {
    try {
      let itemCode = tesShopCode;
      await ItemCodeService.sendAllSort({itemCode});
      done();
    } catch (e) {
      console.log(e.stack);
      done(e);
    }
  });

  it('send ItemCode to target sort', async (done) => {
    try {
      let ItemCode = testItemCode;
      let sort = await db.Sort.findAll({ limit: 5 });
      await ItemCode.setSort(sort);

      itemCode = await db.ItemCode.find({
        where: {
          id: ItemCode.id
        },
        include: [db.Item]
      });

      await ItemCodeService.sendTargetItem({ItemCode});
      done();
    } catch (e) {
      console.log(e.stack);
      done(e);
    }
  });

  describe('send ItemCode when sort Register', (done) => {
    let createdRegisterItemCode;
    before( async (done) => {
      var registerItemCode = {
          title: '測試',
          code: 'YYYYYYYYYYZZZZZZZZZZ',
          autoRandomCode: 'on',
          type: 'price',
          description: 99,
          restriction: 999,
          sentType: 'beginner',
          sentContent: '測試'
        };
      createdRegisterItemCode = await db.ItemCode.create(registerItemCode);
      done();
    });

    it('should be success', async (done) => {
      try {
        let ItemCode = testItemCode;
        let sort = await db.Sort.find({ limit: 1 });

        await ItemCodeService.sendWhenRegister({itemCode, sort});
        done();
      } catch (e) {
        console.log(e.stack);
        done(e);
      }

    });
  });

});
