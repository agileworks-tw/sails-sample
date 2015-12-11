import sinon from 'sinon';
import moment from 'moment';

describe("about Item service", () => {

  let testItemCode, testFindItemCode, testDeleteItemCode, testUpdateItemCode;

  before(async (done) => {
    try {
      sinon.stub(ItemService, 'getLoginState', (req) => {
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

      // 打八折
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
    ItemService.getLoginState.restore();
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

  it('use ShopCode but money not enough', async (done) => {
    try {
      var data ={
        code: testShopCode.code,
        price: 899,
      }
      let check = await ShopCodeService.use(data);
      done(new Error('should not pass!'));
    } catch (e) {
      e.message.should.be.equal('請再次確認折扣碼活動時間、活動金額');
      done();
    }
  });

  it('use ShopCode but time out', async (done) => {
    try {
      var data ={
        code: testTimeOutShopCode.code,
        price: 999,
      }
      let check = await ShopCodeService.use(data);
      done(new Error('should not pass!'));
    } catch (e) {
      e.message.should.be.equal('請再次確認折扣碼活動時間、活動金額');
      done();
    }
  });

  it('send ShopCode to all users', async (done) => {
    try {
      let shopCode = testShopCode;
      await ShopCodeService.sendAllUsers({shopCode});
      done();
    } catch (e) {
      console.log(e.stack);
      done(e);
    }
  });

  it('send ShopCode to target users', async (done) => {
    try {
      let shopCode = testShopCode;
      let users = await db.User.findAll({ limit: 5 });
      await shopCode.setUsers(users);

      shopCode = await db.ShopCode.find({
        where: {
          id: shopCode.id
        },
        include: [db.User]
      });

      await ShopCodeService.sendTargetUsers({shopCode});
      done();
    } catch (e) {
      console.log(e.stack);
      done(e);
    }
  });

  describe('send ShopCode when user Register', (done) => {
    let createdRegisterShopCode;
    before( async (done) => {
      var registerShopCode = {
          title: '測試',
          code: 'YYYYYYYYYYZZZZZZZZZZ',
          autoRandomCode: 'on',
          startDate: moment().add(-1, 'days').toDate(),
          endDate: moment().add(1, 'days').toDate(),
          type: 'price',
          description: 99,
          restriction: 999,
          sentType: 'beginner',
          sentContent: '測試'
        };
      createdRegisterShopCode = await db.ShopCode.create(registerShopCode);
      done();
    });

    it('should be success', async (done) => {
      try {
        let shopCode = testShopCode;
        let user = await db.User.find({ limit: 1 });

        await ShopCodeService.sendWhenRegister({shopCode, user});
        done();
      } catch (e) {
        console.log(e.stack);
        done(e);
      }

    });
  });

});
