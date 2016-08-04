

describe.only('驗證對Friend GRUD', function() {
  "use strict";

  before((done) => {
  });

  it('列出所有資料', async (done) => {
    try {


      let result = await request(sails.hooks.http.app)
      .get('/list')
      result.status.should.be.eq(200);

      done();
    } catch (e) {
      done(e);
    }
  });

  it('create', async (done) => {
    try {

      // 實作 controller 呼叫 service 完成 login 動作
      // 檔案位置：api/controllers/FriendController.js
      let result = await request(sails.hooks.http.app)
      .post('/newfriend')
      .send({
        fbId: '666666',
        name: 'lins',
        email: 'ian@mail.com',
      });
      result.status.should.be.eq(200);
      let find = await Friend.findOne({
        where:{
          name: 'lins'
        }
      });
      console.log(find);
      (find === null).should.be.false;


      done();
    } catch (e) {
      done(e);
    }
  });


  it('destroy', async (done) => {
    try {


      let result = await request(sails.hooks.http.app)
      .delete('/destroy/1');

      result.status.should.be.eq(200);
      let find = await Friend.findOne({
        where:{
          id: 1
        }
      });
      console.log(find);
      (find === null).should.be.true;


      done();
    } catch (e) {
      done(e);
    }
  });

});
