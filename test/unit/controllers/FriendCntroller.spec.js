describe.only('Test Restful api CRUD by friend model', function(){
  let friend;
  before(async (done) => {
    try{
      friend = await Friend.create({
        name:'MADAO',
        email: 'madao@gintama.com',
        facebookId:'13149487'
      });
      done();
    }
    catch(e){
      done(e);
    }
  });

  it('List Friends', async function(done){
    try{
      // http get friend index page
      let result = await request(sails.hooks.http.app)
      .get(`/friend`);

      result.status.should.be.eq(200);
      result.body[0]['name'].should.be.eq('MADAO');
      done();
    }
    catch(e){
      done(e);
    }
  });

  it('Create a new Friend', async function(done){
    try{
      let newFriend_info = {
        name:'Iron Man',
        email: 'tony.stark@stack.com',
        facebookId:'20151425'
      };
      // http create
      let result = await request(sails.hooks.http.app)
      .post(`/friend/create`)
      .send(newFriend_info);

      //database select
      let f = await Friend.findOne({where: { facebookId: newFriend_info.facebookId } });

      //http check
      result.status.should.be.eq(200);
      result.body['name'].should.be.eq('Iron Man');

      //db check
      f.name.should.be.eq('Iron Man');

      done();
    }
    catch(e){
      done(e);
    }
  });

  it('Update an Friend information', async function(done){
    try{
      let friend_info_update = {
        id: 1,
        name: "Winner",
        email: "yeah@gintama.com"
      }
      // http update
      let result = await request(sails.hooks.http.app)
      .put(`/friend/update`)
      .send(friend_info_update);

      //database select
      let f = await Friend.findById(friend_info_update.id);

      //http check
      result.status.should.be.eq(200);
      result.body['name'].should.be.eq('Winner');

      //database check
      f.name.should.be.equal('Winner');

      done();
    }
    catch(e){
      done(e);
    }
  });

  it('Destroyyyyyyyyyyyy an Friend', async function(done){
    try{
      let del_friend_id = 1;
      //http delete
      let result = await request(sails.hooks.http.app)
      .delete(`/friend/delete/${del_friend_id}`);

      //database select
      let f = await Friend.findById(del_friend_id);

      //http check
      result.status.should.be.eq(200);
      result.body['name'].should.be.eq('Winner');

      ( f === null ).should.be.true;

      done();
    }
    catch(e){
      done(e);
    }
  });
});
