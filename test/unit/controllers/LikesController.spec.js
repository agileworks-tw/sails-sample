// jshint esversion: 6

describe('test likes api', () => {
  let likes = null;
  before(async (done) => {
    try {

      const nowtime = new Date().toString();

      likes = await Likes.create({
        name: 'C8763',
        fackbookId: '878787',
        created_time: nowtime
      });

      done();
    } catch (e) {
      done(e);
    }
  });

  it('get all likes', async(done) => {
    try {
      const res = await request(sails.hooks.http.app).get(`/likes`);
      console.table(res);

      res.should.be.Array;
      done()
    } catch (e) {
      done(e)
    }
  });

  it('creat like', async(done) => {
    try {
      const nowtime = new Date().toString();

      const res = await request(sails.hooks.http.app)
      .post(`/likes/create`)
      .send({
        name: '小玲Ａ公車',
        fackbookId: '878787878787',
        created_time: nowtime
      });
      res.status.should.be.eq(200);
      res.body.created_time.should.be.eq(nowtime);
      done()
    } catch (e) {
      done(e)
    }
  });
  it('update like c8763', async(done) => {
    try{
      const nowtime = new Date().toString();

      let res = await request(sails.hooks.http.app)
      .put(`/friend/update`)
      .send({
        id: 1,
        name: '星爆～～～',
        created_time: nowtime
      });

      res.status.should.be.eq(200);

      const after = await Likes.findById(1);

      after.created_time.should.be.eq(nowtime);

      done();
    }
    catch(e){
      done(e);
    }
  });

  it('delete like', async(done) => {
    try{
      const deleteId = 1;

      let res = await request(sails.hooks.http.app).delete(`/likes/destory/${deleteId}`);

      res.status.should.be.eq(200);

      const after = await Likes.findById(1);

      (after === null).should.be.true;

      done();
    }
    catch(e){
      done(e);
    }
  });
});
