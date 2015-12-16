import sinon from 'sinon';

describe('about Post Controller operation.', function() {

  let like, item;
  before(async (done) => {

    let user = await User.create({
      "username": "testPost",
      "email": "testPostController@gmail.com",
      "age": 18
    });

    sinon.stub(UserService, 'getLoginState', (req) => {
      return true;
    });

    sinon.stub(UserService, 'getLoginUser', (req) => {
      return user;
    });

    like = await Like.create({
      title: '測試PO文'
    });

    item = await Item.create({
      itemname: '測試PO文品項',
      LikeId: like.id
    })

    done();
  });

  after( (done) => {
    UserService.getLoginState.restore();
    UserService.getLoginUser.restore();
    done();
  });

  it('add new Post have radioItem should success.', async (done) => {
    try {

      let send = {
        "mode": "give",
        "hobby": like.id,
        "detail": {
          "title": "123",
          "radioItem": item.id,
          "item": ""
        },
        "location": {
          "latitude": 24.148657699999998,
          "longitude": 120.67413979999999,
          "accuracy": 30
        }
      }

      let result = await request(sails.hooks.http.app)
      .post('/postStory')
      .send(send);

      result.status.should.be.equal(200);

      done();
    } catch (e) {
      done(e);
    }
  });

  it('add new Post not have item should success.', async (done) => {
    try {

      let send = {
        "mode": "give",
        "hobby": like.id,
        "detail": {
          "title": "123",
          "item": "iphone7s"
        },
        "location": {
          "latitude": 24.148657699999998,
          "longitude": 120.67413979999999,
          "accuracy": 30
        }
      }

      let result = await request(sails.hooks.http.app)
      .post('/postStory')
      .send(send);

      result.status.should.be.equal(200);

      done();
    } catch (e) {
      done(e);
    }
  });


  it('get all post should success.', async (done) => {
    try {
      let result = await request(sails.hooks.http.app)
      .post('/getAllPost');
      sails.log.info(result);
      result.status.should.be.equal(200);

      done();
    } catch (e) {
      done(e);
    }
  });

});
